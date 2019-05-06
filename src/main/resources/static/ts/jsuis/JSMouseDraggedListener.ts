/// <reference path = "../jsuis.ts"/>
/**
 * JSMouseDraggedListener
 * 
 * @author Yassuo Toda
 */
class JSMouseDraggedListener implements MouseDraggedListener {
    
    mouseDragged: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    
    parameters: any[] = [];
    
    constructor(mouseDraggedListener: MouseDraggedListener) {
        var jsMouseDraggedListener: JSMouseDraggedListener = this;
        this.mouseDragged = function(mouseEvent: MouseEvent) {
            var args: any[] = jsMouseDraggedListener.getArgs().slice();
            args.unshift(mouseEvent);
            mouseDraggedListener.mouseDragged.apply(mouseDraggedListener, args);
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