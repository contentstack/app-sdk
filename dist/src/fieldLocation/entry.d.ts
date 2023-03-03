import Entry from "../entry";
import { IFieldLocationInitData } from "../types";
declare class FieldLocationEntry extends Entry {
    constructor(initializationData: IFieldLocationInitData, connection: any, emitter: EventEmitter);
    /**
     * Returns the value of the tags associated with the entry.
     * @returns {string[]} Returns an array of tags associated with the entry.
     */
    getTags(): Array<string>;
    /**
     * Sets the tags on the entry.
     * @param tags tags to be set on the entry
     * @returns {string[]} Returns an array of tags associated with the entry.
     */
    setTags(tags: Array<string>): Array<string>;
}
export default FieldLocationEntry;
//# sourceMappingURL=entry.d.ts.map