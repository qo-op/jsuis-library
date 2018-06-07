/**
 * jsuis.RadioButton
 */
(function(jsuis) {
	var SUPER = jsuis.Button;
	jsuis.RadioButton = jsuis.Object.extend(SUPER, function(text, icon) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].RadioButton(text, icon));
	});
}) (jsuis);
