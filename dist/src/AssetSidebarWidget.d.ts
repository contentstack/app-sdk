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
    /**
     * Get the current asset data.
     * @returns {AssetData} The current asset data.
     */
    getData(): AssetType;
    /**
     * Set data for the asset.
     * @param {Partial<setAssetDto>} asset - The partial asset data to set.
     * @returns {Promise<void>} A promise that resolves when the data is set successfully.
     */
    setData(asset: Partial<setAssetDto>): Promise<void>;
    /**
     * Synchronize the asset with the parent application in the Contentstack UI.
     * @returns {Promise<void>} A promise that resolves when the synchronization is complete.
     */
    syncAsset(): Promise<void>;
    /**
     * Update the width of the Asset Sidebar widget in the Contentstack UI.
     * @param {number} width - The new width of the asset sidebar.
     * @throws {Error} Throws an error if the width parameter is not a number.
     * @returns {Promise<void>} A promise that resolves when the width is updated successfully.
     */
    updateWidth(width: number): Promise<void>;
    /**
     * Replace the current asset with a new file.
     * @param {File} file - The file to be used as the replacement asset.
     * @returns {Promise<void>} A promise that resolves when the replacement is complete.
     */
    replaceAsset(file: File): Promise<void>;
    /**
     * Executes the provided callback function every time an asset is saved.
     * @param {function} callback - The function to be called when an asset is saved.
     * @param {AssetType} arg0 - The asset data passed as an argument to the callback function when an asset is saved.
     */
    onSave(callback: (arg0: AssetType) => void): void;
    /**
     * The `field.onChange()` function is called when another extension programmatically changes the data of the current extension field using the `field.setData()` function.
     * This function is only available for extension fields that support the following data types: text, number, boolean, or date.
     * @param {function} callback - The function to be called when the asset is edited/changed.
     * @param {AssetType} arg0 - The asset data passed as an argument to the callback function when the asset is edited/changed.
     */
    onChange(callback: (arg0: AssetType) => void): void;
    /**
     * The onPublish() function executes the callback function every time an asset has been published with the respective payload.
     * @param {function} callback - The function to be called when an asset is published.
     * @param {AssetType} arg0 - The data of the published asset passed as an argument to the callback function.
     */
    onPublish(callback: (arg0: AssetType) => void): void;
    /**
     * The `onUnPublish()` function executes the provided callback every time an asset is unpublished.
     * @param {function} callback - The function to be called when an asset is unpublished.
     * @param {AssetType} arg0 - The data of the unpublished asset passed as an argument to the callback function.
     */
    onUnPublish(callback: (arg0: AssetType) => void): void;
}
export default AssetSidebarWidget;
//# sourceMappingURL=AssetSidebarWidget.d.ts.map