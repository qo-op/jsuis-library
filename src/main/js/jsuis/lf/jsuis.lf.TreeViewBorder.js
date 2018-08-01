/**
 * jsuis.lf.TreeViewBorder
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Border;
	jsuis.lf.TreeViewBorder = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.Object.addProperties(jsuis.lf.TreeViewBorder, {
	});
	jsuis.lf.TreeViewBorder.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets();
	}
	jsuis.lf.TreeViewBorder.prototype.paintBorder = function(component) {
		var tree = component.getTree();
		var treeBorder = tree.getBorder();
		treeBorder.paintBorder(tree);
	}
}) (jsuis);
