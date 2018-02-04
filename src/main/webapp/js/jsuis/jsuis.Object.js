/**
 * jsuis.Object
 */
(function(jsuis) {
	jsuis.Object = function() {
	}
	jsuis.Object.prototype.init = function() {
		var properties = this.getProperties();
		if (properties) {
			for (var i = 0; i < properties.length; i++) {
				var property = properties[i];
				var value = property.getValue();
				if (value !== undefined) {
					value = jsuis.Object.clone(value);
					var key = property.getKey();
					var set = "set" + key.charAt(0).toUpperCase() + key.slice(1);
					if (this[set]) {
						this[set](value);
					} else {
						this[key] = value;
					}
				}
			}
		}
	}
	jsuis.Object.addProperties = function(constructor, properties) {
		properties = Array.prototype.slice.call(arguments, 1);
		for (var i = 0; i < properties.length; i++) {
			var property = properties[i];
			jsuis.Object.addProperty(constructor, property);
		}
	}
	jsuis.Object.addProperty = function(constructor, property) {
		var key = property.getKey();
		var method = key.charAt(0).toUpperCase() + key.slice(1);
		var get = jsuis.Object.getLibrary() + "." + jsuis.Object.getConstructorName(constructor) + ".prototype.get" + method + " = ";
		get += function() {
			return this.key;
		};
		get = get.replace(/key/g, key);
		eval(get);
		var set = jsuis.Object.getLibrary() + "." + jsuis.Object.getConstructorName(constructor) + ".prototype.set" + method + " = ";
		set += function(key) {
			this.key = key;
			return this;
		};
		set = set.replace(/key/g, key);
		eval(set);
		var properties = constructor.properties;
		if (!properties) {
			properties = [];
			constructor.properties = properties;
		}
		properties.push(property);
	}
	jsuis.Object.getLibrary = function() {
		return "jsuis";
	}
	jsuis.Object.extend = function(source, target) {
		var object = function() {};
		object.prototype = source.prototype;
		target.prototype = new object();
		target.prototype.constructor = target;
		var properties = source.properties;
		if (properties) {
			target.properties = properties.slice();
		}
		return target;
	}
	jsuis.Object.clone = function(value) {
		if (value === undefined) {
			return undefined;
		} else if (jsuis.Object.isObject(value)) {
			if (value.clone) {
				return value.clone();
			}
			var clone = {};
			var object = value;
			for (var key in object) {
				var value = object[key];
				value = jsuis.Object.clone(value);
				var method = "set" + key.charAt(0).toUpperCase() + key.slice(1);
				if (clone[method]) {
					clone[metodo](value);
				} else {
					clone[key] = value;
				}
			}
			return clone;
		} else {
			return JSON.parse(JSON.stringify(value));
		}
	}
	jsuis.Object.isObject = function(value) {
		return (Object.prototype.toString.call(value) === "[object Object]");
	}
	jsuis.Object.isInt = function(value) {
		var x;
		if (isNaN(value)) {
			return false;
		}
		x = parseFloat(value);
		return (x | 0) === x;
	}
	jsuis.Object.isFloat = function(value) {
		var x;
		if (isNaN(value)) {
			return false;
		}
		x = parseFloat(value);
		return (x | 0) !== x;
	}
	jsuis.Object.isString = function(value) {
		return (Object.prototype.toString.call(value) === "[object String]");
	}
	jsuis.Object.isDate = function(value) {
		return (Object.prototype.toString.call(value) === "[object Date]");
	}
	jsuis.Object.isRegExp = function(value) {
		return (Object.prototype.toString.call(value) === "[object RegExp]");
	}
	jsuis.Object.isFunction = function(value) {
		return (Object.prototype.toString.call(value) === "[object Function]");
	}
	jsuis.Object.isArray = function(value) {
		return (Object.prototype.toString.call(value) === "[object Array]");
	}
	jsuis.Object.getConstructorName = function(constructor) {
		var name = constructor.name;
		if (name) {
			return name;
		}
		for (name in jsuis) {
			if (constructor === jsuis[name]) {
				constructor.name = name;
				return name;
			}
		}
	}
	jsuis.Object.prototype.getConstructor = function() {
		return this.constructor;
	}
	jsuis.Object.prototype.getConstructorName = function() {
		var constructor = this.getConstructor();
		return jsuis.Object.getConstructorName(constructor);
	}
	jsuis.Object.prototype.setProperties = function(properties) {
		var constructor = this.getConstructor();
		constructor.properties = properties;
		return this;
	}
	jsuis.Object.prototype.getProperties = function() {
		var constructor = this.getConstructor();
		return constructor.properties;
	}
	jsuis.Object.prototype.toString = function() {
		return jsuis.Object.getLibrary() + "." + this.getConstructorName() + JSON.stringify(this);
	}
})(jsuis);
