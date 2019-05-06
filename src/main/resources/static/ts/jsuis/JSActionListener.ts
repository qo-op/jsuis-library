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
            var args: any[] = jsActionListener.getArgs().slice();
            args.unshift(mouseEvent);
            actionListener.actionPerformed.apply(actionListener, args);
        }
    }
    getArgs(): any[] {
        return this.parameters;
    }
    setArgs(...parameters: any[]) {
        this.parameters = parameters;
    }
    withArgs(...parameters: any[]) {
        this.parameters = parameters;
        return this;
    }
}