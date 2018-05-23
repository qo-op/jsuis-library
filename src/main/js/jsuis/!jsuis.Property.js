/**
 * jsuis.Property
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Property = jsuis.Object.extend(jsuis.Object, function(key, value) {
		SUPER.prototype.constructor.call(this);
		this.setKey(key);
		this.setValue(value);
	});
	jsuis.Property.prototype.getKey = function() {
		return this.key;
	}
	jsuis.Property.prototype.setKey = function(key) {
		this.key = "" + key;
		return this;
	}
	jsuis.Property.prototype.getValue = function() {
		return this.value;
	}
	jsuis.Property.prototype.setValue = function(value) {
		this.value = value;
		return this;
	}
	jsuis.Property.prototype.toString = function() {
		return this.getKey();
	}
}) (jsuis);
