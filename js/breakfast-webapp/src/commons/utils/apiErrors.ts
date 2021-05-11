import * as orderApi from '../../api/orderApi';

export const grpcAuthenticationError = 'authentication error in gRPC call';
export const grpcUnretriableError = 'unretriable error in gRPC call';
export const grpcRetriableError = 'retriable error in gRPC call';
export const maxRetryError = 'maximum number of retries reached';
export const objectCreationUnsuccessfulError = 'object creation was unsuccessful';

export function errString(rpcName: string, err: any): string {
  const combinedErrorMap: { [key: string]: any } = {
    [orderApi.createOrderRpcName]: orderApi.createOrderResponseErrorMap,
  };

  return combinedErrorMap[rpcName][err];
}

export function isRetriable(rpcName: string, err: any): boolean {
  if (err === grpcRetriableError) {
    return true;
  }

  const combinedErrorMap: { [key: string]: any } = {
    [orderApi.createOrderRpcName]: orderApi.createOrderResponseErrorMap,
  };

  return combinedErrorMap[rpcName][err] === 'SERVER_RETRIABLE';
}

export interface GrpcException {
  code: number;
  message: string;
}

export function grpcExceptionError(e: GrpcException) {
  switch (e.code) {
    case 3:
    case 11:
      return grpcUnretriableError;
    case 7:
    case 16:
      return grpcAuthenticationError;
    default:
      return grpcUnretriableError;
  }
}
