export const ERROR_MESSAGES = Object.freeze({
    configPage: {
        setValidity: {
            isValidTypeBoolean: "isValid should be a boolean",
            messageTypeString: "message should be a string",
        },
    },
});

export default function generateErrorMessages(message: string) {
    return `Contentstack App SDK: ${message}`;
}
