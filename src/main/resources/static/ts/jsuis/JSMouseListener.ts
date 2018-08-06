/// <reference path = "../jsuis.ts"/>
class JSMouseListener implements MouseListener {
    
    mouseClicked: (mouseEvent: MouseEvent) => void;
    mousePressed: (mouseEvent: MouseEvent) => void;
    mouseReleased: (mouseEvent: MouseEvent) => void;
    mouseEntered: (mouseEvent: MouseEvent) => void;
    mouseExited: (mouseEvent: MouseEvent) => void;
    mouseMoved: (mouseEvent: MouseEvent) => void;
    mouseDragged: (mouseEvent: MouseEvent) => void;
    
    constructor(mouseListener: MouseListener);
    constructor(mouseListener: MouseListener, redispatch: boolean);
    constructor(thisValue: any, mouseListener: MouseListener);
    constructor(thisValue: any, mouseListener: MouseListener, redispatch: boolean);
    // overload
    constructor(mouseListenerOrThisValue: any, redispatchOrMouseListener?: boolean | MouseListener, redispatch?: boolean) {
        if (redispatchOrMouseListener === undefined || typeof redispatchOrMouseListener === "boolean") {
            var mouseListener: MouseListener =  mouseListenerOrThisValue;
            redispatch = <boolean> redispatchOrMouseListener;
            if (mouseListener.mouseClicked) {
                this.mouseClicked = function(mouseEvent: MouseEvent) {
                    mouseListener.mouseClicked(mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                }
            }
            if (mouseListener.mousePressed) {
                this.mousePressed = function(mouseEvent: MouseEvent) {
                    mouseListener.mousePressed(mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                }
            }
            if (mouseListener.mouseReleased) {
                this.mouseReleased = function(mouseEvent: MouseEvent) {
                    mouseListener.mouseReleased(mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                }
            }
            if (mouseListener.mouseEntered) {
                this.mouseEntered = function(mouseEvent: MouseEvent) {
                    mouseListener.mouseEntered(mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                }
            }
            if (mouseListener.mouseExited) {
                this.mouseExited = function(mouseEvent: MouseEvent) {
                    mouseListener.mouseExited(mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                }
            }
            if (mouseListener.mouseMoved) {
                this.mouseMoved = function(mouseEvent: MouseEvent) {
                    mouseListener.mouseMoved(mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                }
            }
            if (mouseListener.mouseDragged) {
                this.mouseDragged = function(mouseEvent: MouseEvent) {
                    mouseListener.mouseDragged(mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                }
            }
        } else {
            var thisValue: any = mouseListenerOrThisValue;
            var mouseListener: MouseListener = redispatchOrMouseListener;
            if (mouseListener.mouseClicked) {
                this.mouseClicked = function(mouseEvent: MouseEvent) {
                    mouseListener.mouseClicked.call(thisValue, mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                }
            }
            if (mouseListener.mousePressed) {
                this.mousePressed = function(mouseEvent: MouseEvent) {
                    mouseListener.mousePressed.call(thisValue, mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                }
            }
            if (mouseListener.mouseReleased) {
                this.mouseReleased = function(mouseEvent: MouseEvent) {
                    mouseListener.mouseReleased.call(thisValue, mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                }
            }
            if (mouseListener.mouseEntered) {
                this.mouseEntered = function(mouseEvent: MouseEvent) {
                    mouseListener.mouseEntered.call(thisValue, mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                }
            }
            if (mouseListener.mouseExited) {
                this.mouseExited = function(mouseEvent: MouseEvent) {
                    mouseListener.mouseExited.call(thisValue, mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                }
            }
            if (mouseListener.mouseMoved) {
                this.mouseMoved = function(mouseEvent: MouseEvent) {
                    mouseListener.mouseMoved.call(thisValue, mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                }
            }
            if (mouseListener.mouseDragged) {
                this.mouseDragged = function(mouseEvent: MouseEvent) {
                    mouseListener.mouseDragged.call(thisValue, mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                }
            }
        }
    }
}