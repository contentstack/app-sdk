import { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from "axios";

import { Region, RegionType, RTEContext, IRTEInitData, LocationType } from "../types";

export function onData<Data extends Record<string, any>>(data: { data: Data }) {
    if (typeof data.data === "string") {
        return Promise.reject(data.data);
    }
    return Promise.resolve(data.data);
}

export function onError(error: Error) {
    return Promise.reject(error);
}

export function formatAppRegion(region: Region): RegionType {
    return region ?? Region.UNKNOWN;;
}

/**
 * Helper function to convert RTEContext to InitializationData format
 */
export function convertRTEContextToInitData(context: RTEContext): IRTEInitData {
    return {
        app_id: context.extension.app_uid,
        currentBranch: context.currentBranch,
        extension_uid: context.extension.uid,
        installation_uid: context.extension.app_installation_uid,
        region: context.region,
        stack: context.stack,
        type: LocationType.RTE,
        user: context.user,
        endpoints: context.endpoints,
        config: context.extension.config,
        entry: context.entry,
        content_type: context.content_type,
        locale: context.locale,
    };
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
