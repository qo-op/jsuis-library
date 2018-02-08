/**
 * jsuis.Button
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Button = jsuis.Object.extend(SUPER, function(text, icon) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Button(text, icon));
	});
	jsuis.Object.addPeerProperties(jsuis.Button,
			new jsuis.Property("text"),
			new jsuis.Property("icon"),
			new jsuis.Property("iconTextGap")
	);
}) (jsuis);
