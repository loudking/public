import { Network, NetworkResponse } from "../Network/interface";
import { BosResult } from "../../types/BackendWrapper";
import { LimitOrder } from "../../types/Order";
import { DataModel as ExecutionModel } from "../../types/Execution";

export type OrderBookConstructorArgs = {
    network: Network;
    url?: string;
};

export interface OrderBookConstructor {
    new (opts: OrderBookConstructorArgs): any
}

export interface OrderBookService {
    getOrders(): Promise<NetworkResponse<LimitOrder[]>>;
    getExecutionsByOrderId(orderId: number): Promise<NetworkResponse<ExecutionModel[]>>;
}

export type CreateOrderBook = (
    ctor: OrderBookConstructor,
    opts: OrderBookConstructorArgs
) => OrderBookService;