/// <reference path = "../jsuis.ts"/>
class JSChangeListener implements ChangeListener {
    
    stateChanged: (event: Event) => void;
    
    constructor(changeListener: ChangeListener);
    constructor(changeListener: ChangeListener, redispatch: boolean);
    constructor(thisValue: any,                 changeListener: ChangeListener);
    constructor(thisValue: any,                 changeListener: ChangeListener, redispatch: boolean);
    // overload
    constructor(changeListenerOrThisValue: any, redispatchOrChangeListener?: boolean | ChangeListener, redispatch?: boolean) {
        if (redispatchOrChangeListener === undefined || typeof redispatchOrChangeListener === "boolean") {
            var changeListener: ChangeListener = changeListenerOrThisValue;
            redispatch = <boolean> redispatchOrChangeListener;
            this.stateChanged = function(event: Event) {
                changeListener.stateChanged(event);
                if (!redispatch) {
                    event.stopPropagation();
                }
            }
        } else {
            var thisValue: any = changeListenerOrThisValue;
            var changeListener: ChangeListener = redispatchOrChangeListener;
            this.stateChanged = function(event: Event) {
                changeListener.stateChanged.call(thisValue, event);
                if (!redispatch) {
                    event.stopPropagation();
                }
            }
        }
    }
}