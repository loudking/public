import { OrderBookService, OrderBookConstructorArgs } from "./interface";
import { Network } from "../Network/interface";
import createOrderBook from "./create";
import { LimitOrder } from "../../types/Order";
import { DataModel as ExecutionModel } from "../../types/Execution";

class OrderBook implements OrderBookService {
    _network: Network;
    _url: string;

    constructor({ network, url, ...args}: OrderBookConstructorArgs ) {
        this._network = network;
        this._url = url || String(process.env.REACT_APP_SERVICE_BACKEND_ROOT);
    }

    getOrders = () => {
        return this._network.get<LimitOrder[]>(`${this._url}/order/listAll`);
    }

    getExecutionsByOrderId = (orderId: number) => {
        return this._network.get<ExecutionModel[]>(`${this._url}/execution/getByOrderId/${orderId}`);
    }
}

const createOrderBookService = (opts: OrderBookConstructorArgs) => createOrderBook(OrderBook, opts);

export default createOrderBookService;