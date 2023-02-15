import EventEmitter from "wolfy87-eventemitter";
import { IAssetSidebarInitData, setAssetDto } from "./types";
/** Class representing an asset Extension from Contentstack UI.  */
declare class AssetSidebarWidget {
    /**
     * @hideconstructor
     */
    currentAsset: {
        [key: string]: any;
    };
    _emitter: EventEmitter;
    _connection: any;
    _changedData?: {
        [key: string]: any;
    };
    constructor(initializationData: IAssetSidebarInitData, connection: any, emitter: EventEmitter);
    getData(): {
        [key: string]: any;
    };
    setData(asset: Partial<setAssetDto>): Promise<any>;
    syncAsset(): Promise<any>;
    updateWidth(width: number): Promise<any>;
    replaceAsset(file: File): Promise<any>;
    /**
     * This function executes the callback function every time an asset is saved.
     * @param {function} callback The function to be called when an asset is saved.
     */
    onSave(callback: (arg0: any) => void): void;
    /**
     * The field.onChange() function is called when another extension programmatically changes the data of the current extension field using the field.setData() function. This function is only available for extension fields that support the following data types: text, number, boolean, or date.
     * @param {function} callback The function to be called when an asset is edited/changed.
     */
    onChange(callback: (arg0: any) => void): void;
    /**
     * The onPublish() function executes the callback function every time an asset has been published with the respective payload.
     * @param {function} callback The function to be called when an asset is published.
     */
    onPublish(callback: (arg0: any) => void): void;
    /**
     * The onUnPublish() function executes the callback function every time an asset has been unpublished with the respective payload.
     * @param {function} callback The function to be called when an asset is un published.
     */
    onUnPublish(callback: (arg0: any) => void): void;
}
export default AssetSidebarWidget;
//# sourceMappingURL=AssetSidebarWidget.d.ts.map