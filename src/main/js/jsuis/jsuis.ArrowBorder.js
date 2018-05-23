/**
 * jsuis.ArrowBorder
 */
(function(jsuis) {
	var SUPER = jsuis.Border;
	jsuis.ArrowBorder = jsuis.Object.extend(SUPER, function(color, thickness, x1, y1, x2, y2) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ArrowBorder(color, thickness, x1, y1, x2, y2));
	});
	jsuis.Object.addPeerProperties(jsuis.ArrowBorder, {
		color: null,
		thickness: 0,
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0
	});
}) (jsuis);
