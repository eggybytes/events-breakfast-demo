import * as types from '../commons/types';

// Action types and action creators

export const SET_RPC_STATE = 'api/setRpcState';
interface SetRpcStateAction {
  type: typeof SET_RPC_STATE;
  payload: [string, RpcState];
}

export function setRpcState(rpcName: string, isLoading: boolean, error: string | null) {
  const rpcState: RpcState = {
    isLoading: isLoading,
    error: error,
  };

  return {
    type: SET_RPC_STATE,
    payload: [rpcName, rpcState],
  };
}

// This is called when an "RPC session" ends (usually when a screen is unmounted). This will clear all RPC states
export const RPC_SESSION_ENDED = 'api/rpcSessionEnded';
interface RpcSessionEndedAction {
  type: typeof RPC_SESSION_ENDED;
}

export function rpcSessionEnded() {
  return {
    type: RPC_SESSION_ENDED,
  };
}

export type ApiActionTypes = SetRpcStateAction | RpcSessionEndedAction;

// State

export interface RpcState {
  isLoading: boolean;
  error: string | null;
}

export interface ApiState {
  rpcStates: Map<string, RpcState>;
}

const initialState: ApiState = {
  rpcStates: new Map(),
};

// Reducer

export function apiReducer(state: ApiState = initialState, action: types.RootActionTypes): ApiState {
  switch (action.type) {
    case SET_RPC_STATE: {
      console.log('[apiReducer] SET_RPC_STATE', action.payload);
      const currentRpcStates = state.rpcStates;
      currentRpcStates.set(action.payload[0], action.payload[1]);
      return {
        ...state,
        rpcStates: currentRpcStates,
      };
    }

    case RPC_SESSION_ENDED: {
      console.log('[apiReducer] RPC_SESSION_ENDED');
      return {
        ...state,
        rpcStates: new Map(),
      };
    }
  }

  return state;
}
