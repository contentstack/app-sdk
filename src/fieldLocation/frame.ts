import EventEmitter from "wolfy87-eventemitter";
import postRobot from "post-robot";

/**
 * Class representing an iframe window from Contentstack UI. Not available for Custom Widgets.
 */

class FieldLocationFrame {
    /**
     * @hideconstructor
     */

    _connection: any;
    _autoResizingEnabled = false;
    _emitter: EventEmitter;
    _height?: number;
    _width?: number;

    private observer: MutationObserver | undefined;

    constructor(connection: any, emitter: EventEmitter) {
        this._connection = connection || postRobot;
        this._autoResizingEnabled = false;
        this._emitter = emitter;

        this.updateDimension = this.updateDimension.bind(this);
        this.enableAutoResizing = this.enableAutoResizing.bind(this);
        this.disableAutoResizing = this.disableAutoResizing.bind(this);

        /**
         * The auto resizing should be enabled by default.
         */
        this.enableAutoResizing();
    }

    /**
     * This method updates the extension height and width on Contentstack UI.
     * If the value is not passed, it will update the height and width of the
     * extension with the current height and width of the extension.
     * @param {string|number} height Desired height of the iframe window
     */
    updateDimension(dimension?: { height?: number; width?: number }) {
        const { height, width } = dimension || {};

        if (height === undefined && width === undefined) {
            this._height = Math.ceil(
                document.documentElement.getBoundingClientRect().height
            );

            this._width = Math.ceil(
                document.documentElement.getBoundingClientRect().width
            );

            this._connection.sendToParent("resize", { height: this._height });
            return;
        }

        const dimensionBody = {};

        if (typeof height === "number" && this._height !== height) {
            this._height = height;
            dimensionBody["height"] = this._height;
        }

        if (typeof width === "number" && this._width !== width) {
            this._width = width;
            dimensionBody["width"] = this._width;
        }

        if (Object.keys(dimensionBody).length === 0) {
            this._connection.sendToParent("resize", dimensionBody);
        }
    }

    /**
     * This method enables auto resizing of the extension height.
     * @return {FieldLocationFrame}.
     */
    enableAutoResizing(): FieldLocationFrame {
        if (this._autoResizingEnabled) {
            return this;
        }
        this._autoResizingEnabled = true;

        this.observer = new MutationObserver(() => this.updateDimension());

        const mutationObserverConfig = {
            attributes: true,
            childList: true,
            subtree: true,
        };

        this.observer.observe(window.document.body, mutationObserverConfig);
        return this;
    }

    /**
     * This method disables auto resizing of the extension height.
     * @return {FieldLocationFrame}.
     */
    disableAutoResizing(): FieldLocationFrame {
        if (!this._autoResizingEnabled) {
            return this;
        }
        this._autoResizingEnabled = false;
        this.observer?.disconnect();
        return this;
    }
}

export default FieldLocationFrame;
