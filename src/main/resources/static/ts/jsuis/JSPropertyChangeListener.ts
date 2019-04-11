/// <reference path = "../jsuis.ts"/>
/**
 * JSPropertyChangeListener
 * 
 * @author Yassuo Toda
 */
class JSPropertyChangeListener implements PropertyChangeListener {
    
    propertyChange: (propertyChangeEvent: JSPropertyChangeEvent) => void;
    
    constructor(propertyChangeListener: PropertyChangeListener) {
        this.propertyChange = propertyChangeListener.propertyChange;
    }
}