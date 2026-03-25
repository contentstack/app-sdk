/** Value shape for reference field setData */
export type ReferenceValue = {
    uid: string;
    _content_type_uid: string;
};

/** Single or multiple asset UIDs for file field setData */
export type FileFieldValue = string | string[] | null;

export type ValidationReasonDetail = {
    reason: string;
    message: string;
};

export type ValidationErrorDetail = {
    field: string;
    fieldUid: string;
    fieldLabel: string;
    fieldType: string;
    reasons: ValidationReasonDetail[];
};

export type ConstraintViolation = ValidationErrorDetail;

export type ValidationError = {
    code: "VALIDATION_ERROR";
    message: string;
    details: ValidationErrorDetail[];
};

export type SetEntryDataResult = Record<string, unknown> & {
    warnings?: ConstraintViolation[];
};
