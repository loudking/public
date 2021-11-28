import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";

import OrderBook from "../../OrderBook";
import configureStore from "../../../data/store";
import services from "../../../services";
import * as Mocks from "../../../mocks/Orders";
import * as MockExecutions from "../../../mocks/Executions";

jest.mock("axios");
const mockedGetOrders= jest.fn();
const mockedGetExecutionsByOrderId = jest.fn();

/**
 * Render with Redux
 * @param ui UI component
 */
function renderWithRedux(ui: React.ReactNode) {
    const mockServices = {
        ...services,
        OrderBook: {
            ...services.OrderBook,
            getOrders: mockedGetOrders,
            getExecutionsByOrderId: mockedGetExecutionsByOrderId,
        },
    };

    return {
        ...render(
            <Provider store={configureStore(mockServices)}>
                {ui}
            </Provider>
        )
    }
}

/**
 * Can render orders and select
 */
test("can render orders and select", async() => {
    mockedGetOrders.mockImplementation(() =>
        Promise.resolve({
            data: Mocks.LimitOrderData as any,
        })
    );
    mockedGetExecutionsByOrderId.mockImplementation(() => 
        Promise.resolve({
            data: MockExecutions.ExecutionData as any,
        })
    );
    const { getByText } = renderWithRedux(<OrderBook />);
    await waitFor(() => getByText("101"));

    const e1 = getByText("101");
    fireEvent.click(e1);

    await waitFor(() => getByText("50"));

    fireEvent.click(e1);
    await waitFor(() => getByText("50"));
})