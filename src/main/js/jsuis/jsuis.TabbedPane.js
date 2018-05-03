/**
 * jsuis.TabbedPane
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.TabbedPane = jsuis.Object.extend(SUPER, function(tabPlacement) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].TabbedPane(tabPlacement));
	});
	jsuis.TabbedPane.prototype.addTab = function(tabComponent, cardComponent) {
		var peer = this.getPeer();
		peer.addTab(tabComponent, cardComponent);
	}
	jsuis.TabbedPane.prototype.getTabCount = function() {
		var peer = this.getPeer();
		return peer.getTabCount();
	}
	jsuis.TabbedPane.prototype.getTabComponentAt = function(index) {
		var peer = this.getPeer();
		return peer.getTabComponentAt(index);
	}
	jsuis.TabbedPane.prototype.getComponentAt = function(index) {
		var peer = this.getPeer();
		return peer.getComponentAt(index);
	}
	jsuis.TabbedPane.prototype.getSelectedIndex = function() {
		var peer = this.getPeer();
		return peer.getSelectedIndex();
	}
}) (jsuis);
