/// <reference path = "../jsuis.ts"/>
/**
 * JSActionListener
 * 
 * @author Yassuo Toda
 */
class JSActionListener implements ActionListener {
    
    actionPerformed: (event: Event, ...parameters: any[]) => void;
    
    parameters: any[] = [];
    
    constructor(actionListener: ActionListener) {
        var jsActionListener: JSActionListener = this;
        this.actionPerformed = function(event: Event) {
            var parameters: any[] = jsActionListener.getParameters().slice();
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