import EventEmitter from "wolfy87-eventemitter";
import postRobot from "post-robot";
import { IFieldInitData, IFieldModifierLocationInitData } from "./types";
import { GenericObjectType } from "./types/common.types";
import { Schema } from "./types/stack.types";
/** Class representing a field from Contentstack UI. Only available for Custom Field extension */
declare class Field {
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
    constructor(
        fieldDataObject: IFieldInitData | IFieldModifierLocationInitData,
        connection: typeof postRobot,
        emitter: EventEmitter
    );
    /**
     * Sets the data for the current field.
     * @param {Object|string|number} data Data to be set on the field
     * @return {external:Promise} A promise object which is resolved when data is set for a field. Note: The data set by this function will only be saved when user saves the entry.
     */
    setData(data: any): Promise<Field>;
    /**
     * Gets the data of the current field
     * @param  {Object} options Options object for get Data method.
     * @param  {boolean} options.resolved If the resolved parameter is set to true for the File field, then the method will return a resolved asset object along with all the field metadata, e.g. 'field.getData({resolved:true})'.
     * @return {Object|string|number} Returns the field data.
     */
    getData({
        resolved,
    }?: {
        resolved?: boolean | undefined;
    }): GenericObjectType;
    /**
     * Sets the focus for a field when an extension is being used. This method shows user presence and highlights the extension field that the user is currently accessing in Contentstack UI.
     * @return {Promise<void} A promise object which is resolved when Contentstack UI returns an acknowledgement of the focused state.
     */
    setFocus(): Promise<void>;
    /**
     * This function is called when another extension programmatically changes data of this field using field.setData() function, only available for extension field, only support extensions of data type text, number, boolean or date.
     * @param {function} callback The function to be called when an entry is published.
     */
    onChange?(callback: (data: any) => any): void;
}
export default Field;
//# sourceMappingURL=field.d.ts.map
