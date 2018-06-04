/**
 * jsuis.UndoableEdit
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.UndoableEdit = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].UndoableEdit());
	});
	jsuis.UndoableEdit.prototype.undo = function() {
		var peer = this.getPeer();
		peer.undo();
	}
	jsuis.UndoableEdit.prototype.redo = function() {
		var peer = this.getPeer();
		peer.redo();
	}
})(jsuis);
