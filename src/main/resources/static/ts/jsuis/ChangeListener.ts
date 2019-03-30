/// <reference path = "../jsuis.ts"/>
interface ChangeListener {
    stateChanged(event: Event, component: JSComponent): void;
}