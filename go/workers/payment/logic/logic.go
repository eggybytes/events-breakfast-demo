package logic

import (
	"context"
	"fmt"
	"log"

	"protos/order"

	"github.com/segmentio/kafka-go"
	"google.golang.org/protobuf/proto"
)

const (
	consumerGroupName = "payment-worker"
	brokerHostname    = "localhost:9092"
	topicName         = "order.order"
)

// Logic contains the business logic of the payment worker
type Logic struct {
	kafkaReader *kafka.Reader
}

// New constructs a new instance of Logic
func New() *Logic {
	return &Logic{}
}

func (l *Logic) Handle(ctx context.Context, consumedMessage kafka.Message) error {
	order, err := unmarshal(consumedMessage)
	if err != nil {
		log.Printf("[payment-worker] error unmarshaling Kafka message %+v", consumedMessage)
		return err
	}

	log.Printf("[payment-worker] order %d: payment processed", order.GetId())
	return nil
}

func unmarshal(msg kafka.Message) (*order.Order, error) {
	em := &order.Order{}

	err := proto.Unmarshal(msg.Value, em)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal order.Order value: %s", err)
	}

	return em, nil
}

func (l *Logic) Run() error {
	log.Println("[payment-worker] running Logic")

	l.kafkaReader = kafka.NewReader(kafka.ReaderConfig{
		Brokers: []string{brokerHostname},
		Topic:   topicName,
		GroupID: consumerGroupName,
	})

	for {
		ctx := context.Background()
		m, err := l.kafkaReader.ReadMessage(ctx)
		if err != nil {
			log.Println("[payment-worker] error reading message", err)
			break
		}

		l.Handle(ctx, m)
	}

	return nil
}

func (l *Logic) Stop() error {
	err := l.kafkaReader.Close()

	if err != nil {
		log.Println("[payment-worker] failed to close Kafka reader", err)
		return err
	}

	return nil
}
