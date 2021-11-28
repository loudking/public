import createService from "../";
import * as MocksOrderBook from "../../../mocks/Orderbooks";
import * as MocksOrder from "../../../mocks/Orders";
import * as MocksExecution from "../../../mocks/Executions";
import { DataModel } from "../../../types/Execution";

const mockNetwork = {
    get: jest.fn(),
    post: jest.fn(),
} as any;

describe("order placement service test", () => {
    afterEach(() => {
        mockNetwork.get.mockClear();
        mockNetwork.post.mockClear();
    });

    it("get order books with correct endpoint", async() => {
        mockNetwork.get.mockImplementation(() => Promise.resolve({data: MocksOrderBook.OrderBookData}));
        const service = createService({ network: mockNetwork});
        const { data: result } = await service.getOrderBooks();
        expect(mockNetwork.get).toHaveBeenCalledWith(expect.stringMatching(/.orderBook\/listAll/));
        expect(result).toEqual(MocksOrderBook.OrderBookData);
    })

    it("create order with correct endpoint", async() => {
        mockNetwork.post.mockImplementation(() => Promise.resolve({data: MocksOrder.BosResultSuccess}));
        const service = createService({ network: mockNetwork});
        const { data: result } = await service.createOrder(1, {});
        expect(mockNetwork.post).toHaveBeenCalledWith(
            expect.stringMatching(/.addOrder\/1/),
            expect.any(Object),
        );
        expect(result).toEqual(MocksOrder.BosResultSuccess);
    })

    it("create execution with correct endpoint", async() => {
        mockNetwork.post.mockImplementation(() => Promise.resolve({data: MocksExecution.BosResultSuccess}));
        const service = createService({ network: mockNetwork});
        const { data: result } = await service.createExecution(1, {} as DataModel);
        expect(mockNetwork.post).toHaveBeenCalledWith(
            expect.stringMatching(/.addExecution\/1/),
            expect.any(Object),
        );
        expect(result).toEqual(MocksExecution.BosResultSuccess);
    })

})