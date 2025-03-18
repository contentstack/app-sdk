import { AxiosRequestConfig, AxiosResponse } from "axios";
export type RequestConfig = AxiosRequestConfig;
export type ProxyResponse = AxiosResponse;

export type ServiceURLsMap = {
    CMA: string;
};


export type RequestInitConfig = RequestInit & {
    baseURL?: string;
};
