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
		try {
			eval(get);
		} catch (e) {
			println(get);
			println(e.stack);
		}
		var set = jsuis.Object.getClassName(constructor) + ".prototype.set" + method + " = ";
		set += function(key) {
			this.key = key;
			return this;
		};
		set = set.replace(/key/g, key);
		try {
			eval(set);
		} catch (e) {
			println(set);
			println(e.stack);
		}
		var properties = constructor.properties;
		if (!properties) {
			properties = [];
			constructor.properties = properties;
		}
		properties.push(property);
	}
	jsuis.Object.addPeerProperties = function(constructor, properties) {
		properties = Array.prototype.slice.call(arguments, 1);
		for (var i = 0; i < properties.length; i++) {
			var property = properties[i];
			jsuis.Object.addPeerProperty(constructor, property);
		}
	}
	jsuis.Object.addPeerProperty = function(constructor, property) {
		var key = property.getKey();
		var method = key.charAt(0).toUpperCase() + key.slice(1);
		var get = jsuis.Object.getClassName(constructor) + ".prototype.get" + method + " = ";
		get += function() {
			var peer = this.getPeer();
			return peer.getmethod();
		};
		get = get.replace("peer.getmethod", "peer.get" + method);
		eval(get);
		var set = jsuis.Object.getClassName(constructor) + ".prototype.set" + method + " = ";
		set += function(key) {
			var peer = this.getPeer();
			peer.setmethod(key);
			return this;
		};
		set = set.replace(/key/g, key);
		set = set.replace("peer.setmethod", "peer.set" + method);
		eval(set);
		var properties = constructor.properties;
		if (!properties) {
			properties = [];
			constructor.properties = properties;
		}
		properties.push(property);
	}
	jsuis.Object.addElementProperties = function(constructor, properties) {
		properties = Array.prototype.slice.call(arguments, 1);
		for (var i = 0; i < properties.length; i++) {
			var property = properties[i];
			jsuis.Object.addElementProperty(constructor, property);
		}
	}
	jsuis.Object.addElementProperty = function(constructor, property) {
		var key = property.getKey();
		var method = key.charAt(0).toUpperCase() + key.slice(1);
		var get = jsuis.Object.getClassName(constructor) + ".prototype.get" + method + " = ";
		get += function() {
			var element = this.getElement();
			return element.getmethod();
		};
		get = get.replace("element.getmethod", "element.get" + method);
		eval(get);
		var set = jsuis.Object.getClassName(constructor) + ".prototype.set" + method + " = ";
		set += function(key) {
			var element = this.getElement();
			element.setmethod(key);
			return this;
		};
		set = set.replace(/key/g, key);
		set = set.replace("element.setmethod", "element.set" + method);
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
	jsuis.Object.prototype.getElement = function() {
		return this.element;
	}
	jsuis.Object.prototype.setElement = function(element) {
		this.element = element;
		return this;
	}
	jsuis.Object.prototype.getPeer = function() {
		return this.peer;
	}
	jsuis.Object.prototype.setPeer = function(peer) {
		this.peer = peer;
		return this;
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
	jsuis.Object.prototype.getPropertyChangeSupport = function() {
		var propertyChangeSupport = this.propertyChangeSupport;
		if (!propertyChangeSupport) {
			propertyChangeSupport = new jsuis.PropertyChangeSupport(this);
			this.setPropertyChangeSupport(propertyChangeSupport);
		}
		return propertyChangeSupport;
	}
	jsuis.Object.prototype.setPropertyChangeSupport = function(propertyChangeSupport) {
		this.propertyChangeSupport = propertyChangeSupport;
	}
	jsuis.Object.prototype.addPropertyChangeListener = function(propertyChangeListener) {
		var propertyChangeSupport = this.getPropertyChangeSupport();
		propertyChangeSupport.addPropertyChangeListener(propertyChangeListener);
	}
	jsuis.Object.prototype.removePropertyChangeListener = function(propertyChangeListener) {
		var propertyChangeSupport = this.getPropertyChangeSupport();
		propertyChangeSupport.removePropertyChangeListener(propertyChangeListener);
	}
	jsuis.Object.prototype.getPropertyChangeListeners = function(propertyName) {
		var propertyChangeSupport = this.getPropertyChangeSupport();
		propertyChangeSupport.getPropertyChangeListeners(propertyName);
	}
	jsuis.Object.prototype.firePropertyChange = function(propertyName, oldValue, newValue) {
		var propertyChangeSupport = this.getPropertyChangeSupport();
		propertyChangeSupport.firePropertyChange(propertyName, oldValue, newValue);
	}
	jsuis.Object.prototype.toString = function() {
		return this.getClassName();
	}
})(jsuis);
