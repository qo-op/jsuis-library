/**
 * jsuis.TextField
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.TextField = jsuis.Object.extend(SUPER, function(text) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].TextField(text));
	});
	jsuis.Object.addPeerProperties(jsuis.TextField,
			new jsuis.Property("text")
	);
}) (jsuis);
