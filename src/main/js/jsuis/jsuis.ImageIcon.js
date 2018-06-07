/**
 * jsuis.ImageIcon
 */
(function(jsuis) {
	var SUPER = jsuis.Icon;
	jsuis.ImageIcon = jsuis.Object.extend(SUPER, function(image, width, height) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ImageIcon(image, width, height));
	});
	jsuis.Object.addPeerProperties(jsuis.ImageIcon, {
		image: null,
	});
}) (jsuis);
