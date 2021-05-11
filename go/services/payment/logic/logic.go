package logic

import (
	"context"
	"log"

	"protos/payment"
)

// Logic implements payment.PaymentServiceClient and contains the business logic of the payment service.
// All methods on Logic should return `nil` error so as not to expose errors to the client.
// Instead, an "error" of the *Response_Error type is included on the response object Err field.
type Logic struct{}

// New constructs a new instance of Logic
func New() *Logic {
	return &Logic{}
}

func (l *Logic) ProcessPayment(ctx context.Context, req *payment.ProcessPaymentRequest) (*payment.ProcessPaymentResponse, error) {
	rsp := &payment.ProcessPaymentResponse{}
	log.Printf("[payment-api] processed payment for order %d", req.GetOrderId())
	return rsp, nil
}

func (l *Logic) Run() error {
	return nil
}

func (l *Logic) Stop() error {
	return nil
}
