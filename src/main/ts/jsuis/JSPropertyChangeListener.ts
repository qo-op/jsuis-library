/// <reference path = "../jsuis.ts"/>
/**
 * JSPropertyChangeListener
 * 
 * @author Yassuo Toda
 */
class JSPropertyChangeListener implements PropertyChangeListener {
    
    propertyChange: (propertyChangeEvent: JSPropertyChangeEvent, ...parameters: any[]) => void;
    
    parameters: any[] = [];
    
    constructor(propertyChangeListener: PropertyChangeListener) {
        var jsPropertyChangeListener: JSPropertyChangeListener = this;
        this.propertyChange = function(propertyChangeEvent: JSPropertyChangeEvent) {
            var parameters: any[] = jsPropertyChangeListener.getParameters().slice();
            parameters.unshift(propertyChangeEvent);
            propertyChangeListener.propertyChange.apply(propertyChangeListener, parameters);
        }
    }
    getParameters(): any[] {
        return this.parameters;
    }
    setParameters(...parameters: any[]) {
        this.parameters = parameters;
    }
    withParameters(...parameters: any[]) {
        this.parameters = parameters;
        return this;
    }
}