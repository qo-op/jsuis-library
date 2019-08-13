/// <reference path = "../jsuis.ts"/>
/**
 * JSComponentDragSourceListener
 * 
 * @author Yassuo Toda
 */
class JSComponentDragSourceListener implements JSDragSourceListener {
    
    dragStart: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    drag: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    dragEnd: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    
    parameters: any[] = [];
    
    constructor(dragSourceListener: JSDragSourceListener) {
        var componentDragSourceListener: JSComponentDragSourceListener = this;
        if (dragSourceListener.dragStart) {
            this.dragStart = function(mouseEvent: MouseEvent) {
                var parameters: any[] = componentDragSourceListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                dragSourceListener.dragStart.apply(dragSourceListener, parameters);
            }
        }
        if (dragSourceListener.drag) {
            this.drag = function(mouseEvent: MouseEvent) {
                var parameters: any[] = componentDragSourceListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                dragSourceListener.drag.apply(dragSourceListener, parameters);
            }
        }
        if (dragSourceListener.dragEnd) {
            this.dragEnd = function(mouseEvent: MouseEvent) {
                var parameters: any[] = componentDragSourceListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                dragSourceListener.dragEnd.apply(dragSourceListener, parameters);
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