/// <reference path = "../jsuis.ts"/>
/**
 * DragListener
 * 
 * @author Yassuo Toda
 */
interface DragListener {
    dragStart?(dragEvent: DragEvent, component?: JSComponent): void;
    drag?(dragEvent: DragEvent, component?: JSComponent): void;
    dragEnd?(dragEvent: DragEvent, component?: JSComponent): void;
}