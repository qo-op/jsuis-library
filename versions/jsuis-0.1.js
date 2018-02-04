/**
 * jsuis
 */
jsuis = {
};
/**
 * SVG
 */
jsuis.SVG = "http://www.w3.org/2000/svg";
/**
 * null value
 */
function nvl(value, defaultValue) {
	if ((value === null) || (value === undefined)) {
		return defaultValue;
	}
	return value;
}

/**
 * jsuis
 */
jsuis = {
};
/**
 * SVG
 */
jsuis.SVG = "http://www.w3.org/2000/svg";
/**
 * null value
 */
function nvl(value, defaultValue) {
	if ((value === null) || (value === undefined)) {
		return defaultValue;
	}
	return value;
}

/**
 * jsuis.Constants
 */
(function(jsuis) {
	jsuis.Constants = function() {
	}
	
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

/**
 * Border
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Border = jsuis.Object.extend(SUPER, function(color, thickness) {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.Border.prototype.install = function(component) {
		var shape = component.getShape();
		if (!shape) {
			return;
		}
		shape.setForeground(null);
	}
	jsuis.Border.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets();
	}
	jsuis.Border.prototype.getBorderOutsets = function(component) {
		return new jsuis.Insets();
	}
})(jsuis);

/**
 * jsuis.BorderLayout
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.BorderLayout = jsuis.Object.extend(SUPER, function(hgap, vgap, sort) {
		SUPER.prototype.constructor.call(this);
		hgap = nvl(hgap, 0);
		vgap = nvl(vgap, hgap);
		this.setHgap(hgap);
		this.setVgap(vgap);
		this.setSort(nvl(sort, true))
	});
	jsuis.Object.addProperties(jsuis.BorderLayout,
			new jsuis.Property("hgap"),
			new jsuis.Property("vgap"),
			new jsuis.Property("sort")
	);
	var comparator;
	jsuis.BorderLayout.getComparator = function() {
		if (!comparator) {
			comparator = function(a, b) {
				if (nvl(a.getConstraints(), jsuis.Constants.CENTER) === jsuis.Constants.CENTER) {
					if (nvl(b.getConstraints(), jsuis.Constants.CENTER) === jsuis.Constants.CENTER) {
						return 0;
					} else {
						return 1;
					}
				} else {
					if (nvl(b.getConstraints(), jsuis.Constants.CENTER) === jsuis.Constants.CENTER) {
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
		var sort = this.getSort();
		if (sort) {
			components.sort(jsuis.BorderLayout.getComparator());
		}
		for (var i = components.length - 1; i >= 0; i--) {
			var component = components[i];
			if (!component.isVisible()) {
				continue;
			}
			var componentPreferredSize = component.getPreferredSize();
			var componentPreferredWidth = componentPreferredSize.getWidth();
			var componentPreferredHeight = componentPreferredSize.getHeight();
			componentPreferredWidth += hgap;
			componentPreferredHeight += vgap;
			var constraints = nvl(component.getConstraints(), jsuis.Constants.CENTER);
			switch (constraints) {
			case jsuis.Constants.NORTH:
			case jsuis.Constants.SOUTH:
				preferredLayoutWidth = Math.max(preferredLayoutWidth, componentPreferredWidth);
				preferredLayoutHeight += componentPreferredHeight;
				break;
			case jsuis.Constants.EAST:
			case jsuis.Constants.WEST:
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
		var sort = this.getSort();
		if (sort) {
			components.sort(jsuis.BorderLayout.getComparator());
		}
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			if (!component.isVisible()) {
				continue;
			}
			var componentPreferredSize = component.getPreferredSize();
			var componentPreferredWidth = componentPreferredSize.getWidth();
			var componentPreferredHeight = componentPreferredSize.getHeight();
			var componentX = 0;
			var componentY = 0;
			var componentWidth = componentPreferredWidth + hgap;
			var componentHeight = componentPreferredHeight + vgap;
			var constraints = nvl(component.getConstraints(), jsuis.Constants.CENTER);
			switch (constraints) {
			case jsuis.Constants.NORTH:
				componentX = x;
				componentY = y;
				componentWidth = width;
				y += componentHeight;
				height -= componentHeight;
				break;
			case jsuis.Constants.SOUTH:
				componentX = x;
				componentY = y + height - componentHeight;
				componentWidth = width;
				height -= componentHeight;
				break;
			case jsuis.Constants.EAST:
				componentX = x + width - componentWidth;
				componentY = y;
				componentHeight = height;
				width -= componentWidth;
				break;
			case jsuis.Constants.WEST:
				componentX = x;
				componentY = y;
				componentHeight = height;
				x += componentWidth;
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
			var rectangle = new jsuis.Rectangle(componentX, componentY, componentWidth, componentHeight);
			component.setBounds(rectangle);
			component.setMaximumLayoutBounds(rectangle);
		}
	}
	jsuis.BorderLayout.prototype.minimumLayoutSize = function(parent) {
		return this.preferredLayoutSize(parent);
	}
}) (jsuis);

/**
 * jsuis.BrowserWindow
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.BrowserWindow = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
		this.setElement(window);
		this.setEventListeners({});
		this.setComponentListeners([]);
		this.setMouseListeners([]);
		this.setMouseMotionListeners([]);
		this.setEventListener("mousedown", function(domEvent) {
			jsuis.BrowserWindow.getInstance().fireMousePressed(domEvent);
		});
		this.setEventListener("mouseup", function(domEvent) {
			jsuis.BrowserWindow.getInstance().fireMouseReleased(domEvent);
		});
		this.setEventListener("mousemove", function(domEvent) {
			var browserWindow = jsuis.BrowserWindow.getInstance();
			if (browserWindow.isPressed()) {
				browserWindow.fireMouseDragged(domEvent);
			}
		});
	});
	jsuis.Object.addProperties(jsuis.BrowserWindow,
			new jsuis.Property("element"),
			new jsuis.Property("eventListeners"),
			new jsuis.Property("componentListeners"),
			new jsuis.Property("mouseListeners"),
			new jsuis.Property("mouseMotionListeners")
	);
	var instance;
	jsuis.BrowserWindow.getInstance = function() {
		if (!instance) {
			instance = new jsuis.BrowserWindow();
		}
		return instance;
	}
	jsuis.BrowserWindow.prototype.getEventListener = function(type) {
		var eventListeners = this.getEventListeners();
		return eventListeners["on" + type];
	}
	jsuis.BrowserWindow.prototype.setEventListener = function(type, eventListener) {
		var oldEventListener = this.getEventListener(type);
		if (oldEventListener) {
			this.removeEventListener(type, oldEventListener);
		}
		this.addEventListener(type, eventListener);
		var eventListeners = this.getEventListeners();
		eventListeners["on" + type] = eventListener;
		return this;
	}
	jsuis.BrowserWindow.prototype.addEventListener = function(type, eventListener) {
		var element = this.getElement();
		element.addEventListener(type, eventListener);
	}
	jsuis.BrowserWindow.prototype.removeEventListener = function(type, eventListener) {
		var element = this.getElement();
		element.removeEventListener(type, eventListener);
	}
	jsuis.BrowserWindow.prototype.addComponentListener = function(componentListener) {
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
		/*
		if (listener.componentMoved) {
			// TODO
		}
		*/
	}
	jsuis.BrowserWindow.prototype.removeComponentListener = function(componentListener) {
		var componentListeners = this.getComponentListeners();
		var index = componentListeners.indexOf(componentListener);
		if (index !== -1) {
			componentListeners.splice(index, 1);
		}
	}
	jsuis.BrowserWindow.prototype.fireComponentResized = function(domEvent) {
		var event = new jsuis.ComponentEvent(this, jsuis.Constants.COMPONENT_RESIZED).setDomEvent(domEvent);
		var componentListeners = this.getComponentListeners();
		for (var i = 0; i < componentListeners.length; i++) {
			var componentListener = componentListeners[i];
			componentListener.componentResized(event);
		}
	}
	jsuis.BrowserWindow.prototype.isPressed = function() {
		return this.pressed;
	}
	jsuis.BrowserWindow.prototype.setPressed = function(pressed) {
		this.pressed = pressed;
		return this;
	}
	jsuis.BrowserWindow.prototype.addMouseListener = function(mouseListener) {
		var mouseListeners = this.getMouseListeners();
		mouseListeners.push(mouseListener);
	}
	jsuis.BrowserWindow.prototype.removeMouseListener = function(mouseListener) {
		var mouseListeners = this.getMouseListeners();
		var index = mouseListeners.indexOf(mouseListener);
		if (index !== -1) {
			mouseListeners.splice(index, 1);
		}
	}
	jsuis.BrowserWindow.prototype.fireMousePressed = function(domEvent) {
		this.setPressed(true);
	}
	jsuis.BrowserWindow.prototype.fireMouseReleased = function(domEvent) {
		this.setPressed(false);
		var mouseEvent = new jsuis.MouseEvent(this, jsuis.Constants.MOUSE_RELEASED).setDomEvent(domEvent);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseReleased(mouseEvent);
		}
	}
	jsuis.BrowserWindow.prototype.addMouseMotionListener = function(mouseMotionListener) {
		var mouseMotionListeners = this.getMouseMotionListeners();
		mouseMotionListeners.push(mouseMotionListener);
	}
	jsuis.BrowserWindow.prototype.removeMouseMotionListener = function(mouseMotionListener) {
		var mouseMotionListeners = this.getMouseMotionListeners();
		var index = mouseMotionListeners.indexOf(mouseMotionListener);
		if (index !== -1) {
			mouseMotionListeners.splice(index, 1);
		}
	}
	jsuis.BrowserWindow.prototype.fireMouseDragged = function(domEvent) {
		var mouseEvent = new jsuis.MouseEvent(this, jsuis.Constants.MOUSE_DRAGGED).setDomEvent(domEvent);
		var mouseMotionListeners = this.getMouseMotionListeners();
		for (var i = 0; i < mouseMotionListeners.length; i++) {
			var mouseMotionListener = mouseMotionListeners[i];
			mouseMotionListener.mouseDragged(mouseEvent);
		}
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
	jsuis.Object.addProperties(jsuis.Color,
			new jsuis.Property("r"),
			new jsuis.Property("g"),
			new jsuis.Property("b"),
			new jsuis.Property("a")
	);
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
 * Component
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Component = jsuis.Object.extend(SUPER, function(element) {
		SUPER.prototype.constructor.call(this);
		this.setElement(element);
		this.addClass(this.getConstructorName());
		this.setComponents([]);
		this.setEventListeners({});
		this.setComponentListeners([]);
		this.setMouseListeners([]);
		this.setMouseMotionListeners([]);
		this.setPropertyChangeListeners({});
		this.setActionListeners([]);
	});
	jsuis.Object.addProperties(jsuis.Component,
			new jsuis.Property("element"),
			new jsuis.Property("components"),
			new jsuis.Property("parent"),
			new jsuis.Property("layout"),
			new jsuis.Property("constraints"),
			new jsuis.Property("anchor"),
			new jsuis.Property("fill"),
			new jsuis.Property("actionCommand"),
			new jsuis.Property("eventListeners"),
			new jsuis.Property("componentListeners"),
			new jsuis.Property("mouseListeners"),
			new jsuis.Property("mouseMotionListeners"),
			new jsuis.Property("propertyChangeListeners"),
			new jsuis.Property("actionListeners")
	);
	jsuis.Component.prototype.addClass = function(name) {
		var value = this.getAttribute("class");
		var classes = value ? value.split(" ") : [];
		if (classes.indexOf(name) === -1) {
			classes.push(name);
			var value = classes.join(" ");
			this.setAttribute("class", value);
		}
	}
	jsuis.Component.prototype.getAttribute = function(attribute) {
		var element = this.getElement();
		return element.getAttribute(attribute);
	}
	jsuis.Component.prototype.setAttribute = function(attribute, value) {
		var element = this.getElement();
		if (value === null) {
			element.removeAttribute(attribute);
			return this;
		}
		element.setAttribute(attribute, value);
		return this;
	}
	jsuis.Component.prototype.setStyleProperty = function(property, value) {
		var element = this.getElement();
		element.style[property] = value;
		return this;
	}
	jsuis.Component.prototype.getStyleProperty = function(property) {
		var element = this.getElement();
		var computedStyle = getComputedStyle(element);
		return computedStyle[property];
	}
	/*
	jsuis.Component.prototype.getEventListener = function(type) {
		var element = this.getElement();
		return element["on" + type];
	}
	jsuis.Component.prototype.setEventListener = function(type, listener) {
		var element = this.getElement();
		element["on" + type] = listener;
		return this;
	}
	*/
	jsuis.Component.prototype.getEventListener = function(type) {
		var eventListeners = this.getEventListeners();
		return eventListeners["on" + type];
	}
	jsuis.Component.prototype.setEventListener = function(type, eventListener) {
		var oldEventListener = this.getEventListener(type);
		if (oldEventListener) {
			this.removeEventListener(type, oldEventListener);
		}
		this.addEventListener(type, eventListener);
		var eventListeners = this.getEventListeners();
		eventListeners["on" + type] = eventListener;
		return this;
	}
	jsuis.Component.prototype.addEventListener = function(type, eventListener) {
		var element = this.getElement();
		element.addEventListener(type, eventListener);
	}
	jsuis.Component.prototype.removeEventListener = function(type, eventListener) {
		var element = this.getElement();
		element.removeEventListener(type, eventListener);
	}
	jsuis.Component.prototype.getId = function() {
		return this.getAttribute("id");
	}
	jsuis.Component.prototype.setId = function(id) {
		this.setAttribute("id", id);
		return this;
	}
	jsuis.Component.prototype.getName = function() {
		return this.getAttribute("name");
	}
	jsuis.Component.prototype.setName = function(name) {
		this.setAttribute("name", name);
		return this;
	}
	jsuis.Component.prototype.addChild = function(component, referenceComponent) {
		var element = this.getElement();
		var componentElement = component.getElement();
		var referenceElement;
		if (referenceComponent) {
			referenceElement = referenceComponent.getElement();
		}
		element.insertBefore(componentElement, referenceElement);
	}
	jsuis.Component.prototype.removeChild = function(component) {
		var element = this.getElement();
		var componentElement = component.getElement();
		element.removeChild(componentElement);
	}
	jsuis.Component.prototype.add = function(component, constraints, index) {
		component.init();
		var components = this.getComponents();
		var referenceComponent = undefined;
		if (index !== undefined) {
			referenceComponent = components[index];
		}
		this.addChild(component, referenceComponent);
		component.setConstraints(jsuis.Object.clone(constraints));
		component.setParent(this);
		if (index !== undefined) {
			components.splice(index, 0, component);
		} else {
			components.push(component);
		}
	}
	jsuis.Component.prototype.remove = function(component) {
		this.removeChild(component);
		component.setParent(undefined);
		var components = this.getComponents();
		var index = components.indexOf(component);
		if (index !== -1) {
			components.splice(index, 1);
		}
	}
	jsuis.Component.prototype.removeAll = function() {
		var components = this.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			this.removeChild(component);
			component.setParent(undefined);
		}
		components.length = 0;
	}
	jsuis.Component.prototype.getX = function() {
		return this.x || 0;
	}
	jsuis.Component.prototype.setX = function(x) {
		var outsets = this.getOutsets();
		this.setAttribute("x", +nvl(x, 0) + outsets.getLeft());
		this.x = x;
		return this;
	}
	jsuis.Component.prototype.getY = function() {
		return this.y || 0;
	}
	jsuis.Component.prototype.setY = function(y) {
		var outsets = this.getOutsets();
		this.setAttribute("y", +nvl(y, 0) + outsets.getTop());
		this.y = y;
		return this;
	}
	jsuis.Component.prototype.getLocation = function() {
		return new jsuis.Point(this.getX(), this.getY());
	}
	jsuis.Component.prototype.setLocation = function(point) {
		this.setX(point.getX());
		this.setY(point.getY());
		return this;
	}
	jsuis.Component.prototype.getWidth = function() {
		return this.width || 0;
	}
	jsuis.Component.prototype.setWidth = function(width) {
		var outsets = this.getOutsets();
		width -= outsets.getLeft() + outsets.getRight();
		if (width >= 0) {
			this.setAttribute("width", width);
		}
		this.width = width;
		return this;
	}
	jsuis.Component.prototype.getHeight = function() {
		return this.height || 0;
	}
	jsuis.Component.prototype.setHeight = function(height) {
		var outsets = this.getOutsets();
		height -= outsets.getTop() + outsets.getBottom();
		if (height >= 0) {
			this.setAttribute("height", height);
		}
		this.height = height;
		return this;
	}
	jsuis.Component.prototype.getSize = function() {
		return new jsuis.Dimension(this.getWidth(), this.getHeight());
	}
	jsuis.Component.prototype.setSize = function(dimension) {
		this.setWidth(dimension.getWidth());
		this.setHeight(dimension.getHeight());
		return this;
	}
	jsuis.Component.prototype.getPreferredSize = function() {
		var layoutPaddingMargin = this.getLayoutPadding().add(this.getLayoutMargin());
		var preferredSize = this.preferredSize;
		if (preferredSize) {
			return preferredSize.add(layoutPaddingMargin.getDimension());
		}
		var layout = this.getLayout();
		if (layout) {
			var preferredLayoutSize = layout.preferredLayoutSize(this);
			return preferredLayoutSize.add(layoutPaddingMargin.getDimension());
		}
		var element = this.getElement();
		var bbox = element.getBBox();
		return new jsuis.Dimension(Math.ceil(bbox.width), Math.ceil(bbox.height)).add(layoutPaddingMargin.getDimension());
	}
	jsuis.Component.prototype.setPreferredSize = function(preferredSize) {
		this.preferredSize = preferredSize ? preferredSize.clone() : preferredSize;
		return this;
	}
	jsuis.Component.prototype.getMinimumSize = function() {
		var layoutPaddingMargin = this.getLayoutPadding().add(this.getLayoutMargin());
		var minimumSize = this.minimumSize;
		if (minimumSize) {
			return minimumSize.add(layoutPaddingMargin.getDimension());
		}
		var layout = this.getLayout();
		if (layout) {
			var minimumLayoutSize = layout.minimumLayoutSize(this);
			return minimumLayoutSize.add(layoutPaddingMargin.getDimension());
		}
		return this.getPreferredSize();
	}
	jsuis.Component.prototype.setMinimumSize = function(minimumSize) {
		this.minimumSize = minimumSize ? minimumSize.clone() : minimumSize;
		return this;
	}
	jsuis.Component.prototype.getBounds = function() {
		return new jsuis.Rectangle(this.getX(), this.getY(), this.getWidth(), this.getHeight());
	}
	jsuis.Component.prototype.setBounds = function(rectangle) {
		this.setX(rectangle.getX());
		this.setY(rectangle.getY());
		this.setWidth(rectangle.getWidth());
		this.setHeight(rectangle.getHeight());
		return this;
	}
	jsuis.Component.prototype.getMaximumLayoutBounds = function() {
		return this.maximumLayoutBounds;
	}
	jsuis.Component.prototype.setMaximumLayoutBounds = function(maximumLayoutBounds) {
		this.maximumLayoutBounds = maximumLayoutBounds ? maximumLayoutBounds.clone() : maximumLayoutBounds;
		return this;
	}
	jsuis.Component.prototype.getPadding = function() {
		if (!this.padding) {
			this.padding = new jsuis.Insets();
		}
		return this.padding.clone();
	}
	jsuis.Component.prototype.setPadding = function(padding) {
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
	jsuis.Component.prototype.getMargin = function() {
		if (!this.margin) {
			this.margin = new jsuis.Insets();
		}
		return this.margin.clone();
	}
	jsuis.Component.prototype.setMargin = function(margin) {
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
	jsuis.Component.prototype.getLayoutPadding = function() {
		if (!this.layoutPadding) {
			this.layoutPadding = new jsuis.Insets();
		}
		return this.layoutPadding.clone();
	}
	jsuis.Component.prototype.setLayoutPadding = function(layoutPadding) {
		if (!this.layoutPadding || !layoutPadding) {
			this.layoutPadding = new jsuis.Insets();
		}
		if (layoutPadding) {
			this.layoutPadding
			.setTop(layoutPadding.getTop())
			.setLeft(layoutPadding.getLeft())
			.setBottom(layoutPadding.getBottom())
			.setRight(layoutPadding.getRight());
		}
		return this;
	}
	jsuis.Component.prototype.getLayoutMargin = function() {
		if (!this.layoutMargin) {
			this.layoutMargin = new jsuis.Insets();
		}
		return this.layoutMargin.clone();
	}
	jsuis.Component.prototype.setLayoutMargin = function(layoutMargin) {
		if (!this.layoutMargin || !layoutMargin) {
			this.layoutMargin = new jsuis.Insets();
		}
		if (layoutMargin) {
			this.layoutMargin
			.setTop(layoutMargin.getTop())
			.setLeft(layoutMargin.getLeft())
			.setBottom(layoutMargin.getBottom())
			.setRight(layoutMargin.getRight());
		}
		return this;
	}
	jsuis.Component.prototype.getBorder = function() {
		return this.border;
	}
	jsuis.Component.prototype.setBorder = function(border) {
		this.border = border;
		border = nvl(border, new jsuis.Border());
		border.install(this);
		return this;
	}
	jsuis.Component.prototype.getInsets = function() {
		var insets = this.getPadding();
		var border = this.getBorder();
		if (border) {
			return insets.add(border.getBorderInsets(this));
		}
		return insets;
	}
	jsuis.Component.prototype.getOutsets = function() {
		var outsets = this.getMargin();
		var border = this.getBorder();
		if (border) {
			return outsets.add(border.getBorderOutsets(this));
		}
		return outsets;
	}
	jsuis.Component.prototype.isLeftToRight = function() {
		return nvl(this.leftToRight, true);
	}
	jsuis.Component.prototype.setLeftToRight = function(leftToRight) {
		this.leftToRight = leftToRight;
		return this;
	}
	jsuis.Component.prototype.validate = function() {
		var anchor = this.getAnchor();
		var fill = this.getFill();
		if (anchor || fill) {
			anchor = nvl(anchor, jsuis.Constants.CENTER);
			fill = nvl(fill, jsuis.Constants.NONE);
			var maximumLayoutBounds = this.getMaximumLayoutBounds();
			if (maximumLayoutBounds) {
				var x = maximumLayoutBounds.getX();
				var y = maximumLayoutBounds.getY();
				var width = maximumLayoutBounds.getWidth();
				var height = maximumLayoutBounds.getHeight();
				if (fill !== jsuis.Constants.BOTH) {
					var preferredSize = this.getPreferredSize();
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
				this.setBounds(new jsuis.Rectangle(Math.round(x), Math.round(y), width, height));
			}
		}
		this.doLayout();
		var components = this.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			component.validate();
		}
	}
	jsuis.Component.prototype.doLayout = function() {
		var layout = this.getLayout();
		if (layout) {
			layout.layoutContainer(this);
		}
	}
	jsuis.Component.prototype.isVisible = function() {
		return nvl(this.visible, true);
	}
	jsuis.Component.prototype.setVisible = function(visible) {
		this.setStyleProperty("display", visible ? "" : "none");
		var components = this.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			component.setVisible(visible);
		}
		this.visible = visible;
		return this;
	}
	jsuis.Component.prototype.getBackground = function() {
		return this.background;
	}
	jsuis.Component.prototype.setBackground = function(background) {
		this.background = background;
		this.setStyleProperty("fill", nvl(background, "none").toString());
		return this;
	}
	jsuis.Component.prototype.getForeground = function() {
		return this.foreground;
	}
	jsuis.Component.prototype.setForeground = function(foreground) {
		this.foreground = foreground;
		this.setStyleProperty("stroke", nvl(foreground, "none").toString());
		return this;
	}
	jsuis.Component.prototype.getFont = function() {
		return this.font;
	}
	jsuis.Component.prototype.setFont = function(font) {
		this.font = font;
		if (font) {
			this.setAttribute("font-family", font.getName());
			this.setAttribute("font-style", font.getStyle());
			this.setAttribute("font-size", font.getSize());
		}
		return this;
	}
	jsuis.Component.prototype.addComponentListener = function(componentListener) {
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
		if (listener.componentMoved) {
			//TODO
		}
	}
	jsuis.Component.prototype.removeComponentListener = function(componentListener) {
		var componentListeners = this.getComponentListeners();
		var index = componentListeners.indexOf(componentListener);
		if (index !== -1) {
			componentListeners.splice(index, 1);
		}
	}
	jsuis.Component.prototype.fireComponentResized = function(domEvent) {
		var event = new jsuis.ComponentEvent(this, jsuis.Constants.COMPONENT_RESIZED).setDomEvent(domEvent);
		var componentListeners = this.getComponentListeners();
		for (var i = 0; i < componentListeners.length; i++) {
			var componentListener = componentListeners[i];
			componentListener.componentResized(event);
		}
	}
	jsuis.Component.prototype.fireComponentMoved = function(domEvent) {
		var event = new jsuis.ComponentEvent(this, jsuis.Constants.COMPONENT_MOVED).setDomEvent(domEvent);
		var componentListeners = this.getComponentListeners();
		for (var i = 0; i < componentListeners.length; i++) {
			var componentListener = componentListeners[i];
			componentListener.componentMoved(event);
		}
	}
	jsuis.Component.prototype.isEnabled = function() {
		return nvl(this.enabled, true);
	}
	jsuis.Component.prototype.setEnabled = function(enabled) {
		this.setStyleProperty("pointer-events", enabled ? "" : "none");
		return this;
	}
	jsuis.Component.prototype.isSelectable = function() {
		return (this.getStyleProperty("user-select") !== "none");
	}
	jsuis.Component.prototype.setSelectable = function(selectable) {
		this.setStyleProperty("user-select", selectable ? "text" : "none");
		return this;
	}
	jsuis.Component.prototype.isPressed = function() {
		return this.pressed;
	}
	jsuis.Component.prototype.setPressed = function(pressed) {
		this.pressed = pressed;
		return this;
	}
	jsuis.Component.prototype.addMouseListener = function(mouseListener) {
		var mouseListeners = this.getMouseListeners();
		mouseListeners.push(mouseListener);
		var component = this;
		var listener = mouseListener;
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
		if (listener.mousePressed) {
			var onmousedown = this.getEventListener("mousedown");
			if (!onmousedown) {
				this.setEventListener("mousedown", function(event) {
					component.fireMousePressed(event);
				});
			}
		}
		if (listener.mouseReleased) {
			var browserWindow = jsuis.BrowserWindow.getInstance();
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
	}
	jsuis.Component.prototype.removeMouseListener = function(mouseListener) {
		var mouseListeners = this.getMouseListeners();
		var index = mouseListeners.indexOf(mouseListener);
		if (index !== -1) {
			mouseListeners.splice(index, 1);
		}
	}
	jsuis.Component.prototype.fireMouseClicked = function(domEvent) {
		var mouseEvent = new jsuis.MouseEvent(this, jsuis.Constants.MOUSE_CLICKED).setDomEvent(domEvent);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseClicked(mouseEvent);
		}
	}
	jsuis.Component.prototype.fireMouseDoubleClicked = function(domEvent) {
		var mouseEvent = new jsuis.MouseEvent(this, jsuis.Constants.MOUSE_CLICKED).setDomEvent(domEvent).setClickCount(2);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseClicked(mouseEvent);
		}
	}
	jsuis.Component.prototype.fireMouseRightClicked = function(domEvent) {
		var mouseEvent = new jsuis.MouseEvent(this, jsuis.Constants.MOUSE_CLICKED).setDomEvent(domEvent).setPopupTrigger(true);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseClicked(mouseEvent);
		}
	}
	jsuis.Component.prototype.fireMousePressed = function(domEvent) {
		this.setPressed(true);
		var mouseEvent = new jsuis.MouseEvent(this, jsuis.Constants.MOUSE_PRESSED).setDomEvent(domEvent);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mousePressed(mouseEvent);
		}
	}
	jsuis.Component.prototype.fireMouseReleased = function(domEvent) {
		this.setPressed(false);
		var mouseEvent = new jsuis.MouseEvent(this, jsuis.Constants.MOUSE_RELEASED).setDomEvent(domEvent);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseReleased(mouseEvent);
		}
	}
	jsuis.Component.prototype.fireMouseEntered = function(domEvent) {
		var mouseEvent = new jsuis.MouseEvent(this, jsuis.Constants.MOUSE_ENTERED).setDomEvent(domEvent);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseEntered(mouseEvent);
		}
	}
	jsuis.Component.prototype.fireMouseExited = function(domEvent) {
		var mouseEvent = new jsuis.MouseEvent(this, jsuis.Constants.MOUSE_EXITED).setDomEvent(domEvent);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseExited(mouseEvent);
		}
	}
	jsuis.Component.prototype.addMouseMotionListener = function(mouseMotionListener) {
		var mouseMotionListeners = this.getMouseMotionListeners();
		mouseMotionListeners.push(mouseMotionListener);
		var component = this;
		var listener = mouseMotionListener.getListener();
		if (listener.mouseMoved) {
			var onmousemove = this.getEventListener("mousemove");
			if (!onmousemove) {
				this.setEventListener("mousemove", function(event) {
					component.fireMouseMoved(event);
				});
			}
		}
		if (listener.mouseDragged) {
			var browserWindow = jsuis.BrowserWindow.getInstance();
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
	jsuis.Component.prototype.removeMouseMotionListener = function(mouseMotionListener) {
		var mouseMotionListeners = this.getMouseMotionListeners();
		var index = mouseMotionListeners.indexOf(mouseMotionListener);
		if (index !== -1) {
			mouseMotionListeners.splice(index, 1);
		}
	}
	jsuis.Component.prototype.fireMouseMoved = function(domEvent) {
		if (this.isPressed()) {
			return;
		}
		var mouseEvent = new jsuis.MouseEvent(this, jsuis.Constants.MOUSE_MOVED).setDomEvent(domEvent);
		var mouseMotionListeners = this.getMouseMotionListeners();
		for (var i = 0; i < mouseMotionListeners.length; i++) {
			var mouseMotionListener = mouseMotionListeners[i];
			mouseMotionListener.mouseMoved(mouseEvent);
		}
	}
	jsuis.Component.prototype.fireMouseDragged = function(domEvent) {
		var mouseEvent = new jsuis.MouseEvent(this, jsuis.Constants.MOUSE_DRAGGED).setDomEvent(domEvent);
		var mouseMotionListeners = this.getMouseMotionListeners();
		for (var i = 0; i < mouseMotionListeners.length; i++) {
			var mouseMotionListener = mouseMotionListeners[i];
			mouseMotionListener.mouseDragged(mouseEvent);
		}
	}
	jsuis.Component.prototype.addPropertyChangeListener = function(propertyChangeListener) {
		var propertyName = propertyChangeListener.getPropertyName() || "";
		var propertyChangeListeners = this.getPropertyChangeListeners(propertyName);
		propertyChangeListeners.push(propertyChangeListener);
		if (propertyName !== "") {
			propertyChangeListeners = this.getPropertyChangeListeners();
			propertyChangeListeners.push(propertyChangeListener);
		}
	}
	jsuis.Component.prototype.removePropertyChangeListener = function(propertyChangeListener) {
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
	jsuis.Component.prototype.getPropertyChangeListeners = function(propertyName) {
		propertyName = propertyName || "";
		var propertyChangeListeners = this.propertyChangeListeners;
		if (!propertyChangeListeners[propertyName]) {
			propertyChangeListeners[propertyName] = [];
		}
		return propertyChangeListeners[propertyName];
	}
	jsuis.Component.prototype.firePropertyChange = function(propertyName, oldValue, newValue) {
		var propertyChangeEvent = new jsuis.PropertyChangeEvent(this, propertyName, oldValue, newValue);
		var propertyChangeListeners = this.getPropertyChangeListeners(propertyName);
		for (var i = 0; i < propertyChangeListeners.length; i++) {
			var propertyChangeListener = propertyChangeListeners[i];
			propertyChangeListener.propertyChange(propertyChangeEvent);
		}
	}
	jsuis.Component.prototype.addActionListener = function(actionListener) {
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
	jsuis.Component.prototype.removeActionListener = function(actionListener) {
		var actionListeners = this.getActionListeners();
		var index = actionListeners.indexOf(actionListener);
		if (index !== -1) {
			actionListeners.splice(index, 1);
		}
	}
	jsuis.Component.prototype.fireActionPerformed = function(domEvent) {
		var event = new jsuis.ActionEvent(this, jsuis.Constants.ACTION_PERFORMED, this.getActionCommand()).setDomEvent(domEvent);
		var actionListeners = this.getActionListeners();
		for (var i = 0; i < actionListeners.length; i++) {
			var actionListener = actionListeners[i];
			actionListener.actionPerformed(event);
		}
	}
})(jsuis);

/**
 * jsuis.Dimension
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Dimension = jsuis.Object.extend(SUPER, function(width, height) {
		SUPER.prototype.constructor.call(this);
		this.setWidth(nvl(width, 0));
		this.setHeight(nvl(height, 0));
	});
	jsuis.Object.addProperties(jsuis.Dimension,
			new jsuis.Property("width"),
			new jsuis.Property("height")
	);
	jsuis.Dimension.prototype.add = function(insets) {
		var width = this.getWidth() + insets.getWidth();
		var height = this.getHeight() + insets.getHeight();
		return new jsuis.Dimension(width, height);
	}
	jsuis.Dimension.prototype.subtract = function(insets) {
		var width = this.getWidth() - insets.getWidth();
		var height = this.getHeight() - insets.getHeight();
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
	jsuis.Event = jsuis.Object.extend(SUPER, function(source, id, when, modifiers) {
		SUPER.prototype.constructor.call(this);
		this.setSource(source);
		this.setId(id);
		this.setWhen(when);
		this.setModifiers(modifiers);
	});
	jsuis.Object.addProperties(jsuis.Event,
			new jsuis.Property("domEvent"),
			new jsuis.Property("source"),
			new jsuis.Property("id"),
			new jsuis.Property("when"),
			new jsuis.Property("modifiers")
	);
	
	jsuis.Event.prototype.setComponent = jsuis.Event.prototype.setSource;
	jsuis.Event.prototype.getComponent = jsuis.Event.prototype.getSource;
	
	jsuis.Event.prototype.stopPropagation = function() {
		var domEvent = this.getDomEvent();
		if (domEvent) {
			domEvent.stopPropagation();
		}
	}
	
	jsuis.Event.prototype.getWhen = function() {
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
	
	jsuis.Event.prototype.getModifiers = function() {
		var modifiers = this.modifiers;
		if (modifiers !== null && modifiers !== undefined) {
			return modifiers;
		}
		var domEvent = this.getDomEvent();
		if (domEvent) {
			modifiers = (domEvent.shiftKey ? (jsuis.Event.SHIFT_MASK | jsuis.Event.SHIFT_DOWN_MASK) : 0)
			| (domEvent.ctrlKey ? (jsuis.Event.CTRL_MASK | jsuis.Event.CTRL_DOWN_MASK) : 0)
			| (domEvent.metaKey ? (jsuis.Event.META_MASK | jsuis.Event.META_DOWN_MASK) : 0)
			| (domEvent.altKey ? (jsuis.Event.ALT_MASK | jsuis.Event.ALT_DOWN_MASK) : 0);
			this.setModifiers(modifiers);
		}
		return modifiers;
	}
	
	jsuis.Event.SHIFT_MASK = 1;
	jsuis.Event.CTRL_MASK = 2;
	jsuis.Event.META_MASK = 4;
	jsuis.Event.ALT_MASK = 8;
	
	jsuis.Event.SHIFT_DOWN_MASK = 64;
	jsuis.Event.CTRL_DOWN_MASK = 128;
	jsuis.Event.META_DOWN_MASK = 256;
	jsuis.Event.ALT_DOWN_MASK = 512;
	
}) (jsuis);

/**
 * jsuis.FlowLayout
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.FlowLayout = jsuis.Object.extend(SUPER, function(align, hgap, vgap) {
		SUPER.prototype.constructor.call(this);
		this.setAlign(nvl(align, jsuis.FlowLayout.CENTER));
		this.setHgap(nvl(hgap, 4));
		this.setVgap(nvl(vgap, 4));
	});
	jsuis.Object.addProperties(jsuis.FlowLayout,
			new jsuis.Property("align"),
			new jsuis.Property("hgap"),
			new jsuis.Property("vgap")
	);
	jsuis.FlowLayout.LEFT = 0;
	jsuis.FlowLayout.CENTER = 1;
	jsuis.FlowLayout.RIGHT = 2;
	jsuis.FlowLayout.LEADING = 3;
	jsuis.FlowLayout.TRAILING = 4;
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
				case jsuis.FlowLayout.RIGHT:
				case jsuis.FlowLayout.TRAILING:
					dx = maxWidth - width;
					break;
				case jsuis.FlowLayout.CENTER:
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
					rowComponent.setBounds(bounds);
					rowComponent.setMaximumLayoutBounds(bounds);
					rowComponent.setAnchor(rowComponent.getAnchor() || jsuis.Constants.CENTER);
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
	jsuis.Object.addProperties(jsuis.Font,
			new jsuis.Property("name"),
			new jsuis.Property("style"),
			new jsuis.Property("size")
	);
}) (jsuis);

/**
 * jsuis.GridBagConstraints
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.GridBagConstraints = jsuis.Object.extend(SUPER, function(
			gridx, gridy, gridwidth, gridheight,
			weightx, weighty,
			anchor, fill,
			insets, ipadx, ipady) {
		SUPER.prototype.constructor.call(this);
		this.setGridx(nvl(gridx, jsuis.Constants.RELATIVE));
		this.setGridy(nvl(gridy, jsuis.Constants.RELATIVE));
		this.setGridwidth(nvl(gridwidth, 1));
		this.setGridheight(nvl(gridheight, 1));
		this.setWeightx(nvl(weightx, 0));
		this.setWeighty(nvl(weighty, 0));
		this.setAnchor(nvl(anchor, jsuis.Constants.CENTER));
		this.setFill(nvl(fill, jsuis.Constants.NONE));
		this.setInsets(nvl(insets, new jsuis.Insets()));
		this.setIpadx(nvl(ipadx, 0));
		this.setIpady(nvl(ipady, 0));
	});
	jsuis.Object.addProperties(jsuis.GridBagConstraints,
			new jsuis.Property("gridx"),
			new jsuis.Property("gridy"),
			new jsuis.Property("gridwidth"),
			new jsuis.Property("gridheight"),
			new jsuis.Property("weightx"),
			new jsuis.Property("weighty"),
			new jsuis.Property("anchor"),
			new jsuis.Property("fill"),
			new jsuis.Property("insets"),
			new jsuis.Property("ipadx"),
			new jsuis.Property("ipady"),
			new jsuis.Property("relativeGridx"),
			new jsuis.Property("relativeGridy"),
			new jsuis.Property("remainderGridwidth"),
			new jsuis.Property("remainderGridheight")
	);
	jsuis.GridBagConstraints.prototype.setGridx = function(gridx) {
		this.gridx = gridx;
		return this;
	}
	jsuis.GridBagConstraints.prototype.setGridy = function(gridy) {
		this.gridy = gridy;
		return this;
	}
	jsuis.GridBagConstraints.prototype.setGridwidth = function(gridwidth) {
		this.gridwidth = gridwidth;
		return this;
	}
	jsuis.GridBagConstraints.prototype.setGridheight = function(gridheight) {
		this.gridheight = gridheight;
		return this;
	}
	jsuis.GridBagConstraints.prototype.setWeightx = function(weightx) {
		this.weightx = weightx;
		return this;
	}
	jsuis.GridBagConstraints.prototype.setWeighty = function(weighty) {
		this.weighty = weighty;
		return this;
	}
	jsuis.GridBagConstraints.prototype.setAnchor = function(anchor) {
		this.anchor = anchor;
		return this;
	}
	jsuis.GridBagConstraints.prototype.setFill = function(fill) {
		this.fill = fill;
		return this;
	}
	jsuis.GridBagConstraints.prototype.setInsets = function(insets) {
		this.insets = insets;
		return this;
	}
	jsuis.GridBagConstraints.prototype.setIpadx = function(ipadx) {
		this.ipadx = ipadx;
		return this;
	}
	jsuis.GridBagConstraints.prototype.setIpady = function(ipady) {
		this.ipady = ipady;
		return this;
	}
	jsuis.GridBagConstraints.prototype.clone = function() {
		return new jsuis.GridBagConstraints(
				this.getGridx(), this.getGridy(), this.getGridwidth(), this.getGridheight(),
				this.getWeightx(), this.getWeighty(),
				this.getAnchor(), this.getFill(),
				this.getInsets(), this.getIpadx(), this.getIpady());
	}
}) (jsuis);

/**
 * jsuis.GridBagLayout
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.GridBagLayout = jsuis.Object.extend(SUPER, function(hgap, vgap) {
		SUPER.prototype.constructor.call(this);
		hgap = nvl(hgap, 0);
		vgap = nvl(vgap, hgap);
		this.setHgap(hgap);
		this.setVgap(vgap);
	});
	jsuis.Object.addProperties(jsuis.GridBagLayout,
			new jsuis.Property("hgap"),
			new jsuis.Property("vgap"),
			new jsuis.Property("widths"),
			new jsuis.Property("heights"),
			new jsuis.Property("weightxs"),
			new jsuis.Property("weightys")
	);
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
			if (!component.isVisible()) {
				continue;
			}
			var constraints = component.getConstraints();
			if (!constraints) {
				constraints = new jsuis.GridBagConstraints();
				component.setConstraints(constraints);
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
			var ipadx = constraints.getIpadx();
			var ipady = constraints.getIpady();
			component.setLayoutPadding(new jsuis.Insets(ipady, ipadx));
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
				var weightx = constraints.getWeightx();
				var componentPreferredSize = component.getPreferredSize();
				var componentPreferredWidth = componentPreferredSize.getWidth();
				widths[i] = Math.max(widths[i], componentPreferredWidth
						- widths[i - gridwidth + 1]);
				weightxs[i] = Math.max(weightxs[i], weightx - weightxs[i - gridwidth + 1]);
				var index = remainingComponents.indexOf(component);
				if (index !== -1) {
					remainingComponents.splice(index, 1);
				}
			}
			widthComponents = remainingComponents;
		}
		this.setWidths(widths);
		this.setWeightxs(weightxs);
		
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
				var weighty = constraints.getWeighty();
				var componentPreferredSize = component.getPreferredSize();
				var componentPreferredHeight = componentPreferredSize.getHeight();
				heights[i] = Math.max(heights[i], componentPreferredHeight
						- heights[i - gridheight + 1]);
				weightys[i] = Math.max(weightys[i], weighty - weightys[i - gridheight + 1]);
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
			if (!component.isVisible()) {
				continue;
			}
			var constraints = component.getConstraints();
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
			var anchor = constraints.getAnchor();
			component.setAnchor(anchor);
			var fill = constraints.getFill();
			component.setFill(fill);
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
			component.setBounds(bounds);
			component.setMaximumLayoutBounds(bounds);
		}
	}
	jsuis.GridBagLayout.prototype.minimumLayoutSize = function(parent) {
		return this.preferredLayoutSize(parent);
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
	jsuis.Object.addProperties(jsuis.Insets,
			new jsuis.Property("top"),
			new jsuis.Property("left"),
			new jsuis.Property("bottom"),
			new jsuis.Property("right")
	);
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
 * jsuis.Listener
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Listener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this);
		this.setListener(listener);
	});
	jsuis.Object.addProperties(jsuis.Listener,
			new jsuis.Property("listener"),
			new jsuis.Property("listenerComponent")
	);
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
	jsuis.Object.addProperties(jsuis.Point,
			new jsuis.Property("x"),
			new jsuis.Property("y")
	);
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
	jsuis.Object.addProperties(jsuis.PropertyChangeEvent,
			new jsuis.Property("source"),
			new jsuis.Property("propertyName"),
			new jsuis.Property("oldValue"),
			new jsuis.Property("newValue")
	);
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
	jsuis.Object.addProperties(jsuis.Rectangle,
			new jsuis.Property("x"),
			new jsuis.Property("y"),
			new jsuis.Property("width"),
			new jsuis.Property("height")
	);
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
 * jsuis.Timer
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Timer = jsuis.Object.extend(SUPER, function(delay, actionListener) {
		SUPER.prototype.constructor.call(this);
		this.setActionListeners([]);
		this.setDelay(delay);
		this.addActionListener(actionListener);
		this.setInitialDelay(delay);
		this.setRepeats(true);
	});
	jsuis.Object.addProperties(jsuis.Timer,
			new jsuis.Property("actionListeners"),
			new jsuis.Property("delay"),
			new jsuis.Property("actionListener"),
			new jsuis.Property("initialDelay"),
			new jsuis.Property("timeout"),
			new jsuis.Property("interval"),
			new jsuis.Property("actionCommand")
	);
	jsuis.Timer.prototype.addActionListener = function(actionListener) {
		var actionListeners = this.getActionListeners();
		actionListeners.push(actionListener);
	}
	jsuis.Timer.prototype.removeActionListener = function(actionListener) {
		var actionListeners = this.getActionListeners();
		var index = actionListeners.indexOf(actionListener);
		if (index !== -1) {
			actionListeners.splice(index, 1);
		}
	}
	jsuis.Timer.prototype.fireActionPerformed = function() {
		var event = new jsuis.ActionEvent(this, jsuis.Constants.ACTION_PERFORMED, this.getActionCommand());
		var actionListeners = this.getActionListeners();
		for (var i = 0; i < actionListeners.length; i++) {
			var actionListener = actionListeners[i];
			actionListener.actionPerformed(event);
		}
	}
	jsuis.Timer.prototype.isRepeats = function() {
		return this.repeats;
	}
	jsuis.Timer.prototype.setRepeats = function(repeats) {
		this.repeats = repeats;
		return this;
	}
	jsuis.Timer.prototype.start = function() {
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
	jsuis.Timer.prototype.stop = function() {
		try {
			this.stopInterval();
		} finally {
			this.stopTimeout();
		}
	}
	jsuis.Timer.prototype.stopInterval = function() {
		var interval = this.getInterval();
		if (interval) {
			clearInterval(interval);
			interval = null;
		}
	}
	jsuis.Timer.prototype.stopTimeout = function() {
		var timeout = this.getTimeout();
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}
	}
}) (jsuis);

/**
 * jsuis.ActionEvent
 */
(function(jsuis) {
	var SUPER = jsuis.Event;
	jsuis.ActionEvent = jsuis.Object.extend(SUPER, function(component, id, actionCommand, when, modifiers) {
		SUPER.prototype.constructor.call(this, component, id, when, modifiers);
		this.setActionCommand(actionCommand);
	});
	jsuis.Object.addProperties(jsuis.ActionEvent,
			new jsuis.Property("actionCommand")
	);
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
 * jsuis.ClipPath
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.ClipPath = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.SVG, "clipPath"));
		this.setId(jsuis.ClipPath.next());
	});
	jsuis.ClipPath.sequence = 0;
	jsuis.ClipPath.next = function() {
		return "ClipPath-" + jsuis.ClipPath.sequence++;
	};
}) (jsuis);

