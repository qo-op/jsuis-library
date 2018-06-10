/**
 * jsuis.lf.UndoableEdit
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.lf.UndoableEdit = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.lf.UndoableEdit.prototype.undo = function() {
	}
	jsuis.lf.UndoableEdit.prototype.redo = function() {
	}
})(jsuis);
