function nvl(value, defaultValue) {
	if ((value === null) || (value === undefined)) {
		return defaultValue;
	}
	return value;
}
function uvl(value, defaultValue) {
	if (value === undefined) {
		return defaultValue;
	}
	return value;
}
function println(text) {
	console.log(text);
}

/**
 * jsuis
 */
jsuis = {};

/**
 * jsuis.packages
 */
jsuis.packages = {};
jsuis.packages["jsuis"] = jsuis;

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
	jsuis.Object.merge = function() {
		var object = {};
		for (var i = 0; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) {
				object[key] = source[key];
			}
		}
		return object;
	}
	jsuis.Object.create = function(proto) {
		if (jsuis.Object.isObject(proto)) {
			var source = function() {};
			source.prototype = {};
			for (var key in proto) {
				var value = proto[key];
				if (jsuis.Object.isFunction(value)) {
					source.prototype[key] = value;
				}
			}
			var object = new source();
			for (var key in proto) {
				var value = proto[key];
				if (!jsuis.Object.isFunction(value)) {
					object[key] = jsuis.Object.create(value);
				}
			}
			return object;
		}
		if (jsuis.Object.isArray(proto)) {
			var array = [];
			for (var i = 0; i < proto.length; i++) {
				array.push(jsuis.Object.create(proto[i]));
			}
			return array;
		}
		return JSON.parse(JSON.stringify(proto));
	}
	jsuis.Object.values = function(object) {
		var values = [];
		for (var key in object) {
			var value = object[key];
			values.push(value);
		}
		return values;
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
	jsuis.Object.isBoolean = function(value) {
		return (typeof value === "boolean");
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
	jsuis.Object.getClassName = function(constructor) {
		var className = constructor.className;
		if (className) {
			return className;
		}
		// un pour tous, tous pour un
		for (var prefix in jsuis.packages) {
			var p = jsuis.packages[prefix];
			for (var name in p) {
				var c = p[name];
				var className = prefix + "." + name;
				c.className = className;
			}
		}
		return constructor.className;
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

/**
 * jsuis.svg
 */
jsuis.lf = {};
jsuis.packages["jsuis.lf"] = jsuis.lf;

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

/**
 * jsuis.Border
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Border = jsuis.Object.extend(SUPER, function() {
	});
	jsuis.Border.prototype.paintBorder = function(component) {
		var peer = this.getPeer();
		peer.paintBorder(component);
	}
	jsuis.Border.prototype.getBorderInsets = function(component) {
		var peer = this.getPeer();
		return peer.getBorderInsets(component);
	}
	jsuis.Border.prototype.getBorderOutsets = function(component) {
		var peer = this.getPeer();
		return peer.getBorderOutsets(component);
	}
	jsuis.Border.prototype.getBorderOffsets = function(component) {
		var peer = this.getPeer();
		return peer.getBorderOffsets(component);
	}
}) (jsuis);

/**
 * jsuis.ButtonGroup
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.ButtonGroup = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
		this.setButtons([]);
	});
	jsuis.Object.addProperties(jsuis.ButtonGroup, {
		buttons: null,
		selection: null
	});
	jsuis.ButtonGroup.prototype.add = function(button) {
		var buttons = this.getButtons();
		buttons.push(button);
		button.setGroup(this);
	}
	jsuis.ButtonGroup.prototype.remove = function(button) {
		var buttons = this.getButtons();
		var index = buttons.indexOf(button);
		if (index === -1) {
			return;
		}
		buttons.splice(index, 1);
		var selection = this.getSelection();
		if (button === selection) {
			this.setSelection(null);
		}
		button.setGroup(null);
	}
	jsuis.ButtonGroup.prototype.isSelected = function(button) {
		var selection = this.getSelection();
		return (button === selection);
	}
	jsuis.ButtonGroup.prototype.setSelected = function(button) {
		var selection = this.getSelection();
		if (selection === button) {
			return;
		}
		if (selection) {
			selection.setSelected(false);
		} else {
			var buttons = this.getButtons();
			for (var i = 0; i < buttons.length; i++) {
				var b = buttons[i];
				if (b !== button) {
					b.setSelected(false);
				}
			}
		}
		this.setSelection(button);
		if (button && !button.isSelected()) {
			button.setSelected(true);
		}
		return this;
	}
}) (jsuis);

/**
 * jsuis.CardGroup
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.CardGroup = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
		this.setCards([]);
	});
	jsuis.Object.addProperties(jsuis.CardGroup, {
		cards: null,
		selection: null
	});
	jsuis.CardGroup.prototype.add = function(card) {
		var cards = this.getCards();
		cards.push(card);
		card.setVisible(false);
	}
	jsuis.CardGroup.prototype.remove = function(card) {
		var cards = this.getCards();
		var index = cards.indexOf(card);
		if (index === -1) {
			return;
		}
		cards.splice(index, 1);
		var selection = this.getSelection();
		if (card === selection) {
			this.setSelection(null);
		}
	}
	jsuis.CardGroup.prototype.setVisible = function(card) {
		var oldSelection = this.getSelection();
		if (oldSelection) {
			oldSelection.setVisible(false);
		}
		this.setSelection(card);
		if (card) {
			card.setVisible(true);
		}
		return this;
	}
}) (jsuis);

/**
 * jsuis.Cloneable
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Cloneable = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.Cloneable.prototype.clone = function() {
		return null;
	}
}) (jsuis);

/**
 * jsuis.Color
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Color = jsuis.Object.extend(SUPER, function(r, g, b, a) {
		SUPER.prototype.constructor.call(this);
		this.setR(nvl(r, 0));
		this.setG(nvl(g, 0));
		this.setB(nvl(b, 0));
		this.setA(nvl(a, 255));
	});
	jsuis.Object.addProperties(jsuis.Color, {
		r: 0,
		g: 0,
		b: 0,
		a: 0
	});
	jsuis.Color.getColor = function(rgb, a) {
		return new jsuis.Color((rgb >> 16) & 0xFF, (rgb >> 8) & 0xFF, (rgb >> 0) & 0xFF, a);
	}
	jsuis.Color.prototype.getRed = function() {
		return this.getR();
	}
	jsuis.Color.prototype.getGreen = function() {
		return this.getG();
	}
	jsuis.Color.prototype.getBlue = function() {
		return this.getB();
	}
	jsuis.Color.prototype.getAlpha = function() {
		return this.getA();
	}
	jsuis.Color.prototype.withRed = function(red) {
		return this.clone().setR(red);
	}
	jsuis.Color.prototype.withGreen = function(green) {
		return this.clone().setG(green);
	}
	jsuis.Color.prototype.withBlue = function(blue) {
		return this.clone().setB(blue);
	}
	jsuis.Color.prototype.withAlpha = function(alpha) {
		return this.clone().setA(alpha);
	}
	jsuis.Color.prototype.clone = function() {
		return new jsuis.Color(this.getR(), this.getG(), this.getB(), this.getA());
	}
	jsuis.Color.prototype.toString = function() {
		return "rgba(" + this.getR() + "," + this.getG() + "," + this.getB() + "," + (this.getA() / 255) + ")";
	}
	var COLORS = {
			AliceBlue: jsuis.Color.getColor(0xF0F8FF),
			AntiqueWhite: jsuis.Color.getColor(0xFAEBD7),
			Aqua: jsuis.Color.getColor(0x00FFFF),
			Aquamarine: jsuis.Color.getColor(0x7FFFD4),
			Azure: jsuis.Color.getColor(0xF0FFFF),
			Beige: jsuis.Color.getColor(0xF5F5DC),
			Bisque: jsuis.Color.getColor(0xFFE4C4),
			Black: jsuis.Color.getColor(0x000000),
			BlanchedAlmond: jsuis.Color.getColor(0xFFEBCD),
			Blue: jsuis.Color.getColor(0x0000FF),
			BlueViolet: jsuis.Color.getColor(0x8A2BE2),
			Brown: jsuis.Color.getColor(0xA52A2A),
			BurlyWood: jsuis.Color.getColor(0xDEB887),
			CadetBlue: jsuis.Color.getColor(0x5F9EA0),
			Chartreuse: jsuis.Color.getColor(0x7FFF00),
			Chocolate: jsuis.Color.getColor(0xD2691E),
			Coral: jsuis.Color.getColor(0xFF7F50),
			CornflowerBlue: jsuis.Color.getColor(0x6495ED),
			Cornsilk: jsuis.Color.getColor(0xFFF8DC),
			Crimson: jsuis.Color.getColor(0xDC143C),
			Cyan: jsuis.Color.getColor(0x00FFFF),
			DarkBlue: jsuis.Color.getColor(0x00008B),
			DarkCyan: jsuis.Color.getColor(0x008B8B),
			DarkGoldenRod: jsuis.Color.getColor(0xB8860B),
			DarkGray: jsuis.Color.getColor(0xA9A9A9),
			DarkGrey: jsuis.Color.getColor(0xA9A9A9),
			DarkGreen: jsuis.Color.getColor(0x006400),
			DarkKhaki: jsuis.Color.getColor(0xBDB76B),
			DarkMagenta: jsuis.Color.getColor(0x8B008B),
			DarkOliveGreen: jsuis.Color.getColor(0x556B2F),
			DarkOrange: jsuis.Color.getColor(0xFF8C00),
			DarkOrchid: jsuis.Color.getColor(0x9932CC),
			DarkRed: jsuis.Color.getColor(0x8B0000),
			DarkSalmon: jsuis.Color.getColor(0xE9967A),
			DarkSeaGreen: jsuis.Color.getColor(0x8FBC8F),
			DarkSlateBlue: jsuis.Color.getColor(0x483D8B),
			DarkSlateGray: jsuis.Color.getColor(0x2F4F4F),
			DarkSlateGray: jsuis.Color.getColor(0x2F4F4F),
			DarkTurquoise: jsuis.Color.getColor(0x00CED1),
			DarkViolet: jsuis.Color.getColor(0x9400D3),
			DeepPink: jsuis.Color.getColor(0xFF1493),
			DeepSkyBlue: jsuis.Color.getColor(0x00BFFF),
			DimGray: jsuis.Color.getColor(0x696969),
			DimGrey: jsuis.Color.getColor(0x696969),
			DodgerBlue: jsuis.Color.getColor(0x1E90FF),
			FireBrick: jsuis.Color.getColor(0xB22222),
			FloralWhite: jsuis.Color.getColor(0xFFFAF0),
			ForestGreen: jsuis.Color.getColor(0x228B22),
			Fuchsia: jsuis.Color.getColor(0xFF00FF),
			Gainsboro: jsuis.Color.getColor(0xDCDCDC),
			GhostWhite: jsuis.Color.getColor(0xF8F8FF),
			Gold: jsuis.Color.getColor(0xFFD700),
			GoldenRod: jsuis.Color.getColor(0xDAA520),
			Gray: jsuis.Color.getColor(0x808080),
			Grey: jsuis.Color.getColor(0x808080),
			Green: jsuis.Color.getColor(0x008000),
			GreenYellow: jsuis.Color.getColor(0xADFF2F),
			HoneyDew: jsuis.Color.getColor(0xF0FFF0),
			HotPink: jsuis.Color.getColor(0xFF69B4),
			IndianRed: jsuis.Color.getColor(0xCD5C5C),
			Indigo: jsuis.Color.getColor(0x4B0082),
			Ivory: jsuis.Color.getColor(0xFFFFF0),
			Khaki: jsuis.Color.getColor(0xF0E68C),
			Lavender: jsuis.Color.getColor(0xE6E6FA),
			LavenderBlush: jsuis.Color.getColor(0xFFF0F5),
			LawnGreen: jsuis.Color.getColor(0x7CFC00),
			LemonChiffon: jsuis.Color.getColor(0xFFFACD),
			LightBlue: jsuis.Color.getColor(0xADD8E6),
			LightCoral: jsuis.Color.getColor(0xF08080),
			LightCyan: jsuis.Color.getColor(0xE0FFFF),
			LightGoldenRodYellow: jsuis.Color.getColor(0xFAFAD2),
			LightGray: jsuis.Color.getColor(0xD3D3D3),
			LightGrey: jsuis.Color.getColor(0xD3D3D3),
			LightGreen: jsuis.Color.getColor(0x90EE90),
			LightPink: jsuis.Color.getColor(0xFFB6C1),
			LightSalmon: jsuis.Color.getColor(0xFFA07A),
			LightSeaGreen: jsuis.Color.getColor(0x20B2AA),
			LightSkyBlue: jsuis.Color.getColor(0x87CEFA),
			LightSlateGray: jsuis.Color.getColor(0x778899),
			LightSlateGrey: jsuis.Color.getColor(0x778899),
			LightSteelBlue: jsuis.Color.getColor(0xB0C4DE),
			LightYellow: jsuis.Color.getColor(0xFFFFE0),
			Lime: jsuis.Color.getColor(0x00FF00),
			LimeGreen: jsuis.Color.getColor(0x32CD32),
			Linen: jsuis.Color.getColor(0xFAF0E6),
			Magenta: jsuis.Color.getColor(0xFF00FF),
			Maroon: jsuis.Color.getColor(0x800000),
			MediumAquaMarine: jsuis.Color.getColor(0x66CDAA),
			MediumBlue: jsuis.Color.getColor(0x0000CD),
			MediumOrchid: jsuis.Color.getColor(0xBA55D3),
			MediumPurple: jsuis.Color.getColor(0x9370DB),
			MediumSeaGreen: jsuis.Color.getColor(0x3CB371),
			MediumSlateBlue: jsuis.Color.getColor(0x7B68EE),
			MediumSpringGreen: jsuis.Color.getColor(0x00FA9A),
			MediumTurquoise: jsuis.Color.getColor(0x48D1CC),
			MediumVioletRed: jsuis.Color.getColor(0xC71585),
			MidnightBlue: jsuis.Color.getColor(0x191970),
			MintCream: jsuis.Color.getColor(0xF5FFFA),
			MistyRose: jsuis.Color.getColor(0xFFE4E1),
			Moccasin: jsuis.Color.getColor(0xFFE4B5),
			NavajoWhite: jsuis.Color.getColor(0xFFDEAD),
			Navy: jsuis.Color.getColor(0x000080),
			OldLace: jsuis.Color.getColor(0xFDF5E6),
			Olive: jsuis.Color.getColor(0x808000),
			OliveDrab: jsuis.Color.getColor(0x6B8E23),
			Orange: jsuis.Color.getColor(0xFFA500),
			OrangeRed: jsuis.Color.getColor(0xFF4500),
			Orchid: jsuis.Color.getColor(0xDA70D6),
			PaleGoldenRod: jsuis.Color.getColor(0xEEE8AA),
			PaleGreen: jsuis.Color.getColor(0x98FB98),
			PaleTurquoise: jsuis.Color.getColor(0xAFEEEE),
			PaleVioletRed: jsuis.Color.getColor(0xDB7093),
			PapayaWhip: jsuis.Color.getColor(0xFFEFD5),
			PeachPuff: jsuis.Color.getColor(0xFFDAB9),
			Peru: jsuis.Color.getColor(0xCD853F),
			Pink: jsuis.Color.getColor(0xFFC0CB),
			Plum: jsuis.Color.getColor(0xDDA0DD),
			PowderBlue: jsuis.Color.getColor(0xB0E0E6),
			Purple: jsuis.Color.getColor(0x800080),
			RebeccaPurple: jsuis.Color.getColor(0x663399),
			Red: jsuis.Color.getColor(0xFF0000),
			RosyBrown: jsuis.Color.getColor(0xBC8F8F),
			RoyalBlue: jsuis.Color.getColor(0x4169E1),
			SaddleBrown: jsuis.Color.getColor(0x8B4513),
			Salmon: jsuis.Color.getColor(0xFA8072),
			SandyBrown: jsuis.Color.getColor(0xF4A460),
			SeaGreen: jsuis.Color.getColor(0x2E8B57),
			SeaShell: jsuis.Color.getColor(0xFFF5EE),
			Sienna: jsuis.Color.getColor(0xA0522D),
			Silver: jsuis.Color.getColor(0xC0C0C0),
			SkyBlue: jsuis.Color.getColor(0x87CEEB),
			SlateBlue: jsuis.Color.getColor(0x6A5ACD),
			SlateGray: jsuis.Color.getColor(0x708090),
			SlateGrey: jsuis.Color.getColor(0x708090),
			Snow: jsuis.Color.getColor(0xFFFAFA),
			SpringGreen: jsuis.Color.getColor(0x00FF7F),
			SteelBlue: jsuis.Color.getColor(0x4682B4),
			Tan: jsuis.Color.getColor(0xD2B48C),
			Teal: jsuis.Color.getColor(0x008080),
			Thistle: jsuis.Color.getColor(0xD8BFD8),
			Tomato: jsuis.Color.getColor(0xFF6347),
			Turquoise: jsuis.Color.getColor(0x40E0D0),
			Violet: jsuis.Color.getColor(0xEE82EE),
			Wheat: jsuis.Color.getColor(0xF5DEB3),
			White: jsuis.Color.getColor(0xFFFFFF),
			WhiteSmoke: jsuis.Color.getColor(0xF5F5F5),
			Yellow: jsuis.Color.getColor(0xFFFF00),
			YellowGreen: jsuis.Color.getColor(0x9ACD32)
	};
	for (var key in COLORS) {
		jsuis.Color[key] = COLORS[key];
		jsuis.Color[key.toUpperCase()] = COLORS[key];
		jsuis.Color[key.charAt(0).toLowerCase() + key.slice(1)] = COLORS[key];
		jsuis.Color[key.replace(/([A-Z])/g, "_$1").slice(1).toUpperCase()] = COLORS[key];
	}
}) (jsuis);

/**
 * jsuis.Component
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Component = jsuis.Object.extend(SUPER, function(element) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Component(element));
	});
	jsuis.Object.addPeerProperties(jsuis.Component, {
		element: null,
		name: null,
		components: null,
		// parent: null,
		layout: null,
		constraints: null,
		x: 0,
		y: 0,
		location: null,
		width: 0,
		height: 0,
		size: null,
		preferredSize: null,
		preferredScrollableViewportSize: null,
		minimumSize: null,
		bounds: null,
		padding: null,
		margin: null,
		border: null,
		insets: null,
		outsets: null,
		opaque: null,
		background: null,
		foreground: null,
		font: null,
		icon: null,
		cursor: null,
		actionCommand: null
	});
	jsuis.Component.prototype.add = function(component, constraints, index) {
		var peer = this.getPeer();
		peer.add(component, constraints, index);
	}
	jsuis.Component.prototype.remove = function(component) {
		var peer = this.getPeer();
		peer.remove(component);
	}
	jsuis.Component.prototype.removeAll = function() {
		var peer = this.getPeer();
		peer.removeAll();
	}
	jsuis.Component.prototype.isLeftToRight = function() {
		var peer = this.getPeer();
		return peer.isLeftToRight();
	}
	jsuis.Component.prototype.setLeftToRight = function(leftToRight) {
		var peer = this.getPeer();
		peer.setLeftToRight(leftToRight);
		return this;
	}
	jsuis.Component.prototype.validate = function() {
		var peer = this.getPeer();
		peer.validate();
	}
	jsuis.Component.prototype.paint = function() {
		var peer = this.getPeer();
		peer.paint();
	}
	jsuis.Component.prototype.getOffsets = function() {
		var peer = this.getPeer();
		return peer.getOffsets();
	}
	jsuis.Component.prototype.isVisible = function() {
		var peer = this.getPeer();
		return peer.isVisible();
	}
	jsuis.Component.prototype.setVisible = function(visible) {
		var peer = this.getPeer();
		peer.setVisible(visible);
		return this;
	}
	jsuis.Component.prototype.isEnabled = function() {
		var peer = this.getPeer();
		return peer.isEnabled();
	}
	jsuis.Component.prototype.setEnabled = function(enabled) {
		var peer = this.getPeer();
		peer.setEnabled(enabled);
		return this;
	}
	jsuis.Component.prototype.isPressed = function() {
		var peer = this.getPeer();
		return peer.isPressed();
	}
	jsuis.Component.prototype.setPressed = function(pressed) {
		var peer = this.getPeer();
		peer.setPressed(pressed);
		return this;
	}
	jsuis.Component.prototype.requestFocus = function() {
		var peer = this.getPeer();
		peer.requestFocus();
	}
	jsuis.Component.prototype.addComponentListener = function(componentListener) {
		var peer = this.getPeer();
		peer.addComponentListener(componentListener);
	}
	jsuis.Component.prototype.removeComponentListener = function(componentListener) {
		var peer = this.getPeer();
		peer.removeComponentListener(componentListener);
	}
	jsuis.Component.prototype.addMouseAdapter = function(mouseAdapter) {
		var peer = this.getPeer();
		peer.addMouseAdapter(mouseAdapter);
	}
	jsuis.Component.prototype.removeMouseAdapter = function(mouseAdapter) {
		var peer = this.getPeer();
		peer.removeMouseAdapter(mouseAdapter);
	}
	jsuis.Component.prototype.addMouseListener = function(mouseListener) {
		var peer = this.getPeer();
		peer.addMouseListener(mouseListener);
	}
	jsuis.Component.prototype.removeMouseListener = function(mouseListener) {
		var peer = this.getPeer();
		peer.removeMouseListener(mouseListener);
	}
	jsuis.Component.prototype.addMouseMotionListener = function(mouseMotionListener) {
		var peer = this.getPeer();
		peer.addMouseMotionListener(mouseMotionListener);
	}
	jsuis.Component.prototype.removeMouseMotionListener = function(mouseMotionListener) {
		var peer = this.getPeer();
		peer.removeMouseMotionListener(mouseMotionListener);
	}
	jsuis.Component.prototype.addFocusListener = function(focusListener) {
		var peer = this.getPeer();
		peer.addFocusListener(focusListener);
	}
	jsuis.Component.prototype.removeFocusListener = function(focusListener) {
		var peer = this.getPeer();
		peer.removeFocusListener(focusListener);
	}
	jsuis.Component.prototype.addActionListener = function(actionListener) {
		var peer = this.getPeer();
		peer.addActionListener(actionListener);
	}
	jsuis.Component.prototype.removeActionListener = function(actionListener) {
		var peer = this.getPeer();
		peer.removeActionListener(actionListener);
	}
}) (jsuis);

/**
 * jsuis.Constants
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Constants = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	
	jsuis.Constants.SVG = "http://www.w3.org/2000/svg";
	
	var CONSTANTS = {
			ABOVE_BASELINE: "",
			ABOVE_BASELINE_LEADING: "",
			ABOVE_BASELINE_TRAILING: "",
			ACTION_PERFORMED: "",
			AFTER_LAST_LINE: "",
			AFTER_LINE_ENDS: "",
			APPROVE_OPTION: "",
			BASELINE: "",
			BASELINE_LEADING: "",
			BASELINE_TRAILING: "",
			BELOW_BASELINE: "",
			BELOW_BASELINE_LEADING: "",
			BELOW_BASELINE_TRAILING: "",
			BEFORE_FIRST_LINE: "",
			BEFORE_LINE_BEGINS: "",
			BOTH: "",
			BOTTOM: "",
			CANCEL_OPTION: "",
			CENTER: "",
			COMPONENT_MOVED: "",
			COMPONENT_RESIZED: "",
			EAST: "",
			ERROR_OPTION: "",
			FIRST_LINE_END: "",
			FIRST_LINE_START: "",
			FOCUS_GAINED: "",
			FOCUS_LOST: "",
			HORIZONTAL: "",
			HORIZONTAL_SCROLLBAR_ALWAYS: "",
			HORIZONTAL_SCROLLBAR_AS_NEEDED: "",
			HORIZONTAL_SCROLLBAR_NEVER: "",
			LAST_LINE_END: "",
			LAST_LINE_START: "",
			LEADING: "",
			LEFT: "",
			LINE_END: "",
			LINE_START: "",
			MOUSE_CLICKED: "",
			MOUSE_DRAGGED: "",
			MOUSE_ENTERED: "",
			MOUSE_EXITED: "",
			MOUSE_MOVED: "",
			MOUSE_PRESSED: "",
			MOUSE_RELEASED: "",
			NEXT: "",
			NONE: "",
			NORTH: "",
			NORTHEAST: "",
			NORTHWEST: "",
			NORTH_EAST: "",
			NORTH_WEST: "",
			PAGE_END: "",
			PAGE_START: "",
			PREVIOUS: "",
			RELATIVE: "",
			REMAINDER: "",
			RIGHT: "",
			SOUTH: "",
			SOUTHEAST: "",
			SOUTHWEST: "",
			SOUTH_EAST: "",
			SOUTH_WEST: "",
			TOP: "",
			TOUCH_PRESSED: "",
			TOUCH_RELEASED: "",
			TOUCH_MOVED: "",
			TRAILING: "",
			VERTICAL: "",
			VERTICAL_SCROLLBAR_ALWAYS: "",
			VERTICAL_SCROLLBAR_AS_NEEDED: "",
			VERTICAL_SCROLLBAR_NEVER: "",
			WEST: ""
	}
	
	for (var key in CONSTANTS) {
		jsuis.Constants[key] = (key.charAt(0) + key.slice(1).toLowerCase())
				.replace(/_([a-z])/g, function(g) {
					return g[1].toUpperCase()
				});
	}

	jsuis.Constants.FRAME_CONTENT_LAYER = -30000;
	jsuis.Constants.DEFAULT_LAYER = 0;
	jsuis.Constants.PALETTE_LAYER = 100;
	jsuis.Constants.MODAL_LAYER = 200;
	jsuis.Constants.POPUP_LAYER = 300;
	jsuis.Constants.DRAG_LAYER = 400;
	
})(jsuis);

/**
 * jsuis.Cursor
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Cursor = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	
	jsuis.Cursor.COPY = "copy";
	jsuis.Cursor.CROSSHAIR_CURSOR = "crosshair";
	jsuis.Cursor.DEFAULT_CURSOR = "default";
	jsuis.Cursor.E_RESIZE_CURSOR = "e-resize";
	jsuis.Cursor.HAND_CURSOR = "pointer";
	jsuis.Cursor.MOVE_CURSOR = "move";
	jsuis.Cursor.N_RESIZE_CURSOR = "n-resize";
	jsuis.Cursor.NE_RESIZE_CURSOR = "ne-resize";
	jsuis.Cursor.NW_RESIZE_CURSOR = "nw-resize";
	jsuis.Cursor.S_RESIZE_CURSOR = "s-resize";
	jsuis.Cursor.SE_RESIZE_CURSOR = "se-resize";
	jsuis.Cursor.SW_RESIZE_CURSOR = "sw-resize";
	jsuis.Cursor.TEXT_CURSOR = "text";
	jsuis.Cursor.W_RESIZE_CURSOR = "w-resize";
	jsuis.Cursor.WAIT_CURSOR = "wait";
	
}) (jsuis);

/**
 * jsuis.Dimension
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Dimension = jsuis.Object.extend(SUPER, function(width, height) {
		SUPER.prototype.constructor.call(this);
		width = nvl(width, 0);
		height = nvl(height, width);
		this.setWidth(width);
		this.setHeight(height);
	});
	jsuis.Object.addProperties(jsuis.Dimension, {
		width: 0,
		height: 0
	});
	jsuis.Dimension.prototype.add = function(dimension) {
		var width = this.getWidth() + dimension.getWidth();
		var height = this.getHeight() + dimension.getHeight();
		return new jsuis.Dimension(width, height);
	}
	jsuis.Dimension.prototype.subtract = function(dimension) {
		var width = this.getWidth() - dimension.getWidth();
		var height = this.getHeight() - dimension.getHeight();
		return new jsuis.Dimension(width, height);
	}
	jsuis.Dimension.prototype.clone = function() {
		return new jsuis.Dimension(this.getWidth(), this.getHeight());
	}
}) (jsuis);

/**
 * jsuis.Event
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Event = jsuis.Object.extend(SUPER, function(event) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Event(event));
	});
	jsuis.Object.addPeerProperties(jsuis.Event, {
		source: null,
		id: null
	});
}) (jsuis);

/**
 * jsuis.Font
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Font = jsuis.Object.extend(SUPER, function(name, style, size) {
		SUPER.prototype.constructor.call(this);
		this.setName(name);
		this.setStyle(style);
		this.setSize(size);
	});
	jsuis.Object.addProperties(jsuis.Font, {
		name: null,
		style: null,
		size: 0
	});
	
	jsuis.Font.NORMAL = "normal";
	jsuis.Font.ITALIC = "italic";
	jsuis.Font.OBLIQUE = "oblique";
	
}) (jsuis);

/**
 * jsuis.Icon
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Icon = jsuis.Object.extend(SUPER, function() {
	});
	jsuis.Object.addPeerProperties(jsuis.Icon, {
		iconWidth: 0,
		iconHeight: 0
	});
	jsuis.Icon.prototype.paintIcon = function(component) {
		var peer = this.getPeer();
		return peer.paintIcon(component);
	}
}) (jsuis);

/**
 * Insets
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Insets = jsuis.Object.extend(SUPER, function(top, left, bottom, right) {
		SUPER.prototype.constructor.call(this);
		top = nvl(top, 0);
		left = nvl(left, top);
		bottom = nvl(bottom, top);
		right = nvl(right, left);
		this.setTop(top);
		this.setLeft(left);
		this.setBottom(bottom);
		this.setRight(right);
	});
	jsuis.Object.addProperties(jsuis.Insets, {
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	});
	jsuis.Insets.prototype.getPoint = function() {
		return new jsuis.Point(this.getLeft(), this.getTop());
	}
	jsuis.Insets.prototype.getDimension = function() {
		return new jsuis.Dimension(this.getLeft() + this.getRight(), this.getTop() + this.getBottom());
	}
	jsuis.Insets.prototype.add = function(insets) {
		var top = this.getTop() + insets.getTop();
		var left = this.getLeft() + insets.getLeft();
		var bottom = this.getBottom() + insets.getBottom();
		var right = this.getRight() + insets.getRight();
		return new jsuis.Insets(top, left, bottom, right);
	}
	jsuis.Insets.prototype.subtract = function(insets) {
		var top = this.getTop() - insets.getTop();
		var left = this.getLeft() - insets.getLeft();
		var bottom = this.getBottom() - insets.getBottom();
		var right = this.getRight() - insets.getRight();
		return new jsuis.Insets(top, left, bottom, right);
	}
	jsuis.Insets.prototype.clone = function() {
		return new jsuis.Insets(this.getTop(), this.getLeft(), this.getBottom(), this.getRight());
	}
})(jsuis);

/**
 * jsuis.Layout
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Layout = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.Layout.prototype.addLayoutComponent = function(name, comp) {
	}
	jsuis.Layout.prototype.removeLayoutComponent = function(comp) {
	}
	jsuis.Layout.prototype.preferredLayoutSize = function(parent) {
		return new jsuis.Dimension();
	}
	jsuis.Layout.prototype.minimumLayoutSize = function(parent) {
		return this.preferredLayoutSize(parent);
	}
	jsuis.Layout.prototype.layoutContainer = function(parent) {
		var components = parent.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			var constraints = component.getConstraints();
			var bounds = constraints.getBounds();
			if (bounds) {
				var x = bounds.getX();
				var y = bounds.getY();
				var width = bounds.getWidth();
				var height = bounds.getHeight();
				var anchor = constraints.getAnchor();
				var fill = constraints.getFill();
				if (fill !== jsuis.Constants.BOTH) {
					var preferredSize = component.getPreferredSize();
					var preferredWidth = preferredSize.getWidth();
					var preferredHeight = preferredSize.getHeight();
					switch (anchor) {
					case jsuis.Constants.NORTH:
					case jsuis.Constants.PAGE_START:
						if (fill === jsuis.Constants.HORIZONTAL) {
							height = preferredHeight;
						} else if (fill === jsuis.Constants.VERTICAL) {
							x += (width - preferredWidth) / 2;
							width = preferredWidth;
						} else {
							x += (width - preferredWidth) / 2;
							width = preferredWidth;
							height = preferredHeight;
						}
						break;
					case jsuis.Constants.SOUTH:
					case jsuis.Constants.PAGE_END:
						if (fill === jsuis.Constants.HORIZONTAL) {
							y += height - preferredHeight;
							height = preferredHeight;
						} else if (fill === jsuis.Constants.VERTICAL) {
							x += (width - preferredWidth) / 2;
							width = preferredWidth;
						} else {
							x += (width - preferredWidth) / 2;
							y += height - preferredHeight;
							width = preferredWidth;
							height = preferredHeight;
						}
						break;
					case jsuis.Constants.WEST:
					case jsuis.Constants.LINE_START:
						if (fill === jsuis.Constants.HORIZONTAL) {
							y += (height - preferredHeight) / 2;
							height = preferredHeight;
						} else if (fill === jsuis.Constants.VERTICAL) {
							width = preferredWidth;
						} else {
							y += (height - preferredHeight) / 2;
							width = preferredWidth;
							height = preferredHeight;
						}
						break;
					case jsuis.Constants.EAST:
					case jsuis.Constants.LINE_END:
						if (fill === jsuis.Constants.HORIZONTAL) {
							y += (height - preferredHeight) / 2;
							height = preferredHeight;
						} else if (fill === jsuis.Constants.VERTICAL) {
							x += width - preferredWidth;
							width = preferredWidth;
						} else {
							x += width - preferredWidth;
							y += (height - preferredHeight) / 2;
							width = preferredWidth;
							height = preferredHeight;
						}
						break;
					case jsuis.Constants.NORTHWEST:
					case jsuis.Constants.NORTH_WEST:
					case jsuis.Constants.FIRST_LINE_START:
						if (fill === jsuis.Constants.HORIZONTAL) {
							height = preferredHeight;
						} else if (fill === jsuis.Constants.VERTICAL) {
							width = preferredWidth;
						} else {
							width = preferredWidth;
							height = preferredHeight;
						}
						break;
					case jsuis.Constants.NORTHEAST:
					case jsuis.Constants.NORTH_EAST:
					case jsuis.Constants.FIRST_LINE_END:
						if (fill === jsuis.Constants.HORIZONTAL) {
							height = preferredHeight;
						} else if (fill === jsuis.Constants.VERTICAL) {
							x += width - preferredWidth;
							width = preferredWidth;
						} else {
							x += width - preferredWidth;
							width = preferredWidth;
							height = preferredHeight;
						}
						break;
					case jsuis.Constants.SOUTHWEST:
					case jsuis.Constants.SOUTH_WEST:
					case jsuis.Constants.LAST_LINE_START:
						if (fill === jsuis.Constants.HORIZONTAL) {
							y += height - preferredHeight;
							height = preferredHeight;
						} else if (fill === jsuis.Constants.VERTICAL) {
							width = preferredWidth;
						} else {
							y += height - preferredHeight;
							width = preferredWidth;
							height = preferredHeight;
						}
						break;
					case jsuis.Constants.SOUTHEAST:
					case jsuis.Constants.SOUTH_EAST:
					case jsuis.Constants.LAST_LINE_END:
						if (fill === jsuis.Constants.HORIZONTAL) {
							y += height - preferredHeight;
							height = preferredHeight;
						} else if (fill === jsuis.Constants.VERTICAL) {
							x += width - preferredWidth;
							width = preferredWidth;
						} else {
							x += width - preferredWidth;
							y += height - preferredHeight;
							width = preferredWidth;
							height = preferredHeight;
						}
						break;
					case jsuis.Constants.CENTER:
					default:
						if (fill === jsuis.Constants.HORIZONTAL) {
							y += (height - preferredHeight) / 2;
							height = preferredHeight;
						} else if (fill === jsuis.Constants.VERTICAL) {
							x += (width - preferredWidth) / 2;
							width = preferredWidth;
						} else {
							x += (width - preferredWidth) / 2;
							y += (height - preferredHeight) / 2;
							width = preferredWidth;
							height = preferredHeight;
						}
					}
				}
				component.setBounds(new jsuis.Rectangle(Math.round(x), Math.round(y), width, height));
			}
		}
	}
}) (jsuis);

/**
 * jsuis.Listener
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Listener = jsuis.Object.extend(SUPER, function(listener) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Listener(listener));
	});
	jsuis.Object.addPeerProperties(jsuis.Listener, {
		element: null,
		listener: null,
		listenerComponent: null
	});
}) (jsuis);

/**
 * jsuis.Loader
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Loader = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Loader());
	});
	jsuis.Loader.getInstance = function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		return jsuis[lookAndFeel].Loader.getInstance();
	}
	jsuis.Loader.prototype.add = function(resources) {
		var peer = this.getPeer();
		peer.add(resources);
	}
	jsuis.Loader.prototype.getResource = function(name) {
		var peer = this.getPeer();
		return peer.getResource(name);
	}
}) (jsuis);

/**
 * jsuis.Locale
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Locale = jsuis.Object.extend(SUPER, function(language, country) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Locale(language, country));
	});
	jsuis.Locale.getDefault = function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		return jsuis[lookAndFeel].Locale.getDefault();
	}
	jsuis.Locale.prototype.toString = function() {
		var peer = this.getPeer();
		return peer.toString();
	}
}) (jsuis);

/**
 * jsuis.Point
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Point = jsuis.Object.extend(SUPER, function(x, y) {
		SUPER.prototype.constructor.call(this);
		this.setX(nvl(x, 0));
		this.setY(nvl(y, 0));
	});
	jsuis.Object.addProperties(jsuis.Point, {
		x: 0,
		y: 0
	});
	jsuis.Point.prototype.add = function(point) {
		this.setX(this.getX() + point.getX());
		this.setY(this.getY() + point.getY());
	}
	jsuis.Point.prototype.clone = function() {
		return new jsuis.Point(this.getX(), this.getY());
	}
}) (jsuis);

/**
 * jsuis.Properties
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Properties = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Properties());
	});
	jsuis.Properties.getInstance = function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		return jsuis[lookAndFeel].Properties.getInstance();
	}
	jsuis.Properties.prototype.getProperty = function(key) {
		var peer = this.getPeer();
		return peer.getProperty(key);
	}
	jsuis.Properties.prototype.getProperty = function(key, defaultValue) {
		var peer = this.getPeer();
		return peer.getProperty(key, defaultValue);
	}
	jsuis.Properties.prototype.setProperty = function(key, value) {
		var peer = this.getPeer();
		peer.setProperty(key, value);
		return this;
	}
	jsuis.Properties.prototype.get = function(key) {
		var peer = this.getPeer();
		return peer.get(key);
	}
	jsuis.Properties.prototype.set = function(key, value) {
		var peer = this.getPeer();
		peer.set(key, value);
		return this;
	}
	jsuis.Properties.prototype.load = function(properties) {
		var peer = this.getPeer();
		peer.load(properties);
	}
	jsuis.Properties.prototype.store = function(properties, comments) {
		var peer = this.getPeer();
		peer.store(properties, comments);
	}
}) (jsuis);

/**
 * jsuis.PropertyChangeEvent
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.PropertyChangeEvent = jsuis.Object.extend(SUPER, function(source, propertyName, oldValue, newValue) {
		SUPER.prototype.constructor.call(this);
		this.setSource(source);
		this.setPropertyName(propertyName);
		this.setOldValue(oldValue);
		this.setNewValue(newValue);
	});
	jsuis.Object.addProperties(jsuis.PropertyChangeEvent, {
		source: null,
		propertyName: null,
		oldValue: null,
		newValue: null
	});
}) (jsuis);

/**
 * jsuis.PropertyChangeSupport
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.PropertyChangeSupport = jsuis.Object.extend(SUPER, function(source) {
		this.setSource(source);
		this.setPropertyChangeListeners({});
	});
	jsuis.Object.addProperties(jsuis.PropertyChangeSupport, {
		source: null,
		propertyChangeListeners: null
	});
	jsuis.PropertyChangeSupport.prototype.addPropertyChangeListener = function(propertyChangeListener) {
		var propertyName = propertyChangeListener.getPropertyName() || "";
		var propertyChangeListeners = this.getPropertyChangeListeners(propertyName);
		propertyChangeListeners.push(propertyChangeListener);
		if (propertyName !== "") {
			propertyChangeListeners = this.getPropertyChangeListeners();
			propertyChangeListeners.push(propertyChangeListener);
		}
	}
	jsuis.PropertyChangeSupport.prototype.removePropertyChangeListener = function(propertyChangeListener) {
		var propertyName = propertyChangeListener.getPropertyName() || "";
		var propertyChangeListeners = this.getPropertyChangeListeners(propertyName);
		var index = propertyChangeListeners.indexOf(propertyChangeListener);
		if (index !== -1) {
			propertyChangeListeners.splice(index, 1);
		}
		if (propertyName !== "") {
			var propertyChangeListeners = this.getPropertyChangeListeners();
			var index = propertyChangeListeners.indexOf(propertyChangeListener);
			if (index !== -1) {
				propertyChangeListeners.splice(index, 1);
			}
		}
	}
	jsuis.PropertyChangeSupport.prototype.getPropertyChangeListeners = function(propertyName) {
		propertyName = propertyName || "";
		var propertyChangeListeners = this.propertyChangeListeners;
		if (!propertyChangeListeners[propertyName]) {
			propertyChangeListeners[propertyName] = [];
		}
		return propertyChangeListeners[propertyName];
	}
	jsuis.PropertyChangeSupport.prototype.firePropertyChange = function(propertyName, oldValue, newValue) {
		var source = this.getSource();
		var propertyChangeEvent = new jsuis.PropertyChangeEvent(source, propertyName, oldValue, newValue);
		var propertyChangeListeners = this.getPropertyChangeListeners(propertyName);
		for (var i = 0; i < propertyChangeListeners.length; i++) {
			var propertyChangeListener = propertyChangeListeners[i];
			propertyChangeListener.propertyChange(propertyChangeEvent);
		}
	}
}) (jsuis);

/**
 * jsuis.Rectangle
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Rectangle = jsuis.Object.extend(SUPER, function(x, y, width, height) {
		SUPER.prototype.constructor.call(this);
		this.setX(nvl(x, 0));
		this.setY(nvl(y, 0));
		this.setWidth(nvl(width, 0));
		this.setHeight(nvl(height, 0));
	});
	jsuis.Object.addProperties(jsuis.Rectangle, {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	});
	jsuis.Rectangle.prototype.getPoint = function() {
		return new jsuis.Point(this.getX(), this.getY());
	}
	jsuis.Rectangle.prototype.getDimension = function() {
		return new jsuis.Dimension(this.getWidth(), this.getHeight());
	}
	jsuis.Rectangle.prototype.clone = function() {
		return new jsuis.Rectangle(this.getX(), this.getY(), this.getWidth(), this.getHeight());
	}
}) (jsuis);

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

/**
 * jsuis.TreeCellRenderer
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.TreeCellRenderer = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].TreeCellRenderer());
	});
	jsuis.TreeCellRenderer.prototype.getIcon = function(key) {
		var peer = this.getPeer();
		return peer.getIcon(key);
	}
	jsuis.TreeCellRenderer.prototype.setIcon = function(key, icon) {
		var peer = this.getPeer();
		peer.setIcon(key, icon);
		return this;
	}
	jsuis.TreeCellRenderer.prototype.getTreeCellRendererComponent = function(
			tree, value, selected, expanded, leaf, row, hasFocus) {
		var peer = this.getPeer();
		return peer.getTreeCellRendererComponent(
				tree, value, selected, expanded, leaf, row, hasFocus);
	}
}) (jsuis);

/**
 * jsuis.TreeModel
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.TreeModel = jsuis.Object.extend(SUPER, function(root) {
		SUPER.prototype.constructor.call(this);
		this.setRoot(nvl(root, new jsuis.TreeNode()));
	});
	jsuis.Object.addProperties(jsuis.TreeModel, {
		root: null
	});
	jsuis.TreeModel.prototype.getChild = function(parent, index) {
		return parent.getChildAt(index);
	}
	jsuis.TreeModel.prototype.getChildCount = function(parent) {
		return parent.getChildCount();
	}
	jsuis.TreeModel.prototype.isLeaf = function(node) {
		return node.isLeaf();
	}
	jsuis.TreeModel.prototype.valueForPathChanged = function(path, newValue) {
	}
	jsuis.TreeModel.prototype.getIndexOfChild = function(parent, child) {
		return parent.getIndex(child);
	}
	jsuis.TreeModel.prototype.addTreeModelListener = function(treeModelListener) {
	}
	jsuis.TreeModel.prototype.removeTreeModelListener = function(treeModelListener) {
	}
}) (jsuis);

/**
 * jsuis.TreeNode
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.TreeNode = jsuis.Object.extend(SUPER, function(userObject) {
		SUPER.prototype.constructor.call(this);
		this.setUserObject(userObject);
		this.setChildren([]);
	});
	jsuis.Object.addProperties(jsuis.TreeNode, {
		userObject: null,
		map: null,
		children: null,
		parent: null,
		expanded: false,
		size: null,
		location: null
	});
	jsuis.TreeNode.prototype.add = function(treeNode) {
		var children = this.getChildren();
		children.push(treeNode);
		treeNode.setParent(this);
	}
	jsuis.TreeNode.prototype.getChildAt = function(index) {
		var children = this.getChildren();
		return children[index];
	}
	jsuis.TreeNode.prototype.getChildCount = function() {
		var children = this.getChildren();
		return children.length;
	}
	jsuis.TreeNode.prototype.isLeaf = function() {
		var children = this.getChildren();
		return !children || !children.length;
	}
	jsuis.TreeNode.prototype.getIndex = function(child) {
		var children = this.getChildren();
		return children.indexOf(child);
	}
	jsuis.TreeNode.prototype.toString = function() {
		var userObject = this.getUserObject();
		if (!userObject) {
			return null;
		}
		return userObject.toString();
	}
}) (jsuis);

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

/**
 * jsuis.UIManager
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.UIManager = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	var lookAndFeel = "lf";
	jsuis.UIManager.getLookAndFeel = function() {
		return lookAndFeel;
	}
	jsuis.UIManager.setLookAndFeel = function(newLookAndFeel) {
		lookAndFeel = newLookAndFeel;
	}
})(jsuis);

/**
 * jsuis.UndoableEdit
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.UndoableEdit = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].UndoableEdit());
	});
	jsuis.UndoableEdit.prototype.undo = function() {
		var peer = this.getPeer();
		peer.undo();
	}
	jsuis.UndoableEdit.prototype.redo = function() {
		var peer = this.getPeer();
		peer.redo();
	}
})(jsuis);

/**
 * jsuis.UndoManager
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.UndoManager = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].UndoManager());
	});
	jsuis.UndoManager.prototype.addEdit = function(edit) {
		var peer = this.getPeer();
		peer.addEdit(edit);
	}
	jsuis.UndoManager.prototype.undo = function() {
		var peer = this.getPeer();
		peer.undo();
	}
	jsuis.UndoManager.prototype.redo = function() {
		var peer = this.getPeer();
		peer.redo();
	}
	jsuis.UndoManager.prototype.canUndo = function() {
		var peer = this.getPeer();
		peer.canUndo();
	}
	jsuis.UndoManager.prototype.canRedo = function() {
		var peer = this.getPeer();
		peer.canRedo();
	}
})(jsuis);

/**
 * jsuis.Utilities
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Utilities = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Utilities());
	});
	var instance;
	jsuis.Utilities.getInstance = function() {
		if (!instance) {
			instance = new jsuis.Utilities();
		}
		return instance;
	}
	jsuis.Utilities.prototype.convertPoint = function(source, x, y, destination) {
		var peer = this.getPeer();
		return peer.convertPoint(source, x, y, destination);
	}
}) (jsuis);

/**
 * Border
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.lf.Border = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.lf.Border.prototype.paintBorder = function(component) {
		var width = component.getWidth();
		var height = component.getHeight();
		if (!width || !height) {
			return;
		}
		var color = null;
		var rx = 0;
		var ry = 0;
		var background = component.getBackground();
		var graphics = component.getGraphics();
	
		var data = [
			{ x: 0, y: 0, width: width, height: height, fill: nvl(background, "none").toString() }
		];
		var rects = graphics.getComponentsByName("rect");
		for (var i = rects.length; i < data.length; i++) {
			var rect = new jsuis.lf.Rect();
			rect.setName("rect");
			graphics.add(rect);
			rects.push(rect);
		}
		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			rects[i]
				.setAttribute("x", d.x)
				.setAttribute("y", d.y)
				.setAttribute("width", d.width)
				.setAttribute("height", d.height)
				.setStyleProperty("fill", d.fill);
		}
	}
	jsuis.lf.Border.prototype.getPeer = function() {
		return this;
	}
	jsuis.lf.Border.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets();
	}
	jsuis.lf.Border.prototype.getBorderOutsets = function(component) {
		return new jsuis.Insets();
	}
	jsuis.lf.Border.prototype.getBorderOffsets = function(component) {
		return new jsuis.Insets();
	}
})(jsuis);

/**
 * jsuis.lf.BrowserWindow
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.lf.BrowserWindow = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
		this.setElement(window);
		this.setEventListeners({});
		this.setComponentListeners([]);
		this.setMouseListeners([]);
		this.setMouseMotionListeners([]);
		if ("onpointerdown" in window) {
			this.setEventListener("pointerdown", function(domEvent) {
				jsuis.lf.BrowserWindow.getInstance().fireMousePressed(domEvent);
			});
		} else {
			this.setEventListener("mousedown", function(domEvent) {
				jsuis.lf.BrowserWindow.getInstance().fireMousePressed(domEvent);
			});
		}
		if ("onpointerup" in window) {
			this.setEventListener("pointerup", function(domEvent) {
				jsuis.lf.BrowserWindow.getInstance().fireMouseReleased(domEvent);
			});
		} else {
			this.setEventListener("mouseup", function(domEvent) {
				jsuis.lf.BrowserWindow.getInstance().fireMouseReleased(domEvent);
			});
		}
		if ("onpointermove" in window) {
			this.setEventListener("pointermove", function(domEvent) {
				var browserWindow = jsuis.lf.BrowserWindow.getInstance();
				if (browserWindow.isPressed()) {
					browserWindow.fireMouseDragged(domEvent);
				}
			});
		} else {
			this.setEventListener("mousemove", function(domEvent) {
				var browserWindow = jsuis.lf.BrowserWindow.getInstance();
				if (browserWindow.isPressed()) {
					browserWindow.fireMouseDragged(domEvent);
				}
			});
		}
	});
	jsuis.Object.addProperties(jsuis.lf.BrowserWindow, {
		eventListeners: null,
		componentListeners: null,
		mouseListeners: null,
		mouseMotionListeners: null
	});
	var instance;
	jsuis.lf.BrowserWindow.getInstance = function() {
		if (!instance) {
			instance = new jsuis.lf.BrowserWindow();
		}
		return instance;
	}
	jsuis.lf.BrowserWindow.prototype.getEventListener = function(type) {
		var eventListeners = this.getEventListeners();
		return eventListeners["on" + type];
	}
	jsuis.lf.BrowserWindow.prototype.setEventListener = function(type, eventListener) {
		var oldEventListener = this.getEventListener(type);
		if (oldEventListener) {
			this.removeEventListener(type, oldEventListener);
		}
		this.addEventListener(type, eventListener);
		var eventListeners = this.getEventListeners();
		eventListeners["on" + type] = eventListener;
		return this;
	}
	jsuis.lf.BrowserWindow.prototype.addEventListener = function(type, eventListener) {
		var element = this.getElement();
		element.addEventListener(type, eventListener);
	}
	jsuis.lf.BrowserWindow.prototype.removeEventListener = function(type, eventListener) {
		var element = this.getElement();
		element.removeEventListener(type, eventListener);
	}
	jsuis.lf.BrowserWindow.prototype.addComponentListener = function(componentListener) {
		var componentListeners = this.getComponentListeners();
		componentListeners.push(componentListener);
		var component = this;
		var listener = componentListener.getListener();
		if (listener.componentResized) {
			var onresize = this.getEventListener("resize");
			if (!onresize) {
				this.setEventListener("resize", function(event) {
					component.fireComponentResized(event);
				});
			}
		}
	}
	jsuis.lf.BrowserWindow.prototype.removeComponentListener = function(componentListener) {
		var componentListeners = this.getComponentListeners();
		var index = componentListeners.indexOf(componentListener);
		if (index !== -1) {
			componentListeners.splice(index, 1);
		}
	}
	jsuis.lf.BrowserWindow.prototype.fireComponentResized = function(domEvent) {
		var event = new jsuis.lf.ComponentEvent(domEvent).setSource(this).setId(jsuis.Constants.COMPONENT_RESIZED);
		var componentListeners = this.getComponentListeners();
		for (var i = 0; i < componentListeners.length; i++) {
			var componentListener = componentListeners[i];
			componentListener.componentResized(event);
		}
	}
	jsuis.lf.BrowserWindow.prototype.isPressed = function() {
		return this.pressed;
	}
	jsuis.lf.BrowserWindow.prototype.setPressed = function(pressed) {
		this.pressed = pressed;
		return this;
	}
	jsuis.lf.BrowserWindow.prototype.addMouseListener = function(mouseListener) {
		var mouseListeners = this.getMouseListeners();
		mouseListeners.push(mouseListener);
	}
	jsuis.lf.BrowserWindow.prototype.removeMouseListener = function(mouseListener) {
		var mouseListeners = this.getMouseListeners();
		var index = mouseListeners.indexOf(mouseListener);
		if (index !== -1) {
			mouseListeners.splice(index, 1);
		}
	}
	jsuis.lf.BrowserWindow.prototype.fireMousePressed = function(domEvent) {
		this.setPressed(true);
	}
	jsuis.lf.BrowserWindow.prototype.fireMouseReleased = function(domEvent) {
		this.setPressed(false);
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_RELEASED);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseReleased(mouseEvent);
		}
	}
	jsuis.lf.BrowserWindow.prototype.addMouseMotionListener = function(mouseMotionListener) {
		var mouseMotionListeners = this.getMouseMotionListeners();
		mouseMotionListeners.push(mouseMotionListener);
	}
	jsuis.lf.BrowserWindow.prototype.removeMouseMotionListener = function(mouseMotionListener) {
		var mouseMotionListeners = this.getMouseMotionListeners();
		var index = mouseMotionListeners.indexOf(mouseMotionListener);
		if (index !== -1) {
			mouseMotionListeners.splice(index, 1);
		}
	}
	jsuis.lf.BrowserWindow.prototype.fireMouseDragged = function(domEvent) {
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_DRAGGED);
		var mouseMotionListeners = this.getMouseMotionListeners();
		for (var i = 0; i < mouseMotionListeners.length; i++) {
			var mouseMotionListener = mouseMotionListeners[i];
			mouseMotionListener.mouseDragged(mouseEvent);
		}
	}
}) (jsuis);

/**
 * Component
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.lf.Component = jsuis.Object.extend(SUPER, function(element) {
		SUPER.prototype.constructor.call(this);
		this.setElement(element);
		this.addClass(this.getClassName());
		this.setComponents([]);
		this.setEventListeners({});
		this.setComponentListeners([]);
		this.setMouseListeners([]);
		this.setMouseMotionListeners([]);
		this.setTouchListeners([]);
		this.setFocusListeners([]);
		this.setActionListeners([]);
	});
	jsuis.Object.addProperties(jsuis.lf.Component, {
		components: null,
		parent: null,
		layout: null,
		constraints: null,
		cursor: null,
		graphics: null,
		// target: null,
		eventListeners: null,
		componentListeners: null,
		mouseListeners: null,
		mouseMotionListeners: null,
		touchListeners: null,
		focusListeners: null,
		actionListeners: null,
		actionCommand: null,
		action: null
	});
	jsuis.lf.Component.prototype.addClass = function(name) {
		var value = this.getAttribute("class");
		var classes = value ? value.split(" ") : [];
		if (classes.indexOf(name) === -1) {
			classes.push(name);
			var value = classes.join(" ");
			this.setAttribute("class", value);
		}
	}
	jsuis.lf.Component.prototype.getAttribute = function(attribute) {
		var element = this.getElement();
		return element.getAttribute(attribute);
	}
	jsuis.lf.Component.prototype.setAttribute = function(attribute, value) {
		var element = this.getElement();
		if ((value === null) || (value === undefined)) {
			element.removeAttribute(attribute);
			return this;
		}
		element.setAttribute(attribute, value);
		return this;
	}
	jsuis.lf.Component.prototype.setStyleProperty = function(property, value) {
		var element = this.getElement();
		element.style[property] = value;
		return this;
	}
	jsuis.lf.Component.prototype.getStyleProperty = function(property) {
		var element = this.getElement();
		var computedStyle = getComputedStyle(element);
		return computedStyle[property];
	}
	jsuis.lf.Component.prototype.getAttributeNS = function(namespace, attribute) {
		var element = this.getElement();
		return element.getAttributeNS(attribute);
	}
	jsuis.lf.Component.prototype.setAttributeNS = function(namespace, attribute, value) {
		var element = this.getElement();
		if ((value === null) || (value === undefined)) {
			element.removeAttributeNS(namespace, attribute);
			return this;
		}
		element.setAttributeNS(namespace, attribute, value);
		return this;
	}
	jsuis.lf.Component.prototype.setProperty = function(property, value) {
		var element = this.getElement();
		element[property] = value;
		return this;
	}
	jsuis.lf.Component.prototype.getProperty = function(property) {
		var element = this.getElement();
		return element[property];
	}
	jsuis.lf.Component.prototype.getEventListener = function(type) {
		var eventListeners = this.getEventListeners();
		return eventListeners["on" + type];
	}
	jsuis.lf.Component.prototype.setEventListener = function(type, eventListener) {
		var oldEventListener = this.getEventListener(type);
		if (oldEventListener) {
			this.removeEventListener(type, oldEventListener);
		}
		this.addEventListener(type, eventListener);
		var eventListeners = this.getEventListeners();
		eventListeners["on" + type] = eventListener;
		return this;
	}
	jsuis.lf.Component.prototype.addEventListener = function(type, eventListener) {
		var element = this.getElement();
		element.addEventListener(type, eventListener);
	}
	jsuis.lf.Component.prototype.removeEventListener = function(type, eventListener) {
		var element = this.getElement();
		element.removeEventListener(type, eventListener);
	}
	jsuis.lf.Component.prototype.getId = function() {
		return this.getAttribute("id");
	}
	jsuis.lf.Component.prototype.setId = function(id) {
		this.setAttribute("id", id);
		return this;
	}
	jsuis.lf.Component.prototype.getName = function() {
		return this.getAttribute("name");
	}
	jsuis.lf.Component.prototype.setName = function(name) {
		this.setAttribute("name", name);
		return this;
	}
	jsuis.lf.Component.prototype.getPeer = function() {
		return this;
	}
	jsuis.lf.Component.prototype.addChild = function(component, constraints, index) {
		var components = this.getComponents();
		var referenceComponent;
		if (index !== undefined) {
			referenceComponent = components[index];
		}
		var element = this.getElement();
		var componentElement = component.getElement();
		var referenceElement;
		if (referenceComponent) {
			referenceElement = referenceComponent.getElement();
		}
		element.insertBefore(componentElement, referenceElement || null);
	}
	jsuis.lf.Component.prototype.removeChild = function(component) {
		var element = this.getElement();
		var componentElement = component.getElement();
		element.removeChild(componentElement);
	}
	jsuis.lf.Component.prototype.prepend = function(component) {
		var element = this.getElement();
		var componentElement = component.getElement();
		element.insertBefore(componentElement, null, 0);
	}
	jsuis.lf.Component.prototype.add = function(component, constraints, index) {
		component = component.getPeer();
		this.addChild(component, constraints, index);
		if (constraints !== null && constraints !== undefined) {
			if (constraints instanceof jsuis.Cloneable) {
				constraints = constraints.clone();
			}
			component.setConstraints(constraints);
		}
		component.setParent(this);
		var components = this.getComponents();
		if (index !== undefined) {
			components.splice(index, 0, component);
		} else {
			components.push(component);
		}
	}
	jsuis.lf.Component.prototype.remove = function(component) {
		component = component.getPeer();
		this.removeChild(component);
		component.setParent(undefined);
		var components = this.getComponents();
		var index = components.indexOf(component);
		if (index !== -1) {
			components.splice(index, 1);
		}
	}
	jsuis.lf.Component.prototype.removeAll = function() {
		var components = this.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			this.removeChild(component);
			component.setParent(undefined);
		}
		components.length = 0;
	}
	
	
	jsuis.lf.Component.prototype.getComponentsByName = function(name) {
		var selection = [];
		var components = this.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			if (name === component.getName()) {
				selection.push(component);
			}
		}
		return selection;
	}
	
	jsuis.lf.Component.prototype.getX = function() {
		return this.x || 0;
	}
	jsuis.lf.Component.prototype.setX = function(x) {
		this.x = x;
		var outsets = this.getOutsets();
		// x += outsets.getLeft();
		this.setAttribute("x", x);
		return this;
	}
	jsuis.lf.Component.prototype.getY = function() {
		return this.y || 0;
	}
	jsuis.lf.Component.prototype.setY = function(y) {
		this.y = y;
		var outsets = this.getOutsets();
		// y += outsets.getTop();
		this.setAttribute("y", y);
		return this;
	}
	jsuis.lf.Component.prototype.getOffsets = function() {
		return new jsuis.Insets();
	}
	jsuis.lf.Component.prototype.getLocation = function() {
		return new jsuis.Point(this.getX(), this.getY());
	}
	jsuis.lf.Component.prototype.setLocation = function(point) {
		var componentListeners = this.getComponentListeners();
		if (!componentListeners.length) {
			this.setX(point.getX());
			this.setY(point.getY());
		} else {
			var oldX = this.getX();
			var oldY = this.getY();
			var x = point.getX();
			var y = point.getY();
			this.setX(x);
			this.setY(y);
			if ((x !== oldX) || (y !== oldY)) {
				this.fireComponentMoved();
			}
		}
		return this;
	}
	jsuis.lf.Component.prototype.getWidth = function() {
		return this.width || 0;
	}
	jsuis.lf.Component.prototype.setWidth = function(width) {
		this.width = width;
		var outsets = this.getOutsets();
		// width -= outsets.getLeft() + outsets.getRight();
		if (width >= 0) {
			this.setAttribute("width", width);
		}
		return this;
	}
	jsuis.lf.Component.prototype.getHeight = function() {
		return this.height || 0;
	}
	jsuis.lf.Component.prototype.setHeight = function(height) {
		this.height = height;
		var outsets = this.getOutsets();
		// height -= outsets.getTop() + outsets.getBottom();
		if (height >= 0) {
			this.setAttribute("height", height);
		}
		return this;
	}
	jsuis.lf.Component.prototype.getSize = function() {
		return new jsuis.Dimension(this.getWidth(), this.getHeight());
	}
	jsuis.lf.Component.prototype.setSize = function(dimension) {
		this.setWidth(dimension.getWidth());
		this.setHeight(dimension.getHeight());
		return this;
	}
	jsuis.lf.Component.prototype.getPreferredSize = function() {
		var constraints = nvl(this.getConstraints(), new jsuis.Constraints());
		var layoutPaddingMargin = constraints.getPadding().add(constraints.getMargin());
		var preferredSize = this.preferredSize;
		if (preferredSize) {
			return preferredSize;
			return preferredSize.add(
					layoutPaddingMargin.getDimension());
		}
		var layout = this.getLayout();
		if (layout) {
			var preferredLayoutSize = layout.preferredLayoutSize(this);
			return preferredLayoutSize;
		}
		var element = this.getElement();
		// var bbox = element.getBBox();
		var bbox = element.getBoundingClientRect();
		return new jsuis.Dimension(Math.ceil(bbox.width), Math.ceil(bbox.height)).add(
				layoutPaddingMargin.getDimension());
	}
	jsuis.lf.Component.prototype.setPreferredSize = function(preferredSize) {
		this.preferredSize = preferredSize ? preferredSize.clone() : preferredSize;
		return this;
	}
	jsuis.lf.Component.prototype.getMinimumSize = function() {
		var minimumSize = this.minimumSize;
		if (minimumSize) {
			return minimumSize;
		}
		var layout = this.getLayout();
		if (layout) {
			var minimumLayoutSize = layout.minimumLayoutSize(this);
			return minimumLayoutSize;
		}
		return this.getPreferredSize();
	}
	jsuis.lf.Component.prototype.setMinimumSize = function(minimumSize) {
		this.minimumSize = minimumSize ? minimumSize.clone() : minimumSize;
		return this;
	}
	jsuis.lf.Component.prototype.getBounds = function() {
		return new jsuis.Rectangle(this.getX(), this.getY(), this.getWidth(), this.getHeight());
	}
	jsuis.lf.Component.prototype.setBounds = function(rectangle) {
		this.setLocation(rectangle.getPoint());
		this.setSize(rectangle.getDimension());
		return this;
	}
	jsuis.lf.Component.prototype.getPadding = function() {
		if (!this.padding) {
			this.padding = new jsuis.Insets();
		}
		return this.padding.clone();
	}
	jsuis.lf.Component.prototype.setPadding = function(padding) {
		if (!this.padding || padding) {
			this.padding = new jsuis.Insets();
		}
		if (padding) {
			this.padding
			.setTop(padding.getTop())
			.setLeft(padding.getLeft())
			.setBottom(padding.getBottom())
			.setRight(padding.getRight());
		}
		return this;
	}
	jsuis.lf.Component.prototype.getMargin = function() {
		if (!this.margin) {
			this.margin = new jsuis.Insets();
		}
		return this.margin.clone();
	}
	jsuis.lf.Component.prototype.setMargin = function(margin) {
		if (!this.margin || margin) {
			this.margin = new jsuis.Insets();
		}
		if (margin) {
			this.margin
			.setTop(margin.getTop())
			.setLeft(margin.getLeft())
			.setBottom(margin.getBottom())
			.setRight(margin.getRight());
		}
		return this;
	}
	jsuis.lf.Component.prototype.getBorder = function() {
		return this.border;
	}
	jsuis.lf.Component.prototype.setBorder = function(border) {
		this.border = border;
		if (border) {
			var graphics = this.getGraphics();
			if (!graphics) {
				graphics = new jsuis.lf.Graphics();
				this.setGraphics(graphics);
				this.prepend(graphics);
			}
			border.paintBorder(this);
		}
		return this;
	}
	jsuis.lf.Component.prototype.getInsets = function() {
		var constraints = nvl(this.getConstraints(), new jsuis.Constraints());
		var insets = this.getPadding().add(constraints.getPadding());
		var border = this.getBorder();
		if (border) {
			return insets.add(border.getBorderInsets(this));
		}
		return insets;
	}
	jsuis.lf.Component.prototype.getOutsets = function() {
		var constraints = nvl(this.getConstraints(), new jsuis.Constraints());
		var outsets = this.getMargin().add(constraints.getMargin());
		var border = this.getBorder();
		if (border) {
			return outsets.add(border.getBorderOutsets(this));
		}
		return outsets;
	}
	jsuis.lf.Component.prototype.isLeftToRight = function() {
		return nvl(this.leftToRight, true);
	}
	jsuis.lf.Component.prototype.setLeftToRight = function(leftToRight) {
		this.leftToRight = leftToRight;
		return this;
	}
	jsuis.lf.Component.prototype.validate = function() {
		this.doLayout();
		var components = this.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			component.validate();
		}
	}
	jsuis.lf.Component.prototype.doLayout = function() {
		var layout = this.getLayout();
		if (layout) {
			layout.layoutContainer(this);
		}
	}
	jsuis.lf.Component.prototype.paint = function() {
		var border = this.getBorder();
		if (border) {
			border.paintBorder(this);
		}
		var components = this.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			try {
				component.paint();
			} catch (e) {
				console.log(e);
			}
		}
	}
	jsuis.lf.Component.prototype.isVisible = function() {
		return nvl(this.visible, true);
	}
	jsuis.lf.Component.prototype.setVisible = function(visible) {
		this.setStyleProperty("display", visible ? "" : "none");
		this.visible = visible;
		return this;
	}
	jsuis.lf.Component.prototype.getBackground = function() {
		return this.background;
	}
	jsuis.lf.Component.prototype.setBackground = function(background) {
		this.setStyleProperty("fill", nvl(background, "none").toString());
		this.background = background;
		this.paint();
		return this;
	}
	jsuis.lf.Component.prototype.getForeground = function() {
		return this.foreground;
	}
	jsuis.lf.Component.prototype.setForeground = function(foreground) {
		this.setStyleProperty("stroke", nvl(foreground, "none").toString());
		this.foreground = foreground;
		this.paint();
		return this;
	}
	jsuis.lf.Component.prototype.getFont = function() {
		return this.font;
	}
	jsuis.lf.Component.prototype.setFont = function(font) {
		if (font) {
			this.setStyleProperty("font-family", font.getName());
			this.setStyleProperty("font-style", font.getStyle());
			this.setStyleProperty("font-weight", font.getStyle());
			this.setStyleProperty("font-size", font.getSize() + "px");
		}
		this.font = font;
		return this;
	}
	jsuis.lf.Component.prototype.getCursor = function() {
		return this.cursor;
	}
	jsuis.lf.Component.prototype.setCursor = function(cursor) {
		this.cursor = cursor;
		if (cursor) {
			this.setStyleProperty("cursor", nvl(cursor, "").toString());
		}
		return this;
	}
	jsuis.lf.Component.prototype.isEnabled = function() {
		return nvl(this.enabled, true);
	}
	jsuis.lf.Component.prototype.setEnabled = function(enabled) {
		this.setStyleProperty("pointer-events", enabled ? "" : "none");
		var oldEnabled = this.isEnabled();
		this.enabled = enabled;
		this.firePropertyChange("enabled", oldEnabled, enabled);
		return this;
	}
	jsuis.lf.Component.prototype.isSelectable = function() {
		return nvl(this.selectable, true);
	}
	jsuis.lf.Component.prototype.setSelectable = function(selectable) {
		this.selectable = selectable;
		this
		.setStyleProperty("-webkit-touch-callout", selectable ? "text" : "none")
		.setStyleProperty("-webkit-user-select", selectable ? "text" : "none")
		.setStyleProperty("-khtml-user-select", selectable ? "text" : "none")
		.setStyleProperty("-moz-user-select", selectable ? "text" : "none")
		.setStyleProperty("-ms-user-select", selectable ? "text" : "none")
		.setStyleProperty("user-select", selectable ? "text" : "none");
		return this;
	}
	jsuis.lf.Component.prototype.isPressed = function() {
		return this.pressed;
	}
	jsuis.lf.Component.prototype.setPressed = function(pressed) {
		this.pressed = pressed;
		return this;
	}
	jsuis.lf.Component.prototype.requestFocus = function() {
		var element = this.getElement();
		element.focus();
	}
	jsuis.lf.Component.prototype.addComponentListener = function(componentListener) {
		var componentListeners = this.getComponentListeners();
		componentListeners.push(componentListener);
		var component = this;
		var listener = componentListener.getListener();
		if (listener.componentResized) {
			var onresize = this.getEventListener("resize");
			if (!onresize) {
				this.setEventListener("resize", function(event) {
					component.fireComponentResized(event);
				});
			}
		}
	}
	jsuis.lf.Component.prototype.removeComponentListener = function(componentListener) {
		var componentListeners = this.getComponentListeners();
		var index = componentListeners.indexOf(componentListener);
		if (index !== -1) {
			componentListeners.splice(index, 1);
		}
	}
	jsuis.lf.Component.prototype.fireComponentResized = function(domEvent) {
		var event = new jsuis.lf.ComponentEvent(domEvent).setSource(this).setId(jsuis.Constants.COMPONENT_RESIZED);
		var componentListeners = this.getComponentListeners();
		for (var i = 0; i < componentListeners.length; i++) {
			var componentListener = componentListeners[i];
			componentListener.componentResized(event);
		}
	}
	jsuis.lf.Component.prototype.fireComponentMoved = function() {
		var event = new jsuis.lf.ComponentEvent().setSource(this).setId(jsuis.Constants.COMPONENT_MOVED);
		var componentListeners = this.getComponentListeners();
		for (var i = 0; i < componentListeners.length; i++) {
			var componentListener = componentListeners[i];
			componentListener.componentMoved(event);
		}
	}
	jsuis.lf.Component.prototype.addMouseAdapter = function(mouseAdapter) {
		var mouseListeners = this.getMouseListeners();
		var mouseMotionListeners = this.getMouseMotionListeners();
		// TODO MouseWheelListener
		if (mouseAdapter instanceof jsuis.MouseAdapter) {
			mouseListeners.push(mouseAdapter);
			mouseMotionListeners.push(mouseAdapter);
		} else if (mouseAdapter instanceof jsuis.MouseListener) {
			mouseListeners.push(mouseAdapter);
		} else if (mouseAdapter instanceof jsuis.MouseMotionListener) {
			mouseMotionListeners.push(mouseAdapter);
		} else {
			return;
		}
		var component = this;
		var listener = mouseAdapter.getListener();
		if (listener.mouseClicked) {
			var onclick = this.getEventListener("click");
			if (!onclick) {
				this.setEventListener("click", function(event) {
					component.fireMouseClicked(event);
				});
			}
			var ondblclick = this.getEventListener("dblclick");
			if (!ondblclick) {
				this.setEventListener("dblclick", function(event) {
					component.fireMouseDoubleClicked(event);
				});
			}
			var oncontextmenu = this.getEventListener("contextmenu");
			if (!oncontextmenu) {
				this.setEventListener("contextmenu", function(event) {
					component.fireMouseRightClicked(event);
				});
			}
		}
		if (listener.mousePressed || listener.mouseReleased || listener.mouseDragged) {
			var onmousedown = this.getEventListener("pointerdown");
			if (!onmousedown) {
				if ("onpointerdown" in window) {
					this.setEventListener("pointerdown", function(event) {
						component.fireMousePressed(event);
					});
				} else {
					this.setEventListener("mousedown", function(event) {
						component.fireMousePressed(event);
					});
				}
			}
			var browserWindow = jsuis.lf.BrowserWindow.getInstance();
			var browserWindowMouseListeners = browserWindow.getMouseListeners();
			var i = 0;
			for (; i < browserWindowMouseListeners.length; i++) {
				var browserWindowMouseListener = browserWindowMouseListeners[i];
				if (browserWindowMouseListener.getListenerComponent() === this) {
					break;
				}
			}
			if (i === browserWindowMouseListeners.length) {
				var mouseListener = new jsuis.MouseListener({
					mouseReleased: function(event) {
						var component = this.getListenerComponent();
						if (component.isPressed()) {
							component.fireMouseReleased(event.getElement());
						}
					}
				});
				mouseListener.setListenerComponent(this);
				browserWindow.addMouseListener(mouseListener);
			}
		}
		if (listener.mouseEntered) {
			var onmouseenter = this.getEventListener("pointerenter");
			if (!onmouseenter) {
				if ("onpointerenter" in window) {
					this.setEventListener("pointerenter", function(event) {
						component.fireMouseEntered(event);
					});
				} else {
					this.setEventListener("mouseenter", function(event) {
						component.fireMouseEntered(event);
					});
				}
			}
		}
		if (listener.mouseExited) {
			var onmouseleave = this.getEventListener("pointerleave");
			if (!onmouseleave) {
				if ("onpointerleave" in window) {
					this.setEventListener("pointerleave", function(event) {
						component.fireMouseExited(event);
					});
				} else {
					this.setEventListener("mouseleave", function(event) {
						component.fireMouseExited(event);
					});
				}
			}
		}
		if (listener.mouseMoved) {
			var onmousemove = this.getEventListener("pointermove");
			if (!onmousemove) {
				if ("onpointermove" in window) {
					this.setEventListener("pointermove", function(event) {
						component.fireMouseMoved(event);
					});
				} else {
					this.setEventListener("mousemove", function(event) {
						component.fireMouseMoved(event);
					});
				}
			}
		}
		if (listener.mouseDragged) {
			var browserWindow = jsuis.lf.BrowserWindow.getInstance();
			var browserWindowMouseMotionListeners = browserWindow.getMouseMotionListeners();
			var i = 0;
			for (; i < browserWindowMouseMotionListeners.length; i++) {
				var browserWindowMouseMotionListener = browserWindowMouseMotionListeners[i];
				if (browserWindowMouseMotionListener.getListenerComponent() === this) {
					break;
				}
			}
			if (i === browserWindowMouseMotionListeners.length) {
				var mouseMotionListener = new jsuis.MouseMotionListener({
					mouseDragged: function(event) {
						var component = this.getListenerComponent();
						if (component.isPressed()) {
							component.fireMouseDragged(event.getElement());
						}
					}
				});
				mouseMotionListener.setListenerComponent(this);
				browserWindow.addMouseMotionListener(mouseMotionListener);
			}
		}
	}
	jsuis.lf.Component.prototype.removeMouseAdapter = function(mouseAdapter) {
		this.removeMouseListener(mouseAdapter);
		this.removeMouseMotionListener(mouseAdapter);
	}
	jsuis.lf.Component.prototype.addMouseListener = function(mouseListener) {
		this.addMouseAdapter(mouseListener);
	}
	jsuis.lf.Component.prototype.removeMouseListener = function(mouseListener) {
		var mouseListeners = this.getMouseListeners();
		var index = mouseListeners.indexOf(mouseListener);
		if (index !== -1) {
			mouseListeners.splice(index, 1);
		}
	}
	jsuis.lf.Component.prototype.fireMouseClicked = function(domEvent) {
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_CLICKED);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseClicked(mouseEvent);
		}
	}
	jsuis.lf.Component.prototype.fireMouseDoubleClicked = function(domEvent) {
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_CLICKED).setClickCount(2);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseClicked(mouseEvent);
		}
	}
	jsuis.lf.Component.prototype.fireMouseRightClicked = function(domEvent) {
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_CLICKED).setPopupTrigger(true);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseClicked(mouseEvent);
		}
	}
	jsuis.lf.Component.prototype.fireMousePressed = function(domEvent) {
		this.setPressed(true);
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_PRESSED);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mousePressed(mouseEvent);
		}
	}
	jsuis.lf.Component.prototype.fireMouseReleased = function(domEvent) {
		this.setPressed(false);
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_RELEASED);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseReleased(mouseEvent);
		}
	}
	jsuis.lf.Component.prototype.fireMouseEntered = function(domEvent) {
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_ENTERED);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseEntered(mouseEvent);
		}
	}
	jsuis.lf.Component.prototype.fireMouseExited = function(domEvent) {
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_EXITED);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseExited(mouseEvent);
		}
	}
	jsuis.lf.Component.prototype.addMouseMotionListener = function(mouseMotionListener) {
		this.addMouseAdapter(mouseMotionListener);
	}
	jsuis.lf.Component.prototype.removeMouseMotionListener = function(mouseMotionListener) {
		var mouseMotionListeners = this.getMouseMotionListeners();
		var index = mouseMotionListeners.indexOf(mouseMotionListener);
		if (index !== -1) {
			mouseMotionListeners.splice(index, 1);
		}
	}
	jsuis.lf.Component.prototype.fireMouseMoved = function(domEvent) {
		if (this.isPressed()) {
			return;
		}
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_MOVED);
		var mouseMotionListeners = this.getMouseMotionListeners();
		for (var i = 0; i < mouseMotionListeners.length; i++) {
			var mouseMotionListener = mouseMotionListeners[i];
			mouseMotionListener.mouseMoved(mouseEvent);
		}
	}
	jsuis.lf.Component.prototype.fireMouseDragged = function(domEvent) {
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_DRAGGED);
		var mouseMotionListeners = this.getMouseMotionListeners();
		for (var i = 0; i < mouseMotionListeners.length; i++) {
			var mouseMotionListener = mouseMotionListeners[i];
			mouseMotionListener.mouseDragged(mouseEvent);
		}
	}
	jsuis.lf.Component.prototype.addTouchListener = function(touchListener) {
		var touchListeners = this.getTouchListeners();
		touchListeners.push(touchListener);
		var component = this;
		var listener = touchListener.getListener();
		if (listener.touchPressed) {
			var ontouchstart = this.getEventListener("touchstart");
			if (!ontouchstart) {
				this.setEventListener("touchstart", function(event) {
					component.fireTouchPressed(event);
				});
			}
		}
		if (listener.touchReleased) {
			var ontouchend = this.getEventListener("touchend");
			if (!ontouchend) {
				this.setEventListener("touchend", function(event) {
					component.fireTouchReleased(event);
				});
			}
		}
		if (listener.touchMoved) {
			var ontouchmove = this.getEventListener("touchmove");
			if (!ontouchmove) {
				this.setEventListener("touchmove", function(event) {
					component.fireTouchMoved(event);
				});
			}
		}
	}
	jsuis.lf.Component.prototype.removeTouchListener = function(touchListener) {
		var touchListeners = this.getTouchListeners();
		var index = touchListeners.indexOf(touchListener);
		if (index !== -1) {
			touchListeners.splice(index, 1);
		}
	}
	jsuis.lf.Component.prototype.fireTouchPressed = function(domEvent) {
		var touchEvent = new jsuis.lf.TouchEvent(domEvent).setSource(this).setId(jsuis.Constants.TOUCH_PRESSED);
		var touchListeners = this.getTouchListeners();
		for (var i = 0; i < touchListeners.length; i++) {
			var touchListener = touchListeners[i];
			touchListener.touchPressed(touchEvent);
		}
	}
	jsuis.lf.Component.prototype.fireTouchReleased = function(domEvent) {
		var touchEvent = new jsuis.lf.TouchEvent(domEvent).setSource(this).setId(jsuis.Constants.TOUCH_RELEASED);
		var touchListeners = this.getTouchListeners();
		for (var i = 0; i < touchListeners.length; i++) {
			var touchListener = touchListeners[i];
			touchListener.touchReleased(touchEvent);
		}
	}
	jsuis.lf.Component.prototype.fireTouchMoved = function(domEvent) {
		var touchEvent = new jsuis.lf.TouchEvent(domEvent).setSource(this).setId(jsuis.Constants.TOUCH_MOVED);
		var touchListeners = this.getTouchListeners();
		for (var i = 0; i < touchListeners.length; i++) {
			var touchListener = touchListeners[i];
			touchListener.touchMoved(touchEvent);
		}
	}
	jsuis.lf.Component.prototype.addFocusListener = function(focusListener) {
		var focusListeners = this.getFocusListeners();
		focusListeners.push(focusListener);
		var component = this;
		var listener = focusListener.getListener();
		if (listener.focusGained) {
			var onfocus = this.getEventListener("focus");
			if (!onfocus) {
				this.setEventListener("focus", function(event) {
					component.fireFocusGained(event);
				});
			}
		}
		if (listener.focusLost) {
			var onblur = this.getEventListener("blur");
			if (!onblur) {
				this.setEventListener("blur", function(event) {
					component.fireFocusLost(event);
				});
			}
		}
	}
	jsuis.lf.Component.prototype.removeFocusListener = function(focusListener) {
		var focusListeners = this.getFocusListeners();
		var index = focusListeners.indexOf(focusListener);
		if (index !== -1) {
			focusListeners.splice(index, 1);
		}
	}
	jsuis.lf.Component.prototype.fireFocusGained = function(domEvent) {
		var focusEvent = new jsuis.lf.FocusEvent(domEvent).setSource(this).setId(jsuis.Constants.FOCUS_GAINED);
		var focusListeners = this.getFocusListeners();
		for (var i = 0; i < focusListeners.length; i++) {
			var focusListener = focusListeners[i];
			focusListener.focusGained(focusEvent);
		}
	}
	jsuis.lf.Component.prototype.fireFocusLost = function(domEvent) {
		var focusEvent = new jsuis.lf.FocusEvent(domEvent).setSource(this).setId(jsuis.Constants.FOCUS_LOST);
		var focusListeners = this.getFocusListeners();
		for (var i = 0; i < focusListeners.length; i++) {
			var focusListener = focusListeners[i];
			focusListener.focusLost(focusEvent);
		}
	}
	jsuis.lf.Component.prototype.addActionListener = function(actionListener) {
		var actionListeners = this.getActionListeners();
		actionListeners.push(actionListener);
		var mouseListener = new jsuis.MouseListener({
			mouseClicked: function(event) {
				var source = event.getSource();
				source.fireActionPerformed(event.getElement());
			}
		});
		mouseListener.setListenerComponent(actionListener.getListenerComponent());
		this.addMouseListener(mouseListener);
	}
	jsuis.lf.Component.prototype.removeActionListener = function(actionListener) {
		var actionListeners = this.getActionListeners();
		var index = actionListeners.indexOf(actionListener);
		if (index !== -1) {
			actionListeners.splice(index, 1);
		}
	}
	jsuis.lf.Component.prototype.fireActionPerformed = function(domEvent) {
		var event = new jsuis.lf.ActionEvent(domEvent).setSource(this).setId(jsuis.Constants.ACTION_PERFORMED).setActionCommand(this.getActionCommand());
		var actionListeners = this.getActionListeners();
		for (var i = 0; i < actionListeners.length; i++) {
			var actionListener = actionListeners[i];
			actionListener.actionPerformed(event);
		}
	}
})(jsuis);

/**
 * jsuis.lf.Container
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.lf.Container = jsuis.Object.extend(SUPER, function(element) {
		SUPER.prototype.constructor.call(this);
		this.setElement(element);
		this.addClass(this.getClassName());
		this.setComponents([]);
		this.setEventListeners({});
		this.setComponentListeners([]);
		this.setMouseListeners([]);
		this.setMouseMotionListeners([]);
		this.setTouchListeners([]);
		this.setFocusListeners([]);
		this.setActionListeners([]);
	});
	jsuis.Object.addProperties(jsuis.lf.Container, {
		components: null,
		parent: null,
		layout: null,
		constraints: null,
		horizontalAlignment: null,
		graphics: null,
		eventListeners: null,
		componentListeners: null,
		mouseListeners: null,
		mouseMotionListeners: null,
		touchListeners: null,
		focusListeners: null,
		actionListeners: null,
		actionCommand: null,
		action: null
	});
	jsuis.lf.Container.prototype.getPeer = function() {
		return this;
	}
	jsuis.lf.Container.prototype.addClass = function(name) {
		var value = this.getAttribute("class");
		var classes = value ? value.split(" ") : [];
		if (classes.indexOf(name) === -1) {
			classes.push(name);
			var value = classes.join(" ");
			this.setAttribute("class", value);
		}
	}
	jsuis.lf.Container.prototype.getAttribute = function(attribute) {
		var element = this.getElement();
		return element.getAttribute(attribute);
	}
	jsuis.lf.Container.prototype.setAttribute = function(attribute, value) {
		var element = this.getElement();
		if ((value === null) || (value === undefined)) {
			element.removeAttribute(attribute);
			return this;
		}
		element.setAttribute(attribute, value);
		return this;
	}
	jsuis.lf.Container.prototype.setStyleProperty = function(property, value) {
		var element = this.getElement();
		element.style[property] = value;
		return this;
	}
	jsuis.lf.Container.prototype.getStyleProperty = function(property) {
		var element = this.getElement();
		var computedStyle = getComputedStyle(element);
		return computedStyle[property];
	}
	jsuis.lf.Container.prototype.setProperty = function(property, value) {
		var element = this.getElement();
		element[property] = value;
		return this;
	}
	jsuis.lf.Container.prototype.getProperty = function(property) {
		var element = this.getElement();
		return element[property];
	}
	jsuis.lf.Container.prototype.addChild = function(component, constraints, index) {
		var components = this.getComponents();
		var referenceComponent;
		if (index !== undefined) {
			referenceComponent = components[index];
		}
		var element = this.getElement();
		var componentElement = component.getElement();
		var referenceElement;
		if (referenceComponent) {
			referenceElement = referenceComponent.getElement();
		}
		element.insertBefore(componentElement, referenceElement || null);
	}
	jsuis.lf.Container.prototype.removeChild = function(component) {
		var element = this.getElement();
		var componentElement = component.getElement();
		element.removeChild(componentElement);
	}
	jsuis.lf.Container.prototype.add = function(component, constraints, index) {
		component = component.getPeer();
		this.addChild(component, constraints, index);
		if (constraints !== null && constraints !== undefined) {
			if (constraints instanceof jsuis.Cloneable) {
				constraints = constraints.clone();
			}
			component.setConstraints(constraints);
		}
		component.setParent(this);
		var components = this.getComponents();
		if (index !== undefined) {
			components.splice(index, 0, component);
		} else {
			components.push(component);
		}
	}
	jsuis.lf.Container.prototype.remove = function(component) {
		component = component.getPeer();
		this.removeChild(component);
		component.setParent(undefined);
		var components = this.getComponents();
		var index = components.indexOf(component);
		if (index !== -1) {
			components.splice(index, 1);
		}
	}
	jsuis.lf.Container.prototype.removeAll = function() {
		var components = this.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			this.removeChild(component);
			component.setParent(undefined);
		}
		components.length = 0;
	}
	jsuis.lf.Container.prototype.getX = function() {
		return this.x || 0;
	}
	jsuis.lf.Container.prototype.setX = function(x) {
		this.x = x;
		var outsets = this.getOutsets();
		// x += outsets.getLeft();
		this.setStyleProperty("left", x + "px");
		return this;
	}
	jsuis.lf.Container.prototype.getY = function() {
		return this.y || 0;
	}
	jsuis.lf.Container.prototype.setY = function(y) {
		this.y = y;
		var outsets = this.getOutsets();
		// y += outsets.getTop();
		this.setStyleProperty("top", y + "px");
		return this;
	}
	jsuis.lf.Container.prototype.getOffsets = function() {
		var border = this.getBorder();
		if (border) {
			return border.getBorderOffsets(this);
		}
		return new jsuis.Insets();
	}
	jsuis.lf.Container.prototype.getLocation = function() {
		return new jsuis.Point(this.getX(), this.getY());
	}
	jsuis.lf.Container.prototype.setLocation = function(point) {
		var componentListeners = this.getComponentListeners();
		if (!componentListeners.length) {
			this.setX(point.getX());
			this.setY(point.getY());
		} else {
			var oldX = this.getX();
			var oldY = this.getY();
			var x = point.getX();
			var y = point.getY();
			this.setX(x);
			this.setY(y);
			if ((x !== oldX) || (y !== oldY)) {
				this.fireComponentMoved();
			}
		}
		return this;
	}
	jsuis.lf.Container.prototype.getWidth = function() {
		return this.width || 0;
	}
	jsuis.lf.Container.prototype.setWidth = function(width) {
		this.width = width;
		var outsets = this.getOutsets();
		// width -= outsets.getLeft() + outsets.getRight();
		var offsets = this.getOffsets();
		width -= offsets.getLeft() + offsets.getRight();
		if (width >= 0) {
			this.setStyleProperty("width", width + "px");
		}
		return this;
	}
	jsuis.lf.Container.prototype.getHeight = function() {
		return this.height || 0;
	}
	jsuis.lf.Container.prototype.setHeight = function(height) {
		this.height = height;
		var outsets = this.getOutsets();
		// height -= outsets.getTop() + outsets.getBottom();
		var offsets = this.getOffsets();
		height -= offsets.getTop() + offsets.getBottom();
		if (height >= 0) {
			this.setStyleProperty("height", height + "px");
		}
		return this;
	}
	jsuis.lf.Container.prototype.getMargin = function() {
		if (!this.margin) {
			this.margin = new jsuis.Insets();
		}
		return this.margin.clone();
	}
	jsuis.lf.Container.prototype.setMargin = function(margin) {
		if (!this.margin || margin) {
			this.margin = new jsuis.Insets();
		}
		if (margin) {
			this.margin
			.setTop(margin.getTop())
			.setLeft(margin.getLeft())
			.setBottom(margin.getBottom())
			.setRight(margin.getRight());
		}
		return this;
	}
	jsuis.lf.Container.prototype.getBorder = function() {
		return this.border;
	}
	jsuis.lf.Container.prototype.setBorder = function(border) {
		this.border = border;
		if (border) {
			border.paintBorder(this);
		}
		return this;
	}
	jsuis.lf.Container.prototype.setHtml = function(html) {
		var element = this.getElement();
		element.innerHTML = html;
		return this;
	}
	jsuis.lf.Container.prototype.getHtml = function() {
		var element = this.getElement();
		return element.innerHTML;
	}
	jsuis.lf.Container.prototype.setHorizontalAlignment = function(horizontalAlignment) {
		this.setStyleProperty("text-align", horizontalAlignment);
		this.horizontalAlignment = horizontalAlignment;
		return this;
	}
	jsuis.lf.Container.prototype.getPreferredSize = function() {
		var constraints = nvl(this.getConstraints(), new jsuis.Constraints());
		var layoutPaddingMargin = constraints.getPadding().add(constraints.getMargin());
		var preferredSize = this.preferredSize;
		if (preferredSize) {
			return preferredSize.add(
					layoutPaddingMargin.getDimension());
		}
		var layout = this.getLayout();
		if (layout) {
			var preferredLayoutSize = layout.preferredLayoutSize(this);
			return preferredLayoutSize;
		}
		var element = this.getElement();
		var bbox = element.getBoundingClientRect();
		return new jsuis.Dimension(Math.ceil(bbox.width), Math.ceil(bbox.height)).add(
				layoutPaddingMargin.getDimension());
	}
	jsuis.lf.Container.prototype.setPreferredSize = function(preferredSize) {
		this.preferredSize = preferredSize ? preferredSize.clone() : preferredSize;
		return this;
	}
	jsuis.lf.Container.prototype.getMinimumSize = function() {
		var minimumSize = this.minimumSize;
		if (minimumSize) {
			return minimumSize;
		}
		var layout = this.getLayout();
		if (layout) {
			var minimumLayoutSize = layout.minimumLayoutSize(this);
			return minimumLayoutSize;
		}
		return this.getPreferredSize();
	}
	jsuis.lf.Container.prototype.setMinimumSize = function(minimumSize) {
		this.minimumSize = minimumSize ? minimumSize.clone() : minimumSize;
		return this;
	}
	jsuis.lf.Container.prototype.getBounds = function() {
		return new jsuis.Rectangle(this.getX(), this.getY(), this.getWidth(), this.getHeight());
	}
	jsuis.lf.Container.prototype.setBounds = function(rectangle) {
		this.setLocation(rectangle.getPoint());
		this.setSize(rectangle.getDimension());
		return this;
	}
	jsuis.lf.Container.prototype.getPadding = function() {
		if (!this.padding) {
			this.padding = new jsuis.Insets();
		}
		return this.padding.clone();
	}
	jsuis.lf.Container.prototype.setPadding = function(padding) {
		if (!this.padding || padding) {
			this.padding = new jsuis.Insets();
		}
		if (padding) {
			this.padding
			.setTop(padding.getTop())
			.setLeft(padding.getLeft())
			.setBottom(padding.getBottom())
			.setRight(padding.getRight());
		}
		return this;
	}
	jsuis.lf.Container.prototype.getInsets = function() {
		var constraints = nvl(this.getConstraints(), new jsuis.Constraints());
		var insets = this.getPadding().add(constraints.getPadding());
		var border = this.getBorder();
		if (border) {
			return insets.add(border.getBorderInsets(this));
		}
		return insets;
	}
	jsuis.lf.Container.prototype.getOutsets = function() {
		var constraints = nvl(this.getConstraints(), new jsuis.Constraints());
		var outsets = this.getMargin().add(constraints.getMargin());
		var border = this.getBorder();
		if (border) {
			return outsets.add(border.getBorderOutsets(this));
		}
		return outsets;
	}
	jsuis.lf.Container.prototype.getSize = function() {
		return new jsuis.Dimension(this.getWidth(), this.getHeight());
	}
	jsuis.lf.Container.prototype.setSize = function(dimension) {
		this.setWidth(dimension.getWidth());
		this.setHeight(dimension.getHeight());
		return this;
	}
	jsuis.lf.Container.prototype.isLeftToRight = function() {
		return nvl(this.leftToRight, true);
	}
	jsuis.lf.Container.prototype.setLeftToRight = function(leftToRight) {
		this.leftToRight = leftToRight;
		return this;
	}
	jsuis.lf.Container.prototype.validate = function() {
		this.doLayout();
		var components = this.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			component.validate();
		}
	}
	jsuis.lf.Container.prototype.doLayout = function() {
		var layout = this.getLayout();
		if (layout) {
			layout.layoutContainer(this);
		}
	}
	jsuis.lf.Container.prototype.paint = function() {
		var border = this.getBorder();
		if (border) {
			border.paintBorder(this);
		}
		var components = this.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			try {
				component.paint();
			} catch (e) {
				console.log(component);
				console.log(e);
			}
		}
	}
	jsuis.lf.Container.prototype.isVisible = function() {
		return nvl(this.visible, true);
	}
	jsuis.lf.Container.prototype.setVisible = function(visible) {
		this.setStyleProperty("display", visible ? "" : "none");
		this.visible = visible;
		return this;
	}
	jsuis.lf.Container.prototype.getBackground = function() {
		return this.background;
	}
	jsuis.lf.Container.prototype.setBackground = function(background) {
		this.background = background;
		this.paint();
		return this;
	}
	jsuis.lf.Container.prototype.getForeground = function() {
		return this.foreground;
	}
	jsuis.lf.Container.prototype.setForeground = function(foreground) {
		this.foreground = foreground;
		this.paint();
		return this;
	}
	jsuis.lf.Container.prototype.getCursor = function() {
		return this.cursor;
	}
	jsuis.lf.Container.prototype.setCursor = function(cursor) {
		this.cursor = cursor;
		if (cursor) {
			this.setStyleProperty("cursor", nvl(cursor, "").toString());
		}
		return this;
	}
	jsuis.lf.Container.prototype.isPressed = function() {
		return this.pressed;
	}
	jsuis.lf.Container.prototype.setPressed = function(pressed) {
		this.pressed = pressed;
		return this;
	}
	jsuis.lf.Container.prototype.requestFocus = function() {
		var element = this.getElement();
		element.focus();
	}
	jsuis.lf.Container.prototype.getEventListener = function(type) {
		var eventListeners = this.getEventListeners();
		return eventListeners["on" + type];
	}
	jsuis.lf.Container.prototype.setEventListener = function(type, eventListener) {
		var oldEventListener = this.getEventListener(type);
		if (oldEventListener) {
			this.removeEventListener(type, oldEventListener);
		}
		this.addEventListener(type, eventListener);
		var eventListeners = this.getEventListeners();
		eventListeners["on" + type] = eventListener;
		return this;
	}
	jsuis.lf.Container.prototype.addEventListener = function(type, eventListener) {
		var element = this.getElement();
		element.addEventListener(type, eventListener);
	}
	jsuis.lf.Container.prototype.removeEventListener = function(type, eventListener) {
		var element = this.getElement();
		element.removeEventListener(type, eventListener);
	}
	jsuis.lf.Container.prototype.addComponentListener = function(componentListener) {
		var componentListeners = this.getComponentListeners();
		componentListeners.push(componentListener);
		var component = this;
		var listener = componentListener.getListener();
		if (listener.componentResized) {
			var onresize = this.getEventListener("resize");
			if (!onresize) {
				this.setEventListener("resize", function(event) {
					component.fireComponentResized(event);
				});
			}
		}
	}
	jsuis.lf.Container.prototype.removeComponentListener = function(componentListener) {
		var componentListeners = this.getComponentListeners();
		var index = componentListeners.indexOf(componentListener);
		if (index !== -1) {
			componentListeners.splice(index, 1);
		}
	}
	jsuis.lf.Container.prototype.fireComponentResized = function(domEvent) {
		var event = new jsuis.lf.ComponentEvent(domEvent).setSource(this).setId(jsuis.Constants.COMPONENT_RESIZED);
		var componentListeners = this.getComponentListeners();
		for (var i = 0; i < componentListeners.length; i++) {
			var componentListener = componentListeners[i];
			componentListener.componentResized(event);
		}
	}
	jsuis.lf.Container.prototype.fireComponentMoved = function() {
		var event = new jsuis.lf.ComponentEvent().setSource(this).setId(jsuis.Constants.COMPONENT_MOVED);
		var componentListeners = this.getComponentListeners();
		for (var i = 0; i < componentListeners.length; i++) {
			var componentListener = componentListeners[i];
			componentListener.componentMoved(event);
		}
	}
	jsuis.lf.Container.prototype.addMouseAdapter = function(mouseAdapter) {
		var mouseListeners = this.getMouseListeners();
		var mouseMotionListeners = this.getMouseMotionListeners();
		// TODO MouseWheelListener
		if (mouseAdapter instanceof jsuis.MouseAdapter) {
			mouseListeners.push(mouseAdapter);
			mouseMotionListeners.push(mouseAdapter);
		} else if (mouseAdapter instanceof jsuis.MouseListener) {
			mouseListeners.push(mouseAdapter);
		} else if (mouseAdapter instanceof jsuis.MouseMotionListener) {
			mouseMotionListeners.push(mouseAdapter);
		} else {
			return;
		}
		var component = this;
		var listener = mouseAdapter.getListener();
		if (listener.mouseClicked) {
			var onclick = this.getEventListener("click");
			if (!onclick) {
				this.setEventListener("click", function(event) {
					component.fireMouseClicked(event);
				});
			}
			var ondblclick = this.getEventListener("dblclick");
			if (!ondblclick) {
				this.setEventListener("dblclick", function(event) {
					component.fireMouseDoubleClicked(event);
				});
			}
			var oncontextmenu = this.getEventListener("contextmenu");
			if (!oncontextmenu) {
				this.setEventListener("contextmenu", function(event) {
					component.fireMouseRightClicked(event);
				});
			}
		}
		if (listener.mousePressed || listener.mouseReleased || listener.mouseDragged) {
			var onmousedown = this.getEventListener("pointerdown");
			if (!onmousedown) {
				if ("onpointerdown" in window) {
					this.setEventListener("pointerdown", function(event) {
						component.fireMousePressed(event);
					});
				} else {
					this.setEventListener("mousedown", function(event) {
						component.fireMousePressed(event);
					});
				}
			}
			var browserWindow = jsuis.lf.BrowserWindow.getInstance();
			var browserWindowMouseListeners = browserWindow.getMouseListeners();
			var i = 0;
			for (; i < browserWindowMouseListeners.length; i++) {
				var browserWindowMouseListener = browserWindowMouseListeners[i];
				if (browserWindowMouseListener.getListenerComponent() === this) {
					break;
				}
			}
			if (i === browserWindowMouseListeners.length) {
				var mouseListener = new jsuis.MouseListener({
					mouseReleased: function(event) {
						var component = this.getListenerComponent();
						if (component.isPressed()) {
							component.fireMouseReleased(event.getElement());
						}
					}
				});
				mouseListener.setListenerComponent(this);
				browserWindow.addMouseListener(mouseListener);
			}
		}
		if (listener.mouseEntered) {
			var onmouseenter = this.getEventListener("pointerenter");
			if (!onmouseenter) {
				if ("onpointerenter" in window) {
					this.setEventListener("pointerenter", function(event) {
						component.fireMouseEntered(event);
					});
				} else {
					this.setEventListener("mouseenter", function(event) {
						component.fireMouseEntered(event);
					});
				}
			}
		}
		if (listener.mouseExited) {
			var onmouseleave = this.getEventListener("pointerleave");
			if (!onmouseleave) {
				if ("onpointerleave" in window) {
					this.setEventListener("pointerleave", function(event) {
						component.fireMouseExited(event);
					});
				} else {
					this.setEventListener("mouseleave", function(event) {
						component.fireMouseExited(event);
					});
				}
			}
		}
		if (listener.mouseMoved) {
			var onmousemove = this.getEventListener("pointermove");
			if (!onmousemove) {
				if ("onpointermove" in window) {
					this.setEventListener("pointermove", function(event) {
						component.fireMouseMoved(event);
					});
				} else {
					this.setEventListener("mousemove", function(event) {
						component.fireMouseMoved(event);
					});
				}
			}
		}
		if (listener.mouseDragged) {
			var browserWindow = jsuis.lf.BrowserWindow.getInstance();
			var browserWindowMouseMotionListeners = browserWindow.getMouseMotionListeners();
			var i = 0;
			for (; i < browserWindowMouseMotionListeners.length; i++) {
				var browserWindowMouseMotionListener = browserWindowMouseMotionListeners[i];
				if (browserWindowMouseMotionListener.getListenerComponent() === this) {
					break;
				}
			}
			if (i === browserWindowMouseMotionListeners.length) {
				var mouseMotionListener = new jsuis.MouseMotionListener({
					mouseDragged: function(event) {
						var component = this.getListenerComponent();
						if (component.isPressed()) {
							component.fireMouseDragged(event.getElement());
						}
					}
				});
				mouseMotionListener.setListenerComponent(this);
				browserWindow.addMouseMotionListener(mouseMotionListener);
			}
		}
	}
	jsuis.lf.Container.prototype.removeMouseAdapter = function(mouseAdapter) {
		this.removeMouseListener(mouseAdapter);
		this.removeMouseMotionListener(mouseAdapter);
	}
	jsuis.lf.Container.prototype.addMouseListener = function(mouseListener) {
		this.addMouseAdapter(mouseListener);
	}
	jsuis.lf.Container.prototype.removeMouseListener = function(mouseListener) {
		var mouseListeners = this.getMouseListeners();
		var index = mouseListeners.indexOf(mouseListener);
		if (index !== -1) {
			mouseListeners.splice(index, 1);
		}
	}
	jsuis.lf.Container.prototype.fireMouseClicked = function(domEvent) {
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_CLICKED);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseClicked(mouseEvent);
		}
	}
	jsuis.lf.Container.prototype.fireMouseDoubleClicked = function(domEvent) {
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_CLICKED).setClickCount(2);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseClicked(mouseEvent);
		}
	}
	jsuis.lf.Container.prototype.fireMouseRightClicked = function(domEvent) {
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_CLICKED).setPopupTrigger(true);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseClicked(mouseEvent);
		}
	}
	jsuis.lf.Container.prototype.fireMousePressed = function(domEvent) {
		this.setPressed(true);
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_PRESSED);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mousePressed(mouseEvent);
		}
	}
	jsuis.lf.Container.prototype.fireMouseReleased = function(domEvent) {
		this.setPressed(false);
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_RELEASED);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseReleased(mouseEvent);
		}
	}
	jsuis.lf.Container.prototype.fireMouseEntered = function(domEvent) {
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_ENTERED);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseEntered(mouseEvent);
		}
	}
	jsuis.lf.Container.prototype.fireMouseExited = function(domEvent) {
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_EXITED);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseExited(mouseEvent);
		}
	}
	jsuis.lf.Container.prototype.addMouseMotionListener = function(mouseMotionListener) {
		this.addMouseAdapter(mouseMotionListener);
	}
	jsuis.lf.Container.prototype.removeMouseMotionListener = function(mouseMotionListener) {
		var mouseMotionListeners = this.getMouseMotionListeners();
		var index = mouseMotionListeners.indexOf(mouseMotionListener);
		if (index !== -1) {
			mouseMotionListeners.splice(index, 1);
		}
	}
	jsuis.lf.Container.prototype.fireMouseMoved = function(domEvent) {
		if (this.isPressed()) {
			return;
		}
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_MOVED);
		var mouseMotionListeners = this.getMouseMotionListeners();
		for (var i = 0; i < mouseMotionListeners.length; i++) {
			var mouseMotionListener = mouseMotionListeners[i];
			mouseMotionListener.mouseMoved(mouseEvent);
		}
	}
	jsuis.lf.Container.prototype.fireMouseDragged = function(domEvent) {
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_DRAGGED);
		var mouseMotionListeners = this.getMouseMotionListeners();
		for (var i = 0; i < mouseMotionListeners.length; i++) {
			var mouseMotionListener = mouseMotionListeners[i];
			mouseMotionListener.mouseDragged(mouseEvent);
		}
	}
	jsuis.lf.Container.prototype.addTouchListener = function(touchListener) {
		var touchListeners = this.getTouchListeners();
		touchListeners.push(touchListener);
		var component = this;
		var listener = touchListener.getListener();
		if (listener.touchPressed) {
			var ontouchstart = this.getEventListener("touchstart");
			if (!ontouchstart) {
				this.setEventListener("touchstart", function(event) {
					component.fireTouchPressed(event);
				});
			}
		}
		if (listener.touchReleased) {
			var ontouchend = this.getEventListener("touchend");
			if (!ontouchend) {
				this.setEventListener("touchend", function(event) {
					component.fireTouchReleased(event);
				});
			}
		}
		if (listener.touchMoved) {
			var ontouchmove = this.getEventListener("touchmove");
			if (!ontouchmove) {
				this.setEventListener("touchmove", function(event) {
					component.fireTouchMoved(event);
				});
			}
		}
	}
	jsuis.lf.Container.prototype.removeTouchListener = function(touchListener) {
		var touchListeners = this.getTouchListeners();
		var index = touchListeners.indexOf(touchListener);
		if (index !== -1) {
			touchListeners.splice(index, 1);
		}
	}
	jsuis.lf.Container.prototype.fireTouchPressed = function(domEvent) {
		var touchEvent = new jsuis.lf.TouchEvent(domEvent).setSource(this).setId(jsuis.Constants.TOUCH_PRESSED);
		var touchListeners = this.getTouchListeners();
		for (var i = 0; i < touchListeners.length; i++) {
			var touchListener = touchListeners[i];
			touchListener.touchPressed(touchEvent);
		}
	}
	jsuis.lf.Container.prototype.fireTouchReleased = function(domEvent) {
		var touchEvent = new jsuis.lf.TouchEvent(domEvent).setSource(this).setId(jsuis.Constants.TOUCH_RELEASED);
		var touchListeners = this.getTouchListeners();
		for (var i = 0; i < touchListeners.length; i++) {
			var touchListener = touchListeners[i];
			touchListener.touchReleased(touchEvent);
		}
	}
	jsuis.lf.Container.prototype.fireTouchMoved = function(domEvent) {
		var touchEvent = new jsuis.lf.TouchEvent(domEvent).setSource(this).setId(jsuis.Constants.TOUCH_MOVED);
		var touchListeners = this.getTouchListeners();
		for (var i = 0; i < touchListeners.length; i++) {
			var touchListener = touchListeners[i];
			touchListener.touchMoved(touchEvent);
		}
	}
	jsuis.lf.Container.prototype.addFocusListener = function(focusListener) {
		var focusListeners = this.getFocusListeners();
		focusListeners.push(focusListener);
		var component = this;
		var listener = focusListener.getListener();
		if (listener.focusGained) {
			var onfocus = this.getEventListener("focus");
			if (!onfocus) {
				this.setEventListener("focus", function(event) {
					component.fireFocusGained(event);
				});
			}
		}
		if (listener.focusLost) {
			var onblur = this.getEventListener("blur");
			if (!onblur) {
				this.setEventListener("blur", function(event) {
					component.fireFocusLost(event);
				});
			}
		}
	}
	jsuis.lf.Container.prototype.removeFocusListener = function(focusListener) {
		var focusListeners = this.getFocusListeners();
		var index = focusListeners.indexOf(focusListener);
		if (index !== -1) {
			focusListeners.splice(index, 1);
		}
	}
	jsuis.lf.Container.prototype.fireFocusGained = function(domEvent) {
		var focusEvent = new jsuis.lf.FocusEvent(domEvent).setSource(this).setId(jsuis.Constants.FOCUS_GAINED);
		var focusListeners = this.getFocusListeners();
		for (var i = 0; i < focusListeners.length; i++) {
			var focusListener = focusListeners[i];
			focusListener.focusGained(focusEvent);
		}
	}
	jsuis.lf.Container.prototype.fireFocusLost = function(domEvent) {
		var focusEvent = new jsuis.lf.FocusEvent(domEvent).setSource(this).setId(jsuis.Constants.FOCUS_LOST);
		var focusListeners = this.getFocusListeners();
		for (var i = 0; i < focusListeners.length; i++) {
			var focusListener = focusListeners[i];
			focusListener.focusLost(focusEvent);
		}
	}
	jsuis.lf.Container.prototype.addActionListener = function(actionListener) {
		var actionListeners = this.getActionListeners();
		actionListeners.push(actionListener);
		var mouseListener = new jsuis.MouseListener({
			mouseClicked: function(event) {
				var source = event.getSource();
				source.fireActionPerformed(event.getElement());
			}
		});
		mouseListener.setListenerComponent(actionListener.getListenerComponent());
		this.addMouseListener(mouseListener);
	}
	jsuis.lf.Container.prototype.removeActionListener = function(actionListener) {
		var actionListeners = this.getActionListeners();
		var index = actionListeners.indexOf(actionListener);
		if (index !== -1) {
			actionListeners.splice(index, 1);
		}
	}
	jsuis.lf.Container.prototype.fireActionPerformed = function(domEvent) {
		var event = new jsuis.lf.ActionEvent(domEvent).setSource(this).setId(jsuis.Constants.ACTION_PERFORMED).setActionCommand(this.getActionCommand());
		var actionListeners = this.getActionListeners();
		for (var i = 0; i < actionListeners.length; i++) {
			var actionListener = actionListeners[i];
			actionListener.actionPerformed(event);
		}
	}
}) (jsuis);

/**
 * jsuis.lf.Event
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.lf.Event = jsuis.Object.extend(SUPER, function(event) {
		SUPER.prototype.constructor.call(this);
		this.setElement(event);
	});
	jsuis.Object.addProperties(jsuis.lf.Event, {
		source: null,
		id: null
	});
	
	jsuis.lf.Event.prototype.setComponent = jsuis.lf.Event.prototype.setSource;
	jsuis.lf.Event.prototype.getComponent = jsuis.lf.Event.prototype.getSource;
	
	jsuis.lf.Event.prototype.preventDefault = function() {
		var element = this.getElement();
		if (element) {
			element.preventDefault();
		}
	}
	
	jsuis.lf.Event.prototype.stopPropagation = function() {
		var element = this.getElement();
		if (element) {
			element.stopPropagation();
		}
	}
}) (jsuis);

/**
 * jsuis.lf.Icon
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.lf.Icon = jsuis.Object.extend(SUPER, function(iconWidth, iconHeight) {
		SUPER.prototype.constructor.call(this);
		this.setIconWidth(iconWidth);
		this.setIconHeight(iconHeight);
	});
	jsuis.Object.addProperties(jsuis.lf.Icon, {
		iconWidth: 0,
		iconHeight: 0
	});
}) (jsuis);

/**
 * jsuis.lf.Listener
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.lf.Listener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this);
		this.setListener(listener);
	});
	jsuis.Object.addProperties(jsuis.lf.Listener, {
		listener: null,
		listenerComponent: null
	});
}) (jsuis);

/**
 * jsuis.lf.Timer
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.lf.Timer = jsuis.Object.extend(SUPER, function(delay, actionListener) {
		SUPER.prototype.constructor.call(this);
		this.setActionListeners([]);
		this.setDelay(delay);
		this.addActionListener(actionListener);
		this.setInitialDelay(delay);
		this.setRepeats(true);
	});
	jsuis.Object.addProperties(jsuis.lf.Timer, {
		actionListeners: null,
		delay: 0,
		actionListener: null,
		initialDelay: 0,
		timeout: null,
		interval: null,
		actionCommand: null
	});
	jsuis.lf.Timer.prototype.addActionListener = function(actionListener) {
		var actionListeners = this.getActionListeners();
		actionListeners.push(actionListener);
	}
	jsuis.lf.Timer.prototype.removeActionListener = function(actionListener) {
		var actionListeners = this.getActionListeners();
		var index = actionListeners.indexOf(actionListener);
		if (index !== -1) {
			actionListeners.splice(index, 1);
		}
	}
	jsuis.lf.Timer.prototype.fireActionPerformed = function() {
		var event = new jsuis.lf.ActionEvent().setSource(this).setId(jsuis.Constants.ACTION_PERFORMED).setActionCommand(this.getActionCommand());
		var actionListeners = this.getActionListeners();
		for (var i = 0; i < actionListeners.length; i++) {
			var actionListener = actionListeners[i];
			actionListener.actionPerformed(event);
		}
	}
	jsuis.lf.Timer.prototype.isRepeats = function() {
		return this.repeats;
	}
	jsuis.lf.Timer.prototype.setRepeats = function(repeats) {
		this.repeats = repeats;
		return this;
	}
	jsuis.lf.Timer.prototype.start = function() {
		this.stop();
		var initialDelay = this.getInitialDelay();
		var timer = this;
		var timeout = setTimeout(function() {
			timer.fireActionPerformed();
			var repeats = timer.isRepeats();
			if (repeats) {
				timer.stopInterval();
				var delay = timer.getDelay();
				var interval = setInterval(function() {
					timer.fireActionPerformed();
				}, delay);
				timer.setInterval(interval);
			}
		}, initialDelay);
		this.setTimeout(timeout);
	}
	jsuis.lf.Timer.prototype.stop = function() {
		try {
			this.stopInterval();
		} finally {
			this.stopTimeout();
		}
	}
	jsuis.lf.Timer.prototype.stopInterval = function() {
		var interval = this.getInterval();
		if (interval) {
			clearInterval(interval);
			interval = null;
		}
	}
	jsuis.lf.Timer.prototype.stopTimeout = function() {
		var timeout = this.getTimeout();
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}
	}
}) (jsuis);

/**
 * jsuis.lf.TreeCellRenderer
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.lf.TreeCellRenderer = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
		this.setRowHeight(18);
	});
	jsuis.Object.addProperties(jsuis.lf.TreeCellRenderer, {
		rowHeight: 0,
		icons: null
	});
	jsuis.lf.TreeCellRenderer.prototype.getIcon = function(key) {
		var icons = this.getIcons();
		if (!icons) {
			icons = {};
			this.setIcons(icons);
		}
		return icons[key];
	}
	jsuis.lf.TreeCellRenderer.prototype.setIcon = function(key, icon) {
		var icons = this.getIcons();
		if (!icons) {
			icons = {};
			this.setIcons(icons);
		}
		icons[key] = icon;
		return this;
	}
	jsuis.lf.TreeCellRenderer.prototype.getTreeCellRendererComponent = function(
			tree, value, sel, expanded, leaf, row, hasFocus) {
		var treeCellRendererComponent = new jsuis.lf.Button();
		treeCellRendererComponent.setBorder(new jsuis.lf.Border());
		treeCellRendererComponent.setBackground(jsuis.Color.Black.withAlpha(0));
		treeCellRendererComponent.setText(nvl(value, "").toString(), jsuis.Constraints.CENTER.withFill(jsuis.Constants.BOTH));
		var icon;
		if (icon) {
			treeCellRendererComponent.setIcon(this.getIcon(icon));
		} else if (leaf) {
			treeCellRendererComponent.setIcon(this.getIcon("leaf"));
		} else if (expanded) {
			treeCellRendererComponent.setIcon(this.getIcon("open"));
		} else {
			treeCellRendererComponent.setIcon(this.getIcon("closed"));
		}
		return treeCellRendererComponent;
	}
}) (jsuis);

/**
 * jsuis.lf.UndoableEdit
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.lf.UndoableEdit = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.lf.UndoableEdit.prototype.undo = function() {
	}
	jsuis.lf.UndoableEdit.prototype.redo = function() {
	}
})(jsuis);

/**
 * jsuis.lf.UndoManager
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.lf.UndoManager = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
		this.setEdits([]);
		this.setIndex(0);
	});
	jsuis.Object.addProperties(jsuis.lf.UndoManager, {
		edits: null,
		index: 0
	});
	jsuis.lf.UndoManager.prototype.addEdit = function(edit) {
		var edits = this.getEdits();
		var index = this.getIndex();
		edits.splice(index);
		edits.push(edit);
		this.setIndex(edits.length);
	}
	jsuis.lf.UndoManager.prototype.editToBeUndone = function() {
		var edits = this.getEdits();
		var index = this.getIndex();
		if (index > 0) {
			return edits[index - 1];
		}
		return null;
	}
	jsuis.lf.UndoManager.prototype.editToBeRedone = function() {
		var edits = this.getEdits();
		var index = this.getIndex();
		if (index < edits.length) {
			return edits[index];
		}
		return null;
	}
	jsuis.lf.UndoManager.prototype.undo = function() {
		var edit = this.editToBeUndone();
		if (edit) {
			edit.undo();
			this.setIndex(this.getIndex() - 1);
		}
	}
	jsuis.lf.UndoManager.prototype.redo = function() {
		var edit = this.editToBeRedone();
		if (edit) {
			edit.redo();
			this.setIndex(this.getIndex() + 1);
		}
	}
	jsuis.lf.UndoManager.prototype.canUndo = function() {
		var edit = this.editToBeUndone();
		return edit !== null;
	}
	jsuis.lf.UndoManager.prototype.canRedo = function() {
		var edit = this.editToBeRedone();
		return edit !== null;
	}
})(jsuis);

/**
 * jsuis.ActionListener
 */
(function(jsuis) {
	var SUPER = jsuis.Listener;
	jsuis.ActionListener = jsuis.Object.extend(SUPER, function(listener) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ActionListener(listener));
	});
	jsuis.ActionListener.prototype.actionPerformed = function(event) {
		var peer = this.getPeer();
		peer.actionPerformed(event);
	}
}) (jsuis);

/**
 * jsuis.ArrowBorder
 */
(function(jsuis) {
	var SUPER = jsuis.Border;
	jsuis.ArrowBorder = jsuis.Object.extend(SUPER, function(color, thickness, x1, y1, x2, y2) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ArrowBorder(color, thickness, x1, y1, x2, y2));
	});
	jsuis.Object.addPeerProperties(jsuis.ArrowBorder, {
		color: null,
		thickness: 0,
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0
	});
}) (jsuis);

