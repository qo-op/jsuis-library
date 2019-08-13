/// <reference path = "../jsuis.ts"/>
/**
 * JSComponentChangeListener
 * 
 * @author Yassuo Toda
 */
class JSComponentChangeListener implements JSChangeListener {
    
    stateChanged: (event: Event, ...parameters: any[]) => void;
    
    parameters: any[] = [];
    
    constructor(changeListener: JSChangeListener) {
        var componentChangeListener: JSComponentChangeListener = this;
        this.stateChanged = function(event: Event) {
            var parameters: any[] = componentChangeListener.getParameters().slice();
            parameters.unshift(event);
            changeListener.stateChanged.apply(changeListener, parameters);
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