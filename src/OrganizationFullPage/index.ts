import postRobot from "post-robot";
import EventEmitter from "wolfy87-eventemitter";
import { OrganizationDetails } from "../types/organization.types";
import { IOrgFullPageLocationInitData } from "../types";

class OrganizationFullPage {
    private _data: IOrgFullPageLocationInitData;
    private _connection: typeof postRobot;
    private _emitter: EventEmitter;

    constructor(
        data: IOrgFullPageLocationInitData,
        connection: typeof postRobot,
        emitter: EventEmitter
    ) {
        this._data = data;
        this._connection = connection;
        this._emitter = emitter;
    }

    get currentOrganization(): OrganizationDetails {
        return this._data.organization;
    }
}

export default OrganizationFullPage;