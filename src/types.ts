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
        type: 'DASHBOARD'
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
        type: 'SIDEBAR'
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
        type: 'FIELD'
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
    'SIDEBAR': ISidebarInitData
    'DASHBOARD': IDashboardInitData
    'RTE': IRTEInitData
}

export declare type ILocation = "FIELD" | "DASHBOARD" | "SIDEBAR" | "RTE"
