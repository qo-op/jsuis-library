/**
 * jsuis.TabbedPane
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.TabbedPane = jsuis.Object.extend(SUPER, function(tabPlacement) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].TabbedPane(tabPlacement));
	});
	jsuis.TabbedPane.prototype.addTab = function(title, icon, component, tip) {
		var peer = this.getPeer();
		peer.addTab(title, icon, component, tip);
	}
}) (jsuis);