/**
 * jsuis.Body
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Body = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Body());
	});
	var instance;
	jsuis.Body.getInstance = function() {
		if (!instance) {
			instance = new jsuis.Body();
		}
		return instance;
	}
}) (jsuis);

/**
 * jsuis.BorderLayout
 */
(function(jsuis) {
	var SUPER = jsuis.Layout;
	jsuis.BorderLayout = jsuis.Object.extend(SUPER, function(hgap, vgap, sort) {
		SUPER.prototype.constructor.call(this);
		hgap = nvl(hgap, 0);
		vgap = nvl(vgap, hgap);
		this.setHgap(hgap);
		this.setVgap(vgap);
		this.setSort(nvl(sort, true));
	});
	jsuis.Object.addProperties(jsuis.BorderLayout, {
		hgap: 0,
		vgap: 0,
		sort: false
	});
	var comparator;
	jsuis.BorderLayout.getComparator = function() {
		if (!comparator) {
			comparator = function(a, b) {
				var aConstraints = a.getConstraints();
				if (!aConstraints) {
					aConstraints = jsuis.Constraints.CENTER.clone();
					a.setConstraints(aConstraints);
				}
				var bConstraints = b.getConstraints();
				if (!bConstraints) {
					bConstraints = jsuis.Constraints.CENTER.clone();
					b.setConstraints(bConstraints);
				}
				if (aConstraints.getBorder() === jsuis.Constants.CENTER) {
					if (bConstraints.getBorder() === jsuis.Constants.CENTER) {
						return 0;
					} else {
						return 1;
					}
				} else {
					if (bConstraints.getBorder() === jsuis.Constants.CENTER) {
						return -1;
					} else {
						return 0;
					}
				}
			};
		}
		return comparator;
	}
	jsuis.BorderLayout.prototype.preferredLayoutSize = function(parent) {
		var preferredLayoutWidth = 0;
		var preferredLayoutHeight = 0;
		var hgap = this.getHgap();
		var vgap = this.getVgap();
		var components = parent.getComponents().slice();
		var sort = this.isSort();
		if (sort) {
			components.sort(jsuis.BorderLayout.getComparator());
		}
		for (var i = components.length - 1; i >= 0; i--) {
			var component = components[i];
			var constraints = component.getConstraints();
			if (!constraints) {
				constraints = jsuis.Constraints.CENTER.clone();
				component.setConstraints(constraints);
			}
			if (!component.isVisible()) {
				continue;
			}
			var componentPreferredSize = component.getPreferredSize();
			var outsets = component.getOutsets();
			var componentWidth = componentPreferredSize.getWidth() + hgap + outsets.getLeft() + outsets.getRight();
			var componentHeight = componentPreferredSize.getHeight() + vgap + outsets.getTop() + outsets.getBottom();
			switch (constraints.getBorder()) {
			case jsuis.Constants.NORTH:
			case jsuis.Constants.PAGE_START:
			case jsuis.Constants.TOP:
			case jsuis.Constants.SOUTH:
			case jsuis.Constants.PAGE_END:
			case jsuis.Constants.BOTTOM:
				preferredLayoutWidth = Math.max(preferredLayoutWidth, componentWidth);
				preferredLayoutHeight += componentHeight;
				break;
			case jsuis.Constants.WEST:
			case jsuis.Constants.LINE_START:
			case jsuis.Constants.LEFT:
			case jsuis.Constants.EAST:
			case jsuis.Constants.LINE_END:
			case jsuis.Constants.RIGHT:
				preferredLayoutWidth += componentWidth;
				preferredLayoutHeight = Math.max(preferredLayoutHeight, componentHeight);
				break;
			case jsuis.Constants.CENTER:
			default:
				preferredLayoutWidth = Math.max(preferredLayoutWidth, componentWidth);
				preferredLayoutHeight = Math.max(preferredLayoutHeight, componentHeight);
			}
		}
		if (components.length) {
			preferredLayoutWidth -= hgap;
			preferredLayoutHeight -= vgap;
		}
		var parentInsets = parent.getInsets();
		preferredLayoutWidth += parentInsets.getLeft() + parentInsets.getRight();
		preferredLayoutHeight += parentInsets.getTop() + parentInsets.getBottom();
		return new jsuis.Dimension(preferredLayoutWidth, preferredLayoutHeight);
	}
	jsuis.BorderLayout.prototype.layoutContainer = function(parent) {
		var m = 1;
		for (var l = 0; l < m; l++) {
			var x = 0;
			var y = 0;
			var width = parent.getWidth();
			var height = parent.getHeight();
			var hgap = this.getHgap();
			var vgap = this.getVgap();
			var parentInsets = parent.getInsets();
			width -= parentInsets.getLeft() + parentInsets.getRight();
			height -= parentInsets.getTop() + parentInsets.getBottom();
			var offsets = parent.getOffsets();
			x += parentInsets.getLeft() - offsets.getLeft();
			y += parentInsets.getTop() - offsets.getTop();
			x += hgap / 2;
			y += vgap / 2;
			width += hgap;
			height += vgap;
			var components = parent.getComponents().slice();
			var sort = this.isSort();
			if (sort) {
				components.sort(jsuis.BorderLayout.getComparator());
			}
			for (var i = 0; i < components.length; i++) {
				var component = components[i];
				var constraints = component.getConstraints();
				if (!constraints) {
					constraints = jsuis.Constraints.CENTER.clone();
					component.setConstraints(constraints);
				}
				if (!component.isVisible() && constraints.getBorder() !== jsuis.Constants.CENTER) {
					continue;
				}
				var layout = component.getLayout();
				if (layout instanceof jsuis.FlowLayout) {
					m = 2;
				}
				var componentPreferredSize = component.getPreferredSize();
				var outsets = component.getOutsets();
				var componentX = 0;
				var componentY = 0;
				var componentWidth = componentPreferredSize.getWidth() + hgap + outsets.getLeft() + outsets.getRight();
				var componentHeight = componentPreferredSize.getHeight() + vgap + outsets.getTop() + outsets.getBottom();
				switch (constraints.getBorder()) {
				case jsuis.Constants.NORTH:
				case jsuis.Constants.PAGE_START:
				case jsuis.Constants.TOP:
					componentX = x;
					componentY = y;
					componentWidth = width;
					component.setSize(new jsuis.Dimension(componentWidth - hgap, componentHeight));
					componentHeight = Math.max(componentHeight, component.getMinimumSize().getHeight() + vgap);
					y += componentHeight;
					height -= componentHeight;
					break;
				case jsuis.Constants.SOUTH:
				case jsuis.Constants.PAGE_END:
				case jsuis.Constants.BOTTOM:
					componentX = x;
					componentY = y + height - componentHeight;
					componentWidth = width;
					component.setSize(new jsuis.Dimension(componentWidth - hgap, componentHeight));
					componentHeight = Math.max(componentHeight, component.getMinimumSize().getHeight() + vgap);
					height -= componentHeight;
					break;
				case jsuis.Constants.WEST:
				case jsuis.Constants.LINE_START:
				case jsuis.Constants.LEFT:
					componentX = x;
					componentY = y;
					componentHeight = height;
					x += componentWidth;
					width -= componentWidth;
					break;
				case jsuis.Constants.EAST:
				case jsuis.Constants.LINE_END:
				case jsuis.Constants.RIGHT:
					componentX = x + width - componentWidth;
					componentY = y;
					componentHeight = height;
					width -= componentWidth;
					break;
				case jsuis.Constants.CENTER:
				default:
					componentX = x;
					componentY = y;
					componentWidth = width;
					componentHeight = height;
				}
				componentX -= hgap / 2;
				componentY -= vgap / 2;
				componentWidth -= hgap;
				componentHeight -= vgap;
				var outsets = component.getOutsets();
				var bounds = new jsuis.Rectangle(
						componentX + outsets.getLeft(),
						componentY + outsets.getTop(),
						componentWidth - outsets.getLeft() - outsets.getRight(),
						componentHeight - outsets.getTop() - outsets.getBottom());
				constraints.setBounds(bounds);
			}
			SUPER.prototype.layoutContainer.call(this, parent);
		}
	}
}) (jsuis);

