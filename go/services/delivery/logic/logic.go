package logic

import (
	"context"
	"log"

	"protos/delivery"
)

// Logic implements delivery.DeliveryServiceClient and contains the business logic of the delivery service.
// All methods on Logic should return `nil` error so as not to expose errors to the client.
// Instead, an "error" of the *Response_Error type is included on the response object Err field.
type Logic struct{}

// New constructs a new instance of Logic
func New() *Logic {
	return &Logic{}
}

func (l *Logic) DeliverOrder(ctx context.Context, req *delivery.DeliverOrderRequest) (*delivery.DeliverOrderResponse, error) {
	rsp := &delivery.DeliverOrderResponse{}
	log.Printf("[delivery-api] order %d: out for delivery", req.GetOrderId())
	return rsp, nil
}

func (l *Logic) Run() error {
	return nil
}

func (l *Logic) Stop() error {
	return nil
}
