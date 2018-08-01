/**
 * jsuis.lf.Tree
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Panel;
	jsuis.lf.Tree = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		
		this.setBorder(new jsuis.lf.TreeBorder());
		
		var treeView = new jsuis.lf.TreeView(this);
		this.setTreeView(treeView);
		this.add(treeView);
		
		var treeLightweightView = new jsuis.lf.TreeLightweightView(this);
		this.setTreeLightweightView(treeLightweightView);
	});
	jsuis.Object.addProperties(jsuis.lf.Tree, {
		treeView: null,
		treeLightweightView: null,
		model: null,
		cellRenderer: null,
		selection: null
	});
	jsuis.lf.Tree.prototype.getRoot = function() {
		var model = this.getModel();
		return model.getRoot();
	}
	jsuis.lf.Tree.prototype.setRoot = function(root) {
		var model = this.getModel();
		model.setRoot(root);
		return this;
	}
	jsuis.lf.Tree.prototype.getRows = function(node, rows) {
		var root = this.getRoot();
		if (!node) {
			node = root;
		}
		if (node === root) {
			rows = [];
		}
		rows.push(node);
		if (node.isExpanded()) {
			var children = node.getChildren();
			if (children) {
				for (var i = 0; i < children.length; i++) {
					var child = children[i];
					this.getRows(child, rows);
				}
			}
		}
		return rows;
	}
	jsuis.lf.Tree.prototype.getRowCount = function(node) {
		var rowCount = 0;
		if (!node) {
			var root = this.getRoot();
			node = root;
		}
		rowCount++;
		if (node.isExpanded()) {
			var children = node.getChildren();
			if (children) {
				for (var i = 0; i < children.length; i++) {
					var child = children[i];
					rowCount += this.getRowCount(child);
				}
			}
		}
		return rowCount;
	}
	jsuis.lf.Tree.prototype.getRowHeight = function() {
		var cellRenderer = this.getCellRenderer();
		return cellRenderer.getRowHeight();
	}
	jsuis.lf.Tree.prototype.setRowHeight = function(rowHeight) {
		var cellRenderer = this.getCellRenderer();
		cellRenderer.setRowHeight(rowHeight);
		return this;
	}
	jsuis.lf.Tree.prototype.validate = function() {
		
		return SUPER.prototype.validate.call(this);
		
		var x = 0;
		var y = 0;
		var cellRenderer = this.getCellRenderer();
		var model = this.getModel();
		var rows = this.getRows();
		for (var i = 0; i < rows.length; i++) {
			var node = rows[i];
			/*
			var component = treeCellRenderer.getTreeCellRendererComponent(this, node.getUserObject(),
					node.isSelected(), node.isExpanded(), node.isLeaf(), i, node.hasFocus());
			*/
			var component = cellRenderer.getTreeCellRendererComponent(this, node.getUserObject(),
					false, node.isExpanded(), node.isLeaf(), i, false);
			this.add(component);
			var preferredSize = component.getPreferredSize();
			node.setSize(preferredSize);
			var parent = node.getParent();
			if (parent) {
				var parentLocation = parent.getLocation();
				if (parentLocation) {
					x = parentLocation.getX();
				}
				x += 16;
			}
			var location = new jsuis.Point(x, y);
			node.setLocation(location);
			var preferredHeight = preferredSize.getHeight();
			y += preferredHeight;
			component.setSize(node.getSize());
			component.setLocation(location);
		}
		SUPER.prototype.validate.call(this);
	}
	
	jsuis.lf.Tree.prototype.isSelected = function(node) {
		var selection = this.getSelection();
		return (node === selection);
	}
	jsuis.lf.Tree.prototype.setSelected = function(node) {
		var selection = this.getSelection();
		if (selection) {
			selection.setSelected(false);
		}
		this.setSelection(node);
		if (node) {
			node.setSelected(true);
		}
		return this;
	}
	jsuis.lf.Tree.prototype.expandNode = function(node) {
		node.setExpanded(true);
	}
	jsuis.lf.Tree.prototype.expandAll = function(node) {
		var root = this.getRoot();
		if (!node) {
			node = root;
		}
		this.expandNode(node);
		var childCount = node.getChildCount();
		for (var i = 0; i < childCount; i++) {
			var child = node.getChildAt(i);
			this.expandAll(child);
		}
	}
}) (jsuis);