/**
 * jsuis.ComponentEvent
 */
(function(jsuis) {
	var SUPER = jsuis.Event;
	jsuis.ComponentEvent = jsuis.Object.extend(SUPER, function(component, id) {
		SUPER.prototype.constructor.call(this, component, id);
	});
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
 * jsuis.Defs
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Defs = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.SVG, "defs"));
	});
}) (jsuis);

/**
 * jsuis.Frame
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Frame = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.SVG, "svg"));
		this.setVisible(false);
		SUPER.prototype.setLayout.call(this, new jsuis.BorderLayout());
		var rootPane = new jsuis.RootPane();
		this.setRootPane(rootPane);
		SUPER.prototype.add.call(this, rootPane);
		var contentPane = new jsuis.Panel(new jsuis.BorderLayout());
		this.setContentPane(contentPane);
		rootPane.add(contentPane, jsuis.Constants.FRAME_CONTENT_LAYER);
		this.setBackground(jsuis.Color.getColor(0xEEEEEE));
		var browserWindow = jsuis.BrowserWindow.getInstance();
		var browserWindowComponentListeners = browserWindow.getComponentListeners();
		var i = 0;
		for (; i < browserWindowComponentListeners.length; i++) {
			var browserWindowComponentListener = browserWindowComponentListeners[i];
			if (browserWindowComponentListener.getListenerComponent() === this) {
				break;
			}
		}
		if (i === browserWindowComponentListeners.length) {
			var componentListener = new jsuis.ComponentListener({
				componentResized: function(event) {
					var component = this.getListenerComponent();
					component.validate();
				}
			});
			componentListener.setListenerComponent(this);
			browserWindow.addComponentListener(componentListener);
		}
	});
	jsuis.Object.addProperties(jsuis.Frame,
			new jsuis.Property("rootPane"),
			new jsuis.Property("contentPane")
	);
	jsuis.Frame.prototype.add = function(component, constraints, index) {
		var contentPane = this.getContentPane();
		contentPane.add(component, constraints, index);
	}
	jsuis.Frame.prototype.remove = function(component) {
		var contentPane = this.getContentPane();
		contentPane.remove(component);
	}
	jsuis.Frame.prototype.removeAll = function() {
		var contentPane = this.getContentPane();
		contentPane.removeAll();
	}
	jsuis.Frame.prototype.getLayout = function() {
		var contentPane = this.getContentPane();
		return contentPane.getLayout();
	}
	jsuis.Frame.prototype.setLayout = function(layout) {
		var contentPane = this.getContentPane();
		contentPane.setLayout(layout);
		return this;
	}
	jsuis.Frame.prototype.validate = function() {
		var parent = this.getParent();
		if (!parent) {
			return;
		}
		var parentElement = parent.getElement();
		SUPER.prototype.setWidth.call(this, parentElement.clientWidth);
		SUPER.prototype.setHeight.call(this, parentElement.clientHeight);
		SUPER.prototype.validate.call(this);
	}
	jsuis.Frame.prototype.doLayout = function() {
		var layout = SUPER.prototype.getLayout.call(this);
		if (layout) {
			layout.layoutContainer(this);
		}
	}
	jsuis.Frame.prototype.setVisible = function(visible) {
		SUPER.prototype.setVisible.call(this, visible);
		if (visible) {
			this.validate();
		}
		return this;
	}
	jsuis.Frame.prototype.getBackground = function() {
		var contentPane = this.getContentPane();
		return contentPane.getBackground();
	}
	jsuis.Frame.prototype.setBackground = function(background) {
		var contentPane = this.getContentPane();
		contentPane.setBackground(background);
		return this;
	}
	jsuis.Frame.prototype.dispose = function() {
		var browserWindow = jsuis.BrowserWindow.getInstance();
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
 * jsuis.Label
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Label = jsuis.Object.extend(SUPER, function(text) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.SVG, "text"));
		SUPER.prototype.setEnabled.call(this, false);
		this.setText(nvl(text, ""));
		this.setFont(new jsuis.Font("Arial", "bold", 12));
		this.setForeground(jsuis.Color.Black);
		this.setDisabledColor(jsuis.Color.Gray);
		this.setSelectable(false);
	});
	jsuis.Object.addProperties(jsuis.Label,
			new jsuis.Property("color"),
			new jsuis.Property("disabledColor")
	);
	jsuis.Label.prototype.getText = function() {
		var element = this.getElement();
		return element.textContent;
	}
	jsuis.Label.prototype.setText = function(text) {
		var element = this.getElement();
		element.textContent = text;
		return this;
	}
	jsuis.Label.prototype.getWidth = function() {
		return this.getPreferredSize().getWidth();
	}
	jsuis.Label.prototype.setWidth = function(width) {
		return this;
	}
	jsuis.Label.prototype.getHeight = function() {
		return this.getPreferredSize().getHeight();
	}
	jsuis.Label.prototype.setHeight = function(height) {
		return this;
	}
	jsuis.Label.prototype.getBackground = function() {
		SUPER.prototype.getForeground.call(this);
	}
	jsuis.Label.prototype.setBackground = function(background) {
		SUPER.prototype.setForeground.call(this, background);
		return this;
	}
	jsuis.Label.prototype.getForeground = function() {
		SUPER.prototype.getBackground.call(this);
	}
	jsuis.Label.prototype.setForeground = function(foreground) {
		this.setColor(foreground);
		SUPER.prototype.setBackground.call(this, foreground);
		return this;
	}
	jsuis.Label.prototype.getEnabled = function() {
		return this.enabled;
	}
	jsuis.Label.prototype.setEnabled = function(enabled) {
		if (enabled) {
			var color = this.getColor();
			SUPER.prototype.setBackground.call(this, color);
		} else {
			var disabledColor = this.getDisabledColor();
			SUPER.prototype.setBackground.call(this, disabledColor);
		}
		this.enabled = enabled;
		return this;
	}
	jsuis.Label.prototype.validate = function() {
		var element = this.getElement();
		this.setAttribute("transform", "translate(" + 0 + "," + (this.getY() - element.getBBox().y) + ")");
		SUPER.prototype.validate.call(this);
	}
}) (jsuis);

/**
 * jsuis.LineBorder
 */
