import * as grpcWeb from 'grpc-web';

import * as protos_order_order_pb from '../../protos/order/order_pb';


export class OrderServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  createOrder(
    request: protos_order_order_pb.CreateOrderRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: protos_order_order_pb.CreateOrderResponse) => void
  ): grpcWeb.ClientReadableStream<protos_order_order_pb.CreateOrderResponse>;

}

export class OrderServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  createOrder(
    request: protos_order_order_pb.CreateOrderRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<protos_order_order_pb.CreateOrderResponse>;

}

