declare module "post-robot" {
    export {};
    type CrossDomainWindowType = Window | null;
    type DomainMatcher = string | RegExp | string[];
    type HandlerType = (event: {
        source: CrossDomainWindowType;
        origin: string;
        data: any;
    }) => Promise<any>;
    type ErrorHandlerType = (err: any) => void;

    interface ServerOptionsType {
        handler?: HandlerType | undefined;
        errorHandler?: ErrorHandlerType | undefined;
        window?: CrossDomainWindowType | undefined;
        name?: string | undefined;
        domain?: DomainMatcher | undefined;
        once?: boolean | undefined;
        errorOnClose?: boolean | undefined;
    }

    interface CancelableType {
        cancel: () => void;
    }

    export function on(name: string, handler?: HandlerType): CancelableType;

    export function once(
        name: string,
        options?: ServerOptionsType | HandlerType,
        handler?: HandlerType
    ): Promise<{ source: any; origin: string; data: object }>;

    interface RegularRequestOptionsType {
        domain?: DomainMatcher | undefined;
        fireAndForget?: false | undefined;
        timeout?: number | undefined;
    }

    interface ResponseMessageEvent<T = object> {
        source: CrossDomainWindowType;
        origin: string;
        data: T;
    }

    interface FireAndForgetRequestOptionsType {
        domain?: DomainMatcher | undefined;
        fireAndForget?: true | undefined;
        timeout?: number | undefined;
    }

    export function send(
        win: CrossDomainWindowType,
        name: string,
        data?: object,
        options?: FireAndForgetRequestOptionsType & RegularRequestOptionsType
    ): Promise<ResponseMessageEvent>;

    export function sendToParent<T = object>(
        name: string,
        data?: object,
        options?: FireAndForgetRequestOptionsType & RegularRequestOptionsType
    ): Promise<ResponseMessageEvent<T>>;

    interface Config {
        LOG_LEVEL: string;
    }

    export const CONFIG: Config;
}
