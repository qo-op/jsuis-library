/// <reference path = "../jsuis.ts"/>
/**
 * DragSourceListener
 * 
 * @author Yassuo Toda
 */
interface DragSourceListener {
    dragStart?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    drag?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    dragEnd?(mouseEvent: MouseEvent, ...parameters: any[]): void;
}