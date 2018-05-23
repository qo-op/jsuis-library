/**
 * jsuis.ListResourceBundle
 */
(function(jsuis) {
	var SUPER = jsuis.ResourceBundle;
	jsuis.ListResourceBundle = jsuis.Object.extend(SUPER, function() {
	});
	jsuis.ListResourceBundle.prototype.getString = function(key) {
		var contents = this.getContents();
		var string = contents[key];
		if (string !== undefined) {
			return string;
		}
		var parent = this.getParent();
		if (parent) {
			var string = parent.getString(key);
			if (string !== undefined) {
				return string;
			}
		}
		return key;
	}
	var contents = {};
	jsuis.ListResourceBundle.prototype.getContents = function() {
		return contents;
	}
}) (jsuis);
