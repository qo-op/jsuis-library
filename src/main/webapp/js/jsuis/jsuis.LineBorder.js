/**
 * jsuis.LineBorder
 */
(function(jsuis) {
	var SUPER = jsuis.Border;
	jsuis.LineBorder = jsuis.Object.extend(SUPER, function(color, thickness, rx, ry) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].LineBorder(color, thickness, rx, ry));
	});
	jsuis.Component.addProperties(jsuis.LineBorder,
			new jsuis.Property("color"),
			new jsuis.Property("thickness"),
			new jsuis.Property("rx"),
			new jsuis.Property("ry")
	);
}) (jsuis);