/**
 * jsuis.Button
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Button = jsuis.Object.extend(SUPER, function(text, icon) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Button(text, icon));
	});
	jsuis.Object.addProperties(jsuis.Button, {
		action: null,
		propertyChangeListener: null
	});
	jsuis.Object.addPeerProperties(jsuis.Button, {
		text: null,
		icon: null,
		iconTextGap: null,
		selected: null,
		group: null
	});
	jsuis.Button.prototype.setAction = function(action) {
		var oldAction = this.getAction();
		if (oldAction && oldAction !== action) {
			this.removeActionListener(oldAction);
			var propertyChangeListener = this.getPropertyChangeListener();
			oldAction.removePropertyChangeListener(propertyChangeListener);
		}
		if (action) {
			this.addActionListener(action);
			var propertyChangeListener = new jsuis.PropertyChangeListener({
				propertyChange: function(event) {
					var button = this.getListenerComponent();
					var enabled = event.getNewValue();
					button.setEnabled(enabled);
				}
			});
			propertyChangeListener.setPropertyName("enabled");
			propertyChangeListener.setListenerComponent(this);
			this.setPropertyChangeListener(propertyChangeListener);
			action.addPropertyChangeListener(propertyChangeListener);
		}
		return this;
	}
}) (jsuis);

/**
 * jsuis.ComboBox
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.ComboBox = jsuis.Object.extend(SUPER, function(items) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ComboBox(items));
	});
	jsuis.Object.addPeerProperties(jsuis.ComboBox, {
		items: null,
		selectedIndex: 0,
		selectedItem: null
	});
}) (jsuis);

/**
 * jsuis.ComponentEvent
 */
