/// <reference path = "../jsuis.ts"/>
/**
 * JSChangeListener
 * 
 * @author Yassuo Toda
 */
class JSChangeListener implements ChangeListener {
    
    changeListener: ChangeListener;
    propagate: boolean;
    component: JSComponent;
    
    stateChanged: (event: Event, component?: JSComponent) => void;
    
    constructor(changeListener: ChangeListener);
    constructor(changeListener: ChangeListener, propagate: boolean);
    // overload
    constructor(...args: any[]) {
        var changeListener: ChangeListener = args[0];
        switch (args.length) {
        case 1:
            // constructor(changeListener: ChangeListener);
            this.setChangeListener(changeListener);
            break;
        case 2:
            // constructor(changeListener: ChangeListener, propagate: boolean);
            if (typeof args[1] === "boolean") {
                var propagate: boolean = args[1];
                this.setChangeListener(changeListener);
                this.setPropagate(propagate);
            }
            break;
        default:
        }
        var jsChangeListener: JSChangeListener = this;
        this.stateChanged = function(event: Event, component: JSComponent) {
            if (component === undefined) {
                component = jsChangeListener.getComponent();
            }
            var changeListener: ChangeListener = jsChangeListener.getChangeListener();
            changeListener.stateChanged.call(changeListener, event, component);
            var propagate = jsChangeListener.getPropagate();
            if (!propagate) {
                event.stopPropagation();
            }
        }
    }
    getChangeListener(): ChangeListener {
        return this.changeListener;
    }
    setChangeListener(changeListener: ChangeListener) {
        this.changeListener = changeListener;
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