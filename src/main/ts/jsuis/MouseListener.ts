/// <reference path = "../jsuis.ts"/>
/**
 * MouseListener
 * 
 * @author Yassuo Toda
 */
interface MouseListener {
    mouseClicked?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    mousePressed?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    mouseReleased?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    mouseEntered?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    mouseExited?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    mouseMoved?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    mouseDragged?(mouseEvent: MouseEvent, ...parameters: any[]): void;
}