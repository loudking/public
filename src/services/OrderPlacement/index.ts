import { OrderPlacementService, OrderPlacementConstructorArgs } from "./interface";
import { Network } from "../Network/interface";
import createOrderPlacement from "./create";
import { DataModel as OrderBookDataModel } from "../../types/OrderBook";
import { DataModel as ExecutionDataModel } from "../../types/Execution";
import { BosResult } from "../../types/BackendWrapper";

/**
 * Order placement service
 */
class OrderPlacement implements OrderPlacementService {
    _network: Network;
    _url: string;

    constructor({ network, url, ...args}: OrderPlacementConstructorArgs ) {
        this._network = network;
        this._url = url || String(process.env.REACT_APP_SERVICE_BACKEND_ROOT);
    }

    getOrderBooks= () => {
        return this._network.get<OrderBookDataModel[]>(`${this._url}/orderBook/listAll`);
    }

    createOrder = (orderBookId: number, newData: any) => {
        return this._network.post<BosResult<number>>(
            `${this._url}/addOrder/${orderBookId}`,
            newData);
    }

    createExecution = (orderBookId: number, newData: ExecutionDataModel) => {
        return this._network.post<BosResult<number>>(
            `${this._url}/addExecution/${orderBookId}`,
            newData);
    }

}

const createOrderPlacementService = (opts: OrderPlacementConstructorArgs) => createOrderPlacement(OrderPlacement, opts);

export default createOrderPlacementService;