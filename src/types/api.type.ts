import { AxiosRequestConfig, AxiosResponse } from "axios";
export type RequestConfig = AxiosRequestConfig;
export type ProxyResponse = AxiosResponse;

export type ServiceURLsMap = {
    CMA: string;
};

enum SupportedServices {
    CMA = "CMA",
}

export type RequestInitConfig = RequestInit & {
    service?: keyof typeof SupportedServices;
};

export type RequestConfigWithBaseUrl = RequestInitConfig & {
    baseURL: string;
};
