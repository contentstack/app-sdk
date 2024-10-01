import EventEmitter from "wolfy87-eventemitter";
import { IAssetSidebarInitData, setAssetDto } from "./types";
import postRobot from "post-robot";
import Asset from "./stack/api/asset";
import { Asset as AssetType } from "./types/stack.types";
import { GenericObjectType } from "./types/common.types";

/** Class representing an Asset Sidebar UI Location from Contentstack UI.  */

class AssetSidebarWidget {
    /**
     * @hideconstructor
     */

    currentAsset: AssetType;
    _emitter: EventEmitter;
    _connection: typeof postRobot;
    _changedData?: GenericObjectType;

    constructor(
        initializationData: IAssetSidebarInitData,
        connection: typeof postRobot,
        emitter: EventEmitter
    ) {
        /**
         * Gets the content type of the current asset.
         * @type {Object}
         */

        this.currentAsset = initializationData.currentAsset;

        this._emitter = emitter;

        this._connection = connection;

        const thisAsset = this;

        this._emitter.on("assetSave", (event: { data: AssetType }) => {
            thisAsset.currentAsset = event.data;
        });

        this._emitter.on("assetChange", (event: { data: AssetType }) => {
            thisAsset._changedData = event.data;
        });

        this.getData = this.getData.bind(this);
        this.setData = this.setData.bind(this);
        this.syncAsset = this.syncAsset.bind(this);
        this.updateWidth = this.updateWidth.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onPublish = this.onPublish.bind(this);
        this.onUnPublish = this.onUnPublish.bind(this);
        this.replaceAsset = this.replaceAsset.bind(this);
    }

    /**
     * Get the current asset data.
     * @returns {AssetData} The current asset data.
     */
    getData(): AssetType {
        return this.currentAsset;
    }

    /**
     * Set data for the asset.
     * @param {Partial<setAssetDto>} asset - The partial asset data to set.
     * @returns {Promise<void>} A promise that resolves when the data is set successfully.
     */
    async setData(asset: Partial<setAssetDto>): Promise<void> {
        await this._connection.sendToParent("setData", asset);
    }

    /**
     * Synchronize the asset with the parent application in the Contentstack UI.
     * @returns {Promise<void>} A promise that resolves when the synchronization is complete.
     */
    async syncAsset(): Promise<void> {
        await this._connection.sendToParent("syncAsset");
    }

    /**
     * Update the width of the Asset Sidebar widget in the Contentstack UI.
     * @param {number} width - The new width of the asset sidebar.
     * @throws {Error} Throws an error if the width parameter is not a number.
     * @returns {Promise<void>} A promise that resolves when the width is updated successfully.
     */
    async updateWidth(width: number): Promise<void> {
        if (typeof width !== "number") {
            throw new Error("Width must be a number");
        }
        await this._connection.sendToParent(
            "updateAssetSidebarWidth",
            width as any
        );
    }

    /**
     * Replace the current asset with a new file.
     * @param {File} file - The file to be used as the replacement asset.
     * @returns {Promise<void>} A promise that resolves when the replacement is complete.
     */
    async replaceAsset(file: File): Promise<void> {
        const asset = Asset(this._emitter);
        await asset.handleUpload([file], "replace");
    }

    /**
     * Executes the provided callback function every time an asset is saved.
     * @param {function} callback - The function to be called when an asset is saved.
     * @param {AssetType} arg0 - The asset data passed as an argument to the callback function when an asset is saved.
     */
    onSave(callback: (arg0: AssetType) => void) {
        const assetObj = this;
        if (callback && typeof callback === "function") {
            assetObj._emitter.on("assetSave", (event: { data: any }) => {
                callback(event.data);
            });
            this._emitter.emitEvent("_eventRegistration",[{name:"assetSave"}]);
        } else {
            throw Error("Callback must be a function");
        }
    }

    /**
     * Registers a callback function to be executed whenever there is a change made to the Asset.
     * @param {function} callback - The function to be called when the asset is edited or changed.
     * @param {AssetType} arg0 - The asset data passed as an argument to the callback function when the asset is edited or changed.
     */
    onChange(callback: (arg0: AssetType) => void) {
        const assetObj = this;
        if (callback && typeof callback === "function") {
            assetObj._emitter.on(
                "assetChange",
                (event: { data: AssetType }) => {
                    callback(event.data);
                }
            );
            this._emitter.emitEvent("_eventRegistration",[{name:"entryChange"}]);
        } else {
            throw Error("Callback must be a function");
        }
    }

    /**
     * The onPublish() function executes the callback function every time an asset has been published with the respective payload.
     * @param {function} callback - The function to be called when an asset is published.
     * @param {AssetType} arg0 - The data of the published asset passed as an argument to the callback function.
     */
    onPublish(callback: (arg0: AssetType) => void) {
        const assetObj = this;
        if (callback && typeof callback === "function") {
            assetObj._emitter.on(
                "assetPublish",
                (event: { data: AssetType }) => {
                    callback(event.data);
                }
            );
            this._emitter.emitEvent("_eventRegistration",[{name:"assetPublish"}]);
        } else {
            throw Error("Callback must be a function");
        }
    }

    /**
     * The `onUnPublish()` function executes the provided callback every time an asset is unpublished.
     * @param {function} callback - The function to be called when an asset is unpublished.
     * @param {AssetType} arg0 - The data of the unpublished asset passed as an argument to the callback function.
     */
    onUnPublish(callback: (arg0: AssetType) => void) {
        const assetObj = this;
        if (callback && typeof callback === "function") {
            assetObj._emitter.on(
                "assetUnPublish",
                (event: { data: AssetType }) => {
                    callback(event.data);
                }
            );
            this._emitter.emitEvent("_eventRegistration",[{name:"assetUnPublish"}]);
        } else {
            throw Error("Callback must be a function");
        }
    }
}

export default AssetSidebarWidget;
