import postRobot from "post-robot";

import Extension from "./extension";
import { version } from "../package.json";
import { InitializationData } from "./types";

postRobot.CONFIG.LOG_LEVEL = "error";

/** Class to initialize the App on Contentstack UI. */
/**
 * @hideconstructor
 */
class ContentstackAppSDK {
    /**
     * You need to first import Contentstack App SDK and then call ContentstackAppSDK.init in your code base
     *
     * @example <caption>Custom Filed</caption>
     * ContentstackUIExtension.init().then(function (sdk) {
     *    const customField = sdk.location.CustomField;
     * })
     * @example <caption>Dashboard Widget</caption>
     * ContentstackUIExtension.init().then(function (sdk) {
     *    const dashboardUILocation = sdk.location.DashboardWidget;
     * })
     * @return {external:Promise}  A promise object which will be resolved with an instance of the {@link Extension} class which is instantiated using the data received from the Contentstack UI.
     */

    static _extension: Extension;

    /**
     * Initializes the App SDK and returns an instance of {@link Extension} class
     * @returns {Promise<Extension>}
     */
    static init(): Promise<Extension> {
        if (this._extension) {
            return Promise.resolve<Extension>(this._extension);
        }
        return Extension.initialize(version)
            .then((initializationData: InitializationData) => {
                this._extension = new Extension(initializationData);
                return Promise.resolve(this._extension);
            })
            .catch((e: Error) => Promise.reject(e));
    }

    /**
     * Version of Contentstack App SDK.
     * @type {string}
     */
    static get SDK_VERSION() {
        return version;
    }
}

export default ContentstackAppSDK;
module.exports = ContentstackAppSDK;
