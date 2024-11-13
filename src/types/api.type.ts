import { HTTPMethods } from './common.types';

export interface ApiRequestParams {
  url: string;
  method: HTTPMethods;
  baseURL?: string;
  headers?: Record<string, string>;
  data?: unknown;
  [key: string]: any;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: ApiRequestParams;
  request?: any;
}
