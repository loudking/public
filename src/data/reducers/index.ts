import { combineReducers } from "redux";

import OrderBookReducer, { OrderBookState } from "./orderbook";
import OrderPlacementReducer, { OrderPlacementState } from "./orderplacement";

export interface State {
    orderbook: OrderBookState;
    orderplacement: OrderPlacementState;
}

export default combineReducers ({
    orderbook: OrderBookReducer,
    orderplacement: OrderPlacementReducer,
})