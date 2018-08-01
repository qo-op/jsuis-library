/**
 * jsuis.TreeCellRenderer
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.TreeCellRenderer = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].TreeCellRenderer());
	});
	jsuis.Object.addPeerProperties(jsuis.TreeCellRenderer, {
		rowHeight: null
	});
	jsuis.TreeCellRenderer.prototype.getIcon = function(key) {
		var peer = this.getPeer();
		return peer.getIcon(key);
	}
	jsuis.TreeCellRenderer.prototype.setIcon = function(key, icon) {
		var peer = this.getPeer();
		peer.setIcon(key, icon);
		return this;
	}
	jsuis.TreeCellRenderer.prototype.getTreeCellRendererComponent = function(
			tree, value, selected, expanded, leaf, row, hasFocus) {
		var peer = this.getPeer();
		return peer.getTreeCellRendererComponent(
				tree, value, selected, expanded, leaf, row, hasFocus);
	}
}) (jsuis);
