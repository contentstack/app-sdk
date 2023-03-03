import Field from "../field";

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
