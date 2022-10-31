import { expect } from "chai";
import { RTEPlugin } from "..";
import React from "react";

const createDropdown = () => {
    const DropDown = new RTEPlugin("Parent", () => {
        return {
            title: "Dropdown",
            icon: React.createElement("p"),
        };
    });
    const Child = new RTEPlugin("Child", () => {
        return {
            title: "Child",
            icon: React.createElement("span"),
        };
    });
    DropDown.addPlugins(Child);
    return DropDown;
};

const createPlugin = (config = {}) => {
    const detail: any = {
        id: "plugin",
        title: "Plugin",
        icon: React.createElement("span"),
        render: (props) => {
            return React.createElement("div", {}, props.children);
        },
        display: ["hoveringToolbar", "toolbar"],
        elementType: ["inline", "void", "block", "text"],
        ...config
    };
    const Plugin = new RTEPlugin(detail.id, () => {
        return detail;
    });
    return [Plugin, detail];
};

const stringify = (j: any): string => JSON.stringify(Object(j));

describe("RTE Plugin", () => {
    it("Contains all RTE Callback properties in get", async () => {
        const [plugin, inputPluginProps] = createPlugin();
        const pluginProps = await plugin.get();
        const registry = pluginProps.registry;
        const basicDetails = {
            title: inputPluginProps.title,
            toolbar: {
                inHoveringToolbar: true,
                inMainToolbar: true,
            },
            iconName: inputPluginProps.icon,
            meta: {
                id: inputPluginProps.id,
                elementType: inputPluginProps.elementType,
                editorCallbacks: {},
                isDependent: false,
            },
        };
        expect(stringify(basicDetails)).to.equal(
            stringify({
                title: registry.title,
                toolbar: registry.toolbar,
                iconName: registry.iconName,
                meta: pluginProps.meta,
            })
        );
    });

    it("Check editor callbacks are getting applied", async () => {
        const [plugin, details] = createPlugin();
        const fnc = jest.fn(() => {});
        const events = [
            "keydown",
            "paste",
            "deleteBackward",
            "deleteForward",
            "insertBreak",
            "normalize",
        ];
        events.forEach((event) => plugin.on(event, fnc));
        const callbacks = (await plugin.get()).meta.editorCallbacks;
        expect(Object.keys(callbacks).length).to.eq(events.length);
        expect(events.every((event) => callbacks[event] === fnc)).to.be.true;
        Object.values(callbacks).forEach((callback: any) => callback());
        expect(fnc.mock.calls.length).to.eq(events.length);
    });

    it("Check if callbacks under register is registered under plugin", async () => {
        const [plugin, details] = createPlugin();
        const fnc = jest.fn(() => {});
        const events = ["exec", "beforeRender", "beforeChildRender"];
        const callbackEventName = [
            "handleMouseDown",
            "beforeElementRender",
            "beforeChildrenRender",
        ];
        events.forEach((event) => plugin.on(event, fnc));
        const registry = (await plugin.get()).registry;
        expect(callbackEventName.every((event) => registry[event])).to.be.true;
        callbackEventName.forEach((event) => registry[event]());
        expect(fnc.mock.calls.length).to.eq(callbackEventName.length);
    });

    it("Dropdown get() has icon", async () => {
        const dropdown = await createDropdown().get();
        expect(dropdown.registry).to.have.property("iconName");
        expect(stringify(dropdown.registry.iconName)).to.equal(
            stringify(React.createElement("p"))
        );
    });

    it("Dropdown get() has dependent plugin", async () => {
        const dropdown: any = await createDropdown().get();
        expect(dropdown.meta.dependentPlugins).to.have.length(1);
    });

    it('Test inline with DND Options disable', async () => {
        const [plugin, details] = createPlugin();
        const registry = (await plugin.get()).registry;
        expect(registry['dndOptions']['DisableDND']).to.be.eq(true);
        expect(registry['dndOptions']['DisableSelectionHalo']).to.be.eq(true);
    })

    it('Test DND Options undefined', async () => {
        let [plugin, details] = createPlugin({
            elementType: 'block'
        });
        let registry = (await plugin.get()).registry;
        expect(registry['dndOptions']).to.be.undefined;
        [plugin, details] = createPlugin({
            elementType: ['block']
        });
        registry = (await plugin.get()).registry;
        expect(registry['dndOptions']).to.be.undefined;
    })
});
