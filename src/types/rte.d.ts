import type { UiLocation } from '../uiLocation';

declare module "../RTE/types" {
    export interface IRteParam {
        sdk: UiLocation;
    }
}