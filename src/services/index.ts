import axios from "axios";

import createOrderBookService from "./OrderBook";
import createOrderPlacementService from "./OrderPlacement";

const services = {
    OrderBook: createOrderBookService({ network: axios }),
    OrderPlacement: createOrderPlacementService({ network: axios }),
};

export default services;