(function(jsuis) {
	var SUPER = jsuis.Border;
	jsuis.LineBorder = jsuis.Object.extend(SUPER, function(color, thickness, rx, ry) {
		SUPER.prototype.constructor.call(this, color, thickness);
		this.setColor(nvl(color, jsuis.Color.black));
		this.setThickness(nvl(thickness, 1));
		rx = nvl(rx, 0);
		ry = nvl(ry, rx);
		this.setRx(rx);
		this.setRy(ry);
	});
	jsuis.Object.addProperties(jsuis.LineBorder,
			new jsuis.Property("color"),
			new jsuis.Property("thickness"),
			new jsuis.Property("rx"),
			new jsuis.Property("ry")
	);
	jsuis.LineBorder.prototype.getBorderInsets = function(component) {
		var thickness = this.getThickness();
		return new jsuis.Insets(thickness / 2, thickness / 2, thickness / 2, thickness / 2);
	}
	jsuis.LineBorder.prototype.getBorderOutsets = function(component) {
		var thickness = this.getThickness();
		return new jsuis.Insets(thickness / 2, thickness / 2, thickness / 2, thickness / 2);
	}
	jsuis.LineBorder.prototype.install = function(component) {
		var shape = component.getShape();
		if (!shape) {
			return;
		}
		var color = this.getColor();
		shape.setForeground(color);
		var thickness = this.getThickness();
		shape.setStyleProperty("stroke-width", thickness);
		var rx = this.getRx();
		shape.setAttribute("rx", rx);
		var ry = this.getRy();
		shape.setAttribute("ry", ry);
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
	jsuis.Panel = jsuis.Object.extend(SUPER, function(layout, shape) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.SVG, "g"));
		this.setShape(nvl(shape, new jsuis.Rect()));
		this.setLayout(layout !== undefined ? layout : new jsuis.FlowLayout());
		this.setBackground(null);
	});
	jsuis.Object.addProperties(jsuis.Panel,
			new jsuis.Property("shape")
	);
	jsuis.Panel.prototype.setShape = function(shape) {
		var oldShape = this.getShape();
		if (oldShape) {
			this.removeChild(oldShape);
		}
		if (shape) {
			this.addChild(shape);
		}
		this.shape = shape;
		return this;
	}
	jsuis.Panel.prototype.setX = function(x) {
		this.setAttribute("transform", "translate(" + nvl(x, 0) + "," + this.getY() + ")");
		var shape = this.getShape();
		var outsets = this.getOutsets();
		shape.setX(outsets.getLeft());
		this.x = x;
		return this;
	}
	jsuis.Panel.prototype.setY = function(y) {
		this.setAttribute("transform", "translate(" + this.getX() + "," + nvl(y, 0) + ")");
		var shape = this.getShape();
		var outsets = this.getOutsets();
		shape.setY(outsets.getTop());
		this.y = y;
		return this;
	}
	jsuis.Panel.prototype.getWidth = function() {
		var shape = this.getShape();
		var outsets = this.getOutsets();
		return shape.getWidth() + outsets.getLeft() + outsets.getRight();
	}
	jsuis.Panel.prototype.setWidth = function(width) {
		var shape = this.getShape();
		var outsets = this.getOutsets();
		shape.setWidth(width - outsets.getLeft() - outsets.getRight());
		return this;
	}
	jsuis.Panel.prototype.getHeight = function() {
		var shape = this.getShape();
		var outsets = this.getOutsets();
		return shape.getHeight() + outsets.getTop() + outsets.getBottom();
	}
	jsuis.Panel.prototype.setHeight = function(height) {
		var shape = this.getShape();
		var outsets = this.getOutsets();
		shape.setHeight(height - outsets.getTop() - outsets.getBottom());
		return this;
	}
	jsuis.Panel.prototype.setVisible = function(visible) {
		var shape = this.getShape();
		shape.setVisible(visible);
		SUPER.prototype.setVisible.call(this, visible);
		return this;
	}
	jsuis.Panel.prototype.getBackground = function() {
		var shape = this.getShape();
		return shape.getBackground();
	}
	jsuis.Panel.prototype.setBackground = function(background) {
		var shape = this.getShape();
		shape.setBackground(background);
		return this;
	}
	jsuis.Panel.prototype.addMouseListener = function(mouseListener) {
		var shape = this.getShape();
		SUPER.prototype.addMouseListener.call(this, mouseListener, shape);
	}
}) (jsuis);

