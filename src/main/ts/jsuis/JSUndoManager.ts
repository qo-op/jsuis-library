/// <reference path = "../jsuis.ts"/>
/**
 * JSUndoManager
 * 
 * @author Yassuo Toda
 */
class JSUndoManager extends JSCompoundEdit {
    
    undo(): void {
        var edits: JSUndoableEdit[] = this.getEdits();
        var index: number = this.getIndex();
        if (index > 0) {
            var edit: JSUndoableEdit = edits[index - 1];
            edit.undo();
            this.setIndex(index - 1);
        }
    }
    redo(): void {
        var edits: JSUndoableEdit[] = this.getEdits();
        var index: number = this.getIndex();
        if (index < edits.length) {
            var edit: JSUndoableEdit = edits[index];
            edit.redo();
            this.setIndex(index + 1);
        }
    }
}
