package grpc

import (
	"fmt"
)

func ListenAddr(port int32) string {
	return fmt.Sprintf("0.0.0.0:%d", port)
}
