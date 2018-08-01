/**
 * jsuis.lf.TreeView
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Svg;
	jsuis.lf.TreeView = jsuis.Object.extend(SUPER, function(tree) {
		SUPER.prototype.constructor.call(this, null);
		this.setTree(tree);
		this.setBorder(new jsuis.lf.TreeViewBorder());
		this.setX(0);
		this.setY(0);
	});
	jsuis.Object.addProperties(jsuis.lf.TreeView, {
		tree: null
	});
	jsuis.lf.TreeView.prototype.getPreferredSize = function() {
		var tree = this.getTree();
		var rowHeight = tree.getRowHeight();
		var rowCount = tree.getRowCount();
		return new jsuis.Dimension(0, rowCount * rowHeight);
	}
	jsuis.lf.TreeView.prototype.getViewportSize = function() {
		var parent = this.getParent();
		if (parent instanceof jsuis.lf.Viewport) {
			return parent.getPeer().getSize();
		}
		return this.getSize();
	}
}) (jsuis);
