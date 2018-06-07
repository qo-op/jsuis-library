/**
 * jsuis.ComboBox
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.ComboBox = jsuis.Object.extend(SUPER, function(items) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ComboBox(items));
	});
	jsuis.Object.addPeerProperties(jsuis.ComboBox, {
		items: null,
		selectedIndex: 0,
		selectedItem: null
	});
}) (jsuis);
