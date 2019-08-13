/// <reference path = "../jsuis.ts"/>
/**
 * JSMouseListener
 * 
 * @author Yassuo Toda
 */
interface JSMouseListener {
    mouseClicked?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    mousePressed?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    mouseReleased?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    mouseEntered?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    mouseExited?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    mouseMoved?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    mouseDragged?(mouseEvent: MouseEvent, ...parameters: any[]): void;
}