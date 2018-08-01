/**
 * jsuis.lf.TreeLightweightView
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Panel;
	jsuis.lf.TreeLightweightView = jsuis.Object.extend(SUPER, function(tree) {
		SUPER.prototype.constructor.call(this, null);
		this.setTree(tree);
		this.setX(0);
		this.setY(0);
	});
	jsuis.Object.addProperties(jsuis.lf.TreeLightweightView, {
		tree: null,
		x: 0,
		y: 0
	});
	jsuis.lf.TreeLightweightView.prototype.getPreferredSize = function() {
		var tree = this.getTree();
		var rowHeight = tree.getRowHeight();
		var rowCount = tree.getRowCount();
		return new jsuis.Dimension(0, rowCount * rowHeight);
	}
	jsuis.lf.TreeLightweightView.prototype.getViewportSize = function() {
		var parent = this.getParent();
		if (parent instanceof jsuis.lf.Viewport) {
			return parent.getPeer().getSize();
		}
		return this.getSize();
	}
}) (jsuis);