/**
 * jsuis.Path
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Path = jsuis.Object.extend(SUPER, function(d) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.SVG, "path"));
		this.setAttribute("d", d);
	});
	jsuis.Path.prototype.setX = function(x) {
		this.setAttribute("transform", "translate(" + nvl(x, 0) + "," + this.getY() + ")");
		this.x = x;
		return this;
	}
	jsuis.Path.prototype.setY = function(y) {
		this.setAttribute("transform", "translate(" + this.getX() + "," + nvl(y, 0) + ")");
		this.y = y;
		return this;
	}
}) (jsuis);

/**
 * jsuis.PropertyChangeListener
 */
(function(jsuis) {
	var SUPER = jsuis.Listener;
	jsuis.PropertyChangeListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.Object.addProperties(jsuis.PropertyChangeListener,
			new jsuis.Property("propertyName")
	);
	jsuis.PropertyChangeListener.prototype.propertyChange = function(event) {
		var listener = this.getListener();
		listener.propertyChange.call(this, event);
	}
}) (jsuis);

/**
 * jsuis.Rect
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Rect = jsuis.Object.extend(SUPER, function(x, y, width, height) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.SVG, "rect"));
		this.setX(nvl(x, 0));
		this.setY(nvl(y, 0));
		this.setWidth(nvl(width, 0));
		this.setHeight(nvl(height, 0));
	});
}) (jsuis);

/**
 * jsuis.Viewport
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Viewport = jsuis.Object.extend(SUPER, function(view, viewBox) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.SVG, "svg"));
		if ((view !== null) && (view !== undefined)) {
			this.setView(view);
		}
		if ((viewBox !== null) && (viewBox !== undefined)) {
			this.setViewBox(viewBox);
		}
		this.setAttribute("preserveAspectRatio", "none");
	});
	jsuis.Object.addProperties(jsuis.Viewport,
			new jsuis.Property("view"),
			new jsuis.Property("viewPosition")
	);
	jsuis.Viewport.prototype.setView = function(view) {
		this.removeAll();
		this.add(view);
		this.view = view;
		return this;
	}
	jsuis.Viewport.prototype.getViewBox = function() {
		return this.viewBox || new jsuis.Rectangle();
	}
	jsuis.Viewport.prototype.setViewBox = function(viewBox) {
		this.viewBox = viewBox;
		this.setAttribute("viewBox", viewBox.getX() + " " + viewBox.getY() + " " + viewBox.getWidth() + " " + viewBox.getHeight());
		return this;
	}
}) (jsuis);

/**
 * jsuis.Button
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.Button = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, null);
		this.setLayout(new jsuis.GridBagLayout());
		if ((text !== null) && (text !== undefined)) {
			this.setText(text);
		}
		if ((icon !== null) && (icon !== undefined)) {
			this.setIcon(icon);
		}
		this.setIconTextGap(4);
		this.setPadding(new jsuis.Insets(2, 4));
		this.setBorder(new jsuis.LineBorder(jsuis.Color.Black.withAlpha(.4 * 255)));
		this.setBackground(jsuis.Color.Black.withAlpha(.1 * 255));
		this.setRolloverColor(jsuis.Color.Black.withAlpha(.2 * 255));
		this.setPressedColor(jsuis.Color.Black.withAlpha(.3 * 255));
		this.setForeground(jsuis.Color.Black);
		// this.setDisabledColor(jsuis.Color.Gray);
		var mouseListener = new jsuis.MouseListener({
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
	jsuis.Object.addProperties(jsuis.Button,
			new jsuis.Property("label"),
			new jsuis.Property("icon"),
			new jsuis.Property("iconTextGap"),
			new jsuis.Property("color"),
			new jsuis.Property("pressedColor"),
			new jsuis.Property("rolloverColor")
	);
	jsuis.Button.prototype.setText = function(text, textConstraints) {
		var label = this.getLabel();
		if (!label) {
			label = new jsuis.Label();
			this.setLabel(label);
			this.add(label, nvl(textConstraints, new jsuis.GridBagConstraints().setGridx(1).setGridy(0)));
		}
		label.setText(text);
		var layout = this.getLayout();
		var icon = this.getIcon();
		if (icon && text) {
			var iconTextGap = this.getIconTextGap();
			layout.setHgap(iconTextGap).setVgap(iconTextGap);
		} else {
			layout.setHgap(0).setVgap(0);
		}
		return this;
	}
	jsuis.Button.prototype.getText = function() {
		var label = this.getLabel();
		if (label) {
			return label.getText();
		}
		return "";
	}
	jsuis.Button.prototype.setIcon = function(icon, iconConstraints) {
		var oldIcon = this.getIcon();
		if (oldIcon) {
			this.remove(oldIcon);
		}
		if (icon) {
			icon.setEnabled(false);
			this.add(icon, nvl(iconConstraints, new jsuis.GridBagConstraints().setGridx(0).setGridy(0)));
		}
		var layout = this.getLayout();
		var text = this.getText();
		if (icon && text) {
			var iconTextGap = this.getIconTextGap();
			layout.setHgap(iconTextGap).setVgap(iconTextGap);
		} else {
			layout.setHgap(0).setVgap(0);
		}
		this.icon = icon;
		return this;
	}
	jsuis.Button.prototype.setIconTextGap = function(iconTextGap) {
		var layout = this.getLayout();
		var icon = this.getIcon();
		var text = this.getText();
		if (icon && text) {
			layout.setHgap(iconTextGap).setVgap(iconTextGap);
		} else {
			layout.setHgap(0).setVgap(0);
		}
		this.iconTextGap = iconTextGap;
		return this;
	}
	jsuis.Button.prototype.setBackground = function(background) {
		this.setColor(background);
		this.setRolloverColor(background);
		this.setPressedColor(background);
		SUPER.prototype.setBackground.call(this, background);
		return this;
	}
	jsuis.Button.prototype.getForeground = function() {
		var label = this.getLabel();
		return label.getForeground();
	}
	jsuis.Button.prototype.setForeground = function(foreground) {
		var label = this.getLabel();
		label.setForeground(foreground);
		return this;
	}
	jsuis.Button.prototype.setEnabled = function(enabled) {
		var label = this.getLabel();
		label.setEnabled(enabled);
		SUPER.prototype.setEnabled.call(this, enabled);
		return this;
	}
	jsuis.Button.prototype.mousePressed = function() {
		var pressedColor = this.getPressedColor();
		SUPER.prototype.setBackground.call(this, pressedColor);
	}
	jsuis.Button.prototype.mouseReleased = function() {
		var color = this.getColor();
		SUPER.prototype.setBackground.call(this, color);
	}
	jsuis.Button.prototype.mouseEntered = function() {
		var enabled = this.isEnabled();
		var rolloverColor = this.getRolloverColor();
		SUPER.prototype.setBackground.call(this, rolloverColor);
	}
	jsuis.Button.prototype.mouseExited = function() {
		var color = this.getColor();
		SUPER.prototype.setBackground.call(this, color);
	}
}) (jsuis);

/**
 * jsuis.LayeredPane
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.LayeredPane = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, null);
	});
	jsuis.LayeredPane.prototype.add = function(component, constraints, index) {
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
			referenceConstraints = referenceComponent.getConstraints();
			if (constraints <= referenceConstraints) {
				break;
			}
		}
		if (i === components.length) {
			SUPER.prototype.add.call(this, component, constraints);
			return;
		}
		if (constraints < referenceConstraints) {
			SUPER.prototype.add.call(this, component, constraints, i);
			return;
		}
		for (var j = i; j < components.length; j++) {
			var referenceComponent = components[j];
			referenceConstraints = referenceComponent.getConstraints();
			if (referenceConstraints !== constraints) {
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
 * jsuis.MouseEvent
 */
