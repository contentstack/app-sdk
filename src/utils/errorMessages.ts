export const ERROR_MESSAGES = Object.freeze({
    configPage: {
        setValidity: {
            isValidTypeBoolean: "isValid should be a boolean",
            messageTypeString: "message should be a string",
        },
    },
     entryField: {
        entry: {
            tagsShouldNotBeBlank: "Tags cannot be blank",
            tagsShouldBeArrayOfStrings: "Tags must be an array of strings",
        },
        frame: {
            dimensionHeightShouldBeNumber: "Dimension height must be a number",
            dimensionWidthShouldBeNumber: "Dimension width must be a number",
        },
    },
});

export default function generateErrorMessages(message: string) {
    return `Contentstack App SDK: ${message}`;
}
