/**
 * jsuis.Menu
 */
(function(jsuis) {
	var SUPER = jsuis.MenuItem;
	jsuis.Menu = jsuis.Object.extend(SUPER, function(layout, target) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Menu(layout, target));
	});
	jsuis.Menu.prototype.addSeparator = function() {
		var peer = this.getPeer();
		peer.addSeparator();
	}
}) (jsuis);
