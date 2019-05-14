/// <reference path = "../jsuis.ts"/>
/**
 * JSAdjustmentListener
 * 
 * @author Yassuo Toda
 */
class JSAdjustmentListener implements AdjustmentListener {
    
    adjustmentValueChanged: (event: Event, ...parameters: any[]) => void;
    
    parameters: any[] = [];
    
    constructor(adjustmentListener: AdjustmentListener) {
        var jsAdjustmentListener: JSAdjustmentListener = this;
        this.adjustmentValueChanged = function(event: Event) {
            var parameters: any[] = jsAdjustmentListener.getParameters().slice();
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