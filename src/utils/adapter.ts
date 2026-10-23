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
        config: AxiosRequestConfig
    ) => {
        return new Promise((resolve, reject) => {
            postRobot
                .sendToParent("apiAdapter", config)
                .then((event: unknown) => {
                    const { data: response } = event as { data: AxiosResponse };

                    if (response.status >= 400) {
                        // The host replies with the upstream AxiosResponse for
                        // HTTP errors and with `{ status, message, stack }` for
                        // transport failures. Keep the flat keys that
                        // createAdapter() consumers already read (err.status,
                        // err.data) and, for HTTP errors, also nest the reply
                        // under `response` so api() can convert it the same
                        // way it converts an AxiosError.
                        const isHttpError = "data" in response;
                        return reject({
                            ...response,
                            config,
                            ...(isHttpError && { response }),
                        });
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
    options?: RequestInit
): Promise<Response> => {
    try {
        const config = fetchToAxiosConfig(url, options);
        const axiosResponse = (await dispatchAdapter(PostRobot)(
            config
        )) as AxiosResponse;

        return axiosToFetchResponse(axiosResponse);
    } catch (err: any) {
        // HTTP error (4xx/5xx): the backend body, status text and response
        // headers are passed through unchanged, as fetch would.
        if (err.response) {
            return axiosToFetchResponse(err.response);
        }
        // Transport error (host could not reach the backend, or the
        // post-robot call itself failed).
        return new Response(err.stack, {
            status: err.status || 500,
            statusText: err.message || "Internal Server Error",
            headers: err.config?.headers,
        });
    }
};

