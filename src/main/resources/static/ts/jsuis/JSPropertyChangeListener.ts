/// <reference path = "../jsuis.ts"/>
class JSPropertyChangeListener implements PropertyChangeListener {
    
    propertyChange: (propertyChangeEvent: JSPropertyChangeEvent) => void;
    
    constructor(propertyChangeListener: PropertyChangeListener);
    constructor(thisValue: any, propertyChangeListener: PropertyChangeListener);
    // overload
    constructor(propertyChangeListenerOrThisValue: any, propertyChangeListener?: PropertyChangeListener) {
        if (propertyChangeListener === undefined) {
            propertyChangeListener = propertyChangeListenerOrThisValue;
            this.propertyChange = function(propertyChangeEvent: JSPropertyChangeEvent) {
                propertyChangeListener.propertyChange(propertyChangeEvent);
            }
        } else {
            var thisValue = propertyChangeListenerOrThisValue;
            this.propertyChange = function(propertyChangeEvent: JSPropertyChangeEvent) {
                propertyChangeListener.propertyChange.call(thisValue, propertyChangeEvent);
            }
        }
    }
}