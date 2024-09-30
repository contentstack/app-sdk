import postRobot from "post-robot";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

class EventRegistration {
    private events: { [key: string]: string[] } = {};
    private eventsSubject = new Subject<{
        events: { [key: string]: string[] };
        action: string;
    }>();
    _connection: typeof postRobot;
    installationUID: string;
    appUID: string;
    locationType: string;

    constructor({
        connection,
        installationUID,
        appUID,
        locationType,
    }: {
        connection: typeof postRobot;
        installationUID: string;
        appUID: string;
        locationType: string;
    }) {
        this._connection = connection;
        this.installationUID = installationUID;
        this.appUID = appUID;
        this.locationType = locationType;

        // Subscribe to the eventsSubject to handle changes with debounce
        this.eventsSubject
            .pipe(
                debounceTime(300) // Adjust the debounce delay as needed
            )
            .subscribe({
                next: ({ events, action }) => {
                    this.onChange(events, action);
                },
            });
    }

    private onChange(events: { [key: string]: string[] }, action: string) {
        this._connection.sendToParent("registeredEvents", {
            installationUID: this.installationUID,
            appUID: this.appUID,
            locationEvents: {
                [this.locationType]: events,
            },
            action,
        });
    }

    insertEvent(eventName: string, eventType: string) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        if (!this.hasEvent(eventName, eventType)) {
            this.events[eventName].push(eventType);
            this.eventsSubject.next({ events: this.events, action: "insert" });
        }
    }

    hasEvent(eventName: string, eventType: string) {
        return this.events[eventName]?.includes(eventType);
    }

    removeEvent(eventName: string, eventType: string) {
        if (this.events[eventName]) {
            const index = this.events[eventName].indexOf(eventType);
            if (index !== -1) {
                this.events[eventName].splice(index, 1);
                if (this.events[eventName].length === 0) {
                    delete this.events[eventName];
                }
                this.eventsSubject.next({
                    events: this.events,
                    action: "remove",
                });
            }
        }
    }

    getRegisterEvents() {
        return this.events;
    }

    // Method to retrieve values from the events object
    getEventTypes(eventName: string): string[] | undefined {
        return this.events[eventName];
    }
}

export default EventRegistration;