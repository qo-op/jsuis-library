/// <reference path = "../jsuis.ts"/>
class JSPropertyChangeListener implements PropertyChangeListener {
    
    propertyChange: (propertyChangeEvent: JSPropertyChangeEvent) => void;
    
    constructor(propertyChangeListener: PropertyChangeListener) {
        this.propertyChange = propertyChangeListener.propertyChange;
    }
}