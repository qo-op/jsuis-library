/**
 * jsuis.ToolBar
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.ToolBar = jsuis.Object.extend(SUPER, function(orientation) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ToolBar(orientation));
	});
	jsuis.ToolBar.prototype.addSeparator = function(size) {
		var peer = this.getPeer();
		peer.addSeparator(size);
	}
}) (jsuis);
