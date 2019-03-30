/// <reference path = "../jsuis.ts"/>
class JSChangeListener implements ChangeListener {
    
    changeListener: ChangeListener;
    
    stateChanged: (event: Event, component?: JSComponent) => void;
    
    component: JSComponent;
    
    constructor(changeListener: ChangeListener);
    constructor(changeListener: ChangeListener, propagate: boolean);
    // overload
    constructor(changeListener: ChangeListener, propagate?: boolean) {
        this.setChangeListener(changeListener);
        var jsChangeListener: JSChangeListener = this;
        this.stateChanged = function(event: Event, component: JSComponent) {
            if (component === undefined) {
                component = jsChangeListener.getComponent();
            }
            changeListener.stateChanged.call(changeListener, event, component);
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
    getComponent(): JSComponent {
        return this.component;
    }
    setComponent(component: JSComponent) {
        this.component = component;
    }
}