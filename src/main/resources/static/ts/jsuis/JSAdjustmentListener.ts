/// <reference path = "../jsuis.ts"/>
class JSAdjustmentListener implements AdjustmentListener {
    
    adjustmentListener: AdjustmentListener;
    
    adjustmentValueChanged: (event: Event, component?: JSComponent) => void;
    
    component: JSComponent;
    
    constructor(adjustmentListener: AdjustmentListener);
    constructor(adjustmentListener: AdjustmentListener, propagate: boolean);
    // overload
    constructor(adjustmentListener: AdjustmentListener, propagate?: boolean) {
        this.setAdjustmentListener(adjustmentListener);
        var jsAdjustmentListener: JSAdjustmentListener = this;
        this.adjustmentValueChanged = function(event: Event, component: JSComponent) {
            if (component === undefined) {
                component = jsAdjustmentListener.getComponent();
            }
            adjustmentListener.adjustmentValueChanged.call(adjustmentListener, event, component);
            if (!propagate) {
                event.stopPropagation();
            }
        }
    }
    getAdjustmentListener(): AdjustmentListener {
        return this.adjustmentListener;
    }
    setAdjustmentListener(adjustmentListener: AdjustmentListener) {
        this.adjustmentListener = adjustmentListener;
    }
    getComponent(): JSComponent {
        return this.component;
    }
    setComponent(component: JSComponent) {
        this.component = component;
    }
}