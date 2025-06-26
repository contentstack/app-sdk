import postRobot from "post-robot";

import { version } from "../package.json";
import { IRteParam } from "./RTE/types";
import { PluginDefinition, PluginBuilder, registerPlugins } from "./rtePlugin";
import { Extension, InitializationData, RTEContext } from "./types";
import UiLocation from "./uiLocation";

// Configure post-robot logging
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
    private static _rteInitData: Extension | null = null;

     /**
     * Initializes the App SDK and returns an instance of {@link UiLocation} class
     */
    static init(): Promise<UiLocation> {
        if (this._uiLocation) {
            return Promise.resolve(this._uiLocation);
        }

        return UiLocation.initialize(version)
            .then((initializationData: InitializationData) => {
                // Merge with RTE context if available
                const mergedInitData = this._rteInitData 
                    ? {
                        ...initializationData,
                        app_id: this._rteInitData.app_uid,
                        installation_uid: this._rteInitData.app_installation_uid,
                        extension_uid: this._rteInitData.uid,
                      }
                    : initializationData;

                this._uiLocation = new UiLocation(mergedInitData);
                return this._uiLocation;
            })
            .catch((e: Error) => Promise.reject(e));
    }

    /**
     * Register RTE plugins with enhanced context capture
     * @param pluginDefinitions Plugin definitions to register
     * @returns Plugin registration object
     */
    static async registerRTEPlugins(...pluginDefinitions: PluginDefinition[]) {
        return {
            __isPluginBuilder__: true,
            version,
            plugins: (context: RTEContext, rte: IRteParam) => {
                // Capture RTE context for SDK enhancement
                this._rteInitData = context.extension;
                return registerPlugins(...pluginDefinitions)(context, rte);
            }
        };
    }

    /**
     * Get SDK version
     */
    static get SDK_VERSION() {
        return version;
    }
}

// ES6 exports
export default ContentstackAppSDK;
export { PluginBuilder };

// CommonJS compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentstackAppSDK;
    module.exports.default = ContentstackAppSDK;
    module.exports.PluginBuilder = PluginBuilder;
}
