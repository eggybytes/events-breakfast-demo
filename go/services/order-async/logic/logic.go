package logic

import (
	"context"
	"log"
	"math/rand"
	"strconv"
	"time"

	"protos/order"

	"github.com/segmentio/kafka-go"
	"google.golang.org/protobuf/proto"
)

const (
	brokerHostname = "localhost:9092"
	topicName      = "order.order"
	writeDeadline  = 5 * time.Second
)

func init() {
	rand.Seed(time.Now().UnixNano())
}

// Logic implements order.OrderServiceClient and contains the business logic of the order service.
// All methods on Logic should return `nil` error so as not to expose errors to the client.
// Instead, an "error" of the *Response_Error type is included on the response object Err field.
type Logic struct {
	kafkaConn *kafka.Conn
}

// New constructs a new instance of Logic
func New() *Logic {
	conn, err := kafka.DialLeader(context.Background(), "tcp", brokerHostname, topicName, 0)
	if err != nil {
		log.Fatalln("failed to dial leader:", err)
	}

	return &Logic{
		kafkaConn: conn,
	}
}

func (l *Logic) CreateOrder(ctx context.Context, req *order.CreateOrderRequest) (*order.CreateOrderResponse, error) {
	rsp := &order.CreateOrderResponse{}

	// create an order
	orderId := int32(rand.Intn(100))
	o := &order.Order{
		Id:         &orderId,
		CustomerId: req.CustomerId,
		ItemIds:    req.ItemIds,
	}
	log.Printf("[order-async-api] order %d: started", orderId)

	// produce order to Kafka
	valueBytes, err := proto.Marshal(o)
	if err != nil {
		log.Printf("[order-async-api] error marshaling order %d to bytes for Kafka: %s", orderId, err)
		rsp.Err = order.CreateOrderResponse_SERVER_UNRECOVERABLE.Enum()
		return rsp, nil
	}

	l.kafkaConn.SetWriteDeadline(time.Now().Add(writeDeadline))
	_, err = l.kafkaConn.WriteMessages(
		kafka.Message{
			Key:   []byte(strconv.Itoa(int(orderId))),
			Value: []byte(valueBytes),
		},
	)
	if err != nil {
		log.Printf("[order-async-api] error writing order %d message to Kafka: %s", orderId, err)
		rsp.Err = order.CreateOrderResponse_SERVER_UNRECOVERABLE.Enum()
		return rsp, nil
	}

	log.Printf("[order-async-api] order %d written to Kafka: success! 🍳", orderId)

	// return order in response
	rsp.Order = o
	return rsp, nil
}

func (l *Logic) Run() error {
	return nil
}

func (l *Logic) Stop() error {
	err := l.kafkaConn.Close()

	if err != nil {
		log.Println("failed to close Kafka writer", err)
		return err
	}

	return nil
}
