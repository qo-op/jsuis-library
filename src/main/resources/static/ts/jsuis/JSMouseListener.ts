/// <reference path = "../jsuis.ts"/>
class JSMouseListener implements MouseListener {
    
    mouseListener: MouseListener;
    
    mouseClicked: (mouseEvent: MouseEvent, component?: JSComponent) => void;
    mousePressed: (mouseEvent: MouseEvent, component?: JSComponent) => void;
    mouseReleased: (mouseEvent: MouseEvent, component?: JSComponent) => void;
    mouseEntered: (mouseEvent: MouseEvent, component?: JSComponent) => void;
    mouseExited: (mouseEvent: MouseEvent, component?: JSComponent) => void;
    mouseMoved: (mouseEvent: MouseEvent, component?: JSComponent) => void;
    mouseDragged: (mouseEvent: MouseEvent, component?: JSComponent) => void;

    component: JSComponent;
    
    constructor(mouseListener: MouseListener);
    constructor(mouseListener: MouseListener, propagate: boolean);
    // overload
    constructor(mouseListener: MouseListener, propagate?: boolean) {
        this.setMouseListener(mouseListener);
        var jsMouseListener: JSMouseListener = this;
        if (mouseListener.mouseClicked) {
            this.mouseClicked = function(mouseEvent: MouseEvent, component: JSComponent) {
                if (component === undefined) {
                    component = jsMouseListener.getComponent();
                }
                mouseListener.mouseClicked.call(mouseListener, mouseEvent, component);
                if (!propagate) {
                    mouseEvent.stopPropagation();
                }
            }
        }
        if (mouseListener.mousePressed) {
            this.mousePressed = function(mouseEvent: MouseEvent, component: JSComponent) {
                if (component === undefined) {
                    component = jsMouseListener.getComponent();
                }
                mouseListener.mousePressed.call(mouseListener, mouseEvent, component);
                if (!propagate) {
                    mouseEvent.stopPropagation();
                }
            }
        }
        if (mouseListener.mouseReleased) {
            this.mouseReleased = function(mouseEvent: MouseEvent, component: JSComponent) {
                if (component === undefined) {
                    component = jsMouseListener.getComponent();
                }
                mouseListener.mouseReleased.call(mouseListener, mouseEvent, component);
                if (!propagate) {
                    mouseEvent.stopPropagation();
                }
            }
        }
        if (mouseListener.mouseEntered) {
            this.mouseEntered = function(mouseEvent: MouseEvent, component: JSComponent) {
                if (component === undefined) {
                    component = jsMouseListener.getComponent();
                }
                mouseListener.mouseEntered.call(mouseListener, mouseEvent, component);
                if (!propagate) {
                    mouseEvent.stopPropagation();
                }
            }
        }
        if (mouseListener.mouseExited) {
            this.mouseExited = function(mouseEvent: MouseEvent, component: JSComponent) {
                if (component === undefined) {
                    component = jsMouseListener.getComponent();
                }
                mouseListener.mouseExited.call(mouseListener, mouseEvent, component);
                if (!propagate) {
                    mouseEvent.stopPropagation();
                }
            }
        }
        if (mouseListener.mouseMoved) {
            this.mouseMoved = function(mouseEvent: MouseEvent, component: JSComponent) {
                if (component === undefined) {
                    component = jsMouseListener.getComponent();
                }
                mouseListener.mouseMoved.call(mouseListener, mouseEvent, component);
                if (!propagate) {
                    mouseEvent.stopPropagation();
                }
            }
        }
        if (mouseListener.mouseDragged) {
            this.mouseDragged = function(mouseEvent: MouseEvent, component: JSComponent) {
                if (component === undefined) {
                    component = jsMouseListener.getComponent();
                }
                mouseListener.mouseDragged.call(mouseListener, mouseEvent, component);
                if (!propagate) {
                    mouseEvent.stopPropagation();
                }
            }
        }
    }
    getMouseListener(): MouseListener {
        return this.mouseListener;
    }
    setMouseListener(mouseListener: MouseListener) {
        this.mouseListener = mouseListener;
    }
    getComponent(): JSComponent {
        return this.component;
    }
    setComponent(component: JSComponent) {
        this.component = component;
    }
}