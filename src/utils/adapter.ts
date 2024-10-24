import PostRobot from 'post-robot';
import { onData, onError } from './utils';
import { ApiRequestParams, ApiResponse } from '../types/api.type';
import { RequestInit, GenericObjectType } from '../types/common.types';

type RequestHandler = (opts: RequestInit) => Promise<GenericObjectType>;

const createRequestProps = (config: ApiRequestParams): ApiRequestParams => {
  const baseURL = (config.baseURL || '').replace(":443", "");
  return {
    baseURL,
    url: config.url,
    method: config.method,
    headers: config.headers,
    data: config.data
  };
};

const createApiResponse = (data: GenericObjectType, config: ApiRequestParams, req: RequestInit): ApiResponse<GenericObjectType> => {
  return {
    data,
    status: data.status || 200,
    statusText: 'OK',
    headers: config.headers || {},
    config,
    request: req,
  };
};

const handleApiError = (error: any, config: ApiRequestParams, req: RequestInit): ApiResponse<GenericObjectType> => {
  const typedError = error as GenericObjectType & { status?: number; statusText?: string; headers?: Record<string, string> };
  return {
    data: typedError.body || typedError.message || typedError.data,
    status: typedError.status || 500,
    statusText: typedError.statusText || 'Internal Server Error',
    headers: typedError.headers || {},
    config,
    request: req,
  };
};

export function createApiAdapter(requestHandler: RequestHandler): (config: ApiRequestParams) => Promise<ApiResponse<GenericObjectType>> {
  return async (config: ApiRequestParams): Promise<ApiResponse<GenericObjectType>> => {
    const req = createRequestProps(config);
    try {
      const data = await requestHandler(req);
      return createApiResponse(data, config, req);
    } catch (error) {
      return handleApiError(error, config, req);
    }
  };
}

export const dispatchPostRobotRequest = (postRobot: typeof PostRobot) => (opts: RequestInit| ApiRequestParams): Promise<GenericObjectType> => {
  return postRobot
    .sendToParent("apiAdapter", opts)
    .then(onData)
    .catch(onError);
};

export const createSDKAdapter = (postRobot: typeof PostRobot) => createApiAdapter(dispatchPostRobotRequest(postRobot));