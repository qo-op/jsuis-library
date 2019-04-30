/// <reference path = "../jsuis.ts"/>
/**
 * DropListener
 * 
 * @author Yassuo Toda
 */
interface DropListener {
    dragEnter?(dragEvent: DragEvent, component?: JSComponent): void;
    dragOver?(dragEvent: DragEvent, component?: JSComponent): boolean;
    dragLeave?(dragEvent: DragEvent, component?: JSComponent): void;
    drop?(dragEvent: DragEvent, component?: JSComponent): boolean;
}