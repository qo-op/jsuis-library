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
            var parameters: any[] = jsMouseDraggedListener.getParameters().slice();
            parameters.unshift(mouseEvent);
            mouseDraggedListener.mouseDragged.apply(mouseDraggedListener, parameters);
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