/**
 * jsuis.ImageIcon
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.ImageIcon = jsuis.Object.extend(SUPER, function(resource, iconWidth, iconHeight) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ImageIcon(resource));
	});
	jsuis.Object.addPeerProperties(jsuis.ImageIcon,
			new jsuis.Property("resource"),
			new jsuis.Property("iconWidth"),
			new jsuis.Property("iconHeight")
	);
	jsuis.ImageIcon.prototype.createComponent = function() {
		var peer = this.getPeer();
		return peer.createComponent();
	}
}) (jsuis);
