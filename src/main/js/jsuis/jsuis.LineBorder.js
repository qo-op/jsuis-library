/**
 * jsuis.LineBorder
 */
(function(jsuis) {
	var SUPER = jsuis.Border;
	jsuis.LineBorder = jsuis.Object.extend(SUPER, function(color, thickness, rx, ry) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].LineBorder(color, thickness, rx, ry));
	});
	jsuis.Object.addPeerProperties(jsuis.LineBorder, {
		color: null,
		thickness: 0,
		rx: 0,
		ry: 0
	});
}) (jsuis);
