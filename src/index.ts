import postRobot from "post-robot";

import { version } from "../package.json";
import { RTEPlugin } from "./RTE";
import { IRteParam } from "./RTE/types";
import { PluginDefinition, registerPlugins,PluginBuilder } from "./rtePlugin";
import { InitializationData, IRTEInitData } from "./types";
import UiLocation from "./uiLocation";

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
     * Registers RTE plugins with the Contentstack platform.
     * Contentstack platform loader, providing the `context` (initialization data) and
     * the `rte` instance. When called, it materializes and returns a map of the
     * registered `RTEPlugin` instances, keyed by their IDs.
     */
    static async registerRTEPlugins(
        ...pluginDefinitions: PluginDefinition[]
    ): Promise<{
        __isPluginBuilder__: boolean;
        version: string;
        plugins: (context: IRTEInitData, rte: IRteParam) => Promise<{
            [key: string]: RTEPlugin;
        }>;
    }> {
        return {
            __isPluginBuilder__: true,
            version,
            plugins: registerPlugins(...pluginDefinitions)
        };
    }

    /**
     * Version of Contentstack App SDK.
     */
    static get SDK_VERSION() {
        return version;
    }
}

export default ContentstackAppSDK;
export { PluginBuilder };
module.exports = ContentstackAppSDK;
