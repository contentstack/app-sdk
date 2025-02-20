import PostRobot from 'post-robot';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { onError, convertHeaders, convertAxiosHeadersToHeadersInit } from './utils';

/**
 * Dispatches a request using PostRobot.
 * @param postRobot - The PostRobot instance.
 * @returns A function that takes AxiosRequestConfig and returns a promise.
 */
export const dispatchAdapter = (postRobot: typeof PostRobot) => (config: AxiosRequestConfig)=> {
  return postRobot
    .sendToParent("apiAdapter",  config )
    .then(({ data }) => ({ ...data, config }))
    .catch(onError);
};

/**
 * Dispatches an API request using axios and PostRobot.
 * @param url - The URL of the API endpoint.
 * @param options - Optional request options.
 * @returns A promise that resolves to a partial Response object.
 */
export const dispatchApiRequest = async (url: string, options?: RequestInit): Promise<Partial<Response>> => {
  try {
    const config: AxiosRequestConfig = {
      url,
      method: options?.method || "GET",
      ...(options?.headers && { headers: convertHeaders(options.headers) }),
      ...(options?.body && { data: options?.body })
    };

    const responseData = await dispatchAdapter(PostRobot)(config) as AxiosResponse; 
    const isCallSuccessful = responseData.status >= 200 && responseData.status < 300;
    const fetchResponse: Partial<Response> = {
      ok: isCallSuccessful,
      status: responseData.status,
      statusText: responseData.statusText,
      headers: new Headers(convertAxiosHeadersToHeadersInit(responseData.config.headers || {})),
      json: async () => responseData.data,
      text: async () => JSON.stringify(responseData.data),
    };

    return fetchResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API request failed:", error.message);
      throw new Error(`API request failed: ${error.message}`);
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};