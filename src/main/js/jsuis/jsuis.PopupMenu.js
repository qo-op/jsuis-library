/**
 * jsuis.PopupMenu
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.PopupMenu = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].PopupMenu());
	});
	jsuis.PopupMenu.prototype.show = function(invoker, x, y) {
		var peer = this.getPeer();
		peer.show(invoker, x, y);
	}
}) (jsuis);
