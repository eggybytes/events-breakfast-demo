package http

import (
	"fmt"
	"log"
	"net/http"

	"github.com/eggybytes/events/go/commons/serviceregistry"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"google.golang.org/grpc"
)

// Server provides an HTTP-wrapped interface to the gRPC API of the organization service
type HttpWrappedGrpcServer struct {
	wrappedGrpcServer *grpcweb.WrappedGrpcServer
}

// New creates a new HTTP server instance wrapping the provided gRPC server, with the provided Deps
func New(grpc *grpc.Server) *HttpWrappedGrpcServer {
	wrappedGrpcServer := grpcweb.WrapServer(grpc,
		grpcweb.WithCorsForRegisteredEndpointsOnly(false),
		grpcweb.WithOriginFunc(func(origin string) bool {
			return true
		}),
	)
	return &HttpWrappedGrpcServer{
		wrappedGrpcServer: wrappedGrpcServer,
	}
}

// processgroup lifecycle

func (s *HttpWrappedGrpcServer) Run() error {
	log.Printf("[order-sync-api grpc-web (HTTP)] starting on %v", serviceregistry.OrderServiceGrpcwebPort)

	handler := http.HandlerFunc(func(resp http.ResponseWriter, req *http.Request) {
		if s.wrappedGrpcServer.IsGrpcWebRequest(req) || s.wrappedGrpcServer.IsAcceptableGrpcCorsRequest(req) {
			s.wrappedGrpcServer.ServeHTTP(resp, req)
		}
	})

	return http.ListenAndServe(fmt.Sprintf(":%d", serviceregistry.OrderServiceGrpcwebPort), handler)
}

func (s *HttpWrappedGrpcServer) Stop() error {
	return nil
}