(function(jsuis) {
	var SUPER = jsuis.ComponentEvent;
	jsuis.MouseEvent = jsuis.Object.extend(SUPER, function(component, id,
			when, modifiers, x, y, xAbs, yAbs, clickCount, popupTrigger, button) {
		SUPER.prototype.constructor.call(this, component, id, when, modifiers);
		this.setX(x);
		this.setY(y);
		this.setXAbs(xAbs);
		this.setYAbs(yAbs);
		this.setClickCount(clickCount);
		this.setPopupTrigger(popupTrigger);
		this.setButton(button);
	});
	jsuis.Object.addProperties(jsuis.MouseEvent,
			new jsuis.Property("x"),
			new jsuis.Property("y"),
			new jsuis.Property("xAbs"),
			new jsuis.Property("yAbs"),
			new jsuis.Property("clickCount"),
			new jsuis.Property("popupTrigger"),
			new jsuis.Property("button")
	);
	jsuis.MouseEvent.prototype.getPoint = function() {
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
	jsuis.MouseEvent.prototype.getX = function() {
		var point = this.getPoint();
		return point.getX();
	}
	jsuis.MouseEvent.prototype.getY = function() {
		var point = this.getPoint();
		return point.getY();
	}
	jsuis.MouseEvent.prototype.getLocationOnScreen = function() {
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
	jsuis.MouseEvent.prototype.getXOnScreen = function() {
		var locationOnScreen = this.getLocationOnScreen();
		return locationOnScreen.getX();
	}
	jsuis.MouseEvent.prototype.getYOnScreen = function() {
		var locationOnScreen = this.getLocationOnScreen();
		return locationOnScreen.getY();
	}
	jsuis.MouseEvent.prototype.getClickCount = function() {
		var clickCount = this.clickCount;
		if (clickCount !== null && clickCount !== undefined) {
			return clickCount;
		}
		var domEvent = this.getDomEvent();
		clickCount = domEvent.detail;
		this.setClickCount(clickCount);
		return clickCount;
	}
	jsuis.MouseEvent.prototype.getPopupTrigger = function() {
		var popupTrigger = this.popupTrigger;
		if (popupTrigger !== null && popupTrigger !== undefined) {
			return popupTrigger;
		}
		var button = this.getButton();
		popupTrigger = (button === 3);
		this.setPopupTrigger(popupTrigger);
		return popupTrigger;
	}
	jsuis.MouseEvent.prototype.getButton = function() {
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
 * jsuis.ScrollBar
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.ScrollBar = jsuis.Object.extend(SUPER, function(orientation) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		orientation = nvl(orientation, jsuis.ScrollBar.VERTICAL);
		this.setOrientation(orientation);
		
		var layeredPane = new jsuis.LayeredPane();
		this.add(layeredPane);
		layeredPane.setLayout(new jsuis.BorderLayout());
		
		var scrollTrack = new jsuis.ScrollTrack(orientation);
		this.setScrollTrack(scrollTrack);
		layeredPane.add(scrollTrack);
		
		var scrollThumb = new jsuis.ScrollThumb(orientation);
		this.setScrollThumb(scrollThumb);
		layeredPane.add(scrollThumb);
		scrollThumb.setBounds(new jsuis.Rectangle(0, 0, 16, 16));
		
		var decreaseButton;
		var increaseButton;
		if (orientation === jsuis.Constants.HORIZONTAL) {
			decreaseButton = new jsuis.ScrollButton(jsuis.Constants.WEST);
			this.add(decreaseButton, jsuis.Constants.WEST);
			increaseButton = new jsuis.ScrollButton(jsuis.Constants.EAST);
			this.add(increaseButton, jsuis.Constants.EAST);
		} else {
			decreaseButton = new jsuis.ScrollButton(jsuis.Constants.NORTH);
			this.add(decreaseButton, jsuis.Constants.NORTH);
			increaseButton = new jsuis.ScrollButton(jsuis.Constants.SOUTH);
			this.add(increaseButton, jsuis.Constants.SOUTH);
		}
		this.setDecreaseButton(decreaseButton);
		this.setIncreaseButton(increaseButton);
		
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
		
		var timer = new jsuis.Timer(50, timerActionListener);
		this.setTimer(timer);
		timer.setInitialDelay(250);
		
		var mouseListener = new jsuis.MouseListener({
			mousePressed: function(event) {
				var scrollBar = this.getListenerComponent();
				var point = event.getPoint();
				scrollBar.setScrollThumbPressedPoint(point);
			}
		});
		mouseListener.setListenerComponent(this);
		scrollThumb.addMouseListener(mouseListener);
		
		var mouseMotionListener = new jsuis.MouseMotionListener({
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
					scrollBar.setValue((maximum - extent) * x / maximumX);
				} else {
					var dy = point.getY() - pressedPoint.getY();
					var maximumY = scrollTrack.getHeight() - scrollThumb.getHeight();
					var y = Math.min(Math.max(scrollThumb.getY() + dy, 0), maximumY);
					scrollThumb.setY(y);
					scrollBar.setValue((maximum - extent) * y / maximumY);
				}
			}
		});
		mouseMotionListener.setListenerComponent(this);
		scrollThumb.addMouseMotionListener(mouseMotionListener);
	});
	jsuis.Object.addProperties(jsuis.ScrollBar,
			new jsuis.Property("orientation"),
			new jsuis.Property("value"),
			new jsuis.Property("extent"),
			new jsuis.Property("minimum"),
			new jsuis.Property("maximum"),
			new jsuis.Property("increment"),
			new jsuis.Property("unitIncrement"),
			new jsuis.Property("blockIncrement"),
			new jsuis.Property("scrollTrack"),
			new jsuis.Property("increaseButton"),
			new jsuis.Property("decreaseButton"),
			new jsuis.Property("scrollThumb"),
			new jsuis.Property("scrollThumbPressedPoint"),
			new jsuis.Property("timerActionListener"),
			new jsuis.Property("timer")
	);
	jsuis.ScrollBar.prototype.getValue = function() {
		return this.value || 0;
	}
	jsuis.ScrollBar.prototype.setValue = function(value) {
		var oldValue = this.value;
		this.value = value;
		this.firePropertyChange("value", oldValue, value);
		return this;
	}
	jsuis.ScrollBar.prototype.getExtent = function() {
		return nvl(this.extent, 32);
	}
	jsuis.ScrollBar.prototype.getMinimum = function() {
		return nvl(this.minimum, 0);
	}
	jsuis.ScrollBar.prototype.getMaximum = function() {
		return nvl(this.maximum, 1);
	}
	jsuis.ScrollBar.prototype.getUnitIncrement = function() {
		return nvl(this.unitIncrement, 16);
	}
	jsuis.ScrollBar.prototype.getBlockIncrement = function() {
		return nvl(this.blockIncrement, (this.getExtent() - this.getUnitIncrement()));
	}
	jsuis.ScrollBar.prototype.validate = function() {
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
			if (value < (maximum - extent)) {
				scrollThumbX = (scrollTrackWidth - scrollThumbWidth) * (value - minimum) / (maximum - minimum - extent);
			}
			scrollThumb.setBounds(new jsuis.Rectangle(Math.round(scrollThumbX), scrollThumb.getY(), Math.round(scrollThumbWidth), scrollThumb.getHeight()));
		} else {
			var scrollTrackHeight = scrollTrack.getHeight();
			var scrollThumbHeight = scrollTrackHeight * (extent / (maximum - minimum));
			scrollThumbHeight = Math.min(Math.max(scrollThumbHeight,
					scrollThumb.getMinimumSize().getHeight()), scrollTrackHeight);
			var scrollThumbY = scrollTrackHeight - scrollThumbHeight;
			if (value < (maximum - extent)) {
				scrollThumbY = (scrollTrackHeight - scrollThumbHeight) * (value - minimum) / (maximum - minimum - extent);
			}
			scrollThumb.setBounds(new jsuis.Rectangle(scrollThumb.getX(), Math.round(scrollThumbY), scrollThumb.getWidth(), Math.round(scrollThumbHeight)));
		}
		scrollThumb.validate();
	}
}) (jsuis);

