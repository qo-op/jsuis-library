/// <reference path = "../jsuis.ts"/>
/**
 * MouseListener
 * 
 * @author Yassuo Toda
 */
interface MouseListener {
    mouseClicked?(mouseEvent: MouseEvent, component?: JSComponent): void;
    mousePressed?(mouseEvent: MouseEvent, component?: JSComponent): void;
    mouseReleased?(mouseEvent: MouseEvent, component?: JSComponent): void;
    mouseEntered?(mouseEvent: MouseEvent, component?: JSComponent): void;
    mouseExited?(mouseEvent: MouseEvent, component?: JSComponent): void;
    mouseMoved?(mouseEvent: MouseEvent, component?: JSComponent): void;
    mouseDragged?(mouseEvent: MouseEvent, component?: JSComponent): void;
}