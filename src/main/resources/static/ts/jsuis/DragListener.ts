/// <reference path = "../jsuis.ts"/>
interface DragListener {
    dragStart?(dragEvent: DragEvent): void;
    drag?(dragEvent: DragEvent): void;
    dragEnd?(dragEvent: DragEvent): void;
}