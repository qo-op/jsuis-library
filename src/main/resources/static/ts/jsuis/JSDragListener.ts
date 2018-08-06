/// <reference path = "../jsuis.ts"/>
class JSDragListener implements DragListener {
    
    dragStart: (dragEvent: DragEvent) => void;
    drag: (dragEvent: DragEvent) => void;
    dragEnd: (dragEvent: DragEvent) => void;
    
    constructor(dragListener: DragListener);
    constructor(dragListener: DragListener, redispatch: boolean);
    constructor(thisValue: any, dragListener: DragListener);
    constructor(thisValue: any, dragListener: DragListener, redispatch: boolean);
    // overload
    constructor(dragListenerOrThisValue: any, redispatchOrDragListener?: boolean | DragListener, redispatch?: boolean) {
        if (redispatchOrDragListener === undefined || typeof redispatchOrDragListener === "boolean") {
            var dragListener: DragListener = dragListenerOrThisValue;
            redispatch = <boolean> redispatchOrDragListener;
            if (dragListener.dragStart) {
                this.dragStart = function(dragEvent: DragEvent) {
                    dragListener.dragStart(dragEvent);
                    if (!redispatch) {
                        event.stopPropagation();
                    }
                }
            }
            if (dragListener.drag) {
                this.drag = function(dragEvent: DragEvent) {
                    dragListener.drag(dragEvent);
                    if (!redispatch) {
                        event.stopPropagation();
                    }
                }
            }
            if (dragListener.dragEnd) {
                this.dragEnd = function(dragEvent: DragEvent) {
                    dragListener.dragEnd(dragEvent);
                    if (!redispatch) {
                        event.stopPropagation();
                    }
                }
            }
        } else {
            var thisValue = dragListenerOrThisValue;
            var dragListener: DragListener = redispatchOrDragListener;
            if (dragListener.dragStart) {
                this.dragStart = function(dragEvent: DragEvent) {
                    dragListener.dragStart.call(thisValue, dragEvent);
                    if (!redispatch) {
                        event.stopPropagation();
                    }
                }
            }
            if (dragListener.drag) {
                this.drag = function(dragEvent: DragEvent) {
                    dragListener.drag.call(thisValue, dragEvent);
                    if (!redispatch) {
                        event.stopPropagation();
                    }
                }
            }
            if (dragListener.dragEnd) {
                this.dragEnd = function(dragEvent: DragEvent) {
                    dragListener.dragEnd.call(thisValue, dragEvent);
                    if (!redispatch) {
                        event.stopPropagation();
                    }
                }
            }
        }
    }
}