(function(jsuis) {
	var SUPER = jsuis.Event;
	jsuis.ComponentEvent = jsuis.Object.extend(SUPER, function(event) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Event(event));
	});
}) (jsuis);

/**
 * jsuis.ComponentListener
 */
(function(jsuis) {
	var SUPER = jsuis.Listener;
	jsuis.ComponentListener = jsuis.Object.extend(SUPER, function(listener) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ComponentListener(listener));
	});
	jsuis.ComponentListener.prototype.componentResized = function(event) {
		var peer = this.getPeer();
		peer.componentResized(event);
	}
	jsuis.ComponentListener.prototype.componentMoved = function(event) {
		var peer = this.getPeer();
		peer.componentMoved(event);
	}
}) (jsuis);

/**
 * jsuis.CompoundBorder
 */
(function(jsuis) {
	var SUPER = jsuis.Border;
	jsuis.CompoundBorder = jsuis.Object.extend(SUPER, function(outsideBorder, insideBorder) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].CompoundBorder(outsideBorder, insideBorder));
	});
	jsuis.Object.addPeerProperties(jsuis.CompoundBorder, {
		outsideBorder: null,
		insideBorder: null
	});
	jsuis.CompoundBorder.prototype.getBorderInsets = function(component) {
		var outsideBorder = this.getOutsideBorder();
		var outsideBorderInsets = outsideBorder.getBorderInsets();
		var insideBorder = this.getInsideBorder();
		var insideBorderInsets = insideBorder.getBorderInsets();
		return new jsuis.Insets(
				outsideBorderInsets.getTop() + insideBorderInsets.getTop(),
				outsideBorderInsets.getLeft() + insideBorderInsets.getLeft(),
				outsideBorderInsets.getBottom() + insideBorderInsets.getBottom(),
				outsideBorderInsets.getRight() + insideBorderInsets.getRight());
	}
}) (jsuis);

/**
 * jsuis.Constraints
 */
(function(jsuis) {
	var SUPER = jsuis.Cloneable;
	jsuis.Constraints = jsuis.Object.extend(SUPER, function(
			layer, anchor, fill, margin, padding, border) {
		SUPER.prototype.constructor.call(this);
		this.setLayer(nvl(layer, jsuis.Constants.DEFAULT_LAYER));
		this.setAnchor(nvl(anchor, jsuis.Constants.CENTER));
		this.setFill(nvl(fill, jsuis.Constants.NONE));
		this.setMargin(nvl(margin, new jsuis.Insets()));
		this.setPadding(nvl(padding, new jsuis.Insets()));
		this.setBorder(nvl(border, jsuis.Constants.CENTER));
	});
	jsuis.Object.addProperties(jsuis.Constraints, {
		layer: null,
		anchor: null,
		fill: null,
		margin: null,
		padding: null,
		border: null,
		bounds: null
	});
	jsuis.Constraints.prototype.withLayer = function(layer) {
		return this.clone().setLayer(layer);
	}
	jsuis.Constraints.prototype.withAnchor = function(anchor) {
		return this.clone().setAnchor(anchor);
	}
	jsuis.Constraints.prototype.withFill = function(fill) {
		return this.clone().setFill(fill);
	}
	jsuis.Constraints.prototype.withMargin = function(margin) {
		return this.clone().setMargin(margin);
	}
	jsuis.Constraints.prototype.withPadding = function(padding) {
		return this.clone().setPadding(padding);
	}
	jsuis.Constraints.prototype.withBorder = function(border) {
		return this.clone().setBorder(border);
	}
	jsuis.Constraints.prototype.clone = function() {
		return new jsuis.Constraints(
				this.getLayer(), this.getAnchor(), this.getFill(),
				this.getMargin().clone(), this.getPadding().clone(),
				this.getBorder());
	}
	
	jsuis.CONSTRAINTS = jsuis.Object.extend(jsuis.Constraints, function(
			layer, anchor, fill, margin, padding, border) {
		jsuis.Constraints.prototype.constructor.call(this,
				layer, anchor, fill, margin, padding, border);
	});
	jsuis.Constraints.FRAME_CONTENT_LAYER = new jsuis.CONSTRAINTS(jsuis.Constants.FRAME_CONTENT_LAYER).withFill(jsuis.Constants.BOTH);
	jsuis.Constraints.DEFAULT_LAYER = new jsuis.CONSTRAINTS(jsuis.Constants.DEFAULT_LAYER).withFill(jsuis.Constants.BOTH);
	jsuis.Constraints.PALETTE_LAYER = new jsuis.CONSTRAINTS(jsuis.Constants.PALETTE_LAYER).withFill(jsuis.Constants.BOTH);
	jsuis.Constraints.MODAL_LAYER = new jsuis.CONSTRAINTS(jsuis.Constants.MODAL_LAYER).withFill(jsuis.Constants.BOTH);
	jsuis.Constraints.POPUP_LAYER = new jsuis.CONSTRAINTS(jsuis.Constants.POPUP_LAYER).withFill(jsuis.Constants.BOTH);
	jsuis.Constraints.DRAG_LAYER = new jsuis.CONSTRAINTS(jsuis.Constants.DRAG_LAYER).withFill(jsuis.Constants.BOTH);
	
	jsuis.CONSTRAINTS.prototype.setLayer = function(layer) {
	}
	jsuis.CONSTRAINTS.prototype.setAnchor = function(anchor) {
	}
	jsuis.CONSTRAINTS.prototype.setFill = function(fill) {
	}
	jsuis.CONSTRAINTS.prototype.setMargin = function(margin) {
	}
	jsuis.CONSTRAINTS.prototype.setPadding = function(padding) {
	}
	jsuis.CONSTRAINTS.prototype.setBorder = function(border) {
	}
}) (jsuis);

/**
 * jsuis.DesktopPane
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.DesktopPane = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].DesktopPane());
	});
	var instance;
	jsuis.DesktopPane.getInstance = function() {
		if (!instance) {
			instance = new jsuis.DesktopPane();
		}
		return instance;
	}
}) (jsuis);

/**
 * jsuis.Dialog
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Dialog = jsuis.Object.extend(SUPER, function(owner, modal) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Dialog(owner, modal));
	});
	jsuis.Object.addPeerProperties(jsuis.Dialog, {
		title: null,
		layeredPane: null,
		contentPane: null,
		visible: false
	});
	jsuis.Dialog.prototype.pack = function() {
		var peer = this.getPeer();
		peer.pack();
	}
	jsuis.Dialog.prototype.setLocationRelativeTo = function(component) {
		var peer = this.getPeer();
		peer.setLocationRelativeTo(component);
	}
	jsuis.Dialog.prototype.dispose = function() {
		var peer = this.getPeer();
		peer.dispose();
	}
}) (jsuis);

/**
 * jsuis.EmptyBorder
 */
(function(jsuis) {
	var SUPER = jsuis.Border;
	jsuis.EmptyBorder = jsuis.Object.extend(SUPER, function(top, left, bottom, right) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].EmptyBorder(top, left, bottom, right));
	});
	jsuis.Object.addPeerProperties(jsuis.EmptyBorder, {
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	});
	jsuis.EmptyBorder.prototype.getBorderInsets = function(component) {
		var top = this.getTop();
		var left = this.getLeft();
		var bottom = this.getBottom();
		var right = this.getRight();
		return new jsuis.Insets(top, left, bottom, right);
	}
}) (jsuis);

/**
 * jsuis.FileChooser
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.FileChooser = jsuis.Object.extend(SUPER, function(owner, modal) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].FileChooser(owner, modal));
	});
	jsuis.Object.addPeerProperties(jsuis.FileChooser, {
		selectedFile: null
	});
	jsuis.FileChooser.prototype.showOpenDialog = function(parent) {
		var peer = this.getPeer();
		return peer.showOpenDialog(parent);
	}
	jsuis.FileChooser.prototype.showSaveDialog = function(parent) {
		var peer = this.getPeer();
		return peer.showSaveDialog(parent);
	}
}) (jsuis);

/**
 * jsuis.FlowLayout
 */
(function(jsuis) {
	var SUPER = jsuis.Layout;
	jsuis.FlowLayout = jsuis.Object.extend(SUPER, function(align, hgap, vgap) {
		SUPER.prototype.constructor.call(this);
		this.setAlign(nvl(align, jsuis.Constants.CENTER));
		hgap = nvl(hgap, 4);
		vgap = nvl(vgap, hgap);
		this.setHgap(hgap);
		this.setVgap(vgap);
	});
	jsuis.Object.addProperties(jsuis.FlowLayout, {
		align: null,
		hgap: 0,
		vgap: 0
	});
	jsuis.FlowLayout.prototype.preferredLayoutSize = function(parent) {
		this.layoutContainer(parent);
		var preferredLayoutX = 0;
		var preferredLayoutWidth = 0;
		var preferredLayoutHeight = 0;
		var hgap = this.getHgap();
		var vgap = this.getVgap();
		var components = parent.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			if (!component.isVisible()) {
				continue;
			}
			var componentX = component.getX();
			var componentY = component.getY();
			var componentWidth = component.getWidth();
			var componentHeight = component.getHeight();
			preferredLayoutX = Math.min(preferredLayoutX, componentX);
			preferredLayoutWidth = Math.max(preferredLayoutWidth, componentX + componentWidth);
			preferredLayoutHeight = Math.max(preferredLayoutHeight, componentY + componentHeight);
		}
		preferredLayoutWidth = preferredLayoutWidth - preferredLayoutX + 2 * hgap;
		preferredLayoutHeight = preferredLayoutHeight - vgap + 2 * vgap;
		var parentInsets = parent.getInsets();
		preferredLayoutWidth += parentInsets.getLeft() + parentInsets.getRight();
		preferredLayoutHeight += parentInsets.getTop() + parentInsets.getBottom();
		return new jsuis.Dimension(preferredLayoutWidth, preferredLayoutHeight);
	}
	jsuis.FlowLayout.prototype.minimumLayoutSize = function(parent) {
		return this.preferredLayoutSize(parent);
	}
	jsuis.FlowLayout.prototype.layoutContainer = function(parent) {
		var m = 1;
		for (var l = 0; l < m; l++) {
			var minX = 0;
			var minY = 0;
			var maxWidth = parent.getWidth();
			var maxHeight = parent.getHeight();
			var hgap = this.getHgap();
			var vgap = this.getVgap();
			var parentInsets = parent.getInsets();
			maxWidth -= parentInsets.getLeft() + parentInsets.getRight() + 2 * hgap;
			maxHeight -= parentInsets.getTop() + parentInsets.getBottom() + 2 * vgap;
			var offsets = parent.getOffsets();
			minX += parentInsets.getLeft() - offsets.getLeft() + hgap;
			minY += parentInsets.getTop() - offsets.getTop() + vgap;
			minX += hgap / 2;
			minY += vgap / 2;
			maxWidth += hgap;
			maxHeight += vgap;
			var x = minX;
			var y = minY;
			var width = 0;
			var height = 0;
			var rowComponents = [];
			var components = parent.getComponents();
			for (var i = 0; i < components.length; i++) {
				var component = components[i];
				var constraints = component.getConstraints();
				if (!constraints) {
					constraints = new jsuis.Constraints();
					component.setConstraints(constraints);
				}
				if (!component.isVisible()) {
					continue;
				}
				var layout = component.getLayout();
				if (layout instanceof jsuis.FlowLayout) {
					m = 2;
				}
				var componentPreferredSize = component.getPreferredSize();
				var outsets = component.getOutsets();
				var componentX = x;
				var componentY = y;
				var componentWidth = componentPreferredSize.getWidth() + hgap + outsets.getLeft() + outsets.getRight();
				var componentHeight = componentPreferredSize.getHeight() + vgap + outsets.getTop() + outsets.getBottom();
				if ((componentX + componentWidth < maxWidth) || (rowComponents.length == 0)) {
					x += componentWidth;
					width += componentWidth;
					height = Math.max(height, componentHeight);
					component.setBounds(new jsuis.Rectangle(componentX - hgap / 2, componentY - vgap / 2,
							componentWidth - hgap, componentHeight - vgap));
					rowComponents.push(component);
				}
				if ((componentX + componentWidth >= maxWidth) || (i === components.length - 1)) {
					var dx = 0;
					var align = this.getAlign();
					switch (align) {
					case jsuis.Constants.LEFT:
					case jsuis.Constants.LEADING:
						break;
					case jsuis.Constants.RIGHT:
					case jsuis.Constants.TRAILING:
						dx = maxWidth - width;
						break;
					case jsuis.Constants.CENTER:
					default:
						dx = Math.round((maxWidth - width) / 2);
					}
					for (var j = 0; j < rowComponents.length; j++) {
						var rowComponent = rowComponents[j];
						var rowComponentX = rowComponent.getX();
						var rowComponentY = rowComponent.getY();
						var rowComponentWidth = rowComponent.getWidth();
						var rowComponentHeight = rowComponent.getHeight();
						rowComponentX += dx;
						rowComponentHeight = height - vgap;
						var bounds;
						var leftToRight = parent.isLeftToRight();
						if (leftToRight) {
							bounds = new jsuis.Rectangle(
									rowComponentX + outsets.getLeft(),
									rowComponentY + outsets.getTop(),
									rowComponentWidth - outsets.getLeft() - outsets.getRight(),
									rowComponentHeight - outsets.getTop() - outsets.getBottom());
						} else {
							bounds = new jsuis.Rectangle(parent.getWidth() - rowComponentX - rowComponentWidth + outsets.getLeft(),
									rowComponentY + outsets.getTop(),
									rowComponentWidth - outsets.getLeft() - outsets.getRight(),
									rowComponentHeight - outsets.getTop() - outsets.getBottom());
						}
						var constraints = rowComponent.getConstraints();
						constraints.setBounds(bounds);
					}
					rowComponents.length = 0;
					x = minX;
					y += height;
					width = 0;
					height = 0;
					if ((componentX + componentWidth >= maxWidth) && (x + componentWidth < maxWidth)) {
						i--;
					}
				}
			}
			SUPER.prototype.layoutContainer.call(this, parent);
		}
	}
}) (jsuis);

/**
 * jsuis.FocusListener
 */
(function(jsuis) {
	var SUPER = jsuis.Listener;
	jsuis.FocusListener = jsuis.Object.extend(SUPER, function(listener) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].FocusListener(listener));
	});
	jsuis.FocusListener.prototype.focusGained = function(event) {
		var peer = this.getPeer();
		peer.focusGained(event);
	}
	jsuis.FocusListener.prototype.focusLost = function(event) {
		var peer = this.getPeer();
		peer.focusLost(event);
	}
}) (jsuis);

/**
 * jsuis.Frame
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Frame = jsuis.Object.extend(SUPER, function(title) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Frame(title));
	});
	jsuis.Object.addPeerProperties(jsuis.Frame, {
		title: null,
		layeredPane: null,
		menuBar: null,
		contentPane: null,
		visible: false
	});
	jsuis.Frame.prototype.pack = function() {
		var peer = this.getPeer();
		peer.pack();
	}
	// TODO
	jsuis.Frame.prototype.setLocationRelativeTo = function(component) {
		var peer = this.getPeer();
		peer.setLocationRelativeTo(component);
	}
	jsuis.Frame.prototype.dispose = function() {
		var peer = this.getPeer();
		peer.dispose();
	}
}) (jsuis);

/**
 * jsuis.GridBagLayout
 */
(function(jsuis) {
	var SUPER = jsuis.Layout;
	jsuis.GridBagLayout = jsuis.Object.extend(SUPER, function(hgap, vgap) {
		SUPER.prototype.constructor.call(this);
		hgap = nvl(hgap, 0);
		vgap = nvl(vgap, hgap);
		this.setHgap(hgap);
		this.setVgap(vgap);
	});
	jsuis.Object.addProperties(jsuis.GridBagLayout, {
		hgap: 0,
		vgap: 0,
		widths: null,
		heights: null,
		weightxs: null,
		weightys: null
	});
	jsuis.GridBagLayout.prototype.preferredLayoutSize = function(parent) {
		var preferredLayoutWidth = 0;
		var preferredLayoutHeight = 0;
		var hgap = this.getHgap();
		var vgap = this.getVgap();
		var maxGridx = 0;
		var maxGridy = 0;
		var previousGridx = -1;
		var previousGridy = -1;
		var components = parent.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			var constraints = component.getConstraints();
			if (!constraints) {
				constraints = new jsuis.GridBagConstraints();
				component.setConstraints(constraints);
			}
			if (!component.isVisible()) {
				continue;
			}
			var gridx = constraints.getGridx();
			if (gridx === jsuis.Constants.RELATIVE) {
				gridx = previousGridx + 1;
				constraints.setRelativeGridx(gridx);
			}
			previousGridx = gridx;
			var gridy = constraints.getGridy();
			if (gridy === jsuis.Constants.RELATIVE) {
				gridy = previousGridy + 1;
				constraints.setRelativeGridy(gridy);
			}
			previousGridy = gridy;
			var gridwidth = constraints.getGridwidth();
			if (gridwidth === jsuis.Constants.REMAINDER) {
				maxGridx = Math.max(maxGridx, gridx);
			} else {
				maxGridx = Math.max(maxGridx, gridx + gridwidth - 1);
			}
			var gridheight = constraints.getGridheight();
			if (gridheight === jsuis.Constants.REMAINDER) {
				maxGridy = Math.max(maxGridy, gridy);
			} else {
				maxGridy = Math.max(maxGridy, gridy + gridheight - 1);
			}
		}
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			if (!component.isVisible()) {
				continue;
			}
			var constraints = component.getConstraints();
			var gridx = constraints.getGridx();
			if (gridx === jsuis.Constants.RELATIVE) {
				gridx = constraints.getRelativeGridx();
			}
			var gridwidth = constraints.getGridwidth();
			if (gridwidth === jsuis.Constants.REMAINDER) {
				constraints.setRemainderGridwidth(maxGridx - gridx + 1);
			}
			var gridy = constraints.getGridy();
			if (gridy === jsuis.Constants.RELATIVE) {
				gridy = constraints.getRelativeGridy();
			}
			var gridheight = constraints.getGridheight();
			if (gridheight === jsuis.Constants.REMAINDER) {
				constraints.setRemainderGridheight(maxGridy - gridy + 1);
			}
		}
		var widthComponents = components.slice();
		var widths = [];
		var weightxs = [];
		for (var i = 0; i <= maxGridx; i++) {
			widths.push(0);
			weightxs.push(0);
			var remainingComponents = widthComponents.slice();
			for (var j = 0; j < widthComponents.length; j++) {
				var component = widthComponents[j];
				if (!component.isVisible()) {
					continue;
				}
				var constraints = component.getConstraints();
				var gridx = constraints.getGridx();
				if (gridx === jsuis.Constants.RELATIVE) {
					gridx = constraints.getRelativeGridx();
				}
				var gridwidth = constraints.getGridwidth();
				if (gridwidth === jsuis.Constants.REMAINDER) {
					gridwidth = constraints.getRemainderGridwidth();
				}
				if ((gridx + gridwidth - 1) !== i) {
					continue;
				}
				var componentPreferredSize = component.getPreferredSize();
				var outsets = component.getOutsets();
				var width = componentPreferredSize.getWidth() + outsets.getLeft() + outsets.getRight();
				var weightx = constraints.getWeightx();
				for (var k = 1; k < gridwidth; k++) {
					width -= widths[i - k];
					weightx -= weightxs[i - k];
				}
				widths[i] = Math.max(widths[i], width);
				weightxs[i] = Math.max(weightxs[i], weightx);
				var index = remainingComponents.indexOf(component);
				if (index !== -1) {
					remainingComponents.splice(index, 1);
				}
			}
			widthComponents = remainingComponents;
		}
		this.setWidths(widths);
		this.setWeightxs(weightxs);
		
		var x = 0;
		var xs = [];
		for (var i = 0; i < widths.length; i++) {
			xs.push(x);
			x += widths[i];
		}
		if (widths.length) {
			xs.push(x);
		}
		var heightComponents = components.slice();
		var heights = [];
		var weightys = [];
		for (var i = 0; i <= maxGridy; i++) {
			heights.push(0);
			weightys.push(0);
			var remainingComponents = heightComponents.slice();
			for (var j = 0; j < heightComponents.length; j++) {
				var component = heightComponents[j];
				if (!component.isVisible()) {
					continue;
				}
				var constraints = component.getConstraints();
				var gridy = constraints.getGridy();
				if (gridy === jsuis.Constants.RELATIVE) {
					gridy = constraints.getRelativeGridy();
				}
				var gridheight = constraints.getGridheight();
				if (gridheight === jsuis.Constants.REMAINDER) {
					gridheight = constraints.getRemainderGridheight();
				}
				if ((gridy + gridheight - 1) !== i) {
					continue;
				}
				var gridx = constraints.getGridx();
				if (gridx === jsuis.Constants.RELATIVE) {
					gridx = constraints.getRelativeGridx();
				}
				var gridwidth = constraints.getGridwidth();
				if (gridwidth === jsuis.Constants.REMAINDER) {
					gridwidth = constraints.getRemainderGridwidth();
				}
				var componentPreferredSize = component.getPreferredSize();
				var outsets = component.getOutsets();
				var height = componentPreferredSize.getHeight() + outsets.getTop() + outsets.getBottom();
				component.setSize(new jsuis.Dimension(xs[gridx + gridwidth] - xs[gridx], height));
				height = Math.max(height, component.getMinimumSize().getHeight());
				var weighty = constraints.getWeighty();
				for (var k = 1; k < gridheight; k++) {
					height -= heights[i - k];
					weighty -= weightys[i - k];
				}
				heights[i] = Math.max(heights[i], height);
				weightys[i] = Math.max(weightys[i], weighty);
				var index = remainingComponents.indexOf(component);
				if (index !== -1) {
					remainingComponents.splice(index, 1);
				}
			}
			heightComponents = remainingComponents;
		}
		this.setHeights(heights);
		this.setWeightys(weightys);
		
		for (var i = 0; i < widths.length; i++) {
			preferredLayoutWidth += widths[i] + hgap;
		}
		for (var i = 0; i < heights.length; i++) {
			preferredLayoutHeight += heights[i] + vgap;
		}
		if (components.length) {
			preferredLayoutWidth -= hgap;
			preferredLayoutHeight -= vgap;
		}
		var parentInsets = parent.getInsets();
		preferredLayoutWidth += parentInsets.getLeft() + parentInsets.getRight();
		preferredLayoutHeight += parentInsets.getTop() + parentInsets.getBottom();
		return new jsuis.Dimension(preferredLayoutWidth, preferredLayoutHeight);
	}
	jsuis.GridBagLayout.prototype.minimumLayoutSize = function(parent) {
		return this.preferredLayoutSize(parent);
	}
	jsuis.GridBagLayout.prototype.layoutContainer = function(parent) {
		var m = 1;
		for (var l = 0; l < m; l++) {
			var preferredLayoutSize = this.preferredLayoutSize(parent);
			var x = 0;
			var y = 0;
			var width = parent.getWidth();
			var height = parent.getHeight();
			var hgap = this.getHgap();
			var vgap = this.getVgap();
			var parentInsets = parent.getInsets();
			var offsets = parent.getOffsets();
			x += parentInsets.getLeft() - offsets.getLeft();
			y += parentInsets.getTop() - offsets.getTop();
			var preferredLayoutWidth = preferredLayoutSize.getWidth();
			var preferredLayoutHeight = preferredLayoutSize.getHeight();
			var widths = this.getWidths().slice();
			var dwidth = width - preferredLayoutWidth;
			var weightxsSum = 0;
			var weightxs = this.getWeightxs();
			for (var i = 0; i < weightxs.length; i++) {
				weightxsSum += weightxs[i];
			}
			if (weightxsSum === 0) {
				x += dwidth / 2;
				dwidth = 0;
			} else {
				for (var i = 0; i < widths.length; i++) {
					widths[i] += dwidth * weightxs[i] / weightxsSum;
				}
			}
			var heights = this.getHeights().slice();
			var dheight = height - preferredLayoutHeight;
			var weightysSum = 0;
			var weightys = this.getWeightys();
			for (var i = 0; i < weightys.length; i++) {
				weightysSum += weightys[i];
			}
			if (weightysSum === 0) {
				y += dheight / 2;
				dheight = 0;
			} else {
				for (var i = 0; i < heights.length; i++) {
					heights[i] += dheight * weightys[i] / weightysSum;
				}
			}
			var dx = 0;
			var xs = [];
			for (var i = 0; i < widths.length; i++) {
				xs.push(Math.round(x + dx));
				dx += widths[i] + hgap;
			}
			if (widths.length) {
				xs.push(Math.round(x + dx));
			}
			var dy = 0;
			var ys = [];
			for (var i = 0; i < heights.length; i++) {
				ys.push(Math.round(y + dy));
				dy += heights[i] + vgap;
			}
			if (heights.length) {
				ys.push(Math.round(y + dy));
			}
			var components = parent.getComponents();
			for (var i = 0; i < components.length; i++) {
				var component = components[i];
				var constraints = component.getConstraints();
				if (!component.isVisible()) {
					continue;
				}
				var layout = component.getLayout();
				if (layout instanceof jsuis.FlowLayout) {
					m = 2;
				}
				var gridx = constraints.getGridx();
				if (gridx === jsuis.Constants.RELATIVE) {
					gridx = constraints.getRelativeGridx();
				}
				var gridy = constraints.getGridy();
				if (gridy === jsuis.Constants.RELATIVE) {
					gridy = constraints.getRelativeGridy();
				}
				var gridwidth = constraints.getGridwidth();
				if (gridwidth === jsuis.Constants.REMAINDER) {
					gridwidth = constraints.getRemainderGridwidth();
				}
				var gridheight = constraints.getGridheight();
				if (gridheight === jsuis.Constants.REMAINDER) {
					gridheight = constraints.getRemainderGridheight();
				}
				var weightx = constraints.getWeightx();
				var weighty = constraints.getWeighty();
				var componentX = xs[gridx];
				var componentY = ys[gridy];
				var componentWidth = xs[gridx + gridwidth] - componentX - hgap;
				var componentHeight = ys[gridy + gridheight] - componentY - vgap;
				var bounds;
				var outsets = component.getOutsets();
				var leftToRight = parent.isLeftToRight();
				if (leftToRight) {
					bounds = new jsuis.Rectangle(
							componentX + outsets.getLeft(),
							componentY + outsets.getTop(),
							componentWidth - outsets.getLeft() - outsets.getRight(),
							componentHeight - outsets.getTop() - outsets.getBottom());
				} else {
					bounds = new jsuis.Rectangle(
							width - componentX - componentWidth + outsets.getLeft(),
							componentY + outsets.getTop(),
							componentWidth - outsets.getLeft() - outsets.getRight(),
							componentHeight - outsetes.getTop() - outsets.getBottom());
				}
				constraints.setBounds(bounds);
			}
			SUPER.prototype.layoutContainer.call(this, parent);
		}
	}
}) (jsuis);

