import postRobot from "post-robot";
interface EventRegistryConfig {
    connection: typeof postRobot;
    installationUID: string;
    appUID: string;
    locationType: string;
}
declare class EventRegistry {
    private events;
    private eventsSubject;
    private debounceInterval;
    private _connection;
    private installationUID;
    private appUID;
    private locationType;
    constructor({ connection, installationUID, appUID, locationType, }: EventRegistryConfig);
    private sendRegisteredEvents;
    register(eventType: string): void;
}
export default EventRegistry;
//# sourceMappingURL=EventRegistry.d.ts.map