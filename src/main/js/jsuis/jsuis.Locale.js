/**
 * jsuis.Locale
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Locale = jsuis.Object.extend(SUPER, function(language, country) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Locale(language, country));
	});
	jsuis.Locale.getDefault = function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		return jsuis[lookAndFeel].Locale.getDefault();
	}
	jsuis.Locale.prototype.toString = function() {
		var peer = this.getPeer();
		return peer.toString();
	}
}) (jsuis);
