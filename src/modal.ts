import postRobot from "post-robot";

class Modal {
    constructor() {
        if (!Object.prototype.hasOwnProperty.call(window, "iframeRef")) {
            window["iframeRef"] = document?.body?.children[0];
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