/**
 * jsuis.Button
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.Button = jsuis.Object.extend(SUPER, function(text, icon) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Button(text, icon));
	});
	jsuis.Component.addProperties(jsuis.Button,
			new jsuis.Property("icon"),
			new jsuis.Property("iconTextGap")
	);
}) (jsuis);
