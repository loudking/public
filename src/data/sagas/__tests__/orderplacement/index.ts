import SagaTester from "redux-saga-tester";
import rootSaga from "../..";
import services from "../../../../services";
import { State } from "../../../reducers";
import orderPlacementReducer from "../../../reducers/orderplacement";
import { initialState as orderPlacementState } from "../../../reducers/orderplacement";

import * as MocksOrderBook from "../../../../mocks/Orderbooks";
import * as MocksExecution from "../../../../mocks/Executions";
import * as MocksOrder from "../../../../mocks/Orders";
import { actions, types } from "../../../actions/orderplacement";

const initialState = {
    orderplacement: orderPlacementState,
};

const mockService = {
    getOrderBooks: jest.fn(),
    createOrder: jest.fn(),
    createExecution: jest.fn(),
};

describe("orderplacement saga", () => {
    let sagaTester: SagaTester<State>;

    beforeAll(() => {
        sagaTester = new SagaTester({
            initialState,
            reducers: {
                orderplacement: orderPlacementReducer,
            }
        });

        sagaTester.start(rootSaga, {
            ...services,
            OrderPlacement: mockService
        });
    });

    afterEach(() => {
        sagaTester.reset(true);
        mockService.getOrderBooks.mockClear();
        mockService.createOrder.mockClear();
        mockService.createExecution.mockClear();
    });

    it("test fetch orderbooks saga", async () => {
        mockService.getOrderBooks.mockImplementation(() => 
            Promise.resolve({ data: MocksOrderBook.OrderBookData })
        );

        sagaTester.dispatch(actions.requestOrderBooks());

        await sagaTester.waitFor(types.RECEIVE_ORDER_BOOKS);

        expect(sagaTester.wasCalled(types.REQUEST_ORDER_BOOKS)).toBe(true);
        expect(sagaTester.wasCalled(types.RECEIVE_ORDER_BOOKS)).toBe(true);
        expect(sagaTester.wasCalled(types.ERROR_ORDER_PLACEMENT)).toBe(false);
        expect(sagaTester.wasCalled(types.REQUEST_CREATE_ORDER)).toBe(false);
        expect(sagaTester.wasCalled(types.RECEIVE_CREATED_ORDER_ID)).toBe(false);
        expect(sagaTester.wasCalled(types.REQUEST_CREATE_EXECUTION)).toBe(false);
        expect(sagaTester.wasCalled(types.RECEIVE_TOTAL_CREATED_EXECUTIONS)).toBe(false);

        expect(sagaTester.getState().orderplacement).toEqual(
            expect.objectContaining({
                orderbooks: MocksOrderBook.OrderBookData
            })
        );
    })

    it("test fetch orderbooks saga failure", async () => {
        mockService.getOrderBooks.mockImplementation(() => 
            Promise.reject("Error")
        );

        sagaTester.dispatch(actions.requestOrderBooks());

        await sagaTester.waitFor(types.ERROR_ORDER_PLACEMENT);

        expect(sagaTester.wasCalled(types.REQUEST_ORDER_BOOKS)).toBe(true);
        expect(sagaTester.wasCalled(types.RECEIVE_ORDER_BOOKS)).toBe(false);
        expect(sagaTester.wasCalled(types.ERROR_ORDER_PLACEMENT)).toBe(true);
        expect(sagaTester.wasCalled(types.REQUEST_CREATE_ORDER)).toBe(false);
        expect(sagaTester.wasCalled(types.RECEIVE_CREATED_ORDER_ID)).toBe(false);
        expect(sagaTester.wasCalled(types.REQUEST_CREATE_EXECUTION)).toBe(false);
        expect(sagaTester.wasCalled(types.RECEIVE_TOTAL_CREATED_EXECUTIONS)).toBe(false);

        expect(sagaTester.getState().orderplacement.errorOrderPlacement).toBe("No orderbooks found");
        expect(sagaTester.getState().orderplacement.fetchingOrderBooks).toBe(false);
        expect(sagaTester.getState().orderplacement.orderbooks).toHaveLength(0);
        expect(sagaTester.getState().orderplacement.createdOrderId).toBe(-1);
        expect(sagaTester.getState().orderplacement.totalCreatedExecutions).toBe(-1);
    })

    it("test create order saga", async () => {
        mockService.createOrder.mockImplementation(() => 
            Promise.resolve({data: MocksOrder.BosResultSuccess})
        );

        sagaTester.dispatch(actions.requestCreateOrder(1, {}));

        await sagaTester.waitFor(types.RECEIVE_CREATED_ORDER_ID);

        expect(sagaTester.wasCalled(types.REQUEST_ORDER_BOOKS)).toBe(false);
        expect(sagaTester.wasCalled(types.RECEIVE_ORDER_BOOKS)).toBe(false);
        expect(sagaTester.wasCalled(types.ERROR_ORDER_PLACEMENT)).toBe(false);
        expect(sagaTester.wasCalled(types.REQUEST_CREATE_ORDER)).toBe(true);
        expect(sagaTester.wasCalled(types.RECEIVE_CREATED_ORDER_ID)).toBe(true);
        expect(sagaTester.wasCalled(types.REQUEST_CREATE_EXECUTION)).toBe(false);
        expect(sagaTester.wasCalled(types.RECEIVE_TOTAL_CREATED_EXECUTIONS)).toBe(false);

        expect(sagaTester.getState().orderplacement).toEqual(
            expect.objectContaining({
                createdOrderId: MocksOrder.BosResultSuccess.result
            })
        );
    })

    it("test create order saga error", async () => {
        mockService.createOrder.mockImplementation(() => 
            Promise.resolve({ data: MocksOrder.BosResultError })
        );

        sagaTester.dispatch(actions.requestCreateOrder(1, {}));

        await sagaTester.waitFor(types.ERROR_ORDER_PLACEMENT);

        expect(sagaTester.wasCalled(types.REQUEST_ORDER_BOOKS)).toBe(false);
        expect(sagaTester.wasCalled(types.RECEIVE_ORDER_BOOKS)).toBe(false);
        expect(sagaTester.wasCalled(types.ERROR_ORDER_PLACEMENT)).toBe(true);
        expect(sagaTester.wasCalled(types.REQUEST_CREATE_ORDER)).toBe(true);
        expect(sagaTester.wasCalled(types.RECEIVE_CREATED_ORDER_ID)).toBe(false);
        expect(sagaTester.wasCalled(types.REQUEST_CREATE_EXECUTION)).toBe(false);
        expect(sagaTester.wasCalled(types.RECEIVE_TOTAL_CREATED_EXECUTIONS)).toBe(false);

        expect(sagaTester.getState().orderplacement.errorOrderPlacement).toBe("Unable to create order");
        expect(sagaTester.getState().orderplacement.fetchingOrderBooks).toBe(false);
        expect(sagaTester.getState().orderplacement.orderbooks).toHaveLength(0);
        expect(sagaTester.getState().orderplacement.createdOrderId).toBe(-1);
        expect(sagaTester.getState().orderplacement.totalCreatedExecutions).toBe(-1);
    })


    it("test create order saga failure", async () => {
        mockService.createOrder.mockImplementation(() => 
            Promise.reject("Error")
        );

        sagaTester.dispatch(actions.requestCreateOrder(1, {}));

        await sagaTester.waitFor(types.ERROR_ORDER_PLACEMENT);

        expect(sagaTester.wasCalled(types.REQUEST_ORDER_BOOKS)).toBe(false);
        expect(sagaTester.wasCalled(types.RECEIVE_ORDER_BOOKS)).toBe(false);
        expect(sagaTester.wasCalled(types.ERROR_ORDER_PLACEMENT)).toBe(true);
        expect(sagaTester.wasCalled(types.REQUEST_CREATE_ORDER)).toBe(true);
        expect(sagaTester.wasCalled(types.RECEIVE_CREATED_ORDER_ID)).toBe(false);
        expect(sagaTester.wasCalled(types.REQUEST_CREATE_EXECUTION)).toBe(false);
        expect(sagaTester.wasCalled(types.RECEIVE_TOTAL_CREATED_EXECUTIONS)).toBe(false);

        expect(sagaTester.getState().orderplacement.errorOrderPlacement).toContain("No order created");
        expect(sagaTester.getState().orderplacement.fetchingOrderBooks).toBe(false);
        expect(sagaTester.getState().orderplacement.orderbooks).toHaveLength(0);
        expect(sagaTester.getState().orderplacement.createdOrderId).toBe(-1);
        expect(sagaTester.getState().orderplacement.totalCreatedExecutions).toBe(-1);
    })

    it("test create execution saga", async () => {
        mockService.createExecution.mockImplementation(() => 
            Promise.resolve({data: MocksExecution.BosResultSuccess})
        );

        sagaTester.dispatch(actions.requestCreateExecution(1, MocksExecution.ExecutionData[0]));

        await sagaTester.waitFor(types.RECEIVE_TOTAL_CREATED_EXECUTIONS);

        expect(sagaTester.wasCalled(types.REQUEST_ORDER_BOOKS)).toBe(false);
        expect(sagaTester.wasCalled(types.RECEIVE_ORDER_BOOKS)).toBe(false);
        expect(sagaTester.wasCalled(types.ERROR_ORDER_PLACEMENT)).toBe(false);
        expect(sagaTester.wasCalled(types.REQUEST_CREATE_ORDER)).toBe(false);
        expect(sagaTester.wasCalled(types.RECEIVE_CREATED_ORDER_ID)).toBe(false);
        expect(sagaTester.wasCalled(types.REQUEST_CREATE_EXECUTION)).toBe(true);
        expect(sagaTester.wasCalled(types.RECEIVE_TOTAL_CREATED_EXECUTIONS)).toBe(true);

        expect(sagaTester.getState().orderplacement).toEqual(
            expect.objectContaining({
                totalCreatedExecutions: MocksExecution.BosResultSuccess.result
            })
        );
    })

    it("test create execution saga error", async () => {
        mockService.createExecution.mockImplementation(() => 
            Promise.resolve({ data: MocksExecution.BosResultError })
        );

        sagaTester.dispatch(actions.requestCreateExecution(1, MocksExecution.ExecutionData[0]));

        await sagaTester.waitFor(types.ERROR_ORDER_PLACEMENT);

        expect(sagaTester.wasCalled(types.REQUEST_ORDER_BOOKS)).toBe(false);
        expect(sagaTester.wasCalled(types.RECEIVE_ORDER_BOOKS)).toBe(false);
        expect(sagaTester.wasCalled(types.ERROR_ORDER_PLACEMENT)).toBe(true);
        expect(sagaTester.wasCalled(types.REQUEST_CREATE_ORDER)).toBe(false);
        expect(sagaTester.wasCalled(types.RECEIVE_CREATED_ORDER_ID)).toBe(false);
        expect(sagaTester.wasCalled(types.REQUEST_CREATE_EXECUTION)).toBe(true);
        expect(sagaTester.wasCalled(types.RECEIVE_TOTAL_CREATED_EXECUTIONS)).toBe(false);

        expect(sagaTester.getState().orderplacement.errorOrderPlacement).toBe("Unable to create execution");
        expect(sagaTester.getState().orderplacement.fetchingOrderBooks).toBe(false);
        expect(sagaTester.getState().orderplacement.orderbooks).toHaveLength(0);
        expect(sagaTester.getState().orderplacement.createdOrderId).toBe(-1);
        expect(sagaTester.getState().orderplacement.totalCreatedExecutions).toBe(-1);
    })


    it("test create execution saga failure", async () => {
        mockService.createExecution.mockImplementation(() => 
            Promise.reject("Error")
        );

        sagaTester.dispatch(actions.requestCreateExecution(1, MocksExecution.ExecutionData[0]));

        await sagaTester.waitFor(types.ERROR_ORDER_PLACEMENT);

        expect(sagaTester.wasCalled(types.REQUEST_ORDER_BOOKS)).toBe(false);
        expect(sagaTester.wasCalled(types.RECEIVE_ORDER_BOOKS)).toBe(false);
        expect(sagaTester.wasCalled(types.ERROR_ORDER_PLACEMENT)).toBe(true);
        expect(sagaTester.wasCalled(types.REQUEST_CREATE_ORDER)).toBe(false);
        expect(sagaTester.wasCalled(types.RECEIVE_CREATED_ORDER_ID)).toBe(false);
        expect(sagaTester.wasCalled(types.REQUEST_CREATE_EXECUTION)).toBe(true);
        expect(sagaTester.wasCalled(types.RECEIVE_TOTAL_CREATED_EXECUTIONS)).toBe(false);

        expect(sagaTester.getState().orderplacement.errorOrderPlacement).toContain("No executions created");
        expect(sagaTester.getState().orderplacement.fetchingOrderBooks).toBe(false);
        expect(sagaTester.getState().orderplacement.orderbooks).toHaveLength(0);
        expect(sagaTester.getState().orderplacement.createdOrderId).toBe(-1);
        expect(sagaTester.getState().orderplacement.totalCreatedExecutions).toBe(-1);
    })
})