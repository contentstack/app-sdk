import Field from "../field";
import { AnyProperty } from "./common.types";
export declare interface IGetFieldOptions {
    /**
     * By default, getFields will return a field if has been saved.
     * If you want to get a field that has not been saved, set this to true.
     */
    useUnsavedSchema?: boolean;
}
export declare interface IEntryInternalFlags {
    /**
     * This is an internal flag used to inject a custom field instance.
     * This is used by the extension SDK to inject a custom field instance.
     */
    FieldInstance?: Field;
}
export declare interface IEntryOptions {
    _internalFlags?: IEntryInternalFlags;
}
export declare interface IGetTagsOptions {
    /**
     * By default, getFields will return a field if has been saved.
     * If you want to get a field that has not been saved, set this to true.
     */
    useUnsavedSchema?: boolean;
}
export declare type IOnEntryChangeCallback = (
/**
 * The new entry object.
 */
unresolvedEntry: Record<string, any>, 
/**
 * The new entry object with all the file fields resolved.
 */
resolvedEntry: Record<string, any>) => void;
export interface Entry extends AnyProperty {
    title: string;
    uid: string;
    content_type_title: string;
    publish_details: Array<any>;
    locale: string;
    url?: string;
}
//# sourceMappingURL=entry.types.d.ts.map