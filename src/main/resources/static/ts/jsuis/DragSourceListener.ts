/// <reference path = "../jsuis.ts"/>
/**
 * DragSourceListener
 * 
 * @author Yassuo Toda
 */
interface DragSourceListener {
    dragStart?(mouseEvent: MouseEvent, component?: JSComponent): void;
    drag?(mouseEvent: MouseEvent, component?: JSComponent): void;
    dragEnd?(mouseEvent: MouseEvent, component?: JSComponent): void;
}