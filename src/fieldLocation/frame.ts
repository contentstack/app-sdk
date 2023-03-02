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
    private observer: MutationObserver | undefined;

    constructor(connection: any, emitter: EventEmitter) {
        this._connection = connection || postRobot;
        this._autoResizingEnabled = false;
        this._emitter = emitter;

        this.updateHeight = this.updateHeight.bind(this);
        this.enableAutoResizing = this.enableAutoResizing.bind(this);
        this.disableAutoResizing = this.disableAutoResizing.bind(this);

        /**
         * The auto resizing should be enabled by default.
         */
        this.enableAutoResizing();
    }

    /**
     * This method updates the extension height on Contentstack UI.
     * If the ‘height’ argument is not passed, it will calculate the scroll height and set the height of extension window accordingly.
     * @param {string|number} height Desired height of the iframe window
     */
    updateHeight(height?: number) {
        if (!height) {
            this._height = Math.ceil(
                document.documentElement.getBoundingClientRect().height
            );
        } else if (this._height === height) {
            return;
        }

        this._height = height;
        this._connection.sendToParent("resize", this._height);
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

        this.observer = new MutationObserver(() => this.updateHeight());

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