/**
 * jsuis.GridBorder
 */
(function(jsuis) {
	var SUPER = jsuis.Border;
	jsuis.GridBorder = jsuis.Object.extend(SUPER, function(color, spacing) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].GridBorder(color, spacing));
	});
	jsuis.Object.addPeerProperties(jsuis.GridBorder, {
		color: null,
		spacing: 0
	});
	jsuis.GridBorder.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets();
	}
}) (jsuis);

/**
 * jsuis.HTMLComponent
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.HTMLComponent = jsuis.Object.extend(SUPER, function(tag) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].HTMLComponent(tag));
	});
	jsuis.Object.addPeerProperties(jsuis.HTMLComponent, {
		html: null
	});
}) (jsuis);

/**
 * jsuis.HTMLContainer
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.HTMLContainer = jsuis.Object.extend(SUPER, function(node) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].HTMLContainer(node));
	});
	jsuis.Object.addPeerProperties(jsuis.HTMLContainer, {
		node: null
	});
}) (jsuis);

/**
 * jsuis.ImageIcon
 */
(function(jsuis) {
	var SUPER = jsuis.Icon;
	jsuis.ImageIcon = jsuis.Object.extend(SUPER, function(resource, width, height) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ImageIcon(resource, width, height));
	});
	jsuis.Object.addPeerProperties(jsuis.ImageIcon, {
		resource: null,
	});
}) (jsuis);

/**
 * jsuis.Label
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Label = jsuis.Object.extend(SUPER, function(text, icon) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Label(text, icon));
	});
	jsuis.Object.addPeerProperties(jsuis.Label, {
		text: null,
		icon: null,
		iconTextGap: null
	});
}) (jsuis);

/**
 * jsuis.LineBorder
 */
(function(jsuis) {
	var SUPER = jsuis.Border;
	jsuis.LineBorder = jsuis.Object.extend(SUPER, function(color, thickness, rx, ry) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].LineBorder(color, thickness, rx, ry));
	});
	jsuis.Object.addPeerProperties(jsuis.LineBorder, {
		color: null,
		thickness: 0,
		rx: 0,
		ry: 0
	});
}) (jsuis);

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

/**
 * jsuis.MouseAdapter
 */
(function(jsuis) {
	var SUPER = jsuis.Listener;
	jsuis.MouseAdapter = jsuis.Object.extend(SUPER, function(listener) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].MouseAdapter(listener));
	});
	jsuis.MouseAdapter.prototype.mouseClicked = function(event) {
		var peer = this.getPeer();
		peer.mouseClicked(event);
	}
	jsuis.MouseAdapter.prototype.mousePressed = function(event) {
		var peer = this.getPeer();
		peer.mousePressed(event);
	}
	jsuis.MouseAdapter.prototype.mouseReleased = function(event) {
		var peer = this.getPeer();
		peer.mouseReleased(event);
	}
	jsuis.MouseAdapter.prototype.mouseEntered = function(event) {
		var peer = this.getPeer();
		peer.mouseEntered(event);
	}
	jsuis.MouseAdapter.prototype.mouseExited = function(event) {
		var peer = this.getPeer();
		peer.mouseExited(event);
	}
	jsuis.MouseAdapter.prototype.mouseDragged = function(event) {
		var peer = this.getPeer();
		peer.mouseDragged(event);
	}
	jsuis.MouseAdapter.prototype.mouseMoved = function(event) {
		var peer = this.getPeer();
		peer.mouseMoved(event);
	}
}) (jsuis);

/**
 * jsuis.MouseListener
 */
(function(jsuis) {
	var SUPER = jsuis.Listener;
	jsuis.MouseListener = jsuis.Object.extend(SUPER, function(listener) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].MouseListener(listener));
	});
	jsuis.MouseListener.prototype.mouseClicked = function(event) {
		var peer = this.getPeer();
		peer.mouseClicked(event);
	}
	jsuis.MouseListener.prototype.mousePressed = function(event) {
		var peer = this.getPeer();
		peer.mousePressed(event);
	}
	jsuis.MouseListener.prototype.mouseReleased = function(event) {
		var peer = this.getPeer();
		peer.mouseReleased(event);
	}
	jsuis.MouseListener.prototype.mouseEntered = function(event) {
		var peer = this.getPeer();
		peer.mouseEntered(event);
	}
	jsuis.MouseListener.prototype.mouseExited = function(event) {
		var peer = this.getPeer();
		peer.mouseExited(event);
	}
}) (jsuis);

/**
 * jsuis.MouseMotionListener
 */
(function(jsuis) {
	var SUPER = jsuis.Listener;
	jsuis.MouseMotionListener = jsuis.Object.extend(SUPER, function(listener) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].MouseMotionListener(listener));
	});
	jsuis.MouseMotionListener.prototype.mouseDragged = function(event) {
		var peer = this.getPeer();
		peer.mouseDragged(event);
	}
	jsuis.MouseMotionListener.prototype.mouseMoved = function(event) {
		var peer = this.getPeer();
		peer.mouseMoved(event);
	}
}) (jsuis);

/**
 * jsuis.Panel
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Panel = jsuis.Object.extend(SUPER, function(layout) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Panel(layout));
	});
}) (jsuis);

/**
 * jsuis.ProgressBar
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.ProgressBar = jsuis.Object.extend(SUPER, function(layout) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ProgressBar(layout));
	});
	jsuis.Object.addPeerProperties(jsuis.ProgressBar, {
		maximum: 0,
		progress: 0,
		stringPainted: false,
		string: null
	});
}) (jsuis);

/**
 * jsuis.PropertyChangeListener
 */
(function(jsuis) {
	var SUPER = jsuis.Listener;
	jsuis.PropertyChangeListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.Object.addProperties(jsuis.PropertyChangeListener, {
		propertyName: null
	});
	jsuis.PropertyChangeListener.prototype.propertyChange = function(event) {
		var listener = this.getListener();
		listener.propertyChange.call(this, event);
	}
}) (jsuis);

/**
 * jsuis.Table
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Table = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Table());
	});
	jsuis.Object.addPeerProperties(jsuis.Table, {
		columns: null,
		values: null,
		rowCount: 0,
		columnCount: 0,
		rowHeight: 0
	});
	jsuis.Table.prototype.getValueAt = function(row, column) {
		var peer = this.getPeer();
		return peer.getValueAt(row, column);
	}
	jsuis.Table.prototype.setValueAt = function(value, row, column) {
		var peer = this.getPeer();
		peer.setValueAt(value, row, column);
		return peer;
	}
}) (jsuis);

/**
 * jsuis.TextField
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.TextField = jsuis.Object.extend(SUPER, function(text) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].TextField(text));
	});
	jsuis.Object.addPeerProperties(jsuis.TextField, {
		text: null
	});
}) (jsuis);

/**
 * jsuis.TouchListener
 */
(function(jsuis) {
	var SUPER = jsuis.Listener;
	jsuis.TouchListener = jsuis.Object.extend(SUPER, function(listener) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].TouchListener(listener));
	});
	jsuis.TouchListener.prototype.touchPressed = function(event) {
		var peer = this.getPeer();
		peer.touchPressed(event);
	}
	jsuis.TouchListener.prototype.touchReleased = function(event) {
		var peer = this.getPeer();
		peer.touchReleased(event);
	}
	jsuis.TouchListener.prototype.touchMoved = function(event) {
		var peer = this.getPeer();
		peer.touchMoved(event);
	}
	jsuis.TouchListener.prototype.touchDragged = function(event) {
		var peer = this.getPeer();
		peer.touchDragged(event);
	}
}) (jsuis);

/**
 * jsuis.lf.ActionListener
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Listener;
	jsuis.lf.ActionListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.lf.ActionListener.prototype.actionPerformed = function(event) {
		var listener = this.getListener();
		if (listener && listener.actionPerformed) {
			listener.actionPerformed.call(this, event);
		}
	}
}) (jsuis);

/**
 * jsuis.lf.AdjustmentListener
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Listener;
	jsuis.lf.AdjustmentListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.lf.AdjustmentListener.prototype.adjustmentValueChanged = function(event) {
		var listener = this.getListener();
		if (listener && listener.adjustmentValueChanged) {
			listener.adjustmentValueChanged.call(this, event);
		}
	}
}) (jsuis);

/**
 * jsuis.lf.Body
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.Body = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.body);
		
		var browserWindow = jsuis.lf.BrowserWindow.getInstance();
		var componentListener = new jsuis.ComponentListener({
			componentResized: function(event) {
				var body = this.getListenerComponent();
				body.validate();
			}
		});
		componentListener.setListenerComponent(this);
		browserWindow.addComponentListener(componentListener);
	});
	var instance;
	jsuis.lf.Body.getInstance = function() {
		if (!instance) {
			instance = new jsuis.lf.Body();
		}
		return instance;
	}
	jsuis.lf.Body.prototype.validate = function() {
		var element = this.getElement();
		var width = element.clientWidth;
		var height = element.clientHeight;
		this.setWidth(width);
		this.setHeight(height);
		SUPER.prototype.validate.call(this);
	}
	jsuis.lf.Body.prototype.setVisible = function(visible) {
		SUPER.prototype.setVisible.call(this, visible);
		if (visible) {
			this.validate();
		}
		return this;
	}
}) (jsuis);

/**
 * jsuis.lf.Circle
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.Circle = jsuis.Object.extend(SUPER, function(cx, cy, r) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "circle"));
		cx = nvl(cx, 0);
		cy = nvl(cy, cx);
		r = nvl(r, cx);
		this.setCx(cx);
		this.setCy(cy);
		this.setR(r);
	});
	jsuis.lf.Circle.prototype.getCx = function() {
		return this.cx || 0;
	}
	jsuis.lf.Circle.prototype.setCx = function(cx) {
		this.setAttribute("cx", +nvl(cx, 0));
		this.cx = cx;
		return this;
	}
	jsuis.lf.Circle.prototype.getCy = function() {
		return this.cy || 0;
	}
	jsuis.lf.Circle.prototype.setCy = function(cy) {
		this.setAttribute("cy", +nvl(cy, 0));
		this.cy = cy;
		return this;
	}
	jsuis.lf.Circle.prototype.getR = function() {
		return this.r || 0;
	}
	jsuis.lf.Circle.prototype.setR = function(r) {
		this.setAttribute("r", +nvl(r, 0));
		this.r = r;
		return this;
	}
}) (jsuis);

/**
 * jsuis.lf.ClipPath
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.ClipPath = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "clipPath"));
		this.setId(jsuis.lf.ClipPath.next());
	});
	var sequence = 0;
	jsuis.lf.ClipPath.next = function() {
		return "ClipPath-" + sequence++;
	};
}) (jsuis);

/**
 * jsuis.lf.ComboBoxEditor
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.ComboBoxEditor = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElement("select"));
		this.setStyleProperty("position", "absolute");
		this.setStyleProperty("padding", "0");
		this.setStyleProperty("margin", "0");
		this.setStyleProperty("border", "0");
		this.setStyleProperty("outline", "none");
		this.setStyleProperty("background-color", "transparent");
		this.setVisible(false);
		new jsuis.lf.Component(document.body).add(this);
		var actionListener = new jsuis.ActionListener({
			actionPerformed: function(event) {
				var comboBoxEditor = this.getListenerComponent();
				var comboBox = comboBoxEditor.getComboBox();
				if (comboBox) {
					comboBox.setSelectedItem(comboBoxEditor.getSelectedItem());
					comboBox.fireActionPerformed(event.getElement());
				}
			}
		});
		actionListener.setListenerComponent(this);
		this.addActionListener(actionListener);
		var focusListener = new jsuis.FocusListener({
			focusLost: function(event) {
				var comboBoxEditor = this.getListenerComponent();
				var comboBox = comboBoxEditor.getComboBox();
				if (comboBox) {
					comboBoxEditor.uninstall(comboBox);
				}
			}
		});
		focusListener.setListenerComponent(this);
		this.addFocusListener(focusListener);
	});
	jsuis.Object.addProperties(jsuis.lf.ComboBoxEditor, {
		comboBox: null,
		selection: null,
		enterSelection: null,
		values: null,
		target: null
	});
	var instance;
	jsuis.lf.ComboBoxEditor.getInstance = function() {
		if (!instance) {
			instance = new jsuis.lf.ComboBoxEditor();
		}
		return instance;
	}
	jsuis.lf.ComboBoxEditor.prototype.install = function(comboBox) {
		var oldComboBox = this.getComboBox();
		if (oldComboBox) {
			this.uninstall(oldComboBox);
		}
		if (comboBox) {
			var label = comboBox.getLabel();
			var labelBoundingClientRect = label.getElement().getBoundingClientRect();
			var comboBoxBoundingClientRect = comboBox.getElement().getBoundingClientRect();
			var bodyBoundingClientRect = document.body.getBoundingClientRect();
			var dx = labelBoundingClientRect.left - comboBoxBoundingClientRect.left;
			var dy = labelBoundingClientRect.top - comboBoxBoundingClientRect.top;
			this.setBounds(new jsuis.Rectangle(
					labelBoundingClientRect.left - bodyBoundingClientRect.left, labelBoundingClientRect.top - bodyBoundingClientRect.top - dy,
					comboBoxBoundingClientRect.width - 2 * dx, labelBoundingClientRect.height + 2 * dy));
			this.setFont(label.getFont());
			this.setItems(comboBox.getItems());
			this.setSelectedItem(comboBox.getSelectedItem());
			label.setVisible(false);
			this.setVisible(true);
		}
		this.setComboBox(comboBox);
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.uninstall = function(comboBox) {
		comboBox.setSelectedItem(this.getSelectedItem());
		this.setVisible(false);
		var label = comboBox.getLabel();
		label.setVisible(true);
		comboBox.setEditor(null);
	}
	jsuis.lf.ComboBoxEditor.prototype.setItems = function(items) {
		this
			.select()
			.data(items)
			.enter().append()
			.all()
				.text(function(d) { return d; })
			.exit().remove();
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.getSelectedItem = function() {
		var element = this.getElement();
		return element.value;
	}
	jsuis.lf.ComboBoxEditor.prototype.setSelectedItem = function(item) {
		var element = this.getElement();
		element.selectedIndex = this.getValues().indexOf(item);
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.setX = function(x) {
		var outsets = this.getOutsets();
		this.setStyleProperty("left", (+nvl(x, 0) + outsets.getLeft()) + "px");
		this.x = x;
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.setY = function(y) {
		var outsets = this.getOutsets();
		this.setStyleProperty("top", (+nvl(y, 0) + outsets.getTop()) + "px");
		this.y = y;
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.setWidth = function(width) {
		var outsets = this.getOutsets();
		width -= outsets.getLeft() + outsets.getRight();
		if (width >= 0) {
			this.setStyleProperty("width", width + "px");
		}
		this.width = width;
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.setHeight = function(height) {
		var outsets = this.getOutsets();
		height -= outsets.getTop() + outsets.getBottom();
		if (height >= 0) {
			this.setStyleProperty("height", height + "px");
		}
		this.height = height;
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.select = function() {
		this.setSelection(this.getComponents());
		this.setEnterSelection([]);
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.data = function(data) {
		this.setValues(data);
		this.update();
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.update = function() {
		this.setTarget("update");
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.enter = function() {
		this.setTarget("enter");
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.exit = function() {
		this.setTarget("exit");
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.all = function() {
		this.setTarget("all");
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.append = function() {
		var selection = this.getSelection();
		var data = this.getValues();
		var target = this.getTarget();
		switch (target) {
		case "enter":
			var enterSelection = this.getEnterSelection();
			for (var i = selection.length; i < data.length; i++) {
				var component = new jsuis.lf.Option();
				enterSelection.push(component);
				this.add(component);
			}
			break;
		case "exit":
			break;
		case "update":
		default:
		}
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.remove = function() {
		var selection = this.getSelection();
		var data = this.getValues();
		var target = this.getTarget();
		switch (target) {
		case "enter":
			break;
		case "exit":
			for (var i = data.length; i < selection.length; i++) {
				var component = selection[i];
				this.remove(component);
			}
			break;
		case "update":
		default:
		}
	}
	jsuis.lf.ComboBoxEditor.prototype.text = function(text) {
		var selection = this.getSelection();
		var data = this.getValues();
		var target = this.getTarget();
		switch (target) {
		case "enter":
			var enterSelection = this.getEnterSelection();
			for (var i = selection.length; i < data.length; i++) {
				var component = enterSelection[i - selection.length];
				var element = component.getElement();
				if (jsuis.Object.isFunction(text)) {
					element.innerHTML = text(data[i], i);
				} else {
					element.innerHTML = text;
				}
			}
			break;
		case "exit":
			for (var i = data.length; i < selection.length; i++) {
				var component = selection[i];
				var element = component.getElement();
				if (jsuis.Object.isFunction(text)) {
					element.innerHTML = text(data[i], i);
				} else {
					element.innerHTML = text;
				}
			}
			break;
		case "all":
			for (var i = 0; i < Math.min(selection.length, data.length); i++) {
				var component = selection[i];
				var element = component.getElement();
				if (jsuis.Object.isFunction(text)) {
					element.innerHTML = text(data[i], i);
				} else {
					element.innerHTML = text;
				}
			}
			var enterSelection = this.getEnterSelection();
			for (var i = selection.length; i < data.length; i++) {
				var component = enterSelection[i - selection.length];
				var element = component.getElement();
				if (jsuis.Object.isFunction(text)) {
					element.innerHTML = text(data[i], i);
				} else {
					element.innerHTML = text;
				}
			}
			break;
		case "update":
		default:
			for (var i = 0; i < Math.min(selection.length, data.length); i++) {
				var component = selection[i];
				var element = component.getElement();
				if (jsuis.Object.isFunction(text)) {
					element.innerHTML = text(data[i], i);
				} else {
					element.innerHTML = text;
				}
			}
		}
		return this;
	}
	jsuis.lf.ComboBoxEditor.prototype.addActionListener = function(actionListener) {
		var actionListeners = this.getActionListeners();
		actionListeners.push(actionListener);
		var component = this;
		var listener = actionListener.getListener();
		if (listener.actionPerformed) {
			var onchange = this.getEventListener("change");
			if (!onchange) {
				this.setEventListener("change", function(event) {
					component.fireActionPerformed(event);
				});
			}
		}
	}
}) (jsuis);

/**
 * jsuis.lf.ComponentEvent
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Event;
	jsuis.lf.ComponentEvent = jsuis.Object.extend(SUPER, function(event) {
		SUPER.prototype.constructor.call(this, event);
	});
}) (jsuis);

/**
 * jsuis.lf.ComponentListener
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Listener;
	jsuis.lf.ComponentListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.lf.ComponentListener.prototype.componentResized = function(event) {
		var listener = this.getListener();
		if (listener && listener.componentResized) {
			listener.componentResized.call(this, event);
		}
	}
	jsuis.lf.ComponentListener.prototype.componentMoved = function(event) {
		var listener = this.getListener();
		if (listener && listener.componentMoved) {
			listener.componentMoved.call(this, event);
		}
	}
}) (jsuis);

/**
 * jsuis.lf.Defs
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.Defs = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "defs"));
	});
}) (jsuis);

/**
 * jsuis.lf.DesktopPane
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Container;
	jsuis.lf.DesktopPane = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.body);
		
		var browserWindow = jsuis.lf.BrowserWindow.getInstance();
		var componentListener = new jsuis.ComponentListener({
			componentResized: function(event) {
				var desktopPane = this.getListenerComponent();
				desktopPane.validate();
			}
		});
		componentListener.setListenerComponent(this);
		browserWindow.addComponentListener(componentListener);
	});
	var instance;
	jsuis.lf.DesktopPane.getInstance = function() {
		if (!instance) {
			instance = new jsuis.lf.DesktopPane();
		}
		return instance;
	}
	jsuis.Object.addProperties(jsuis.lf.DesktopPane, {
		width: 0,
		height: 0
	});
	jsuis.lf.DesktopPane.prototype.validate = function() {
		var element = this.getElement();
		var width = element.clientWidth;
		var height = element.clientHeight;
		this.setWidth(width);
		this.setHeight(height);
		SUPER.prototype.validate.call(this);
	}
	jsuis.lf.DesktopPane.prototype.setVisible = function(visible) {
		SUPER.prototype.setVisible.call(this, visible);
		if (visible) {
			this.validate();
		}
		return this;
	}
}) (jsuis);

/**
 * jsuis.lf.FocusListener
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Listener;
	jsuis.lf.FocusListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.lf.FocusListener.prototype.focusGained = function(event) {
		var listener = this.getListener();
		if (listener && listener.focusGained) {
			listener.focusGained.call(this, event);
		}
	}
	jsuis.lf.FocusListener.prototype.focusLost = function(event) {
		var listener = this.getListener();
		if (listener && listener.focusLost) {
			listener.focusLost.call(this, event);
		}
	}
}) (jsuis);

/**
 * jsuis.lf.G
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.G = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "g"));
	});
	jsuis.lf.G.prototype.setX = function(x) {
		this.setAttribute("transform", "translate(" + nvl(x, 0) + "," + this.getY() + ")");
		this.x = x;
		return this;
	}
	jsuis.lf.G.prototype.setY = function(y) {
		this.setAttribute("transform", "translate(" + this.getX() + "," + nvl(y, 0) + ")");
		this.y = y;
		return this;
	}
}) (jsuis);

/**
 * jsuis.lf.Graphics
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.Graphics = jsuis.Object.extend(SUPER, function(layout) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "g"));
		this.setLayout(layout !== undefined ? layout : new jsuis.FlowLayout());
		this.setBackground(null);
	});
	jsuis.lf.Graphics.prototype.setX = function(x) {
		this.setAttribute("transform", "translate(" + nvl(x, 0) + "," + this.getY() + ")");
		this.x = x;
		return this;
	}
	jsuis.lf.Graphics.prototype.setY = function(y) {
		this.setAttribute("transform", "translate(" + this.getX() + "," + nvl(y, 0) + ")");
		this.y = y;
		return this;
	}
	jsuis.lf.Graphics.prototype.setSize = function(size) {
		SUPER.prototype.setSize.call(this, size);
		var border = this.getBorder();
		border = nvl(border, new jsuis.svg.Border());
		border.paintBorder(this);
		return this;
	}
	jsuis.lf.Graphics.prototype.setVisible = function(visible) {
		SUPER.prototype.setVisible.call(this, visible);
		return this;
	}
}) (jsuis);

/**
 * jsuis.lf.GridBorder
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Border;
	jsuis.lf.GridBorder = jsuis.Object.extend(SUPER, function(color, spacing) {
		SUPER.prototype.constructor.call(this);
		this.setColor(nvl(color, jsuis.Color.GRAY));
		this.setSpacing(nvl(spacing, 16));
	});
	jsuis.Object.addProperties(jsuis.lf.GridBorder, {
		color: null,
		spacing: 0
	});
	jsuis.lf.GridBorder.prototype.getBorderInsets = function(component) {
	}
	jsuis.lf.GridBorder.prototype.paintBorder = function(component) {
	}
}) (jsuis);

/**
 * jsuis.lf.Image
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.Image = jsuis.Object.extend(SUPER, function(image) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "image"));
		if (image) {
			this.setImage(image);
		}
	});
	jsuis.Object.addProperties(jsuis.lf.Image, {
		image: null
	});
	jsuis.lf.Image.prototype.setImage = function(image) {
		var element = this.getElement();
		element.setAttributeNS("http://www.w3.org/1999/xlink", "href", image);
		this.image = image;
		return this;
	}
}) (jsuis);

/**
 * jsuis.lf.ImageIcon
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Icon;
	jsuis.lf.ImageIcon = jsuis.Object.extend(SUPER, function(resource, iconWidth, iconHeight) {
		SUPER.prototype.constructor.call(this, iconWidth, iconHeight);
		this.setResource(resource);
	});
	jsuis.Object.addProperties(jsuis.lf.ImageIcon, {
		resource: null
	});
	jsuis.lf.ImageIcon.prototype.paintIcon = function(component) {
		var resource = this.getResource();
		var iconWidth = this.getIconWidth();
		var iconHeight = this.getIconHeight();
		var graphics = component.getGraphics();
	
		var data = [
			{ resource: resource, width: iconWidth, height: iconHeight }
		];
		var images = graphics.getComponentsByName("image");
		for (var i = images.length; i < data.length; i++) {
			var image = new jsuis.lf.Image();
			image.setName("image");
			graphics.add(image);
			images.push(image);
		}
		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			images[i]
				.setAttributeNS("http://www.w3.org/1999/xlink", "href", d.resource)
				.setAttribute("width", d.width)
				.setAttribute("height", d.height);
		}
	}
}) (jsuis);

/**
 * jsuis.lf.Line
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.Line = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "line"));
	});
	jsuis.lf.Line.prototype.getX1 = function() {
		return this.x1 || 0;
	}
	jsuis.lf.Line.prototype.setX1 = function(x1) {
		this.setAttribute("x1", +nvl(x1, 0));
		this.x1 = x1;
		return this;
	}
	jsuis.lf.Line.prototype.getY1 = function() {
		return this.y1 || 0;
	}
	jsuis.lf.Line.prototype.setY1 = function(y1) {
		this.setAttribute("y1", +nvl(y1, 0));
		this.y1 = y1;
		return this;
	}
	jsuis.lf.Line.prototype.getX2 = function() {
		return this.x2 || 0;
	}
	jsuis.lf.Line.prototype.setX2 = function(x2) {
		this.setAttribute("x2", +nvl(x2, 0));
		this.x2 = x2;
		return this;
	}
	jsuis.lf.Line.prototype.getY2 = function() {
		return this.y2 || 0;
	}
	jsuis.lf.Line.prototype.setY2 = function(y2) {
		this.setAttribute("y2", +nvl(y2, 0));
		this.y2 = y2;
		return this;
	}
	jsuis.lf.Line.prototype.getThickness = function() {
		return this.thickness;
	}
	jsuis.lf.Line.prototype.setThickness = function(thickness) {
		this.setStyleProperty("stroke-width", thickness);
		this.thickness = thickness;
		return this;
	}
}) (jsuis);

/**
 * jsuis.lf.LineBorder
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Border;
	jsuis.lf.LineBorder = jsuis.Object.extend(SUPER, function(color, thickness, rx, ry) {
		SUPER.prototype.constructor.call(this);
		this.setColor(nvl(color, jsuis.Color.GRAY));
		this.setThickness(nvl(thickness, 1));
		rx = nvl(rx, 0);
		ry = nvl(ry, rx);
		this.setRx(rx);
		this.setRy(ry);
	});
	jsuis.Object.addProperties(jsuis.lf.LineBorder, {
		color: null,
		thickness: 0,
		rx: 0,
		ry: 0
	});
	jsuis.lf.LineBorder.prototype.getBorderInsets = function(component) {
		var thickness = this.getThickness();
		return new jsuis.Insets(thickness, thickness, thickness, thickness);
	}
	jsuis.lf.LineBorder.prototype.getBorderOffsets = function(component) {
		var element = component.getElement();
		if (element instanceof HTMLElement) {
			var thickness = this.getThickness();
			return new jsuis.Insets(thickness, thickness, thickness, thickness);
		} else {
			return new jsuis.Insets();
		}
	}
	jsuis.lf.LineBorder.prototype.paintBorder = function(component) {
		var color = this.getColor();
		var thickness = this.getThickness();
		var rx = this.getRx();
		var ry = this.getRy();
		var background = component.getBackground();
		
		var element = component.getElement();
		if (element instanceof HTMLElement) {
			
			component.setStyleProperty("border", thickness + "px solid " + nvl(color, "none").toString());
			component.setStyleProperty("background-color", nvl(background, "none").toString());
		} else {
			
			var graphics = component.getGraphics();
			var width = component.getWidth();
			var height = component.getHeight();
			if (!width || !height) {
				return;
			}
			
			var data = [
				{  x: thickness / 2, y: thickness / 2, width: width - thickness, height: height - thickness,
					rx: rx, ry: ry, stroke: thickness ? nvl(color, "none").toString() : "none", strokeWidth: thickness, fill: nvl(background, "none").toString() }
			];
			var rects = graphics.getComponentsByName("rect");
			for (var i = rects.length; i < data.length; i++) {
				var rect = new jsuis.lf.Rect();
				rect.setName("rect");
				graphics.add(rect);
				rects.push(rect);
			}
			for (var i = 0; i < data.length; i++) {
				var d = data[i];
				rects[i]
					.setAttribute("x", d.x)
					.setAttribute("y", d.y)
					.setAttribute("width", d.width)
					.setAttribute("height", d.height)
					.setAttribute("rx", d.rx)
					.setAttribute("ry", d.ry)
					.setStyleProperty("fill", d.fill)
					.setStyleProperty("stroke", d.stroke)
					.setStyleProperty("stroke-width", d.strokeWidth);
			}
		}
	}
}) (jsuis);

/**
 * jsuis.lf.MouseAdapter
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Listener;
	jsuis.lf.MouseAdapter = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.lf.MouseAdapter.prototype.mouseClicked = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseClicked) {
			listener.mouseClicked.call(this, event);
		}
	}
	jsuis.lf.MouseAdapter.prototype.mousePressed = function(event) {
		var listener = this.getListener();
		if (listener && listener.mousePressed) {
			listener.mousePressed.call(this, event);
		}
	}
	jsuis.lf.MouseAdapter.prototype.mouseReleased = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseReleased) {
			listener.mouseReleased.call(this, event);
		}
	}
	jsuis.lf.MouseAdapter.prototype.mouseEntered = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseEntered) {
			listener.mouseEntered.call(this, event);
		}
	}
	jsuis.lf.MouseAdapter.prototype.mouseExited = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseExited) {
			listener.mouseExited.call(this, event);
		}
	}
	jsuis.lf.MouseAdapter.prototype.mouseDragged = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseDragged) {
			listener.mouseDragged.call(this, event);
		}
	}
	jsuis.lf.MouseAdapter.prototype.mouseMoved = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseMoved) {
			listener.mouseMoved.call(this, event);
		}
	}
}) (jsuis);

/**
 * jsuis.lf.MouseListener
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Listener;
	jsuis.lf.MouseListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.lf.MouseListener.prototype.mouseClicked = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseClicked) {
			listener.mouseClicked.call(this, event);
		}
	}
	jsuis.lf.MouseListener.prototype.mousePressed = function(event) {
		var listener = this.getListener();
		if (listener && listener.mousePressed) {
			listener.mousePressed.call(this, event);
		}
	}
	jsuis.lf.MouseListener.prototype.mouseReleased = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseReleased) {
			listener.mouseReleased.call(this, event);
		}
	}
	jsuis.lf.MouseListener.prototype.mouseEntered = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseEntered) {
			listener.mouseEntered.call(this, event);
		}
	}
	jsuis.lf.MouseListener.prototype.mouseExited = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseExited) {
			listener.mouseExited.call(this, event);
		}
	}
}) (jsuis);

/**
 * jsuis.lf.MouseMotionListener
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Listener;
	jsuis.lf.MouseMotionListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.lf.MouseMotionListener.prototype.mouseDragged = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseDragged) {
			listener.mouseDragged.call(this, event);
		}
	}
	jsuis.lf.MouseMotionListener.prototype.mouseMoved = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseMoved) {
			listener.mouseMoved.call(this, event);
		}
	}
}) (jsuis);

/**
 * jsuis.lf.Option
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.Option = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElement("option"));
	});
}) (jsuis);

/**
 * jsuis.lf.Panel
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Container;
	jsuis.lf.Panel = jsuis.Object.extend(SUPER, function(layout) {
		SUPER.prototype.constructor.call(this, document.createElement("div"));
		this.setStyleProperty("position", "absolute");
		this.setLayout(layout !== undefined ? layout : new jsuis.FlowLayout());
	});
}) (jsuis);

/**
 * jsuis.lf.Path
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.Path = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "path"));
	});
}) (jsuis);

/**
 * jsuis.lf.Polygon
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.Polygon = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "polygon"));
	});
}) (jsuis);

/**
 * jsuis.lf.Polyline
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.Polyline = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "polyline"));
	});
}) (jsuis);

/**
 * jsuis.lf.RadioButtonSelectedIcon
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Icon;
	jsuis.lf.RadioButtonSelectedIcon = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, 16, 16);
	});
	var instance;
	jsuis.lf.RadioButtonSelectedIcon.getInstance = function() {
		if (!instance) {
			instance = new jsuis.lf.RadioButtonSelectedIcon();
		}
		return instance;
	}
	jsuis.lf.RadioButtonSelectedIcon.prototype.paintIcon = function(component) {
		var iconWidth = this.getIconWidth();
		var iconHeight = this.getIconHeight();
		var color = jsuis.Color.getColor(0x404040);
		var graphics = component.getGraphics();
	
		var data = [
			{ cx: 8, cy: 8, r: 7.5, fill: "none", stroke: color.toString(), strokeWidth: 1 },
			{ cx: 8, cy: 8, r: 3.5, fill: color.toString(), stroke: color.toString(), strokeWidth: 1 }
		];
		var circles = graphics.getComponentsByName("circle");
		for (var i = circles.length; i < data.length; i++) {
			var circle = new jsuis.lf.Circle();
			circle.setName("circle");
			graphics.add(circle);
			circles.push(circle);
		}
		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			circles[i]
				.setAttribute("cx", d.cx )
				.setAttribute("cy", d.cy )
				.setAttribute("r", d.r )
				.setAttribute("fill", d.fill )
				.setAttribute("stroke", d.stroke )
				.setAttribute("stroke-width", d.strokeWidth )
				.setStyleProperty("display", "");
		}
	}
}) (jsuis);

/**
 * jsuis.lf.RadioButtonUnselectedIcon
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Icon;
	jsuis.lf.RadioButtonUnselectedIcon = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, 16, 16);
	});
	var instance;
	jsuis.lf.RadioButtonUnselectedIcon.getInstance = function() {
		if (!instance) {
			instance = new jsuis.lf.RadioButtonUnselectedIcon();
		}
		return instance;
	}
	jsuis.lf.RadioButtonUnselectedIcon.prototype.paintIcon = function(component) {
		var iconWidth = this.getIconWidth();
		var iconHeight = this.getIconHeight();
		var color = jsuis.Color.getColor(0x404040);
		var graphics = component.getGraphics();
	
		var data = [
			{ cx: 8, cy: 8, r: 7.5, fill: "none", stroke: color.toString(), strokeWidth: 1 }
		];
		var circles = graphics.getComponentsByName("circle");
		for (var i = circles.length; i < data.length; i++) {
			var circle = new jsuis.lf.Circle();
			circle.setName("circle");
			graphics.add(circle);
			circles.push(circle);
		}
		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			circles[i]
				.setAttribute("cx", d.cx )
				.setAttribute("cy", d.cy )
				.setAttribute("r", d.r )
				.setAttribute("fill", d.fill )
				.setAttribute("stroke", d.stroke )
				.setAttribute("stroke-width", d.strokeWidth )
		}
		for (var i = data.length; i < circles.length; i++) {
			circles[i]
				.setStyleProperty("display", "none");
		}
	}
}) (jsuis);

/**
 * jsuis.lf.Rect
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.Rect = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "rect"));
	});
	jsuis.lf.Rect.prototype.getRx = function() {
		return this.rx || 0;
	}
	jsuis.lf.Rect.prototype.setRx = function(rx) {
		this.setAttribute("rx", +nvl(rx, 0));
		this.rx = rx;
		return this;
	}
	jsuis.lf.Rect.prototype.getRy = function() {
		return this.ry || 0;
	}
	jsuis.lf.Rect.prototype.setRy = function(ry) {
		this.setAttribute("ry", +nvl(ry, 0));
		this.ry = ry;
		return this;
	}
}) (jsuis);

/**
 * jsuis.lf.Svg
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Container;
	jsuis.lf.Svg = jsuis.Object.extend(SUPER, function(layout) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "svg"));
		this.setStyleProperty("position", "absolute");
		this.setLayout(layout !== undefined ? layout : new jsuis.FlowLayout());
		this.setBorder(new jsuis.lf.Border());
		this.setBackground(null);
	});
	/*
	jsuis.lf.Svg.prototype.getX = function() {
		return this.x || 0;
	}
	jsuis.lf.Svg.prototype.setX = function(x) {
		this.setStyleProperty("left", +nvl(x, 0) + "px");
		this.x = x;
		return this;
	}
	jsuis.lf.Svg.prototype.getY = function() {
		return this.y || 0;
	}
	jsuis.lf.Svg.prototype.setY = function(y) {
		var insets = this.getInsets();
		this.setStyleProperty("top", +nvl(y, 0) + "px");
		this.y = y;
		return this;
	}
	*/
	jsuis.lf.Svg.prototype.getWidth = function() {
		return this.width || 0;
	}
	jsuis.lf.Svg.prototype.setWidth = function(width) {
		this.width = width;
		var outsets = this.getOutsets();
		// width -= outsets.getLeft() + outsets.getRight();
		var offsets = this.getOffsets();
		width -= offsets.getLeft() + offsets.getRight();
		if (width >= 0) {
			this.setAttribute("width", width);
		}
		return this;
	}
	jsuis.lf.Svg.prototype.getHeight = function() {
		return this.height || 0;
	}
	jsuis.lf.Svg.prototype.setHeight = function(height) {
		this.height = height;
		var outsets = this.getOutsets();
		// height -= outsets.getTop() + outsets.getBottom();
		var offsets = this.getOffsets();
		height -= offsets.getTop() + offsets.getBottom();
		if (height >= 0) {
			this.setAttribute("height", height);
		}
		return this;
	}
	jsuis.lf.Svg.prototype.setSize = function(size) {
		SUPER.prototype.setSize.call(this, size);
		var border = this.getBorder();
		border = nvl(border, new jsuis.lf.Border());
		border.paintBorder(this);
		return this;
	}
	jsuis.lf.Svg.prototype.setVisible = function(visible) {
		SUPER.prototype.setVisible.call(this, visible);
		return this;
	}
	jsuis.lf.Svg.prototype.setBorder = function(border) {
		this.border = border;
		if (border) {
			var graphics = this.getGraphics();
			if (!graphics) {
				graphics = new jsuis.lf.Graphics();
				this.setGraphics(graphics);
				this.prepend(graphics);
			}
			border.paintBorder(this);
		}
		return this;
	}
	jsuis.lf.Svg.prototype.prepend = function(component) {
		var element = this.getElement();
		var componentElement = component.getElement();
		element.insertBefore(componentElement, null, 0);
	}
	jsuis.lf.Svg.prototype.isEnabled = function() {
		return nvl(this.enabled, true);
	}
	jsuis.lf.Svg.prototype.setEnabled = function(enabled) {
		this.setStyleProperty("pointer-events", enabled ? "" : "none");
		var oldEnabled = this.isEnabled();
		this.enabled = enabled;
		this.firePropertyChange("enabled", oldEnabled, enabled);
		return this;
	}
	jsuis.lf.Svg.prototype.getFont = function() {
		return this.font;
	}
	jsuis.lf.Svg.prototype.setFont = function(font) {
		if (font) {
			this.setStyleProperty("font-family", font.getName());
			this.setStyleProperty("font-style", font.getStyle());
			this.setStyleProperty("font-weight", font.getStyle());
			this.setStyleProperty("font-size", font.getSize() + "px");
		}
		this.font = font;
		return this;
	}
}) (jsuis);

