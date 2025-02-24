import PostRobot from 'post-robot';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { onError, fetchToAxiosConfig } from './utils';

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
export const dispatchApiRequest = async (url: string, options?: RequestInit): Promise<Response> => {
  try {
    const config = fetchToAxiosConfig(url, options);
    const responseData = await dispatchAdapter(PostRobot)(config) as AxiosResponse; 
    return new Response(responseData.data,{
      status: responseData.status,
      statusText: responseData.statusText,
      headers: new Headers(responseData.config.headers || {}),
    });

  } catch (error: any) {
    if (error.response) {
      const fetchResponse = new Response(error.response.data, {
          status: error.response.status,
          statusText: error.response.statusText,
          headers: new Headers(error.response.headers) 
      });
      return Promise.reject(fetchResponse);
    } else if (error.request) {
        return Promise.reject(new Response(null, { status: 0, statusText: 'Network Error' }));
    } else {
        return Promise.reject(new Response(null, { status: 0, statusText: error.message }));
    }
  }
};