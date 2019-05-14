/// <reference path = "../jsuis.ts"/>
/**
 * JSActionListener
 * 
 * @author Yassuo Toda
 */
class JSActionListener implements ActionListener {
    
    actionPerformed: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    
    parameters: any[] = [];
    
    constructor(actionListener: ActionListener) {
        var jsActionListener: JSActionListener = this;
        this.actionPerformed = function(mouseEvent: MouseEvent) {
            var parameters: any[] = jsActionListener.getParameters().slice();
            parameters.unshift(mouseEvent);
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