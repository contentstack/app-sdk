import EventEmitter from "wolfy87-eventemitter";
import postRobot from "post-robot";

import { ERROR_MESSAGES } from "../utils/errorMessages";

/**
 * Class representing an iframe window from Contentstack UI. Not available for Custom Widgets.
 */

class FieldModifierLocationFrame {
    /**
     * @hideconstructor
     */

    _connection: typeof postRobot;
    _autoResizingEnabled = false;
    _emitter: EventEmitter;
    _height?: number;
    _width?: number;

    private observer: MutationObserver | undefined;

    constructor(connection: typeof postRobot, emitter: EventEmitter) {
        this._connection = connection || postRobot;
        this._autoResizingEnabled = false;
        this._emitter = emitter;

        this.updateDimension = this.updateDimension.bind(this);
        this.enableAutoResizing = this.enableAutoResizing.bind(this);
        this.disableAutoResizing = this.disableAutoResizing.bind(this);
        this.closeModal = this.closeModal.bind(this);

        /**
         * The auto resizing should be enabled by default.
         */
        this.enableAutoResizing();
    }

    /**
     * This method updates the UI location height and width on Contentstack UI.
     * If the value is not passed, it will update the height and width of the
     * UI location with the current height and width of the UI location.
     * @param {dimension: {height: number, width: number}} dimension Desired height and width of the iframe window
     */
    async updateDimension(dimension?: {
        height?: number;
        width?: number;
    }): Promise<void> {
        const { height, width } = dimension || {};

        if (height === undefined && width === undefined) {
            this._height = Math.ceil(
                document.documentElement.getBoundingClientRect().height
            );

            this._width = Math.ceil(
                document.documentElement.getBoundingClientRect().width
            );

            await this._connection.sendToParent("resize", {
                height: this._height,
                width: this._width,
            });
            return;
        }

        const dimensionBody = {};

        if (height !== undefined && typeof height !== "number") {
            throw new Error(
                ERROR_MESSAGES.entryField.frame.dimensionHeightShouldBeNumber
            );
        }

        if (this._height !== height) {
            this._height = height;
            dimensionBody["height"] = this._height;
        }

        if (width !== undefined && typeof width !== "number") {
            throw new Error(
                ERROR_MESSAGES.entryField.frame.dimensionWidthShouldBeNumber
            );
        }

        if (this._width !== width) {
            this._width = width;
            dimensionBody["width"] = this._width;
        }

        if (Object.keys(dimensionBody).length !== 0) {
            await this._connection.sendToParent("resize", dimensionBody);
        }
    }

    /**
     * Prevent user from accidently closing the app by clicking outside the frame
     *  if the app is performing some active task.
     */
    async preventFrameClose(state: boolean): Promise<void> {
        await this._connection.sendToParent("preventFrameClose", {
            state,
        });
    }

    /**
     * This method enables auto resizing of the UI Location height.
     * @return {FieldModifierLocationFrame}.
     */
    enableAutoResizing(): FieldModifierLocationFrame {
        if (this._autoResizingEnabled) {
            return this;
        }
        this._autoResizingEnabled = true;

        this.observer = new MutationObserver(
            async () => await this.updateDimension()
        );

        const mutationObserverConfig = {
            attributes: true,
            childList: true,
            subtree: true,
        };

        this.observer.observe(window.document.body, mutationObserverConfig);
        return this;
    }

    /**
     * This method disables auto resizing of the UI location height.
     * @return {FieldModifierLocationFrame}.
     */
    disableAutoResizing(): FieldModifierLocationFrame {
        if (!this._autoResizingEnabled) {
            return this;
        }
        this._autoResizingEnabled = false;
        this.observer?.disconnect();
        return this;
    }

    /**
     * This method disables the iframe styles applied by the UI
     */
    async disableInherentStyle() {
        await this._connection.sendToParent("disableInherentStyle");
    }

    /**
     * It closes the app modal.
     * @returns {Promise<void>}
     */
    async closeModal(): Promise<void> {
        await this._connection.sendToParent("closeModal");
    }
}

export default FieldModifierLocationFrame;
