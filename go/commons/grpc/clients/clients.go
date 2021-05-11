package clients

import (
	"fmt"

	"protos/delivery"
	"protos/order"
	"protos/payment"

	"google.golang.org/grpc"

	"github.com/eggybytes/events/go/commons/serviceregistry"
)

const (
	// refs:
	// https://github.com/grpc/grpc/blob/master/doc/service_config.md
	// https://github.com/grpc/grpc/blob/master/doc/load-balancing.md
	RoundRobinServiceConfig = `{"loadBalancingPolicy":"round_robin"}`
)

func NewOrderServiceClient() (order.OrderServiceClient, error) {
	hostname := serviceregistry.OrderServiceName

	conn, err := grpc.Dial(fmt.Sprintf("%s:%d", hostname, serviceregistry.OrderServiceGrpcPort),
		grpc.WithInsecure(),
		grpc.WithDefaultServiceConfig(RoundRobinServiceConfig))
	if err != nil {
		fmt.Printf("failed to initialize order client %s", err)
		return nil, err
	}

	return order.NewOrderServiceClient(conn), nil
}

func NewPaymentServiceClient() (payment.PaymentServiceClient, error) {
	hostname := serviceregistry.PaymentServiceName

	conn, err := grpc.Dial(fmt.Sprintf("%s:%d", hostname, serviceregistry.PaymentServiceGrpcPort),
		grpc.WithInsecure(),
		grpc.WithDefaultServiceConfig(RoundRobinServiceConfig))
	if err != nil {
		fmt.Printf("failed to initialize payment client %s", err)
		return nil, err
	}

	return payment.NewPaymentServiceClient(conn), nil
}

func NewDeliveryServiceClient() (delivery.DeliveryServiceClient, error) {
	hostname := serviceregistry.DeliveryServiceName

	conn, err := grpc.Dial(fmt.Sprintf("%s:%d", hostname, serviceregistry.DeliveryServiceGrpcPort),
		grpc.WithInsecure(),
		grpc.WithDefaultServiceConfig(RoundRobinServiceConfig))
	if err != nil {
		fmt.Printf("failed to initialize delivery client %s", err)
		return nil, err
	}

	return delivery.NewDeliveryServiceClient(conn), nil
}
