import EventEmitter from "wolfy87-eventemitter";
import { IAssetSidebarInitData, setAssetDto } from "./types";

/** Class representing an asset Extension from Contentstack UI.  */

class AssetSidebarWidget {
    /**
     * @hideconstructor
     */

    currentAsset: { [key: string]: any };
    _emitter: EventEmitter;
    _connection: any;
    _changedData?: { [key: string]: any };

    constructor(
        initializationData: IAssetSidebarInitData,
        connection: any,
        emitter: EventEmitter
    ) {
        /**
         * Gets the content type of the current asset.
         * @type {Object}
         */

        this.currentAsset = initializationData.data.currentAsset;

        this._emitter = emitter;

        this._connection = connection;

        const thisAsset = this;

        this._emitter.on(
            "assetSave",
            (event: { data: { [key: string]: any } }) => {
                thisAsset.currentAsset = event.data;
            }
        );

        this._emitter.on(
            "assetChange",
            (event: { data: { [key: string]: any } }) => {
                thisAsset._changedData = event.data;
            }
        );

        this.getData = this.getData.bind(this);
        this.setData = this.setData.bind(this);
        this.syncAsset = this.syncAsset.bind(this);
        this.updateWidth = this.updateWidth.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onPublish = this.onPublish.bind(this);
        this.onUnPublish = this.onUnPublish.bind(this);
    }

    getData() {
        return this.currentAsset;
    }

    async setData(asset: Partial<setAssetDto>): Promise<any> {
        return this._connection.sendToParent("setData", asset);
    }

    async syncAsset(): Promise<any> {
        return this._connection.sendToParent("syncAsset");
    }

    async updateWidth(width: number): Promise<any> {
        if (typeof width !== "number") {
            throw new Error("Width must be a number");
        }
        return this._connection.sendToParent("updateAssetSidebarWidth", width);
    }

    /**
     * This function executes the callback function every time an asset is saved.
     * @param {function} callback The function to be called when an asset is saved.
     */

    onSave(callback: (arg0: any) => void) {
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

    onChange(callback: (arg0: any) => void) {
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

    onPublish(callback: (arg0: any) => void) {
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

    onUnPublish(callback: (arg0: any) => void) {
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
