/**
 * jsuis.GridBorder
 */
(function(jsuis) {
	var SUPER = jsuis.Border;
	jsuis.GridBorder = jsuis.Object.extend(SUPER, function(color, spacing) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].GridBorder(color, spacing));
	});
	jsuis.Object.addPeerProperties(jsuis.GridBorder, {
		color: null,
		spacing: 0
	});
	jsuis.GridBorder.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets();
	}
}) (jsuis);
