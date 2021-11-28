import { CreateOrderBook, OrderBookConstructor, OrderBookConstructorArgs } from "./interface";

const createOrderBookService: CreateOrderBook = function(
    ctor: OrderBookConstructor,
    opts: OrderBookConstructorArgs
) {
    return new ctor(opts);
};

export default createOrderBookService;