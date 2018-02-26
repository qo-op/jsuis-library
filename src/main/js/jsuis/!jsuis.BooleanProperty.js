/**
 * jsuis.BooleanProperty
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.BooleanProperty = jsuis.Object.extend(jsuis.Object, function(key, value) {
		SUPER.prototype.constructor.call(this);
		this.setKey(key);
		this.setValue(value);
	});
	jsuis.BooleanProperty.prototype.getKey = function() {
		return this.key;
	}
	jsuis.BooleanProperty.prototype.setKey = function(key) {
		this.key = "" + key;
		return this;
	}
	jsuis.BooleanProperty.prototype.getValue = function() {
		return this.value;
	}
	jsuis.BooleanProperty.prototype.setValue = function(value) {
		this.value = value;
		return this;
	}
	jsuis.BooleanProperty.prototype.toString = function() {
		return this.getKey();
	}
}) (jsuis);
