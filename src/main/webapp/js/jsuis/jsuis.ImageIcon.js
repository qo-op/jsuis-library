/**
 * jsuis.ImageIcon
 */
(function(jsuis) {
	var SUPER = jsuis.Icon;
	jsuis.ImageIcon = jsuis.Object.extend(SUPER, function(source) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ImageIcon(source));
	});
	jsuis.Component.addProperties(jsuis.ImageIcon,
			new jsuis.Property("source")
	);
}) (jsuis);
