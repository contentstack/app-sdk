import EventEmitter from "wolfy87-eventemitter";
import { IFieldInitData, IEntryFieldLocationInitData } from "../types";
/** Class representing a field from Contentstack UI. Only available for Custom Field extension */
declare class EntryFieldLocationField {
    /**
     * @hideconstructor
     */
    uid: string;
    data_type: string;
    schema: {
        [key: string]: any;
    };
    _emitter: EventEmitter;
    _data: {
        [key: string]: any;
    };
    _resolvedData: {
        [key: string]: any;
    };
    _self: any;
    _connection: any;
    constructor(fieldDataObject: IFieldInitData | IEntryFieldLocationInitData, connection: any, emitter: EventEmitter);
    /**
     * Sets the data for the current field.
     * @param {Object|string|number} data Data to be set on the field
     * @return {external:Promise} A promise object which is resolved when data is set for a field. Note: The data set by this function will only be saved when user saves the entry.
     */
    setData(data: any): Promise<EntryFieldLocationField>;
    /**
     * Gets the data of the current field
     * @param  {Object} options Options object for get Data method.
     * @param  {boolean} options.resolved If the resolved parameter is set to true for the File field, then the method will return a resolved asset object along with all the field metadata, e.g. 'field.getData({resolved:true})'.
     * @return {Object|string|number} Returns the field data.
     */
    getData({ resolved }?: {
        resolved?: boolean | undefined;
    }): {
        [key: string]: any;
    };
    getDelta(): any;
}
export default EntryFieldLocationField;
//# sourceMappingURL=field.d.ts.map