package grpc

import (
	"context"
	"log"
	"math"
	"net"
	"time"

	"protos/payment"

	commonsGrpc "github.com/eggybytes/events/go/commons/grpc"
	"github.com/eggybytes/events/go/commons/serviceregistry"
	"github.com/eggybytes/events/go/services/payment/logic"

	"google.golang.org/grpc"
)

// Server provides a gRPC API to the payment service
type Server struct {
	*logic.Logic
	Grpc *grpc.Server
}

// New creates a new gRPC server instance with the provided Logic
func New(l *logic.Logic) *Server {
	opts := []grpc.ServerOption{
		grpc.MaxConcurrentStreams(math.MaxUint32),
	}

	return &Server{
		Logic: l,
		Grpc:  grpc.NewServer(opts...),
	}
}

// ServeOnConn creates a new gRPC server and binds it to the provided network connection listener
func (s *Server) ServeOnConn(l net.Listener) error {
	log.Printf("[payment-api gRPC] starting on %s", l.Addr().String())

	payment.RegisterPaymentServiceServer(s.Grpc, s)

	err := s.Grpc.Serve(l)
	if err != nil {
		log.Println("[payment-api gRPC] exit error: ", err)
		return err
	}

	return nil
}

// Serve creates a new gRPC server and makes it start listening for traffic on the
// default port
func (s *Server) Serve() error {
	lis, err := net.Listen("tcp", commonsGrpc.ListenAddr(serviceregistry.PaymentServiceGrpcPort))
	if err != nil {
		return err
	}

	return s.ServeOnConn(lis)
}

// Run starts the Payment server
func (s *Server) Run() error {
	return s.Serve()
}

// Stop gracefully shuts down the Payment server and drains connections
func (s *Server) Stop() error {
	log.Println("[payment-api gRPC] shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	done := make(chan struct{})

	go func() {
		s.Grpc.GracefulStop()
		close(done)
	}()

	select {
	case <-ctx.Done():
		log.Println("[payment-api gRPC] context timeout expired, forcing shutdown")
	case <-done:
	}

	log.Println("[payment-api gRPC] shutdown complete")
	return nil
}
