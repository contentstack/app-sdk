import { Region } from "../types";
import { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from "axios";

export function onData<Data extends Record<string, any>>(data: { data: Data }) {
    if (typeof data.data === "string") {
        return Promise.reject(data.data);
    }
    return Promise.resolve(data.data);
}

export function onError(error: Error) {
    return Promise.reject(error);
}

export function formatAppRegion(region: string): Region {
    if (region && Object.values(Region).includes(region as Region)) {
        return region as Region;
    }
    return Region.UNKNOWN;
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

  export const fetchToAxiosConfig = (url: string, options: RequestInit = {}): AxiosRequestConfig => {
    const axiosConfig: AxiosRequestConfig = {
      url,
      method: options.method || 'GET',
      headers: options.headers ? convertHeaders({...options.headers}) : {}, 
      data: options.body,
    };
  
    if (options.credentials === 'include') {
      axiosConfig.withCredentials = true;
    }
  
    return axiosConfig;
  }

  export const serializeAxiosResponse = (responseData: AxiosResponse, config) => {
    return {
      data: responseData.data,
      status: responseData.status,
      statusText: responseData.statusText,
      headers: responseData.headers as AxiosHeaders,
      config,
    }
  }