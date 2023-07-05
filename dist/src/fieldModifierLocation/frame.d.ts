import EventEmitter from "wolfy87-eventemitter";
/**
 * Class representing an iframe window from Contentstack UI. Not available for Custom Widgets.
 */
declare class FieldModifierLocationFrame {
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
    }): Promise<void>;
    /**
     * Prevent user from accidently closing the app by clicking outside the frame
     *  if the app is performing some active task.
     */
    setAllowAppClose(isAllowed: boolean): Promise<void>;
    /**
     * This method enables auto resizing of the extension height.
     * @return {FieldModifierLocationFrame}.
     */
    enableAutoResizing(): FieldModifierLocationFrame;
    /**
     * This method disables auto resizing of the extension height.
     * @return {FieldModifierLocationFrame}.
     */
    disableAutoResizing(): FieldModifierLocationFrame;
    /**
     * It closes the app modal.
     * @returns {Promise<void>}
     */
    closeModal(): Promise<void>;
}
export default FieldModifierLocationFrame;
//# sourceMappingURL=frame.d.ts.map