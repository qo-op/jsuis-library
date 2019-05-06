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
            var args: any[] = jsAdjustmentListener.getArgs().slice();
            args.unshift(event);
            adjustmentListener.adjustmentValueChanged.apply(adjustmentListener, args);
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