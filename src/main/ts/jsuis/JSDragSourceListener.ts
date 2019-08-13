/// <reference path = "../jsuis.ts"/>
/**
 * JSDragSourceListener
 * 
 * @author Yassuo Toda
 */
interface JSDragSourceListener {
    dragStart?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    drag?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    dragEnd?(mouseEvent: MouseEvent, ...parameters: any[]): void;
}