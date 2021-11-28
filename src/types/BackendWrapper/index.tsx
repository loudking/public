export type BosResult<T> = {
    isSuccess: boolean;
    error: string | null;
    result: T | null;
};