/**
 * jsuis.Label
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Label = jsuis.Object.extend(SUPER, function(text) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Label(text));
	});
	jsuis.Object.addPeerProperties(jsuis.Label,
			new jsuis.Property("text")
	);
}) (jsuis);