import EventEmitter from "wolfy87-eventemitter";
/**
 * Class representing an iframe window from Contentstack UI. Not available for Custom Widgets.
 */
declare class FieldLocationFrame {
    /**
     * @hideconstructor
     */
    _connection: any;
    _autoResizingEnabled: boolean;
    _emitter: EventEmitter;
    _height?: number;
    _width?: number;
    private observer;
    constructor(connection: any, emitter: EventEmitter);
    /**
     * This method updates the extension height and width on Contentstack UI.
     * If the value is not passed, it will update the height and width of the
     * extension with the current height and width of the extension.
     * @param {string|number} height Desired height of the iframe window
     */
    updateDimension(dimension?: {
        height?: number;
        width?: number;
    }): void;
    /**
     * This method enables auto resizing of the extension height.
     * @return {FieldLocationFrame}.
     */
    enableAutoResizing(): FieldLocationFrame;
    /**
     * This method disables auto resizing of the extension height.
     * @return {FieldLocationFrame}.
     */
    disableAutoResizing(): FieldLocationFrame;
}
export default FieldLocationFrame;
//# sourceMappingURL=frame.d.ts.map