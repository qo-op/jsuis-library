/**
 * jsuis.Property
 */
(function(jsuis) {
	jsuis.Property = function(key, value) {
		if (key !== undefined) {
			this.setKey(key);
		}
		if (value !== undefined) {
			this.setValue(value);
		}
	}
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
		return "jsuis.Property" + JSON.stringify(this);
	}
})(jsuis);
