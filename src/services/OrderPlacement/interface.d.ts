import { Network, NetworkResponse } from "../Network/interface";
import { BosResult } from "../../types/BackendWrapper";
import { DataModel as OrderBookDataModel } from "../../types/OrderBook";
import { DataModel as ExecutionDataModel } from "../../types/Execution";
import { BosResult } from "../../types/BackendWrapper";

export type OrderPlacementConstructorArgs = {
    network: Network;
    url?: string;
};

export interface OrderPlacementConstructor {
    new (opts: OrderPlacementConstructorArgs): any
}

export interface OrderPlacementService {
    getOrderBooks(): Promise<NetworkResponse<OrderBookDataModel[]>>;
    createOrder(orderBookId: number, newData: any): Promise<NetworkResponse<BosResult<number>>>;
    createExecution(orderBookId: number, newData: ExecutionDataModel): Promise<NetworkResponse<BosResult<number>>>;
}

export type CreateOrderPlacement = (
    ctor: OrderPlacementConstructor,
    opts: OrderPlacementConstructorArgs
) => OrderPlacementService;