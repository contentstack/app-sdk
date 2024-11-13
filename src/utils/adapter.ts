import PostRobot from 'post-robot';
import { onData, onError } from './utils';
import { ApiRequestParams } from '../types/api.type';
import { RequestOption, GenericObjectType } from '../types/common.types';

export const dispatchPostRobotRequest = (postRobot: typeof PostRobot) => (url:string ,opts?: RequestOption): Promise<GenericObjectType> => {
  return postRobot
    .sendToParent("apiAdapter", {url, option:opts})
    .then(onData)
    .catch(onError);
};

export const createSDKAdapter = (postRobot: typeof PostRobot) => async (config: ApiRequestParams) => {
  try {
    if (config.data) {
      if (typeof config.data === "string") {
          try {
              config.data = JSON.parse(config.data);
          } catch (e) {
              config.data = config.data;
          }
      } else {
          config.data = config.data;
      }
  }
    const data = await dispatchPostRobotRequest(postRobot)(config.url, {
      baseURL: config.baseURL,
      url: config.url,
      method: config.method,
      headers: config.headers,
      body: config.data as BodyInit,
    });
    return {
      data,
      status: data?.status || 200,
      statusText: 'OK',
      headers: config.headers || {},
      config,
    };
  } catch (error) {
    const typedError = error as GenericObjectType & { status?: number; statusText?: string; headers?: Record<string, string>; body?: any; message?: string };
    return {
      data: typedError.body || typedError.message || typedError.data,
      status: typedError.status || 500,
      statusText: typedError.statusText || 'Internal Server Error',
      headers: typedError.headers || {},
      config,
    };
  }
};
