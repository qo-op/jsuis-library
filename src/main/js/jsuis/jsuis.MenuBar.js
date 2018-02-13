/**
 * jsuis.MenuBar
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.MenuBar = jsuis.Object.extend(SUPER, function(element) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].MenuBar(element));
	});
}) (jsuis);
