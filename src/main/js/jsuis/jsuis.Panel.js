/**
 * jsuis.Panel
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Panel = jsuis.Object.extend(SUPER, function(layout) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Panel(layout));
	});
	jsuis.Object.addPeerProperties(jsuis.Panel, {
		opaque: null
	});
}) (jsuis);
