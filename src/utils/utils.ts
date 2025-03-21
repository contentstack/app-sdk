import {
    AxiosError,
    AxiosHeaders,
    AxiosRequestConfig,
    AxiosResponse,
    isAxiosError,
} from "axios";

import { Region, RegionType } from "../types";

import { Region, RegionType } from "../types";

export function onData<Data extends Record<string, any>>(data: { data: Data }) {
    if (typeof data.data === "string") {
        return Promise.reject(data.data);
    }
    return Promise.resolve(data.data);
}

export function onError(error: Error) {
    return Promise.reject(error);
}

export function axiosError(error: AxiosError) {
    const { response, message } = error || {};
    return {
        data: response?.data || message,
        status: response?.status || 500,
        statusText: response?.statusText || "Internal Server Error",
        headers: new Headers(
            response?.headers ? Object.entries(response.headers) : undefined
        ),
    };
}

export const handleApiError = (error: any): Response => {
    return isAxiosError(error)
        ? createErrorResponse(axiosError(error))
        : createErrorResponse(error);
};

export const createErrorResponse = (errorData: any): Response => {
    const data = errorData.data || errorData.message || errorData;
    const status = errorData.status || 500;
    const statusText = errorData.statusText || 'Internal Server Error';
    const headers = errorData.headers instanceof Headers 
        ? errorData.headers 
        : new Headers(errorData.headers || {});

    const responseBody = typeof data === 'string' 
        ? data 
        : JSON.stringify(data);
    
    return new Response(responseBody, {
        status,
        statusText,
        headers
    });
};

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

export function axiosToFetchResponse(axiosRes: AxiosResponse): Response {
    const { data, status, statusText, config } = axiosRes;

    let body: BodyInit;
    let contentType = "application/json";

    if (
        data instanceof Blob ||
        typeof data === "string" ||
        data instanceof ArrayBuffer
    ) {
        body = data;
        contentType = config.headers["content-type"] || "application/octet-stream";
    } else {
        body = JSON.stringify(data);
    }

    if (!config.headers["content-type"]) {
        config.headers["content-type"] = contentType;
    }

    const responseInit: ResponseInit = {
        status,
        statusText,
        headers: config.headers,
    };

    return new Response(body, responseInit);
}
