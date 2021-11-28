import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";

import OrderPlacement from "../../OrderPlacement";
import configureStore from "../../../data/store";
import services from "../../../services";
import * as MocksOrderBook from "../../../mocks/Orderbooks";
import * as MocksOrder from "../../../mocks/Orders";
import * as MocksExecution from "../../../mocks/Executions";

jest.mock("axios");
const mockedGetOrderBooks = jest.fn();
const mockedCreateOrder = jest.fn();
const mockedCreateExecution = jest.fn();

/**
 * Render with redux
 * @param ui UI component
 */
function renderWithRedux(ui: React.ReactNode) {
    const mockServices = {
        ...services,
        OrderPlacement: {
            ...services.OrderPlacement,
            getOrderBooks: mockedGetOrderBooks,
            createOrder: mockedCreateOrder,
            createExecution: mockedCreateExecution,
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
 * Can render orderbooks and select
 */
test("can render orderbooks and select", async() => {
    mockedGetOrderBooks.mockImplementation(() =>
        Promise.resolve({ data: MocksOrderBook.OrderBookData as any })
    );

    const { getByText } = renderWithRedux(<OrderPlacement />);
    await waitFor(() => getByText("ABC"));

    const btnAddOrder = getByText("Add Order");
    const btnAddExecution = getByText("Add Execution");

    expect(btnAddOrder).toBeDisabled();
    expect(btnAddExecution).toBeDisabled();

    const e1 = getByText("ABC");
    fireEvent.click(e1);

    expect(btnAddOrder).not.toBeDisabled();
    expect(btnAddExecution).not.toBeDisabled();

    fireEvent.click(e1);

    expect(btnAddOrder).toBeDisabled();
    expect(btnAddExecution).toBeDisabled();
})

/**
 * Can render error
 */
test("can render error", async() => {
    mockedGetOrderBooks.mockImplementation(() =>
        Promise.reject("Error")
    );

    const { getByText } = renderWithRedux(<OrderPlacement />);
    await waitFor(() => getByText("No orderbooks found"));
})

/**
 * Can submit limit order
 */
test("can submit limit order", async() => {
    mockedGetOrderBooks.mockImplementation(() =>
        Promise.resolve({ data: MocksOrderBook.OrderBookData as any, })
    );

    mockedCreateOrder.mockImplementation(() =>
        Promise.resolve({ data: MocksOrder.BosResultSuccess as any, })
    );

    const { getByText, getByLabelText } = renderWithRedux(<OrderPlacement />);
    await waitFor(() => getByText("ABC"));

    const e1 = getByText("ABC");
    fireEvent.click(e1);

    const btnAddOrder = getByText("Add Order");
    fireEvent.click(btnAddOrder);

    const limitOrder = getByText("Limit");
    fireEvent.click(limitOrder);

    const inputQuantity = getByLabelText("Quantity");
    fireEvent.change(inputQuantity, { target: { value: "100"}});

    const inputPrice = getByLabelText("Price");
    fireEvent.change(inputPrice, { target: { value: "200"}});

    const btnSubmit = getByText("Submit")
    fireEvent.click(btnSubmit);

    await waitFor(() => getByText("88"));
})

/**
 * Can submit new execution
 */
test("can submit new execution", async() => {
    mockedGetOrderBooks.mockImplementation(() =>
        Promise.resolve({ data: MocksOrderBook.OrderBookData as any, })
    );

    mockedCreateExecution.mockImplementation(() =>
        Promise.resolve({ data: MocksExecution.BosResultSuccess as any, })
    );

    const { getByText, getByLabelText } = renderWithRedux(<OrderPlacement />);
    await waitFor(() => getByText("ABC"));

    const e1 = getByText("ABC");
    fireEvent.click(e1);

    const btnAddExecution = getByText("Add Execution");
    fireEvent.click(btnAddExecution);

    const inputQuantity = getByLabelText("Quantity");
    fireEvent.change(inputQuantity, { target: { value: "34"}});

    const inputPrice = getByLabelText("Defined Price");
    fireEvent.change(inputPrice, { target: { value: "45"}});

    const btnSubmit = getByText("Submit")
    fireEvent.click(btnSubmit);

    await waitFor(() => getByText("99"));
})