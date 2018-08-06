/// <reference path = "../jsuis.ts"/>
class JSTabListener implements TabListener {
    
    tabOpened: (tabEvent: JSTabEvent) => void;
    tabClosing: (tabEvent: JSTabEvent) => void;
    tabClosed: (tabEvent: JSTabEvent) => void;
    tabActivated: (tabEvent: JSTabEvent) => void;
    tabDeactivated: (tabEvent: JSTabEvent) => void;
    
    constructor(tabListener: TabListener);
    constructor(thisValue: any, tabListener: TabListener);
    // overload
    constructor(tabListenerOrThisValue: any, tabListener?: TabListener) {
        if (tabListener === undefined) {
            tabListener = tabListenerOrThisValue;
            if (tabListener.tabOpened) {
                this.tabOpened = function(tabEvent: JSTabEvent) {
                    tabListener.tabOpened(tabEvent);
                }
            }
            if (tabListener.tabClosing) {
                this.tabClosing = function(tabEvent: JSTabEvent) {
                    tabListener.tabClosing(tabEvent);
                }
            }
            if (tabListener.tabClosed) {
                this.tabClosed = function(tabEvent: JSTabEvent) {
                    tabListener.tabClosed(tabEvent);
                }
            }
            if (tabListener.tabActivated) {
                this.tabActivated = function(tabEvent: JSTabEvent) {
                    tabListener.tabActivated(tabEvent);
                }
            }
            if (tabListener.tabDeactivated) {
                this.tabDeactivated = function(tabEvent: JSTabEvent) {
                    tabListener.tabDeactivated(tabEvent);
                }
            }
        } else {
            var thisValue = tabListenerOrThisValue;
            if (tabListener.tabOpened) {
                this.tabOpened = function(tabEvent: JSTabEvent) {
                    tabListener.tabOpened.call(thisValue, tabEvent);
                }
            }
            if (tabListener.tabClosing) {
                this.tabClosing = function(tabEvent: JSTabEvent) {
                    tabListener.tabClosing.call(thisValue, tabEvent);
                }
            }
            if (tabListener.tabClosed) {
                this.tabClosed = function(tabEvent: JSTabEvent) {
                    tabListener.tabClosed.call(thisValue, tabEvent);
                }
            }
            if (tabListener.tabActivated) {
                this.tabActivated = function(tabEvent: JSTabEvent) {
                    tabListener.tabActivated.call(thisValue, tabEvent);
                }
            }
            if (tabListener.tabDeactivated) {
                this.tabDeactivated = function(tabEvent: JSTabEvent) {
                    tabListener.tabDeactivated.call(thisValue, tabEvent);
                }
            }
        }        
   }
}