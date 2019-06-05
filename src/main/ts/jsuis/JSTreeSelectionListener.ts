/// <reference path = "../jsuis.ts"/>
/**
 * JSTreeSelectionListener
 * 
 * @author Yassuo Toda
 */
class JSTreeSelectionListener implements TreeSelectionListener {
    
    valueChanged: (treeSelectionEvent: JSTreeSelectionEvent, ...parameters: any[]) => void;
    
    parameters: any[] = [];
    
    constructor(treeSelectionListener: TreeSelectionListener) {
        var jsTreeSelectionListener: JSTreeSelectionListener = this;
        this.valueChanged = function(treeSelectionEvent: JSTreeSelectionEvent) {
            var parameters: any[] = jsTreeSelectionListener.getParameters().slice();
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