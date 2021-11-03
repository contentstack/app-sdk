import React, { ReactElement } from "react";
import { Location, NodeEntry, Path, Point, Node, ElementEntry, Transforms, Editor, Span } from "slate";
import { RTEPlugin } from "./index";
declare interface TransformOptions {
    at?: Location;
    match?: (node: Node) => boolean;
    mode?: "highest" | "lowest" | "all";
    hanging?: boolean;
    split?: boolean;
    voids?: boolean;
}
export declare interface IRteParam {
    selection: {
        get: () => Range | null;
        set: (selection: Location) => void;
        isSelected: () => boolean;
        isFocused: () => boolean;
        getEnd: () => Point;
        before: (at: Location, options?: {
            distance?: number;
            unit?: "character" | "word" | "line" | "block" | "offset";
        }) => Point | undefined;
        after: (at: Location, options?: {
            distance?: number;
            unit?: "offset" | "character" | "word" | "line" | "block";
            voids?: boolean;
        }) => Point | undefined;
        isPointEqual: (point: Point, another: Point) => boolean;
    };
    generators: {
        elements: (root?: Node, options?: {
            from?: Path;
            to?: Path;
            reverse?: boolean;
            pass?: (node: NodeEntry<Node>) => boolean;
        }) => Generator<ElementEntry, void, undefined>;
        nodes: (options?: {
            at?: Location | Span;
            match?: Node;
            mode?: "all" | "highest" | "lowest";
            universal?: boolean;
            reverse?: boolean;
            voids?: boolean;
        }) => Generator<Node, void, undefined>;
    };
    _adv: {
        editor: Editor;
        Transforms: typeof Transforms;
        Editor: Editor;
    };
    getPath: (node: Node) => Path;
    setAttrs: (props: Partial<Node> & {
        attrs?: {
            [key: string]: any;
        };
    }, options?: TransformOptions) => void;
    isNodeOfType: (type: string) => boolean;
    getNode: (at: Location, options?: {
        depth?: number;
        edge?: "start" | "end";
    }) => NodeEntry;
    string: (at: Location) => string;
    addMark: (key: string, value: any) => void;
    removeMark: (key: string) => void;
    hasMark: (key: string) => boolean;
    insertText: (text: string, at: Location) => void;
    getText: () => string;
    deleteText: () => void;
    updateNode: (type: string, attrs: {
        [key: string]: any;
    }, options: TransformOptions) => void;
    unsetNode: (options: TransformOptions) => void;
    insertNode: (node: Node, options: Omit<TransformOptions, "split"> & {
        select?: boolean;
    }) => void;
    deleteNode: (optons: {
        at?: Location;
        distance?: number | undefined;
        unit?: "character" | "word" | "line" | "block";
        reverse?: boolean;
        hanging?: boolean;
        voids?: boolean;
    }) => void;
    removeNode: (node: Node) => void;
    wrapNode: (node: Node, options: Omit<TransformOptions, "hanging">) => void;
    unwrapNode: (options: Omit<TransformOptions, "hanging">) => void;
    mergeNodes: (options: Omit<TransformOptions, "split">) => void;
    getEmbeddedItems: () => {
        [key: string]: any;
    };
    getVariable: <T = unknown>(name: string, defaultValue: any) => T;
    setVariable: <T = unknown>(name: string, value: T) => void;
}
export declare type IConfigCallback = (rte: IRteParam) => Partial<IConfig>;
export declare type IOnFunction = {
    exec: () => {};
    keydown: (rte: IRteParam) => void;
    normalize: (rte: IRteParam) => {};
    insertBreak: (rte: IRteParam) => {};
    deleteBackward: (rte: IRteParam) => {};
    deleteForward: (rte: IRteParam) => {};
    beforeRender: (rte: IRteParam) => {};
    beforeChildRender: () => {};
    copy: (rte: IRteParam) => void;
};
export declare type IOnType = "exec" | "normalize" | "deleteBackwards" | "deleteForwards" | "insertBreak" | "beforeRender" | "beforeChildRender" | "copy" | "paste";
export declare type IDisplayOnOptions = "toolbar" | "hoveringToolbar";
export declare type IElementTypeOptions = "inline" | "void" | "block" | "text";
export declare interface IDnd {
    disable: boolean;
    hideSelectionBackground: boolean;
    icon?: React.ReactElement;
    className: string;
    droppableContainer: (elementType: string, path: number[]) => string;
    disableColumnLayout: boolean;
}
export declare interface IConfig {
    title: string;
    iconName: React.ReactElement;
    displayOn: IDisplayOnOptions | IDisplayOnOptions[];
    elementType: IElementTypeOptions | IElementTypeOptions[];
    dnd: IDnd;
    render?: (...params: any) => ReactElement;
}
export declare interface IRegistryDnd {
    DisableDND: boolean;
    DisableSelectionHalo: boolean;
    CustomDndIcon: React.ReactElement;
    ContainerClassName: "scrte-table-row-dnd-container";
    getDroppableContainer: (elementType: string, path: number[]) => string;
    DisableGridDnd: boolean;
}
export declare interface IRegistry {
    title: string;
    iconName?: React.ReactElement;
    category?: string;
    toolbar: {
        inMainToolbar: boolean;
        inHoveringToolbar: boolean;
    };
    dndOptions: Partial<IRegistryDnd>;
    isContentstackElement: boolean;
    beforeChildrenRender?: (...params: any) => any;
    beforeElementRender?: (...params: any) => any;
    handleMouseDown?: (...params: any) => any;
    render?: (element: React.ReactElement, attrs: {
        [key: string]: any;
    }, path: number[], rte: IRteParam) => React.ReactElement;
}
export declare interface IMeta {
    id: string;
    elementType: null | IElementTypeOptions | IElementTypeOptions[];
    editorCallbacks: {
        [key: string]: any;
    };
    isDependent: boolean;
}
export declare interface IPluginMetaData {
    registry: IRegistry;
    meta: IMeta;
}
export declare interface IContainerRegistry {
    id: string;
    title: string;
    rootCategory: false;
    toolbar: {
        inMainToolbar: boolean;
        inHoveringToolbar: boolean;
    };
}
export declare interface IContainerMeta {
    id: string;
    dependentPlugins: RTEPlugin[];
}
export declare interface IContainerMetaData {
    registry: IContainerRegistry;
    meta: IContainerMeta;
}
export declare type IRTEPluginInitializer = (id: string, config: IConfigCallback) => RTEPlugin;
export {};
//# sourceMappingURL=types.d.ts.map