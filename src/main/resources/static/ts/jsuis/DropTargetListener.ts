/// <reference path = "../jsuis.ts"/>
/**
 * DropTargetListener
 * 
 * @author Yassuo Toda
 */
interface DropTargetListener {
    dragEnter?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    dragOver?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    dragLeave?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    drop?(mouseEvent: MouseEvent, ...parameters: any[]): void;
}