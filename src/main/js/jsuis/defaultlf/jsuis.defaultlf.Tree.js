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
		rows: null,
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
		this.setRows(null);
		return this;
	}
	jsuis.defaultlf.Tree.prototype.getRows = function() {
		var rows = this.rows;
		if (!rows) {
			rows = [];
			this.setRows(rows);
			var root = this.getRoot();
			if (root) {
				this.load(root);
			}
		}
		return rows;
	}
	jsuis.defaultlf.Tree.prototype.load = function(node) {
		var rows = this.rows;
		rows.push(node);
		var children = node.getChildren();
		if (children) {
			for (var i = 0; i < children.length; i++) {
				var child = children[i];
				this.load(child);
			}
		}
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
		
		println("cellRenderer=" + cellRenderer);
		
		var model = this.getModel();
		var rows = this.getRows();
		for (var i = 0; i < rows.length; i++) {
			var treeNode = rows[i];
			/*
			var component = treeCellRenderer.getTreeCellRendererComponent(this, treeNode.getUserObject(),
					treeNode.isSelected(), treeNode.isExpanded(), treeNode.isLeaf(), i, treeNode.hasFocus());
			*/
			var component = cellRenderer.getTreeCellRendererComponent(this, treeNode.getUserObject(),
					false, false, treeNode.isLeaf(), i, false);
			this.add(component);
			var preferredSize = component.getPreferredSize();
			var preferredHeight = preferredSize.getHeight();
			component.setSize(preferredSize);
			component.setLocation(new jsuis.Point(x, y));
			y += preferredHeight;
		}
		this.doLayout();
		var components = this.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			component.validate();
		}
	}
	
	jsuis.defaultlf.Tree.prototype.isSelected = function(treeNode) {
		var selection = this.getSelection();
		return (treeNode === selection);
	}
	jsuis.defaultlf.Tree.prototype.setSelected = function(treeNode) {
		var selection = this.getSelection();
		if (selection) {
			selection.setSelected(false);
		}
		this.setSelection(treeNode);
		if (treeNode) {
			treeNode.setSelected(true);
		}
		return this;
	}
}) (jsuis);
