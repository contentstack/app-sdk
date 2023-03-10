import Entry from "../entry";
import { IEntryFieldLocationInitData } from "../types";
import { IGetTagsOptions } from "../types/entry.types";
import { errorMessage } from "../utils/errorMessages";
import Field from "./field";

class EntryFieldLocationEntry extends Entry {
    constructor(
        initializationData: IEntryFieldLocationInitData,
        connection: any,
        emitter: EventEmitter
    ) {
        super(initializationData, connection, emitter, {
            _internalFlags: {
                FieldInstance: Field as any,
            },
        });
    }

    /**
     * Returns the value of the tags associated with the entry.
     * @returns {string[]} Returns an array of tags associated with the entry.
     */
    getTags(options?: IGetTagsOptions): Array<string> {
        const { useUnsavedSchema = false } = options || {};

        if (useUnsavedSchema) {
            return this._changedData?.tags || this._data.tags;
        } else {
            return this._data.tags;
        }
    }

    /**
     * Sets the tags on the entry.
     * @param tags tags to be set on the entry
     * @returns {string[]} Returns an array of tags associated with the entry.
     */
    async setTags(tags: Array<string>): Promise<Array<string>> {
        /**
         * Validate if the tags are array of strings
         * @param {Array<string>} tags
         * @returns {boolean} Returns true if the tags are array of strings
         */
        function areTagsValid(tags: Array<string>): tags is Array<string> {
            return (
                Array.isArray(tags) &&
                tags.every((tag) => typeof tag === "string")
            );
        }

        if (tags === undefined) {
            throw new Error(errorMessage.entryField.entry.tagsShouldNotBeBlank);
        }

        if (!areTagsValid(tags)) {
            throw new Error(
                errorMessage.entryField.entry.tagsShouldBeArrayOfStrings
            );
        }

        await this._connection.sendToParent("setTags", { tags });

        if (!this._changedData) {
            this._changedData = {};
        }

        this._changedData.tags = tags;

        return tags;
    }
}

export default EntryFieldLocationEntry;
