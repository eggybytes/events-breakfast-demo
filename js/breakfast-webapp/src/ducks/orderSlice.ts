import orderProto from '../../../protos/order/order_pb';
import * as types from '../commons/types';

// Actions and action creators

// Dispatched after successful creation of an order

export const ORDER_CREATED = 'order/orderCreated';
interface OrderCreatedAction {
  type: typeof ORDER_CREATED;
  payload: orderProto.Order;
}

export function orderCreated(order: orderProto.Order): types.RootActionTypes {
  return {
    type: ORDER_CREATED,
    payload: order,
  };
}

export type OrderActionTypes = OrderCreatedAction;

// State

export interface OrderState {
  currentOrder: orderProto.Order.AsObject | null;
}

const initialState: OrderState = {
  currentOrder: null,
};

// Reducer

export function orderReducer(state: OrderState = initialState, action: types.RootActionTypes): OrderState {
  switch (action.type) {
    case ORDER_CREATED:
      console.log('[orderReducer] ORDER_CREATED order', action.payload);
      return {
        ...state,
        currentOrder: action.payload.toObject(),
      };
  }

  return state;
}
