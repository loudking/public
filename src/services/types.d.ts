import { OrderBookService } from "./OrderBook/interface";
import { OrderPlacementService } from "./OrderPlacement/interface";

type ServicesType = {
    OrderBook: OrderBookService;
    OrderPlacement: OrderPlacementService;
};
