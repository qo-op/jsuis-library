/// <reference path = "../jsuis.ts"/>
interface MouseListener {
    mouseClicked?(mouseEvent: MouseEvent): void;
    mousePressed?(mouseEvent: MouseEvent): void;
    mouseReleased?(mouseEvent: MouseEvent): void;
    mouseEntered?(mouseEvent: MouseEvent): void;
    mouseExited?(mouseEvent: MouseEvent): void;
    mouseMoved?(mouseEvent: MouseEvent): void;
    mouseDragged?(mouseEvent: MouseEvent): void;
}