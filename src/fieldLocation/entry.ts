import Entry from "../entry";
import { IFieldLocationInitData } from "../types";

class FieldLocationEntry extends Entry {
    constructor(
        initializationData: IFieldLocationInitData,
        connection: any,
        emitter: EventEmitter
    ) {
        super(initializationData, connection, emitter);
    }

    /**
     * Returns the value of the tags associated with the entry.
     * @returns {string[]} Returns an array of tags associated with the entry.
     */
    getTags(): Array<string> {
        return this._data.tags;
    }

    /**
     * Sets the tags on the entry.
     * @param tags tags to be set on the entry
     * @returns {string[]} Returns an array of tags associated with the entry.
     */
    setTags(tags: Array<string>): Array<string> {
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

        if (!areTagsValid(tags)) {
            throw new Error("Tags should be an array of strings");
        }

        this._connection.sendToParent("setTags", { tags });
        return tags;
    }
}

export default FieldLocationEntry;
