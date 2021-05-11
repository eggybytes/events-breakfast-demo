import * as orderGrpc from '../../../protos/order/order_grpc_web_pb';
import * as orderProto from '../../../protos/order/order_pb';
import { call } from '../commons/utils/grpc';
import { reverseMapping } from '../commons/utils/reverseMapping';
import * as types from '../commons/types';
import { orderCreated } from '../ducks/orderSlice';

const GRPC_BASE_URL = 'http://localhost:9009';
const client = new orderGrpc.OrderServicePromiseClient(GRPC_BASE_URL);

export const createOrderRpcName = '/order.OrderService/CreateOrder';
export const createOrderResponseErrorMap = reverseMapping(orderProto.CreateOrderResponse.Error);
export function createOrder(customerId: number, itemIds: number[]): types.RootThunkAction {
  return async function(dispatch: Function) {
    const rpcName = createOrderRpcName;

    const req = new orderProto.CreateOrderRequest();
    req.setCustomerId(customerId);
    req.setItemIdsList(itemIds);

    const [ resp, ok ] = await call(rpcName, client, client.createOrder, req, dispatch);
    if (ok) {
      const typedResp = resp as orderProto.CreateOrderResponse;
      const order = typedResp.getOrder();
      if (order) {
        dispatch(orderCreated(order));
      }
    }
  }
}
