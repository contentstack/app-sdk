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

export type RequestOption = {
        method: HTTPMethods,
        headers?: GenericObjectType,
        body?: unknown,
        [key:string]: any
}
export type RequestHandler = {
  url: string,
} & RequestOption