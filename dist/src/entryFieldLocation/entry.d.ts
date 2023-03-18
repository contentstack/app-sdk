import Entry from "../entry";
import { IEntryFieldLocationInitData } from "../types";
import { IGetTagsOptions } from "../types/entry.types";
declare class EntryFieldLocationEntry extends Entry {
    constructor(initializationData: IEntryFieldLocationInitData, connection: any, emitter: EventEmitter);
    /**
     * Returns the value of the tags associated with the entry.
     * @returns {string[]} Returns an array of tags associated with the entry.
     */
    getTags(options?: IGetTagsOptions): Array<string>;
    /**
     * Sets the tags on the entry.
     * @param tags tags to be set on the entry
     * @returns {string[]} Returns an array of tags associated with the entry.
     */
    setTags(tags: Array<string>): Promise<Array<string>>;
}
export default EntryFieldLocationEntry;
//# sourceMappingURL=entry.d.ts.map