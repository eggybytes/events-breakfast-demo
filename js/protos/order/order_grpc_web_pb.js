/**
 * @fileoverview gRPC-Web generated client stub for order
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.order = require('./order_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.order.OrderServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.order.OrderServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.order.CreateOrderRequest,
 *   !proto.order.CreateOrderResponse>}
 */
const methodDescriptor_OrderService_CreateOrder = new grpc.web.MethodDescriptor(
  '/order.OrderService/CreateOrder',
  grpc.web.MethodType.UNARY,
  proto.order.CreateOrderRequest,
  proto.order.CreateOrderResponse,
  /**
   * @param {!proto.order.CreateOrderRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.order.CreateOrderResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.order.CreateOrderRequest,
 *   !proto.order.CreateOrderResponse>}
 */
const methodInfo_OrderService_CreateOrder = new grpc.web.AbstractClientBase.MethodInfo(
  proto.order.CreateOrderResponse,
  /**
   * @param {!proto.order.CreateOrderRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.order.CreateOrderResponse.deserializeBinary
);


/**
 * @param {!proto.order.CreateOrderRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.order.CreateOrderResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.order.CreateOrderResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.order.OrderServiceClient.prototype.createOrder =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/order.OrderService/CreateOrder',
      request,
      metadata || {},
      methodDescriptor_OrderService_CreateOrder,
      callback);
};


/**
 * @param {!proto.order.CreateOrderRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.order.CreateOrderResponse>}
 *     Promise that resolves to the response
 */
proto.order.OrderServicePromiseClient.prototype.createOrder =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/order.OrderService/CreateOrder',
      request,
      metadata || {},
      methodDescriptor_OrderService_CreateOrder);
};


module.exports = proto.order;

