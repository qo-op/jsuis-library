/**
 * jsuis.lf.UndoManager
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.lf.UndoManager = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
		this.setEdits([]);
		this.setIndex(0);
	});
	jsuis.Object.addProperties(jsuis.lf.UndoManager, {
		edits: null,
		index: 0
	});
	jsuis.lf.UndoManager.prototype.addEdit = function(edit) {
		var edits = this.getEdits();
		var index = this.getIndex();
		edits.splice(index);
		edits.push(edit);
		this.setIndex(edits.length);
	}
	jsuis.lf.UndoManager.prototype.editToBeUndone = function() {
		var edits = this.getEdits();
		var index = this.getIndex();
		if (index > 0) {
			return edits[index - 1];
		}
		return null;
	}
	jsuis.lf.UndoManager.prototype.editToBeRedone = function() {
		var edits = this.getEdits();
		var index = this.getIndex();
		if (index < edits.length) {
			return edits[index];
		}
		return null;
	}
	jsuis.lf.UndoManager.prototype.undo = function() {
		var edit = this.editToBeUndone();
		if (edit) {
			edit.undo();
			this.setIndex(this.getIndex() - 1);
		}
	}
	jsuis.lf.UndoManager.prototype.redo = function() {
		var edit = this.editToBeRedone();
		if (edit) {
			edit.redo();
			this.setIndex(this.getIndex() + 1);
		}
	}
	jsuis.lf.UndoManager.prototype.canUndo = function() {
		var edit = this.editToBeUndone();
		return edit !== null;
	}
	jsuis.lf.UndoManager.prototype.canRedo = function() {
		var edit = this.editToBeRedone();
		return edit !== null;
	}
})(jsuis);
