/// <reference path = "../jsuis.ts"/>
interface DropListener {
    dragEnter?(dragEvent: DragEvent): void;
    dragOver?(dragEvent: DragEvent): boolean;
    dragLeave?(dragEvent: DragEvent): void;
    drop?(dragEvent: DragEvent): boolean;
}