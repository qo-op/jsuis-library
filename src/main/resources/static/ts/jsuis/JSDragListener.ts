/// <reference path = "../jsuis.ts"/>
/**
 * JSDragListener
 * 
 * @author Yassuo Toda
 */
class JSDragListener implements DragListener {
    
    dragListener: DragListener;
    propagate: boolean;
    component: JSComponent;
    
    dragStart: (dragEvent: DragEvent, component?: JSComponent) => void;
    drag: (dragEvent: DragEvent, component?: JSComponent) => void;
    dragEnd: (dragEvent: DragEvent, component?: JSComponent) => void;
    
    constructor(dragListener: DragListener);
    constructor(dragListener: DragListener, propagate: boolean);
    // overload
    constructor(...args: any[]) {
        var dragListener: DragListener = args[0];
        switch (args.length) {
        case 1:
            // constructor(dragListener: DragListener);
            this.setDragListener(dragListener);
            break;
        case 2:
            // constructor(dragListener: DragListener, propagate: boolean);
            if (typeof args[1] === "boolean") {
                var propagate: boolean = args[1];
                this.setDragListener(dragListener);
                this.setPropagate(propagate);
            }
            break;
        default:
        }
        var jsDragListener: JSDragListener = this;
        if (dragListener.dragStart) {
            this.dragStart = function(dragEvent: DragEvent, component: JSComponent) {
                if (component === undefined) {
                    component = jsDragListener.getComponent();
                }
                var dragListener: DragListener = jsDragListener.getDragListener();
                dragListener.dragStart.call(dragListener, dragEvent, component);
                var propagate = jsDragListener.getPropagate();
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
                var dragListener: DragListener = jsDragListener.getDragListener();
                dragListener.drag.call(dragListener, dragEvent, component);
                var propagate = jsDragListener.getPropagate();
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
                var dragListener: DragListener = jsDragListener.getDragListener();
                dragListener.dragEnd.call(dragListener, dragEvent, component);
                var propagate = jsDragListener.getPropagate();
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