import { LimitOrder } from "../../types/Order";
import { BosResult} from "../../types/BackendWrapper";

export const LimitOrderData: LimitOrder[] = [
    {
        id: 1,
        type: "limit",
        quantity: 100,
        instrumentId: 1,
        price: 101,
    },
    {
        id: 2,
        type: "limit",
        quantity: 200,
        instrumentId: 2,
        price: 202,
    }
]

export const BosResultSuccess: BosResult<number> = {
    isSuccess: true,
    error: null,
    result: 88
}

export const BosResultError: BosResult<string> = {
    isSuccess: false,
    error: "Unable to create order",
    result: null
}