#!/usr/bin/env bash

protoc \
    ./protos/order/order.proto \
    --js_out=import_style=commonjs:./js \
    --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:./js
