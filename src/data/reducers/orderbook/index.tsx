import { AnyAction } from "redux";

import { types } from "../../actions/orderbook";
import { LimitOrder as OrderModel } from "../../../types/Order";
import { DataModel as ExecutionModel } from "../../../types/Execution";

export interface OrderBookState {
    errorOrderBook: string;
    fetchingOrders: boolean;
    orders: OrderModel[];
    executions: ExecutionModel[];
}

export const initialState = {
    errorOrderBook: "",
    fetchingOrders: false,
    orders: [] as OrderModel[],
    executions: [] as ExecutionModel[],
}

export default function OrderBookReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case types.ERROR_ORDER_BOOK: {
            return {
                ...state,
                fetchingOrders: false,
                errorOrderBook: action.payload,
            };
        }
        case types.REQUEST_ORDERS: {
            return {
                ...state,
                fetchingOrders: true,
                errorOrderBook: "",
            };
        }
        case types.RECEIVE_ORDERS: {
            return {
                ...state,
                fetchingOrders: false,
                orders: action.payload,
                errorOrderBook: "",
            };
        }
        case types.REQUEST_EXECUTIONS_BY_ORDER_ID: {
            return {
                ...state,
                fetchingOrders: true,
                errorOrderBook: "",
            };
        }
        case types.RECEIVE_EXECUTIONS_BY_ORDER_ID: {
            return {
                ...state,
                fetchingOrders: false,
                executions: action.payload,
                errorOrderBook: "",
            };
        }
        default:
            return state;
    }
}