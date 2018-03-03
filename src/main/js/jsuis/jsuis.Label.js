/**
 * jsuis.Label
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Label = jsuis.Object.extend(SUPER, function(text, icon) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Label(text, icon));
	});
	jsuis.Object.addPeerProperties(jsuis.Label, {
		text: null,
		icon: null,
		iconTextGap: null
	});
}) (jsuis);
