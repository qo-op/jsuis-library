/// <reference path = "../jsuis.ts"/>
/**
 * JSDropListener
 * 
 * @author Yassuo Toda
 */
class JSDropListener implements DropListener {
    
    dropListener: DropListener;
    propagate: boolean;
    component: JSComponent;
    
    dragEnter: (dragEvent: DragEvent, component?: JSComponent) => void;
    dragOver: (dragEvent: DragEvent, component?: JSComponent) => boolean;
    dragLeave: (dragEvent: DragEvent, component?: JSComponent) => void;
    drop: (dragEvent: DragEvent, component?: JSComponent) => boolean;
    
    constructor(dropListener: DropListener);
    constructor(dropListener: DropListener, propagate: boolean);
    // overload
    constructor(...args: any[]) {
        var dropListener: DropListener = args[0];
        switch (args.length) {
        case 1:
            // constructor(dropListener: DropListener);
            this.setDropListener(dropListener);
            break;
        case 2:
            // constructor(dropListener: DropListener, propagate: boolean);
            if (typeof args[1] === "boolean") {
                var propagate: boolean = args[1];
                this.setDropListener(dropListener);
                this.setPropagate(propagate);
            }
            break;
        default:
        }
        var jsDropListener: JSDropListener = this;
        if (dropListener.dragEnter) {
            this.dragEnter = function(dragEvent: DragEvent, component: JSComponent) {
                if (component === undefined) {
                    component = jsDropListener.getComponent();
                }
                var dropListener: DropListener = jsDropListener.getDropListener();
                dropListener.dragEnter.call(dropListener, dragEvent, component);
                var propagate = jsDropListener.getPropagate();
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
                var dropListener: DropListener = jsDropListener.getDropListener();
                var preventDefault = dropListener.dragOver.call(dropListener, dragEvent, component);
                if (preventDefault) {
                    dragEvent.preventDefault();
                }
                var propagate = jsDropListener.getPropagate();
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
                var dropListener: DropListener = jsDropListener.getDropListener();
                dropListener.dragLeave.call(dropListener, dragEvent, component);
                var propagate = jsDropListener.getPropagate();
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
                var dropListener: DropListener = jsDropListener.getDropListener();
                var preventDefault = dropListener.drop.call(dropListener, dragEvent, component);
                if (preventDefault) {
                    dragEvent.preventDefault();
                }
                var propagate = jsDropListener.getPropagate();
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