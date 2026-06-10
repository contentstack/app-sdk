/**
 * Validation error thrown when field validation fails during any operation.
 */
export class ValidationError extends Error {
    readonly code = "VALIDATION_ERROR" as const;
  
    constructor(
      message: string,
      public readonly details: Array<{
        fieldUid: string;
        fieldLabel?: string;
        fieldType?: string;
        reasons: Array<{ reason: string; message: string }>;
      }>
    ) {
      super(message);
    }
  }
  