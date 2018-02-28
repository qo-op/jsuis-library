/**
 * jsuis.Object
 */
(function(jsuis) {
	jsuis.Object = function() {
	}
	jsuis.Object.prototype.init = function(defaults, values) {
		for (var key in defaults) {
			var value = defaults[key];
			if (key in values) {
				value = values[key];
			}
			var set = "set" + key.charAt(0).toUpperCase() + key.slice(1);
			this[set](value);
		}
		for (var key in values) {
			if (key in defaults) {
				continue;
			}
			var value = values[key];
			var set = "set" + key.charAt(0).toUpperCase() + key.slice(1);
			this[set](value);
		}
	}
	jsuis.Object.addProperties = function(constructor, properties) {
		for (var key in properties) {
			var value = properties[key];
			jsuis.Object.addProperty(constructor, key, value);
		}
	}
	jsuis.Object.addProperty = function(constructor, key, value) {
		var method = key.charAt(0).toUpperCase() + key.slice(1);
		if (value === true || value === false) {
			var is = jsuis.Object.getClassName(constructor) + ".prototype.is" + method + " = ";
			is += function() {
				return this.key;
			};
			is = is.replace(/key/g, key);
			try {
				eval(is);
			} catch (e) {
				println(is);
				println(e.stack);
			}
			var has = jsuis.Object.getClassName(constructor) + ".prototype.has" + method + " = ";
			has += function() {
				return this.key;
			};
			has = has.replace(/key/g, key);
			try {
				eval(has);
			} catch (e) {
				println(has);
				println(e.stack);
			}
		} else {
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
	}
	jsuis.Object.addPeerProperties = function(constructor, properties) {
		for (var key in properties) {
			var value = properties[key];
			jsuis.Object.addPeerProperty(constructor, key, value);
		}
	}
	jsuis.Object.addPeerProperty = function(constructor, key, value) {
		var method = key.charAt(0).toUpperCase() + key.slice(1);
		if (value === true || value === false) {
			var is = jsuis.Object.getClassName(constructor) + ".prototype.is" + method + " = ";
			is += function() {
				var peer = this.getPeer();
				return peer.ismethod();
			};
			is = is.replace("peer.ismethod", "peer.is" + method);
			try {
				eval(is);
			} catch (e) {
				println(is);
				println(e.stack);
			}
			var has = jsuis.Object.getClassName(constructor) + ".prototype.has" + method + " = ";
			has += function() {
				var peer = this.getPeer();
				return peer.hasmethod();
			};
			has = has.replace("peer.hasmethod", "peer.has" + method);
			try {
				eval(has);
			} catch (e) {
				println(has);
				println(e.stack);
			}
		} else {
			var get = jsuis.Object.getClassName(constructor) + ".prototype.get" + method + " = ";
			get += function() {
				var peer = this.getPeer();
				return peer.getmethod();
			};
			get = get.replace("peer.getmethod", "peer.get" + method);
			try {
				eval(get);
			} catch (e) {
				println(get);
				println(e.stack);
			}
		}
		var set = jsuis.Object.getClassName(constructor) + ".prototype.set" + method + " = ";
		set += function(key) {
			var peer = this.getPeer();
			peer.setmethod(key);
			return this;
		};
		set = set.replace(/key/g, key);
		set = set.replace("peer.setmethod", "peer.set" + method);
		try {
			eval(set);
		} catch (e) {
			println(set);
			println(e.stack);
		}
	}
	jsuis.Object.addElementProperties = function(constructor, properties) {
		for (var key in properties) {
			var value = properties[key];
			jsuis.Object.addElementProperty(constructor, key, value);
		}
	}
	jsuis.Object.addElementProperty = function(constructor, key, value) {
		var method = key.charAt(0).toUpperCase() + key.slice(1);
		if (value === true || value === false) {
			var is = jsuis.Object.getClassName(constructor) + ".prototype.is" + method + " = ";
			is += function() {
				var element = this.getElement();
				return element.ismethod();
			};
			is = is.replace("element.ismethod", "element.is" + method);
			try {
				eval(is);
			} catch (e) {
				println(is);
				println(e.stack);
			}
			var has = jsuis.Object.getClassName(constructor) + ".prototype.has" + method + " = ";
			has += function() {
				var element = this.getElement();
				return element.hasmethod();
			};
			has = has.replace("element.hasmethod", "element.has" + method);
			try {
				eval(has);
			} catch (e) {
				println(has);
				println(e.stack);
			}
		} else {
			var get = jsuis.Object.getClassName(constructor) + ".prototype.get" + method + " = ";
			get += function() {
				var element = this.getElement();
				return element.getmethod();
			};
			get = get.replace("element.getmethod", "element.get" + method);
			try {
				eval(get);
			} catch (e) {
				println(get);
				println(e.stack);
			}
		}
		var set = jsuis.Object.getClassName(constructor) + ".prototype.set" + method + " = ";
		set += function(key) {
			var element = this.getElement();
			element.setmethod(key);
			return this;
		};
		set = set.replace(/key/g, key);
		set = set.replace("element.setmethod", "element.set" + method);
		try {
			eval(set);
		} catch (e) {
			println(set);
			println(e.stack);
		}
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
	jsuis.Object.isObject = function(value) {
		return (Object.prototype.toString.call(value) === "[object Object]");
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
	jsuis.Object.prototype.getPeer = function() {
		return this.peer;
	}
	jsuis.Object.prototype.setPeer = function(peer) {
		this.peer = peer;
		return this;
	}
	jsuis.Object.prototype.getElement = function() {
		return this.element;
	}
	jsuis.Object.prototype.setElement = function(element) {
		this.element = element;
		return this;
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
}) (jsuis);
