import type {
    SetDataValidationErrorItem,
    SetDataValidationEvent,
} from "../types/setDataValidation.types";

export function parseSetDataValidationPayload(
    raw: unknown
): SetDataValidationEvent | null {
    if (!raw || typeof raw !== "object") {
        return null;
    }
    const o = raw as Record<string, unknown>;
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
    if (status !== "error" && status !== "success") {
        return null;
    }
    if (status === "error") {
        const errors = o.errors;
        if (!Array.isArray(errors) || errors.length === 0) {
            return null;
        }
        for (const item of errors) {
            if (
                !item ||
                typeof item !== "object" ||
                typeof (item as { message?: unknown }).message !== "string"
            ) {
                return null;
            }
        }
    } else {
        const errors = o.errors;
        if (Array.isArray(errors) && errors.length > 0) {
            return null;
        }
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
    if (status === "error") {
        parsed.errors = o.errors as SetDataValidationErrorItem[];
    }
    return parsed;
}
