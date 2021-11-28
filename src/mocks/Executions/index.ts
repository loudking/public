import { DataModel } from "../../types/Execution";
import { BosResult} from "../../types/BackendWrapper";

export const ExecutionData: DataModel[] = [
    {
        id: 1,
        quantity: 100,
        definedPrice: 50
    },
    {
        id: 2,
        quantity: 200,
        definedPrice: 100
    }
]

export const BosResultSuccess: BosResult<number> = {
    isSuccess: true,
    error: null,
    result: 99
}

export const BosResultError: BosResult<number> = {
    isSuccess: false,
    error: "Unable to create execution",
    result: null
}