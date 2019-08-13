/// <reference path = "../jsuis.ts"/>
/**
 * JSCompoundEdit
 * 
 * @author Yassuo Toda
 */
class JSEdit implements JSUndoableEdit {
    
    private index: number;
    
    constructor() {
        this.setIndex(0);
    }
    getIndex(): number {
        return this.index;
    }
    setIndex(index: number) {
        this.index = index;
    }
    undo(): void {
        this.setIndex(0);
    }
    redo(): void {
        this.setIndex(1);
    }
    canUndo(): boolean {
        var index: number = this.getIndex();
        return index > 0;
    }
    canRedo(): boolean {
        var index: number = this.getIndex();
        return index < 1;
    }
    getPresentationName(): string {
        return "";
    }
}
