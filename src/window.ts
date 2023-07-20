import EventEmitter from "wolfy87-eventemitter";
import postRobot from "post-robot";
import { DashboardWidth, LocationType } from "./types";

const config = { attributes: true, childList: true, subtree: true };
let observer: MutationObserver;
/**
 * Class representing an iframe window from Contentstack UI. Not available for Custom Widgets.
 */

class Window {
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
        state: DashboardWidth = DashboardWidth.HALF_WIDTH
    ) {
        this._connection = connection || postRobot;
        this._autoResizingEnabled = false;
        this._resizingEnabled = false;
        this.type = type;
        this.state = state;
        this._emitter = emitter;
    }

    /**
     * Activates the resize button that allows you to resize the window size of your Dashboard Widget.
     * @return {Promise} A promise that resolves when the resize button becomes visible on the Dashboard Widget.
     */
    async enableResizing(): Promise<void> {
        if (this.type !== LocationType.DASHBOARD) {
            return Promise.resolve();
        }
        this._resizingEnabled = true;
        await this._connection.sendToParent("window", {
            action: "enableResizing",
        });
    }

    /**
     * This function executes the callback function whenever a Dashboard Widget is maximized or minimized. Only applicable on Dashboard Widgets.
     * @param {function} callback The function to be called when a Dashboard Widget is maximized or minimized.
     * @return {boolean} Returns true if the operation completes successfully without errors.
     */
    onDashboardResize(callback: (event: any) => void) {
        const windowObj = this;
        if (this.type !== LocationType.DASHBOARD) {
            return false;
        }
        if (callback && typeof callback === "function") {
            windowObj._emitter.on(
                "dashboardResize",
                (event: { state: DashboardWidth }) => {
                    windowObj.state = event.state;
                    callback(event.state);
                }
            );
        } else {
            throw Error("Callback must be a function");
        }
        return true;
    }

    /**
     * Updates the Widget height on Contentstack UI.
     * If the 'height' argument is not provided, it will automatically calculate the scroll height and adjust the widget window height accordingly.
     * @param {number} height The desired height of the iframe window.
     * @return {Promise} A promise that resolves when Contentstack UI acknowledges that the height has been updated.
     */
    async updateHeight(height?: number): Promise<void> {
        if (
            this.type === LocationType.DASHBOARD &&
            this.state === DashboardWidth.HALF_WIDTH
        ) {
            return Promise.resolve();
        }
        if (!height || isNaN(height)) {
            this._height = Math.ceil(
                document.documentElement.getBoundingClientRect().height
            );
        } else if (this._height === height) {
            return Promise.resolve();
        } else {
            this._height = height;
        }
        await this._connection.sendToParent("resize", this._height as any);
    }

    /**
     * Enables auto resizing of the Widget height.
     * @return {Window} The context of the Window class.
     */
    enableAutoResizing(): Window {
        if (
            this._autoResizingEnabled ||
            (this.state === DashboardWidth.HALF_WIDTH &&
                this.type === LocationType.DASHBOARD)
        ) {
            return this;
        }
        this._autoResizingEnabled = true;
        //@ts-ignore
        observer = new MutationObserver(this.updateHeight.bind(this));
        observer.observe(window.document.body, config);
        return this;
    }

    /**
     * Disables auto resizing of the Widget height.
     * @returns {Window} The context of the Window class.
     */
    disableAutoResizing(): Window {
        if (!this._autoResizingEnabled) {
            return this;
        }
        this._autoResizingEnabled = false;
        observer.disconnect();
        return this;
    }

    /**
     * Adds a padding on top of the Dashboard widget.
     * @returns {Promise<void>} A promise that resolves when the padding is added.
     */
    async enablePaddingTop(): Promise<void> {
        await postRobot.sendToParent("window", {
            action: "dashboardEnableTopPadding",
        });
    }

    /**
     * Removes the padding previously added on top of the Dashboard widget.
     * @returns {Promise<void>} A promise that resolves when the padding is removed.
     */
    async disablePaddingTop(): Promise<void> {
        await postRobot.sendToParent("window", {
            action: "dashboardDisableTopPadding",
        });
    }
}

export default Window;
