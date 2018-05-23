/**
 * jsuis.LayeredPane
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.LayeredPane = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].LayeredPane());
	});
}) (jsuis);
