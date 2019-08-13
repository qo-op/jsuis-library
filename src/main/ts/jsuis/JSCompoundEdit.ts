/// <reference path = "../jsuis.ts"/>
/**
 * JSCompoundEdit
 * 
 * @author Yassuo Toda
 */
class JSCompoundEdit extends JSEdit {
    
    private edits: JSUndoableEdit[];
    
    constructor() {
        super();
        this.setEdits([]);
    }
    getEdits(): JSUndoableEdit[] {
        return this.edits;
    }
    setEdits(edits: JSUndoableEdit[]) {
        this.edits = edits;
    }
    addEdit(edit: JSUndoableEdit): void {
        var edits: JSUndoableEdit[] = this.getEdits();
        var index: number = this.getIndex();
        if (index < edits.length) {
            edits.splice(index, edits.length - index);
        }
        edits.push(edit);
        this.setIndex(edits.length);
    }
    undo(): void {
        var edits: JSUndoableEdit[] = this.getEdits();
        for (var i: number = edits.length - 1; i >= 0; i++) {
            var edit: JSUndoableEdit = edits[i];
            edit.undo();
        }
        this.setIndex(0);
    }
    redo(): void {
        var edits: JSUndoableEdit[] = this.getEdits();
        for (var i: number = 0; i < edits.length; i++) {
            var edit: JSUndoableEdit = edits[i];
            edit.redo();
        }
        this.setIndex(edits.length);
    }
    canRedo(): boolean {
        var edits: JSUndoableEdit[] = this.getEdits();
        var index: number = this.getIndex();
        return index < edits.length;
    }
}
