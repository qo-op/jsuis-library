/**
 * jsuis.Tree
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.Tree = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Tree());
	});
	jsuis.Object.addPeerProperties(jsuis.Tree,
			new jsuis.Property("model"),
			new jsuis.Property("root")
	);
}) (jsuis);
