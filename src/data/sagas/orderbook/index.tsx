import { call, put, takeLatest } from "redux-saga/effects";

import { actions, types } from "../../actions/orderbook";
import { ServicesType } from "../../../services/types";

type RequiredServices = Pick<ServicesType, "OrderBook">;

/**
 * Fetch order books
 * @param services Services
 */
function fetchOrders(services: RequiredServices) {
    return function*() {
        try {
            const { data: orders } = yield call(services.OrderBook.getOrders);
            yield put(actions.receiveOrders(orders));
        }
        catch (e) {
            yield put(actions.errorOrderBook(e.message || 'No orders found'));
        }
    }
}

/**
 * Fetch execution by order id
 * @param services Services
 */
function fetchExecutionByOrderId(services: RequiredServices) {
    return function*(action: any) {
        try {
            const { data: executions } = yield call(
                services.OrderBook.getExecutionsByOrderId,
                action.payload.orderId);

            yield put(actions.receiveExecutionsByOrderId(executions));
        }
        catch (e) {
            yield put(actions.errorOrderBook(e.message || 'No executions found'));
        }
    }
}

const orderBookSaga = (services: RequiredServices) => [
    takeLatest(types.REQUEST_ORDERS, fetchOrders(services)),
    takeLatest(types.REQUEST_EXECUTIONS_BY_ORDER_ID, fetchExecutionByOrderId(services)),
];

export default orderBookSaga;