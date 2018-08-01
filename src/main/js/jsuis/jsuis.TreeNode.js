/**
 * jsuis.TreeNode
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.TreeNode = jsuis.Object.extend(SUPER, function(userObject) {
		SUPER.prototype.constructor.call(this);
		this.setUserObject(userObject);
		this.setChildren([]);
	});
	jsuis.Object.addProperties(jsuis.TreeNode, {
		userObject: null,
		map: null,
		children: null,
		parent: null,
		expanded: false,
		size: null,
		location: null
	});
	jsuis.TreeNode.prototype.add = function(treeNode) {
		var children = this.getChildren();
		children.push(treeNode);
		treeNode.setParent(this);
	}
	jsuis.TreeNode.prototype.getChildAt = function(index) {
		var children = this.getChildren();
		return children[index];
	}
	jsuis.TreeNode.prototype.getChildCount = function() {
		var children = this.getChildren();
		return children.length;
	}
	jsuis.TreeNode.prototype.isLeaf = function() {
		var children = this.getChildren();
		return !children || !children.length;
	}
	jsuis.TreeNode.prototype.getIndex = function(child) {
		var children = this.getChildren();
		return children.indexOf(child);
	}
	jsuis.TreeNode.prototype.getLevel = function() {
		var level = 0;
		var node = this;
		while (true) {
			var parent = node.getParent();
			if (!parent) {
				break;
			}
			level++;
			node = parent;
		}
		return level;
	}
	jsuis.TreeNode.prototype.toString = function() {
		var userObject = this.getUserObject();
		if (!userObject) {
			return null;
		}
		return userObject.toString();
	}
}) (jsuis);
