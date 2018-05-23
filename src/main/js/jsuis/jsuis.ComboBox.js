/**
 * jsuis.ComboBox
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.ComboBox = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ComboBox());
	});
	jsuis.Object.addPeerProperties(jsuis.ComboBox, {
		items: null,
		selectedIndex: 0
	});
}) (jsuis);
