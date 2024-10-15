import PostRobot from "post-robot";
import { onData, onError } from "./utils";import { AxiosRequestConfig, AxiosResponse } from '../types/axios.type';
import { ApiRequestProps, GenericObjectType } from '../types/common.types';

export function createSDKAdapter(postRobot: typeof PostRobot): (config: AxiosRequestConfig) => Promise<AxiosResponse<GenericObjectType>> {
  return async (config: AxiosRequestConfig): Promise<AxiosResponse<GenericObjectType>> => {
    const req: ApiRequestProps = {
      url: config?.url,
      method: config?.method,
      headers: config?.headers,
      body: config?.data,
      params: config?.params,
    };

    try {
      const data = await dispatchPostRobotRequest(postRobot, req) as GenericObjectType;
      return {
        data,
        status: data.status || 200,
        statusText: 'OK',
        headers: config.headers || {},
        config,
        request: req,
      };
    } catch (error) {
      const typedError = error as GenericObjectType & { status?: number; statusText?: string; headers?: Record<string, string> };
      return {
        data: typedError,
        status: typedError.status || 500,
        statusText: typedError.statusText || 'Internal Server Error',
        headers: typedError.headers || {},
        config,
        request: req,
      };
    }
  };
}

export function dispatchPostRobotRequest(postRobot: typeof PostRobot, opts:ApiRequestProps):Promise<any> {
    return postRobot
      .sendToParent("apiAdapter", opts)
      .then(onData)
      .then((data) => data)
      .catch(onError);
}