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
	jsuis.Object.getClassName = function(constructor) {
		var className = constructor.className;
		if (className) {
			return className;
		}
		// un pour tous, tous pour un
		for (var prefix in jsuis.packages) {
			var p = jsuis.packages[prefix];
			for (name in p) {
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
	jsuis.Object.addPeerProperties(jsuis.Border, {
		borderInsets: null,
		borderOutsets: null
	});
	jsuis.Border.prototype.paintBorder = function(component) {
		var peer = this.getPeer();
		peer.paintBorder(component);
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
		var oldSelection = this.getSelection();
		if (oldSelection) {
			oldSelection.setSelected(false);
		}
		this.setSelection(button);
		if (button) {
			button.setSelected(true);
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
	jsuis.Component.prototype.repaint = function() {
		var peer = this.getPeer();
		peer.repaint();
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
			CENTER: "",
			COMPONENT_MOVED: "",
			COMPONENT_RESIZED: "",
			EAST: "",
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
		SUPER.prototype.constructor.call(this);
		this.setListener(listener);
	});
	jsuis.Object.addProperties(jsuis.Listener, {
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
	var lookAndFeel = "defaultlf";
	jsuis.UIManager.getLookAndFeel = function() {
		return lookAndFeel;
	}
	jsuis.UIManager.setLookAndFeel = function(newLookAndFeel) {
		lookAndFeel = newLookAndFeel;
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
 * jsuis.ActionListener
 */
(function(jsuis) {
	var SUPER = jsuis.Listener;
	jsuis.ActionListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.ActionListener.prototype.actionPerformed = function(event) {
		var listener = this.getListener();
		listener.actionPerformed.call(this, event);
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
					aConstraints = jsuis.BorderConstraints.CENTER.clone();
					a.setConstraints(aConstraints);
				}
				var bConstraints = b.getConstraints();
				if (!bConstraints) {
					bConstraints = jsuis.BorderConstraints.CENTER.clone();
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
				constraints = jsuis.BorderConstraints.CENTER.clone();
				component.setConstraints(constraints);
			}
			if (!component.isVisible()) {
				continue;
			}
			var componentPreferredSize = component.getPreferredSize();
			var componentPreferredWidth = componentPreferredSize.getWidth();
			var componentPreferredHeight = componentPreferredSize.getHeight();
			componentPreferredWidth += hgap;
			componentPreferredHeight += vgap;
			switch (constraints.getBorder()) {
			case jsuis.Constants.NORTH:
			case jsuis.Constants.PAGE_START:
			case jsuis.Constants.TOP:
			case jsuis.Constants.SOUTH:
			case jsuis.Constants.PAGE_END:
			case jsuis.Constants.BOTTOM:
				preferredLayoutWidth = Math.max(preferredLayoutWidth, componentPreferredWidth);
				preferredLayoutHeight += componentPreferredHeight;
				break;
			case jsuis.Constants.WEST:
			case jsuis.Constants.LINE_START:
			case jsuis.Constants.LEFT:
			case jsuis.Constants.EAST:
			case jsuis.Constants.LINE_END:
			case jsuis.Constants.RIGHT:
				preferredLayoutWidth += componentPreferredWidth;
				preferredLayoutHeight = Math.max(preferredLayoutHeight, componentPreferredHeight);
				break;
			case jsuis.Constants.CENTER:
			default:
				preferredLayoutWidth = Math.max(preferredLayoutWidth, componentPreferredWidth);
				preferredLayoutHeight = Math.max(preferredLayoutHeight, componentPreferredHeight);
			}
		}
		if (components.length) {
			preferredLayoutWidth -= hgap;
			preferredLayoutHeight -= vgap;
		}
		var parentInsetsOutsets = parent.getInsets().add(parent.getOutsets());
		preferredLayoutWidth += parentInsetsOutsets.getLeft() + parentInsetsOutsets.getRight();
		preferredLayoutHeight += parentInsetsOutsets.getTop() + parentInsetsOutsets.getBottom();
		return new jsuis.Dimension(preferredLayoutWidth, preferredLayoutHeight);
	}
	jsuis.BorderLayout.prototype.layoutContainer = function(parent) {
		var x = 0;
		var y = 0;
		var width = parent.getWidth();
		var height = parent.getHeight();
		var hgap = this.getHgap();
		var vgap = this.getVgap();
		var parentInsetsOutsets = parent.getInsets().add(parent.getOutsets());
		x += parentInsetsOutsets.getLeft();
		y += parentInsetsOutsets.getTop();
		width -= parentInsetsOutsets.getLeft() + parentInsetsOutsets.getRight();
		height -= parentInsetsOutsets.getTop() + parentInsetsOutsets.getBottom();
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
				constraints = jsuis.BorderConstraints.CENTER.clone();
				component.setConstraints(constraints);
			}
			if (!component.isVisible() && constraints.getBorder() !== jsuis.Constants.CENTER) {
				continue;
			}
			var componentPreferredSize = component.getPreferredSize();
			var componentPreferredWidth = componentPreferredSize.getWidth();
			var componentPreferredHeight = componentPreferredSize.getHeight();
			var componentX = 0;
			var componentY = 0;
			var componentWidth = componentPreferredWidth + hgap;
			var componentHeight = componentPreferredHeight + vgap;
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
			var bounds = new jsuis.Rectangle(componentX, componentY, componentWidth, componentHeight);
			constraints.setBounds(bounds);
		}
		SUPER.prototype.layoutContainer.call(this, parent);
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
 * jsuis.ComponentListener
 */
(function(jsuis) {
	var SUPER = jsuis.Listener;
	jsuis.ComponentListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.ComponentListener.prototype.componentResized = function(event) {
		var listener = this.getListener();
		if (listener && listener.componentResized) {
			listener.componentResized.call(this, event);
		}
	}
	jsuis.ComponentListener.prototype.componentMoved = function(event) {
		var listener = this.getListener();
		if (listener && listener.componentMoved) {
			listener.componentMoved.call(this, event);
		}
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
 * jsuis.Dialog
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Dialog = jsuis.Object.extend(SUPER, function(title) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Dialog(title));
	});
	jsuis.Object.addPeerProperties(jsuis.Dialog, {
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
			var componentPreferredSize = component.getPreferredSize();
			var componentPreferredWidth = componentPreferredSize.getWidth();
			var componentPreferredHeight = componentPreferredSize.getHeight();
			componentPreferredWidth += hgap;
			componentPreferredHeight += vgap;
			preferredLayoutWidth += componentPreferredWidth;
			preferredLayoutHeight = Math.max(preferredLayoutHeight, componentPreferredHeight);
		}
		if (components.length) {
			preferredLayoutWidth -= hgap;
			preferredLayoutHeight -= vgap;
		}
		var parentInsetsOutsets = parent.getInsets().add(parent.getOutsets());
		preferredLayoutWidth += parentInsetsOutsets.left + parentInsetsOutsets.right;
		preferredLayoutHeight += parentInsetsOutsets.top + parentInsetsOutsets.bottom;
		return new jsuis.Dimension(preferredLayoutWidth + 2 * hgap, preferredLayoutHeight + 2 * vgap);
	}
	jsuis.FlowLayout.prototype.minimumLayoutSize = function(parent) {
		this.layoutContainer(parent);
		var minimumLayoutX = 0;
		var minimumLayoutWidth = 0;
		var minimumLayoutHeight = 0;
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
			minimumLayoutX = Math.min(minimumLayoutX, componentX);
			minimumLayoutWidth = Math.max(minimumLayoutWidth, componentX + componentWidth);
			minimumLayoutHeight = Math.max(minimumLayoutHeight, componentY + componentHeight);
		}
		return new jsuis.Dimension(minimumLayoutWidth - minimumLayoutX + 2 * hgap, minimumLayoutHeight - vgap + 2 * vgap);
	}
	jsuis.FlowLayout.prototype.layoutContainer = function(parent) {
		var minX = 0;
		var minY = 0;
		var maxWidth = parent.getWidth();
		var maxHeight = parent.getHeight();
		var hgap = this.getHgap();
		var vgap = this.getVgap();
		var parentInsetsOutsets = parent.getInsets().add(parent.getOutsets());
		minX += parentInsetsOutsets.getLeft() + hgap;
		minY += parentInsetsOutsets.getTop() + vgap;
		maxWidth -= parentInsetsOutsets.getLeft() + parentInsetsOutsets.getRight() + 2 * hgap;
		maxHeight -= parentInsetsOutsets.getTop() + parentInsetsOutsets.getBottom() + 2 * vgap;
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
			var componentPreferredSize = component.getPreferredSize();
			var componentPreferredWidth = componentPreferredSize.getWidth();
			var componentPreferredHeight = componentPreferredSize.getHeight();
			var componentX = x;
			var componentY = y;
			var componentWidth = componentPreferredWidth + hgap;
			var componentHeight = componentPreferredHeight + vgap;
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
						bounds = new jsuis.Rectangle(rowComponentX, rowComponentY, rowComponentWidth, rowComponentHeight);
					} else {
						bounds = new jsuis.Rectangle(parent.getWidth() - rowComponentX - rowComponentWidth, rowComponentY, rowComponentWidth, rowComponentHeight);
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
}) (jsuis);

/**
 * jsuis.FocusListener
 */
(function(jsuis) {
	var SUPER = jsuis.Listener;
	jsuis.FocusListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.FocusListener.prototype.focusGained = function(event) {
		var listener = this.getListener();
		if (listener && listener.focusGained) {
			listener.focusGained.call(this, event);
		}
	}
	jsuis.FocusListener.prototype.focusLost = function(event) {
		var listener = this.getListener();
		if (listener && listener.focusLost) {
			listener.focusLost.call(this, event);
		}
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
				var width = componentPreferredSize.getWidth();
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
				var height = componentPreferredSize.getHeight();
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
		var parentInsetsOutsets = parent.getInsets().add(parent.getOutsets());
		preferredLayoutWidth += parentInsetsOutsets.left + parentInsetsOutsets.right;
		preferredLayoutHeight += parentInsetsOutsets.top + parentInsetsOutsets.bottom;
		return new jsuis.Dimension(preferredLayoutWidth, preferredLayoutHeight);
	}
	jsuis.GridBagLayout.prototype.minimumLayoutSize = function(parent) {
		return this.preferredLayoutSize(parent);
	}
	jsuis.GridBagLayout.prototype.layoutContainer = function(parent) {
		var preferredLayoutSize = this.preferredLayoutSize(parent);
		var x = 0;
		var y = 0;
		var width = parent.getWidth();
		var height = parent.getHeight();
		var hgap = this.getHgap();
		var vgap = this.getVgap();
		var parentInsetsOutsets = parent.getInsets().add(parent.getOutsets());
		var preferredLayoutWidth = preferredLayoutSize.getWidth();
		var preferredLayoutHeight = preferredLayoutSize.getHeight();
		x += parentInsetsOutsets.getLeft();
		y += parentInsetsOutsets.getTop();
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
			var leftToRight = parent.isLeftToRight();
			if (leftToRight) {
				bounds = new jsuis.Rectangle(componentX, componentY, componentWidth, componentHeight);
			} else {
				bounds = new jsuis.Rectangle(width - componentX - componentWidth, componentY, componentWidth, componentHeight);
			}
			constraints.setBounds(bounds);
		}
		SUPER.prototype.layoutContainer.call(this, parent);
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
		width: 0,
		height: 0
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
	jsuis.LineBorder.prototype.getBorderInsets = function(component) {
		var thickness = this.getThickness();
		return new jsuis.Insets(thickness, thickness, thickness, thickness);
	}
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
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.MouseAdapter.prototype.mouseClicked = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseClicked) {
			listener.mouseClicked.call(this, event);
		}
	}
	jsuis.MouseAdapter.prototype.mousePressed = function(event) {
		var listener = this.getListener();
		if (listener && listener.mousePressed) {
			listener.mousePressed.call(this, event);
		}
	}
	jsuis.MouseAdapter.prototype.mouseReleased = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseReleased) {
			listener.mouseReleased.call(this, event);
		}
	}
	jsuis.MouseAdapter.prototype.mouseEntered = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseEntered) {
			listener.mouseEntered.call(this, event);
		}
	}
	jsuis.MouseAdapter.prototype.mouseExited = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseExited) {
			listener.mouseExited.call(this, event);
		}
	}
	jsuis.MouseAdapter.prototype.mouseDragged = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseDragged) {
			listener.mouseDragged.call(this, event);
		}
	}
	jsuis.MouseAdapter.prototype.mouseMoved = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseMoved) {
			listener.mouseMoved.call(this, event);
		}
	}
}) (jsuis);

/**
 * jsuis.MouseListener
 */
(function(jsuis) {
	var SUPER = jsuis.Listener;
	jsuis.MouseListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.MouseListener.prototype.mouseClicked = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseClicked) {
			listener.mouseClicked.call(this, event);
		}
	}
	jsuis.MouseListener.prototype.mousePressed = function(event) {
		var listener = this.getListener();
		if (listener && listener.mousePressed) {
			listener.mousePressed.call(this, event);
		}
	}
	jsuis.MouseListener.prototype.mouseReleased = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseReleased) {
			listener.mouseReleased.call(this, event);
		}
	}
	jsuis.MouseListener.prototype.mouseEntered = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseEntered) {
			listener.mouseEntered.call(this, event);
		}
	}
	jsuis.MouseListener.prototype.mouseExited = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseExited) {
			listener.mouseExited.call(this, event);
		}
	}
}) (jsuis);

/**
 * jsuis.MouseMotionListener
 */
(function(jsuis) {
	var SUPER = jsuis.Listener;
	jsuis.MouseMotionListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.MouseMotionListener.prototype.mouseDragged = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseDragged) {
			listener.mouseDragged.call(this, event);
		}
	}
	jsuis.MouseMotionListener.prototype.mouseMoved = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseMoved) {
			listener.mouseMoved.call(this, event);
		}
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
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.TouchListener.prototype.touchPressed = function(event) {
		var listener = this.getListener();
		if (listener && listener.touchPressed) {
			listener.touchPressed.call(this, event);
		}
	}
	jsuis.TouchListener.prototype.touchReleased = function(event) {
		var listener = this.getListener();
		if (listener && listener.touchReleased) {
			listener.touchReleased.call(this, event);
		}
	}
	jsuis.TouchListener.prototype.touchMoved = function(event) {
		var listener = this.getListener();
		if (listener && listener.touchMoved) {
			listener.touchMoved.call(this, event);
		}
	}
	jsuis.TouchListener.prototype.touchDragged = function(event) {
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
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.Action.prototype.isEnabled = function() {
		return this.enabled;
	}
	jsuis.Action.prototype.setEnabled = function(enabled) {
		var oldEnabled = this.enabled;
		this.enabled = enabled;
		this.firePropertyChange("enabled", oldEnabled, enabled);
		return this;
	}
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
	jsuis.BorderConstraints.NORTH = new jsuis.BORDER_CONSTRAINTS(jsuis.Constants.NORTH);
	jsuis.BorderConstraints.SOUTH = new jsuis.BORDER_CONSTRAINTS(jsuis.Constants.SOUTH);
	jsuis.BorderConstraints.EAST = new jsuis.BORDER_CONSTRAINTS(jsuis.Constants.EAST);
	jsuis.BorderConstraints.WEST = new jsuis.BORDER_CONSTRAINTS(jsuis.Constants.WEST);
	jsuis.BorderConstraints.CENTER = new jsuis.BORDER_CONSTRAINTS(jsuis.Constants.CENTER);
	
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
	jsuis.PopupMenu = jsuis.Object.extend(SUPER, function(layout, target) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].PopupMenu(layout, target));
	});
	jsuis.PopupMenu.prototype.show = function(invoker, x, y) {
		var peer = this.getPeer();
		peer.show(invoker, x, y);
	}
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
 * jsuis.defaultlf
 */
jsuis.defaultlf = {};
jsuis.packages["jsuis.defaultlf"] = jsuis.defaultlf;

