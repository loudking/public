import { AnyAction } from "redux";

import { types } from "../../actions/orderplacement";
import { DataModel as OrderBookModel } from "../../../types/OrderBook";

export interface OrderPlacementState {
    errorOrderPlacement: string;
    fetchingOrderBooks: boolean;
    orderbooks: OrderBookModel[];
    createdOrderId: number;
    totalCreatedExecutions: number;
}

export const initialState = {
    errorOrderPlacement: "",
    fetchingOrderBooks: false,
    orderbooks: [] as OrderBookModel[],
    createdOrderId: -1,
    totalCreatedExecutions: -1,
}

export default function OrderPlacementReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case types.ERROR_ORDER_PLACEMENT: {
            return {
                ...state,
                fetchingOrderBooks: false,
                errorOrderPlacement: action.payload,
            };
        }
        case types.REQUEST_ORDER_BOOKS: {
            return {
                ...state,
                fetchingOrderBooks: true,
                errorOrderPlacement: "",
            };
        }
        case types.RECEIVE_ORDER_BOOKS: {
            return {
                ...state,
                fetchingOrderBooks: false,
                orderbooks: action.payload,
                errorOrderPlacement: "",
            };
        }
        case types.REQUEST_CREATE_ORDER: {
            return {
                ...state,
                fetchingOrderBooks: true,
                errorOrderPlacement: "",
            };
        }
        case types.RECEIVE_CREATED_ORDER_ID: {
            return {
                ...state,
                fetchingOrderBooks: false,
                createdOrderId: action.payload,
                errorOrderPlacement: "",
            };
        }
        case types.REQUEST_CREATE_EXECUTION: {
            return {
                ...state,
                fetchingOrderBooks: true,
                errorOrderPlacement: "",
            };
        }
        case types.RECEIVE_TOTAL_CREATED_EXECUTIONS: {
            return {
                ...state,
                fetchingOrderBooks: false,
                totalCreatedExecutions: action.payload,
                errorOrderPlacement: "",
            };
        }
        default:
            return state;
    }
}