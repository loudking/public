type AbstractOrder = {
    id: number,
    type: string,
    quantity: number,
    instrumentId: number,
}

export type LimitOrder = AbstractOrder & { price: number };

export type MarketOrder = AbstractOrder;

export const OrderTypes = [
    "limit", "market"
]