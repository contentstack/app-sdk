import postRobot from "post-robot";

import { version } from "../package.json";
import { IRteParam } from "./RTE/types";
import { PluginDefinition, PluginBuilder, registerPlugins } from "./rtePlugin";
import { InitializationData, RTEContext } from "./types";
import UiLocation from "./uiLocation";
import { convertRTEContextToInitData } from "./utils/utils";

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

    /**
    * Initializes the App SDK and returns an instance of {@link UiLocation} class
    */
    static init(): Promise<UiLocation> {
        if (this._uiLocation) {
            return Promise.resolve(this._uiLocation);
        }

        return UiLocation.initialize(version)
            .then((initializationData: InitializationData) => {

                this._uiLocation = new UiLocation(initializationData);
                return this._uiLocation;
            })
            .catch((e: Error) => Promise.reject(e));
    }


 /**
  * Registers RTE plugins with the Contentstack platform.
  * This method is the primary entry point for defining and registering custom RTE plugins
  * built using the PluginBuilder pattern. It returns a function that the Contentstack
  * platform will invoke at runtime, providing the necessary context.
  *
  * @example
  * // In your plugin's entry file (e.g., src/index.ts):
  * import ContentstackAppSDK from '@contentstack/app-sdk';
  * import { PluginBuilder, IRteParam } from '@contentstack/app-sdk/rtePlugin';
  *
  * const MyCustomPlugin = new PluginBuilder("my-plugin-id")
  * .title("My Plugin")
  * .icon(<MyIconComponent />)
  * .on("exec", (rte: IRteParam) => {
  * // Access SDK via rte.sdk if needed:
  * const sdk = rte.sdk;
  * // ... plugin execution logic ...
  * })
  * .build();
  *
  * export default ContentstackAppSDK.registerRTEPlugins(
  * MyCustomPlugin
  * );
  *
  * @param {...PluginDefinition} pluginDefinitions - One or more plugin definitions created using the `PluginBuilder`.
  * Each `PluginDefinition` describes the plugin's configuration, callbacks, and any child plugins.
  * @returns {Promise<{ __isPluginBuilder__: boolean; version: string; plugins: (context: RTEContext, rte: IRteParam) => Promise<{ [key: string]: RTEPlugin; }>; }>}
  * A Promise that resolves to an object containing:
  * - `__isPluginBuilder__`: A boolean flag indicating this is a builder-based plugin export.
  * - `version`: The version of the SDK that registered the plugins.
  * - `plugins`: An asynchronous function. This function is designed to be invoked by the
  * Contentstack platform loader, providing the `context` (initialization data) and
  * the `rte` instance. When called, it materializes and returns a map of the
  * registered `RTEPlugin` instances, keyed by their IDs.
  */

    static async registerRTEPlugins(...pluginDefinitions: PluginDefinition[]) {
        return {
            __isPluginBuilder__: true,
            version,
            plugins: (context: RTEContext, rte: IRteParam) => {
                // Convert RTEContext to InitializationData format
                const initializationData = convertRTEContextToInitData(context); 
                return registerPlugins(...pluginDefinitions)(initializationData, rte);
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
