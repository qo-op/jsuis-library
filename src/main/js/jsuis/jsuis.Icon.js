/**
 * jsuis.Icon
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Icon = jsuis.Object.extend(SUPER, function(element) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Icon(element));
	});
}) (jsuis);
