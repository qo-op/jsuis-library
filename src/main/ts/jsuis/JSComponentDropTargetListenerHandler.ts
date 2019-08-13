/// <reference path = "../jsuis.ts"/>
/**
 * JSComponentDropTargetListenerHandler
 * 
 * @author Yassuo Toda
 */
class JSComponentDropTargetListenerHandler implements JSMouseListener {
    
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
    mouseEntered(mouseEvent: MouseEvent): void {
        var component: JSComponent = this.getComponent();
        var dragSource: JSComponent = JSBody.getInstance().getDragSource();
        if (dragSource && dragSource.isDragEnabled()) {
            var dragging: boolean = dragSource.isDragging();
            if (dragging) {
                component.fireDragEnter(mouseEvent);
            }
        }
        mouseEvent.stopPropagation();
    }
    mouseMoved(mouseEvent: MouseEvent): void {
        var component: JSComponent = this.getComponent();
        var dragSource: JSComponent = JSBody.getInstance().getDragSource();
        if (dragSource && dragSource.isDragEnabled()) {
            var dragging: boolean = dragSource.isDragging();
            if (dragging) {
                component.fireDragOver(mouseEvent);
            }
        }
        mouseEvent.stopPropagation();
    }
    mouseExited(mouseEvent: MouseEvent): void {
        var component: JSComponent = this.getComponent();
        var dragSource: JSComponent = JSBody.getInstance().getDragSource();
        if (dragSource && dragSource.isDragEnabled()) {
            var dragging: boolean = dragSource.isDragging();
            if (dragging) {
                component.fireDragLeave(mouseEvent);
            }
        }
        mouseEvent.stopPropagation();
    }
    mouseReleased(mouseEvent: MouseEvent): void {
        var component: JSComponent = this.getComponent();
        var dragSource: JSComponent = JSBody.getInstance().getDragSource();
        if (dragSource && dragSource.isDragEnabled()) {
            var dragging: boolean = dragSource.isDragging();
            if (dragging) {
                component.fireDrop(mouseEvent);
            }
        }
        mouseEvent.stopPropagation();
    }
}
