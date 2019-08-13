/// <reference path = "../jsuis.ts"/>
/**
 * JSComponentMouseListener
 * 
 * @author Yassuo Toda
 */
class JSComponentMouseListener implements JSMouseListener {
    
    mouseClicked: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    mousePressed: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    mouseReleased: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    mouseEntered: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    mouseExited: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    mouseMoved: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    mouseDragged: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    
    parameters: any[] = [];
    
    constructor(mouseListener: JSMouseListener) {
        var componentMouseListener: JSComponentMouseListener = this;
        if (mouseListener.mouseClicked) {
            this.mouseClicked = function(mouseEvent: MouseEvent) {
                var parameters: any[] = componentMouseListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                mouseListener.mouseClicked.apply(mouseListener, parameters);
            }
        }
        if (mouseListener.mousePressed) {
            this.mousePressed = function(mouseEvent: MouseEvent) {
                var parameters: any[] = componentMouseListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                mouseListener.mousePressed.apply(mouseListener, parameters);
            }
        }
        if (mouseListener.mouseReleased) {
            this.mouseReleased = function(mouseEvent: MouseEvent) {
                var parameters: any[] = componentMouseListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                mouseListener.mouseReleased.apply(mouseListener, parameters);
            }
        }
        if (mouseListener.mouseEntered) {
            this.mouseEntered = function(mouseEvent: MouseEvent) {
                var parameters: any[] = componentMouseListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                mouseListener.mouseEntered.apply(mouseListener, parameters);
            }
        }
        if (mouseListener.mouseExited) {
            this.mouseExited = function(mouseEvent: MouseEvent) {
                var parameters: any[] = componentMouseListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                mouseListener.mouseExited.apply(mouseListener, parameters);
            }
        }
        if (mouseListener.mouseMoved) {
            this.mouseMoved = function(mouseEvent: MouseEvent) {
                var parameters: any[] = componentMouseListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                mouseListener.mouseMoved.apply(mouseListener, parameters);
            }
        }
        if (mouseListener.mouseDragged) {
            this.mouseDragged = function(mouseEvent: MouseEvent) {
                var parameters: any[] = componentMouseListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                mouseListener.mouseDragged.apply(mouseListener, parameters);
            }
        }
    }
    getParameters(): any[] {
        return this.parameters;
    }
    setParameters(...parameters: any[]) {
        this.parameters = parameters;
    }
    withParameters(...parameters: any[]) {
        this.parameters = parameters;
        return this;
    }
}