import PostRobot from "post-robot";
import { Response } from "node-fetch";
import {
    AxiosError,
    AxiosHeaders,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";

import { fetchToAxiosConfig } from "./utils";

/**
 * Dispatches a request using PostRobot.
 * @param postRobot - The PostRobot instance.
 * @returns A function that takes AxiosRequestConfig and returns a promise.
 */
export const dispatchAdapter =
    (postRobot: typeof PostRobot) => (config: AxiosRequestConfig) => {
        return new Promise((resolve, reject) => {
            postRobot
                .sendToParent("apiAdapter", config)
                .then((event: unknown) => {
                    const { data: response } = event as { data: AxiosResponse };

                    if (response.status >= 400) {
                        return reject({ ...response, config });
                    }
                    resolve({
                        data: response.data,
                        status: response.status,
                        statusText: response.statusText,
                        headers: response.headers,
                        config: config,
                    });
                })
                .catch(() => {
                    return reject(
                        new AxiosError(
                            "Something went wrong with the request",
                            "ERR_INTERNAL_SERVER",
                            {
                                ...config,
                                headers: config.headers as AxiosHeaders,
                            },
                            null,
                            undefined
                        )
                    );
                });
        });
    };
/**
GitHub Copilot
To handle errors generically and robustly, we can refactor the code to ensure that all errors are properly processed and converted into a standardized format. Here's how you can fix and improve the error handling in the provided code:

Refactored Code

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
        const response = (await dispatchAdapter(PostRobot)(
            config
        )) as AxiosResponse;

        return new Response(response?.data, {
            status: response.status,
            statusText: response.statusText,
            url: response.config.url,
            headers: new Headers(Object.entries(response.headers ?? {})),
        });
    } catch (err: any) {
        if (err.response) {
            return new Response(err.response?.data, {
                status: err.status,
                statusText: err.statusText,
                headers: new Headers(
                    Object.entries(err.response.headers ?? {})
                ),
            });
        }
        return new Response(err.stack, {
            status: err.status || 500,
            statusText: err.message || "Internal Server Error",
            headers: new Headers(Object.entries(err.headers ?? {})),
        });
    }
};
