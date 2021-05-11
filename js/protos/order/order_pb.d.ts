import * as jspb from 'google-protobuf'



export class CreateOrderRequest extends jspb.Message {
  getCustomerId(): number;
  setCustomerId(value: number): CreateOrderRequest;

  getItemIdsList(): Array<number>;
  setItemIdsList(value: Array<number>): CreateOrderRequest;
  clearItemIdsList(): CreateOrderRequest;
  addItemIds(value: number, index?: number): CreateOrderRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateOrderRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateOrderRequest): CreateOrderRequest.AsObject;
  static serializeBinaryToWriter(message: CreateOrderRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateOrderRequest;
  static deserializeBinaryFromReader(message: CreateOrderRequest, reader: jspb.BinaryReader): CreateOrderRequest;
}

export namespace CreateOrderRequest {
  export type AsObject = {
    customerId: number,
    itemIdsList: Array<number>,
  }
}

export class CreateOrderResponse extends jspb.Message {
  getOrder(): Order | undefined;
  setOrder(value?: Order): CreateOrderResponse;
  hasOrder(): boolean;
  clearOrder(): CreateOrderResponse;

  getErr(): CreateOrderResponse.Error;
  setErr(value: CreateOrderResponse.Error): CreateOrderResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateOrderResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateOrderResponse): CreateOrderResponse.AsObject;
  static serializeBinaryToWriter(message: CreateOrderResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateOrderResponse;
  static deserializeBinaryFromReader(message: CreateOrderResponse, reader: jspb.BinaryReader): CreateOrderResponse;
}

export namespace CreateOrderResponse {
  export type AsObject = {
    order?: Order.AsObject,
    err: CreateOrderResponse.Error,
  }

  export enum Error { 
    UNKNOWN = 0,
    OUT_OF_ITEMS = 1,
    SERVER_UNRECOVERABLE = 2,
  }
}

export class Order extends jspb.Message {
  getId(): number;
  setId(value: number): Order;

  getCustomerId(): number;
  setCustomerId(value: number): Order;

  getItemIdsList(): Array<number>;
  setItemIdsList(value: Array<number>): Order;
  clearItemIdsList(): Order;
  addItemIds(value: number, index?: number): Order;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Order.AsObject;
  static toObject(includeInstance: boolean, msg: Order): Order.AsObject;
  static serializeBinaryToWriter(message: Order, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Order;
  static deserializeBinaryFromReader(message: Order, reader: jspb.BinaryReader): Order;
}

export namespace Order {
  export type AsObject = {
    id: number,
    customerId: number,
    itemIdsList: Array<number>,
  }
}

export class Item extends jspb.Message {
  getId(): number;
  setId(value: number): Item;

  getName(): string;
  setName(value: string): Item;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Item.AsObject;
  static toObject(includeInstance: boolean, msg: Item): Item.AsObject;
  static serializeBinaryToWriter(message: Item, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Item;
  static deserializeBinaryFromReader(message: Item, reader: jspb.BinaryReader): Item;
}

export namespace Item {
  export type AsObject = {
    id: number,
    name: string,
  }
}

