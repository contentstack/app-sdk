import PostRobot from "post-robot";
import {
    AxiosError,
    AxiosHeaders,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";

import { axiosToFetchResponse, fetchToAxiosConfig } from "./utils";

/**
 * Dispatches a request using PostRobot.
 * @param postRobot - The PostRobot instance.
 * @returns A function that takes AxiosRequestConfig and returns a promise.
 */
export const dispatchAdapter =
    (postRobot: typeof PostRobot) =>
    (
        config: AxiosRequestConfig,
        context?: { installationUID: string; extensionUID: string }
    ) => {
        return new Promise((resolve, reject) => {
            postRobot
                .sendToParent("apiAdapter", {
                    data: config,
                    extension: context,
                })
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
 * Dispatches an API request using axios and PostRobot.
 * @param url - The URL of the API endpoint.
 * @param options - Optional request options.
 * @returns A promise that resolves to a partial Response object.
 */
export const dispatchApiRequest = async (
    url: string,
    options?: RequestInit,
    context?: { installationUID: string; extensionUID: string }
): Promise<Response> => {
    try {
        const config = fetchToAxiosConfig(url, options);
        const axiosResponse = (await dispatchAdapter(PostRobot)(
            config,
            context
        )) as AxiosResponse;

        return axiosToFetchResponse(axiosResponse);
    } catch (err: any) {
        if (err.response) {
            return new Response(err.response?.data, {
                status: err.response.status,
                statusText: err.response.statusText,
                headers: err.response.headers,
            });
        }
        return new Response(err.stack, {
            status: err.status || 500,
            statusText: err.message || "Internal Server Error",
            headers: err.config.headers,
        });
    }
};