/**
 * Border
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.defaultlf.Border = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.defaultlf.Border.prototype.paintBorder = function(component) {
		var graphics = component.getGraphics();
		graphics.setForeground(null);
		var w = graphics.getWidth();
		var h = graphics.getHeight();
		graphics.setResource("M0,0Lw,0Lw,hL0,hZ"
				.replace(/w/g, w).replace(/h/g, h));
	}
	jsuis.defaultlf.Border.prototype.getPeer = function() {
		return this;
	}
	jsuis.defaultlf.Border.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets();
	}
	jsuis.defaultlf.Border.prototype.getBorderOutsets = function(component) {
		return new jsuis.Insets();
	}
})(jsuis);

/**
 * jsuis.defaultlf.BrowserWindow
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.defaultlf.BrowserWindow = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
		this.setElement(window);
		this.setEventListeners({});
		this.setComponentListeners([]);
		this.setMouseListeners([]);
		this.setMouseMotionListeners([]);
		
		this.setEventListener("mousedown", function(domEvent) {
			jsuis.defaultlf.BrowserWindow.getInstance().fireMousePressed(domEvent);
		});
		this.setEventListener("mouseup", function(domEvent) {
			jsuis.defaultlf.BrowserWindow.getInstance().fireMouseReleased(domEvent);
		});
		this.setEventListener("mousemove", function(domEvent) {
			var browserWindow = jsuis.defaultlf.BrowserWindow.getInstance();
			if (browserWindow.isPressed()) {
				browserWindow.fireMouseDragged(domEvent);
			}
		});
	});
	jsuis.Object.addProperties(jsuis.defaultlf.BrowserWindow, {
		eventListeners: null,
		componentListeners: null,
		mouseListeners: null,
		mouseMotionListeners: null
	});
	var instance;
	jsuis.defaultlf.BrowserWindow.getInstance = function() {
		if (!instance) {
			instance = new jsuis.defaultlf.BrowserWindow();
		}
		return instance;
	}
	jsuis.defaultlf.BrowserWindow.prototype.getEventListener = function(type) {
		var eventListeners = this.getEventListeners();
		return eventListeners["on" + type];
	}
	jsuis.defaultlf.BrowserWindow.prototype.setEventListener = function(type, eventListener) {
		var oldEventListener = this.getEventListener(type);
		if (oldEventListener) {
			this.removeEventListener(type, oldEventListener);
		}
		this.addEventListener(type, eventListener);
		var eventListeners = this.getEventListeners();
		eventListeners["on" + type] = eventListener;
		return this;
	}
	jsuis.defaultlf.BrowserWindow.prototype.addEventListener = function(type, eventListener) {
		var element = this.getElement();
		element.addEventListener(type, eventListener);
	}
	jsuis.defaultlf.BrowserWindow.prototype.removeEventListener = function(type, eventListener) {
		var element = this.getElement();
		element.removeEventListener(type, eventListener);
	}
	jsuis.defaultlf.BrowserWindow.prototype.addComponentListener = function(componentListener) {
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
	jsuis.defaultlf.BrowserWindow.prototype.removeComponentListener = function(componentListener) {
		var componentListeners = this.getComponentListeners();
		var index = componentListeners.indexOf(componentListener);
		if (index !== -1) {
			componentListeners.splice(index, 1);
		}
	}
	jsuis.defaultlf.BrowserWindow.prototype.fireComponentResized = function(domEvent) {
		var event = new jsuis.defaultlf.ComponentEvent(this, jsuis.Constants.COMPONENT_RESIZED).setDomEvent(domEvent);
		var componentListeners = this.getComponentListeners();
		for (var i = 0; i < componentListeners.length; i++) {
			var componentListener = componentListeners[i];
			componentListener.componentResized(event);
		}
	}
	jsuis.defaultlf.BrowserWindow.prototype.isPressed = function() {
		return this.pressed;
	}
	jsuis.defaultlf.BrowserWindow.prototype.setPressed = function(pressed) {
		this.pressed = pressed;
		return this;
	}
	jsuis.defaultlf.BrowserWindow.prototype.addMouseListener = function(mouseListener) {
		var mouseListeners = this.getMouseListeners();
		mouseListeners.push(mouseListener);
	}
	jsuis.defaultlf.BrowserWindow.prototype.removeMouseListener = function(mouseListener) {
		var mouseListeners = this.getMouseListeners();
		var index = mouseListeners.indexOf(mouseListener);
		if (index !== -1) {
			mouseListeners.splice(index, 1);
		}
	}
	jsuis.defaultlf.BrowserWindow.prototype.fireMousePressed = function(domEvent) {
		this.setPressed(true);
	}
	jsuis.defaultlf.BrowserWindow.prototype.fireMouseReleased = function(domEvent) {
		this.setPressed(false);
		var mouseEvent = new jsuis.defaultlf.MouseEvent(this, jsuis.Constants.MOUSE_RELEASED).setDomEvent(domEvent);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseReleased(mouseEvent);
		}
	}
	jsuis.defaultlf.BrowserWindow.prototype.addMouseMotionListener = function(mouseMotionListener) {
		var mouseMotionListeners = this.getMouseMotionListeners();
		mouseMotionListeners.push(mouseMotionListener);
	}
	jsuis.defaultlf.BrowserWindow.prototype.removeMouseMotionListener = function(mouseMotionListener) {
		var mouseMotionListeners = this.getMouseMotionListeners();
		var index = mouseMotionListeners.indexOf(mouseMotionListener);
		if (index !== -1) {
			mouseMotionListeners.splice(index, 1);
		}
	}
	jsuis.defaultlf.BrowserWindow.prototype.fireMouseDragged = function(domEvent) {
		var mouseEvent = new jsuis.defaultlf.MouseEvent(this, jsuis.Constants.MOUSE_DRAGGED).setDomEvent(domEvent);
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
	jsuis.defaultlf.Component = jsuis.Object.extend(SUPER, function(element) {
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
	jsuis.Object.addProperties(jsuis.defaultlf.Component, {
		components: null,
		parent: null,
		layout: null,
		constraints: null,
		image: null,
		cursor: null,
		graphics: null,
		target: null,
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
	jsuis.defaultlf.Component.prototype.addClass = function(name) {
		var value = this.getAttribute("class");
		var classes = value ? value.split(" ") : [];
		if (classes.indexOf(name) === -1) {
			classes.push(name);
			var value = classes.join(" ");
			this.setAttribute("class", value);
		}
	}
	jsuis.defaultlf.Component.prototype.getAttribute = function(attribute) {
		var element = this.getElement();
		return element.getAttribute(attribute);
	}
	jsuis.defaultlf.Component.prototype.setAttribute = function(attribute, value) {
		var element = this.getElement();
		if (value === null) {
			element.removeAttribute(attribute);
			return this;
		}
		element.setAttribute(attribute, value);
		return this;
	}
	jsuis.defaultlf.Component.prototype.setStyleProperty = function(property, value) {
		var element = this.getElement();
		element.style[property] = value;
		return this;
	}
	jsuis.defaultlf.Component.prototype.getStyleProperty = function(property) {
		var element = this.getElement();
		var computedStyle = getComputedStyle(element);
		return computedStyle[property];
	}
	/*
	jsuis.defaultlf.Component.prototype.getEventListener = function(type) {
		var element = this.getElement();
		return element["on" + type];
	}
	jsuis.defaultlf.Component.prototype.setEventListener = function(type, listener) {
		var element = this.getElement();
		element["on" + type] = listener;
		return this;
	}
	*/
	jsuis.defaultlf.Component.prototype.getEventListener = function(type) {
		var eventListeners = this.getEventListeners();
		return eventListeners["on" + type];
	}
	jsuis.defaultlf.Component.prototype.setEventListener = function(type, eventListener) {
		var oldEventListener = this.getEventListener(type);
		if (oldEventListener) {
			this.removeEventListener(type, oldEventListener);
		}
		this.addEventListener(type, eventListener);
		var eventListeners = this.getEventListeners();
		eventListeners["on" + type] = eventListener;
		return this;
	}
	jsuis.defaultlf.Component.prototype.addEventListener = function(type, eventListener) {
		var element = this.getElement();
		element.addEventListener(type, eventListener);
	}
	jsuis.defaultlf.Component.prototype.removeEventListener = function(type, eventListener) {
		var element = this.getElement();
		element.removeEventListener(type, eventListener);
	}
	jsuis.defaultlf.Component.prototype.getId = function() {
		return this.getAttribute("id");
	}
	jsuis.defaultlf.Component.prototype.setId = function(id) {
		this.setAttribute("id", id);
		return this;
	}
	jsuis.defaultlf.Component.prototype.getName = function() {
		return this.getAttribute("name");
	}
	jsuis.defaultlf.Component.prototype.setName = function(name) {
		this.setAttribute("name", name);
		return this;
	}
	jsuis.defaultlf.Component.prototype.getPeer = function() {
		return this;
	}
	jsuis.defaultlf.Component.prototype.addChild = function(component, constraints, index) {
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
	jsuis.defaultlf.Component.prototype.removeChild = function(component) {
		var element = this.getElement();
		var componentElement = component.getElement();
		element.removeChild(componentElement);
	}
	jsuis.defaultlf.Component.prototype.add = function(component, constraints, index) {
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
	jsuis.defaultlf.Component.prototype.remove = function(component) {
		component = component.getPeer();
		this.removeChild(component);
		component.setParent(undefined);
		var components = this.getComponents();
		var index = components.indexOf(component);
		if (index !== -1) {
			components.splice(index, 1);
		}
	}
	jsuis.defaultlf.Component.prototype.removeAll = function() {
		var components = this.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			this.removeChild(component);
			component.setParent(undefined);
		}
		components.length = 0;
	}
	jsuis.defaultlf.Component.prototype.getX = function() {
		return this.x || 0;
	}
	jsuis.defaultlf.Component.prototype.setX = function(x) {
		var outsets = this.getOutsets();
		this.setAttribute("x", +nvl(x, 0) + outsets.getLeft());
		this.x = x;
		return this;
	}
	jsuis.defaultlf.Component.prototype.getY = function() {
		return this.y || 0;
	}
	jsuis.defaultlf.Component.prototype.setY = function(y) {
		var outsets = this.getOutsets();
		this.setAttribute("y", +nvl(y, 0) + outsets.getTop());
		this.y = y;
		return this;
	}
	jsuis.defaultlf.Component.prototype.getLocation = function() {
		return new jsuis.Point(this.getX(), this.getY());
	}
	jsuis.defaultlf.Component.prototype.setLocation = function(point) {
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
	jsuis.defaultlf.Component.prototype.getWidth = function() {
		return this.width || 0;
	}
	jsuis.defaultlf.Component.prototype.setWidth = function(width) {
		this.width = width;
		var outsets = this.getOutsets();
		width -= outsets.getLeft() + outsets.getRight();
		if (width >= 0) {
			this.setAttribute("width", width);
		}
		return this;
	}
	jsuis.defaultlf.Component.prototype.getHeight = function() {
		return this.height || 0;
	}
	jsuis.defaultlf.Component.prototype.setHeight = function(height) {
		this.height = height;
		var outsets = this.getOutsets();
		height -= outsets.getTop() + outsets.getBottom();
		if (height >= 0) {
			this.setAttribute("height", height);
		}
		return this;
	}
	jsuis.defaultlf.Component.prototype.getSize = function() {
		return new jsuis.Dimension(this.getWidth(), this.getHeight());
	}
	jsuis.defaultlf.Component.prototype.setSize = function(dimension) {
		this.setWidth(dimension.getWidth());
		this.setHeight(dimension.getHeight());
		return this;
	}
	jsuis.defaultlf.Component.prototype.getPreferredSize = function() {
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
		var bbox = element.getBBox();
		return new jsuis.Dimension(Math.ceil(bbox.width), Math.ceil(bbox.height)).add(
				layoutPaddingMargin.getDimension());
	}
	jsuis.defaultlf.Component.prototype.setPreferredSize = function(preferredSize) {
		this.preferredSize = preferredSize ? preferredSize.clone() : preferredSize;
		return this;
	}
	jsuis.defaultlf.Component.prototype.getMinimumSize = function() {
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
	jsuis.defaultlf.Component.prototype.setMinimumSize = function(minimumSize) {
		this.minimumSize = minimumSize ? minimumSize.clone() : minimumSize;
		return this;
	}
	jsuis.defaultlf.Component.prototype.getBounds = function() {
		return new jsuis.Rectangle(this.getX(), this.getY(), this.getWidth(), this.getHeight());
	}
	jsuis.defaultlf.Component.prototype.setBounds = function(rectangle) {
		this.setLocation(rectangle.getPoint());
		this.setSize(rectangle.getDimension());
		return this;
	}
	jsuis.defaultlf.Component.prototype.getPadding = function() {
		if (!this.padding) {
			this.padding = new jsuis.Insets();
		}
		return this.padding.clone();
	}
	jsuis.defaultlf.Component.prototype.setPadding = function(padding) {
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
	jsuis.defaultlf.Component.prototype.getMargin = function() {
		if (!this.margin) {
			this.margin = new jsuis.Insets();
		}
		return this.margin.clone();
	}
	jsuis.defaultlf.Component.prototype.setMargin = function(margin) {
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
	jsuis.defaultlf.Component.prototype.getBorder = function() {
		return this.border;
	}
	jsuis.defaultlf.Component.prototype.setBorder = function(border) {
		this.border = border;
		border = nvl(border, new jsuis.defaultlf.Border());
		var graphics = this.getGraphics();
		if (graphics) {
			border.paintBorder(this);
		}
		return this;
	}
	jsuis.defaultlf.Component.prototype.getInsets = function() {
		var constraints = nvl(this.getConstraints(), new jsuis.Constraints());
		var insets = this.getPadding().add(constraints.getPadding());
		var border = this.getBorder();
		if (border) {
			return insets.add(border.getBorderInsets(this));
		}
		return insets;
	}
	jsuis.defaultlf.Component.prototype.getOutsets = function() {
		var constraints = nvl(this.getConstraints(), new jsuis.Constraints());
		var outsets = this.getMargin().add(constraints.getMargin());
		var border = this.getBorder();
		if (border) {
			return outsets.add(border.getBorderOutsets(this));
		}
		return outsets;
	}
	jsuis.defaultlf.Component.prototype.isLeftToRight = function() {
		return nvl(this.leftToRight, true);
	}
	jsuis.defaultlf.Component.prototype.setLeftToRight = function(leftToRight) {
		this.leftToRight = leftToRight;
		return this;
	}
	jsuis.defaultlf.Component.prototype.validate = function() {
		this.doLayout();
		var components = this.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			component.validate();
		}
	}
	jsuis.defaultlf.Component.prototype.doLayout = function() {
		var layout = this.getLayout();
		if (layout) {
			layout.layoutContainer(this);
		}
	}
	jsuis.defaultlf.Component.prototype.isVisible = function() {
		return nvl(this.visible, true);
	}
	jsuis.defaultlf.Component.prototype.setVisible = function(visible) {
		this.setStyleProperty("display", visible ? "" : "none");
		this.visible = visible;
		return this;
	}
	jsuis.defaultlf.Component.prototype.getBackground = function() {
		return this.background;
	}
	jsuis.defaultlf.Component.prototype.setBackground = function(background) {
		this.setStyleProperty("fill", nvl(background, "none").toString());
		this.background = background;
		return this;
	}
	jsuis.defaultlf.Component.prototype.getForeground = function() {
		return this.foreground;
	}
	jsuis.defaultlf.Component.prototype.setForeground = function(foreground) {
		this.setStyleProperty("stroke", nvl(foreground, "none").toString());
		this.foreground = foreground;
		return this;
	}
	jsuis.defaultlf.Component.prototype.getFont = function() {
		return this.font;
	}
	jsuis.defaultlf.Component.prototype.setFont = function(font) {
		if (font) {
			this.setStyleProperty("font-family", font.getName());
			this.setStyleProperty("font-style", font.getStyle());
			this.setStyleProperty("font-weight", font.getStyle());
			this.setStyleProperty("font-size", font.getSize() + "px");
		}
		this.font = font;
		return this;
	}
	jsuis.defaultlf.Component.prototype.getCursor = function() {
		return this.cursor;
	}
	jsuis.defaultlf.Component.prototype.setCursor = function(cursor) {
		this.cursor = cursor;
		if (cursor) {
			this.setStyleProperty("cursor", nvl(cursor, "").toString());
		}
		return this;
	}
	jsuis.defaultlf.Component.prototype.isEnabled = function() {
		return nvl(this.enabled, true);
	}
	jsuis.defaultlf.Component.prototype.setEnabled = function(enabled) {
		this.setStyleProperty("pointer-events", enabled ? "" : "none");
		var oldEnabled = this.isEnabled();
		this.enabled = enabled;
		this.firePropertyChange("enabled", oldEnabled, enabled);
		return this;
	}
	jsuis.defaultlf.Component.prototype.isSelectable = function() {
		return nvl(this.selectable, true);
	}
	jsuis.defaultlf.Component.prototype.setSelectable = function(selectable) {
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
	jsuis.defaultlf.Component.prototype.isPressed = function() {
		return this.pressed;
	}
	jsuis.defaultlf.Component.prototype.setPressed = function(pressed) {
		this.pressed = pressed;
		return this;
	}
	jsuis.defaultlf.Component.prototype.requestFocus = function() {
		var element = this.getElement();
		element.focus();
	}
	jsuis.defaultlf.Component.prototype.addComponentListener = function(componentListener) {
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
	jsuis.defaultlf.Component.prototype.removeComponentListener = function(componentListener) {
		var componentListeners = this.getComponentListeners();
		var index = componentListeners.indexOf(componentListener);
		if (index !== -1) {
			componentListeners.splice(index, 1);
		}
	}
	jsuis.defaultlf.Component.prototype.fireComponentResized = function(domEvent) {
		var event = new jsuis.defaultlf.ComponentEvent(this, jsuis.Constants.COMPONENT_RESIZED).setDomEvent(domEvent);
		var componentListeners = this.getComponentListeners();
		for (var i = 0; i < componentListeners.length; i++) {
			var componentListener = componentListeners[i];
			componentListener.componentResized(event);
		}
	}
	jsuis.defaultlf.Component.prototype.fireComponentMoved = function() {
		var event = new jsuis.defaultlf.ComponentEvent(this, jsuis.Constants.COMPONENT_MOVED);
		var componentListeners = this.getComponentListeners();
		for (var i = 0; i < componentListeners.length; i++) {
			var componentListener = componentListeners[i];
			componentListener.componentMoved(event);
		}
	}
	jsuis.defaultlf.Component.prototype.addMouseAdapter = function(mouseAdapter) {
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
			var onmousedown = this.getEventListener("mousedown");
			if (!onmousedown) {
				this.setEventListener("mousedown", function(event) {
					component.fireMousePressed(event);
				});
			}
			var browserWindow = jsuis.defaultlf.BrowserWindow.getInstance();
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
							component.fireMouseReleased(event.getDomEvent());
						}
					}
				});
				mouseListener.setListenerComponent(this);
				browserWindow.addMouseListener(mouseListener);
			}
		}
		if (listener.mouseEntered) {
			var onmouseenter = this.getEventListener("mouseenter");
			if (!onmouseenter) {
				this.setEventListener("mouseenter", function(event) {
					component.fireMouseEntered(event);
				});
			}
		}
		if (listener.mouseExited) {
			var onmouseleave = this.getEventListener("mouseleave");
			if (!onmouseleave) {
				this.setEventListener("mouseleave", function(event) {
					component.fireMouseExited(event);
				});
			}
		}
		if (listener.mouseMoved) {
			var onmousemove = this.getEventListener("mousemove");
			if (!onmousemove) {
				this.setEventListener("mousemove", function(event) {
					component.fireMouseMoved(event);
				});
			}
		}
		if (listener.mouseDragged) {
			var browserWindow = jsuis.defaultlf.BrowserWindow.getInstance();
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
							component.fireMouseDragged(event.getDomEvent());
						}
					}
				});
				mouseMotionListener.setListenerComponent(this);
				browserWindow.addMouseMotionListener(mouseMotionListener);
			}
		}
	}
	jsuis.defaultlf.Component.prototype.removeMouseAdapter = function(mouseAdapter) {
		this.removeMouseListener(mouseAdapter);
		this.removeMouseMotionListener(mouseAdapter);
	}
	jsuis.defaultlf.Component.prototype.addMouseListener = function(mouseListener) {
		this.addMouseAdapter(mouseListener);
	}
	jsuis.defaultlf.Component.prototype.removeMouseListener = function(mouseListener) {
		var mouseListeners = this.getMouseListeners();
		var index = mouseListeners.indexOf(mouseListener);
		if (index !== -1) {
			mouseListeners.splice(index, 1);
		}
	}
	jsuis.defaultlf.Component.prototype.fireMouseClicked = function(domEvent) {
		var mouseEvent = new jsuis.defaultlf.MouseEvent(this, jsuis.Constants.MOUSE_CLICKED).setDomEvent(domEvent);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseClicked(mouseEvent);
		}
	}
	jsuis.defaultlf.Component.prototype.fireMouseDoubleClicked = function(domEvent) {
		var mouseEvent = new jsuis.defaultlf.MouseEvent(this, jsuis.Constants.MOUSE_CLICKED).setDomEvent(domEvent).setClickCount(2);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseClicked(mouseEvent);
		}
	}
	jsuis.defaultlf.Component.prototype.fireMouseRightClicked = function(domEvent) {
		var mouseEvent = new jsuis.defaultlf.MouseEvent(this, jsuis.Constants.MOUSE_CLICKED).setDomEvent(domEvent).setPopupTrigger(true);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseClicked(mouseEvent);
		}
	}
	jsuis.defaultlf.Component.prototype.fireMousePressed = function(domEvent) {
		this.setPressed(true);
		var mouseEvent = new jsuis.defaultlf.MouseEvent(this, jsuis.Constants.MOUSE_PRESSED).setDomEvent(domEvent);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mousePressed(mouseEvent);
		}
	}
	jsuis.defaultlf.Component.prototype.fireMouseReleased = function(domEvent) {
		this.setPressed(false);
		var mouseEvent = new jsuis.defaultlf.MouseEvent(this, jsuis.Constants.MOUSE_RELEASED).setDomEvent(domEvent);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseReleased(mouseEvent);
		}
	}
	jsuis.defaultlf.Component.prototype.fireMouseEntered = function(domEvent) {
		var mouseEvent = new jsuis.defaultlf.MouseEvent(this, jsuis.Constants.MOUSE_ENTERED).setDomEvent(domEvent);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseEntered(mouseEvent);
		}
	}
	jsuis.defaultlf.Component.prototype.fireMouseExited = function(domEvent) {
		var mouseEvent = new jsuis.defaultlf.MouseEvent(this, jsuis.Constants.MOUSE_EXITED).setDomEvent(domEvent);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseExited(mouseEvent);
		}
	}
	jsuis.defaultlf.Component.prototype.addMouseMotionListener = function(mouseMotionListener) {
		this.addMouseAdapter(mouseMotionListener);
	}
	jsuis.defaultlf.Component.prototype.removeMouseMotionListener = function(mouseMotionListener) {
		var mouseMotionListeners = this.getMouseMotionListeners();
		var index = mouseMotionListeners.indexOf(mouseMotionListener);
		if (index !== -1) {
			mouseMotionListeners.splice(index, 1);
		}
	}
	jsuis.defaultlf.Component.prototype.fireMouseMoved = function(domEvent) {
		if (this.isPressed()) {
			return;
		}
		var mouseEvent = new jsuis.defaultlf.MouseEvent(this, jsuis.Constants.MOUSE_MOVED).setDomEvent(domEvent);
		var mouseMotionListeners = this.getMouseMotionListeners();
		for (var i = 0; i < mouseMotionListeners.length; i++) {
			var mouseMotionListener = mouseMotionListeners[i];
			mouseMotionListener.mouseMoved(mouseEvent);
		}
	}
	jsuis.defaultlf.Component.prototype.fireMouseDragged = function(domEvent) {
		var mouseEvent = new jsuis.defaultlf.MouseEvent(this, jsuis.Constants.MOUSE_DRAGGED).setDomEvent(domEvent);
		var mouseMotionListeners = this.getMouseMotionListeners();
		for (var i = 0; i < mouseMotionListeners.length; i++) {
			var mouseMotionListener = mouseMotionListeners[i];
			mouseMotionListener.mouseDragged(mouseEvent);
		}
	}
	jsuis.defaultlf.Component.prototype.addTouchListener = function(touchListener) {
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
	jsuis.defaultlf.Component.prototype.removeTouchListener = function(touchListener) {
		var touchListeners = this.getTouchListeners();
		var index = touchListeners.indexOf(touchListener);
		if (index !== -1) {
			touchListeners.splice(index, 1);
		}
	}
	jsuis.defaultlf.Component.prototype.fireTouchPressed = function(domEvent) {
		var touchEvent = new jsuis.defaultlf.TouchEvent(this, jsuis.Constants.TOUCH_PRESSED).setDomEvent(domEvent);
		var touchListeners = this.getTouchListeners();
		for (var i = 0; i < touchListeners.length; i++) {
			var touchListener = touchListeners[i];
			touchListener.touchPressed(touchEvent);
		}
	}
	jsuis.defaultlf.Component.prototype.fireTouchReleased = function(domEvent) {
		var touchEvent = new jsuis.defaultlf.TouchEvent(this, jsuis.Constants.TOUCH_RELEASED).setDomEvent(domEvent);
		var touchListeners = this.getTouchListeners();
		for (var i = 0; i < touchListeners.length; i++) {
			var touchListener = touchListeners[i];
			touchListener.touchReleased(touchEvent);
		}
	}
	jsuis.defaultlf.Component.prototype.fireTouchMoved = function(domEvent) {
		var touchEvent = new jsuis.defaultlf.TouchEvent(this, jsuis.Constants.TOUCH_MOVED).setDomEvent(domEvent);
		var touchListeners = this.getTouchListeners();
		for (var i = 0; i < touchListeners.length; i++) {
			var touchListener = touchListeners[i];
			touchListener.touchMoved(touchEvent);
		}
	}
	jsuis.defaultlf.Component.prototype.addFocusListener = function(focusListener) {
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
	jsuis.defaultlf.Component.prototype.removeFocusListener = function(focusListener) {
		var focusListeners = this.getFocusListeners();
		var index = focusListeners.indexOf(focusListener);
		if (index !== -1) {
			focusListeners.splice(index, 1);
		}
	}
	jsuis.defaultlf.Component.prototype.fireFocusGained = function(domEvent) {
		var focusEvent = new jsuis.defaultlf.FocusEvent(this, jsuis.Constants.FOCUS_GAINED).setDomEvent(domEvent);
		var focusListeners = this.getFocusListeners();
		for (var i = 0; i < focusListeners.length; i++) {
			var focusListener = focusListeners[i];
			focusListener.focusGained(focusEvent);
		}
	}
	jsuis.defaultlf.Component.prototype.fireFocusLost = function(domEvent) {
		var focusEvent = new jsuis.defaultlf.FocusEvent(this, jsuis.Constants.FOCUS_LOST).setDomEvent(domEvent);
		var focusListeners = this.getFocusListeners();
		for (var i = 0; i < focusListeners.length; i++) {
			var focusListener = focusListeners[i];
			focusListener.focusLost(focusEvent);
		}
	}
	jsuis.defaultlf.Component.prototype.addActionListener = function(actionListener) {
		var actionListeners = this.getActionListeners();
		actionListeners.push(actionListener);
		var mouseListener = new jsuis.MouseListener({
			mouseClicked: function(event) {
				var source = event.getSource();
				source.fireActionPerformed(event.getDomEvent());
			}
		});
		mouseListener.setListenerComponent(actionListener.getListenerComponent());
		this.addMouseListener(mouseListener);
	}
	jsuis.defaultlf.Component.prototype.removeActionListener = function(actionListener) {
		var actionListeners = this.getActionListeners();
		var index = actionListeners.indexOf(actionListener);
		if (index !== -1) {
			actionListeners.splice(index, 1);
		}
	}
	jsuis.defaultlf.Component.prototype.fireActionPerformed = function(domEvent) {
		var event = new jsuis.defaultlf.ActionEvent(this, jsuis.Constants.ACTION_PERFORMED, this.getActionCommand()).setDomEvent(domEvent);
		var actionListeners = this.getActionListeners();
		for (var i = 0; i < actionListeners.length; i++) {
			var actionListener = actionListeners[i];
			actionListener.actionPerformed(event);
		}
	}
})(jsuis);

