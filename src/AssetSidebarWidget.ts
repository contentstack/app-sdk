import EventEmitter from "wolfy87-eventemitter";
import { IAssetSidebarInitData, setAssetDto } from "./types";
import postRobot from "post-robot";
import Asset from "./stack/api/asset";
import { Asset as AssetType } from "./types/stack.types";
import { GenericObjectType } from "./types/common.types";

/** Class representing an asset Extension from Contentstack UI.  */

class AssetSidebarWidget {
    /**
     * @hideconstructor
     */

    currentAsset: AssetType;
    _emitter: EventEmitter;
    _connection: GenericObjectType;
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

    getData() {
        return this.currentAsset;
    }

    async setData(asset: Partial<setAssetDto>): Promise<void> {
        this._connection.sendToParent("setData", asset);
    }
    
    async syncAsset(): Promise<void> {
        this._connection.sendToParent("syncAsset");
    }

    async updateWidth(width: number): Promise<void> {
        if (typeof width !== "number") {
            throw new Error("Width must be a number");
        }
        this._connection.sendToParent("updateAssetSidebarWidth", width);
    }

    async replaceAsset(file: File): Promise<any> {
        const asset = Asset(this._emitter);
        return asset.handleUpload([file], "replace");
    }

    /**
     * This function executes the callback function every time an asset is saved.
     * @param {function} callback The function to be called when an asset is saved.
     */

    onSave(callback: (arg0: AssetType) => void) {
        const assetObj = this;
        if (callback && typeof callback === "function") {
            assetObj._emitter.on("assetSave", (event: { data: any }) => {
                callback(event.data);
            });
        } else {
            throw Error("Callback must be a function");
        }
    }

    /**
     * The field.onChange() function is called when another extension programmatically changes the data of the current extension field using the field.setData() function. This function is only available for extension fields that support the following data types: text, number, boolean, or date.
     * @param {function} callback The function to be called when an asset is edited/changed.
     */

    onChange(callback: (arg0: AssetType) => void) {
        const assetObj = this;
        if (callback && typeof callback === "function") {
            assetObj._emitter.on("assetChange", (event: { data: any }) => {
                callback(event.data);
            });
        } else {
            throw Error("Callback must be a function");
        }
    }

    /**
     * The onPublish() function executes the callback function every time an asset has been published with the respective payload.
     * @param {function} callback The function to be called when an asset is published.
     */

    onPublish(callback: (arg0: AssetType) => void) {
        const assetObj = this;
        if (callback && typeof callback === "function") {
            assetObj._emitter.on("assetPublish", (event: { data: any }) => {
                callback(event.data);
            });
        } else {
            throw Error("Callback must be a function");
        }
    }

    /**
     * The onUnPublish() function executes the callback function every time an asset has been unpublished with the respective payload.
     * @param {function} callback The function to be called when an asset is un published.
     */

    onUnPublish(callback: (arg0: AssetType) => void) {
        const assetObj = this;
        if (callback && typeof callback === "function") {
            assetObj._emitter.on("assetUnPublish", (event: { data: any }) => {
                callback(event.data);
            });
        } else {
            throw Error("Callback must be a function");
        }
    }
}
export default AssetSidebarWidget;
