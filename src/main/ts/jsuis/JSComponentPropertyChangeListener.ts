/// <reference path = "../jsuis.ts"/>
/**
 * JSComponentPropertyChangeListener
 * 
 * @author Yassuo Toda
 */
class JSComponentPropertyChangeListener implements JSPropertyChangeListener {
    
    private component: JSComponent
    
    constructor(component: JSComponent) {
        this.setComponent(component);
    }
    getComponent(): JSComponent {
        return this.component;
    }
    setComponent(component: JSComponent) {
        this.component = component;
    }
    propertyChange(propertyChangeEvent: JSPropertyChangeEvent): void {
        var component: JSComponent = this.getComponent();
        var action: JSAction = component.getAction();
        if (action) {
            component.setEnabled(action.isEnabled());
        }
    }
}