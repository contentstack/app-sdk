export interface AnyProperty {
    [propName: string]: any;
}

export declare type GenericObjectType = Record<string, any>;

/**
 * Standard HTTP method strings
 */
type _HTTPMethods = 'DELETE' | 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT' | 'OPTIONS' |
'PROPFIND' | 'PROPPATCH' | 'MKCOL' | 'COPY' | 'MOVE' | 'LOCK' | 'UNLOCK' | 'TRACE' | 'SEARCH' | 'REPORT' | 'MKCALENDAR'

export type HTTPMethods = Uppercase<_HTTPMethods> | Lowercase<_HTTPMethods>

export type ApiRequestProps = {
        method: HTTPMethods,
        url: string,
        baseURL: string,
        headers?: GenericObjectType,
        body?: unknown,
        params?:GenericObjectType
        multipart_data?: {
          [key:string]: {
            "type": string,
            "value": any
          }
        }
}