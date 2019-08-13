/// <reference path = "../jsuis.ts"/>
/**
 * JSComponentTreeSelectionListener
 * 
 * @author Yassuo Toda
 */
class JSComponentTreeSelectionListener implements JSTreeSelectionListener {
    
    valueChanged: (treeSelectionEvent: JSTreeSelectionEvent, ...parameters: any[]) => void;
    
    parameters: any[] = [];
    
    constructor(treeSelectionListener: JSTreeSelectionListener) {
        var componentTreeSelectionListener: JSComponentTreeSelectionListener = this;
        this.valueChanged = function(treeSelectionEvent: JSTreeSelectionEvent) {
            var parameters: any[] = componentTreeSelectionListener.getParameters().slice();
            parameters.unshift(treeSelectionEvent);
            treeSelectionListener.valueChanged.apply(treeSelectionListener, parameters);
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