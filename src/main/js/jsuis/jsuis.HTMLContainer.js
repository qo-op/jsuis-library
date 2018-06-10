/**
 * jsuis.HTMLContainer
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.HTMLContainer = jsuis.Object.extend(SUPER, function(node) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].HTMLContainer(node));
	});
	jsuis.Object.addPeerProperties(jsuis.HTMLContainer, {
		node: null
	});
}) (jsuis);
