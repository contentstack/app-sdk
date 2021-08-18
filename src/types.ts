export declare interface IDashboardWidget {
    [key: string]: any
}

export declare interface ICustomField {
    [key: string]: any

}

export declare interface ISidebarWidget {
    [key: string]: any

}

export declare interface IRTE {
    [key: string]: any

}

// initialization data
export declare interface IUser {

}

export declare interface ICurrentStack {
    [key: string]: any
}

export declare interface ICurrentEntry {
    [key: string]: any
}

export declare interface ICurrentContentType {
    [key: string]: any
}

export declare interface IConfig {
    [key: string]: any
}

export declare interface ISchema {
    [key: string]: any
}

export declare interface IFieldConfig {
    [key: string]: any
}


export declare interface IDashboardInitData {
    data: {
        dashboard_width: "full_width" | "half_width",
        config: IConfig
        stack: ICurrentStack
        type: 'DASHBOARD' | 'DASHBOARD_WIDGET'
        user: IUser,
    }
}

export declare interface ISidebarInitData {
    data: {
        config: IConfig,
        content_type: ICurrentContentType,
        entry: ICurrentEntry,
        locale: string,
        stack: ICurrentStack,
        type: 'SIDEBAR' | 'SIDEBAR_WIDGET'
        user: IUser,
    }
}

export declare interface IFieldInitData {
    data: {
        entry: ICurrentEntry,
        content_type: ICurrentContentType,
        locale: string,
        user: IUser,
        uid: string,
        schema: ISchema,
        config: IConfig
        value: any
        field_config: IFieldConfig
        stack: ICurrentStack
        type: 'FIELD' | 'CUSTOM_FIELD'
    }
}

export declare interface IRTEInitData {
    data: {
        config: IConfig,
        stack: ICurrentStack,
        type: 'RTE',
        user: IUser,
    }
}

export declare interface IInitializationData {
    'FIELD': IFieldConfig
    'CUSTOM_FIELD': IFieldConfig
    'SIDEBAR': ISidebarInitData
    'SIDEBAR_WIDGET': ISidebarInitData
    'DASHBOARD': IDashboardInitData
    'DASHBOARD_WIDGET': IDashboardInitData
    'RTE': IRTEInitData
}


export const isLocation = (value: IType | ILocation): value is ILocation => {
    return ['CUSTOM_FIELD', 'SIDEBAR_WIDGET', 'DASHBOARD_WIDGET', 'RTE'].includes(value)
}
export declare type IType = "FIELD" | "DASHBOARD" | "SIDEBAR"

export declare type ILocation = "RTE" | "CUSTOM_FIELD" | "DASHBOARD_WIDGET" | "SIDEBAR_WIDGET"
