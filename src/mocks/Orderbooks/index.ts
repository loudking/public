import { DataModel } from "../../types/OrderBook";

export const OrderBookData: DataModel[] = [
    {
        id: 1,
        isOpen: true,
        instrument: {
            id: 1,
            name: "ABC"
        }
    },
    {
        id: 2,
        isOpen: false,
        instrument: {
            id: 2,
            name: "DEF"
        }
    }
];