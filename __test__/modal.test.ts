import Modal from "../src/modal";

describe("Modal module", () => {
    const bodyChildInnerText = "body-child";
    const divElementInnerText = "separate-div";

    const bodyChild = document.createElement("div");
    bodyChild.innerText = bodyChildInnerText;
    document.body.appendChild(bodyChild);

    const divElement = document.createElement("div");
    divElement.innerText = divElementInnerText;
    document.body.appendChild(divElement);

    afterEach(() => {
        window["iframeRef"] = undefined;
    });

    it("should add first child of the body to iframeRef if the user has not provided one", () => {
        expect(window["iframeRef"]).toBeUndefined();

        new Modal();
        expect(window["iframeRef"]).toBeDefined();
        expect(window["iframeRef"].tagName).toBe(bodyChild.tagName);
        expect(window["iframeRef"].innerText).toBe(bodyChildInnerText);
    });

    it("should not add anything to iframeRef if it already exists", () => {
        window["iframeRef"] = divElement;

        new Modal();
        const iframeRef = window["iframeRef"];

        expect(iframeRef).toBeDefined();
        expect(iframeRef.tagName).toBe(divElement.tagName);
        expect(iframeRef.innerText).toBe(divElementInnerText);
    });

    it("should set iframeRef to the element provided by the user", () => {
        const modal = new Modal();
        modal.setBackgroundElement(divElement);
        const iframeRef = window["iframeRef"];

        expect(iframeRef).toBeDefined();
        expect(iframeRef.tagName).toBe(divElement.tagName);
        expect(iframeRef.innerText).toBe(divElementInnerText);
    });
});
