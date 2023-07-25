import postRobot from "post-robot";
import { getPreferredBodyElement } from "./utils/utils";

class Modal {
    constructor() {
        if (!Object.prototype.hasOwnProperty.call(window, "iframeRef")) {
            const rootElement = getPreferredBodyElement(
                document?.body?.children
            );
            window["iframeRef"] = rootElement;
        }

        // @ts-ignore
        postRobot.sendToParent("getStylesFromHeader", {
            styles: getStyleSheet(),
        });
    }

    /**
     * Sets the background when modal is opened.
     * @param element HTML element to be used as modal background
     */
    setBackgroundElement(element: HTMLElement) {
        window["iframeRef"] = element;
    }
}

export default Modal;

/**
 * Gets the stylesheets from the header of the page.
 * @returns {string} Returns the stylesheets from the header of the page.
 */
function getStyleSheet(): string {
    const styleSheets: string[] = []
    Array.from(document.styleSheets).forEach((sheet: CSSStyleSheet) => {
        if (sheet.ownerNode && Object.prototype.hasOwnProperty.call(sheet.ownerNode, "outerHTML")) {
            const ownerNode = sheet.ownerNode as HTMLElement;
            styleSheets.push(ownerNode.outerHTML)
        }
    });
    return styleSheets.join("");
}