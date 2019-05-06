/// <reference path = "../jsuis.ts"/>
/**
 * JSDropTargetListener
 * 
 * @author Yassuo Toda
 */
class JSDropTargetListener implements DropTargetListener {
    
    dragEnter: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    dragOver: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    dragLeave: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    drop: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    
    parameters: any[] = [];
    
    constructor(dropTargetListener: DropTargetListener) {
        var jsDropTargetListener: JSDropTargetListener = this;
        if (dropTargetListener.dragEnter) {
            this.dragEnter = function(mouseEvent: MouseEvent) {
                var args: any[] = jsDropTargetListener.getArgs().slice();
                args.unshift(mouseEvent);
                dropTargetListener.dragEnter.apply(dropTargetListener, args);
            }
        }
        if (dropTargetListener.dragOver) {
            this.dragOver = function(mouseEvent: MouseEvent) {
                var args: any[] = jsDropTargetListener.getArgs().slice();
                args.unshift(mouseEvent);
                dropTargetListener.dragOver.apply(dropTargetListener, args);
            }
        }
        if (dropTargetListener.dragLeave) {
            this.dragLeave = function(mouseEvent: MouseEvent) {
                var args: any[] = jsDropTargetListener.getArgs().slice();
                args.unshift(mouseEvent);
                dropTargetListener.dragLeave.apply(dropTargetListener, args);
            }
        }
        if (dropTargetListener.drop) {
            this.drop = function(mouseEvent: MouseEvent) {
                var args: any[] = jsDropTargetListener.getArgs().slice();
                args.unshift(mouseEvent);
                dropTargetListener.drop.apply(dropTargetListener, args);
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