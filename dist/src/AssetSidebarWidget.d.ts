import EventEmitter from "wolfy87-eventemitter";
import { IAssetSidebarInitData, setAssetDto } from "./types";
import postRobot from "post-robot";
import { Asset as AssetType } from "./types/stack.types";
import { GenericObjectType } from "./types/common.types";
/** Class representing an asset Extension from Contentstack UI.  */
declare class AssetSidebarWidget {
    /**
     * @hideconstructor
     */
    currentAsset: AssetType;
    _emitter: EventEmitter;
    _connection: typeof postRobot;
    _changedData?: GenericObjectType;
    constructor(initializationData: IAssetSidebarInitData, connection: typeof postRobot, emitter: EventEmitter);
    getData(): AssetType;
    setData(asset: Partial<setAssetDto>): Promise<void>;
    syncAsset(): Promise<void>;
    updateWidth(width: AssetType): Promise<void>;
    replaceAsset(file: File): Promise<any>;
    /**
     * This function executes the callback function every time an asset is saved.
     * @param {function} callback The function to be called when an asset is saved.
     */
    onSave(callback: (arg0: AssetType) => void): void;
    /**
     * The field.onChange() function is called when another extension programmatically changes the data of the current extension field using the field.setData() function. This function is only available for extension fields that support the following data types: text, number, boolean, or date.
     * @param {function} callback The function to be called when an asset is edited/changed.
     */
    onChange(callback: (arg0: AssetType) => void): void;
    /**
     * The onPublish() function executes the callback function every time an asset has been published with the respective payload.
     * @param {function} callback The function to be called when an asset is published.
     */
    onPublish(callback: (arg0: AssetType) => void): void;
    /**
     * The onUnPublish() function executes the callback function every time an asset has been unpublished with the respective payload.
     * @param {function} callback The function to be called when an asset is un published.
     */
    onUnPublish(callback: (arg0: AssetType) => void): void;
}
export default AssetSidebarWidget;
//# sourceMappingURL=AssetSidebarWidget.d.ts.map