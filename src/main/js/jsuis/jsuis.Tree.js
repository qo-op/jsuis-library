/**
 * jsuis.Tree
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.Tree = jsuis.Object.extend(SUPER, function(model) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Tree());
		this.setModel(nvl(model, new jsuis.TreeModel()));
		this.setCellRenderer(new jsuis.TreeCellRenderer());
	});
	jsuis.Object.addPeerProperties(jsuis.Tree, {
		model: null,
		cellRenderer: null
	});
	jsuis.Tree.prototype.getRoot = function() {
		var model = this.getModel();
		return model.getRoot();
	}
	jsuis.Tree.prototype.setRoot = function(root) {
		var model = this.getModel();
		model.setRoot(root);
		return this;
	}
	jsuis.Tree.prototype.isRootVisible = function() {
		var peer = this.getPeer();
		return peer.isRootVisible();
	}
	jsuis.Tree.prototype.setRootVisible = function(rootVisible) {
		var peer = this.getPeer();
		peer.setRootVisible(rootVisible);
		return this;
	}
	jsuis.Tree.prototype.expandRow = function(row) {
		var peer = this.getPeer();
		peer.expandRow(row);
	}
	jsuis.Tree.prototype.expandNode = function(node) {
		var peer = this.getPeer();
		peer.expandNode(node);
	}
	/*
	jsuis.Tree.prototype.getRowCount = function() {
		var peer = this.getPeer();
		return peer.getRowCount();
	}
	*/
	jsuis.Tree.prototype.expandAll = function() {
		var peer = this.getPeer();
		peer.expandAll();
	}
	jsuis.Tree.prototype.getNodeForLocation = function(x, y) {
		var peer = this.getPeer();
		return peer.getNodeForLocation(x, y);
	}
}) (jsuis);
