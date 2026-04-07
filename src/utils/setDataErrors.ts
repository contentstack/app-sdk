/**
 * Typed errors for setData / setEntryData failures returned from the CMS bridge
 * (app-extension-component). The bridge may ACK success while embedding
 * VALIDATION_ERROR in the payload; the SDK turns
 * those into real Error instances so callers get clear stack traces and
 * `instanceof` checks work after `await` / `.catch`.
 */

const VALIDATION_CODE = "VALIDATION_ERROR" as const;
export class SetDataValidationError extends Error {
    readonly code: typeof VALIDATION_CODE = VALIDATION_CODE;
    readonly details: unknown;

    constructor(message: string, details?: unknown) {
        super(message);
        this.name = "SetDataValidationError";
        this.details = details;
        Object.setPrototypeOf(this, new.target.prototype);
    }


}
