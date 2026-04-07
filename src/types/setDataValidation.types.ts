/**
 * Inbound payload on `extensionEvent` when {@link SET_DATA_VALIDATION_WIRE_NAME} is used.
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
    status: "error" | "success";
    /**
     * Same structure as tier-1 bridge `VALIDATION_ERROR` payloads:
     * `code`, `message`, and `details` with `field`, `fieldType`, and `reasons`.
     */
    validationError?: ValidationError;
};

/** Wire-level discriminator on `extensionEvent` (parent → iframe). */
export const SET_DATA_VALIDATION_WIRE_NAME = "SET_DATA_VALIDATION";

/**
 * Internal {@link wolfy87-eventemitter} event key after stale filtering — camelCase like `entrySave`, not the wire name.
 */
export const SET_DATA_VALIDATION_EMITTER_EVENT = "setDataValidation";
