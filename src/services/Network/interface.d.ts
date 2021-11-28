import * as Axios from "axios";

export type Network = typeof Axios.default;
export type NetworkResponse<T = any> = Axios.AxiosResponse<T>;
