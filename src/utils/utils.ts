import {
    AxiosError,
    AxiosHeaders,
    AxiosRequestConfig,
    AxiosResponse,
    isAxiosError,
    RawAxiosRequestHeaders,
} from "axios";
import { Response } from "node-fetch";

import { Region, RegionType } from "../types";

const filterHeaders = [
    "api_key",
    "authorization",
    "auth_token",
    "x-api-key",
    "user-agent",
  ];

export function onData<Data extends Record<string, any>>(data: { data: Data }) {
    if (typeof data.data === "string") {
        return Promise.reject(data.data);
    }
    return Promise.resolve(data.data);
}

export function onError(error: Error) {
    return Promise.reject(error);
}

export function sanitizeResponseHeader(axiosHeaders) {
    const fetchHeaders = new Headers();
    for (const key in axiosHeaders) {
        if (axiosHeaders.hasOwnProperty(key) && !filterHeaders.includes(key)) {
            fetchHeaders.append(key, axiosHeaders[key]);
          }    
    }
    return fetchHeaders;
};
export const handleApiError = (error: AxiosResponse | AxiosError): Response => {
    if (isAxiosError(error)) {
        const isServerError = (error?.status ?? 0) >= 500;
        const responseBody = isServerError
            ? error.stack || "Internal Server Error"
            : (error as unknown as AxiosResponse)?.data || "An error occurred";
        const status = error?.status || 500;
        const statusText =
            isServerError
                ? error.message || "Internal Server Error"
                : (error as unknown as AxiosResponse)?.statusText || "Error";
        const headers = new Headers(
            sanitizeResponseHeader(error.response?.headers || {})
        );
        return new Response(JSON.stringify(responseBody), {
            status,
            statusText,
            headers,
        });
    } else {
        const responseBody = error.statusText || "An error occurred";
        return new Response(JSON.stringify(responseBody), {
            status: 500,
            statusText: "Internal Server Error",
        });
    }
}
export function formatAppRegion(region: string): RegionType {
    return region ?? Region.UNKNOWN;
}

export function getPreferredBodyElement(nodeCollection: HTMLCollection) {
    let rootElementIndex = Infinity;
    let rootElement: Element | undefined;
    const elementPreferenceList = [
        "HEADER",
        "NAV",
        "MAIN",
        "SECTION",
        "ARTICLE",
        "ASIDE",
        "FOOTER",
        "DIV",
    ];
    const nonRenderingTags = ["SCRIPT", "NOSCRIPT", "STYLE", "TEMPLATE"];
    // ? choose higher preference semantic HTML tags
    Array.from(nodeCollection).forEach((el) => {
        const elIndex = elementPreferenceList.indexOf(el.nodeName);
        if (elIndex >= 0 && elIndex < rootElementIndex) {
            rootElementIndex = elIndex;
            rootElement = el;
        }
    });
    // ? choose the first rendering HTML tag found if no semantic tags found
    if (!rootElement) {
        rootElement = Array.from(nodeCollection).find(
            (el) => !nonRenderingTags.includes(el.nodeName)
        );
    }
    return rootElement || nodeCollection[0];
}

export const convertHeaders = (headers: HeadersInit): AxiosHeaders => {
    const axiosHeaders = new AxiosHeaders();
    if (headers instanceof Headers) {
        headers.forEach((value, key) => {
            axiosHeaders.set(key, value);
        });
    } else if (Array.isArray(headers)) {
        headers.forEach(([key, value]) => {
            axiosHeaders.set(key, value);
        });
    } else {
        Object.entries(headers).forEach(([key, value]) => {
            axiosHeaders.set(key, value);
        });
    }
    return axiosHeaders;
};

export const fetchToAxiosConfig = (
    url: string,
    options?: RequestInit
): AxiosRequestConfig => {
    const axiosConfig: AxiosRequestConfig = {
        url,
        method: options?.method || "GET",
        headers: options?.headers
            ? convertHeaders({ ...options?.headers })
            : {},
        data: options?.body,
    };

    if (options?.credentials === "include") {
        axiosConfig.withCredentials = true;
    }

    return axiosConfig;
};