/**
 * jsuis.defaultlf.Event
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.defaultlf.Event = jsuis.Object.extend(SUPER, function(source, id) {
		SUPER.prototype.constructor.call(this);
		this.setSource(source);
		this.setId(id);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Event, {
		domEvent: null,
		source: null,
		id: null
	});
	
	jsuis.defaultlf.Event.prototype.setComponent = jsuis.defaultlf.Event.prototype.setSource;
	jsuis.defaultlf.Event.prototype.getComponent = jsuis.defaultlf.Event.prototype.getSource;
	
	jsuis.defaultlf.Event.prototype.preventDefault = function() {
		var domEvent = this.getDomEvent();
		if (domEvent) {
			domEvent.preventDefault();
		}
	}
	
	jsuis.defaultlf.Event.prototype.stopPropagation = function() {
		var domEvent = this.getDomEvent();
		if (domEvent) {
			domEvent.stopPropagation();
		}
	}
}) (jsuis);

/**
 * jsuis.defaultlf.Icon
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.defaultlf.Icon = jsuis.Object.extend(SUPER, function(iconWidth, iconHeight) {
		SUPER.prototype.constructor.call(this);
		this.setIconWidth(iconWidth);
		this.setIconHeight(iconHeight);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Icon, {
		iconWidth: 0,
		iconHeight: 0
	});
}) (jsuis);

/**
 * jsuis.defaultlf.Timer
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.defaultlf.Timer = jsuis.Object.extend(SUPER, function(delay, actionListener) {
		SUPER.prototype.constructor.call(this);
		this.setActionListeners([]);
		this.setDelay(delay);
		this.addActionListener(actionListener);
		this.setInitialDelay(delay);
		this.setRepeats(true);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Timer, {
		actionListeners: null,
		delay: 0,
		actionListener: null,
		initialDelay: 0,
		timeout: null,
		interval: null,
		actionCommand: null
	});
	jsuis.defaultlf.Timer.prototype.addActionListener = function(actionListener) {
		var actionListeners = this.getActionListeners();
		actionListeners.push(actionListener);
	}
	jsuis.defaultlf.Timer.prototype.removeActionListener = function(actionListener) {
		var actionListeners = this.getActionListeners();
		var index = actionListeners.indexOf(actionListener);
		if (index !== -1) {
			actionListeners.splice(index, 1);
		}
	}
	jsuis.defaultlf.Timer.prototype.fireActionPerformed = function() {
		var event = new jsuis.defaultlf.ActionEvent(this, jsuis.Constants.ACTION_PERFORMED, this.getActionCommand());
		var actionListeners = this.getActionListeners();
		for (var i = 0; i < actionListeners.length; i++) {
			var actionListener = actionListeners[i];
			actionListener.actionPerformed(event);
		}
	}
	jsuis.defaultlf.Timer.prototype.isRepeats = function() {
		return this.repeats;
	}
	jsuis.defaultlf.Timer.prototype.setRepeats = function(repeats) {
		this.repeats = repeats;
		return this;
	}
	jsuis.defaultlf.Timer.prototype.start = function() {
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
	jsuis.defaultlf.Timer.prototype.stop = function() {
		try {
			this.stopInterval();
		} finally {
			this.stopTimeout();
		}
	}
	jsuis.defaultlf.Timer.prototype.stopInterval = function() {
		var interval = this.getInterval();
		if (interval) {
			clearInterval(interval);
			interval = null;
		}
	}
	jsuis.defaultlf.Timer.prototype.stopTimeout = function() {
		var timeout = this.getTimeout();
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}
	}
}) (jsuis);

/**
 * jsuis.defaultlf.TreeCellRenderer
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.defaultlf.TreeCellRenderer = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
		this.setRowHeight(18);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.TreeCellRenderer, {
		rowHeight: 0,
		icons: null
	});
	jsuis.defaultlf.TreeCellRenderer.prototype.getIcon = function(key) {
		var icons = this.getIcons();
		if (!icons) {
			icons = {};
			this.setIcons(icons);
		}
		return icons[key];
	}
	jsuis.defaultlf.TreeCellRenderer.prototype.setIcon = function(key, icon) {
		var icons = this.getIcons();
		if (!icons) {
			icons = {};
			this.setIcons(icons);
		}
		icons[key] = icon;
		return this;
	}
	jsuis.defaultlf.TreeCellRenderer.prototype.getTreeCellRendererComponent = function(
			tree, value, sel, expanded, leaf, row, hasFocus) {
		var treeCellRendererComponent = new jsuis.defaultlf.Button();
		treeCellRendererComponent.setBorder(null);
		treeCellRendererComponent.setBackground(jsuis.Color.Black.withAlpha(0));
		treeCellRendererComponent.setText(nvl(value, "").toString(), jsuis.BorderConstraints.CENTER.withFill(jsuis.Constants.BOTH));
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
 * jsuis.defaultlf.ClipPath
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.ClipPath = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "clipPath"));
		this.setId(jsuis.defaultlf.ClipPath.next());
	});
	var sequence = 0;
	jsuis.defaultlf.ClipPath.next = function() {
		return "ClipPath-" + sequence++;
	};
}) (jsuis);

/**
 * jsuis.defaultlf.ComponentEvent
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Event;
	jsuis.defaultlf.ComponentEvent = jsuis.Object.extend(SUPER, function(source, id) {
		SUPER.prototype.constructor.call(this, source, id);
	});
}) (jsuis);

/**
 * jsuis.defaultlf.Defs
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.Defs = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "defs"));
	});
}) (jsuis);

/**
 * jsuis.defaultlf.Frame
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.Frame = jsuis.Object.extend(SUPER, function(title) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "svg"));
		SUPER.prototype.setLayout.call(this, new jsuis.BorderLayout());
		var rootPane = new jsuis.defaultlf.RootPane();
		this.setRootPane(rootPane);
		SUPER.prototype.add.call(this, rootPane);
		var contentPane = new jsuis.defaultlf.Panel(new jsuis.BorderLayout());
		this.setContentPane(contentPane);
		this.setBackground(jsuis.Color.getColor(0xEEEEEE));
		
		var browserWindow = jsuis.defaultlf.BrowserWindow.getInstance();
		var componentListener = new jsuis.ComponentListener({
			componentResized: function(event) {
				var frame = this.getListenerComponent();
				frame.validate();
			}
		});
		componentListener.setListenerComponent(this);
		browserWindow.addComponentListener(componentListener);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Frame, {
		rootPane: null
	});
	jsuis.defaultlf.Frame.prototype.add = function(component, constraints, index) {
		var contentPane = this.getContentPane();
		contentPane.add(component, constraints, index);
	}
	jsuis.defaultlf.Frame.prototype.remove = function(component) {
		var contentPane = this.getContentPane();
		contentPane.remove(component);
	}
	jsuis.defaultlf.Frame.prototype.removeAll = function() {
		var contentPane = this.getContentPane();
		contentPane.removeAll();
	}
	jsuis.defaultlf.Frame.prototype.getLayeredPane = function() {
		var rootPane = this.getRootPane();
		return rootPane.getLayeredPane();
	}
	jsuis.defaultlf.Frame.prototype.setLayeredPane = function(contentPane) {
		var rootPane = this.getRootPane();
		rootPane.setLayeredPane(contentPane);
		return this;
	}
	jsuis.defaultlf.Frame.prototype.getMenuBar = function() {
		var rootPane = this.getRootPane();
		return rootPane.getMenuBar();
	}
	jsuis.defaultlf.Frame.prototype.setMenuBar = function(menuBar) {
		var rootPane = this.getRootPane();
		rootPane.setMenuBar(menuBar);
		return this;
	}
	jsuis.defaultlf.Frame.prototype.getContentPane = function() {
		var rootPane = this.getRootPane();
		return rootPane.getContentPane();
	}
	jsuis.defaultlf.Frame.prototype.setContentPane = function(contentPane) {
		var rootPane = this.getRootPane();
		rootPane.setContentPane(contentPane);
		return this;
	}
	jsuis.defaultlf.Frame.prototype.getLayout = function() {
		var contentPane = this.getContentPane();
		return contentPane.getLayout();
	}
	jsuis.defaultlf.Frame.prototype.setLayout = function(layout) {
		var contentPane = this.getContentPane();
		contentPane.setLayout(layout);
		return this;
	}
	jsuis.defaultlf.Frame.prototype.validate = function() {
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
	jsuis.defaultlf.Frame.prototype.doLayout = function() {
		var layout = SUPER.prototype.getLayout.call(this);
		if (layout) {
			layout.layoutContainer(this);
		}
	}
	jsuis.defaultlf.Frame.prototype.setVisible = function(visible) {
		SUPER.prototype.setVisible.call(this, visible);
		if (visible) {
			this.validate();
		}
		return this;
	}
	jsuis.defaultlf.Frame.prototype.getBackground = function() {
		var contentPane = this.getContentPane();
		return contentPane.getBackground();
	}
	jsuis.defaultlf.Frame.prototype.setBackground = function(background) {
		var contentPane = this.getContentPane();
		contentPane.setBackground(background);
		return this;
	}
	jsuis.defaultlf.Frame.prototype.dispose = function() {
		var browserWindow = jsuis.defaultlf.BrowserWindow.getInstance();
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
 * jsuis.defaultlf.GridBorder
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Border;
	jsuis.defaultlf.GridBorder = jsuis.Object.extend(SUPER, function(color, spacing) {
		SUPER.prototype.constructor.call(this);
		this.setColor(nvl(color, jsuis.Color.GRAY));
		this.setSpacing(nvl(spacing, 16));
	});
	jsuis.Object.addProperties(jsuis.defaultlf.GridBorder, {
		color: null,
		spacing: 0
	});
	jsuis.defaultlf.GridBorder.prototype.getBorderInsets = function(component) {
	}
	jsuis.defaultlf.GridBorder.prototype.paintBorder = function(component) {
	}
}) (jsuis);

/**
 * jsuis.defaultlf.Image
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.Image = jsuis.Object.extend(SUPER, function(resource) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "image"));
		if (resource) {
			this.setResource(resource);
		}
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Image, {
		resource: null
	});
	jsuis.defaultlf.Image.prototype.setResource = function(resource) {
		var element = this.getElement();
		element.setAttributeNS("http://www.w3.org/1999/xlink", "href", resource);
		this.resource = resource;
		return this;
	}
}) (jsuis);

/**
 * jsuis.defaultlf.ImageIcon
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Icon;
	jsuis.defaultlf.ImageIcon = jsuis.Object.extend(SUPER, function(resource, width, height) {
		SUPER.prototype.constructor.call(this);
		this.setResource(resource);
		this.setWidth(nvl(width, 0));
		this.setHeight(nvl(height, 0));
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ImageIcon, {
		resource: null,
		width: 0,
		height: 0
	});
	jsuis.defaultlf.ImageIcon.prototype.paintIcon = function(component) {
		var image = component.getImage();
		var resource = this.getResource();
		image.setResource(resource);
		var width = this.getWidth();
		var height = this.getHeight();
		image.setPreferredSize(new jsuis.Dimension(width, height));
	}
}) (jsuis);

/**
 * jsuis.defaultlf.Line
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.Line = jsuis.Object.extend(SUPER, function(x1, y1, x2, y2, color, thickness) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "line"));
		this.setX1(nvl(x1, 0));
		this.setY1(nvl(y1, 0));
		this.setX2(nvl(x2, 0));
		this.setY2(nvl(y2, 0));
		this.setForeground(nvl(color, jsuis.Color.GRAY));
		this.setThickness(nvl(thickness, 1));
	});
	jsuis.defaultlf.Line.prototype.getX1 = function() {
		return this.x1 || 0;
	}
	jsuis.defaultlf.Line.prototype.setX1 = function(x1) {
		this.setAttribute("x1", +nvl(x1, 0));
		this.x1 = x1;
		return this;
	}
	jsuis.defaultlf.Line.prototype.getY1 = function() {
		return this.y1 || 0;
	}
	jsuis.defaultlf.Line.prototype.setY1 = function(y1) {
		this.setAttribute("y1", +nvl(y1, 0));
		this.y1 = y1;
		return this;
	}
	jsuis.defaultlf.Line.prototype.getX2 = function() {
		return this.x2 || 0;
	}
	jsuis.defaultlf.Line.prototype.setX2 = function(x2) {
		this.setAttribute("x2", +nvl(x2, 0));
		this.x2 = x2;
		return this;
	}
	jsuis.defaultlf.Line.prototype.getY2 = function() {
		return this.y2 || 0;
	}
	jsuis.defaultlf.Line.prototype.setY2 = function(y2) {
		this.setAttribute("y2", +nvl(y2, 0));
		this.y2 = y2;
		return this;
	}
	jsuis.defaultlf.Line.prototype.getThickness = function() {
		return this.thickness;
	}
	jsuis.defaultlf.Line.prototype.setThickness = function(thickness) {
		this.setStyleProperty("stroke-width", thickness);
		this.thickness = thickness;
		return this;
	}
}) (jsuis);

/**
 * jsuis.defaultlf.LineBorder
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Border;
	jsuis.defaultlf.LineBorder = jsuis.Object.extend(SUPER, function(color, thickness, rx, ry) {
		SUPER.prototype.constructor.call(this);
		this.setColor(nvl(color, jsuis.Color.GRAY));
		this.setThickness(nvl(thickness, 1));
		rx = nvl(rx, 0);
		ry = nvl(ry, rx);
		this.setRx(rx);
		this.setRy(ry);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.LineBorder, {
		color: null,
		thickness: 0,
		rx: 0,
		ry: 0
	});
	jsuis.defaultlf.LineBorder.prototype.getBorderInsets = function(component) {
		var thickness = this.getThickness();
		return new jsuis.Insets(thickness, thickness, thickness, thickness);
	}
	jsuis.defaultlf.LineBorder.prototype.paintBorder = function(component) {
		var graphics = component.getGraphics();
		var color = this.getColor();
		graphics.setForeground(color);
		var thickness = this.getThickness();
		graphics.setStyleProperty("stroke-width", thickness);
		var width = graphics.getWidth();
		var height = graphics.getHeight();
		var rx = this.getRx();
		var ry = this.getRy();
		if (rx && ry) {
			var x1 = thickness / 2 + rx;
			var y1 = thickness / 2;
			var x2 = width - thickness / 2 - rx;
			var y2 = y1;
			var x3 = width - thickness / 2;
			var y3 = thickness / 2 + ry;
			var x4 = x3;
			var y4 = height - thickness / 2 - ry;
			var x5 = x2;
			var y5 = height - thickness / 2;
			var x6 = x1;
			var y6 = y5;
			var x7 = thickness / 2;
			var y7 = y4;
			var x8 = x7;
			var y8 = y3;
			graphics.setResource("Mx1,y1Lx2,y2Arx,ry,0,0,1,x3,y3Lx4,y4Arx,ry,0,0,1,x5,y5Lx6,y6Arx,ry,0,0,1,x7,y7Lx8,y8Arx,ry,0,0,1,x1,y1"
					.replace(/rx/g, rx).replace(/ry/g, ry)
					.replace(/x1/g, x1).replace(/y1/g, y1)
					.replace(/x2/g, x2).replace(/y2/g, y2)
					.replace(/x3/g, x3).replace(/y3/g, y3)
					.replace(/x4/g, x4).replace(/y4/g, y4)
					.replace(/x5/g, x5).replace(/y5/g, y5)
					.replace(/x6/g, x6).replace(/y6/g, y6)
					.replace(/x7/g, x7).replace(/y7/g, y7)
					.replace(/x8/g, x8).replace(/y8/g, y8));
		} else {
			var x1 = thickness / 2;
			var y1 = thickness / 2;
			var x2 = width - thickness / 2;
			var y2 = height - thickness / 2;
			graphics.setResource("Mx1,y1Lx2,y1Lx2,y2Lx1,y2Z"
					.replace(/x1/g, x1).replace(/y1/g, y1)
					.replace(/x2/g, x2).replace(/y2/g, y2));
		}
	}
}) (jsuis);

/**
 * jsuis.defaultlf.Panel
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.Panel = jsuis.Object.extend(SUPER, function(layout) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "g"));
		this.setLayout(layout !== undefined ? layout : new jsuis.FlowLayout());
		this.setGraphics(new jsuis.defaultlf.Path());
		this.setBorder(null);
		this.setBackground(null);
	});
	jsuis.defaultlf.Panel.prototype.setGraphics = function(graphics) {
		var oldGraphics = this.getGraphics();
		if (oldGraphics) {
			this.removeChild(oldGraphics);
		}
		if (graphics) {
			this.addChild(graphics);
		}
		this.graphics = graphics;
		return this;
	}
	jsuis.defaultlf.Panel.prototype.setX = function(x) {
		this.setAttribute("transform", "translate(" + nvl(x, 0) + "," + this.getY() + ")");
		var graphics = this.getGraphics();
		var outsets = this.getOutsets();
		graphics.setX(outsets.getLeft());
		this.x = x;
		return this;
	}
	jsuis.defaultlf.Panel.prototype.setY = function(y) {
		this.setAttribute("transform", "translate(" + this.getX() + "," + nvl(y, 0) + ")");
		var graphics = this.getGraphics();
		var outsets = this.getOutsets();
		graphics.setY(outsets.getTop());
		this.y = y;
		return this;
	}
	jsuis.defaultlf.Panel.prototype.setWidth = function(width) {
		this.width = width;
		var outsets = this.getOutsets();
		width -= outsets.getLeft() + outsets.getRight();
		if (width >= 0) {
			var graphics = this.getGraphics();
			graphics.setWidth(width);
		}
		return this;
	}
	jsuis.defaultlf.Panel.prototype.setHeight = function(height) {
		this.height = height;
		var outsets = this.getOutsets();
		height -= outsets.getTop() + outsets.getBottom();
		if (height >= 0) {
			var graphics = this.getGraphics();
			graphics.setHeight(height);
		}
		return this;
	}
	jsuis.defaultlf.Panel.prototype.setSize = function(size) {
		SUPER.prototype.setSize.call(this, size);
		var border = this.getBorder();
		border = nvl(border, new jsuis.defaultlf.Border());
		border.paintBorder(this);
		return this;
	}
	jsuis.defaultlf.Panel.prototype.setVisible = function(visible) {
		var graphics = this.getGraphics();
		graphics.setVisible(visible);
		SUPER.prototype.setVisible.call(this, visible);
		return this;
	}
	jsuis.defaultlf.Panel.prototype.setBackground = function(background) {
		var graphics = this.getGraphics();
		graphics.setBackground(background);
		this.background = background;
		return this;
	}
}) (jsuis);

/**
 * jsuis.defaultlf.Path
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.Path = jsuis.Object.extend(SUPER, function(resource) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "path"));
		if (resource) {
			this.setResource(resource);
		}
	});
	jsuis.defaultlf.Path.prototype.setResource = function(resource) {
		this.setAttribute("d", resource);
		return this;
	}
	jsuis.defaultlf.Path.prototype.setX = function(x) {
		this.setAttribute("transform", "translate(" + nvl(x, 0) + "," + this.getY() + ")");
		this.x = x;
		return this;
	}
	jsuis.defaultlf.Path.prototype.setY = function(y) {
		this.setAttribute("transform", "translate(" + this.getX() + "," + nvl(y, 0) + ")");
		this.y = y;
		return this;
	}
}) (jsuis);

/**
 * jsuis.defaultlf.Rect
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.Rect = jsuis.Object.extend(SUPER, function(x, y, width, height) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "rect"));
		this.setX(nvl(x, 0));
		this.setY(nvl(y, 0));
		this.setWidth(nvl(width, 0));
		this.setHeight(nvl(height, 0));
	});
}) (jsuis);

/**
 * jsuis.defaultlf.ScrollButtonArrowBorder
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Border;
	jsuis.defaultlf.ScrollButtonArrowBorder = jsuis.Object.extend(SUPER, function(direction) {
		this.setDirection(direction);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ScrollButtonArrowBorder, {
		direction: null
	});
	jsuis.defaultlf.ScrollButtonArrowBorder.prototype.paintBorder = function(component) {
		var graphics = component.getGraphics();
		var direction = this.getDirection();
		switch (direction) {
		case jsuis.Constants.SOUTH:
			graphics.setResource("M8,11l-4,-6h8Z");
			break;
		case jsuis.Constants.EAST:
			graphics.setResource("M11,8l-6,-4v8Z");
			break;
		case jsuis.Constants.WEST:
			graphics.setResource("M5,8l6,-4v8Z");
			break;
		case jsuis.Constants.NORTH:
		default:
			graphics.setResource("M8,5l-4,6h8Z");
		}
	}
}) (jsuis);

/**
 * jsuis.defaultlf.ScrollButtonBorder
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Border;
	jsuis.defaultlf.ScrollButtonBorder = jsuis.Object.extend(SUPER, function(direction) {
		this.setDirection(direction);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ScrollButtonBorder, {
		direction: null
	});
	jsuis.defaultlf.ScrollButtonBorder.prototype.paintBorder = function(component) {
		var graphics = component.getGraphics();
		var direction = this.getDirection();
		switch (direction) {
		case jsuis.Constants.SOUTH:
			graphics.setResource("M0,-8a8,8,0,0,0,16,0v16a8,8,0,0,1,-16,0Z");
			break;
		case jsuis.Constants.EAST:
			graphics.setResource("M-8,0a8,8,0,0,1,0,16h16a8,8,0,0,0,0,-16Z");
			break;
		case jsuis.Constants.WEST:
			graphics.setResource("M24,0a8,8,0,0,0,0,16h-16a8,8,0,0,1,0,-16Z");
			break;
		case jsuis.Constants.NORTH:
		default:
			graphics.setResource("M0,24a8,8,0,0,1,16,0v-16a8,8,0,0,0,-16,0Z");
		}
	}
}) (jsuis);

/**
 * jsuis.defaultlf.TabComponentBorder
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Border;
	jsuis.defaultlf.TabComponentBorder = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.defaultlf.TabComponentBorder.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets(0, 3);
	}
	jsuis.defaultlf.TabComponentBorder.prototype.paintBorder = function(component) {
		var parent = component.getParent();
		if (!parent) {
			return;
		}
		var parentComponents = parent.getComponents();
		var index = parentComponents.indexOf(component);
		var graphics = component.getGraphics();
		graphics.setForeground(jsuis.Color.Gray);
		var selected = component.isSelected();
		if (selected) {
			graphics.setBackground(jsuis.Color.LightGray);
		} else {
			graphics.setBackground(jsuis.Color.LightSlateGray);
		}
		var width = graphics.getWidth();
		var height = graphics.getHeight();
		var x1 = 6.5;
		var y1 = height - .5;
		if (selected || !index) {
			x1 = .5;
		}
		var x2 = 3.5;
		var y2 = height / 2 + .5;
		var x3 = 6.5;
		var y3 = 1.5;
		var x4 = width - x3;
		var y4 = y3;
		var x5 = width -.5;
		var y5 = y1;
		graphics.setResource("Mx1,y1Lx2,y2Lx3,y3Lx4,y4Lx5,y5"
				.replace(/x1/g, x1).replace(/y1/g, y1)
				.replace(/x2/g, x2).replace(/y2/g, y2)
				.replace(/x3/g, x3).replace(/y3/g, y3)
				.replace(/x4/g, x4).replace(/y4/g, y4)
				.replace(/x5/g, x5).replace(/y5/g, y5));
	}
}) (jsuis);

/**
 * jsuis.defaultlf.Text
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.Text = jsuis.Object.extend(SUPER, function(text) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "text"));
		SUPER.prototype.setEnabled.call(this, false);
		this.setText(nvl(text, ""));
		this.setFont(new jsuis.Font("Arial", "bold", 12));
		this.setForeground(jsuis.Color.Black);
		this.setDisabledColor(jsuis.Color.Gray);
		this.setSelectable(false);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Text, {
		text: null,
		color: null,
		disabledColor: null
	});
	jsuis.defaultlf.Text.prototype.getText = function() {
		var element = this.getElement();
		return element.textContent;
	}
	jsuis.defaultlf.Text.prototype.setText = function(text) {
		var element = this.getElement();
		element.textContent = text;
		return this;
	}
	jsuis.defaultlf.Text.prototype.setWidth = function(width) {
		this.width = width;
		return this;
	}
	jsuis.defaultlf.Text.prototype.setHeight = function(height) {
		this.height = height;
		return this;
	}
	jsuis.defaultlf.Text.prototype.getBackground = function() {
		SUPER.prototype.getForeground.call(this);
	}
	jsuis.defaultlf.Text.prototype.setBackground = function(background) {
		SUPER.prototype.setForeground.call(this, background);
		return this;
	}
	jsuis.defaultlf.Text.prototype.getForeground = function() {
		SUPER.prototype.getBackground.call(this);
	}
	jsuis.defaultlf.Text.prototype.setForeground = function(foreground) {
		this.setColor(foreground);
		SUPER.prototype.setBackground.call(this, foreground);
		return this;
	}
	jsuis.defaultlf.Text.prototype.setEnabled = function(enabled) {
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
	jsuis.defaultlf.Text.prototype.validate = function() {
		var element = this.getElement();
		var outsets = this.getOutsets();
		this.setAttribute("transform", "translate(" + 0 + ","
				+ (this.getY() + outsets.getTop() - element.getBBox().y) + ")");
		SUPER.prototype.validate.call(this);
	}
}) (jsuis);

/**
 * jsuis.defaultlf.TextFieldEditor
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.TextFieldEditor = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElement("input"));
		this.setAttribute("type", "text");
		this.setStyleProperty("position", "absolute");
		this.setStyleProperty("padding", "0");
		this.setStyleProperty("margin", "0");
		this.setStyleProperty("border", "0");
		this.setStyleProperty("outline", "none");
		this.setStyleProperty("background-color", "transparent");
		this.setVisible(false);
		new jsuis.defaultlf.Component(document.body).add(this);
		
		this.addFocusListener(new jsuis.FocusListener({
			focusLost: function(event) {
				var textFieldEditor = event.getSource();
				var textField = textFieldEditor.getTextField();
				if (textField) {
					textFieldEditor.uninstall(textField);
				}
			}
		}));
	});
	jsuis.Object.addProperties(jsuis.defaultlf.TextFieldEditor, {
		textField: null
	});
	var instance;
	jsuis.defaultlf.TextFieldEditor.getInstance = function() {
		if (!instance) {
			instance = new jsuis.defaultlf.TextFieldEditor();
		}
		return instance;
	}
	jsuis.defaultlf.TextFieldEditor.prototype.install = function(textField) {
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
			label.setStyleProperty("visibility", "hidden");
			this.setVisible(true);
		}
		this.textField = textField;
		return this;
	}
	jsuis.defaultlf.TextFieldEditor.prototype.uninstall = function(textField) {
		var label = textField.getLabel();
		label.setText(this.getText());
		this.setVisible(false);
		label.setStyleProperty("visibility", "visible");
		textField.setEditor(null);
	}
	jsuis.defaultlf.TextFieldEditor.prototype.getText = function() {
		var element = this.getElement();
		return element.value;
	}
	jsuis.defaultlf.TextFieldEditor.prototype.setText = function(text) {
		var element = this.getElement();
		element.value = nvl(text, "");
		return this;
	}
	jsuis.defaultlf.TextFieldEditor.prototype.setX = function(x) {
		var outsets = this.getOutsets();
		this.setStyleProperty("left", (+nvl(x, 0) + outsets.getLeft()) + "px");
		this.x = x;
		return this;
	}
	jsuis.defaultlf.TextFieldEditor.prototype.setY = function(y) {
		var outsets = this.getOutsets();
		this.setStyleProperty("top", (+nvl(y, 0) + outsets.getTop()) + "px");
		this.y = y;
		return this;
	}
	jsuis.defaultlf.TextFieldEditor.prototype.setWidth = function(width) {
		var outsets = this.getOutsets();
		width -= outsets.getLeft() + outsets.getRight();
		if (width >= 0) {
			this.setStyleProperty("width", width + "px");
		}
		this.width = width;
		return this;
	}
	jsuis.defaultlf.TextFieldEditor.prototype.setHeight = function(height) {
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
 * jsuis.defaultlf.Viewport
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.Viewport = jsuis.Object.extend(SUPER, function(view, viewBox) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "svg"));
		if ((view !== null) && (view !== undefined)) {
			this.setView(view);
		}
		if ((viewBox !== null) && (viewBox !== undefined)) {
			this.setViewBox(viewBox);
		}
		this.setAttribute("preserveAspectRatio", "none");
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Viewport, {
		view: null,
		viewPosition: null
	});
	jsuis.defaultlf.Viewport.prototype.setView = function(view) {
		this.removeAll();
		this.add(view);
		this.view = view;
		return this;
	}
	jsuis.defaultlf.Viewport.prototype.getGraphics = function() {
		var view = this.getView();
		if (view) {
			return view.getPeer().getGraphics();
		}
	}
	jsuis.defaultlf.Viewport.prototype.getViewBox = function() {
		return this.viewBox || new jsuis.Rectangle();
	}
	jsuis.defaultlf.Viewport.prototype.setViewBox = function(viewBox) {
		this.viewBox = viewBox;
		this.setAttribute("viewBox", viewBox.getX() + " " + viewBox.getY() + " " + viewBox.getWidth() + " " + viewBox.getHeight());
		return this;
	}
}) (jsuis);

/**
 * jsuis.defaultlf.FocusEvent
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.ComponentEvent;
	jsuis.defaultlf.FocusEvent = jsuis.Object.extend(SUPER, function(source, id, temporary, opposite) {
		SUPER.prototype.constructor.call(this, source, id);
		this.setTemporary(temporary);
		this.setOpposite(opposite);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.FocusEvent, {
		opposite: null
	});
	jsuis.defaultlf.FocusEvent.prototype.setTemporary = function(opposite) {
		this.opposite = opposite;
	}
	jsuis.defaultlf.FocusEvent.prototype.isTemporary = function() {
		return this.opposite;
	}
	jsuis.defaultlf.FocusEvent.prototype.getOpposite = function() {
		var opposite = this.opposite;
		if (opposite) {
			return opposite;
		}
		var domEvent = this.getDomEvent();
		var relatedTarget = domEvent.relatedTarget;
		if (relatedTarget) {
			opposite = new jsuis.defaultlf.Component(relatedTarget);
			this.setOpposite(opposite);
		}
		return opposite;
	}
}) (jsuis);

/**
 * jsuis.defaultlf.InputEvent
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.ComponentEvent;
	jsuis.defaultlf.InputEvent = jsuis.Object.extend(SUPER, function(source, id,
			when, modifiers) {
		SUPER.prototype.constructor.call(this, source, id);
		this.setWhen(when);
		this.setModifiers(modifiers);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.InputEvent, {
		when: 0,
		modifiers: 0
	});
	
	jsuis.defaultlf.InputEvent.SHIFT_MASK = 1;
	jsuis.defaultlf.InputEvent.CTRL_MASK = 2;
	jsuis.defaultlf.InputEvent.META_MASK = 4;
	jsuis.defaultlf.InputEvent.ALT_MASK = 8;
	
	jsuis.defaultlf.InputEvent.SHIFT_DOWN_MASK = 64;
	jsuis.defaultlf.InputEvent.CTRL_DOWN_MASK = 128;
	jsuis.defaultlf.InputEvent.META_DOWN_MASK = 256;
	jsuis.defaultlf.InputEvent.ALT_DOWN_MASK = 512;
	
	jsuis.defaultlf.InputEvent.prototype.getWhen = function() {
		var when = this.when;
		if (when !== null && when !== undefined) {
			return when;
		}
		var domEvent = this.getDomEvent();
		if (domEvent) {
			when = domEvent.timeStamp;
		} else {
			when = new Date().getTime();
		}
		this.setWhen(when);
		return when;
	}
	jsuis.defaultlf.InputEvent.prototype.getModifiers = function() {
		var modifiers = this.modifiers;
		if (modifiers !== null && modifiers !== undefined) {
			return modifiers;
		}
		var domEvent = this.getDomEvent();
		if (domEvent) {
			modifiers = (domEvent.shiftKey ? (jsuis.defaultlf.InputEvent.SHIFT_MASK | jsuis.defaultlf.InputEvent.SHIFT_DOWN_MASK) : 0)
			| (domEvent.ctrlKey ? (jsuis.defaultlf.InputEvent.CTRL_MASK | jsuis.defaultlf.InputEvent.CTRL_DOWN_MASK) : 0)
			| (domEvent.altKey ? (jsuis.defaultlf.InputEvent.ALT_MASK | jsuis.defaultlf.InputEvent.ALT_DOWN_MASK) : 0)
			| (domEvent.metaKey ? (jsuis.defaultlf.InputEvent.META_MASK | jsuis.defaultlf.InputEvent.META_DOWN_MASK) : 0);
			this.setModifiers(modifiers);
		}
		return modifiers;
	}
}) (jsuis);

/**
 * jsuis.defaultlf.Label
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.Label = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, null);
		this.setLayout(new jsuis.BorderLayout());
		this.setText(text);
		this.setIcon(icon);
		this.setIconTextGap(4);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Label, {
		text: null,
		icon: null,
		iconTextGap: 0,
		label: null,
	});
	jsuis.defaultlf.Label.prototype.getText = function() {
		var label = this.getLabel();
		if (label) {
			return label.getText();
		}
		return "";
	}
	jsuis.defaultlf.Label.prototype.setText = function(text, textConstraints) {
		if (text) {
			var label = this.getLabel();
			if (!label) {
				label = new jsuis.defaultlf.Text();
				this.setLabel(label);
				this.add(label, nvl(textConstraints,
						jsuis.BorderConstraints.CENTER.withFill(jsuis.Constants.NONE)));
			} else if (textConstraints) {
				label.setConstraints(textConstraints);
			}
			label.setText(text);
		}
		return this;
	}
	jsuis.defaultlf.Label.prototype.setIcon = function(icon, constraints) {
		if (icon) {
			var image = this.getImage();
			if (!image) {
				image = new jsuis.defaultlf.Image();
				this.setImage(image);
				this.add(image, nvl(constraints, jsuis.BorderConstraints.WEST.withFill(jsuis.Constants.NONE)));
				image.setEnabled(false);
			}
			icon.paintIcon(this);
		}
		this.icon = icon;
		return this;
	}
	jsuis.defaultlf.Label.prototype.setIconTextGap = function(iconTextGap) {
		var layout = this.getLayout();
		layout.setHgap(iconTextGap).setVgap(iconTextGap);
		this.iconTextGap = iconTextGap;
		return this;
	}
	jsuis.defaultlf.Label.prototype.setForeground = function(foreground) {
		var label = this.getLabel();
		if (label) {
			label.setForeground(foreground);
		}
		this.foreground = foreground;
		return this;
	}
	jsuis.defaultlf.Label.prototype.setFont = function(font) {
		var label = this.getLabel();
		if (label) {
			label.setFont(font);
		}
		this.font = font;
		return this;
	}
	jsuis.defaultlf.Label.prototype.setEnabled = function(enabled) {
		var label = this.getLabel();
		if (label) {
			label.setEnabled(enabled);
		}
		SUPER.prototype.setEnabled.call(this, enabled);
		return this;
	}
}) (jsuis);

/**
 * jsuis.defaultlf.LayeredPane
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.LayeredPane = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, null);
	});
	jsuis.defaultlf.LayeredPane.prototype.add = function(component, constraints, index) {
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
 * jsuis.defaultlf.MenuBar
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.MenuBar = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, new jsuis.FlowLayout(jsuis.Constants.LEFT, 0));
		this.setBackground(jsuis.Color.Black.withAlpha(.1 * 255));
	});
	jsuis.Object.addProperties(jsuis.defaultlf.MenuBar, {
		selection: null
	});
	jsuis.defaultlf.MenuBar.prototype.isSelected = function(menu) {
		var selection = this.getSelection();
		return (menu === selection);
	}
	jsuis.defaultlf.MenuBar.prototype.setSelected = function(menu) {
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
 * jsuis.defaultlf.PopupMenu
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.PopupMenu = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		this.setBorder(new jsuis.defaultlf.LineBorder(jsuis.Color.Black.withAlpha(.4 * 255)));
		this.setBackground(jsuis.Color.Black.withAlpha(.1 * 255));
	});
	jsuis.defaultlf.PopupMenu.prototype.add = function(component, constraints, index) {
		SUPER.prototype.add.call(this, component, nvl(constraints, jsuis.BorderConstraints.NORTH), index);
	}
	jsuis.defaultlf.PopupMenu.prototype.show = function(invoker, x, y) {
		var invokerX = 0;
		var invokerY = 0;
		var component = invoker;
		while (component && !(component instanceof jsuis.defaultlf.Frame)) {
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
	jsuis.defaultlf.PopupMenu.prototype.setVisible = function(visible) {
		SUPER.prototype.setVisible.call(this, visible);
		if (visible) {
			this.setSize(this.getPreferredSize());
			this.validate();
		}
		return this;
	}
}) (jsuis);

/**
 * jsuis.defaultlf.PopupMenuSeparator
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.PopupMenuSeparator = jsuis.Object.extend(SUPER, function(size) {
		SUPER.prototype.constructor.call(this, null);
		var line = new jsuis.defaultlf.Line();
		this.setLine(line);
		this.add(line);
		this.setPreferredSize(nvl(size, new jsuis.Dimension(5, 5)));
	});
	jsuis.Object.addProperties(jsuis.defaultlf.PopupMenuSeparator, {
		line: null
	});
	jsuis.defaultlf.PopupMenuSeparator.prototype.doLayout = function() {
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
 * jsuis.defaultlf.ScrollBar
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.ScrollBar = jsuis.Object.extend(SUPER, function(orientation) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		orientation = nvl(orientation, jsuis.defaultlf.ScrollBar.VERTICAL);
		this.setOrientation(orientation);
		
		var layeredPane = new jsuis.defaultlf.LayeredPane();
		this.add(layeredPane);
		layeredPane.setLayout(new jsuis.BorderLayout());
		
		var scrollTrack = new jsuis.defaultlf.ScrollTrack(orientation);
		this.setScrollTrack(scrollTrack);
		layeredPane.add(scrollTrack);
		
		var scrollThumbPanel = new jsuis.defaultlf.Panel(null);
		layeredPane.add(scrollThumbPanel);
		
		var scrollThumb = new jsuis.defaultlf.ScrollThumb(orientation);
		this.setScrollThumb(scrollThumb);
		scrollThumbPanel.add(scrollThumb);
		scrollThumb.setBounds(new jsuis.Rectangle(0, 0, 16, 16));
		
		var decreaseButton;
		var increaseButton;
		if (orientation === jsuis.Constants.HORIZONTAL) {
			decreaseButton = new jsuis.defaultlf.ScrollButton(jsuis.Constants.WEST);
			this.add(decreaseButton, jsuis.BorderConstraints.WEST);
			increaseButton = new jsuis.defaultlf.ScrollButton(jsuis.Constants.EAST);
			this.add(increaseButton, jsuis.BorderConstraints.EAST);
		} else {
			decreaseButton = new jsuis.defaultlf.ScrollButton(jsuis.Constants.NORTH);
			this.add(decreaseButton, jsuis.BorderConstraints.NORTH);
			increaseButton = new jsuis.defaultlf.ScrollButton(jsuis.Constants.SOUTH);
			this.add(increaseButton, jsuis.BorderConstraints.SOUTH);
		}
		this.setDecreaseButton(decreaseButton);
		this.setIncreaseButton(increaseButton);
		
		var scrollThumbMouseListener = new jsuis.MouseListener({
			mousePressed: function(event) {
				var scrollBar = this.getListenerComponent();
				var point = event.getPoint();
				scrollBar.setScrollThumbPressedPoint(point);
			}
		});
		scrollThumbMouseListener.setListenerComponent(this);
		scrollThumb.addMouseListener(scrollThumbMouseListener);
		
		var scrollThumbMouseMotionListener = new jsuis.MouseMotionListener({
			mouseDragged: function(event) {
				var scrollBar = this.getListenerComponent();
				var point = event.getPoint();
				var pressedPoint = scrollBar.getScrollThumbPressedPoint();
				var scrollTrack = scrollBar.getScrollTrack();
				var scrollThumb = scrollBar.getScrollThumb();
				var extent = scrollBar.getExtent();
				var maximum = scrollBar.getMaximum();
				var orientation = scrollBar.getOrientation();
				if (orientation === jsuis.Constants.HORIZONTAL) {
					var dx = point.getX() - pressedPoint.getX();
					var maximumX = scrollTrack.getWidth() - scrollThumb.getWidth();
					var x = Math.min(Math.max(scrollThumb.getX() + dx, 0), maximumX);
					scrollThumb.setX(x);
					if (maximumX > 0) {
						scrollBar.setValue((maximum - extent) * x / maximumX);
					}
				} else {
					var dy = point.getY() - pressedPoint.getY();
					var maximumY = scrollTrack.getHeight() - scrollThumb.getHeight();
					var y = Math.min(Math.max(scrollThumb.getY() + dy, 0), maximumY);
					scrollThumb.setY(y);
					if (maximumY > 0) {
						scrollBar.setValue((maximum - extent) * y / maximumY);
					}
				}
			}
		});
		scrollThumbMouseMotionListener.setListenerComponent(this);
		scrollThumb.addMouseMotionListener(scrollThumbMouseMotionListener);
		
		var scrollThumbTouchListener = new jsuis.TouchListener({
			touchPressed: function(event) {
				scrollThumbMouseListener.mousePressed(event);
				event.stopPropagation();
			},
			touchMoved: function(event) {
				scrollThumbMouseMotionListener.mouseDragged(event);
				event.preventDefault();
				event.stopPropagation();
			}
		});
		scrollThumb.addTouchListener(scrollThumbTouchListener);
		
		var scrollTrackMouseListener = new jsuis.MouseListener({
			mousePressed: function(event) {
				var scrollBar = this.getListenerComponent();
				var value = scrollBar.getValue();
				var minimum = scrollBar.getMinimum();
				var maximum = scrollBar.getMaximum();
				var extent = scrollBar.getExtent();
				var blockIncrement = scrollBar.getBlockIncrement();
				var scrollThumb = scrollBar.getScrollThumb();
				var point = event.getPoint();
				var timer = scrollBar.getTimer();
				var orientation = scrollBar.getOrientation();
				if (orientation === jsuis.Constants.HORIZONTAL) {
					if (point.x < (scrollThumb.getX() + scrollThumb.getWidth() / 2)) {
						scrollBar.setValue(Math.max(value - blockIncrement, minimum)).validate();
						scrollBar.setIncrement(-blockIncrement);
						timer.start();
					} else {
						scrollBar.setValue(Math.min(value + blockIncrement, maximum - extent)).validate();
						scrollBar.setIncrement(blockIncrement);
						timer.start();
					}
				} else {
					if (point.y < (scrollThumb.getY() + scrollThumb.getHeight() / 2)) {
						scrollBar.setValue(Math.max(value - blockIncrement, minimum)).validate();
						scrollBar.setIncrement(-blockIncrement);
						timer.start();
					} else {
						scrollBar.setValue(Math.min(value + blockIncrement, maximum - extent)).validate();
						scrollBar.setIncrement(blockIncrement);
						timer.start();
					}
				}
			},
			mouseReleased: function(event) {
				var scrollBar = this.getListenerComponent();
				var timer = scrollBar.getTimer();
				timer.stop();
			}
		});
		scrollTrackMouseListener.setListenerComponent(this);
		scrollTrack.addMouseListener(scrollTrackMouseListener);
		
		var decreaseMouseListener = new jsuis.MouseListener({
			mousePressed: function(event) {
				var scrollBar = this.getListenerComponent();
				var value = scrollBar.getValue();
				var unitIncrement = scrollBar.getUnitIncrement();
				var minimum = scrollBar.getMinimum();
				value = Math.max(value - unitIncrement, minimum);
				scrollBar.setValue(value);
				scrollBar.validate();
				scrollBar.setIncrement(-unitIncrement);
				var timer = scrollBar.getTimer();
				timer.start();
			},
			mouseReleased: function(event) {
				var scrollBar = this.getListenerComponent();
				var timer = scrollBar.getTimer();
				timer.stop();
			}
		});
		decreaseMouseListener.setListenerComponent(this);
		decreaseButton.addMouseListener(decreaseMouseListener);
		
		var increaseMouseListener = new jsuis.MouseListener({
			mousePressed: function(event) {
				var scrollBar = this.getListenerComponent();
				var value = scrollBar.getValue();
				var unitIncrement = scrollBar.getUnitIncrement();
				var maximum = scrollBar.getMaximum();
				var extent = scrollBar.getExtent();
				value = Math.min(value + unitIncrement, maximum - extent);
				scrollBar.setValue(value);
				scrollBar.validate();
				scrollBar.setIncrement(unitIncrement);
				var timer = scrollBar.getTimer();
				timer.start();
			},
			mouseReleased: function(event) {
				var scrollBar = this.getListenerComponent();
				var timer = scrollBar.getTimer();
				timer.stop();
			}
		});
		increaseMouseListener.setListenerComponent(this);
		increaseButton.addMouseListener(increaseMouseListener);
		
		var timerActionListener = new jsuis.ActionListener({
			actionPerformed: function(event) {
				var scrollBar = this.getListenerComponent();
				var value = scrollBar.getValue();
				var increment = scrollBar.getIncrement();
				var minimum = scrollBar.getMinimum();
				var maximum = scrollBar.getMaximum();
				var extent = scrollBar.getExtent();
				value = Math.min(Math.max(value + increment, minimum), maximum - extent);
				scrollBar.setValue(value);
				scrollBar.validate();
			}
		});
		timerActionListener.setListenerComponent(this);
		this.setTimerActionListener(timerActionListener);
		
		var timer = new jsuis.defaultlf.Timer(50, timerActionListener);
		this.setTimer(timer);
		timer.setInitialDelay(250);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ScrollBar, {
		orientation: null,
		value: 0,
		extent: 0,
		minimum: 0,
		maximum: 0,
		increment: 0,
		unitIncrement: 0,
		blockIncrement: 0,
		scrollTrack: null,
		increaseButton: null,
		decreaseButton: null,
		scrollThumb: null,
		scrollThumbPressedPoint: null,
		timerActionListener: null,
		timer: null
	});
	jsuis.defaultlf.ScrollBar.prototype.getValue = function() {
		return this.value || 0;
	}
	jsuis.defaultlf.ScrollBar.prototype.setValue = function(value) {
		var oldValue = this.value;
		this.value = value;
		this.firePropertyChange("value", oldValue, value);
		return this;
	}
	jsuis.defaultlf.ScrollBar.prototype.getExtent = function() {
		return nvl(this.extent, 32);
	}
	jsuis.defaultlf.ScrollBar.prototype.getMinimum = function() {
		return nvl(this.minimum, 0);
	}
	jsuis.defaultlf.ScrollBar.prototype.getMaximum = function() {
		return nvl(this.maximum, 1);
	}
	jsuis.defaultlf.ScrollBar.prototype.getUnitIncrement = function() {
		return nvl(this.unitIncrement, 16);
	}
	jsuis.defaultlf.ScrollBar.prototype.getBlockIncrement = function() {
		return nvl(this.blockIncrement, (this.getExtent() - this.getUnitIncrement()));
	}
	jsuis.defaultlf.ScrollBar.prototype.validate = function() {
		SUPER.prototype.validate.call(this);
		var value = this.getValue();
		var extent = this.getExtent();
		var minimum = this.getMinimum();
		var maximum = this.getMaximum();
		var scrollTrack = this.getScrollTrack();
		var scrollThumb = this.getScrollThumb();
		var orientation = this.getOrientation();
		if (orientation === jsuis.Constants.HORIZONTAL) {
			var scrollTrackWidth = scrollTrack.getWidth();
			var scrollThumbWidth = scrollTrackWidth * (extent / (maximum - minimum));
			scrollThumbWidth = Math.min(Math.max(scrollThumbWidth,
					scrollThumb.getMinimumSize().getWidth()), scrollTrackWidth);
			var scrollThumbX = scrollTrackWidth - scrollThumbWidth;
			if ((maximum - minimum) === extent) {
				scrollThumbX = 0;
			} else if (value < (maximum - extent)) {
				scrollThumbX = (scrollTrackWidth - scrollThumbWidth) * (value - minimum) / (maximum - minimum - extent);
			}
			scrollThumb.setBounds(new jsuis.Rectangle(Math.round(scrollThumbX), scrollThumb.getY(), Math.round(scrollThumbWidth), scrollThumb.getHeight()));
		} else {
			var scrollTrackHeight = scrollTrack.getHeight();
			var scrollThumbHeight = scrollTrackHeight * (extent / (maximum - minimum));
			scrollThumbHeight = Math.min(Math.max(scrollThumbHeight,
					scrollThumb.getMinimumSize().getHeight()), scrollTrackHeight);
			var scrollThumbY = scrollTrackHeight - scrollThumbHeight;
			if ((maximum - minimum) === extent) {
				scrollThumbY = 0;
			} else if (value < (maximum - extent)) {
				scrollThumbY = (scrollTrackHeight - scrollThumbHeight) * (value - minimum) / (maximum - minimum - extent);
			}
			scrollThumb.setBounds(new jsuis.Rectangle(scrollThumb.getX(), Math.round(scrollThumbY), scrollThumb.getWidth(), Math.round(scrollThumbHeight)));
		}
		scrollThumb.validate();
	}
}) (jsuis);

/**
 * jsuis.defaultlf.ScrollThumb
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.ScrollThumb = jsuis.Object.extend(SUPER, function(orientation) {
		SUPER.prototype.constructor.call(this, null);
		this.setOrientation(nvl(orientation, jsuis.Constants.VERTICAL));
		this.setBorder(new jsuis.defaultlf.LineBorder(null, 0, 8));
		this.setBackground(jsuis.Color.White.withAlpha(.4 * 255));
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ScrollThumb, {
		orientation: null
	});
	jsuis.defaultlf.ScrollThumb.prototype.getMinimumSize = function() {
		var orientation = this.getOrientation();
		if (orientation === jsuis.Constants.HORIZONTAL) {
			return new jsuis.Dimension(32, 16);
		} else {
			return new jsuis.Dimension(16, 32);
		}
	}
	jsuis.defaultlf.ScrollThumb.prototype.setHeight = function(height) {
		SUPER.prototype.setHeight.call(this, height);
		return this;
	}
}) (jsuis);

/**
 * jsuis.defaultlf.ScrollTrack
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.ScrollTrack = jsuis.Object.extend(SUPER, function(direction) {
		SUPER.prototype.constructor.call(this, null);
		direction = nvl(direction, jsuis.Constants.VERTICAL);
		this.setDirection(direction);
		this.setBorder(new jsuis.defaultlf.LineBorder(null, 0, 8));
		this.setBackground(jsuis.Color.Black.withAlpha(.2 * 255));
		if (direction === jsuis.Constants.HORIZONTAL) {
			this.setMargin(new jsuis.Insets(0, -16));
		} else {
			this.setMargin(new jsuis.Insets(-16, 0));
		}
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ScrollTrack, {
		direction: null
	});
}) (jsuis);

/**
 * jsuis.defaultlf.SplitPane
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.SplitPane = jsuis.Object.extend(SUPER, function(orientation, leftComponent, rightComponent) {
		SUPER.prototype.constructor.call(this, null);
		orientation = nvl(orientation, jsuis.Constants.HORIZONTAL);
		this.setOrientation(orientation);
		this.setBackground(jsuis.Color.Black.withAlpha(0));
		this.setLeftComponent(leftComponent || new jsuis.defaultlf.Button("Left"));
		this.setRightComponent(rightComponent || new jsuis.defaultlf.Button("Right"));
		var splitPaneDivider = new jsuis.defaultlf.SplitPaneDivider();
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
		
		var touchListener = new jsuis.TouchListener({
			touchPressed: function(event) {
				var splitPane = event.getSource();
				var point = event.getPoint();
				splitPane.setPressedPoint(point);
				event.stopPropagation();
			},
			touchMoved: function(event) {
				var splitPane = event.getSource();
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
		this.addTouchListener(touchListener);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.SplitPane, {
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
	jsuis.defaultlf.SplitPane.prototype.setLeftComponent = function(leftComponent) {
		var oldLeftComponent = this.getLeftComponent();
		if (oldLeftComponent) {
			this.remove(oldLeftComponent);
		}
		this.add(leftComponent);
		this.leftComponent = leftComponent;
		return this;
	}
	jsuis.defaultlf.SplitPane.prototype.setRightComponent = function(rightComponent) {
		var oldRightComponent = this.getRightComponent();
		if (oldRightComponent) {
			this.remove(oldRightComponent);
		}
		this.add(rightComponent);
		this.rightComponent = rightComponent;
		return this;
	}
	jsuis.defaultlf.SplitPane.prototype.getTopComponent = function() {
		return this.getLeftComponent();
	}
	jsuis.defaultlf.SplitPane.prototype.setTopComponent = function(topComponent) {
		this.setLeftComponent(topComponent);
		return this;
	}
	jsuis.defaultlf.SplitPane.prototype.getBottomComponent = function() {
		return this.getRightComponent();
	}
	jsuis.defaultlf.SplitPane.prototype.setBottomComponent = function(bottomComponent) {
		this.setRightComponent(bottomComponent);
		return this;
	}
	jsuis.defaultlf.SplitPane.prototype.setDividerLocation = function(dividerLocation) {
		this.dividerLocation = dividerLocation;
		return this;
	}
	// TODO SplitPaneLayout
	jsuis.defaultlf.SplitPane.prototype.doLayout = function() {
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
 * jsuis.defaultlf.SplitPaneDivider
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.SplitPaneDivider = jsuis.Object.extend(SUPER, function(direction) {
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
	jsuis.Object.addProperties(jsuis.defaultlf.SplitPaneDivider, {
		direction: null
	});
}) (jsuis);

/**
 * jsuis.defaultlf.TabbedPane
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.TabbedPane = jsuis.Object.extend(SUPER, function(tabPlacement) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		tabPlacement = nvl(tabPlacement, jsuis.Constants.TOP);
		this.setTabPlacement(tabPlacement);
		var tabPanel = new jsuis.defaultlf.Panel(new jsuis.FlowLayout(jsuis.Constants.LEFT, 0));
		this.setTabPanel(tabPanel);
		tabPanel.setPadding(new jsuis.Insets(0, 5));
		SUPER.prototype.add.call(this, tabPanel, new jsuis.BorderConstraints(tabPlacement));
		var cardPanel = new jsuis.defaultlf.LayeredPane();
		this.setCardPanel(cardPanel);
		SUPER.prototype.add.call(this, cardPanel);
		cardPanel.setLayout(new jsuis.BorderLayout());
		cardPanel.setBorder(new jsuis.LineBorder());
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
	jsuis.Object.addProperties(jsuis.defaultlf.TabbedPane, {
		tabPlacement: null,
		tabPanel: null,
		cardPanel: null,
		selection: null,
		actionListener: null
	});
	jsuis.defaultlf.TabbedPane.prototype.addTab = function(tabComponent, cardComponent) {
		var tabPanel = this.getTabPanel();
		tabPanel.add(tabComponent);
		var cardPanel = this.getCardPanel();
		cardPanel.add(cardComponent);
		cardComponent.setVisible(false);
		var actionListener = this.getActionListener();
		tabComponent.removeActionListener(actionListener);
		tabComponent.addActionListener(actionListener);
	}
	jsuis.defaultlf.TabbedPane.prototype.getTabCount = function() {
		var tabPanel = this.getTabPanel();
		return tabPanel.getComponents().length;
	}
	jsuis.defaultlf.TabbedPane.prototype.getTabComponentAt = function(index) {
		var tabPanel = this.getTabPanel();
		var tabComponents = tabPanel.getComponents();
		if (tabComponents) {
			return tabComponents[index];
		}
	}
	jsuis.defaultlf.TabbedPane.prototype.setSelected = function(tabComponent) {
		var tabPanel = this.getTabPanel();
		var tabComponents = tabPanel.getComponents();
		var cardPanel = this.getCardPanel();
		var cardComponents = cardPanel.getComponents();
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
			cardComponent.setVisible(true);
		}
		return this;
	}
	jsuis.defaultlf.TabbedPane.prototype.validate = function() {
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
 * jsuis.defaultlf.TextField
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.TextField = jsuis.Object.extend(SUPER, function(text) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		var label = new jsuis.defaultlf.Text(text);
		this.setLabel(label);
		this.add(label, new jsuis.BorderConstraints().setFill(jsuis.Constants.HORIZONTAL));
		this.setPadding(new jsuis.Insets(2, 4));
		this.setBackground(jsuis.Color.Black.withAlpha(0));
		this.setFont(new jsuis.Font("Arial", "normal", 12));
		var mouseListener = new jsuis.MouseListener({
			mouseReleased: function(event) {
				var source = event.getSource();
				var textFieldEditor = jsuis.defaultlf.TextFieldEditor.getInstance();
				source.setEditor(textFieldEditor);
				textFieldEditor.requestFocus();
			}
		});
		this.addMouseListener(mouseListener);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.TextField, {
		label: null,
		editor: null
	});
	jsuis.defaultlf.TextField.prototype.setEditor = function(editor) {
		if (editor) {
			editor.install(this);
		}
		this.editor = editor;
		return this;
	}
	jsuis.defaultlf.TextField.prototype.getText = function() {
		var label = this.getLabel();
		return label.getText();
	}
	jsuis.defaultlf.TextField.prototype.getFont = function() {
		var label = this.getLabel();
		return label.getFont();
	}
	jsuis.defaultlf.TextField.prototype.setFont = function(font) {
		var label = this.getLabel();
		label.setFont(font);
		return this;
	}
}) (jsuis);

/**
 * jsuis.defaultlf.ToolBar
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.ToolBar = jsuis.Object.extend(SUPER, function(orientation) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout(2));
		this.setOrientation(nvl(orientation, jsuis.Constants.HORIZONTAL));
		this.setPadding(new jsuis.Insets(2));
		this.setBackground(jsuis.Color.Black.withAlpha(.1 * 255));
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ToolBar, {
		orientation: null
	});
	jsuis.defaultlf.ToolBar.prototype.add = function(component, constraints, index) {
		var orientation = this.getOrientation();
		switch (orientation) {
		case jsuis.Constants.VERTICAL:
			SUPER.prototype.add.call(this, component, nvl(constraints, jsuis.BorderConstraints.NORTH), index);
			break;
		case jsuis.Constants.HORIZONTAL:
		default:
			SUPER.prototype.add.call(this, component, nvl(constraints, jsuis.BorderConstraints.WEST), index);
		}
	}
	jsuis.defaultlf.ToolBar.prototype.addSeparator = function(size) {
		this.add(new jsuis.defaultlf.TollBarSeparator(size));
	}
}) (jsuis);

/**
 * jsuis.defaultlf.ToolBarSeparator
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.ToolBarSeparator = jsuis.Object.extend(SUPER, function(size) {
		SUPER.prototype.constructor.call(this, null);
		var line = new jsuis.defaultlf.Line();
		this.setLine(line);
		this.add(line);
		this.setPreferredSize(nvl(size, new jsuis.Dimension(5, 5)));
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ToolBarSeparator, {
		line: null
	});
	jsuis.defaultlf.ToolBarSeparator.prototype.validate = function() {
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
 * jsuis.defaultlf.Tree
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.Tree = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, null);
		this.setBackground(jsuis.Color.Black.withAlpha(.1 * 255));
		this.setCellRenderer(new jsuis.defaultlf.TreeCellRenderer());
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Tree, {
		model: null,
		cellRenderer: null,
		selection: null
	});
	jsuis.defaultlf.Tree.prototype.getRoot = function() {
		var model = this.getModel();
		return model.getRoot();
	}
	jsuis.defaultlf.Tree.prototype.setRoot = function(root) {
		var model = this.getModel();
		model.setRoot(root);
		return this;
	}
	jsuis.defaultlf.Tree.prototype.getRows = function(node, rows) {
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
	jsuis.defaultlf.Tree.prototype.getRowHeight = function() {
		var cellRenderer = this.getCellRenderer();
		return cellRenderer.getRowHeight();
	}
	jsuis.defaultlf.Tree.prototype.setRowHeight = function(rowHeight) {
		var cellRenderer = this.getCellRenderer();
		cellRenderer.setRowHeight(rowHeight);
		return this;
	}
	jsuis.defaultlf.Tree.prototype.validate = function() {
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
	
	jsuis.defaultlf.Tree.prototype.isSelected = function(node) {
		var selection = this.getSelection();
		return (node === selection);
	}
	jsuis.defaultlf.Tree.prototype.setSelected = function(node) {
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
	jsuis.defaultlf.Tree.prototype.expandNode = function(node) {
		node.setExpanded(true);
	}
	jsuis.defaultlf.Tree.prototype.expandAll = function(node) {
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
 * jsuis.defaultlf.ActionEvent
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.InputEvent;
	jsuis.defaultlf.ActionEvent = jsuis.Object.extend(SUPER, function(source, id,
			actionCommand, when, modifiers) {
		SUPER.prototype.constructor.call(this, source, id, when, modifiers);
		this.setActionCommand(actionCommand);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ActionEvent, {
		actionCommand: null
	});
}) (jsuis);

/**
 * jsuis.defaultlf.Button
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Label;
	jsuis.defaultlf.Button = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, text, icon);
		this.setPadding(new jsuis.Insets(2, 4));
		this.setBorder(new jsuis.defaultlf.LineBorder(jsuis.Color.Black.withAlpha(.4 * 255)));
		this.setBackground(jsuis.Color.Black.withAlpha(.1 * 255));
		this.setRolloverColor(jsuis.Color.Black.withAlpha(.2 * 255));
		this.setPressedColor(jsuis.Color.Black.withAlpha(.3 * 255));
		
		var mouseListener = new jsuis.MouseListener({
			mouseClicked: function(event) {
				var button = event.getSource();
				button.mouseClicked();
			},
			mousePressed: function(event) {
				var button = event.getSource();
				button.mousePressed();
			},
			mouseReleased: function(event) {
				var button = event.getSource();
				button.mouseReleased();
			},
			mouseEntered: function(event) {
				var button = event.getSource();
				button.mouseEntered();
			},
			mouseExited: function(event) {
				var button = event.getSource();
				button.mouseExited();
			}
		});
		this.addMouseListener(mouseListener);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Button, {
		selected: false,
		rollover: false,
		releasedColor: null,
		rolloverColor: null,
		pressedColor: null,
		group: null
	});
	jsuis.defaultlf.Button.prototype.setBackground = function(background) {
		this.setReleasedColor(background);
		SUPER.prototype.setBackground.call(this, background);
		return this;
	}
	jsuis.defaultlf.Button.prototype.setEnabled = function(enabled) {
		var label = this.getLabel();
		if (label) {
			label.setEnabled(enabled);
		}
		SUPER.prototype.setEnabled.call(this, enabled);
		return this;
	}
	jsuis.defaultlf.Button.prototype.paint = function() {
		var releasedColor = this.getReleasedColor();
		SUPER.prototype.setBackground.call(this, releasedColor);
	}
	jsuis.defaultlf.Button.prototype.paintPressed = function() {
		var pressedColor = this.getPressedColor();
		SUPER.prototype.setBackground.call(this, pressedColor);
	}
	jsuis.defaultlf.Button.prototype.paintRollover = function() {
		var rolloverColor = this.getRolloverColor();
		SUPER.prototype.setBackground.call(this, rolloverColor);
	}
	jsuis.defaultlf.Button.prototype.mouseClicked = function() {
	}
	jsuis.defaultlf.Button.prototype.mousePressed = function() {
		this.paintPressed();
	}
	jsuis.defaultlf.Button.prototype.mouseReleased = function() {
		var rollover = this.isRollover();
		if (rollover) {
			this.paintRollover();
		} else {
			this.paint();
		}
	}
	jsuis.defaultlf.Button.prototype.mouseEntered = function() {
		this.paintRollover();
		this.setRollover(true);
	}
	jsuis.defaultlf.Button.prototype.mouseExited = function() {
		this.paint();
		this.setRollover(false);
	}
}) (jsuis);

/**
 * jsuis.defaultlf.MouseEvent
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.InputEvent;
	jsuis.defaultlf.MouseEvent = jsuis.Object.extend(SUPER, function(source, id,
			when, modifiers, x, y, xAbs, yAbs, clickCount, popupTrigger, button) {
		SUPER.prototype.constructor.call(this, source, id, when, modifiers);
		this.setX(x);
		this.setY(y);
		this.setXAbs(xAbs);
		this.setYAbs(yAbs);
		this.setClickCount(clickCount);
		this.setPopupTrigger(popupTrigger);
		this.setButton(button);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.MouseEvent, {
		x: 0,
		y: 0,
		xAbs: 0,
		yAbs: 0,
		clickCount: 0,
		popupTrigger: null,
		button: null
	});
	jsuis.defaultlf.MouseEvent.prototype.getPoint = function() {
		var x = this.x;
		var y = this.y;
		if (x !== null && x !== undefined && y !== null && y !== undefined) {
			return new jsuis.Point(x, y);
		}
		var domEvent = this.getDomEvent();
		var source = this.getSource();
		var boundingClientRect = source.getElement().getBoundingClientRect();
		var outsets = source.getOutsets();
		x = nvl(x, domEvent.clientX - boundingClientRect.left + outsets.getLeft());
		y = nvl(y, domEvent.clientY - boundingClientRect.top + outsets.getTop());
		this.setX(x).setY(y);
		return new jsuis.Point(x, y);
	}
	jsuis.defaultlf.MouseEvent.prototype.getX = function() {
		var point = this.getPoint();
		return point.getX();
	}
	jsuis.defaultlf.MouseEvent.prototype.getY = function() {
		var point = this.getPoint();
		return point.getY();
	}
	jsuis.defaultlf.MouseEvent.prototype.getLocationOnScreen = function() {
		var xAbs = this.xAbs;
		var yAbs = this.yAbs;
		if (xAbs !== null && xAbs !== undefined && yAbs !== null && yAbs !== undefined) {
			return new jsuis.Point(xAbs, yAbs);
		}
		var domEvent = this.getDomEvent();
		xAbs = nvl(xAbs, domEvent.screenX);
		yAbs = nvl(yAbs, domEvent.screenY);
		this.setXAbs(xAbs).setYAbs(yAbs);
		return new jsuis.Point(xAbs, yAbs);
	}
	jsuis.defaultlf.MouseEvent.prototype.getXOnScreen = function() {
		var locationOnScreen = this.getLocationOnScreen();
		return locationOnScreen.getX();
	}
	jsuis.defaultlf.MouseEvent.prototype.getYOnScreen = function() {
		var locationOnScreen = this.getLocationOnScreen();
		return locationOnScreen.getY();
	}
	jsuis.defaultlf.MouseEvent.prototype.getClickCount = function() {
		var clickCount = this.clickCount;
		if (clickCount !== null && clickCount !== undefined) {
			return clickCount;
		}
		var domEvent = this.getDomEvent();
		clickCount = domEvent.detail;
		this.setClickCount(clickCount);
		return clickCount;
	}
	jsuis.defaultlf.MouseEvent.prototype.getPopupTrigger = function() {
		var popupTrigger = this.popupTrigger;
		if (popupTrigger !== null && popupTrigger !== undefined) {
			return popupTrigger;
		}
		var button = this.getButton();
		popupTrigger = (button === 3);
		this.setPopupTrigger(popupTrigger);
		return popupTrigger;
	}
	jsuis.defaultlf.MouseEvent.prototype.getButton = function() {
		var button = this.button;
		if (button !== null && button !== undefined) {
			return button;
		}
		var domEvent = this.getDomEvent();
		button = domEvent.button + 1;
		this.setButton(button);
		return button;
	}
}) (jsuis);

/**
 * jsuis.defaultlf.RootPane
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.LayeredPane;
	jsuis.defaultlf.RootPane = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
		var layeredPane = new jsuis.defaultlf.LayeredPane();
		this.setLayeredPane(layeredPane);
		this.add(layeredPane);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.RootPane, {
		layeredPane: null,
		menuBar: null,
		contentPane: null
	});
	jsuis.defaultlf.RootPane.prototype.setMenuBar = function(menuBar) {
		var layeredPane = this.getLayeredPane();
		var oldMenuBar = this.getMenuBar();
		if (oldMenuBar) {
			layeredPane.remove(oldMenuBar);
		}
		layeredPane.add(menuBar, jsuis.Constraints.FRAME_CONTENT_LAYER);
		this.menuBar = menuBar;
		return this;
	}
	jsuis.defaultlf.RootPane.prototype.setContentPane = function(contentPane) {
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
	jsuis.defaultlf.RootPane.prototype.doLayout = function() {
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
 * jsuis.defaultlf.ScrollButton
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.LayeredPane;
	jsuis.defaultlf.ScrollButton = jsuis.Object.extend(SUPER, function(direction) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		this.setDirection(direction);
		this.setBorder(new jsuis.defaultlf.ScrollButtonBorder(direction));
		var arrow = new jsuis.defaultlf.Panel();
		arrow.setBorder(new jsuis.defaultlf.ScrollButtonArrowBorder(direction));
		arrow.setBackground(jsuis.Color.Black);
		this.add(arrow);
		this.setPreferredSize(new jsuis.Dimension(16, 16));
		var color = jsuis.Color.Black.withAlpha(.1 * 255);
		this.setBackground(color);
		this.setReleasedColor(color);
		this.setRolloverColor(jsuis.Color.Black.withAlpha(.2 * 255));
		this.setPressedColor(jsuis.Color.Black.withAlpha(.3 * 255));
		var mouseListener = new jsuis.MouseListener({
			mousePressed: function(event) {
				var source = event.getSource();
				var pressedColor = source.getPressedColor();
				source.setBackground(pressedColor);
			},
			mouseReleased: function(event) {
				var source = event.getSource();
				var releasedColor = source.getReleasedColor();
				source.setBackground(releasedColor);
			},
			mouseEntered: function(event) {
				var source = event.getSource();
				var rolloverColor = source.getRolloverColor();
				source.setBackground(rolloverColor);
			},
			mouseExited: function(event) {
				var source = event.getSource();
				var releasedColor = source.getReleasedColor();
				source.setBackground(releasedColor);
			}
		});
		this.addMouseListener(mouseListener);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ScrollButton, {
		direction: null,
		releasedColor: null,
		rolloverColor: null,
		pressedColor: null
	});
}) (jsuis);

/**
 * jsuis.defaultlf.ScrollPane
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.LayeredPane;
	jsuis.defaultlf.ScrollPane = jsuis.Object.extend(SUPER, function(view, vsbPolicy, hsbPolicy) {
		SUPER.prototype.constructor.call(this);
		this.setLayout(new jsuis.BorderLayout());
		
		var viewport = new jsuis.defaultlf.Viewport();
		this.setViewport(viewport);
		this.add(viewport);
		
		if (view) {
			this.setViewportView(view);
		}
		vsbPolicy = nvl(vsbPolicy, jsuis.Constants.VERTICAL_SCROLLBAR_AS_NEEDED);
		this.setVsbPolicy(vsbPolicy);
		hsbPolicy = nvl(hsbPolicy, jsuis.Constants.HORIZONTAL_SCROLLBAR_AS_NEEDED);
		this.setHsbPolicy(hsbPolicy);
		
		var scrollBarPanel = new jsuis.defaultlf.Panel(new jsuis.GridBagLayout());
		this.setScrollBarPanel(scrollBarPanel);
		this.add(scrollBarPanel);
		
		var verticalScrollBar = new jsuis.defaultlf.ScrollBar(jsuis.Constants.VERTICAL);
		this.setVerticalScrollBar(verticalScrollBar);
		scrollBarPanel.add(verticalScrollBar, new jsuis.GridBagConstraints()
				.setGridx(1).setGridy(0).setWeighty(1)
				.setFill(jsuis.Constants.VERTICAL));
		if (vsbPolicy !== jsuis.Constants.VERTICAL_SCROLLBAR_ALWAYS) {
			verticalScrollBar.setVisible(false);
		}
		
		var horizontalScrollBar = new jsuis.defaultlf.ScrollBar(jsuis.Constants.HORIZONTAL);
		this.setHorizontalScrollBar(horizontalScrollBar);
		scrollBarPanel.add(horizontalScrollBar, new jsuis.GridBagConstraints()
				.setGridx(0).setGridy(1).setWeightx(1)
				.setFill(jsuis.Constants.HORIZONTAL));
		if (hsbPolicy !== jsuis.Constants.HORIZONTAL_SCROLLBAR_ALWAYS) {
			horizontalScrollBar.setVisible(false);
		}
		
		var central = new jsuis.defaultlf.Panel(null);
		scrollBarPanel.add(central, new jsuis.GridBagConstraints()
				.setGridx(0).setGridy(0).setWeightx(1).setWeighty(1)
				.setFill(jsuis.Constants.BOTH));
		
		var touchListener = new jsuis.TouchListener({
			touchPressed: function(event) {
				var scrollPane = this.getListenerComponent();
				var point = event.getPoint();
				scrollPane.setScrollThumbPressedPoint(point);
				event.stopPropagation();
			},
			touchMoved: function(event) {
				var scrollPane = this.getListenerComponent();
				var point = event.getPoint();
				var pressedPoint = scrollPane.getScrollThumbPressedPoint();
				var view = scrollPane.getViewportView();
				var verticalScrollBar = scrollPane.getVerticalScrollBar();
				var verticalScrollBarVisible = verticalScrollBar.isVisible();
				if (verticalScrollBarVisible) {
					var scrollTrack = verticalScrollBar.getScrollTrack();
					var scrollThumb = verticalScrollBar.getScrollThumb();
					var extent = verticalScrollBar.getExtent();
					var maximum = verticalScrollBar.getMaximum();
					var dy = point.getY() - pressedPoint.getY();
					var value = Math.min(Math.max(verticalScrollBar.getValue() - dy, 0), maximum - extent);
					verticalScrollBar.setValue(value);
					var maximumY = scrollTrack.getHeight() - scrollThumb.getHeight();
					if (maximum > extent) {
						scrollThumb.setY(value * maximumY / (maximum - extent));
					}
				}
				var horizontalScrollBar = scrollPane.getHorizontalScrollBar();
				var horizontalScrollBarVisible = horizontalScrollBar.isVisible();
				if (horizontalScrollBarVisible) {
					var scrollTrack = horizontalScrollBar.getScrollTrack();
					var scrollThumb = horizontalScrollBar.getScrollThumb();
					var extent = horizontalScrollBar.getExtent();
					var maximum = horizontalScrollBar.getMaximum();
					var dx = point.getX() - pressedPoint.getX();
					var value = Math.min(Math.max(horizontalScrollBar.getValue() - dx, 0), maximum - extent);
					horizontalScrollBar.setValue(value);
					var maximumX = scrollTrack.getWidth() - scrollThumb.getWidth();
					if (maximum > extent) {
						scrollThumb.setX(value * maximumX / (maximum - extent));
					}
				}
				event.preventDefault();
				event.stopPropagation();
			}
		});
		touchListener.setListenerComponent(this);
		viewport.addTouchListener(touchListener);
		
		verticalScrollBar.addPropertyChangeListener(new jsuis.PropertyChangeListener({
			propertyChange: function(event) {
				var newValue = event.getNewValue();
				var scrollPane = this.getListenerComponent();
				var viewport = scrollPane.getViewport();
				var view = viewport.getView();
				view.setY(-Math.round(newValue));
			}
		}).setPropertyName("value").setListenerComponent(this));
		
		horizontalScrollBar.addPropertyChangeListener(new jsuis.PropertyChangeListener({
			propertyChange: function(event) {
				var newValue = event.getNewValue();
				var scrollPane = this.getListenerComponent();
				var viewport = scrollPane.getViewport();
				var view = viewport.getView();
				view.setX(-Math.round(newValue));
			}
		}).setPropertyName("value").setListenerComponent(this));
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ScrollPane, {
		vsbPolicy: null,
		hsbPolicy: null,
		viewport: null,
		scrollBarPanel: null,
		verticalScrollBar: null,
		horizontalScrollBar: null,
		scrollThumbPressedPoint: null
	});
	jsuis.defaultlf.ScrollPane.prototype.setViewportView = function(view) {
		var viewport = this.getViewport();
		viewport.setView(view);
		return this;
	}
	jsuis.defaultlf.ScrollPane.prototype.getViewportView = function() {
		var viewport = this.getViewport();
		return viewport.getView();
	}
	// TODO ScrollPaneLayout
	jsuis.defaultlf.ScrollPane.prototype.doLayout = function() {
		var size = this.getSize();
		var insetsDimension = this.getInsets().getDimension();
		var outsetsDimension = this.getOutsets().getDimension();
		size = size.subtract(insetsDimension.add(outsetsDimension));
		var width = size.getWidth();
		var height = size.getHeight();
		var vsbPolicy = this.getVsbPolicy();
		var verticalScrollBar = this.getVerticalScrollBar();
		var verticalScrollBarVisible = verticalScrollBar.isVisible();
		if (verticalScrollBarVisible && (vsbPolicy === jsuis.Constants.VERTICAL_SCROLLBAR_NEVER)) {
			verticalScrollBarVisible = false;
		} else if (!verticalScrollBarVisible && (vsbPolicy === jsuis.Constants.VERTICAL_SCROLLBAR_ALWAYS)) {
			verticalScrollBarVisible = true;
		}
		var hsbPolicy = this.getHsbPolicy();
		var horizontalScrollBar = this.getHorizontalScrollBar();
		var horizontalScrollBarVisible = horizontalScrollBar.isVisible();
		if (horizontalScrollBarVisible && (hsbPolicy === jsuis.Constants.HORIZONTAL_SCROLLBAR_NEVER)) {
			horizontalScrollBarVisible = false;
		} else if (!horizontalScrollBarVisible && (hsbPolicy === jsuis.Constants.HORIZONTAL_SCROLLBAR_ALWAYS)) {
			horizontalScrollBarVisible = true;
		}
		var verticalScrollBarPreferredSize = verticalScrollBar.getPreferredSize();
		var verticalScrollBarPreferredWidth = verticalScrollBarPreferredSize.getWidth();
		var horizontalScrollBarPreferredSize = horizontalScrollBar.getPreferredSize();
		var horizontalScrollBarPreferredHeight = horizontalScrollBarPreferredSize.getHeight();
		var view = this.getViewportView();
		if (view) {
			var viewSize;
			var viewMinimumSize;
			for (var i = 0; i < 2; i++) {
				viewSize = new jsuis.Dimension(width - (verticalScrollBarVisible ? verticalScrollBarPreferredWidth : 0),
						height - (horizontalScrollBarVisible ? horizontalScrollBarPreferredHeight : 0));
				view.setSize(viewSize);
				var viewMinimumSize = view.getMinimumSize();
				if (vsbPolicy === jsuis.Constants.VERTICAL_SCROLLBAR_AS_NEEDED) {
					var visible = (viewMinimumSize.getHeight() > height);
					if (visible !== verticalScrollBarVisible) {
						verticalScrollBarVisible = visible;
						continue;
					}
				}
				if (hsbPolicy === jsuis.Constants.HORIZONTAL_SCROLLBAR_AS_NEEDED) {
					var visible = (viewMinimumSize.getWidth() > width);
					if (visible !== horizontalScrollBarVisible) {
						horizontalScrollBarVisible = visible;
						continue;
					}
				}
				break;
			}
			viewSize = new jsuis.Dimension(width - (verticalScrollBarVisible ? verticalScrollBarPreferredWidth : 0),
					height - (horizontalScrollBarVisible ? horizontalScrollBarPreferredHeight : 0));
			var viewWidth = Math.max(viewSize.getWidth(), viewMinimumSize.getWidth());
			var viewHeight = Math.max(viewSize.getHeight(), viewMinimumSize.getHeight());
			view.setSize(new jsuis.Dimension(viewWidth, viewHeight));
			verticalScrollBar.setMaximum(viewHeight);
			horizontalScrollBar.setMaximum(viewWidth);
		}
		horizontalScrollBar.setExtent(width - (verticalScrollBarVisible ? verticalScrollBarPreferredWidth : 0));
		verticalScrollBar.setExtent(height- (horizontalScrollBarVisible ? horizontalScrollBarPreferredHeight : 0));
		horizontalScrollBar.setValue(Math.min(Math.max(horizontalScrollBar.getValue(), horizontalScrollBar.getMinimum()),
				horizontalScrollBar.getMaximum() - horizontalScrollBar.getExtent()));
		verticalScrollBar.setValue(Math.min(Math.max(verticalScrollBar.getValue(), verticalScrollBar.getMinimum()),
				verticalScrollBar.getMaximum() - verticalScrollBar.getExtent()));
		verticalScrollBar.setVisible(verticalScrollBarVisible);
		horizontalScrollBar.setVisible(horizontalScrollBarVisible);
		SUPER.prototype.doLayout.call(this);
	}
	jsuis.defaultlf.ScrollPane.prototype.getMinimumSize = function() {
		return new jsuis.Dimension(0, 0);
	}
}) (jsuis);

/**
 * jsuis.defaultlf.TouchEvent
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.InputEvent;
	jsuis.defaultlf.TouchEvent = jsuis.Object.extend(SUPER, function(source, id,
			when, modifiers, touches) {
		SUPER.prototype.constructor.call(this, source, id, when, modifiers);
		this.setTouches(touches);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.TouchEvent, {
		touches: null,
		x: 0,
		y: 0
	});
	jsuis.defaultlf.TouchEvent.prototype.getTouches = function() {
		var touches = this.touches;
		if (touches !== null && touches !== undefined) {
			return touches;
		}
		touches = [];
		var domEvent = this.getDomEvent();
		var touchList = domEvent.touches;
		for (var i = 0; i < touchList.length; i++) {
			touches.push(touchList.item(i));
		}
		this.setTouches(touches);
		return touches;
	}
	jsuis.defaultlf.TouchEvent.prototype.getTouch = function() {
		var source = this.getSource();
		var graphics = source.getGraphics();
		var graphicsElement = graphics.getElement();
		var touches = this.getTouches();
		for (var i = 0; i < touches.length; i++) {
			var touch = touches[i];
			if (touch.target === graphicsElement || graphicsElement.contains(touch.target)) {
				return touch;
			}
		}
		return touches[0];
	}
	jsuis.defaultlf.TouchEvent.prototype.getPoint = function() {
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
	jsuis.defaultlf.TouchEvent.prototype.getX = function() {
		var point = this.getPoint();
		return point.getX();
	}
	jsuis.defaultlf.TouchEvent.prototype.getY = function() {
		var point = this.getPoint();
		return point.getY();
	}
}) (jsuis);

/**
 * jsuis.defaultlf.MenuItem
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Button;
	jsuis.defaultlf.MenuItem = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, nvl(text, ""), icon);
		this.setBorder(null);
		this.setBackground(jsuis.Color.Black.withAlpha(0));
		this.addMouseListener(new jsuis.MouseListener({
			mouseClicked: function(event) {
				var menuItem = event.getSource();
				if (menuItem instanceof jsuis.defaultlf.Menu) {
					return;
				}
				var menu = menuItem.getParent();
				var menuBar = menu.getParent();
				menuBar.setSelected(null);
			}
		}));
	});
}) (jsuis);

/**
 * jsuis.defaultlf.TabComponent
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Button;
	jsuis.defaultlf.TabComponent = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, text, icon);
		this.setMargin(new jsuis.Insets(0, -3.5));
		this.setBorder(new jsuis.defaultlf.TabComponentBorder());
		this.setBackground(jsuis.Color.LightGray);
		this.setRolloverColor(jsuis.Color.LightGray);
		this.setPressedColor(jsuis.Color.Gray);
	});
	jsuis.defaultlf.TabComponent.prototype.setSelected = function(selected) {
		SUPER.prototype.setSelected.call(this, selected);
		var border = this.getBorder();
		border.paintBorder(this);
		return this;
	}
	/*
	jsuis.defaultlf.TabComponent.prototype.validate = function() {
		var selected = this.isSelected();
		if (selected) {
			this.paint();
		} else {
			this.paintPressed();
		}
		SUPER.prototype.validate.call(this);
	}
	*/
	jsuis.defaultlf.TabComponent.prototype.mouseClicked = function() {
	}
	jsuis.defaultlf.TabComponent.prototype.mousePressed = function() {
	}
	jsuis.defaultlf.TabComponent.prototype.mouseReleased = function() {
	}
	jsuis.defaultlf.TabComponent.prototype.mouseEntered = function() {
	}
	jsuis.defaultlf.TabComponent.prototype.mouseExited = function() {
	}
}) (jsuis);

