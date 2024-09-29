import postRobot from "post-robot";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

class EventRegistration {
    private events: { [key: string]: Set<string> } = {};
    private eventsSubject = new Subject<{
        events: { [key: string]: Set<string> };
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

    private onChange(events: { [key: string]: Set<string> }, action: string) {
        const serializedEvents = this.serializeEvents(events);

        this._connection.sendToParent("registeredEvents", {
            [this.installationUID]: {
                appUID: this.appUID,
                registeredEvents: {
                    [this.locationType]: serializedEvents,
                },
                action,
            },
        });
    }

    private serializeEvents(events: { [key: string]: Set<string> }): {
        [key: string]: string[];
    } {
        return Object.fromEntries(
            Object.entries(events).map(([key, value]) => [
                key,
                Array.from(value),
            ])
        );
    }

    insertEvent(eventName: string, eventType: string) {
        if (!this.events[eventName]) {
            this.events[eventName] = new Set();
        }
        if (!this.hasEvent(eventName, eventType)) {
            this.events[eventName].add(eventType);
            this.eventsSubject.next({ events: this.events, action: "insert" });
        }
    }

    hasEvent(eventName: string, eventType: string) {
        return this.events[eventName]?.has(eventType);
    }

    removeEvent(eventName: string, eventType: string) {
        if (this.events[eventName]) {
            const prevSize = this.events[eventName].size;
            this.events[eventName].delete(eventType);
            if (this.events[eventName].size !== prevSize) {
                if (this.events[eventName].size === 0) {
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
    getEventTypes(eventName: string): Set<string> | undefined {
        return this.events[eventName];
    }
}

export default EventRegistration;
