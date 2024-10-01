import postRobot from "post-robot";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

interface EventRegistryConfig {
    connection: typeof postRobot;
    installationUID: string;
    appUID: string;
    locationType: string;
}

class EventRegistry {
    private events: string[] = [];
    private eventsSubject: Subject<string> = new Subject<string>();
    private debounceInterval: number = 400;
    private _connection: typeof postRobot;
    private installationUID: string;
    private appUID: string;
    private locationType: string;

    constructor({ connection, installationUID, appUID, locationType }: EventRegistryConfig) {
        this._connection = connection;
        this.installationUID = installationUID;
        this.appUID = appUID;
        this.locationType = locationType;

        this.eventsSubject.pipe(
            debounceTime(this.debounceInterval)
        ).subscribe(() => {
            this.sendRegisteredEvents();
        });
    }

    private sendRegisteredEvents() {
        this._connection.sendToParent("eventRegistration", {
            appUID: this.appUID,
            installationUID: this.installationUID,
            locationType: this.locationType,
            events: this.events,
        });
    }

    public register(eventType: string) {
        this.events.push(eventType);
        this.eventsSubject.next(eventType);
    }
}

export default EventRegistry;