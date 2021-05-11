import { setRpcState } from '../../ducks/apiSlice';
import { MAX_RETRIES } from '../consts';
import { errString, grpcExceptionError, isRetriable, maxRetryError } from './apiErrors';

async function delay(retryCount: number) {
  new Promise(resolve => setTimeout(resolve, 10 ** retryCount));
}

// Calls the passed-in RPC with the passed-in request and does retries with exponential backoff if
// the received errors are retriable
export async function call(rpcName: string, client: any, rpcCall: Function, req: any,
  dispatch: Function): Promise<[any, boolean]> {
  return doWithRetries(rpcName, client, rpcCall, req, dispatch, 0);
}

async function doWithRetries(rpcName: string, client: any, rpcCall: Function, req: any,
  dispatch: Function, retryCount: number): Promise<[any, boolean]> {
  if (retryCount > MAX_RETRIES) {
    dispatch(setRpcState(rpcName, false, maxRetryError));
    return [null, false];
  }

  dispatch(setRpcState(rpcName, true, null));

  try {
    const resp = await rpcCall.call(client, req);
    const err = resp.getErr();
    if (err) {
      const errorStr = errString(rpcName, err);
      console.log(`error in ${rpcName}: ${errorStr}`);
      // Retriable error
      if (isRetriable(rpcName, err)) {
        await delay(retryCount);
        return doWithRetries(rpcName, client, rpcCall, req, dispatch, retryCount + 1);
      }

      // Unretriable error
      dispatch(setRpcState(rpcName, false, errorStr));
      return [null, false];
    }

    dispatch(setRpcState(rpcName, false, null));
    return [resp, true];
  }
  catch(e) {
    const errorStr = grpcExceptionError(e);
    console.log(`exception in ${rpcName}: ${errorStr}`);
    // Retriable exception
    if (isRetriable(rpcName, errorStr)) {
      delay(retryCount);
      return doWithRetries(rpcName, client, rpcCall, req, dispatch, retryCount + 1);
    }

    // Unretriable exception
    dispatch(setRpcState(rpcName, false, errorStr));
    return [null, false];
  }
}
