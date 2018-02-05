/**
 * jsuis.Button
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Button = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this);
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		return new jsuis[lookAndFeel].Button(text, icon);
	});
}) (jsuis);
