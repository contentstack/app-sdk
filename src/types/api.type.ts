import { AxiosRequestConfig, AxiosResponse } from "axios";
export type RequestConfig = AxiosRequestConfig;
export type ProxyResponse = AxiosResponse;

export type ContentstackEndpoints = {
    CMA: string;
    [key:string]:string;
};


export type RequestInitConfig = RequestInit & {
    baseURL?: string;
};
