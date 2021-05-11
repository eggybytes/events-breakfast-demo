package main

import (
	"context"
	"log"

	"github.com/eggybytes/events/go/commons/lifecycle"
	"github.com/eggybytes/events/go/workers/payment/logic"
)

func main() {
	log.Println("[payment-worker main] starting")
	ctx, cancel := context.WithCancel(context.Background())
	go lifecycle.WaitForSignals(cancel)

	l := logic.New()

	// Start up long-running processes
	go func() {
		err := l.Run()
		if err != nil {
			log.Println("[payment-worker main] error running logic", err.Error())
		}
	}()

	// Wait for shutdown
	<-ctx.Done()
	log.Println("[payment-worker main] context closed, shutting down gracefully...")

	l.Stop()

	log.Println("[payment-worker main] successful shutdown")
}
