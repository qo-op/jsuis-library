/// <reference path = "../jsuis.ts"/>
/**
 * JSComponentAdjustmentListener
 * 
 * @author Yassuo Toda
 */
class JSComponentAdjustmentListener implements JSAdjustmentListener {
    
    adjustmentValueChanged: (event: Event, ...parameters: any[]) => void;
    
    parameters: any[] = [];
    
    constructor(adjustmentListener: JSAdjustmentListener) {
        var componentAdjustmentListener: JSComponentAdjustmentListener = this;
        this.adjustmentValueChanged = function(event: Event) {
            var parameters: any[] = componentAdjustmentListener.getParameters().slice();
            parameters.unshift(event);
            adjustmentListener.adjustmentValueChanged.apply(adjustmentListener, parameters);
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