/**
 * jsuis.defaultlf.ToggleButton
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Button;
	jsuis.defaultlf.ToggleButton = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, text, icon);
	});
	jsuis.defaultlf.ToggleButton.prototype.mousePressed = function() {
		var selected = this.isSelected();
		selected = !selected;
		this.setSelected(selected);
		if (selected) {
			SUPER.prototype.mousePressed.call(this);
		}
	}
	jsuis.defaultlf.ToggleButton.prototype.mouseReleased = function() {
		var selected = this.isSelected();
		if (!selected) {
			SUPER.prototype.mouseReleased.call(this);
		}
	}
}) (jsuis);

/**
 * jsuis.defaultlf.Menu
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.MenuItem;
	jsuis.defaultlf.Menu = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, text, icon);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Menu, {
		popupMenu: null
	});
	jsuis.defaultlf.Menu.prototype.add = function(component, constraints, index) {
		var component = component.getPeer();
		if ((component instanceof jsuis.defaultlf.MenuItem) ||
				(component instanceof jsuis.defaultlf.PopupMenuSeparator)) {
			var popupMenu = this.getPopupMenu();
			if (!popupMenu) {
				popupMenu = new jsuis.defaultlf.PopupMenu();
				this.setPopupMenu(popupMenu);
			}
			popupMenu.add(component, constraints, index);
			component.setParent(this);
		} else {
			SUPER.prototype.add.call(this, component, constraints, index);
		}
	}
	jsuis.defaultlf.Menu.prototype.isPopupMenuVisible = function() {
		var popupMenu = this.getPopupMenu();
		return popupMenu.isVisible();
	}
	jsuis.defaultlf.Menu.prototype.setPopupMenuVisible = function(popupMenuVisible) {
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
	jsuis.defaultlf.Menu.prototype.addSeparator = function() {
		var separator = new jsuis.defaultlf.PopupMenuSeparator()
		this.add(separator);
	}
	jsuis.defaultlf.Menu.prototype.setSelected = function(selected) {
		this.setPopupMenuVisible(selected);
		if (selected) {
			this.paintPressed();
		} else {
			var rollover = this.isRollover();
			if (rollover) {
				this.paintRollover();
			} else {
				this.paint();
			}
		}
		SUPER.prototype.setSelected.call(this, selected);
		return this;
	}
	jsuis.defaultlf.Menu.prototype.hasChanged = function() {
		return this.changed;
	}
	jsuis.defaultlf.Menu.prototype.setChanged = function(changed) {
		this.changed = changed;
		return this;
	}
	jsuis.defaultlf.Menu.prototype.mousePressed = function() {
		this.setChanged(false);
		var menuBar = this.getParent();
		if (!(menuBar instanceof jsuis.defaultlf.MenuBar)) {
			return;
		}
		var selection = menuBar.getSelection();
		if (!selection) {
			menuBar.setSelected(this);
			this.setChanged(true);
		}
	}
	jsuis.defaultlf.Menu.prototype.mouseReleased = function() {
		var menuBar = this.getParent();
		if (!(menuBar instanceof jsuis.defaultlf.MenuBar)) {
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
	jsuis.defaultlf.Menu.prototype.mouseEntered = function() {
		var menuBar = this.getParent();
		if (!(menuBar instanceof jsuis.defaultlf.MenuBar)) {
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
	jsuis.defaultlf.Menu.prototype.mouseExited = function() {
		var selected = this.isSelected();
		if (selected) {
			this.paintPressed();
		} else {
			this.paint();
		}
		this.setRollover(false);
	}
}) (jsuis);

