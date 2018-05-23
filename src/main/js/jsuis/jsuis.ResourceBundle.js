/**
 * jsuis.ResourceBundle
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.ResourceBundle = jsuis.Object.extend(SUPER, function() {
	});
	jsuis.Object.addProperties(jsuis.ResourceBundle, {
		parent: null
	});
	var bundles = [];
	jsuis.ResourceBundle.getBundle = function(baseName, locale) {
		if (!locale) {
			locale = jsuis.Locale.getDefault();
		}
		var name = baseName + "_" + locale;
		var bundle = bundles[name];
		if (bundle) {
			return bundle;
		}
		var baseBundle = eval(baseName + ".getInstance()");
		try {
			bundle = eval(name + ".getInstance()");
		} catch (e) {
		}
		if (bundle) {
			bundle.setParent(baseBundle);
		} else {
			bundle = baseBundle;
		}
		bundles[name] = bundle;
		return bundle;
	}
	jsuis.ResourceBundle.prototype.getString = function(key) {
		return key;
	}
}) (jsuis);
