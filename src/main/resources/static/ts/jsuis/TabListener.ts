/// <reference path = "../jsuis.ts"/>
interface TabListener {
    tabOpened?(tabEvent: JSTabEvent): void
    tabClosing?(tabEvent: JSTabEvent): void;
    tabClosed?(tabEvent: JSTabEvent): void;
    tabActivated?(tabEvent: JSTabEvent): void;
    tabDeactivated?(tabEvent: JSTabEvent): void;
}