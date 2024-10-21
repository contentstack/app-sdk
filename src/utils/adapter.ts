import PostRobot from 'post-robot';
import { onData, onError } from './utils';
import { GenericRequestConfig, GenericResponse } from '../types/generic.type';
import { ApiRequestProps, GenericObjectType } from '../types/common.types';

type RequestHandler = (opts: ApiRequestProps) => Promise<GenericObjectType>;

const createRequestProps = (config: GenericRequestConfig): ApiRequestProps => {
  const baseURL =  config.host || config.defaultHostName || config.baseURL|| '';
  return {
    baseURL,
    url: config.url,
    method: config.method,
    headers: config.headers,
    body: config.data,
    params: config.params,
  };
};

const createGenericResponse = (data: GenericObjectType, config: GenericRequestConfig, req: ApiRequestProps): GenericResponse<GenericObjectType> => {
  return {
    data,
    status: data.status || 200,
    statusText: 'OK',
    headers: config.headers || {},
    config,
    request: req,
  };
};

const handleGenericError = (error: any, config: GenericRequestConfig, req: ApiRequestProps): GenericResponse<GenericObjectType> => {
  const typedError = error as GenericObjectType & { status?: number; statusText?: string; headers?: Record<string, string> };
  return {
    data: typedError,
    status: typedError.status || 500,
    statusText: typedError.statusText || 'Internal Server Error',
    headers: typedError.headers || {},
    config,
    request: req,
  };
};

export function createGenericAdapter(requestHandler: RequestHandler): (config: GenericRequestConfig) => Promise<GenericResponse<GenericObjectType>> {
  return async (config: GenericRequestConfig): Promise<GenericResponse<GenericObjectType>> => {
    const req = createRequestProps(config);

    try {
      const data = await requestHandler(req);
      return createGenericResponse(data, config, req);
    } catch (error) {
      return handleGenericError(error, config, req);
    }
  };
}

export const dispatchPostRobotRequest = (postRobot: typeof PostRobot) => (opts: ApiRequestProps): Promise<GenericObjectType> => {
  return postRobot
    .sendToParent("apiAdapter", opts)
    .then(onData)
    .catch(onError);
};

export const createSDKAdapter = (postRobot: typeof PostRobot) => createGenericAdapter(dispatchPostRobotRequest(postRobot));