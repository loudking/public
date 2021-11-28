import { call, put, takeLatest } from "redux-saga/effects";

import { actions, types } from "../../actions/orderplacement";
import { ServicesType } from "../../../services/types";
import { BosResult } from "../../../types/BackendWrapper";

type RequiredServices = Pick<ServicesType, "OrderPlacement">;

/**
 * Fetch order books
 * @param services Services
 */
function fetchOrderBooks(services: RequiredServices) {
    return function*() {
        try {
            const { data: orderbooks } = yield call(services.OrderPlacement.getOrderBooks);
            yield put(actions.receiveOrderBooks(orderbooks));
        }
        catch (e) {
            yield put(actions.errorOrderPlacement(e.message || 'No orderbooks found'));
        }
    }
}

/**
 * Create order
 * @param services Services
 */
function createOrder(services: RequiredServices) {
    return function*(action: any) {
        try {
            const { data: createdOrderId } = yield call(
                services.OrderPlacement.createOrder,
                action.payload.orderBookId,
                action.payload.newData);
            
            const casted = createdOrderId as BosResult<number>;

            if (casted.result != null) {
                yield put(actions.receiveCreatedOrderId(casted.result));
            }
            else {
                yield put(actions.errorOrderPlacement(casted.error || "Unknown error"));
            }
        }
        catch (e) {
            yield put(actions.errorOrderPlacement(e.message || 'No order created'));
        }
    }
}

/**
 * Create execution
 * @param services Services
 */
function createExecution(services: RequiredServices) {
    return function*(action: any) {
        try {
            const { data: totalCreatedExecutions } = yield call(
                services.OrderPlacement.createExecution,
                action.payload.orderBookId,
                action.payload.newData);

            const casted = totalCreatedExecutions as BosResult<number>;

            if (casted.result != null) {
                yield put(actions.receiveTotalCreatedExecutions(casted.result));
            }
            else {
                yield put(actions.errorOrderPlacement(casted.error || "Unknown error"));
            }
        }
        catch (e) {
            yield put(actions.errorOrderPlacement(e.message || 'No executions created'));
        }
    }
}

const orderPlacementSaga = (services: RequiredServices) => [
    takeLatest(types.REQUEST_ORDER_BOOKS, fetchOrderBooks(services)),
    takeLatest(types.REQUEST_CREATE_ORDER, createOrder(services)),
    takeLatest(types.REQUEST_CREATE_EXECUTION, createExecution(services)),
];

export default orderPlacementSaga;