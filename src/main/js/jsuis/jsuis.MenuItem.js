/**
 * jsuis.MenuItem
 */
(function(jsuis) {
	var SUPER = jsuis.Button;
	jsuis.MenuItem = jsuis.Object.extend(SUPER, function(text, icon) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].MenuItem(text, icon));
	});
}) (jsuis);
