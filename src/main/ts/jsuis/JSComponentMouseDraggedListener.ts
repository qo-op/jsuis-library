/// <reference path = "../jsuis.ts"/>
/**
 * JSComponentMouseDraggedListener
 * 
 * @author Yassuo Toda
 */
class JSComponentMouseDraggedListener implements JSMouseDraggedListener {
    
    mouseDragged: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    
    parameters: any[] = [];
    
    constructor(mouseDraggedListener: JSMouseDraggedListener) {
        var componentMouseDraggedListener: JSComponentMouseDraggedListener = this;
        this.mouseDragged = function(mouseEvent: MouseEvent) {
            var parameters: any[] = componentMouseDraggedListener.getParameters().slice();
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