/**
 * jsuis.Label
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Label = jsuis.Object.extend(SUPER, function(text) {
		SUPER.prototype.constructor.call(this);
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		return new jsuis[lookAndFeel].Label(text);
	});
}) (jsuis);