/**
 * jsuis.lf.TabComponentBorder
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Border;
	jsuis.lf.TabComponentBorder = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.lf.TabComponentBorder.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets(0, 3);
	}
	jsuis.lf.TabComponentBorder.prototype.paintBorder = function(component) {
		var parent = component.getParent();
		if (!parent) {
			return;
		}
		var width = component.getWidth();
		var height = component.getHeight();
		if (!width || !height) {
			return;
		}
		var selected = component.isSelected();
		var background;
		if (selected) {
			background = jsuis.Color.getColor(0xEEEEEE);
		} else {
			background = jsuis.Color.LightSlateGray;
		}
		var foreground = jsuis.Color.Gray;
		var thickness = 1;
		
		var p = [
			{ x: thickness / 2, y: height },
			{ x: thickness / 2 + 2, y: thickness / 2 },
			{ x: width - thickness / 2 - 2, y: thickness / 2 },
			{ x: width - thickness / 2, y: height }
		];
		var points = this.pointsToString(p);
		
		var graphics = component.getGraphics();
		
		var data = [
			{ points: points, fill: nvl(background, "none").toString(), stroke: nvl(foreground, "none").toString(), strokeWidth: thickness }
		];
		var polylines = graphics.getComponentsByName("polyline");
		for (var i = polylines.length; i < data.length; i++) {
			var polyline = new jsuis.lf.Polyline();
			polyline.setName("polyline");
			graphics.add(polyline);
			polylines.push(polyline);
		}
		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			polylines[i]
				.setAttribute("points", d.points )
				.setStyleProperty("fill", d.fill )
				.setStyleProperty("stroke", d.stroke )
				.setStyleProperty("stroke-width", d.strokeWidth );
		}
	}
	jsuis.lf.TabComponentBorder.prototype.pointsToString = function(points) {
		var string = "";
		for (var i = 0; i < points.length; i++) {
			var point = points[i];
			string += point.x;
			string += ",";
			string += point.y;
			string += " ";
		}
		string = string.trim();
		return string;
	}
}) (jsuis);

/**
 * jsuis.lf.TableCellEditor
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.TableCellEditor = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElement("input"));
		this.setAttribute("type", "text");
		this.setStyleProperty("position", "absolute");
		this.setStyleProperty("padding", "0");
		this.setStyleProperty("margin", "0");
		this.setStyleProperty("border", "0");
		this.setStyleProperty("outline", "none");
		this.setStyleProperty("background-color", "transparent");
		this.setVisible(false);
		new jsuis.lf.Component(document.body).add(this);
		var focusListener = new jsuis.FocusListener({
			focusLost: function(event) {
				var tableCellEditor = this.getListenerComponent();
				var tableCell = tableCellEditor.getTableCell();
				if (tableCell) {
					tableCellEditor.uninstall(tableCell);
				}
			}
		});
		focusListener.setListenerComponent(this);
		this.addFocusListener(focusListener);
	});
	jsuis.Object.addProperties(jsuis.lf.TableCellEditor, {
		tableCell: null
	});
	var instance;
	jsuis.lf.TableCellEditor.getInstance = function() {
		if (!instance) {
			instance = new jsuis.lf.TableCellEditor();
		}
		return instance;
	}
	jsuis.lf.TableCellEditor.prototype.install = function(tableCell) {
		var oldTableCell = this.getTableCell();
		if (oldTableCell) {
			this.uninstall(oldTableCell);
		}
		if (tableCell) {
			var label = tableCell.getLabel();
			var labelBoundingClientRect = label.getElement().getBoundingClientRect();
			var tableCellBoundingClientRect = tableCell.getElement().getBoundingClientRect();
			var bodyBoundingClientRect = document.body.getBoundingClientRect();
			var dx = labelBoundingClientRect.left - tableCellBoundingClientRect.left;
			var dy = labelBoundingClientRect.top - tableCellBoundingClientRect.top;
			this.setBounds(new jsuis.Rectangle(
					labelBoundingClientRect.left - bodyBoundingClientRect.left, labelBoundingClientRect.top - bodyBoundingClientRect.top - dy,
					tableCellBoundingClientRect.width - 2 * dx, labelBoundingClientRect.height + 2 * dy));
			this.setFont(label.getFont());
			this.setText(label.getText());
			label.setVisible(false);
			this.setVisible(true);
		}
		this.tableCell = tableCell;
		return this;
	}
	jsuis.lf.TableCellEditor.prototype.uninstall = function(tableCell) {
		tableCell.setText(this.getText());
		this.setVisible(false);
		var label = tableCell.getLabel();
		label.setVisible(true);
		tableCell.setEditor(null);
	}
	jsuis.lf.TableCellEditor.prototype.getText = function() {
		var element = this.getElement();
		return element.value;
	}
	jsuis.lf.TableCellEditor.prototype.setText = function(text) {
		var element = this.getElement();
		element.value = nvl(text, "");
		return this;
	}
	jsuis.lf.TableCellEditor.prototype.setX = function(x) {
		var outsets = this.getOutsets();
		this.setStyleProperty("left", (+nvl(x, 0) + outsets.getLeft()) + "px");
		this.x = x;
		return this;
	}
	jsuis.lf.TableCellEditor.prototype.setY = function(y) {
		var outsets = this.getOutsets();
		this.setStyleProperty("top", (+nvl(y, 0) + outsets.getTop()) + "px");
		this.y = y;
		return this;
	}
	jsuis.lf.TableCellEditor.prototype.setWidth = function(width) {
		var outsets = this.getOutsets();
		width -= outsets.getLeft() + outsets.getRight();
		if (width >= 0) {
			this.setStyleProperty("width", width + "px");
		}
		this.width = width;
		return this;
	}
	jsuis.lf.TableCellEditor.prototype.setHeight = function(height) {
		var outsets = this.getOutsets();
		height -= outsets.getTop() + outsets.getBottom();
		if (height >= 0) {
			this.setStyleProperty("height", height + "px");
		}
		this.height = height;
		return this;
	}
}) (jsuis);

/**
 * jsuis.lf.TableHeaderViewBorder
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Border;
	jsuis.lf.TableHeaderViewBorder = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.Object.addProperties(jsuis.lf.TableHeaderViewBorder, {
	});
	jsuis.lf.TableHeaderViewBorder.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets();
	}
	jsuis.lf.TableHeaderViewBorder.prototype.paintBorder = function(component) {
		var width = component.getWidth();
		var height = component.getHeight();
		if (!width || !height) {
			return;
		}
		var x = component.getX();
		var viewportSize = component.getViewportSize();
		var viewportWidth = viewportSize.getWidth();
		var viewportHeight = viewportSize.getHeight();
		if (!viewportWidth || !viewportHeight) {
			return;
		}
		var table = component.getTable();
		var columnCount = table.getColumnCount();
		var rowHeight = table.getRowHeight();
		var columnWidth = table.getColumnWidth();
		var x2 = columnCount * columnWidth;
		var y2 = rowHeight;
		var y1 = rowHeight - 0.5;
		var graphics = component.getGraphics();
	
		var data = [];
		data.push({ x1: 0, y1: y1, x2: x2, y2: y1, stroke: jsuis.Color.DarkGray.toString(), strokeWidth: 1 });
		var horizontals = graphics.getComponentsByName("horizontal");
		for (var i = horizontals.length; i < data.length; i++) {
			var horizontal = new jsuis.lf.Line();
			horizontal.setName("horizontal");
			graphics.add(horizontal);
			horizontals.push(horizontal);
		}
		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			horizontals[i]
				.setAttribute("x1", 0)
				.setAttribute("y1", 0)
				.setAttribute("x2", d.x2)
				.setAttribute("y2", 0)
				.setStyleProperty("stroke", d.stroke)
				.setStyleProperty("stroke-width", d.strokeWidth)
				.setAttribute("transform", "translate(" + d.x1 + "," + d.y1 + ")")
				.setStyleProperty("display", "");
		}
		for (var i = data.length; i < horizontals.length; i++) {
			horizontals[i]
				.setStyleProperty("display", "none");
		}
		
		data = [];
		for (var i = Math.ceil((0.5 - x) / columnWidth - 1); i < columnCount; i++) {
			var x1 = x + (i + 1) * columnWidth - 0.5;
			if (x1 < 0) {
				continue;
			} else if (x1 > viewportWidth) {
				break;
			}
			data.push({ x1: x1 - x, y1: 0, x2: x1 - x, y2: y2, stroke: jsuis.Color.DarkGray.toString(), strokeWidth: 1 });
		}
		var verticals = graphics.getComponentsByName("vertical");
		for (var i = verticals.length; i < data.length; i++) {
			var vertical = new jsuis.lf.Line();
			vertical.setName("vertical");
			graphics.add(vertical);
			verticals.push(vertical);
		}
		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			verticals[i]
				.setAttribute("x1", 0)
				.setAttribute("y1", 0)
				.setAttribute("x2", 0)
				.setAttribute("y2", d.y2)
				.setStyleProperty("stroke", d.stroke)
				.setStyleProperty("stroke-width", d.strokeWidth)
				.setAttribute("transform", "translate(" + d.x1 + "," + d.y1 + ")")
				.setStyleProperty("display", "")
		}
		for (var i = data.length; i < verticals.length; i++) {
			verticals[i]
				.setStyleProperty("display", "none");
		}
		
		data = [];
		var columns = table.getColumns();
		var cellWidth = columnWidth - 1;
		var cellHeight = rowHeight - 1;
		for (var j = Math.ceil((0.5 - x) / columnWidth - 1); j < columnCount; j++) {
			var cellX = x + j * columnWidth;
			if (cellX > viewportWidth) {
				break;
			}
			var textContent = columns[j];
			data.push({ x: cellX - x, y: 0, width: cellWidth, height: cellHeight, background: jsuis.Color.LightGray.toString(), foreground: jsuis.Color.Black.toString(), textContent: textContent });
		}
		var cells = graphics.getComponentsByName("cell");
		for (var i = cells.length; i < data.length; i++) {
			var cell = new jsuis.lf.G();
			cell.setName("cell");
			graphics.add(cell);
			cells.push(cell);
			var rect = new jsuis.lf.Rect();
			rect.setName("rect");
			cell.add(rect);
			var text = new jsuis.lf.Text();
			text.setName("text");
			cell.add(text);
		}
		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			var cell = cells[i];
			var rect = cell.getComponentsByName("rect")[0];
			var text = cell.getComponentsByName("text")[0];
			rect
				.setAttribute("x", 0)
				.setAttribute("y", 0)
				.setAttribute("width", d.width)
				.setAttribute("height", d.height)
				.setAttribute("fill", d.background)
				.setAttribute("transform", "translate(" + d.x + "," + d.y + ")")
				.setStyleProperty("display", "");
			text
				.setAttribute("x", 0)
				.setAttribute("y", 0)
				.setAttribute("fill", d.foreground)
				.setProperty("textContent", d.textContent)
				.setAttribute("transform", (function() {
					var element = text.getElement();
					var bbox = element.getBBox();
					var dy = d.y - bbox.y;
					return "translate(" + d.x + "," + dy + ")";
				})())
				.setStyleProperty("display", "");
		}
		for (var i = data.length; i < verticals.length; i++) {
			var cell = cells[i];
			var rect = cell.getComponentsByName("rect")[0];
			var text = cell.getComponentsByName("text")[0];
			rect
				.setStyleProperty("display", "none");
			text
				.setStyleProperty("display", "none");
		}
	}
}) (jsuis);

/**
 * jsuis.lf.TableViewBorder
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Border;
	jsuis.lf.TableViewBorder = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.Object.addProperties(jsuis.lf.TableViewBorder, {
	});
	jsuis.lf.TableViewBorder.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets();
	}
	jsuis.lf.TableViewBorder.prototype.paintBorder = function(component) {
		var width = component.getWidth();
		var height = component.getHeight();
		if (!width || !height) {
			return;
		}
		var x = component.getX();
		var y = component.getY();
		var viewportSize = component.getViewportSize();
		var viewportWidth = viewportSize.getWidth();
		var viewportHeight = viewportSize.getHeight();
		if (!viewportWidth || !viewportHeight) {
			return;
		}
		var table = component.getTable();
		var rowCount = table.getRowCount();
		var columnCount = table.getColumnCount();
		var rowHeight = table.getRowHeight();
		var columnWidth = table.getColumnWidth();
		var x2 = columnCount * columnWidth;
		var y2 = rowCount * rowHeight;
		var graphics = component.getGraphics();
	
		var data = [];
		for (var i = Math.ceil((0.5 - y) / rowHeight - 1); i < rowCount; i++) {
			var y1 = y + (i + 1) * rowHeight - 0.5;
			if (y1 < 0) {
				continue;
			} else if (y1 > viewportHeight) {
				break;
			}
			data.push({ x1: 0, y1: y1 - y, x2: x2, y2: y1 - y, stroke: jsuis.Color.DarkGray.toString(), strokeWidth: 1 });
		}
		var horizontals = graphics.getComponentsByName("horizontal");
		for (var i = horizontals.length; i < data.length; i++) {
			var horizontal = new jsuis.lf.Line();
			horizontal.setName("horizontal");
			graphics.add(horizontal);
			horizontals.push(horizontal);
		}
		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			horizontals[i]
				.setAttribute("x1", 0)
				.setAttribute("y1", 0)
				.setAttribute("x2", d.x2)
				.setAttribute("y2", 0)
				.setStyleProperty("stroke", d.stroke)
				.setStyleProperty("stroke-width", d.strokeWidth)
				.setAttribute("transform", "translate(" + d.x1 + "," + d.y1 + ")")
				.setStyleProperty("display", "");
		}
		for (var i = data.length; i < horizontals.length; i++) {
			horizontals[i]
				.setStyleProperty("display", "none");
		}
		
		data = [];
		for (var i = Math.ceil((0.5 - x) / columnWidth - 1); i < columnCount; i++) {
			var x1 = x + (i + 1) * columnWidth - 0.5;
			if (x1 < 0) {
				continue;
			} else if (x1 > viewportWidth) {
				break;
			}
			data.push({ x1: x1 - x, y1: 0, x2: x1 - x, y2: y2, stroke: jsuis.Color.DarkGray.toString(), strokeWidth: 1 });
		}
		var verticals = graphics.getComponentsByName("vertical");
		for (var i = verticals.length; i < data.length; i++) {
			var vertical = new jsuis.lf.Line();
			vertical.setName("vertical");
			graphics.add(vertical);
			verticals.push(vertical);
		}
		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			verticals[i]
				.setAttribute("x1", 0)
				.setAttribute("y1", 0)
				.setAttribute("x2", 0)
				.setAttribute("y2", d.y2)
				.setStyleProperty("stroke", d.stroke)
				.setStyleProperty("stroke-width", d.strokeWidth)
				.setAttribute("transform", "translate(" + d.x1 + "," + d.y1 + ")")
				.setStyleProperty("display", "")
		}
		for (var i = data.length; i < verticals.length; i++) {
			verticals[i]
				.setStyleProperty("display", "none");
		}
		
		data = [];
		var values = table.getValues();
		var cellWidth = columnWidth - 1;
		var cellHeight = rowHeight - 1;
		for (var j = Math.ceil((0.5 - x) / columnWidth - 1); j < columnCount; j++) {
			var cellX = x + j * columnWidth;
			if (cellX > viewportWidth) {
				break;
			}
			for (var i = Math.ceil((0.5 - y) / rowHeight - 1); i < rowCount; i++) {
				var cellY = y + i * rowHeight;
				if (cellY > viewportHeight) {
					break;
				}
				var textContent = values[i][j];
				data.push({ x: cellX - x, y: cellY - y, width: cellWidth, height: cellHeight, background: jsuis.Color.White.toString(), foreground: jsuis.Color.Black.toString(), textContent: textContent });
			}
		}
		var cells = graphics.getComponentsByName("cell");
		for (var i = cells.length; i < data.length; i++) {
			var cell = new jsuis.lf.G();
			cell.setName("cell");
			graphics.add(cell);
			cells.push(cell);
			var rect = new jsuis.lf.Rect();
			rect.setName("rect");
			cell.add(rect);
			var text = new jsuis.lf.Text();
			text.setName("text");
			cell.add(text);
		}
		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			var cell = cells[i];
			var rect = cell.getComponentsByName("rect")[0];
			var text = cell.getComponentsByName("text")[0];
			rect
				.setAttribute("x", 0)
				.setAttribute("y", 0)
				.setAttribute("width", d.width)
				.setAttribute("height", d.height)
				.setAttribute("fill", d.background)
				.setAttribute("transform", "translate(" + d.x + "," + d.y + ")")
				.setStyleProperty("display", "");
			text
				.setAttribute("x", 0)
				.setAttribute("y", 0)
				.setAttribute("fill", d.foreground)
				.setProperty("textContent", d.textContent)
				.setAttribute("transform", (function() {
					var element = text.getElement();
					var bbox = element.getBBox();
					var dy = d.y - bbox.y;
					return "translate(" + d.x + "," + dy + ")";
				})())
				.setStyleProperty("display", "");
		}
		for (var i = data.length; i < verticals.length; i++) {
			var cell = cells[i];
			var rect = cell.getComponentsByName("rect")[0];
			var text = cell.getComponentsByName("text")[0];
			rect
				.setStyleProperty("display", "none");
			text
				.setStyleProperty("display", "none");
		}
	}
}) (jsuis);

/**
 * jsuis.lf.TabPanelBorder
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Border;
	jsuis.lf.TabPanelBorder = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.lf.TabPanelBorder.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets();
	}
	jsuis.lf.TabPanelBorder.prototype.paintBorder = function(component) {
		var width = component.getWidth();
		var height = component.getHeight();
		if (!width || !height) {
			return;
		}
		var color = jsuis.Color.LightSlateGray;
		var thickness = 1;
		var graphics = component.getGraphics();
		
		var data = [
			{ x1: 0, y1: height - thickness / 2, x2: width, y2: height - thickness / 2,
				stroke: color.toString(), strokeWidth: thickness }
		];
		var lines = graphics.getComponentsByName("line");
		for (var i = lines.length; i < data.length; i++) {
			var line = new jsuis.lf.Line();
			line.setName("line");
			graphics.add(line);
			lines.push(line);
		}
		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			lines[i]
				.setAttribute("x1", d.x1)
				.setAttribute("y1", d.y1)
				.setAttribute("x2", d.x2)
				.setAttribute("y2", d.y2)
				.setStyleProperty("stroke", d.stroke)
				.setStyleProperty("stroke-width", d.strokeWidth);
		}
	}
}) (jsuis);

/**
 * jsuis.lf.Text
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.Text = jsuis.Object.extend(SUPER, function(text) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "text"));
		SUPER.prototype.setEnabled.call(this, false);
		this.setText(nvl(text, ""));
		this.setFont(new jsuis.Font("Arial", "bold", 12));
		this.setForeground(jsuis.Color.Black);
		this.setDisabledColor(jsuis.Color.Gray);
		this.setSelectable(false);
	});
	jsuis.Object.addProperties(jsuis.lf.Text, {
		text: null,
		color: null,
		disabledColor: null
	});
	jsuis.lf.Text.prototype.getText = function() {
		var element = this.getElement();
		return element.textContent;
	}
	jsuis.lf.Text.prototype.setText = function(text) {
		var element = this.getElement();
		element.textContent = text;
		return this;
	}
	jsuis.lf.Text.prototype.setWidth = function(width) {
		this.width = width;
		return this;
	}
	jsuis.lf.Text.prototype.setHeight = function(height) {
		this.height = height;
		return this;
	}
	jsuis.lf.Text.prototype.getBackground = function() {
		SUPER.prototype.getForeground.call(this);
	}
	jsuis.lf.Text.prototype.setBackground = function(background) {
		SUPER.prototype.setForeground.call(this, background);
		return this;
	}
	jsuis.lf.Text.prototype.getForeground = function() {
		SUPER.prototype.getBackground.call(this);
	}
	jsuis.lf.Text.prototype.setForeground = function(foreground) {
		this.setColor(foreground);
		SUPER.prototype.setBackground.call(this, foreground);
		return this;
	}
	jsuis.lf.Text.prototype.setEnabled = function(enabled) {
		if (enabled) {
			var color = this.getColor();
			SUPER.prototype.setBackground.call(this, color);
		} else {
			var disabledColor = this.getDisabledColor();
			SUPER.prototype.setBackground.call(this, disabledColor);
		}
		var oldEnabled = this.isEnabled();
		this.enabled = enabled;
		this.firePropertyChange("enabled", oldEnabled, enabled);
		return this;
	}
	jsuis.lf.Text.prototype.validate = function() {
		var element = this.getElement();
		var bbox = element.getBBox();
		var dy = this.getY() - bbox.y;
		this.setAttribute("transform", "translate(" + 0 + "," + dy + ")");
		SUPER.prototype.validate.call(this);
	}
}) (jsuis);

/**
 * jsuis.lf.TextFieldEditor
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.TextFieldEditor = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElement("input"));
		this.setAttribute("type", "text");
		this.setStyleProperty("position", "absolute");
		this.setStyleProperty("padding", "0");
		this.setStyleProperty("margin", "0");
		this.setStyleProperty("border", "0");
		this.setStyleProperty("outline", "none");
		this.setStyleProperty("background-color", "transparent");
		this.setVisible(false);
		new jsuis.lf.Component(document.body).add(this);
		var focusListener = new jsuis.FocusListener({
			focusLost: function(event) {
				var textFieldEditor = this.getListenerComponent();
				var textField = textFieldEditor.getTextField();
				if (textField) {
					textFieldEditor.uninstall(textField);
				}
			}
		});
		focusListener.setListenerComponent(this);
		this.addFocusListener(focusListener);
	});
	jsuis.Object.addProperties(jsuis.lf.TextFieldEditor, {
		textField: null
	});
	var instance;
	jsuis.lf.TextFieldEditor.getInstance = function() {
		if (!instance) {
			instance = new jsuis.lf.TextFieldEditor();
		}
		return instance;
	}
	jsuis.lf.TextFieldEditor.prototype.install = function(textField) {
		var oldTextField = this.getTextField();
		if (oldTextField) {
			this.uninstall(oldTextField);
		}
		if (textField) {
			var label = textField.getLabel();
			var labelBoundingClientRect = label.getElement().getBoundingClientRect();
			var textFieldBoundingClientRect = textField.getElement().getBoundingClientRect();
			var bodyBoundingClientRect = document.body.getBoundingClientRect();
			var dx = labelBoundingClientRect.left - textFieldBoundingClientRect.left;
			var dy = labelBoundingClientRect.top - textFieldBoundingClientRect.top;
			this.setBounds(new jsuis.Rectangle(
					labelBoundingClientRect.left - bodyBoundingClientRect.left, labelBoundingClientRect.top - bodyBoundingClientRect.top - dy,
					textFieldBoundingClientRect.width - 2 * dx, labelBoundingClientRect.height + 2 * dy));
			this.setFont(label.getFont());
			this.setText(label.getText());
			label.setVisible(false);
			this.setVisible(true);
		}
		this.textField = textField;
		return this;
	}
	jsuis.lf.TextFieldEditor.prototype.uninstall = function(textField) {
		textField.setText(this.getText());
		this.setVisible(false);
		var label = textField.getLabel();
		label.setVisible(true);
		textField.setEditor(null);
	}
	jsuis.lf.TextFieldEditor.prototype.getText = function() {
		var element = this.getElement();
		return element.value;
	}
	jsuis.lf.TextFieldEditor.prototype.setText = function(text) {
		var element = this.getElement();
		element.value = nvl(text, "");
		return this;
	}
	jsuis.lf.TextFieldEditor.prototype.setX = function(x) {
		var outsets = this.getOutsets();
		this.setStyleProperty("left", (+nvl(x, 0) + outsets.getLeft()) + "px");
		this.x = x;
		return this;
	}
	jsuis.lf.TextFieldEditor.prototype.setY = function(y) {
		var outsets = this.getOutsets();
		this.setStyleProperty("top", (+nvl(y, 0) + outsets.getTop()) + "px");
		this.y = y;
		return this;
	}
	jsuis.lf.TextFieldEditor.prototype.setWidth = function(width) {
		var outsets = this.getOutsets();
		width -= outsets.getLeft() + outsets.getRight();
		if (width >= 0) {
			this.setStyleProperty("width", width + "px");
		}
		this.width = width;
		return this;
	}
	jsuis.lf.TextFieldEditor.prototype.setHeight = function(height) {
		var outsets = this.getOutsets();
		height -= outsets.getTop() + outsets.getBottom();
		if (height >= 0) {
			this.setStyleProperty("height", height + "px");
		}
		this.height = height;
		return this;
	}
}) (jsuis);

/**
 * jsuis.lf.TouchListener
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Listener;
	jsuis.lf.TouchListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.lf.TouchListener.prototype.touchPressed = function(event) {
		var listener = this.getListener();
		if (listener && listener.touchPressed) {
			listener.touchPressed.call(this, event);
		}
	}
	jsuis.lf.TouchListener.prototype.touchReleased = function(event) {
		var listener = this.getListener();
		if (listener && listener.touchReleased) {
			listener.touchReleased.call(this, event);
		}
	}
	jsuis.lf.TouchListener.prototype.touchMoved = function(event) {
		var listener = this.getListener();
		if (listener && listener.touchMoved) {
			listener.touchMoved.call(this, event);
		}
	}
	jsuis.lf.TouchListener.prototype.touchDragged = function(event) {
		var listener = this.getListener();
		if (listener && listener.touchDragged) {
			listener.touchDragged.call(this, event);
		}
	}
}) (jsuis);

/**
 * jsuis.Action
 */
(function(jsuis) {
	var SUPER = jsuis.ActionListener;
	jsuis.Action = jsuis.Object.extend(SUPER, function(listener) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Action(listener));
	});
	jsuis.Object.addPeerProperties(jsuis.Action, {
		enabled: false
	});
}) (jsuis);

/**
 * jsuis.BorderConstraints
 */
(function(jsuis) {
	var SUPER = jsuis.Constraints;
	jsuis.BorderConstraints = jsuis.Object.extend(SUPER, function(
			border, anchor, fill, margin, padding, layer) {
		SUPER.prototype.constructor.call(this, layer, anchor, nvl(fill, jsuis.Constants.BOTH),
				margin, padding, border);
	});
	jsuis.BorderConstraints.prototype.clone = function() {
		return new jsuis.BorderConstraints(
				this.getBorder(), this.getAnchor(), this.getFill(),
				this.getMargin().clone(), this.getPadding().clone(),
				this.getLayer());
	}
	
	jsuis.BORDER_CONSTRAINTS = jsuis.Object.extend(jsuis.BorderConstraints, function(
			border, anchor, fill, margin, padding, layer) {
		jsuis.BorderConstraints.prototype.constructor.call(this,
				border, anchor, fill, margin, padding, layer);
	});
	jsuis.Constraints.NORTH = jsuis.BorderConstraints.NORTH = new jsuis.BORDER_CONSTRAINTS(jsuis.Constants.NORTH);
	jsuis.Constraints.SOUTH = jsuis.BorderConstraints.SOUTH = new jsuis.BORDER_CONSTRAINTS(jsuis.Constants.SOUTH);
	jsuis.Constraints.EAST = jsuis.BorderConstraints.EAST = new jsuis.BORDER_CONSTRAINTS(jsuis.Constants.EAST);
	jsuis.Constraints.WEST = jsuis.BorderConstraints.WEST = new jsuis.BORDER_CONSTRAINTS(jsuis.Constants.WEST);
	jsuis.Constraints.CENTER = jsuis.BorderConstraints.CENTER = new jsuis.BORDER_CONSTRAINTS(jsuis.Constants.CENTER);
	
	jsuis.BORDER_CONSTRAINTS.prototype.setBorder = function(border) {
	}
	jsuis.BORDER_CONSTRAINTS.prototype.setAnchor = function(anchor) {
	}
	jsuis.BORDER_CONSTRAINTS.prototype.setFill = function(fill) {
	}
	jsuis.BORDER_CONSTRAINTS.prototype.setMargin = function(margin) {
	}
	jsuis.BORDER_CONSTRAINTS.prototype.setPadding = function(padding) {
	}
	jsuis.BORDER_CONSTRAINTS.prototype.setLayer = function(layer) {
	}
}) (jsuis);

/**
 * jsuis.GridBagConstraints
 */
(function(jsuis) {
	var SUPER = jsuis.Constraints;
	jsuis.GridBagConstraints = jsuis.Object.extend(SUPER, function(
			gridx, gridy, gridwidth, gridheight,
			weightx, weighty,
			anchor, fill,
			insets, ipadx, ipady,
			layer) {
		SUPER.prototype.constructor.call(this, layer, anchor, fill, insets,
				new jsuis.Insets(nvl(ipady, 0), nvl(ipadx, 0)));
		this.setGridx(nvl(gridx, jsuis.Constants.RELATIVE));
		this.setGridy(nvl(gridy, jsuis.Constants.RELATIVE));
		this.setGridwidth(nvl(gridwidth, 1));
		this.setGridheight(nvl(gridheight, 1));
		this.setWeightx(nvl(weightx, 0));
		this.setWeighty(nvl(weighty, 0));
	});
	jsuis.Object.addProperties(jsuis.GridBagConstraints, {
		gridx: 0,
		gridy: 0,
		gridwidth: 0,
		gridheight: 0,
		weightx: 0,
		weighty: 0,
		relativeGridx: 0,
		relativeGridy: 0,
		remainderGridwidth: 0,
		remainderGridheight: 0
	});
	jsuis.GridBagConstraints.prototype.getInsets = function() {
		return this.getMargin();
	}
	jsuis.GridBagConstraints.prototype.setInsets = function(insets) {
		this.setMargin(insets);
		return this;
	}
	jsuis.GridBagConstraints.prototype.getIpadx = function() {
		var padding = this.getPadding();
		return padding.getLeft();
	}
	jsuis.GridBagConstraints.prototype.setIpadx = function(ipadx) {
		var padding = this.getPadding();
		padding.setLeft(ipadx).setRight(ipadx);
		return this;
	}
	jsuis.GridBagConstraints.prototype.getIpady = function() {
		var padding = this.getPadding();
		return padding.getTop();
	}
	jsuis.GridBagConstraints.prototype.setIpady = function(ipady) {
		var padding = this.getPadding();
		padding.setTop(ipady).setBottom(ipady);
		return this;
	}
	jsuis.GridBagConstraints.prototype.withGridx = function(gridx) {
		return this.clone().setGridx(gridx);
	}
	jsuis.GridBagConstraints.prototype.withGridy = function(gridy) {
		return this.clone().setGridy(gridy);
	}
	jsuis.GridBagConstraints.prototype.withGridwidth = function(gridwidth) {
		return this.clone().setGridwidth(gridwidth);
	}
	jsuis.GridBagConstraints.prototype.withGridheight = function(gridheight) {
		return this.clone().setGridheight(gridheight);
	}
	jsuis.GridBagConstraints.prototype.withWeightx = function(weightx) {
		return this.clone().setWeightx(weightx);
	}
	jsuis.GridBagConstraints.prototype.withWeighty = function(weighty) {
		return this.clone().setWeighty(weighty);
	}
	
	jsuis.GridBagConstraints.prototype.clone = function() {
		return new jsuis.GridBagConstraints(
				this.getGridx(), this.getGridy(), this.getGridwidth(), this.getGridheight(),
				this.getWeightx(), this.getWeighty(),
				this.getAnchor(), this.getFill(),
				this.getInsets(), this.getIpadx(), this.getIpady(),
				this.getLayer());
	}
}) (jsuis);

/**
 * jsuis.InputEvent
 */
(function(jsuis) {
	var SUPER = jsuis.ComponentEvent;
	jsuis.InputEvent = jsuis.Object.extend(SUPER, function(event) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].InputEvent(event));
	});
	jsuis.Object.addPeerProperties(jsuis.InputEvent, {
		when: 0,
		modifiers: 0
	});
}) (jsuis);

/**
 * jsuis.LayeredPane
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.LayeredPane = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].LayeredPane());
	});
}) (jsuis);

/**
 * jsuis.MenuBar
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.MenuBar = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].MenuBar());
	});
}) (jsuis);

/**
 * jsuis.MenuItem
 */
(function(jsuis) {
	var SUPER = jsuis.Button;
	jsuis.MenuItem = jsuis.Object.extend(SUPER, function(text, icon) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].MenuItem(text, icon));
	});
}) (jsuis);

/**
 * jsuis.PopupMenu
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.PopupMenu = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].PopupMenu());
	});
	jsuis.PopupMenu.prototype.show = function(invoker, x, y) {
		var peer = this.getPeer();
		peer.show(invoker, x, y);
	}
}) (jsuis);

/**
 * jsuis.RadioButton
 */
(function(jsuis) {
	var SUPER = jsuis.Button;
	jsuis.RadioButton = jsuis.Object.extend(SUPER, function(text, icon) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].RadioButton(text, icon));
	});
}) (jsuis);

/**
 * jsuis.ScrollPane
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.ScrollPane = jsuis.Object.extend(SUPER, function(view, vsbPolicy, hsbPolicy) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ScrollPane(view, vsbPolicy, hsbPolicy));
	});
	jsuis.Object.addPeerProperties(jsuis.ScrollPane, {
		vsbPolicy: null,
		hsbPolicy: null,
		viewport: null,
		verticalScrollBar: null,
		horizontalScrollBar: null
	});
	jsuis.ScrollPane.prototype.setViewportView = function(view) {
		var peer = this.getPeer();
		peer.setViewportView(view);
		return this;
	}
	jsuis.ScrollPane.prototype.getViewportView = function() {
		var peer = this.getPeer();
		return peer.getViewportView();
	}
}) (jsuis);

/**
 * jsuis.SplitPane
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.SplitPane = jsuis.Object.extend(SUPER, function(orientation, leftComponent, rightComponent) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].SplitPane(orientation, leftComponent, rightComponent));
	});
	jsuis.Object.addPeerProperties(jsuis.SplitPane, {
		orientation: null,
		leftComponent: null,
		rightComponent: null,
		topComponent: null,
		bottomComponent: null,
		dividerSize: 0,
		resizeWeight: 0
	});
}) (jsuis);

/**
 * jsuis.TabbedPane
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.TabbedPane = jsuis.Object.extend(SUPER, function(tabPlacement) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].TabbedPane(tabPlacement));
	});
	jsuis.TabbedPane.prototype.addTab = function(tabComponent, cardComponent) {
		var peer = this.getPeer();
		peer.addTab(tabComponent, cardComponent);
	}
	jsuis.TabbedPane.prototype.getTabCount = function() {
		var peer = this.getPeer();
		return peer.getTabCount();
	}
	jsuis.TabbedPane.prototype.getTabComponentAt = function(index) {
		var peer = this.getPeer();
		return peer.getTabComponentAt(index);
	}
	jsuis.TabbedPane.prototype.getComponentAt = function(index) {
		var peer = this.getPeer();
		return peer.getComponentAt(index);
	}
	jsuis.TabbedPane.prototype.getSelectedIndex = function() {
		var peer = this.getPeer();
		return peer.getSelectedIndex();
	}
}) (jsuis);

/**
 * jsuis.TabComponent
 */
