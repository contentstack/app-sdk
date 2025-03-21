import { AxiosRequestConfig, AxiosResponse } from "axios";
export type RequestConfig = AxiosRequestConfig;
export type ProxyResponse = AxiosResponse;

export type ContentstackEndpoints = {
    APP: string;
    CMA: string;
    DEVELOPER_HUB: string;
    [key:string]:string;
};
