/// <reference path = "../jsuis.ts"/>
/**
 * JSComponentActionListenerHandler
 * 
 * @author Yassuo Toda
 */
class JSComponentActionListenerHandler implements JSMouseListener {
    
    private component: JSComponent;
    
    constructor(component: JSComponent) {
        this.setComponent(component);
    }
    getComponent(): JSComponent {
        return this.component;
    }
    setComponent(component: JSComponent) {
        this.component = component;
    }
    mouseClicked(mouseEvent: MouseEvent) {
        var component: JSComponent = this.getComponent();
        component.fireActionPerformed(mouseEvent);
        mouseEvent.stopPropagation();
    }
}
