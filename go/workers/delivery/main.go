package main

import (
	"context"
	"log"

	"github.com/eggybytes/events/go/commons/lifecycle"
	"github.com/eggybytes/events/go/workers/delivery/logic"
)

func main() {
	log.Println("[delivery-worker main] starting")
	ctx, cancel := context.WithCancel(context.Background())
	go lifecycle.WaitForSignals(cancel)

	l := logic.New()

	// Start up long-running processes
	go func() {
		err := l.Run()
		if err != nil {
			log.Println("[delivery-worker main] error running logic", err.Error())
		}
	}()

	// Wait for shutdown
	<-ctx.Done()
	log.Println("[delivery-worker main] context closed, shutting down gracefully...")

	l.Stop()

	log.Println("[delivery-worker main] successful shutdown")
}
