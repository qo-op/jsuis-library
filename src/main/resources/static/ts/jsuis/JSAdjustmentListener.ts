/// <reference path = "../jsuis.ts"/>
class JSAdjustmentListener implements AdjustmentListener {
    
    adjustmentValueChanged: (event: Event) => void;
    
    constructor(adjustmentListener: AdjustmentListener);
    constructor(adjustmentListener: AdjustmentListener, redispatch: boolean);
    constructor(thisValue: any, adjustmentListener: AdjustmentListener);
    constructor(thisValue: any, adjustmentListener: AdjustmentListener, redispatch: boolean);
    // overload
    constructor(adjustmentListenerOrThisValue: any, redispatchOrAdjustmentListener?: boolean | AdjustmentListener, redispatch?: boolean) {
        if (redispatchOrAdjustmentListener === undefined || typeof redispatchOrAdjustmentListener === "boolean") {
            var adjustmentListener: AdjustmentListener = adjustmentListenerOrThisValue;
            redispatch = <boolean> redispatchOrAdjustmentListener;
            this.adjustmentValueChanged = function(event: Event) {
                adjustmentListener.adjustmentValueChanged(event);
                if (!redispatch) {
                    event.stopPropagation();
                }
            }
        } else {
            var thisValue: any = adjustmentListenerOrThisValue;
            var adjustmentListener: AdjustmentListener = redispatchOrAdjustmentListener;
            this.adjustmentValueChanged = function(event: Event) {
                adjustmentListener.adjustmentValueChanged.call(thisValue, event);
                if (!redispatch) {
                    event.stopPropagation();
                }
            }
        }
    }
}