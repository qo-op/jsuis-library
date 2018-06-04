/**
 * jsuis.UndoManager
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.UndoManager = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].UndoManager());
	});
	jsuis.UndoManager.prototype.addEdit = function(edit) {
		var peer = this.getPeer();
		peer.addEdit(edit);
	}
	jsuis.UndoManager.prototype.undo = function() {
		var peer = this.getPeer();
		peer.undo();
	}
	jsuis.UndoManager.prototype.redo = function() {
		var peer = this.getPeer();
		peer.redo();
	}
	jsuis.UndoManager.prototype.canUndo = function() {
		var peer = this.getPeer();
		peer.canUndo();
	}
	jsuis.UndoManager.prototype.canRedo = function() {
		var peer = this.getPeer();
		peer.canRedo();
	}
})(jsuis);
