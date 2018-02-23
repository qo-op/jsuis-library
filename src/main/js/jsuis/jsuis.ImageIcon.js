/**
 * jsuis.ImageIcon
 */
(function(jsuis) {
	var SUPER = jsuis.Icon;
	jsuis.ImageIcon = jsuis.Object.extend(SUPER, function(resource, iconWidth, iconHeight) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ImageIcon(resource, iconWidth, iconHeight));
	});
	jsuis.Object.addPeerProperties(jsuis.ImageIcon,
			new jsuis.Property("resource")
	);
}) (jsuis);
