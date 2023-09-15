import EventEmitter from "wolfy87-eventemitter";
import postRobot from "post-robot";
/**
 * Class representing an iframe window from Contentstack UI. Not available for Custom Widgets.
 */
declare class FieldModifierLocationFrame {
    /**
     * @hideconstructor
     */
    _connection: typeof postRobot;
    _autoResizingEnabled: boolean;
    _emitter: EventEmitter;
    _height?: number;
    _width?: number;
    private observer;
    constructor(connection: typeof postRobot, emitter: EventEmitter);
    /**
     * This method updates the UI location height and width on Contentstack UI.
     * If the value is not passed, it will update the height and width of the
     * UI location with the current height and width of the UI location.
     * @param {dimension: {height: number, width: number}} dimension Desired height and width of the iframe window
     */
    updateDimension(dimension?: {
        height?: number;
        width?: number;
    }): Promise<void>;
    /**
     * Prevent user from accidently closing the app by clicking outside the frame
     *  if the app is performing some active task.
     */
    preventFrameClose(state: boolean): Promise<void>;
    /**
     * This method enables auto resizing of the UI Location height.
     * @return {FieldModifierLocationFrame}.
     */
    enableAutoResizing(): FieldModifierLocationFrame;
    /**
     * This method disables auto resizing of the UI location height.
     * @return {FieldModifierLocationFrame}.
     */
    disableAutoResizing(): FieldModifierLocationFrame;
    /**
     * This method disables the iframe styles applied by the UI
     */
    disableInherentStyle(): Promise<void>;
    /**
     * It closes the app modal.
     * @returns {Promise<void>}
     */
    closeModal(): Promise<void>;
}
export default FieldModifierLocationFrame;
//# sourceMappingURL=frame.d.ts.map