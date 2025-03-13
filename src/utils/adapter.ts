import PostRobot from "post-robot";
import { AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios";

import { onError, fetchToAxiosConfig, serializeAxiosResponse } from "./utils";
import { RequestInitConfig, ServiceURLsMap } from "../types/api.type";

export const resolveBaseUrl = (hostingRegion:ServiceURLsMap, option?:RequestInitConfig)=>{
return option?.service? hostingRegion[option.service]: hostingRegion.CMA
}


/**
 * Dispatches a request using PostRobot.
 * @param postRobot - The PostRobot instance.
 * @returns A function that takes AxiosRequestConfig and returns a promise.
 */
export const dispatchAdapter = (postRobot: typeof PostRobot) => (config: AxiosRequestConfig): Promise<AxiosResponse> => {
  return postRobot
    .sendToParent("apiAdapter", config)
    .then((event:unknown) => {
      const { data } = event as { data: AxiosResponse };
      if (data.status >= 400) {
        throw serializeAxiosResponse(data, config);
      }
      return serializeAxiosResponse(data, config);
    })
    .catch(onError);
};
/**
 * Dispatches an API request using axios and PostRobot.
 * @param url - The URL of the API endpoint.
 * @param options - Optional request options.
 * @returns A promise that resolves to a partial Response object.
 */
export const dispatchApiRequest = async (
    url: string,
    hostedUrl:ServiceURLsMap,
    options?: RequestInitConfig,
): Promise<Response> => {
    try {
        const updatedOptions = {...options, baseURL: resolveBaseUrl(hostedUrl, options)};
        const config = fetchToAxiosConfig(url, updatedOptions);
        const responseData = (await dispatchAdapter(PostRobot)(
            config
        )) as AxiosResponse;
  
        if (isAxiosError(responseData)) {
          throw responseData;
        }
        const response = new Response(responseData?.data, {
            status: responseData.status,
            statusText: responseData.statusText,
            headers: new Headers(responseData.config.headers || {}),
        });
        return response
        
    } catch (error: any) {
      const data = error.response?.data || error.data;
      const status = error.response?.status || error.status || 500;
      const statusText = error.response?.statusText || error.statusText || "Internal Server Error";
      const headers = new Headers(error.response?.headers || error.headers);

      throw new Response(data, {
          status,
          statusText,
          headers,
      });
  }
};
