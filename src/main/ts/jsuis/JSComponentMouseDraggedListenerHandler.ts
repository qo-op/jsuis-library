/// <reference path = "../jsuis.ts"/>
/**
 * JSComponentMouseDraggedListenerHandler
 * 
 * @author Yassuo Toda
 */
class JSComponentMouseDraggedListenerHandler implements JSMouseListener {
    
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
    mousePressed(mouseEvent: MouseEvent) {
        var component: JSComponent = this.getComponent();
        JSBody.getInstance().setDragSource(component);
        mouseEvent.stopPropagation();
    }
}
