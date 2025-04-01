import PostRobot from "post-robot";
import { Response } from "node-fetch";
import {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";

import {
    onError,
    fetchToAxiosConfig,
    handleApiError,
    sanitizeResponseHeader,
} from "./utils";

/**
 * Dispatches a request using PostRobot.
 * @param postRobot - The PostRobot instance.
 * @returns A function that takes AxiosRequestConfig and returns a promise.
 */
export const dispatchAdapter =
    (postRobot: typeof PostRobot) =>
    (config: AxiosRequestConfig): Promise<AxiosResponse> => {
        return postRobot
            .sendToParent("apiAdapter", config)
            .then((event: unknown) => {
                const { data } = event as { data: AxiosResponse };
                if (data.status >= 400) {
                    throw data
                }
                return data as AxiosResponse;
            })
            .catch((err)=>onError(err));
    };
/**
 * Dispatches an API request using axios and PostRobot.
 * @param url - The URL of the API endpoint.
 * @param options - Optional request options.
 * @returns A promise that resolves to a partial Response object.
 */
export const dispatchApiRequest = async (
    url: string,
    options?: RequestInit
): Promise<Response> => {
    try {
        const config = fetchToAxiosConfig(url, options);
        const responseData = (await dispatchAdapter(PostRobot)(
            config
        )) as AxiosResponse;
       
        
        return new Response(responseData?.data, {
            status: responseData.status,
            statusText: responseData.statusText,
            url: responseData.config.url,
            headers: new Headers(
                sanitizeResponseHeader(responseData.config.headers || {})
            ),
        });
    } catch (error) {
        return handleApiError(error as AxiosResponse | AxiosError);
    }
};
