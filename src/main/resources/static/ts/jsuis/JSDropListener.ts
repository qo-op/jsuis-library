/// <reference path = "../jsuis.ts"/>
class JSDropListener implements DropListener {
    
    dropListener: DropListener;
    
    dragEnter: (dragEvent: DragEvent, component?: JSComponent) => void;
    dragOver: (dragEvent: DragEvent, component?: JSComponent) => boolean;
    dragLeave: (dragEvent: DragEvent, component?: JSComponent) => void;
    drop: (dragEvent: DragEvent, component?: JSComponent) => boolean;
    
    component: JSComponent;
    
    constructor(dropListener: DropListener);
    constructor(dropListener: DropListener, propagate: boolean);
    // overload
    constructor(dropListener: DropListener, propagate?: boolean) {
        this.setDropListener(dropListener);
        var jsDropListener: JSDropListener = this;
        if (dropListener.dragEnter) {
            this.dragEnter = function(dragEvent: DragEvent, component: JSComponent) {
                if (component === undefined) {
                    component = jsDropListener.getComponent();
                }
                dropListener.dragEnter.call(dropListener, dragEvent, component);
                if (!propagate) {
                    dragEvent.stopPropagation();
                }
            }
        }
        if (dropListener.dragOver) {
            this.dragOver = function(dragEvent: DragEvent, component: JSComponent) {
                if (component === undefined) {
                    component = jsDropListener.getComponent();
                }
                var preventDefault = dropListener.dragOver.call(dropListener, dragEvent, component);
                if (preventDefault) {
                    dragEvent.preventDefault();
                }
                if (!propagate) {
                    dragEvent.stopPropagation();
                }
                return preventDefault;
            }
        }
        if (dropListener.dragLeave) {
            this.dragLeave = function(dragEvent: DragEvent, component: JSComponent) {
                if (component === undefined) {
                    component = jsDropListener.getComponent();
                }
                dropListener.dragLeave.call(dropListener, dragEvent, component);
                if (!propagate) {
                    dragEvent.stopPropagation();
                }
            }
        }
        if (dropListener.drop) {
            this.drop = function(dragEvent: DragEvent, component: JSComponent) {
                if (component === undefined) {
                    component = jsDropListener.getComponent();
                }
                var preventDefault = dropListener.drop.call(dropListener, dragEvent, component);
                if (preventDefault) {
                    dragEvent.preventDefault();
                }
                if (!propagate) {
                    dragEvent.stopPropagation();
                }
                return preventDefault;
            }
        }
    }
    getDropListener(): DropListener {
        return this.dropListener;
    }
    setDropListener(dropListener: DropListener) {
        this.dropListener = dropListener;
    }
    getComponent(): JSComponent {
        return this.component;
    }
    setComponent(component: JSComponent) {
        this.component = component;
    }
}