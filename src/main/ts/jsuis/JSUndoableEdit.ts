/// <reference path = "../jsuis.ts"/>
/**
 * JSUndoableEdit
 * 
 * @author Yassuo Toda
 */
interface JSUndoableEdit {
    undo(): void;
    redo(): void;
    canUndo(): boolean;
    canRedo(): boolean;
    getPresentationName(): string;
}
