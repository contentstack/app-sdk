import EventEmitter from "wolfy87-eventemitter";
import postRobot from "post-robot";
import { IFieldInitData, IFieldModifierLocationInitData } from "../types";
import { GenericObjectType } from "../types/common.types";
import { Schema } from "../types/stack.types";
/** Class representing a field from Contentstack UI. */
declare class FieldModifierLocationField {
    /**
     * @hideconstructor
     */
    uid: string;
    data_type: string;
    schema: Schema;
    _emitter: EventEmitter;
    _data: GenericObjectType;
    _resolvedData: GenericObjectType;
    _self: boolean;
    _connection: typeof postRobot;
    constructor(fieldDataObject: IFieldInitData | IFieldModifierLocationInitData, connection: typeof postRobot, emitter: EventEmitter);
    /**
     * Sets the data for the current field.
     * @param {Object|string|number} data Data to be set on the field
     * @return {external:Promise} A promise object which is resolved when data is set for a field.
     * Note: The data set by this function will only be saved when user saves the entry.
     */
    setData(data: any): Promise<FieldModifierLocationField>;
    /**
     * Gets the data of the current field
     * @param  {Object} options Options object for get Data method.
     * @param  {boolean} options.resolved If the resolved parameter is set to true for the File field, then the method will return a resolved asset object along with all the field metadata, e.g. 'field.getData({resolved:true})'.
     * @return {Object|string|number} Returns the field data.
     */
    getData({ resolved }?: {
        resolved?: boolean | undefined;
    }): GenericObjectType;
}
export default FieldModifierLocationField;
//# sourceMappingURL=field.d.ts.map