import postRobot from "post-robot";

import UiLocation from "./uiLocation";
import { version } from "../package.json";
import { InitializationData } from "./types";

postRobot.CONFIG.LOG_LEVEL = "error";

/**
 * Class to initialize the App on Contentstack UI.
 * Import Contentstack App SDK and then call ContentstackAppSDK.init in your code base
 *
 * @example <caption>Custom Field UI Location</caption>
 * ContentstackAppSDK.init().then(function (sdk) {
 *    const customField = sdk.location.CustomField;
 * })
 * @example <caption>Dashboard UI Location</caption>
 * ContentstackAppSDK.init().then(function (sdk) {
 *    const dashboardUILocation = sdk.location.DashboardWidget;
 * })
 * @return {Promise} A promise object which will be resolved with an instance of the {@link UiLocation} class.
 * @hideconstructor
 */

class ContentstackAppSDK {
    /**
     * A static variable that stores the instance of {@link UiLocation} class after initialization
     */
    static _uiLocation: UiLocation;

    /**
     * Initializes the App SDK and returns an instance of {@link UiLocation} class
     */
    static init(): Promise<UiLocation> {
        if (this._uiLocation) {
            return Promise.resolve<UiLocation>(this._uiLocation);
        }
        return UiLocation.initialize(version)
            .then((initializationData: InitializationData) => {
                this._uiLocation = new UiLocation(initializationData);
                return Promise.resolve(this._uiLocation);
            })
            .catch((e: Error) => Promise.reject(e));
    }

    /**
     * Version of Contentstack App SDK.
     */
    static get SDK_VERSION() {
        return version;
    }
}

export default ContentstackAppSDK;
module.exports = ContentstackAppSDK;
