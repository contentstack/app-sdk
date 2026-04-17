import type { ValidationError } from "../types/complexFields.types";
import type {
    SetDataValidationErrorItem,
    SetDataValidationEvent,
} from "../types/setDataValidation.types";

function isValidationErrorShape(v: unknown): v is ValidationError {
    if (!v || typeof v !== "object") return false;
    const o = v as Record<string, unknown>;
    if (o.code !== "VALIDATION_ERROR") return false;
    if (typeof o.message !== "string") return false;
    if (!Array.isArray(o.details) || o.details.length === 0) return false;
    for (const d of o.details) {
        if (!d || typeof d !== "object") return false;
        const det = d as Record<string, unknown>;
        if (typeof det.field !== "string") return false;
        if (typeof det.fieldType !== "string") return false;
        if (!Array.isArray(det.reasons) || det.reasons.length === 0) {
            return false;
        }
        for (const r of det.reasons) {
            if (!r || typeof r !== "object") return false;
            const rr = r as Record<string, unknown>;
            if (typeof rr.reason !== "string" || typeof rr.message !== "string") {
                return false;
            }
        }
    }
    return true;
}

function legacyErrorsToValidationError(
    errors: SetDataValidationErrorItem[]
): ValidationError {
    return {
        code: "VALIDATION_ERROR",
        message: "Request validation failed",
        details: errors.map((e) => ({
            field: typeof e.fieldUid === "string" ? e.fieldUid : "",
            fieldType:
                typeof e.fieldType === "string" ? e.fieldType : "",
            reasons: [
                {
                    reason:
                        typeof e.code === "string" && e.code.length > 0
                            ? e.code
                            : "CONSTRAINT_VIOLATION",
                    message: e.message,
                },
            ],
        })),
    };
}

export function parseSetDataValidationPayload(
    raw: unknown
): SetDataValidationEvent | null {
    if (!raw || typeof raw !== "object") {
        return null;
    }
    const o = raw as Record<string, unknown> & {
        errors?: unknown;
        validationError?: unknown;
    };
    const requestIdRaw = o.requestId;
    if (requestIdRaw !== undefined && requestIdRaw !== null) {
        if (typeof requestIdRaw !== "string" || requestIdRaw.length === 0) {
            return null;
        }
    }
    const source = o.source;
    const status = o.status;
    if (source !== "field" && source !== "entry") {
        return null;
    }
    // Only process error status since this is a validation error event
    if (status !== "error") {
        return null;
    }

    let resolvedValidationError: ValidationError | undefined;
        if (isValidationErrorShape(o.validationError)) {
            resolvedValidationError = o.validationError;
        } else if (Array.isArray(o.errors) && o.errors.length > 0) {
            for (const item of o.errors) {
                if (
                    !item ||
                    typeof item !== "object" ||
                    typeof (item as { message?: unknown }).message !== "string"
                ) {
                    return null;
                }
            }
            resolvedValidationError = legacyErrorsToValidationError(
                o.errors as SetDataValidationErrorItem[]
            );
        }
        if (!resolvedValidationError) {
            return null;
        }

    if (o.fieldUid !== undefined && typeof o.fieldUid !== "string") {
        return null;
    }

    const parsed: SetDataValidationEvent = {
        source,
        status,
    };
    if (typeof requestIdRaw === "string" && requestIdRaw.length > 0) {
        parsed.requestId = requestIdRaw;
    }
    if (typeof o.fieldUid === "string") {
        parsed.fieldUid = o.fieldUid;
    }
    if (status === "error" && resolvedValidationError) {
        parsed.validationError = resolvedValidationError;
    }
    return parsed;
}
