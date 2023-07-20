import EventEmitter from "wolfy87-eventemitter";
import { DashboardWidth, LocationType } from "./types";
/**
 * Class representing an iframe window from Contentstack UI. Not available for Custom Widgets.
 */
declare class Window {
    /**
     * @hideconstructor
     */
    _connection: typeof postRobot;
    _autoResizingEnabled: boolean;
    _resizingEnabled: boolean;
    type: LocationType.DASHBOARD | LocationType.FIELD;
    _emitter: EventEmitter;
    state: DashboardWidth;
    _height?: number;
    constructor(
        connection: any,
        type: LocationType.DASHBOARD | LocationType.FIELD,
        emitter: EventEmitter,
        state?: DashboardWidth
    );
    /**
     * Activates the resize button that allows you to resize the window size of your Dashboard Widget.
     * @return {Promise} A promise that resolves when the resize button becomes visible on the Dashboard Widget.
     */
    enableResizing(): Promise<void>;
    /**
     * This function executes the callback function whenever a Dashboard Widget is maximized or minimized. Only applicable on Dashboard Widgets.
     * @param {function} callback The function to be called when a Dashboard Widget is maximized or minimized.
     * @return {boolean} Returns true if the operation completes successfully without errors.
     */
    onDashboardResize(callback: (event: any) => void): boolean;
    /**
     * Updates the Widget height on Contentstack UI.
     * If the 'height' argument is not provided, it will automatically calculate the scroll height and adjust the widget window height accordingly.
     * @param {number} height The desired height of the iframe window.
     * @return {Promise} A promise that resolves when Contentstack UI acknowledges that the height has been updated.
     */
    updateHeight(height?: number): Promise<void>;
    /**
     * Enables auto resizing of the Widget height.
     * @return {Window} The context of the Window class.
     */
    enableAutoResizing(): Window;
    /**
     * Disables auto resizing of the Widget height.
     * @returns {Window} The context of the Window class.
     */
    disableAutoResizing(): Window;
    /**
     * Adds a padding on top of the Dashboard widget.
     * @returns {Promise<void>} A promise that resolves when the padding is added.
     */
    enablePaddingTop(): Promise<void>;
    /**
     * Removes the padding previously added on top of the Dashboard widget.
     * @returns {Promise<void>} A promise that resolves when the padding is removed.
     */
    disablePaddingTop(): Promise<void>;
}
export default Window;
//# sourceMappingURL=window.d.ts.map