/**
 * jsuis.ScrollButton
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.ScrollButton = jsuis.Object.extend(SUPER, function(direction) {
		SUPER.prototype.constructor.call(this, new jsuis.GridBagLayout());
		this.setDirection(nvl(direction, jsuis.Constants.NORTH));
		var shape;
		var icon;
		switch (direction) {
		case jsuis.Constants.SOUTH:
			shape = new jsuis.Path("M 0 -8 a 8 8 0 0 0 16 0 v 16 a 8 8 0 0 1 -16 0 z");
			icon = new jsuis.Path("M 4 6 l -4 -6 h 8 z");
			break;
		case jsuis.Constants.EAST:
			shape = new jsuis.Path("M -8 0 a 8 8 0 0 1 0 16 h 16 a 8 8 0 0 0 0 -16 z");
			icon = new jsuis.Path("M 6 4 l -6 -4 v 8 z");
			break;
		case jsuis.Constants.WEST:
			shape = new jsuis.Path("M 24 0 a 8 8 0 0 0 0 16 h -16 a 8 8 0 0 1 0 -16 z");
			icon = new jsuis.Path("M 0 4 l 6 -4 v 8 z");
			break;
		case jsuis.Constants.NORTH:
		default:
			shape = new jsuis.Path("M 0 24 a 8 8 0 0 1 16 0 v -16 a 8 8 0 0 0 -16 0 z");
			icon = new jsuis.Path("M 4 0 l -4 6 h 8 z");
		}
		this.setShape(shape);
		icon.setEnabled(false);
		this.add(icon);
		this.setPreferredSize(new jsuis.Dimension(16, 16));
		var color = jsuis.Color.Black.withAlpha(.1 * 255);
		this.setColor(color);
		this.setRolloverColor(jsuis.Color.Black.withAlpha(.2 * 255));
		this.setPressedColor(jsuis.Color.Black.withAlpha(.3 * 255));
		this.setBackground(color);
		var mouseListener = new jsuis.MouseListener({
			mousePressed: function(event) {
				var source = event.getSource();
				var pressedColor = source.getPressedColor();
				source.setBackground(pressedColor);
			},
			mouseReleased: function(event) {
				var source = event.getSource();
				var color = source.getColor();
				source.setBackground(color);
			},
			mouseEntered: function(event) {
				var source = event.getSource();
				var rolloverColor = source.getRolloverColor();
				source.setBackground(rolloverColor);
			},
			mouseExited: function(event) {
				var source = event.getSource();
				var color = source.getColor();
				source.setBackground(color);
			}
		});
		this.addMouseListener(mouseListener);
	});
	jsuis.Object.addProperties(jsuis.ScrollButton,
			new jsuis.Property("direction"),
			new jsuis.Property("color"),
			new jsuis.Property("pressedColor"),
			new jsuis.Property("rolloverColor")
	);
}) (jsuis);

/**
 * jsuis.ScrollThumb
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.ScrollThumb = jsuis.Object.extend(SUPER, function(orientation) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		this.setOrientation(nvl(orientation, jsuis.Constants.VERTICAL));
		this.setBorder(new jsuis.LineBorder(null, 0, 8));
		this.setBackground(jsuis.Color.White.withAlpha(.4 * 255));
	});
	jsuis.Object.addProperties(jsuis.ScrollThumb,
			new jsuis.Property("orientation")
	);
	jsuis.ScrollThumb.prototype.getMinimumSize = function() {
		var orientation = this.getOrientation();
		if (orientation === jsuis.Constants.HORIZONTAL) {
			return new jsuis.Dimension(32, 16);
		} else {
			return new jsuis.Dimension(16, 32);
		}
	}
}) (jsuis);

/**
 * jsuis.ScrollTrack
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.ScrollTrack = jsuis.Object.extend(SUPER, function(direction) {
		SUPER.prototype.constructor.call(this, null);
		direction = nvl(direction, jsuis.Constants.VERTICAL);
		this.setDirection(direction);
		this.setBorder(new jsuis.LineBorder(null, 0, 8));
		this.setBackground(jsuis.Color.Black.withAlpha(.2 * 255));
		if (direction === jsuis.Constants.HORIZONTAL) {
			this.setMargin(new jsuis.Insets(0, -16));
		} else {
			this.setMargin(new jsuis.Insets(-16, 0));
		}
	});
	jsuis.Object.addProperties(jsuis.ScrollTrack,
			new jsuis.Property("direction"),
			new jsuis.Property("path"),
			new jsuis.Property("viewport")
	);
}) (jsuis);

/**
 * jsuis.RootPane
 */
