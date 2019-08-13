/// <reference path = "../jsuis.ts"/>
/**
 * JSDropTargetListener
 * 
 * @author Yassuo Toda
 */
interface JSDropTargetListener {
    dragEnter?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    dragOver?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    dragLeave?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    drop?(mouseEvent: MouseEvent, ...parameters: any[]): void;
}