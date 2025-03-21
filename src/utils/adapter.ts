import PostRobot from "post-robot";
import { AxiosError, AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios";

import { onError, fetchToAxiosConfig, serializeAxiosResponse, createErrorResponse, axiosError } from "./utils";

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
    options?: RequestInit,
): Promise<Response> => {
    try {
        const config = fetchToAxiosConfig(url, options);
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
     throw isAxiosError(error)
     ? createErrorResponse(axiosError(error))
     : createErrorResponse(error);
  }
};
