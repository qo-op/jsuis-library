/**
 * jsuis.HTMLComponent
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.HTMLComponent = jsuis.Object.extend(SUPER, function(tag) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].HTMLComponent(tag));
	});
	jsuis.Object.addPeerProperties(jsuis.HTMLComponent, {
		html: null
	});
}) (jsuis);
