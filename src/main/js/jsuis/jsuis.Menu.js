/**
 * jsuis.Menu
 */
(function(jsuis) {
	var SUPER = jsuis.MenuItem;
	jsuis.Menu = jsuis.Object.extend(SUPER, function(layout, target) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Menu(layout, target));
	});
	jsuis.Object.addPeerProperties(jsuis.Menu,
			new jsuis.Property("popupMenu")
	);
	jsuis.Menu.prototype.isPopupMenuVisible = function() {
		var peer = this.getPeer();
		return peer.isPopupMenuVisible();
	}
	jsuis.Menu.prototype.setPopupMenuVisible = function(popupMenuVisible) {
		var peer = this.getPeer();
		peer.setPopupMenuVisible(popupMenuVisible);
		return this;
	}
}) (jsuis);
