/**
 * jsuis.ResourceBundle
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.ResourceBundle = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ResourceBundle());
	});
	jsuis.ResourceBundle.getBundle = function(baseName, locale) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		return jsuis[lookAndFeel].ResourceBundle.getBundle(baseName, locale);
	}
	jsuis.ResourceBundle.prototype.getString = function(key) {
		var peer = this.getPeer();
		return peer.getString(key);
	}
}) (jsuis);
