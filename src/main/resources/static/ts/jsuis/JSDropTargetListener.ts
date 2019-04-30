/// <reference path = "../jsuis.ts"/>
/**
 * JSDropTargetListener
 * 
 * @author Yassuo Toda
 */
class JSDropTargetListener implements DropTargetListener {
    
    dropTargetListener: DropTargetListener;
    propagate: boolean;
    component: JSComponent;
    
    dragEnter: (mouseEvent: MouseEvent, component?: JSComponent) => void;
    dragOver: (mouseEvent: MouseEvent, component?: JSComponent) => boolean;
    dragLeave: (mouseEvent: MouseEvent, component?: JSComponent) => void;
    drop: (mouseEvent: MouseEvent, component?: JSComponent) => boolean;
    
    constructor(dropTargetListener: DropTargetListener) {
        this.setDropTargetListener(dropTargetListener);
        var jsDropTargetListener: JSDropTargetListener = this;
        if (dropTargetListener.dragEnter) {
            this.dragEnter = function(dragEvent: DragEvent, component: JSComponent) {
                if (component === undefined) {
                    component = jsDropTargetListener.getComponent();
                }
                var dropTargetListener: DropTargetListener = jsDropTargetListener.getDropTargetListener();
                dropTargetListener.dragEnter.call(dropTargetListener, dragEvent, component);
            }
        }
        if (dropTargetListener.dragOver) {
            this.dragOver = function(dragEvent: DragEvent, component: JSComponent) {
                if (component === undefined) {
                    component = jsDropTargetListener.getComponent();
                }
                var dropTargetListener: DropTargetListener = jsDropTargetListener.getDropTargetListener();
                var preventDefault = dropTargetListener.dragOver.call(dropTargetListener, dragEvent, component);
                if (preventDefault) {
                    dragEvent.preventDefault();
                }
                return preventDefault;
            }
        }
        if (dropTargetListener.dragLeave) {
            this.dragLeave = function(dragEvent: DragEvent, component: JSComponent) {
                if (component === undefined) {
                    component = jsDropTargetListener.getComponent();
                }
                var dropTargetListener: DropTargetListener = jsDropTargetListener.getDropTargetListener();
                dropTargetListener.dragLeave.call(dropTargetListener, dragEvent, component);
            }
        }
        if (dropTargetListener.drop) {
            this.drop = function(dragEvent: DragEvent, component: JSComponent) {
                if (component === undefined) {
                    component = jsDropTargetListener.getComponent();
                }
                var dropTargetListener: DropTargetListener = jsDropTargetListener.getDropTargetListener();
                var preventDefault = dropTargetListener.drop.call(dropTargetListener, dragEvent, component);
                if (preventDefault) {
                    dragEvent.preventDefault();
                }
                return preventDefault;
            }
        }
    }
    getDropTargetListener(): DropTargetListener {
        return this.dropTargetListener;
    }
    setDropTargetListener(dropTargetListener: DropTargetListener) {
        this.dropTargetListener = dropTargetListener;
    }
    getComponent(): JSComponent {
        return this.component;
    }
    setComponent(component: JSComponent) {
        this.component = component;
    }
}