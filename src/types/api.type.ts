import { AxiosRequestConfig, AxiosResponse } from "axios";
export type RequestConfig = AxiosRequestConfig;
export type ProxyResponse = AxiosResponse;

export type ContentstackEndpoints = {
    APP: string;
    CMA: string;
    DEVELOPERHUB: string;
    [key:string]:string;
};
