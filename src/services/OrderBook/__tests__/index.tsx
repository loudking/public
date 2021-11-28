import createService from "../";
import * as MockLimitOrder from "../../../mocks/Orders";
import * as MockExecution from "../../../mocks/Executions";

const mockNetwork = {
    get: jest.fn(),
} as any;

describe("order book service test", () => {
    afterEach(() => {
        mockNetwork.get.mockClear();
    });

    it("get orders with correct endpoint", async() => {
        mockNetwork.get.mockImplementation(() => Promise.resolve({data: MockLimitOrder.LimitOrderData}));
        const service = createService({ network: mockNetwork});
        const { data: result } = await service.getOrders();
        expect(mockNetwork.get).toHaveBeenCalledWith(expect.stringMatching(/.order\/listAll/));
        expect(result).toEqual(MockLimitOrder.LimitOrderData);
    })

    it("get execution by order id with correct endpoint", async() => {
        mockNetwork.get.mockImplementation(() => Promise.resolve({data: MockExecution.ExecutionData}));
        const service = createService({ network: mockNetwork});
        const { data: result } = await service.getExecutionsByOrderId(1);
        expect(mockNetwork.get).toHaveBeenCalledWith(
            expect.stringMatching(/.execution\/getByOrderId\/1/),
        );
        expect(result).toEqual(MockExecution.ExecutionData);
    })
})