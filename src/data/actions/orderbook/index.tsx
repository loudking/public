export const types = {
    ERROR_ORDER_BOOK: "ERROR_ORDER_BOOK",
    REQUEST_ORDERS: "REQUEST_ORDERS",
    RECEIVE_ORDERS: "RECEIVE_ORDERS",
    REQUEST_EXECUTIONS_BY_ORDER_ID: "REQUEST_EXECUTIONS_BY_ORDER_ID",
    RECEIVE_EXECUTIONS_BY_ORDER_ID: "RECEIVE_EXECUTIONS_BY_ORDER_ID",
};

export const actions = {
    errorOrderBook: (error: string) => ({
        type: types.ERROR_ORDER_BOOK,
        payload: error,
        error: true
    }),

    requestOrders: () => ({
        type: types.REQUEST_ORDERS,
        payload: {}
    }),

    receiveOrders: (payload: {text: string}[]) => ({
        type: types.RECEIVE_ORDERS,
        payload,
    }),

    requestExecutionsByOrderId: (orderId: number) => ({
        type: types.REQUEST_EXECUTIONS_BY_ORDER_ID,
        payload: { orderId }
    }),
    receiveExecutionsByOrderId: (payload: {text: string}[]) => ({
        type: types.RECEIVE_EXECUTIONS_BY_ORDER_ID,
        payload,
    }),
};