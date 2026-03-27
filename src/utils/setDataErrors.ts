/**
 * Typed errors for setData / setEntryData failures returned from the CMS bridge
 * (app-extension-component). The bridge may ACK success while embedding
 * VALIDATION_ERROR or SETDATA_RESOLUTION_ERROR in the payload; the SDK turns
 * those into real Error instances so callers get clear stack traces and
 * `instanceof` checks work after `await` / `.catch`.
 */

const VALIDATION_CODE = "VALIDATION_ERROR" as const;
const RESOLUTION_CODE = "SETDATA_RESOLUTION_ERROR" as const;

export class SetDataValidationError extends Error {
    readonly code: typeof VALIDATION_CODE = VALIDATION_CODE;
    readonly details: unknown;

    constructor(message: string, details?: unknown) {
        super(message);
        this.name = "SetDataValidationError";
        this.details = details;
        Object.setPrototypeOf(this, new.target.prototype);
    }

    static fromBridgePayload(
        payload: Record<string, unknown>
    ): SetDataValidationError {
        const message =
            typeof payload.message === "string"
                ? payload.message
                : "setData validation failed";
        return new SetDataValidationError(message, payload.details);
    }
}

export class SetDataResolutionError extends Error {
    readonly code: typeof RESOLUTION_CODE = RESOLUTION_CODE;
    readonly failures: unknown;

    constructor(message: string, failures?: unknown) {
        super(message);
        this.name = "SetDataResolutionError";
        this.failures = failures;
        Object.setPrototypeOf(this, new.target.prototype);
    }

    static fromBridgePayload(
        payload: Record<string, unknown>
    ): SetDataResolutionError {
        const message =
            typeof payload.message === "string"
                ? payload.message
                : "setData resolution failed";
        return new SetDataResolutionError(message, payload.failures);
    }
}
