import SagaTester from "redux-saga-tester";
import rootSaga from "../..";
import services from "../../../../services";
import { State } from "../../../reducers";
import orderBookReducer from "../../../reducers/orderbook";
import { initialState as orderBookState } from "../../../reducers/orderbook";

import * as MockLimitOrder from "../../../../mocks/Orders";
import * as MockExecutions from "../../../../mocks/Executions";
import { actions, types } from "../../../actions/orderbook";

const initialState = {
    orderbook: orderBookState,
};

const mockService = {
    getOrders: jest.fn(),
    getExecutionsByOrderId: jest.fn(),
};

describe("orderbook saga", () => {
    let sagaTester: SagaTester<State>;

    beforeAll(() => {
        sagaTester = new SagaTester({
            initialState,
            reducers: {
                orderbook: orderBookReducer,
            }
        });

        sagaTester.start(rootSaga, {
            ...services,
            OrderBook: mockService
        });
    });

    afterEach(() => {
        sagaTester.reset(true);
        mockService.getOrders.mockClear();
        mockService.getExecutionsByOrderId.mockClear();
    });

    it("test fetch orderbooks saga", async () => {
        mockService.getOrders.mockImplementation(() => 
            Promise.resolve({
                data: MockLimitOrder.LimitOrderData
        }));

        sagaTester.dispatch(actions.requestOrders());

        await sagaTester.waitFor(types.RECEIVE_ORDERS);

        expect(sagaTester.wasCalled(types.REQUEST_ORDERS)).toBe(true);
        expect(sagaTester.wasCalled(types.RECEIVE_ORDERS)).toBe(true);
        expect(sagaTester.wasCalled(types.ERROR_ORDER_BOOK)).toBe(false);
        expect(sagaTester.wasCalled(types.REQUEST_EXECUTIONS_BY_ORDER_ID)).toBe(false);
        expect(sagaTester.wasCalled(types.RECEIVE_EXECUTIONS_BY_ORDER_ID)).toBe(false);

        expect(sagaTester.getState().orderbook).toEqual(
            expect.objectContaining({
                orders: MockLimitOrder.LimitOrderData
            })
        );
    })

    it("test fetch orderbooks saga failure", async () => {
        mockService.getOrders.mockImplementation(() => 
            Promise.reject("Error")
        );

        sagaTester.dispatch(actions.requestOrders());

        await sagaTester.waitFor(types.ERROR_ORDER_BOOK);

        expect(sagaTester.wasCalled(types.REQUEST_ORDERS)).toBe(true);
        expect(sagaTester.wasCalled(types.RECEIVE_ORDERS)).toBe(false);
        expect(sagaTester.wasCalled(types.ERROR_ORDER_BOOK)).toBe(true);
        expect(sagaTester.wasCalled(types.REQUEST_EXECUTIONS_BY_ORDER_ID)).toBe(false);
        expect(sagaTester.wasCalled(types.RECEIVE_EXECUTIONS_BY_ORDER_ID)).toBe(false);

        expect(sagaTester.getState().orderbook.errorOrderBook).toBe("No orders found");
        expect(sagaTester.getState().orderbook.fetchingOrders).toBe(false);
        expect(sagaTester.getState().orderbook.orders).toHaveLength(0);
        expect(sagaTester.getState().orderbook.executions).toHaveLength(0);
    })

    it("test get execution by order id saga", async () => {
        mockService.getExecutionsByOrderId.mockImplementation(() => 
            Promise.resolve({
                data: MockExecutions.ExecutionData
        }));

        sagaTester.dispatch(actions.requestExecutionsByOrderId(1));

        await sagaTester.waitFor(types.RECEIVE_EXECUTIONS_BY_ORDER_ID);

        expect(sagaTester.wasCalled(types.REQUEST_ORDERS)).toBe(false);
        expect(sagaTester.wasCalled(types.RECEIVE_ORDERS)).toBe(false);
        expect(sagaTester.wasCalled(types.ERROR_ORDER_BOOK)).toBe(false);
        expect(sagaTester.wasCalled(types.REQUEST_EXECUTIONS_BY_ORDER_ID)).toBe(true);
        expect(sagaTester.wasCalled(types.RECEIVE_EXECUTIONS_BY_ORDER_ID)).toBe(true);

        expect(sagaTester.getState().orderbook).toEqual(
            expect.objectContaining({
                executions: MockExecutions.ExecutionData
            })
        );
    })

    it("test get execution by order id failure", async () => {
        mockService.getExecutionsByOrderId.mockImplementation(() => 
            Promise.reject("Error")
        );

        sagaTester.dispatch(actions.requestExecutionsByOrderId(1));

        await sagaTester.waitFor(types.ERROR_ORDER_BOOK);

        expect(sagaTester.wasCalled(types.REQUEST_ORDERS)).toBe(false);
        expect(sagaTester.wasCalled(types.RECEIVE_ORDERS)).toBe(false);
        expect(sagaTester.wasCalled(types.ERROR_ORDER_BOOK)).toBe(true);
        expect(sagaTester.wasCalled(types.REQUEST_EXECUTIONS_BY_ORDER_ID)).toBe(true);
        expect(sagaTester.wasCalled(types.RECEIVE_EXECUTIONS_BY_ORDER_ID)).toBe(false);

        expect(sagaTester.getState().orderbook.errorOrderBook).toBe("No executions found");
        expect(sagaTester.getState().orderbook.fetchingOrders).toBe(false);
        expect(sagaTester.getState().orderbook.orders).toHaveLength(0);
        expect(sagaTester.getState().orderbook.executions).toHaveLength(0);
    })
})