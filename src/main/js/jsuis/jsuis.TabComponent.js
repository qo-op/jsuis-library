/**
 * jsuis.TabComponent
 */
(function(jsuis) {
	var SUPER = jsuis.Button;
	jsuis.TabComponent = jsuis.Object.extend(SUPER, function(text, icon) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].TabComponent(text, icon));
	});
}) (jsuis);
