/// <reference path = "../jsuis.ts"/>
/**
 * JSComponentActionListener
 * 
 * @author Yassuo Toda
 */
class JSComponentActionListener implements JSActionListener {
    
    actionPerformed: (event: Event, ...parameters: any[]) => void;
    
    parameters: any[] = [];
    
    constructor(actionListener: JSActionListener) {
        var componentActionListener: JSComponentActionListener = this;
        this.actionPerformed = function(event: Event) {
            var parameters: any[] = componentActionListener.getParameters().slice();
            parameters.unshift(event);
            actionListener.actionPerformed.apply(actionListener, parameters);
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