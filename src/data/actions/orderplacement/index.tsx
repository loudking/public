import { DataModel } from "../../../types/Execution";

export const types = {
    ERROR_ORDER_PLACEMENT: "ERROR_ORDER_PLACEMENT",
    REQUEST_ORDER_BOOKS: "REQUEST_ORDER_BOOKS",
    RECEIVE_ORDER_BOOKS: "RECEIVE_ORDER_BOOKS",
    REQUEST_CREATE_ORDER: "REQUEST_CREATE_ORDER",
    RECEIVE_CREATED_ORDER_ID: "RECEIVE_CREATED_ORDER_ID",
    REQUEST_CREATE_EXECUTION: "REQUEST_CREATE_EXECUTION",
    RECEIVE_TOTAL_CREATED_EXECUTIONS: "RECEIVE_TOTAL_CREATED_EXECUTIONS",
};

export const actions = {
    errorOrderPlacement: (error: string) => ({
        type: types.ERROR_ORDER_PLACEMENT,
        payload: error,
        error: true
    }),

    requestOrderBooks: () => ({
        type: types.REQUEST_ORDER_BOOKS,
        payload: {}
    }),
    receiveOrderBooks: (payload: {text: string}[]) => ({
        type: types.RECEIVE_ORDER_BOOKS,
        payload,
    }),

    requestCreateOrder: (orderBookId: number, newData: any) => ({
        type: types.REQUEST_CREATE_ORDER,
        payload: { orderBookId, newData }
    }),
    receiveCreatedOrderId: (orderId: number) => ({
        type: types.RECEIVE_CREATED_ORDER_ID,
        payload: orderId,
    }),

    requestCreateExecution: (orderBookId: number, newData: DataModel) => ({
        type: types.REQUEST_CREATE_EXECUTION,
        payload: { orderBookId, newData }
    }),
    receiveTotalCreatedExecutions: (totalCreatedExecutions: number) => ({
        type: types.RECEIVE_TOTAL_CREATED_EXECUTIONS,
        payload: totalCreatedExecutions,
    }),
};