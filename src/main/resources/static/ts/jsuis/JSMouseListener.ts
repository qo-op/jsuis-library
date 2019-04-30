/// <reference path = "../jsuis.ts"/>
/**
 * JSMouseListener
 * 
 * @author Yassuo Toda
 */
class JSMouseListener implements MouseListener {
    
    mouseListener: MouseListener;
    propagate: boolean;
    component: JSComponent;
    
    mouseClicked: (mouseEvent: MouseEvent, component?: JSComponent) => void;
    mousePressed: (mouseEvent: MouseEvent, component?: JSComponent) => void;
    mouseReleased: (mouseEvent: MouseEvent, component?: JSComponent) => void;
    mouseEntered: (mouseEvent: MouseEvent, component?: JSComponent) => void;
    mouseExited: (mouseEvent: MouseEvent, component?: JSComponent) => void;
    mouseMoved: (mouseEvent: MouseEvent, component?: JSComponent) => void;
    mouseDragged: (mouseEvent: MouseEvent, component?: JSComponent) => void;
    
    constructor(mouseListener: MouseListener);
    constructor(mouseListener: MouseListener, propagate: boolean);
    // overload
    constructor(...args: any[]) {
        var mouseListener: MouseListener = args[0];
        switch (args.length) {
        case 1:
            // constructor(mouseListener: MouseListener);
            this.setMouseListener(mouseListener);
            break;
        case 2:
            // constructor(mouseListener: MouseListener, propagate: boolean);
            if (typeof args[1] === "boolean") {
                var propagate: boolean = args[1];
                this.setMouseListener(mouseListener);
                this.setPropagate(propagate);
            }
            break;
        default:
        }
        var jsMouseListener: JSMouseListener = this;
        if (mouseListener.mouseClicked) {
            this.mouseClicked = function(mouseEvent: MouseEvent, component: JSComponent) {
                if (component === undefined) {
                    component = jsMouseListener.getComponent();
                }
                var mouseListener: MouseListener = jsMouseListener.getMouseListener();
                mouseListener.mouseClicked.call(mouseListener, mouseEvent, component);
                var propagate = jsMouseListener.getPropagate();
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
                var mouseListener: MouseListener = jsMouseListener.getMouseListener();
                mouseListener.mousePressed.call(mouseListener, mouseEvent, component);
                var propagate = jsMouseListener.getPropagate();
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
                var mouseListener: MouseListener = jsMouseListener.getMouseListener();
                mouseListener.mouseReleased.call(mouseListener, mouseEvent, component);
                var propagate = jsMouseListener.getPropagate();
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
                var mouseListener: MouseListener = jsMouseListener.getMouseListener();
                mouseListener.mouseEntered.call(mouseListener, mouseEvent, component);
                var propagate = jsMouseListener.getPropagate();
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
                var mouseListener: MouseListener = jsMouseListener.getMouseListener();
                mouseListener.mouseExited.call(mouseListener, mouseEvent, component);
                var propagate = jsMouseListener.getPropagate();
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
                var mouseListener: MouseListener = jsMouseListener.getMouseListener();
                mouseListener.mouseMoved.call(mouseListener, mouseEvent, component);
                var propagate = jsMouseListener.getPropagate();
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
                var mouseListener: MouseListener = jsMouseListener.getMouseListener();
                mouseListener.mouseDragged.call(mouseListener, mouseEvent, component);
                var propagate = jsMouseListener.getPropagate();
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