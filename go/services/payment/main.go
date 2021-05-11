package main

import (
	"context"
	"log"

	"github.com/eggybytes/events/go/commons/lifecycle"
	"github.com/eggybytes/events/go/services/payment/api/grpc"
	httpApi "github.com/eggybytes/events/go/services/payment/api/http"
	"github.com/eggybytes/events/go/services/payment/logic"
)

func main() {
	log.Println("[payment-api main] starting")
	ctx, cancel := context.WithCancel(context.Background())
	go lifecycle.WaitForSignals(cancel)

	l := logic.New()
	grpcServer := grpc.New(l)
	grpcWebServer := httpApi.New(grpcServer.Grpc)

	// Start up long-running processes
	go func() {
		err := grpcServer.Run()
		if err != nil {
			log.Println("[payment-api main] error running grpc server", err.Error())
		}
	}()

	go func() {
		err := grpcWebServer.Run()
		if err != nil {
			log.Println("[payment-api main] error running grpcweb server", err.Error())
		}
	}()

	go func() {
		err := l.Run()
		if err != nil {
			log.Println("[payment-api main] error running logic", err.Error())
		}
	}()

	// Wait for shutdown
	<-ctx.Done()
	log.Println("[payment-api main] context closed, shutting down gracefully...")

	grpcServer.Stop()
	grpcWebServer.Stop()
	l.Stop()

	log.Println("[payment-api main] successful shutdown")
}
