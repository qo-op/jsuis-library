/**
 * jsuis.TreeModel
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.TreeModel = jsuis.Object.extend(SUPER, function(root) {
		SUPER.prototype.constructor.call(this);
		this.setRoot(nvl(root, new jsuis.TreeNode()));
	});
	jsuis.Object.addProperties(jsuis.TreeModel,
			new jsuis.Property("root")
	);
	jsuis.TreeModel.prototype.getChild = function(parent, index) {
		return parent.getChildAt(index);
	}
	jsuis.TreeModel.prototype.getChildCount = function(parent) {
		return parent.getChildCount();
	}
	jsuis.TreeModel.prototype.isLeaf = function(node) {
		return node.isLeaf();
	}
	jsuis.TreeModel.prototype.valueForPathChanged = function(path, newValue) {
	}
	jsuis.TreeModel.prototype.getIndexOfChild = function(parent, child) {
		return parent.getIndex(child);
	}
	jsuis.TreeModel.prototype.addTreeModelListener = function(treeModelListener) {
	}
	jsuis.TreeModel.prototype.removeTreeModelListener = function(treeModelListener) {
	}
}) (jsuis);