(function(jsuis) {
	var SUPER = jsuis.Button;
	jsuis.TabComponent = jsuis.Object.extend(SUPER, function(text, icon) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].TabComponent(text, icon));
	});
}) (jsuis);

/**
 * jsuis.TextPane
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.TextPane = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].TextPane());
	});
	jsuis.Object.addPeerProperties(jsuis.TextPane, {
		text: null,
		editable: false,
		highlighter: false
	});
	jsuis.TextPane.prototype.append = function(text) {
		var peer = this.getPeer();
		peer.append(text);
	}
}) (jsuis);

/**
 * jsuis.ToggleButton
 */
(function(jsuis) {
	var SUPER = jsuis.Button;
	jsuis.ToggleButton = jsuis.Object.extend(SUPER, function(text, icon) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ToggleButton(text, icon));
	});
}) (jsuis);

/**
 * jsuis.ToolBar
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.ToolBar = jsuis.Object.extend(SUPER, function(orientation) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ToolBar(orientation));
	});
	jsuis.ToolBar.prototype.addSeparator = function(size) {
		var peer = this.getPeer();
		peer.addSeparator(size);
	}
}) (jsuis);

/**
 * jsuis.Tree
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.Tree = jsuis.Object.extend(SUPER, function(model) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Tree());
		this.setModel(nvl(model, new jsuis.TreeModel()));
		this.setCellRenderer(new jsuis.TreeCellRenderer());
	});
	jsuis.Object.addPeerProperties(jsuis.Tree, {
		model: null,
		cellRenderer: null
	});
	jsuis.Tree.prototype.getRoot = function() {
		var model = this.getModel();
		return model.getRoot();
	}
	jsuis.Tree.prototype.setRoot = function(root) {
		var model = this.getModel();
		model.setRoot(root);
		return this;
	}
	jsuis.Tree.prototype.isRootVisible = function() {
		var peer = this.getPeer();
		return peer.isRootVisible();
	}
	jsuis.Tree.prototype.setRootVisible = function(rootVisible) {
		var peer = this.getPeer();
		peer.setRootVisible(rootVisible);
		return this;
	}
	jsuis.Tree.prototype.expandRow = function(row) {
		var peer = this.getPeer();
		peer.expandRow(row);
	}
	jsuis.Tree.prototype.expandNode = function(node) {
		var peer = this.getPeer();
		peer.expandNode(node);
	}
	/*
	jsuis.Tree.prototype.getRowCount = function() {
		var peer = this.getPeer();
		return peer.getRowCount();
	}
	*/
	jsuis.Tree.prototype.expandAll = function() {
		var peer = this.getPeer();
		peer.expandAll();
	}
	jsuis.Tree.prototype.getNodeForLocation = function(x, y) {
		var peer = this.getPeer();
		return peer.getNodeForLocation(x, y);
	}
}) (jsuis);

/**
 * jsuis.lf.Action
 */
(function(jsuis) {
	var SUPER = jsuis.lf.ActionListener;
	jsuis.lf.Action = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.lf.Action.prototype.isEnabled = function() {
		return this.enabled;
	}
	jsuis.lf.Action.prototype.setEnabled = function(enabled) {
		var oldEnabled = this.enabled;
		this.enabled = enabled;
		this.firePropertyChange("enabled", oldEnabled, enabled);
		return this;
	}
}) (jsuis);

/**
 * jsuis.lf.AdjustmentEvent
 */
(function(jsuis) {
	var SUPER = jsuis.lf.ComponentEvent;
	jsuis.lf.AdjustmentEvent = jsuis.Object.extend(SUPER, function(event) {
		SUPER.prototype.constructor.call(this, event);
	});
}) (jsuis);

/**
 * jsuis.lf.ComboBox
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Svg;
	jsuis.lf.ComboBox = jsuis.Object.extend(SUPER, function(items) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		this.setBorder(new jsuis.LineBorder(jsuis.Color.Gray, 1, 8));
		var label = new jsuis.lf.Text();
		this.setLabel(label);
		this.add(label, new jsuis.BorderConstraints().setFill(jsuis.Constants.HORIZONTAL));
		if (items) {
			this.setItems(items);
		}
		this.setPadding(new jsuis.Insets(2, 4));
		this.setBackground(jsuis.Color.Black.withAlpha(0));
		this.setFont(new jsuis.Font("Arial", "normal", 12));
		var mouseListener = new jsuis.MouseListener({
			mouseReleased: function(event) {
				var comboBox = this.getListenerComponent();
				var comboBoxEditor = jsuis.lf.ComboBoxEditor.getInstance();
				comboBox.setEditor(comboBoxEditor);
				comboBoxEditor.requestFocus();
			}
		});
		mouseListener.setListenerComponent(this);
		this.addMouseListener(mouseListener);
	});
	jsuis.Object.addProperties(jsuis.lf.ComboBox, {
		editor: null,
		items: null,
		label: null
	});
	jsuis.lf.ComboBox.prototype.setEditor = function(editor) {
		if (editor) {
			editor.install(this);
		}
		this.editor = editor;
		return this;
	}
	jsuis.lf.ComboBox.prototype.setItems = function(items) {
		this.items = items;
		this.setSelectedItem(items[0]);
	}
	jsuis.lf.ComboBox.prototype.getSelectedItem = function() {
		var label = this.getLabel();
		return label.getText();
	}
	jsuis.lf.ComboBox.prototype.setSelectedItem = function(text) {
		var label = this.getLabel();
		return label.setText(text);
	}
	jsuis.lf.ComboBox.prototype.getFont = function() {
		var label = this.getLabel();
		return label.getFont();
	}
	jsuis.lf.ComboBox.prototype.setFont = function(font) {
		var label = this.getLabel();
		label.setFont(font);
		return this;
	}
}) (jsuis);

/**
 * jsuis.lf.FocusEvent
 */
(function(jsuis) {
	var SUPER = jsuis.lf.ComponentEvent;
	jsuis.lf.FocusEvent = jsuis.Object.extend(SUPER, function(event) {
		SUPER.prototype.constructor.call(this, event);
	});
	jsuis.Object.addProperties(jsuis.lf.FocusEvent, {
		opposite: null
	});
	jsuis.lf.FocusEvent.prototype.setTemporary = function(opposite) {
		this.opposite = opposite;
	}
	jsuis.lf.FocusEvent.prototype.isTemporary = function() {
		return this.opposite;
	}
	jsuis.lf.FocusEvent.prototype.getOpposite = function() {
		var opposite = this.opposite;
		if (opposite) {
			return opposite;
		}
		var domEvent = this.getElement();
		var relatedTarget = domEvent.relatedTarget;
		if (relatedTarget) {
			opposite = new jsuis.lf.Component(relatedTarget);
			this.setOpposite(opposite);
		}
		return opposite;
	}
}) (jsuis);

/**
 * jsuis.lf.Frame
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Panel;
	jsuis.lf.Frame = jsuis.Object.extend(SUPER, function(title) {
		SUPER.prototype.constructor.call(this, null);
		SUPER.prototype.setLayout.call(this, new jsuis.BorderLayout());
		var rootPane = new jsuis.lf.RootPane();
		this.setRootPane(rootPane);
		SUPER.prototype.add.call(this, rootPane);
		var contentPane = new jsuis.lf.Panel(new jsuis.BorderLayout());
		this.setContentPane(contentPane);
		contentPane.setBorder(new jsuis.lf.LineBorder());
		this.setBackground(jsuis.Color.getColor(0xEEEEEE));
		
		var browserWindow = jsuis.lf.BrowserWindow.getInstance();
		var componentListener = new jsuis.ComponentListener({
			componentResized: function(event) {
				var frame = this.getListenerComponent();
				frame.validate();
			}
		});
		componentListener.setListenerComponent(this);
		browserWindow.addComponentListener(componentListener);
	});
	jsuis.Object.addProperties(jsuis.lf.Frame, {
		rootPane: null
	});
	jsuis.lf.Frame.prototype.add = function(component, constraints, index) {
		var contentPane = this.getContentPane();
		contentPane.add(component, constraints, index);
	}
	jsuis.lf.Frame.prototype.remove = function(component) {
		var contentPane = this.getContentPane();
		contentPane.remove(component);
	}
	jsuis.lf.Frame.prototype.removeAll = function() {
		var contentPane = this.getContentPane();
		contentPane.removeAll();
	}
	jsuis.lf.Frame.prototype.getLayeredPane = function() {
		var rootPane = this.getRootPane();
		return rootPane.getLayeredPane();
	}
	jsuis.lf.Frame.prototype.setLayeredPane = function(contentPane) {
		var rootPane = this.getRootPane();
		rootPane.setLayeredPane(contentPane);
		return this;
	}
	jsuis.lf.Frame.prototype.getMenuBar = function() {
		var rootPane = this.getRootPane();
		return rootPane.getMenuBar();
	}
	jsuis.lf.Frame.prototype.setMenuBar = function(menuBar) {
		var rootPane = this.getRootPane();
		rootPane.setMenuBar(menuBar);
		return this;
	}
	jsuis.lf.Frame.prototype.getContentPane = function() {
		var rootPane = this.getRootPane();
		return rootPane.getContentPane();
	}
	jsuis.lf.Frame.prototype.setContentPane = function(contentPane) {
		var rootPane = this.getRootPane();
		rootPane.setContentPane(contentPane);
		return this;
	}
	/*
	jsuis.lf.Frame.prototype.getLayout = function() {
		var contentPane = this.getContentPane();
		return contentPane.getLayout();
	}
	jsuis.lf.Frame.prototype.setLayout = function(layout) {
		var contentPane = this.getContentPane();
		contentPane.setLayout(layout);
		return this;
	}
	*/
	jsuis.lf.Frame.prototype.validate = function() {
		var parent = this.getParent();
		if (!parent) {
			return;
		}
		var parentElement = parent.getElement();
		var size = parent.getSize().subtract(
				parent.getInsets().getDimension()).subtract(
						parent.getOutsets().getDimension());
		var width = size.getWidth();
		if (width === 0) {
			width = parentElement.clientWidth;
		}
		var height = size.getHeight();
		if (height === 0) {
			height = parentElement.clientHeight;
		}
		this.setWidth(width);
		this.setHeight(height);
		SUPER.prototype.validate.call(this);
	}
	jsuis.lf.Frame.prototype.doLayout = function() {
		var layout = SUPER.prototype.getLayout.call(this);
		if (layout) {
			layout.layoutContainer(this);
		}
	}
	jsuis.lf.Frame.prototype.setVisible = function(visible) {
		SUPER.prototype.setVisible.call(this, visible);
		if (visible) {
			this.validate();
		}
		return this;
	}
	jsuis.lf.Frame.prototype.getBackground = function() {
		var contentPane = this.getContentPane();
		return contentPane.getBackground();
	}
	jsuis.lf.Frame.prototype.setBackground = function(background) {
		var contentPane = this.getContentPane();
		contentPane.setBackground(background);
		return this;
	}
	jsuis.lf.Frame.prototype.dispose = function() {
		var browserWindow = jsuis.lf.BrowserWindow.getInstance();
		var browserWindowComponentListeners = browserWindow.getComponentListeners();
		for (var i = 0; i < browserWindowComponentListeners.length; i++) {
			var browserWindowComponentListener = browserWindowComponentListeners[i];
			if (browserWindowComponentListener.getListenerComponent() === this) {
				browserWindow.removeComponentListener(browserWindowComponentListener);
			}
		}
	}
}) (jsuis);

/**
 * jsuis.lf.InputEvent
 */
(function(jsuis) {
	var SUPER = jsuis.lf.ComponentEvent;
	jsuis.lf.InputEvent = jsuis.Object.extend(SUPER, function(event) {
		SUPER.prototype.constructor.call(this, event);
	});
	jsuis.Object.addProperties(jsuis.lf.InputEvent, {
		when: 0,
		modifiers: 0
	});
	
	jsuis.lf.InputEvent.SHIFT_MASK = 1;
	jsuis.lf.InputEvent.CTRL_MASK = 2;
	jsuis.lf.InputEvent.META_MASK = 4;
	jsuis.lf.InputEvent.ALT_MASK = 8;
	
	jsuis.lf.InputEvent.SHIFT_DOWN_MASK = 64;
	jsuis.lf.InputEvent.CTRL_DOWN_MASK = 128;
	jsuis.lf.InputEvent.META_DOWN_MASK = 256;
	jsuis.lf.InputEvent.ALT_DOWN_MASK = 512;
	
	jsuis.lf.InputEvent.prototype.getWhen = function() {
		var when = this.when;
		if (when !== null && when !== undefined) {
			return when;
		}
		var domEvent = this.getElement();
		if (domEvent) {
			when = domEvent.timeStamp;
		} else {
			when = new Date().getTime();
		}
		this.setWhen(when);
		return when;
	}
	jsuis.lf.InputEvent.prototype.getModifiers = function() {
		var modifiers = this.modifiers;
		if (modifiers !== null && modifiers !== undefined) {
			return modifiers;
		}
		var domEvent = this.getElement();
		if (domEvent) {
			modifiers = (domEvent.shiftKey ? (jsuis.lf.InputEvent.SHIFT_MASK | jsuis.lf.InputEvent.SHIFT_DOWN_MASK) : 0)
			| (domEvent.ctrlKey ? (jsuis.lf.InputEvent.CTRL_MASK | jsuis.lf.InputEvent.CTRL_DOWN_MASK) : 0)
			| (domEvent.altKey ? (jsuis.lf.InputEvent.ALT_MASK | jsuis.lf.InputEvent.ALT_DOWN_MASK) : 0)
			| (domEvent.metaKey ? (jsuis.lf.InputEvent.META_MASK | jsuis.lf.InputEvent.META_DOWN_MASK) : 0);
			this.setModifiers(modifiers);
		}
		return modifiers;
	}
}) (jsuis);

/**
 * jsuis.lf.Label
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Svg;
	jsuis.lf.Label = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, null);
		this.setLayout(new jsuis.BorderLayout());
		this.setText(text);
		this.setIcon(icon);
		this.setIconTextGap(4);
	});
	jsuis.Object.addProperties(jsuis.lf.Label, {
		text: null,
		label: null,
		icon: null,
		iconGraphics: null,
		iconTextGap: 0
	});
	jsuis.lf.Label.prototype.getText = function() {
		var label = this.getLabel();
		if (label) {
			return label.getText();
		}
		return "";
	}
	jsuis.lf.Label.prototype.setText = function(text, textConstraints) {
		if (text) {
			var label = this.getLabel();
			if (!label) {
				label = new jsuis.lf.Text();
				this.setLabel(label);
				this.add(label, nvl(textConstraints, jsuis.Constraints.CENTER.withFill(jsuis.Constants.NONE)));
			} else if (textConstraints) {
				label.setConstraints(textConstraints);
			}
			label.setText(text);
		}
		this.validate();
		this.paint();
		return this;
	}
	jsuis.lf.Label.prototype.setIcon = function(icon, constraints) {
		if (icon) {
			var iconGraphics = this.getIconGraphics();
			if (!iconGraphics) {
				iconGraphics = new jsuis.lf.G();
				iconGraphics.setGraphics(iconGraphics);
				this.setIconGraphics(iconGraphics);
				this.add(iconGraphics, nvl(constraints, jsuis.Constraints.WEST.withFill(jsuis.Constants.NONE)));
				iconGraphics.setPreferredSize(new jsuis.Dimension(icon.getIconWidth(), icon.getIconHeight()));
				iconGraphics.setEnabled(false);
			}
			icon.paintIcon(iconGraphics);
		}
		this.icon = icon;
		return this;
	}
	jsuis.lf.Label.prototype.setIconTextGap = function(iconTextGap) {
		var layout = this.getLayout();
		layout.setHgap(iconTextGap).setVgap(iconTextGap);
		this.iconTextGap = iconTextGap;
		return this;
	}
	jsuis.lf.Label.prototype.setForeground = function(foreground) {
		var label = this.getLabel();
		if (label) {
			label.setForeground(foreground);
		}
		this.foreground = foreground;
		return this;
	}
	jsuis.lf.Label.prototype.setFont = function(font) {
		var label = this.getLabel();
		if (label) {
			label.setFont(font);
		}
		this.font = font;
		return this;
	}
	jsuis.lf.Label.prototype.setEnabled = function(enabled) {
		var label = this.getLabel();
		if (label) {
			label.setEnabled(enabled);
		}
		SUPER.prototype.setEnabled.call(this, enabled);
		return this;
	}
}) (jsuis);

/**
 * jsuis.lf.LayeredPane
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Panel;
	jsuis.lf.LayeredPane = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, null);
	});
	jsuis.lf.LayeredPane.prototype.add = function(component, constraints, index) {
		index = nvl(index, 0);
		var components = this.getComponents();
		if (components.length === 0) {
			SUPER.prototype.add.call(this, component, constraints);
			return;
		}
		var referenceConstraints;
		var i = 0;
		for (; i < components.length; i++) {
			var referenceComponent = components[i];
			referenceConstraints = nvl(referenceComponent.getConstraints(), new jsuis.Constraints());
			if (nvl(constraints, new jsuis.Constraints()).getLayer() <= referenceConstraints.getLayer()) {
				break;
			}
		}
		if (i === components.length) {
			SUPER.prototype.add.call(this, component, constraints);
			return;
		}
		if (nvl(constraints, new jsuis.Constraints()).getLayer() < referenceConstraints.getLayer()) {
			SUPER.prototype.add.call(this, component, constraints, i);
			return;
		}
		for (var j = i; j < components.length; j++) {
			var referenceComponent = components[j];
			referenceConstraints = nvl(referenceComponent.getConstraints(), new jsuis.Constraints());
			if (nvl(constraints, new jsuis.Constraints()).getLayer() !== referenceConstraints.getLayer()) {
				break;
			}
		}
		var n = j - i + 1;
		index = (index === -1 ? n - 1 : index);
		index = i + (n - 1 - index);
		SUPER.prototype.add.call(this, component, constraints, index);
	}
}) (jsuis);

/**
 * jsuis.lf.MenuBar
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Panel;
	jsuis.lf.MenuBar = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, new jsuis.FlowLayout(jsuis.Constants.LEFT, 0));
		this.setBackground(jsuis.Color.Black.withAlpha(.1 * 255));
	});
	jsuis.Object.addProperties(jsuis.lf.MenuBar, {
		selection: null
	});
	jsuis.lf.MenuBar.prototype.isSelected = function(menu) {
		var selection = this.getSelection();
		return (menu === selection);
	}
	jsuis.lf.MenuBar.prototype.setSelected = function(menu) {
		var selection = this.getSelection();
		if (selection) {
			selection.setSelected(false);
		}
		this.setSelection(menu);
		if (menu) {
			menu.setSelected(true);
		}
		return this;
	}
}) (jsuis);

/**
 * jsuis.lf.PopupMenu
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Panel;
	jsuis.lf.PopupMenu = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		this.setBorder(new jsuis.lf.LineBorder(jsuis.Color.Black.withAlpha(.4 * 255)));
		this.setBackground(jsuis.Color.Black.withAlpha(.1 * 255));
	});
	jsuis.lf.PopupMenu.prototype.add = function(component, constraints, index) {
		SUPER.prototype.add.call(this, component, nvl(constraints, jsuis.Constraints.NORTH), index);
	}
	jsuis.lf.PopupMenu.prototype.show = function(invoker, x, y) {
		var invokerX = 0;
		var invokerY = 0;
		var component = invoker;
		while (component && !(component instanceof jsuis.lf.Frame)) {
			invokerX += component.getX();
			invokerY += component.getY();
			component = component.getParent();
		}
		if (!component) {
			return;
		}
		var layeredPane = this.getParent();
		if (!layeredPane) {
			layeredPane = component.getLayeredPane();
			layeredPane.add(this, jsuis.Constraints.POPUP_LAYER);
		}
		this.setLocation(new jsuis.Point(invokerX + x, invokerY + y));
		this.setVisible(true);
	}
	jsuis.lf.PopupMenu.prototype.setVisible = function(visible) {
		SUPER.prototype.setVisible.call(this, visible);
		if (visible) {
			this.setSize(this.getPreferredSize());
			this.validate();
		}
		return this;
	}
}) (jsuis);

/**
 * jsuis.lf.PopupMenuSeparator
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Svg;
	jsuis.lf.PopupMenuSeparator = jsuis.Object.extend(SUPER, function(size) {
		SUPER.prototype.constructor.call(this, null);
		var line = new jsuis.lf.Line();
		this.setLine(line);
		this.add(line);
		this.setPreferredSize(nvl(size, new jsuis.Dimension(5, 5)));
	});
	jsuis.Object.addProperties(jsuis.lf.PopupMenuSeparator, {
		line: null
	});
	jsuis.lf.PopupMenuSeparator.prototype.doLayout = function() {
		var popupMenu = this.getParent();
		if (!popupMenu) {
			return;
		}
		var width = this.getWidth();
		var height = this.getHeight();
		var line = this.getLine();
		var y = height / 2;
		line.setX1(0).setY1(y).setX2(width).setY2(y);
	}
}) (jsuis);

/**
 * jsuis.lf.SplitPane
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Panel;
	jsuis.lf.SplitPane = jsuis.Object.extend(SUPER, function(orientation, leftComponent, rightComponent) {
		SUPER.prototype.constructor.call(this, null);
		orientation = nvl(orientation, jsuis.Constants.HORIZONTAL);
		this.setOrientation(orientation);
		this.setBackground(jsuis.Color.Black.withAlpha(0));
		this.setLeftComponent(leftComponent || new jsuis.lf.Button("Left"));
		this.setRightComponent(rightComponent || new jsuis.lf.Button("Right"));
		var splitPaneDivider = new jsuis.lf.SplitPaneDivider();
		this.setDivider(splitPaneDivider);
		this.add(splitPaneDivider);
		this.setDividerSize(8);
		this.setResizeWeight(0);
		
		var dividerMouseListener = new jsuis.MouseListener({
			mousePressed: function(event) {
				var splitPane = this.getListenerComponent();
				var point = event.getPoint();
				splitPane.setDividerPressedPoint(point);
			}
		});
		dividerMouseListener.setListenerComponent(this);
		splitPaneDivider.addMouseListener(dividerMouseListener);
		
		var dividerMouseMotionListener = new jsuis.MouseMotionListener({
			mouseDragged: function(event) {
				var splitPane = this.getListenerComponent();
				var point = event.getPoint();
				var pressedPoint = splitPane.getDividerPressedPoint();
				var divider = splitPane.getDivider();
				var orientation = splitPane.getOrientation();
				if (orientation === jsuis.Constants.HORIZONTAL) {
					var dx = point.getX() - pressedPoint.getX();
					var maximumX = splitPane.getWidth() - divider.getWidth();
					var x = Math.min(Math.max(divider.getX() + dx, 0), maximumX);
					splitPane.setDividerLocation(x);
					splitPane.validate();
				} else {
					var dy = point.getY() - pressedPoint.getY();
					var maximumY = splitPane.getHeight() - divider.getHeight();
					var y = Math.min(Math.max(divider.getY() + dy, 0), maximumY);
					splitPane.setDividerLocation(y);
					splitPane.validate();
				}
			}
		});
		dividerMouseMotionListener.setListenerComponent(this);
		splitPaneDivider.addMouseMotionListener(dividerMouseMotionListener);
		
		if (!("onpointerdown" in window)) {
			var dividerTouchListener = new jsuis.TouchListener({
				touchPressed: function(event) {
					dividerMouseListener.mousePressed(event);
					event.stopPropagation();
				},
				touchMoved: function(event) {
					dividerMouseMotionListener.mouseDragged(event);
					event.preventDefault();
					event.stopPropagation();
				}
			});
			splitPaneDivider.addTouchListener(dividerTouchListener);
			
			// TODO: check if the following lines are usefull or not
			var touchListener = new jsuis.TouchListener({
				touchPressed: function(event) {
					var splitPane = this.getListenerComponent();
					var point = event.getPoint();
					splitPane.setPressedPoint(point);
					event.stopPropagation();
				},
				touchMoved: function(event) {
					var splitPane = this.getListenerComponent();
					var point = event.getPoint();
					var pressedPoint = splitPane.getPressedPoint();
					var divider = splitPane.getDivider();
					var orientation = splitPane.getOrientation();
					if (orientation === jsuis.Constants.HORIZONTAL) {
						var dx = point.getX() - pressedPoint.getX();
						var maximumX = splitPane.getWidth() - divider.getWidth();
						var x = Math.min(Math.max(divider.getX() + dx, 0), maximumX);
						splitPane.setDividerLocation(x);
						splitPane.validate();
					} else {
						var dy = point.getY() - pressedPoint.getY();
						var maximumY = splitPane.getHeight() - divider.getHeight();
						var y = Math.min(Math.max(divider.getY() + dy, 0), maximumY);
						splitPane.setDividerLocation(y);
						splitPane.validate();
					}
					splitPane.setPressedPoint(point);
					event.preventDefault();
					event.stopPropagation();
				}
			});
			touchListener.setListenerComponent(this);
			this.addTouchListener(touchListener);
		}
	});
	jsuis.Object.addProperties(jsuis.lf.SplitPane, {
		orientation: null,
		leftComponent: null,
		rightComponent: null,
		divider: null,
		dividerLocation: null,
		dividerSize: null,
		dividerPressedPoint: null,
		resizeWeight: 0,
		pressedPoint: null
	});
	jsuis.lf.SplitPane.prototype.setLeftComponent = function(leftComponent) {
		var oldLeftComponent = this.getLeftComponent();
		if (oldLeftComponent) {
			this.remove(oldLeftComponent);
		}
		this.add(leftComponent);
		this.leftComponent = leftComponent;
		return this;
	}
	jsuis.lf.SplitPane.prototype.setRightComponent = function(rightComponent) {
		var oldRightComponent = this.getRightComponent();
		if (oldRightComponent) {
			this.remove(oldRightComponent);
		}
		this.add(rightComponent);
		this.rightComponent = rightComponent;
		return this;
	}
	jsuis.lf.SplitPane.prototype.getTopComponent = function() {
		return this.getLeftComponent();
	}
	jsuis.lf.SplitPane.prototype.setTopComponent = function(topComponent) {
		this.setLeftComponent(topComponent);
		return this;
	}
	jsuis.lf.SplitPane.prototype.getBottomComponent = function() {
		return this.getRightComponent();
	}
	jsuis.lf.SplitPane.prototype.setBottomComponent = function(bottomComponent) {
		this.setRightComponent(bottomComponent);
		return this;
	}
	jsuis.lf.SplitPane.prototype.setDividerLocation = function(dividerLocation) {
		this.dividerLocation = dividerLocation;
		return this;
	}
	// TODO SplitPaneLayout
	jsuis.lf.SplitPane.prototype.doLayout = function() {
		var x = 0;
		var y = 0;
		var width = this.getWidth();
		var height = this.getHeight();
		var insetsOutsets = this.getInsets().add(this.getOutsets());
		x += insetsOutsets.getLeft();
		y += insetsOutsets.getTop();
		width -= insetsOutsets.getLeft() + insetsOutsets.getRight();
		height -= insetsOutsets.getTop() + insetsOutsets.getBottom();
		var firstComponent = this.getLeftComponent();
		var firstComponentMinimumSize = firstComponent.getMinimumSize();
		var secondComponent = this.getRightComponent();
		var secondComponentMinimumSize = secondComponent.getMinimumSize();
		var divider = this.getDivider();
		var dividerLocation = this.getDividerLocation();
		var dividerSize = this.getDividerSize();
		var resizeWeight = Math.min(Math.max(this.getResizeWeight(), 0), 1);
		var orientation = this.getOrientation();
		if (orientation === jsuis.Constants.HORIZONTAL) {
			var firstComponentMinimumWidth = firstComponentMinimumSize.getWidth();
			var secondComponentMinimumWidth = secondComponentMinimumSize.getWidth();
			var minimum = x + firstComponentMinimumWidth;
			var maximum = x + width - secondComponentMinimumWidth - dividerSize;
			var firstComponentWidth = firstComponentMinimumWidth;
			if (dividerLocation !== null && dividerLocation !== undefined) {
				dividerLocation = Math.min(Math.max(dividerLocation, minimum), maximum);
				firstComponentWidth = dividerLocation - x;
			} else {
				var dwidth = width - firstComponentMinimumWidth - dividerSize - secondComponentMinimumWidth;
				firstComponentWidth = firstComponentMinimumWidth + dwidth * resizeWeight;
				this.setDividerLocation(x + firstComponentWidth);
			}
			firstComponent.setBounds(new jsuis.Rectangle(x, y, firstComponentWidth, height));
			divider.setBounds(new jsuis.Rectangle(x + firstComponentWidth, y, dividerSize, height));
			secondComponent.setBounds(new jsuis.Rectangle(x + firstComponentWidth + dividerSize, y, width - firstComponentWidth - dividerSize, height));
		} else {
			var firstComponentMinimumHeight = firstComponentMinimumSize.getHeight();
			var secondComponentMinimumHeight = secondComponentMinimumSize.getHeight();
			var minimum = y + firstComponentMinimumHeight;
			var maximum = y + height - secondComponentMinimumHeight - dividerSize;
			var firstComponentHeight = firstComponentMinimumHeight;
			if (dividerLocation !== null && dividerLocation !== undefined) {
				dividerLocation = Math.min(Math.max(dividerLocation, minimum), maximum);
				firstComponentHeight = dividerLocation - y;
			} else {
				var dheight = height - firstComponentMinimumHeight - dividerSize - secondComponentMinimumHeight;
				firstComponentHeight = firstComponentMinimumHeight + dheight * resizeWeight;
				this.setDividerLocation(y + firstComponentHeight);
			}
			firstComponent.setBounds(new jsuis.Rectangle(x, y, width, firstComponentHeight));
			divider.setBounds(new jsuis.Rectangle(x, y + firstComponentHeight, width, dividerSize));
			secondComponent.setBounds(new jsuis.Rectangle(x, y + firstComponentHeight + dividerSize, width, height - firstComponentHeight - dividerSize));
		}
	}
}) (jsuis);

/**
 * jsuis.lf.SplitPaneDivider
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Panel;
	jsuis.lf.SplitPaneDivider = jsuis.Object.extend(SUPER, function(direction) {
		SUPER.prototype.constructor.call(this, null);
		direction = nvl(direction, jsuis.Constants.HORIZONTAL);
		this.setDirection(direction);
		this.setBackground(jsuis.Color.Black.withAlpha(0));
		if (direction === jsuis.Constants.HORIZONTAL) {
			this.setCursor(jsuis.Cursor.E_RESIZE_CURSOR);
		} else {
			this.setCursor(jsuis.Cursor.S_RESIZE_CURSOR);
		}
	});
	jsuis.Object.addProperties(jsuis.lf.SplitPaneDivider, {
		direction: null
	});
}) (jsuis);

/**
 * jsuis.lf.TabbedPane
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Panel;
	jsuis.lf.TabbedPane = jsuis.Object.extend(SUPER, function(tabPlacement) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		tabPlacement = nvl(tabPlacement, jsuis.Constants.TOP);
		this.setTabPlacement(tabPlacement);
		var tabPanel = new jsuis.lf.TabPanel();
		this.setTabPanel(tabPanel);
		tabPanel.setPadding(new jsuis.Insets(0, 2));
		SUPER.prototype.add.call(this, tabPanel, new jsuis.BorderConstraints(tabPlacement));
		var cardPane = new jsuis.lf.LayeredPane();
		this.setCardPane(cardPane);
		SUPER.prototype.add.call(this, cardPane);
		cardPane.setLayout(new jsuis.BorderLayout());
		var actionListener = new jsuis.ActionListener({
			actionPerformed: function(event) {
				var tabbedPane = this.getListenerComponent();
				var tabComponent = event.getSource();
				tabbedPane.setSelected(tabComponent);
			}
		});
		actionListener.setListenerComponent(this);
		this.setActionListener(actionListener);
	});
	jsuis.Object.addProperties(jsuis.lf.TabbedPane, {
		tabPlacement: null,
		tabPanel: null,
		cardPane: null,
		selection: null,
		actionListener: null
	});
	jsuis.lf.TabbedPane.prototype.addTab = function(tabComponent, cardComponent) {
		var tabPanel = this.getTabPanel();
		tabPanel.add(tabComponent);
		var cardPane = this.getCardPane();
		cardPane.add(cardComponent);
		cardComponent.setVisible(false);
		var actionListener = this.getActionListener();
		tabComponent.removeActionListener(actionListener);
		tabComponent.addActionListener(actionListener);
	}
	jsuis.lf.TabbedPane.prototype.getTabCount = function() {
		var tabPanel = this.getTabPanel();
		return tabPanel.getComponents().length;
	}
	jsuis.lf.TabbedPane.prototype.getTabComponentAt = function(index) {
		var tabPanel = this.getTabPanel();
		var tabComponents = tabPanel.getComponents();
		if (tabComponents) {
			return tabComponents[index];
		}
	}
	jsuis.lf.TabbedPane.prototype.setSelected = function(tabComponent) {
		var tabPanel = this.getTabPanel();
		var tabComponents = tabPanel.getComponents();
		var cardPane = this.getCardPane();
		var cardComponents = cardPane.getComponents();
		var oldSelection = this.getSelection();
		if (oldSelection) {
			oldSelection.setSelected(false);
			var index = tabComponents.indexOf(oldSelection);
			var cardComponent = cardComponents[index];
			cardComponent.setVisible(false);
		}
		this.setSelection(tabComponent);
		if (tabComponent) {
			tabComponent.setSelected(true);
			var index = tabComponents.indexOf(tabComponent);
			var cardComponent = cardComponents[index];
			// TODO setVisible -> validate
			cardComponent.setVisible(true);
			cardComponent.validate();
		}
		return this;
	}
	// TODO: CardLayout and BorderLayout
	jsuis.lf.TabbedPane.prototype.validate = function() {
		SUPER.prototype.validate.call(this);
		var selection = this.getSelection();
		if (!selection) {
			var tabPanel = this.getTabPanel();
			var components = tabPanel.getComponents();
			if (components.length) {
				this.setSelected(components[0]);
			}
		}
	}
}) (jsuis);

/**
 * jsuis.lf.Table
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Svg;
	jsuis.lf.Table = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, new jsuis.GridBagLayout());
		this.setFont(new jsuis.Font("Arial", "normal", 12));
		this.setRowHeight(16);
		this.setColumnWidth(64);
		var tableView = new jsuis.lf.TableView(this);
		this.setTableView(tableView);
		this.add(tableView, new jsuis.GridBagConstraints()
			.setGridx(1).setGridy(1).setWeightx(1).setWeighty(1)
			.setFill(jsuis.Constants.BOTH));
		var tableHeaderView = new jsuis.lf.TableHeaderView(this);
		this.setTableHeaderView(tableHeaderView);
		this.add(tableHeaderView, new jsuis.GridBagConstraints()
			.setGridx(1).setGridy(0).setWeightx(1)
			.setFill(jsuis.Constants.HORIZONTAL));
	});
	jsuis.Object.addProperties(jsuis.lf.Table, {
		tableView: null,
		tableHeaderView: null,
		columns: null,
		values: null,
		rowCount: 0,
		columnCount: 0,
		rowHeight: 0,
		columnWidth: 0
	});
	jsuis.lf.Table.prototype.setColumns = function(columns) {
		this.columns = columns;
		this.setColumnCount(columns.length);
	}
	jsuis.lf.Table.prototype.setValues = function(values) {
		this.values = values;
		var rowCount = this.getRowCount();
		this.setRowCount(Math.max(rowCount, values.length));
		return this;
	}
	jsuis.lf.Table.prototype.getRowCount = function() {
		return nvl(this.rowCount, 0);
	}
	jsuis.lf.Table.prototype.getColumnCount = function() {
		return nvl(this.columnCount, 0);
	}
	jsuis.lf.Table.prototype.getRowHeight = function() {
		return nvl(this.rowHeight, 0);
	}
	jsuis.lf.Table.prototype.getColumnWidth = function() {
		return nvl(this.columnWidth, 0);
	}
}) (jsuis);

/**
 * jsuis.lf.TableCell
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Graphics;
	jsuis.lf.TableCell = jsuis.Object.extend(SUPER, function(text) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		var label = new jsuis.lf.Text(text);
		this.setLabel(label);
		this.add(label, new jsuis.BorderConstraints().setFill(jsuis.Constants.HORIZONTAL));
		this.setPadding(new jsuis.Insets(2, 4));
		this.setBackground(jsuis.Color.Black.withAlpha(0));
		this.setFont(new jsuis.Font("Arial", "normal", 12));
		var mouseListener = new jsuis.MouseListener({
			mouseReleased: function(event) {
				var tableCell = this.getListenerComponent();
				var tableCellEditor = jsuis.lf.TableCellEditor.getInstance();
				tableCell.setEditor(tableCellEditor);
				tableCellEditor.requestFocus();
			}
		});
		mouseListener.setListenerComponent(this);
		this.addMouseListener(mouseListener);
	});
	jsuis.Object.addProperties(jsuis.lf.TableCell, {
		editor: null,
		label: null
	});
	jsuis.lf.TableCell.prototype.setEditor = function(editor) {
		if (editor) {
			editor.install(this);
		}
		this.editor = editor;
		return this;
	}
	jsuis.lf.TableCell.prototype.getText = function() {
		var label = this.getLabel();
		return label.getText();
	}
	jsuis.lf.TableCell.prototype.setText = function(text) {
		var label = this.getLabel();
		return label.setText(text);
	}
	jsuis.lf.TableCell.prototype.getFont = function() {
		var label = this.getLabel();
		return label.getFont();
	}
	jsuis.lf.TableCell.prototype.setFont = function(font) {
		var label = this.getLabel();
		label.setFont(font);
		return this;
	}
}) (jsuis);

/**
 * jsuis.lf.TableHeaderView
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Svg;
	jsuis.lf.TableHeaderView = jsuis.Object.extend(SUPER, function(table) {
		SUPER.prototype.constructor.call(this, null);
		this.setTable(table);
		this.setBorder(new jsuis.lf.TableHeaderViewBorder());
		this.setX(0);
		this.setY(0);
	});
	jsuis.Object.addProperties(jsuis.lf.TableHeaderView, {
		table: null,
		x: 0,
		y: 0
	});
	jsuis.lf.TableHeaderView.prototype.getPreferredSize = function() {
		var table = this.getTable();
		var rowHeight = table.getRowHeight();
		var columnWidth = table.getColumnWidth();
		var columnCount = table.getColumnCount();
		return new jsuis.Dimension(columnCount * columnWidth, rowHeight);
	}
	jsuis.lf.TableHeaderView.prototype.getViewportSize = function() {
		var parent = this.getParent();
		if (parent instanceof jsuis.lf.Viewport) {
			return parent.getPeer().getSize();
		}
		return this.getSize();
	}
}) (jsuis);

/**
 * jsuis.lf.TableView
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Svg;
	jsuis.lf.TableView = jsuis.Object.extend(SUPER, function(table) {
		SUPER.prototype.constructor.call(this, null);
		this.setTable(table);
		this.setBorder(new jsuis.lf.TableViewBorder());
		this.setX(0);
		this.setY(0);
	});
	jsuis.Object.addProperties(jsuis.lf.TableView, {
		table: null,
		x: 0,
		y: 0
	});
	jsuis.lf.TableView.prototype.getPreferredSize = function() {
		var table = this.getTable();
		var rowHeight = table.getRowHeight();
		var rowCount = table.getRowCount();
		var columnWidth = table.getColumnWidth();
		var columnCount = table.getColumnCount();
		return new jsuis.Dimension(columnCount * columnWidth, rowCount * rowHeight);
	}
	jsuis.lf.TableView.prototype.getViewportSize = function() {
		var parent = this.getParent();
		if (parent instanceof jsuis.lf.Viewport) {
			return parent.getPeer().getSize();
		}
		return this.getSize();
	}
}) (jsuis);

/**
 * jsuis.lf.TabPanel
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Panel;
	jsuis.lf.TabPanel = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, new jsuis.FlowLayout(jsuis.Constants.LEFT, 0));
		// this.setBorder(new jsuis.lf.TabPanelBorder());
	});
}) (jsuis);

/**
 * jsuis.lf.TextField
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Svg;
	jsuis.lf.TextField = jsuis.Object.extend(SUPER, function(text) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		var label = new jsuis.lf.Text(text);
		this.setLabel(label);
		this.add(label, new jsuis.BorderConstraints().setFill(jsuis.Constants.HORIZONTAL));
		this.setPadding(new jsuis.Insets(2, 4));
		this.setBackground(jsuis.Color.Black.withAlpha(0));
		this.setFont(new jsuis.Font("Arial", "normal", 12));
		var mouseListener = new jsuis.MouseListener({
			mouseReleased: function(event) {
				var textField = this.getListenerComponent();
				var textFieldEditor = jsuis.lf.TextFieldEditor.getInstance();
				textField.setEditor(textFieldEditor);
				textFieldEditor.requestFocus();
			}
		});
		mouseListener.setListenerComponent(this);
		this.addMouseListener(mouseListener);
	});
	jsuis.Object.addProperties(jsuis.lf.TextField, {
		editor: null,
		label: null
	});
	jsuis.lf.TextField.prototype.setEditor = function(editor) {
		if (editor) {
			editor.install(this);
		}
		this.editor = editor;
		return this;
	}
	jsuis.lf.TextField.prototype.getText = function() {
		var label = this.getLabel();
		return label.getText();
	}
	jsuis.lf.TextField.prototype.setText = function(text) {
		var label = this.getLabel();
		return label.setText(text);
	}
	jsuis.lf.TextField.prototype.getFont = function() {
		var label = this.getLabel();
		return label.getFont();
	}
	jsuis.lf.TextField.prototype.setFont = function(font) {
		var label = this.getLabel();
		label.setFont(font);
		return this;
	}
}) (jsuis);

/**
 * jsuis.lf.ToolBar
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Panel;
	jsuis.lf.ToolBar = jsuis.Object.extend(SUPER, function(orientation) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout(2));
		this.setOrientation(nvl(orientation, jsuis.Constants.HORIZONTAL));
		this.setPadding(new jsuis.Insets(2));
		this.setBackground(jsuis.Color.Black.withAlpha(.1 * 255));
	});
	jsuis.Object.addProperties(jsuis.lf.ToolBar, {
		orientation: null
	});
	jsuis.lf.ToolBar.prototype.add = function(component, constraints, index) {
		var orientation = this.getOrientation();
		switch (orientation) {
		case jsuis.Constants.VERTICAL:
			SUPER.prototype.add.call(this, component, nvl(constraints, jsuis.Constraints.NORTH), index);
			break;
		case jsuis.Constants.HORIZONTAL:
		default:
			SUPER.prototype.add.call(this, component, nvl(constraints, jsuis.Constraints.WEST), index);
		}
	}
	jsuis.lf.ToolBar.prototype.addSeparator = function(size) {
		this.add(new jsuis.lf.TollBarSeparator(size));
	}
}) (jsuis);

/**
 * jsuis.lf.ToolBarSeparator
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Svg;
	jsuis.lf.ToolBarSeparator = jsuis.Object.extend(SUPER, function(size) {
		SUPER.prototype.constructor.call(this, null);
		var line = new jsuis.lf.Line();
		this.setLine(line);
		this.add(line);
		this.setPreferredSize(nvl(size, new jsuis.Dimension(5, 5)));
	});
	jsuis.Object.addProperties(jsuis.lf.ToolBarSeparator, {
		line: null
	});
	jsuis.lf.ToolBarSeparator.prototype.validate = function() {
		var toolBar = this.getParent();
		if (!toolBar) {
			return;
		}
		var width = this.getWidth();
		var height = this.getWidth();
		var line = this.getLine();
		var toolBarOrientation = toolBar.getOrientantion();
		if (toolBarOrientation === jsuis.Constants.VERTICAL) {
			var y = height / 2 - line.getThickness() / 2;
			line.setX1(0).setY1(y).setX2(width).setY2(y);
		} else {
			var x = width / 2 - line.getThickness() / 2;
			line.setX1(x).setY1(0).setX2(x).setY2(height);
		}
	}
}) (jsuis);

/**
 * jsuis.lf.Tree
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Graphics;
	jsuis.lf.Tree = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, null);
		this.setBackground(jsuis.Color.Black.withAlpha(.1 * 255));
		this.setCellRenderer(new jsuis.lf.TreeCellRenderer());
	});
	jsuis.Object.addProperties(jsuis.lf.Tree, {
		model: null,
		cellRenderer: null,
		selection: null
	});
	jsuis.lf.Tree.prototype.getRoot = function() {
		var model = this.getModel();
		return model.getRoot();
	}
	jsuis.lf.Tree.prototype.setRoot = function(root) {
		var model = this.getModel();
		model.setRoot(root);
		return this;
	}
	jsuis.lf.Tree.prototype.getRows = function(node, rows) {
		var root = this.getRoot();
		if (!node) {
			node = root;
		}
		if (node === root) {
			rows = [];
		}
		rows.push(node);
		if (node.isExpanded()) {
			var children = node.getChildren();
			if (children) {
				for (var i = 0; i < children.length; i++) {
					var child = children[i];
					this.getRows(child, rows);
				}
			}
		}
		return rows;
	}
	jsuis.lf.Tree.prototype.getRowHeight = function() {
		var cellRenderer = this.getCellRenderer();
		return cellRenderer.getRowHeight();
	}
	jsuis.lf.Tree.prototype.setRowHeight = function(rowHeight) {
		var cellRenderer = this.getCellRenderer();
		cellRenderer.setRowHeight(rowHeight);
		return this;
	}
	jsuis.lf.Tree.prototype.validate = function() {
		var x = 0;
		var y = 0;
		var cellRenderer = this.getCellRenderer();
		var model = this.getModel();
		var rows = this.getRows();
		for (var i = 0; i < rows.length; i++) {
			var node = rows[i];
			/*
			var component = treeCellRenderer.getTreeCellRendererComponent(this, node.getUserObject(),
					node.isSelected(), node.isExpanded(), node.isLeaf(), i, node.hasFocus());
			*/
			var component = cellRenderer.getTreeCellRendererComponent(this, node.getUserObject(),
					false, node.isExpanded(), node.isLeaf(), i, false);
			this.add(component);
			var preferredSize = component.getPreferredSize();
			node.setSize(preferredSize);
			var parent = node.getParent();
			if (parent) {
				var parentLocation = parent.getLocation();
				if (parentLocation) {
					x = parentLocation.getX();
				}
				x += 16;
			}
			var location = new jsuis.Point(x, y);
			node.setLocation(location);
			var preferredHeight = preferredSize.getHeight();
			y += preferredHeight;
			component.setSize(node.getSize());
			component.setLocation(location);
		}
		SUPER.prototype.validate.call(this);
	}
	
	jsuis.lf.Tree.prototype.isSelected = function(node) {
		var selection = this.getSelection();
		return (node === selection);
	}
	jsuis.lf.Tree.prototype.setSelected = function(node) {
		var selection = this.getSelection();
		if (selection) {
			selection.setSelected(false);
		}
		this.setSelection(node);
		if (node) {
			node.setSelected(true);
		}
		return this;
	}
	jsuis.lf.Tree.prototype.expandNode = function(node) {
		node.setExpanded(true);
	}
	jsuis.lf.Tree.prototype.expandAll = function(node) {
		var root = this.getRoot();
		if (!node) {
			node = root;
		}
		this.expandNode(node);
		var childCount = node.getChildCount();
		for (var i = 0; i < childCount; i++) {
			var child = node.getChildAt(i);
			this.expandAll(child);
		}
	}
}) (jsuis);

