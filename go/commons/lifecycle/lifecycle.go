package lifecycle

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
)

var stopSignals = []os.Signal{os.Interrupt, syscall.SIGINT, syscall.SIGTERM, syscall.SIGABRT, syscall.SIGQUIT}

func WaitForSignals(cancel context.CancelFunc) {
	term := make(chan os.Signal)
	signal.Notify(term, stopSignals...)
	log.Println("listening for termination signals...")

	<-term
	log.Println("termination signal received, canceling context...")
	cancel()
}
