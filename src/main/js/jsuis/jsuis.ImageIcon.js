/**
 * jsuis.ImageIcon
 */
(function(jsuis) {
	var SUPER = jsuis.Icon;
	jsuis.ImageIcon = jsuis.Object.extend(SUPER, function(resource, width, height) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ImageIcon(resource, width, height));
	});
	jsuis.Object.addPeerProperties(jsuis.ImageIcon, {
		resource: null,
	});
}) (jsuis);
