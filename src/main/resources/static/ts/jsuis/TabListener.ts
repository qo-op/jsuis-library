/// <reference path = "../jsuis.ts"/>
/**
 * TabListener
 * 
 * @author Yassuo Toda
 */
interface TabListener {
    tabOpened?(tabEvent: JSTabEvent, component?: JSComponent): void
    tabClosing?(tabEvent: JSTabEvent, component?: JSComponent): void;
    tabClosed?(tabEvent: JSTabEvent, component?: JSComponent): void;
    tabActivated?(tabEvent: JSTabEvent, component?: JSComponent): void;
    tabDeactivated?(tabEvent: JSTabEvent, component?: JSComponent): void;
}