(function(jsuis) {
	var SUPER = jsuis.LayeredPane;
	jsuis.RootPane = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
		this.setLayout(new jsuis.BorderLayout());
	});
}) (jsuis);

/**
 * jsuis.ScrollPane
 */
(function(jsuis) {
	var SUPER = jsuis.LayeredPane;
	jsuis.ScrollPane = jsuis.Object.extend(SUPER, function(view, vsbPolicy, hsbPolicy) {
		SUPER.prototype.constructor.call(this);
		this.setLayout(new jsuis.BorderLayout());
		
		var viewport = new jsuis.Viewport();
		this.setViewport(viewport);
		this.add(viewport);
		
		if (view) {
			this.setViewportView(view);
		}
		vsbPolicy = nvl(vsbPolicy, jsuis.Constants.VERTICAL_SCROLLBAR_AS_NEEDED);
		this.setVsbPolicy(vsbPolicy);
		hsbPolicy = nvl(hsbPolicy, jsuis.Constants.HORIZONTAL_SCROLLBAR_AS_NEEDED);
		this.setHsbPolicy(hsbPolicy);
		
		var scrollBarPanel = new jsuis.Panel(new jsuis.GridBagLayout());
		this.setScrollBarPanel(scrollBarPanel);
		this.add(scrollBarPanel);
		
		var verticalScrollBar = new jsuis.ScrollBar(jsuis.Constants.VERTICAL);
		this.setVerticalScrollBar(verticalScrollBar);
		scrollBarPanel.add(verticalScrollBar, new jsuis.GridBagConstraints()
		.setGridx(1).setGridy(0).setWeighty(1)
		.setFill(jsuis.Constants.VERTICAL));
		if (vsbPolicy !== jsuis.Constants.VERTICAL_SCROLLBAR_ALWAYS) {
			verticalScrollBar.setVisible(false);
		}
		
		var horizontalScrollBar = new jsuis.ScrollBar(jsuis.Constants.HORIZONTAL);
		this.setHorizontalScrollBar(horizontalScrollBar);
		scrollBarPanel.add(horizontalScrollBar, new jsuis.GridBagConstraints()
		.setGridx(0).setGridy(1).setWeightx(1)
		.setFill(jsuis.Constants.HORIZONTAL));
		if (hsbPolicy !== jsuis.Constants.HORIZONTAL_SCROLLBAR_ALWAYS) {
			horizontalScrollBar.setVisible(false);
		}
		
		var central = new jsuis.Panel(null);
		scrollBarPanel.add(central, new jsuis.GridBagConstraints()
		.setGridx(0).setGridy(0).setWeightx(1).setWeighty(1)
		.setFill(jsuis.Constants.BOTH));
		
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
	jsuis.Object.addProperties(jsuis.ScrollPane,
			new jsuis.Property("vsbPolicy"),
			new jsuis.Property("hsbPolicy"),
			new jsuis.Property("viewport"),
			new jsuis.Property("scrollBarPanel"),
			new jsuis.Property("verticalScrollBar"),
			new jsuis.Property("horizontalScrollBar")
	);
	jsuis.ScrollPane.prototype.setViewportView = function(view) {
		var viewport = this.getViewport();
		viewport.setView(view);
		return this;
	}
	jsuis.ScrollPane.prototype.getViewportView = function() {
		var viewport = this.getViewport();
		return viewport.getView();
	}
	jsuis.ScrollPane.prototype.validate = function() {
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
			var viewWidth = Math.max(viewSize.getWidth(), viewMinimumSize.getWidth());
			var viewHeight = Math.max(viewSize.getHeight(), viewMinimumSize.getHeight());
			view.setSize(new jsuis.Dimension(viewWidth, viewHeight));
			verticalScrollBar.setMaximum(viewHeight);
			horizontalScrollBar.setMaximum(viewWidth);
		}
		horizontalScrollBar.setExtent(width - (verticalScrollBarVisible ? verticalScrollBarPreferredWidth : 0));
		verticalScrollBar.setExtent(height- (horizontalScrollBarVisible ? horizontalScrollBarPreferredHeight : 0));
		horizontalScrollBar.setValue(Math.min(horizontalScrollBar.getValue(),
				horizontalScrollBar.getMaximum() - horizontalScrollBar.getExtent()));
		verticalScrollBar.setValue(Math.min(verticalScrollBar.getValue(),
				verticalScrollBar.getMaximum() - verticalScrollBar.getExtent()));
		verticalScrollBar.setVisible(verticalScrollBarVisible);
		horizontalScrollBar.setVisible(horizontalScrollBarVisible);
		SUPER.prototype.validate.call(this);
	}
}) (jsuis);

