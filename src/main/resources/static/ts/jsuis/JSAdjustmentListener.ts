/// <reference path = "../jsuis.ts"/>
/**
 * JSAdjustmentListener
 * 
 * @author Yassuo Toda
 */
class JSAdjustmentListener implements AdjustmentListener {
    
    adjustmentListener: AdjustmentListener;
    propagate: boolean;
    component: JSComponent;
    
    adjustmentValueChanged: (event: Event, component?: JSComponent) => void;
    
    constructor(adjustmentListener: AdjustmentListener);
    constructor(adjustmentListener: AdjustmentListener, propagate: boolean);
    // overload
    constructor(...args: any[]) {
        var adjustmentListener: AdjustmentListener = args[0];
        switch (args.length) {
        case 1:
            // constructor(adjustmentListener: AdjustmentListener);
            this.setAdjustmentListener(adjustmentListener);
            break;
        case 2:
            // constructor(adjustmentListener: AdjustmentListener, propagate: boolean);
            if (typeof args[1] === "boolean") {
                var propagate: boolean = args[1];
                this.setAdjustmentListener(adjustmentListener);
                this.setPropagate(propagate);
            }
            break;
        default:
        }
        var jsAdjustmentListener: JSAdjustmentListener = this;
        this.adjustmentValueChanged = function(event: Event, component: JSComponent) {
            if (component === undefined) {
                component = jsAdjustmentListener.getComponent();
            }
            var adjustmentListener: AdjustmentListener = jsAdjustmentListener.getAdjustmentListener();
            adjustmentListener.adjustmentValueChanged.call(adjustmentListener, event, component);
            var propagate = jsAdjustmentListener.getPropagate();
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
    getPropagate(): boolean {
        return this.propagate;
    }
    setPropagate(propagate: boolean) {
        this.propagate = propagate;
    } 
    getComponent(): JSComponent {
        return this.component;
    }
    setComponent(component: JSComponent) {
        this.component = component;
    }
}