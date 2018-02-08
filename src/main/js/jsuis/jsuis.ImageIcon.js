/**
 * jsuis.ImageIcon
 */
(function(jsuis) {
	var SUPER = jsuis.Icon;
	jsuis.ImageIcon = jsuis.Object.extend(SUPER, function(resource) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ImageIcon(resource));
	});
	jsuis.Object.addPeerProperties(jsuis.ImageIcon,
			new jsuis.Property("resource")
	);
}) (jsuis);
