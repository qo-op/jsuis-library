/// <reference path = "../jsuis.ts"/>
/**
 * JSDragSourceListener
 * 
 * @author Yassuo Toda
 */
class JSDragSourceListener implements DragSourceListener {
    
    dragStart: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    drag: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    dragEnd: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    
    parameters: any[] = [];
    
    constructor(dragSourceListener: DragSourceListener) {
        var jsDragSourceListener: JSDragSourceListener = this;
        if (dragSourceListener.dragStart) {
            this.dragStart = function(mouseEvent: MouseEvent) {
                var args: any[] = jsDragSourceListener.getArgs().slice();
                args.unshift(mouseEvent);
                dragSourceListener.dragStart.apply(dragSourceListener, args);
            }
        }
        if (dragSourceListener.drag) {
            this.drag = function(mouseEvent: MouseEvent) {
                var args: any[] = jsDragSourceListener.getArgs().slice();
                args.unshift(mouseEvent);
                dragSourceListener.drag.apply(dragSourceListener, args);
            }
        }
        if (dragSourceListener.dragEnd) {
            this.dragEnd = function(mouseEvent: MouseEvent) {
                var args: any[] = jsDragSourceListener.getArgs().slice();
                args.unshift(mouseEvent);
                dragSourceListener.dragEnd.apply(dragSourceListener, args);
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