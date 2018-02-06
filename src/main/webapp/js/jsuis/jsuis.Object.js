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
		var get = jsuis.Object.getClassName(constructor) + ".prototype.get" + method + " = ";
		get += function() {
			return this.key;
		};
		get = get.replace(/key/g, key);
		eval(get);
		var set = jsuis.Object.getClassName(constructor) + ".prototype.set" + method + " = ";
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
	jsuis.Object.getClassName = function(constructor, prefix, jsuisPackage) {
		var className = constructor.className;
		if (className) {
			return className;
		}
		var prefix = prefix || "jsuis";
		var jsuisPackage = jsuisPackage || jsuis;
		for (name in jsuisPackage) {
			if (constructor === jsuisPackage[name]) {
				var className = prefix + "." + name;
				constructor.className = className;
				return className;
			}
			var object = jsuisPackage[name];
			if (jsuis.packages.indexOf(object) === -1) {
				continue;
			}
			var className = jsuis.Object.getClassName(constructor, prefix + "." + name, object);
			if (className) {
				constructor.className = className;
				return className;
			}
		}
	}
	jsuis.Object.prototype.getConstructor = function() {
		return this.constructor;
	}
	jsuis.Object.prototype.getClassName = function() {
		var constructor = this.getConstructor();
		return jsuis.Object.getClassName(constructor);
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
		return this.getClassName() + JSON.stringify(this);
	}
})(jsuis);

/**
 * jsuis.Property
 */
(function(jsuis) {
	jsuis.Property = jsuis.Object.extend(jsuis.Object, function(key, value) {
		jsuis.Object.prototype.constructor.call(this);
		if (key !== undefined) {
			this.setKey(key);
		}
		if (value !== undefined) {
			this.setValue(value);
		}
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
		return "jsuis.Property" + JSON.stringify(this);
	}
}) (jsuis);
