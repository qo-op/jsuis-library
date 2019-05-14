/// <reference path = "../jsuis.ts"/>
/**
 * JSChangeListener
 * 
 * @author Yassuo Toda
 */
class JSChangeListener implements ChangeListener {
    
    stateChanged: (event: Event, ...parameters: any[]) => void;
    
    parameters: any[] = [];
    
    constructor(changeListener: ChangeListener) {
        var jsChangeListener: JSChangeListener = this;
        this.stateChanged = function(event: Event) {
            var parameters: any[] = jsChangeListener.getParameters().slice();
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