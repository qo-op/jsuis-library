/// <reference path = "../jsuis.ts"/>
class JSDropListener implements DropListener {
    
    dragEnter: (dragEvent: DragEvent) => void;
    dragOver: (dragEvent: DragEvent) => boolean;
    dragLeave: (dragEvent: DragEvent) => void;
    drop: (dragEvent: DragEvent) => boolean;
    
    constructor(dropListener: DropListener);
    constructor(dropListener: DropListener, redispatch: boolean);
    constructor(thisValue: any,             dropListener: DropListener);
    constructor(thisValue: any,             dropListener: DropListener, redispatch: boolean);
    // overload
    constructor(dropListenerOrThisValue: any, redispatchOrDropListener?: boolean | DropListener, redispatch?: boolean) {
        if (redispatchOrDropListener === undefined || typeof redispatchOrDropListener === "boolean") {
            var dropListener: DropListener = dropListenerOrThisValue;
            redispatch = <boolean> redispatchOrDropListener;
            if (dropListener.dragEnter) {
                this.dragEnter = function(dragEvent: DragEvent) {
                    dropListener.dragEnter(dragEvent);
                    if (!redispatch) {
                        dragEvent.stopPropagation();
                    }
                }
            }
            if (dropListener.dragOver) {
                this.dragOver = function(dragEvent: DragEvent) {
                    var preventDefault = dropListener.dragOver(dragEvent);
                    if (preventDefault) {
                        dragEvent.preventDefault();
                    }
                    if (!redispatch) {
                        dragEvent.stopPropagation();
                    }
                    return preventDefault;
                }
            }
            if (dropListener.dragLeave) {
                this.dragLeave = function(dragEvent: DragEvent) {
                    dropListener.dragLeave(dragEvent);
                    if (!redispatch) {
                        dragEvent.stopPropagation();
                    }
                }
            }
            if (dropListener.drop) {
                this.drop = function(dragEvent: DragEvent) {
                    var preventDefault = dropListener.drop(dragEvent);
                    if (preventDefault) {
                        dragEvent.preventDefault();
                    }
                    if (!redispatch) {
                        dragEvent.stopPropagation();
                    }
                    return preventDefault;
                }
            }
        } else {
            var thisValue = dropListenerOrThisValue;
            var dropListener: DropListener = redispatchOrDropListener;
            if (dropListener.dragEnter) {
                this.dragEnter = function(dragEvent: DragEvent) {
                    dropListener.dragEnter.call(thisValue, dragEvent);
                    if (!redispatch) {
                        dragEvent.stopPropagation();
                    }
                }
            }
            if (dropListener.dragOver) {
                this.dragOver = function(dragEvent: DragEvent) {
                    var preventDefault = dropListener.dragOver.call(thisValue, dragEvent);
                    if (preventDefault) {
                        dragEvent.preventDefault();
                    }
                    if (!redispatch) {
                        dragEvent.stopPropagation();
                    }
                    return preventDefault;
                }
            }
            if (dropListener.dragLeave) {
                this.dragLeave = function(dragEvent: DragEvent) {
                    dropListener.dragLeave.call(thisValue, dragEvent);
                    if (!redispatch) {
                        dragEvent.stopPropagation();
                    }
                }
            }
            if (dropListener.drop) {
                this.drop = function(dragEvent: DragEvent) {
                    var preventDefault = dropListener.drop.call(thisValue, dragEvent);
                    if (preventDefault) {
                        dragEvent.preventDefault();
                    }
                    if (!redispatch) {
                        dragEvent.stopPropagation();
                    }
                    return preventDefault;
                }
            }
        }
    }
}