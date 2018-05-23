/**
 * jsuis.ToggleButton
 */
(function(jsuis) {
	var SUPER = jsuis.Button;
	jsuis.ToggleButton = jsuis.Object.extend(SUPER, function(text, icon) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ToggleButton(text, icon));
	});
}) (jsuis);
