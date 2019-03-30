/// <reference path = "../jsuis.ts"/>
class JSDragListener implements DragListener {
    
    dragListener: DragListener;
    
    dragStart: (dragEvent: DragEvent, component?: JSComponent) => void;
    drag: (dragEvent: DragEvent, component?: JSComponent) => void;
    dragEnd: (dragEvent: DragEvent, component?: JSComponent) => void;
    
    component: JSComponent;
    
    constructor(dragListener: DragListener);
    constructor(dragListener: DragListener, propagate: boolean);
    // overload
    constructor(dragListener: DragListener, propagate?: boolean) {
        this.setDragListener(dragListener);
        var jsDragListener: JSDragListener = this;
        if (dragListener.dragStart) {
            this.dragStart = function(dragEvent: DragEvent, component: JSComponent) {
                if (component === undefined) {
                    component = jsDragListener.getComponent();
                }
                dragListener.dragStart.call(dragListener, dragEvent, component);
                if (!propagate) {
                    dragEvent.stopPropagation();
                }
            }
        }
        if (dragListener.drag) {
            this.drag = function(dragEvent: DragEvent, component: JSComponent) {
                if (component === undefined) {
                    component = jsDragListener.getComponent();
                }
                dragListener.drag.call(dragListener, dragEvent, component);
                if (!propagate) {
                    dragEvent.stopPropagation();
                }
            }
        }
        if (dragListener.dragEnd) {
            this.dragEnd = function(dragEvent: DragEvent, component: JSComponent) {
                if (component === undefined) {
                    component = jsDragListener.getComponent();
                }
                dragListener.dragEnd.call(dragListener, dragEvent, component);
                if (!propagate) {
                    dragEvent.stopPropagation();
                }
            }
        }
    }
    getDragListener(): DragListener {
        return this.dragListener;
    }
    setDragListener(dragListener: DragListener) {
        this.dragListener = dragListener;
    }
    getComponent(): JSComponent {
        return this.component;
    }
    setComponent(component: JSComponent) {
        this.component = component;
    }
}