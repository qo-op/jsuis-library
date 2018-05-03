/**
 * jsuis.defaultlf.Tree
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.Tree = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, null);
		this.setBackground(jsuis.Color.Black.withAlpha(.1 * 255));
		this.setCellRenderer(new jsuis.defaultlf.TreeCellRenderer());
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Tree, {
		model: null,
		cellRenderer: null,
		selection: null
	});
	jsuis.defaultlf.Tree.prototype.getRoot = function() {
		var model = this.getModel();
		return model.getRoot();
	}
	jsuis.defaultlf.Tree.prototype.setRoot = function(root) {
		var model = this.getModel();
		model.setRoot(root);
		return this;
	}
	jsuis.defaultlf.Tree.prototype.getRows = function(node, rows) {
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
	jsuis.defaultlf.Tree.prototype.getRowHeight = function() {
		var cellRenderer = this.getCellRenderer();
		return cellRenderer.getRowHeight();
	}
	jsuis.defaultlf.Tree.prototype.setRowHeight = function(rowHeight) {
		var cellRenderer = this.getCellRenderer();
		cellRenderer.setRowHeight(rowHeight);
		return this;
	}
	jsuis.defaultlf.Tree.prototype.validate = function() {
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
	
	jsuis.defaultlf.Tree.prototype.isSelected = function(node) {
		var selection = this.getSelection();
		return (node === selection);
	}
	jsuis.defaultlf.Tree.prototype.setSelected = function(node) {
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
	jsuis.defaultlf.Tree.prototype.expandNode = function(node) {
		node.setExpanded(true);
	}
	jsuis.defaultlf.Tree.prototype.expandAll = function(node) {
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