/**
 * jsuis.lf.Viewport
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Panel;
	jsuis.lf.Viewport = jsuis.Object.extend(SUPER, function(view, viewBox) {
		SUPER.prototype.constructor.call(this, null);
		if ((view !== null) && (view !== undefined)) {
			this.setView(view);
		}
		if ((viewBox !== null) && (viewBox !== undefined)) {
			this.setViewBox(viewBox);
		}
		this.setStyleProperty("overflow", "auto");
		this.setAdjustmentListeners([]);
	});
	jsuis.Object.addProperties(jsuis.lf.Viewport, {
		view: null,
		viewPosition: null,
		adjustmentListeners: null
	});
	jsuis.lf.Viewport.prototype.setView = function(view) {
		this.removeAll();
		this.add(view);
		this.view = view;
		return this;
	}
	jsuis.lf.Viewport.prototype.setSize = function(size) {
		SUPER.prototype.setSize.call(this, size);
		var view = this.getView();
		if (view) {
			view.paint();
		}
		return this;
	}
	jsuis.lf.Viewport.prototype.getViewBox = function() {
		return this.viewBox || new jsuis.Rectangle();
	}
	jsuis.lf.Viewport.prototype.setViewBox = function(viewBox) {
		this.viewBox = viewBox;
		this.setAttribute("viewBox", viewBox.getX() + " " + viewBox.getY() + " " + viewBox.getWidth() + " " + viewBox.getHeight());
		return this;
	}
	jsuis.lf.Viewport.prototype.addAdjustmentListener = function(adjustmentListener) {
		var adjustmentListeners = this.getAdjustmentListeners();
		adjustmentListeners.push(adjustmentListener);
		var component = this;
		var listener = adjustmentListener.getListener();
		if (listener.adjustmentValueChanged) {
			var onscroll = this.getEventListener("scroll");
			if (!onscroll) {
				this.setEventListener("scroll", function(event) {
					component.fireAdjustmentValueChanged(event);
				});
			}
		}
	}
	jsuis.lf.Viewport.prototype.removeAdjustmentListener = function(adjustmentListener) {
		var adjustmentListeners = this.getAdjustmentListeners();
		var index = adjustmentListeners.indexOf(adjustmentListener);
		if (index !== -1) {
			adjustmentListeners.splice(index, 1);
		}
	}
	jsuis.lf.Viewport.prototype.fireAdjustmentValueChanged = function(domEvent) {
		var adjustmentEvent = new jsuis.lf.AdjustmentEvent(domEvent).setSource(this);
		var adjustmentListeners = this.getAdjustmentListeners();
		for (var i = 0; i < adjustmentListeners.length; i++) {
			var adjustmentListener = adjustmentListeners[i];
			adjustmentListener.adjustmentValueChanged(adjustmentEvent);
		}
	}
}) (jsuis);

/**
 * jsuis.ActionEvent
 */
(function(jsuis) {
	var SUPER = jsuis.InputEvent;
	jsuis.ActionEvent = jsuis.Object.extend(SUPER, function(event) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ActionEvent(event));
	});
	jsuis.Object.addPeerProperties(jsuis.ActionEvent, {
		actionCommand: null
	});
}) (jsuis);

/**
 * jsuis.AdjustmentEvent
 */
(function(jsuis) {
	var SUPER = jsuis.InputEvent;
	jsuis.AdjustmentEvent = jsuis.Object.extend(SUPER, function(event) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].AdjustmentEvent(event));
	});
}) (jsuis);

/**
 * jsuis.CheckBox
 */
(function(jsuis) {
	var SUPER = jsuis.ToggleButton;
	jsuis.CheckBox = jsuis.Object.extend(SUPER, function(text, icon, selected) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].CheckBox(text, icon, selected));
	});
	jsuis.CheckBox.prototype.isSelected = function() {
		var peer = this.getPeer();
		return peer.isSelected();
	}
	jsuis.CheckBox.prototype.setSelected = function(selected) {
		var peer = this.getPeer();
		peer.setSelected(selected);
		return this;
	}
}) (jsuis);

/**
 * jsuis.FocusEvent
 */
(function(jsuis) {
	var SUPER = jsuis.InputEvent;
	jsuis.FocusEvent = jsuis.Object.extend(SUPER, function(event) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].FocusEvent(event));
	});
	jsuis.Object.addPeerProperties(jsuis.FocusEvent, {
		opposite: null
	});
}) (jsuis);

/**
 * jsuis.Menu
 */
(function(jsuis) {
	var SUPER = jsuis.MenuItem;
	jsuis.Menu = jsuis.Object.extend(SUPER, function(layout, target) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Menu(layout, target));
	});
	jsuis.Menu.prototype.addSeparator = function() {
		var peer = this.getPeer();
		peer.addSeparator();
	}
}) (jsuis);

/**
 * jsuis.MouseEvent
 */
(function(jsuis) {
	var SUPER = jsuis.InputEvent;
	jsuis.MouseEvent = jsuis.Object.extend(SUPER, function(event) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].MouseEvent(event));
	});
	jsuis.Object.addPeerProperties(jsuis.MouseEvent, {
		x: 0,
		y: 0,
		xAbs: 0,
		yAbs: 0,
		clickCount: 0,
		popupTrigger: null,
		button: null
	});
}) (jsuis);

/**
 * jsuis.TouchEvent
 */
(function(jsuis) {
	var SUPER = jsuis.InputEvent;
	jsuis.TouchEvent = jsuis.Object.extend(SUPER, function(event) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].TouchEvent(event));
	});
	jsuis.Object.addPeerProperties(jsuis.TouchEvent, {
		touches: null,
		x: 0,
		y: 0
	});
}) (jsuis);

/**
 * jsuis.lf.AbstractButton
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Label;
	jsuis.lf.AbstractButton = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, text, icon);
		this.setBackground(jsuis.Color.Black.withAlpha(0));
		
		var mouseListener = new jsuis.MouseListener({
			mouseClicked: function(event) {
				var button = this.getListenerComponent();
				button.mouseClicked();
			},
			mousePressed: function(event) {
				var button = this.getListenerComponent();
				button.mousePressed();
			},
			mouseReleased: function(event) {
				var button = this.getListenerComponent();
				button.mouseReleased();
			},
			mouseEntered: function(event) {
				var button = this.getListenerComponent();
				button.setRollover(true);
				button.mouseEntered();
			},
			mouseExited: function(event) {
				var button = this.getListenerComponent();
				button.setRollover(false);
				button.mouseExited();
			}
		});
		mouseListener.setListenerComponent(this);
		this.addMouseListener(mouseListener);
	});
	jsuis.Object.addProperties(jsuis.lf.AbstractButton, {
		rollover: false,
		selected: false
	});
	jsuis.lf.AbstractButton.prototype.mouseClicked = function() {
	}
	jsuis.lf.AbstractButton.prototype.mousePressed = function() {
	}
	jsuis.lf.AbstractButton.prototype.mouseReleased = function() {
	}
	jsuis.lf.AbstractButton.prototype.mouseEntered = function() {
	}
	jsuis.lf.AbstractButton.prototype.mouseExited = function() {
	}
}) (jsuis);

/**
 * jsuis.lf.ActionEvent
 */
(function(jsuis) {
	var SUPER = jsuis.lf.InputEvent;
	jsuis.lf.ActionEvent = jsuis.Object.extend(SUPER, function(event) {
		SUPER.prototype.constructor.call(this, event);
	});
	jsuis.Object.addProperties(jsuis.lf.ActionEvent, {
		actionCommand: null
	});
}) (jsuis);

/**
 * jsuis.lf.MouseEvent
 */
(function(jsuis) {
	var SUPER = jsuis.lf.InputEvent;
	jsuis.lf.MouseEvent = jsuis.Object.extend(SUPER, function(event) {
		SUPER.prototype.constructor.call(this, event);
	});
	jsuis.Object.addProperties(jsuis.lf.MouseEvent, {
		x: 0,
		y: 0,
		xAbs: 0,
		yAbs: 0,
		clickCount: 0,
		popupTrigger: null,
		button: null
	});
	jsuis.lf.MouseEvent.prototype.getPoint = function() {
		var x = this.x;
		var y = this.y;
		if (x !== null && x !== undefined && y !== null && y !== undefined) {
			return new jsuis.Point(x, y);
		}
		var domEvent = this.getElement();
		var source = this.getSource();
		var boundingClientRect = source.getElement().getBoundingClientRect();
		var outsets = source.getOutsets();
		x = nvl(x, domEvent.clientX - boundingClientRect.left + outsets.getLeft());
		y = nvl(y, domEvent.clientY - boundingClientRect.top + outsets.getTop());
		this.setX(x).setY(y);
		return new jsuis.Point(x, y);
	}
	jsuis.lf.MouseEvent.prototype.getX = function() {
		var point = this.getPoint();
		return point.getX();
	}
	jsuis.lf.MouseEvent.prototype.getY = function() {
		var point = this.getPoint();
		return point.getY();
	}
	jsuis.lf.MouseEvent.prototype.getLocationOnScreen = function() {
		var xAbs = this.xAbs;
		var yAbs = this.yAbs;
		if (xAbs !== null && xAbs !== undefined && yAbs !== null && yAbs !== undefined) {
			return new jsuis.Point(xAbs, yAbs);
		}
		var domEvent = this.getElement();
		xAbs = nvl(xAbs, domEvent.screenX);
		yAbs = nvl(yAbs, domEvent.screenY);
		this.setXAbs(xAbs).setYAbs(yAbs);
		return new jsuis.Point(xAbs, yAbs);
	}
	jsuis.lf.MouseEvent.prototype.getXOnScreen = function() {
		var locationOnScreen = this.getLocationOnScreen();
		return locationOnScreen.getX();
	}
	jsuis.lf.MouseEvent.prototype.getYOnScreen = function() {
		var locationOnScreen = this.getLocationOnScreen();
		return locationOnScreen.getY();
	}
	jsuis.lf.MouseEvent.prototype.getClickCount = function() {
		var clickCount = this.clickCount;
		if (clickCount !== null && clickCount !== undefined) {
			return clickCount;
		}
		var domEvent = this.getElement();
		clickCount = domEvent.detail;
		this.setClickCount(clickCount);
		return clickCount;
	}
	jsuis.lf.MouseEvent.prototype.getPopupTrigger = function() {
		var popupTrigger = this.popupTrigger;
		if (popupTrigger !== null && popupTrigger !== undefined) {
			return popupTrigger;
		}
		var button = this.getButton();
		popupTrigger = (button === 3);
		this.setPopupTrigger(popupTrigger);
		return popupTrigger;
	}
	jsuis.lf.MouseEvent.prototype.getButton = function() {
		var button = this.button;
		if (button !== null && button !== undefined) {
			return button;
		}
		var domEvent = this.getElement();
		button = domEvent.button + 1;
		this.setButton(button);
		return button;
	}
}) (jsuis);

/**
 * jsuis.lf.RootPane
 */
(function(jsuis) {
	var SUPER = jsuis.lf.LayeredPane;
	jsuis.lf.RootPane = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
		var layeredPane = new jsuis.lf.LayeredPane();
		this.setLayeredPane(layeredPane);
		this.add(layeredPane);
	});
	jsuis.Object.addProperties(jsuis.lf.RootPane, {
		layeredPane: null,
		menuBar: null,
		contentPane: null
	});
	jsuis.lf.RootPane.prototype.setMenuBar = function(menuBar) {
		var layeredPane = this.getLayeredPane();
		var oldMenuBar = this.getMenuBar();
		if (oldMenuBar) {
			layeredPane.remove(oldMenuBar);
		}
		layeredPane.add(menuBar, jsuis.Constraints.FRAME_CONTENT_LAYER);
		this.menuBar = menuBar;
		return this;
	}
	jsuis.lf.RootPane.prototype.setContentPane = function(contentPane) {
		var layeredPane = this.getLayeredPane();
		var oldContentPane = this.getContentPane();
		if (oldContentPane) {
			layeredPane.remove(oldContentPane);
		}
		layeredPane.add(contentPane, jsuis.Constraints.FRAME_CONTENT_LAYER);
		this.contentPane = contentPane;
		return this;
	}
	// TODO RootPaneLayout
	jsuis.lf.RootPane.prototype.doLayout = function() {
		var size = this.getSize();
		var insetsOutsets = this.getInsets().add(this.getOutsets());
		size = size.subtract(insetsOutsets.getDimension());
		var layerePane = this.getLayeredPane();
		layerePane.setSize(size);
		var menuBar = this.getMenuBar();
		var contentPane = this.getContentPane();
		var x = insetsOutsets.getLeft();
		var y = insetsOutsets.getTop();
		var width = size.getWidth();
		var height = size.getHeight();
		if (menuBar) {
			var menuBarPreferredSize = menuBar.getPreferredSize();
			var menuBarPreferredHeight = menuBarPreferredSize.getHeight();
			menuBar.setBounds(new jsuis.Rectangle(x, y, width, menuBarPreferredHeight));
			y += menuBarPreferredHeight;
			height -= menuBarPreferredHeight;
		}
		if (contentPane) {
			contentPane.setBounds(new jsuis.Rectangle(x, y, width, height));
		}
	}
}) (jsuis);

/**
 * jsuis.lf.ScrollPane
 */
(function(jsuis) {
	var SUPER = jsuis.lf.LayeredPane;
	jsuis.lf.ScrollPane = jsuis.Object.extend(SUPER, function(view, vsbPolicy, hsbPolicy) {
		SUPER.prototype.constructor.call(this);
		this.setLayout(new jsuis.BorderLayout());
		
		var contentPane = new jsuis.lf.Panel(new jsuis.GridBagLayout());
		this.setContentPane(contentPane);
		this.add(contentPane);
		
		var viewport = new jsuis.lf.Viewport();
		this.setViewport(viewport);
		contentPane.add(viewport, new jsuis.GridBagConstraints()
			.setGridx(1).setGridy(1).setWeightx(1).setWeighty(1)
			.setFill(jsuis.Constants.BOTH));
		
		if (view) {
			if (view instanceof jsuis.Table || view instanceof jsuis.lf.Table) {
				var table = view.getPeer();
				var tableView = table.getTableView();
				var tableHeaderView = table.getTableHeaderView();
				this.setViewportView(tableView);
				var viewport = this.getViewport();
				var adjustmentListener = new jsuis.lf.AdjustmentListener({
					adjustmentValueChanged: function(event) {
						var scrollPane = this.getListenerComponent();
						var viewport = scrollPane.getViewport();
						var tableView = viewport.getView();
						var scrollLeft = viewport.getProperty("scrollLeft");
						var scrollTop = viewport.getProperty("scrollTop");
						tableView.setX(-scrollLeft);
						tableView.setY(-scrollTop);
						
						// TODO: LayoutManager
						
						var clientWidth = viewport.getProperty("clientWidth");
						var columnHeaderViewport = scrollPane.getColumnHeaderViewport();
						var columnHeaderViewportSize = columnHeaderViewport.getSize();
						if (columnHeaderViewportSize.getWidth() !== clientWidth) {
							columnHeaderViewport.setSize(new jsuis.Dimension(clientWidth, columnHeaderViewport.getHeight()));
						}
						
						columnHeaderViewport.setProperty("scrollLeft", scrollLeft);
						var tableHeaderView = columnHeaderViewport.getView();
						tableHeaderView.setX(-scrollLeft);
						tableHeaderView.paint();
						tableView.paint();
					}
				});
				adjustmentListener.setListenerComponent(this);
				viewport.addAdjustmentListener(adjustmentListener);
				this.setColumnHeaderView(tableHeaderView);
			} else {
				this.setViewportView(view);
			}
		}
		vsbPolicy = nvl(vsbPolicy, jsuis.Constants.VERTICAL_SCROLLBAR_AS_NEEDED);
		this.setVsbPolicy(vsbPolicy);
		hsbPolicy = nvl(hsbPolicy, jsuis.Constants.HORIZONTAL_SCROLLBAR_AS_NEEDED);
		this.setHsbPolicy(hsbPolicy);
	});
	jsuis.Object.addProperties(jsuis.lf.ScrollPane, {
		vsbPolicy: null,
		hsbPolicy: null,
		contentPane: null,
		viewport: null,
		columnHeaderViewport: null,
		rowHeaderViewport: null,
		scrollBarPanel: null,
		verticalScrollBar: null,
		horizontalScrollBar: null,
		scrollThumbPressedPoint: null
	});
	jsuis.lf.ScrollPane.prototype.getViewportView = function() {
		var viewport = this.getViewport();
		return viewport.getView();
	}
	jsuis.lf.ScrollPane.prototype.setViewportView = function(view) {
		var viewport = this.getViewport();
		viewport.setView(view);
		return this;
	}
	jsuis.lf.ScrollPane.prototype.getColumnHeaderView = function() {
		var columnHeaderViewport = this.getColumnHeaderViewport();
		if (columnHeaderViewport) {
			return columnHeaderViewport.getView();
		}
	}
	jsuis.lf.ScrollPane.prototype.setColumnHeaderView = function(columnHeaderView) {
		var contentPane = this.getContentPane();
		var columnHeaderViewport = this.getColumnHeaderViewport();
		if (!columnHeaderViewport) {
			columnHeaderViewport = new jsuis.lf.Viewport();
			this.setColumnHeaderViewport(columnHeaderViewport);
			columnHeaderViewport.setStyleProperty("overflow", "hidden");
			contentPane.add(columnHeaderViewport, new jsuis.GridBagConstraints()
				.setGridx(1).setGridy(0).setWeightx(1)
				.setFill(jsuis.Constants.HORIZONTAL));
			columnHeaderViewport.setPreferredSize(new jsuis.Dimension(0, columnHeaderView.getPreferredSize().getHeight()));
		}
		columnHeaderViewport.setView(columnHeaderView);
		return this;
	}
	jsuis.lf.ScrollPane.prototype.getRowHeaderView = function() {
		var columnHeaderViewport = this.getRowHeaderViewport();
		if (columnHeaderViewport) {
			return columnHeaderViewport.getView();
		}
	}
	jsuis.lf.ScrollPane.prototype.setRowHeaderView = function(rowHeaderView) {
		var contentPane = this.getContentPane();
		var rowHeaderViewport = this.getRowHeaderViewport();
		if (!rowHeaderViewport) {
			rowHeaderViewport = new jsuis.lf.Viewport();
			this.setRowHeaderViewport(rowHeaderViewport);
			rowHeaderViewport.setStyleProperty("overflow", "auto");
			contentPane.add(rowHeaderViewport, new jsuis.GridBagConstraints()
				.setGridx(0).setGridy(1).setWeighty(1)
				.setFill(jsuis.Constants.VERTICAL));
			rowHeaderView.setPreferredSize(new jsuis.Dimension(rowHeaderView.getPreferredSize().getWidth(), 0));
		}
		rowHeaderViewport.setView(rowHeaderView);
		return this;
	}
	// TODO ScrollPaneLayout
	jsuis.lf.ScrollPane.prototype.doLayout = function() {
		var view = this.getViewportView();
		if (view) {
			view.setSize(this.getSize());
			var viewPreferredSize = view.getPreferredSize();
			view.setSize(viewPreferredSize);
			var columnHeaderView = this.getColumnHeaderView();
			if (columnHeaderView) {
				columnHeaderView.setSize(new jsuis.Dimension(view.getWidth(), columnHeaderView.getPreferredSize().getHeight()));
			}
		}
		SUPER.prototype.doLayout.call(this);
	}
	jsuis.lf.ScrollPane.prototype.getMinimumSize = function() {
		return new jsuis.Dimension(0, 0);
	}
}) (jsuis);

/**
 * jsuis.lf.TouchEvent
 */
(function(jsuis) {
	var SUPER = jsuis.lf.InputEvent;
	jsuis.lf.TouchEvent = jsuis.Object.extend(SUPER, function(event) {
		SUPER.prototype.constructor.call(this, event);
	});
	jsuis.Object.addProperties(jsuis.lf.TouchEvent, {
		touches: null,
		x: 0,
		y: 0
	});
	jsuis.lf.TouchEvent.prototype.getTouches = function() {
		var touches = this.touches;
		if (touches !== null && touches !== undefined) {
			return touches;
		}
		touches = [];
		var domEvent = this.getElement();
		var touchList = domEvent.touches;
		for (var i = 0; i < touchList.length; i++) {
			touches.push(touchList.item(i));
		}
		this.setTouches(touches);
		return touches;
	}
	jsuis.lf.TouchEvent.prototype.getTouch = function() {
		var source = this.getSource();
		var sourceElement = source.getElement();
		var touches = this.getTouches();
		for (var i = 0; i < touches.length; i++) {
			var touch = touches[i];
			if (touch.target === sourceElement) {
				return touch;
			}
		}
		return touches[0];
	}
	jsuis.lf.TouchEvent.prototype.getPoint = function() {
		var x = this.x;
		var y = this.y;
		if (x !== null && x !== undefined && y !== null && y !== undefined) {
			return new jsuis.Point(x, y);
		}
		var touch = this.getTouch();
		var source = this.getSource();
		var boundingClientRect = source.getElement().getBoundingClientRect();
		var outsets = source.getOutsets();
		x = nvl(x, touch.clientX - boundingClientRect.left + outsets.getLeft());
		y = nvl(y, touch.clientY - boundingClientRect.top + outsets.getTop());
		this.setX(x).setY(y);
		return new jsuis.Point(x, y);
	}
	jsuis.lf.TouchEvent.prototype.getX = function() {
		var point = this.getPoint();
		return point.getX();
	}
	jsuis.lf.TouchEvent.prototype.getY = function() {
		var point = this.getPoint();
		return point.getY();
	}
}) (jsuis);

/**
 * jsuis.lf.Button
 */
(function(jsuis) {
	var SUPER = jsuis.lf.AbstractButton;
	jsuis.lf.Button = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, text, icon);
		this.setPadding(new jsuis.Insets(2, 4));
		this.setBorder(new jsuis.lf.LineBorder(jsuis.Color.Black.withAlpha(.4 * 255)));
		this.setBackground(jsuis.Color.Black.withAlpha(.1 * 255));
		this.setRolloverColor(jsuis.Color.Black.withAlpha(.2 * 255));
		this.setPressedColor(jsuis.Color.Black.withAlpha(.3 * 255));
	});
	jsuis.Object.addProperties(jsuis.lf.Button, {
		releasedColor: null,
		rolloverColor: null,
		pressedColor: null
	});
	jsuis.lf.Button.prototype.setBackground = function(background) {
		this.setReleasedColor(background);
		SUPER.prototype.setBackground.call(this, background);
		return this;
	}
	jsuis.lf.Button.prototype.setEnabled = function(enabled) {
		var label = this.getLabel();
		if (label) {
			label.setEnabled(enabled);
		}
		SUPER.prototype.setEnabled.call(this, enabled);
		return this;
	}
	jsuis.lf.Button.prototype.paintReleased = function() {
		var releasedColor = this.getReleasedColor();
		SUPER.prototype.setBackground.call(this, releasedColor);
	}
	jsuis.lf.Button.prototype.paintPressed = function() {
		var pressedColor = this.getPressedColor();
		SUPER.prototype.setBackground.call(this, pressedColor);
	}
	jsuis.lf.Button.prototype.paintRollover = function() {
		var rolloverColor = this.getRolloverColor();
		SUPER.prototype.setBackground.call(this, rolloverColor);
	}
	jsuis.lf.Button.prototype.mouseClicked = function() {
	}
	jsuis.lf.Button.prototype.mousePressed = function() {
		this.paintPressed();
	}
	jsuis.lf.Button.prototype.mouseReleased = function() {
		var rollover = this.isRollover();
		if (rollover) {
			this.paintRollover();
		} else {
			this.paintReleased();
		}
	}
	jsuis.lf.Button.prototype.mouseEntered = function() {
		this.paintRollover();
	}
	jsuis.lf.Button.prototype.mouseExited = function() {
		this.paintReleased();
	}
}) (jsuis);

/**
 * jsuis.lf.TabComponent
 */
(function(jsuis) {
	var SUPER = jsuis.lf.AbstractButton;
	jsuis.lf.TabComponent = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, text, icon);
		this.setBorder(new jsuis.lf.TabComponentBorder());
	});
	jsuis.lf.TabComponent.prototype.setSelected = function(selected) {
		SUPER.prototype.setSelected.call(this, selected);
		var border = this.getBorder();
		border.paintBorder(this);
		return this;
	}
}) (jsuis);

/**
 * jsuis.lf.ToggleButton
 */
(function(jsuis) {
	var SUPER = jsuis.lf.AbstractButton;
	jsuis.lf.ToggleButton = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, text, icon);
	});
	jsuis.lf.ToggleButton.prototype.mouseReleased = function() {
		var selected = this.isSelected();
		selected = !selected;
		this.setSelected(selected);
	}
}) (jsuis);

/**
 * jsuis.lf.MenuItem
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Button;
	jsuis.lf.MenuItem = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, nvl(text, ""), icon);
		this.setBorder(new jsuis.lf.Border());
		this.setBackground(jsuis.Color.Black.withAlpha(0));
		var mouseListener = new jsuis.MouseListener({
			mouseClicked: function(event) {
				var menuItem = this.getListenerComponent();
				if (menuItem instanceof jsuis.lf.Menu) {
					return;
				}
				var menu = menuItem.getParent();
				var menuBar = menu.getParent();
				menuBar.setSelected(null);
			}
		});
		mouseListener.setListenerComponent(this);
		this.addMouseListener(mouseListener);
	});
}) (jsuis);

/**
 * jsuis.lf.RadioButton
 */
(function(jsuis) {
	var SUPER = jsuis.lf.ToggleButton;
	jsuis.lf.RadioButton = jsuis.Object.extend(SUPER, function(text) {
		SUPER.prototype.constructor.call(this, text);
		this.setSelected(false);
	});
	jsuis.Object.addProperties(jsuis.lf.RadioButton, {
		group: null
	});
	jsuis.lf.RadioButton.prototype.mouseReleased = function() {
		this.setSelected(true);
	}
	jsuis.lf.RadioButton.prototype.setSelected = function(selected) {
		SUPER.prototype.setSelected.call(this, selected);
		if (selected) {
			var group = this.getGroup();
			if (group) {
				group.setSelected(this);
			}
		}
		if (selected) {
			var selectedIcon = jsuis.lf.RadioButtonSelectedIcon.getInstance();
			this.setIcon(selectedIcon);
		} else {
			var unselectedIcon = jsuis.lf.RadioButtonUnselectedIcon.getInstance();
			this.setIcon(unselectedIcon);
		}
	}
}) (jsuis);

/**
 * jsuis.lf.Menu
 */
(function(jsuis) {
	var SUPER = jsuis.lf.MenuItem;
	jsuis.lf.Menu = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, text, icon);
	});
	jsuis.Object.addProperties(jsuis.lf.Menu, {
		popupMenu: null
	});
	jsuis.lf.Menu.prototype.add = function(component, constraints, index) {
		var component = component.getPeer();
		if ((component instanceof jsuis.lf.MenuItem) ||
				(component instanceof jsuis.lf.PopupMenuSeparator)) {
			var popupMenu = this.getPopupMenu();
			if (!popupMenu) {
				popupMenu = new jsuis.lf.PopupMenu();
				this.setPopupMenu(popupMenu);
			}
			popupMenu.add(component, constraints, index);
			component.setParent(this);
		} else {
			SUPER.prototype.add.call(this, component, constraints, index);
		}
	}
	jsuis.lf.Menu.prototype.isPopupMenuVisible = function() {
		var popupMenu = this.getPopupMenu();
		return popupMenu.isVisible();
	}
	jsuis.lf.Menu.prototype.setPopupMenuVisible = function(popupMenuVisible) {
		var popupMenu = this.getPopupMenu();
		if (!popupMenu) {
			return;
		}
		if (popupMenuVisible) {
			popupMenu.show(this, 0, this.getHeight());
		} else {
			popupMenu.setVisible(false);
		}
		return this;
	}
	jsuis.lf.Menu.prototype.addSeparator = function() {
		var separator = new jsuis.lf.PopupMenuSeparator()
		this.add(separator);
	}
	jsuis.lf.Menu.prototype.setSelected = function(selected) {
		this.setPopupMenuVisible(selected);
		if (selected) {
			this.paintPressed();
		} else {
			var rollover = this.isRollover();
			if (rollover) {
				this.paintRollover();
			} else {
				this.paintReleased();
			}
		}
		SUPER.prototype.setSelected.call(this, selected);
		return this;
	}
	jsuis.lf.Menu.prototype.hasChanged = function() {
		return this.changed;
	}
	jsuis.lf.Menu.prototype.setChanged = function(changed) {
		this.changed = changed;
		return this;
	}
	jsuis.lf.Menu.prototype.mousePressed = function() {
		this.setChanged(false);
		var menuBar = this.getParent();
		if (!(menuBar instanceof jsuis.lf.MenuBar)) {
			return;
		}
		var selection = menuBar.getSelection();
		if (!selection) {
			menuBar.setSelected(this);
			this.setChanged(true);
		}
	}
	jsuis.lf.Menu.prototype.mouseReleased = function() {
		var menuBar = this.getParent();
		if (!(menuBar instanceof jsuis.lf.MenuBar)) {
			return;
		}
		var changed = this.hasChanged();
		if (!changed) {
			var selection = menuBar.getSelection();
			if (selection) {
				menuBar.setSelected(null);
			}
		}
	}
	jsuis.lf.Menu.prototype.mouseEntered = function() {
		var menuBar = this.getParent();
		if (!(menuBar instanceof jsuis.lf.MenuBar)) {
			return;
		}
		var selection = menuBar.getSelection();
		if (selection) {
			menuBar.setSelected(this);
		}
		var selected = this.isSelected();
		if (selected) {
			this.paintPressed();
		} else {
			this.paintRollover();
		}
		this.setRollover(true);
	}
	jsuis.lf.Menu.prototype.mouseExited = function() {
		var selected = this.isSelected();
		if (selected) {
			this.paintPressed();
		} else {
			this.paintReleased();
		}
		this.setRollover(false);
	}
}) (jsuis);

