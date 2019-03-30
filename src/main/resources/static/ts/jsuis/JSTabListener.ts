/// <reference path = "../jsuis.ts"/>
class JSTabListener implements TabListener {
    
    tabOpened: (tabEvent: JSTabEvent, component?: JSComponent) => void;
    tabClosing: (tabEvent: JSTabEvent, component?: JSComponent) => void;
    tabClosed: (tabEvent: JSTabEvent, component?: JSComponent) => void;
    tabActivated: (tabEvent: JSTabEvent, component?: JSComponent) => void;
    tabDeactivated: (tabEvent: JSTabEvent, component?: JSComponent) => void;
    
    constructor(tabListener: TabListener) {
        if (tabListener.tabOpened) {
            this.tabOpened = function(tabEvent: JSTabEvent, component: JSComponent) {
                tabListener.tabOpened.call(tabListener, tabEvent, component);
            }
        }
        if (tabListener.tabClosing) {
            this.tabClosing = function(tabEvent: JSTabEvent, component: JSComponent) {
                tabListener.tabClosing.call(tabListener, tabEvent, component);
            }
        }
        if (tabListener.tabClosed) {
            this.tabClosed = function(tabEvent: JSTabEvent, component: JSComponent) {
                tabListener.tabClosed.call(tabListener, tabEvent, component);
            }
        }
        if (tabListener.tabActivated) {
            this.tabActivated = function(tabEvent: JSTabEvent, component: JSComponent) {
                tabListener.tabActivated.call(tabListener, tabEvent, component);
            }
        }
        if (tabListener.tabDeactivated) {
            this.tabDeactivated = function(tabEvent: JSTabEvent, component: JSComponent) {
                tabListener.tabDeactivated.call(tabListener, tabEvent, component);
            }
        }
    }
}