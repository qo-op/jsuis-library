/// <reference path = "../jsuis.ts"/>
/**
 * DropTargetListener
 * 
 * @author Yassuo Toda
 */
interface DropTargetListener {
    dragEnter?(mouseEvent: MouseEvent, component?: JSComponent): void;
    dragOver?(mouseEvent: MouseEvent, component?: JSComponent): boolean;
    dragLeave?(mouseEvent: MouseEvent, component?: JSComponent): void;
    drop?(mouseEvent: MouseEvent, component?: JSComponent): boolean;
}