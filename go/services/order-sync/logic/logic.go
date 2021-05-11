package logic

import (
	"context"
	"log"
	"math/rand"
	"time"

	"protos/delivery"
	"protos/order"
	"protos/payment"

	"github.com/eggybytes/events/go/commons/grpc/clients"
)

func init() {
	rand.Seed(time.Now().UnixNano())
}

// Logic implements order.OrderServiceClient and contains the business logic of the order service.
// All methods on Logic should return `nil` error so as not to expose errors to the client.
// Instead, an "error" of the *Response_Error type is included on the response object Err field.
type Logic struct {
	paymentClient  payment.PaymentServiceClient
	deliveryClient delivery.DeliveryServiceClient
}

// New constructs a new instance of Logic
func New() *Logic {
	return &Logic{}
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

	log.Printf("[order-sync-api] order %d: started", orderId)

	// make call to PaymentService to process payment for the order
	paymentRsp, err := l.paymentClient.ProcessPayment(ctx, &payment.ProcessPaymentRequest{
		CustomerId: req.CustomerId,
		OrderId:    &orderId,
	})
	if err != nil || paymentRsp.Err != nil {
		log.Printf("[order-sync-api] error from payment-api. failed to process payment for order %d", orderId)
		rsp.Err = order.CreateOrderResponse_SERVER_UNRECOVERABLE.Enum()
		return rsp, nil
	}
	log.Printf("[order-sync-api] order %d: received response from payment-api", orderId)

	// make call to DeliveryService to deliver the order
	deliveryRsp, derr := l.deliveryClient.DeliverOrder(ctx, &delivery.DeliverOrderRequest{
		CustomerId: req.CustomerId,
		OrderId:    &orderId,
	})
	if derr != nil || deliveryRsp.Err != nil {
		log.Printf("[order-sync-api] error from delivery-api. failed to deliver order %d", orderId)
		rsp.Err = order.CreateOrderResponse_SERVER_UNRECOVERABLE.Enum()
		return rsp, nil
	}
	log.Printf("[order-sync-api] order %d: received response from delivery-api", orderId)

	log.Printf("[order-sync-api] order %d: success! 🍳", orderId)

	// return order in response
	rsp.Order = o
	return rsp, nil
}

func (l *Logic) Run() error {
	// initialize payment client
	c, err := clients.NewPaymentServiceClient()
	if err != nil {
		return err
	}
	l.paymentClient = c

	// initialize delivery client
	ac, err := clients.NewDeliveryServiceClient()
	if err != nil {
		return err
	}
	l.deliveryClient = ac

	return nil
}

func (l *Logic) Stop() error {
	return nil
}
