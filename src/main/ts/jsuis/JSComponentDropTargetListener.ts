/// <reference path = "../jsuis.ts"/>
/**
 * JSComponentDropTargetListener
 * 
 * @author Yassuo Toda
 */
class JSComponentDropTargetListener implements JSDropTargetListener {
    
    dragEnter: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    dragOver: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    dragLeave: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    drop: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    
    parameters: any[] = [];
    
    constructor(dropTargetListener: JSDropTargetListener) {
        var componentDropTargetListener: JSComponentDropTargetListener = this;
        if (dropTargetListener.dragEnter) {
            this.dragEnter = function(mouseEvent: MouseEvent) {
                var parameters: any[] = componentDropTargetListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                dropTargetListener.dragEnter.apply(dropTargetListener, parameters);
            }
        }
        if (dropTargetListener.dragOver) {
            this.dragOver = function(mouseEvent: MouseEvent) {
                var parameters: any[] = componentDropTargetListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                dropTargetListener.dragOver.apply(dropTargetListener, parameters);
            }
        }
        if (dropTargetListener.dragLeave) {
            this.dragLeave = function(mouseEvent: MouseEvent) {
                var parameters: any[] = componentDropTargetListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                dropTargetListener.dragLeave.apply(dropTargetListener, parameters);
            }
        }
        if (dropTargetListener.drop) {
            this.drop = function(mouseEvent: MouseEvent) {
                var parameters: any[] = componentDropTargetListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                dropTargetListener.drop.apply(dropTargetListener, parameters);
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