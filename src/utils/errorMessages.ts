export const ERROR_MESSAGES = Object.freeze({
    configPage: {
        setValidationState: {
            isValidatedTypeBoolean: "isValidated should be a boolean",
            messageTypeString: "message should be a string",
        },
    },
});

export default function generateErrorMessages(message: string) {
    return `Contentstack App SDK: ${message}`;
}
