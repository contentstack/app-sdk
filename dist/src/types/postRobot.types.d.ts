declare type CrossDomainWindowType = Window | null;
declare type DomainMatcher = string | RegExp | string[];
declare type HandlerType = (event: {
    source: CrossDomainWindowType;
    origin: string;
    data: any;
}) => Promise<any>;
declare type ErrorHandlerType = (err: any) => void;
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
interface Config {
    LOG_LEVEL: string;
}
//# sourceMappingURL=postRobot.types.d.ts.map