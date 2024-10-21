import { HTTPMethods } from './common.types';

export interface GenericRequestConfig {
  url: string;
  method: HTTPMethods;
  baseURL?: string;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
  timeout?: number;
  retries?: number;
  [key: string]: any;
}

export interface GenericResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: GenericRequestConfig;
  request?: any;
}

export type GenericAdapter = (config: GenericRequestConfig) => Promise<GenericResponse>;

// Example: Define a type for GenericError (optional)
export interface GenericError<T = any> extends Error {
  config: GenericRequestConfig;
  code?: string;
  request?: any;
  response?: GenericResponse<T>;
  isGenericError: boolean;
  toJSON: () => object;
}