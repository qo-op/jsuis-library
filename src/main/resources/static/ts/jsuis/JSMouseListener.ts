/// <reference path = "../jsuis.ts"/>
/**
 * JSMouseListener
 * 
 * @author Yassuo Toda
 */
class JSMouseListener implements MouseListener {
    
    mouseClicked: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    mousePressed: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    mouseReleased: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    mouseEntered: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    mouseExited: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    mouseMoved: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    mouseDragged: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    
    parameters: any[] = [];
    
    constructor(mouseListener: MouseListener) {
        var jsMouseListener: JSMouseListener = this;
        if (mouseListener.mouseClicked) {
            this.mouseClicked = function(mouseEvent: MouseEvent) {
                var args: any[] = jsMouseListener.getArgs().slice();
                args.unshift(mouseEvent);
                mouseListener.mouseClicked.apply(mouseListener, args);
            }
        }
        if (mouseListener.mousePressed) {
            this.mousePressed = function(mouseEvent: MouseEvent) {
                var args: any[] = jsMouseListener.getArgs().slice();
                args.unshift(mouseEvent);
                mouseListener.mousePressed.apply(mouseListener, args);
            }
        }
        if (mouseListener.mouseReleased) {
            this.mouseReleased = function(mouseEvent: MouseEvent) {
                var args: any[] = jsMouseListener.getArgs().slice();
                args.unshift(mouseEvent);
                mouseListener.mouseReleased.apply(mouseListener, args);
            }
        }
        if (mouseListener.mouseEntered) {
            this.mouseEntered = function(mouseEvent: MouseEvent) {
                var args: any[] = jsMouseListener.getArgs().slice();
                args.unshift(mouseEvent);
                mouseListener.mouseEntered.apply(mouseListener, args);
            }
        }
        if (mouseListener.mouseExited) {
            this.mouseExited = function(mouseEvent: MouseEvent) {
                var args: any[] = jsMouseListener.getArgs().slice();
                args.unshift(mouseEvent);
                mouseListener.mouseExited.apply(mouseListener, args);
            }
        }
        if (mouseListener.mouseMoved) {
            this.mouseMoved = function(mouseEvent: MouseEvent) {
                var args: any[] = jsMouseListener.getArgs().slice();
                args.unshift(mouseEvent);
                mouseListener.mouseMoved.apply(mouseListener, args);
            }
        }
        if (mouseListener.mouseDragged) {
            this.mouseDragged = function(mouseEvent: MouseEvent) {
                var args: any[] = jsMouseListener.getArgs().slice();
                args.unshift(mouseEvent);
                mouseListener.mouseDragged.apply(mouseListener, args);
            }
        }
    }
    getArgs(): any[] {
        return this.parameters;
    }
    setArgs(...parameters: any[]) {
        this.parameters = parameters;
    }
    withArgs(...parameters: any[]) {
        this.parameters = parameters;
        return this;
    }
}