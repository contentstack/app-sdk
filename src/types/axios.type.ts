import { HTTPMethods } from './common.types';

export interface AxiosRequestConfig {
  url: string;
  method: HTTPMethods;
  baseURL?: string;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
  timeout?: number;
  retries?: number;
  adapter?: (config: AxiosRequestConfig) => Promise<AxiosResponse>;
  [key: string]: any;
}

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig;
  request?: any;
}

// Define the Axios Adapter type
export type AxiosAdapter = (config: AxiosRequestConfig) => Promise<AxiosResponse>;

// Example: Define a type for AxiosError (optional)
export interface AxiosError<T = any> extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse<T>;
  isAxiosError: boolean;
  toJSON: () => object;
}