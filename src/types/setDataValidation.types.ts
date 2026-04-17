/**
 * Inbound validation error payload on `extensionEvent` with name `setDataValidationError`.
 * This event is only sent for validation errors, not success cases.
 * Align with docs/PLAN-async-setdata-validation-extensionEvent.md.
 */
import type { ValidationError } from "./complexFields.types";

/**
 * @deprecated Hosts should send {@link SetDataValidationEvent.validationError} instead.
 * The SDK normalizes this shape when `validationError` is absent.
 */
export type SetDataValidationErrorItem = {
    fieldUid?: string;
    fieldType?: string;
    message: string;
    code?: string;
    details?: unknown;
};

export type SetDataValidationEvent = {
    /** Present when the host echoes correlation id; omitted in simplified validation path. */
    requestId?: string;
    source: "field" | "entry";
    fieldUid?: string;
    status: "error";
    validationError?: ValidationError;
};

/**
 * Internal {@link wolfy87-eventemitter} event key for validation errors only.
 * CamelCase consistent with other events like `entrySave`.
 */
export const SET_DATA_VALIDATION_ERROR = "setDataValidationError";
