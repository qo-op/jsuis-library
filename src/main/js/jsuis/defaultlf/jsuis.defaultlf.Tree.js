/**
 * jsuis.defaultlf.Tree
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.Tree = jsuis.Object.extend(SUPER, function() {
		// SUPER.prototype.constructor.call(this, null);
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		this.setBackground(jsuis.Color.Black.withAlpha(.1 * 255));
		this.setModel(new jsuis.defaultlf.TreeModel());
		this.setCellRenderer(new jsuis.defaultlf.TreeCellRenderer());
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Tree,
			new jsuis.Property("model"),
			new jsuis.Property("cellRenderer"),
			new jsuis.Property("selection")
	);
	jsuis.defaultlf.Tree.prototype.setRoot = function(root) {
		var model = this.getModel();
		model.setRoot(root);
		return this;
	}
	jsuis.defaultlf.Tree.prototype.getRoot = function() {
		var model = this.getModel();
		return model.getRoot();
	}
	jsuis.defaultlf.Tree.prototype.setY = function(y) {
		SUPER.prototype.setY.call(this, y);
		return this;
	}
	jsuis.defaultlf.Tree.prototype.setHeight = function(height) {
		SUPER.prototype.setHeight.call(this, height);
		return this;
	}
	jsuis.defaultlf.Tree.prototype.validate = function() {
		var treeCellRenderer = this.getCellRenderer();
		var model = this.getModel();
		var rows = model.getRows();
		for (var i = 0; i < rows.length; i++) {
			var treeNode = rows[i];
			/*
			var component = treeCellRenderer.getTreeCellRendererComponent(this, treeNode.getUserObject(),
					treeNode.isSelected(), treeNode.isExpanded(), treeNode.isLeaf(), i, treeNode.hasFocus());
			*/
			var component = treeCellRenderer.getTreeCellRendererComponent(this, treeNode.getUserObject(),
					false, false, treeNode.isLeaf(), i, false);
			this.add(component, jsuis.BorderConstraints.NORTH);
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
