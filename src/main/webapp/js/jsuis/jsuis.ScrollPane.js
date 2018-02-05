/**
 * jsuis.ScrollPane
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.ScrollPane = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this);
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		return new jsuis[lookAndFeel].ScrollPane(text, icon);
	});
}) (jsuis);
