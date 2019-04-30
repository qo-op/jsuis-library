/// <reference path = "../jsuis.ts"/>
/**
 * JSDragSourceListener
 * 
 * @author Yassuo Toda
 */
class JSDragSourceListener implements DragSourceListener {
    
    dragSourceListener: DragSourceListener;
    propagate: boolean;
    component: JSComponent;
    
    dragStart: (mouseEvent: MouseEvent, component?: JSComponent) => void;
    drag: (mouseEvent: MouseEvent, component?: JSComponent) => void;
    dragEnd: (mouseEvent: MouseEvent, component?: JSComponent) => void;
    dragEnter: (mouseEvent: MouseEvent, component?: JSComponent) => void;
    dragOver: (mouseEvent: MouseEvent, component?: JSComponent) => boolean;
    dragLeave: (mouseEvent: MouseEvent, component?: JSComponent) => void;
    drop: (mouseEvent: MouseEvent, component?: JSComponent) => boolean;
    
    constructor(dragSourceListener: DragSourceListener) {
        this.setDragSourceListener(dragSourceListener);
        var jsDragSourceListener: JSDragSourceListener = this;
        if (dragSourceListener.dragStart) {
            this.dragStart = function(mouseEvent: MouseEvent, component: JSComponent) {
                if (component === undefined) {
                    component = jsDragSourceListener.getComponent();
                }
                var dragSourceListener: DragSourceListener = jsDragSourceListener.getDragSourceListener();
                dragSourceListener.dragStart.call(dragSourceListener, mouseEvent, component);
            }
        }
        if (dragSourceListener.drag) {
            this.drag = function(mouseEvent: MouseEvent, component: JSComponent) {
                if (component === undefined) {
                    component = jsDragSourceListener.getComponent();
                }
                var dragSourceListener: DragSourceListener = jsDragSourceListener.getDragSourceListener();
                dragSourceListener.drag.call(dragSourceListener, mouseEvent, component);
            }
        }
        if (dragSourceListener.dragEnd) {
            this.dragEnd = function(mouseEvent: MouseEvent, component: JSComponent) {
                if (component === undefined) {
                    component = jsDragSourceListener.getComponent();
                }
                var dragSourceListener: DragSourceListener = jsDragSourceListener.getDragSourceListener();
                dragSourceListener.dragEnd.call(dragSourceListener, mouseEvent, component);
            }
        }
    }
    getDragSourceListener(): DragSourceListener {
        return this.dragSourceListener;
    }
    setDragSourceListener(dragSourceListener: DragSourceListener) {
        this.dragSourceListener = dragSourceListener;
    }
    getComponent(): JSComponent {
        return this.component;
    }
    setComponent(component: JSComponent) {
        this.component = component;
    }
}