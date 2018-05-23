/**
 * jsuis.TreeNodeUserObject
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.TreeNodeUserObject = jsuis.Object.extend(SUPER, function(text) {
		SUPER.prototype.constructor.call(this);
		this.setText(nvl(text, ""));
	});
	jsuis.Object.addProperties(jsuis.TreeNodeUserObject, {
		text: "",
		map: null
	});
	jsuis.TreeNodeUserObject.prototype.get = function(key) {
		var map = this.getMap();
		if (!map) {
			map = {};
			this.setMap(map);
		}
		return map[key];
	}
	jsuis.TreeNodeUserObject.prototype.put = function(key, value) {
		var map = this.getMap();
		if (!map) {
			map = {};
			this.setMap(map);
		}
		map[key] = value;
		return this;
	}
	jsuis.TreeNodeUserObject.prototype.toString = function() {
		return this.getText();
	}
}) (jsuis);
