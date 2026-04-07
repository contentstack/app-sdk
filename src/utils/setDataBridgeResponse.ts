/**
 * Interprets post-robot `sendToParent("setData", ...)` results from the CMS bridge
 * (app-extension-component). Shapes may be flat on `data` or nested under `data.data`
 * depending on post-robot serialization.
 */

type ResponseEnvelope = { data?: unknown };

function asRecord(v: unknown): Record<string, unknown> | undefined {
    return v && typeof v === "object" && !Array.isArray(v)
        ? (v as Record<string, unknown>)
        : undefined;
}

/** Tier 1 validation failure shape from the bridge. */
export function isValidationErrorPayload(response: ResponseEnvelope): boolean {
    const payload = asRecord(response?.data);
    if (!payload) return false;
    if (payload.code === "VALIDATION_ERROR") return true;
    const inner = asRecord(payload.data);
    return inner?.code === "VALIDATION_ERROR";
}

/** Validation error object for Promise.reject (top-level or nested). */
export function getValidationErrorPayload(
    response: ResponseEnvelope
): Record<string, unknown> {
    const payload = asRecord(response?.data);
    if (payload?.code === "VALIDATION_ERROR") {
        return payload;
    }
    const inner = asRecord(payload?.data);
    if (inner?.code === "VALIDATION_ERROR") {
        return inner;
    }
    return payload ?? {};
}

/** Tier 2 warnings array if present on the bridge / host response. */
export function getSetDataWarnings(response: ResponseEnvelope): unknown[] {
    const payload = asRecord(response?.data);
    if (!payload) return [];
    if (Array.isArray(payload.warnings)) {
        return payload.warnings as unknown[];
    }
    const inner = asRecord(payload.data);
    if (inner && Array.isArray(inner.warnings)) {
        return inner.warnings as unknown[];
    }
    return [];
}
