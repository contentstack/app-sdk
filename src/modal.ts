class Modal {
    constructor() {
        if (!Object.prototype.hasOwnProperty.call(window, "iframeRef")) {
            window["iframeRef"] = document?.body?.children[0];
        }
    }
    setBackgroundElement(element: HTMLElement) {
        window["iframeRef"] = element;
    }
}

export default Modal;
