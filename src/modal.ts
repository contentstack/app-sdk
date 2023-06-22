import { getPreferredBodyElement } from "./utils/utils";

class Modal {
    constructor() {
        if (!Object.prototype.hasOwnProperty.call(window, "iframeRef")) {
            const rootElement = getPreferredBodyElement(
                document?.body?.children
            );
            window["iframeRef"] = rootElement;
        }
    }

    setBackgroundElement(element: HTMLElement) {
        window["iframeRef"] = element;
    }
}

export default Modal;
