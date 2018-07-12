/**
 * Component
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Container;
	jsuis.lf.Component = jsuis.Object.extend(SUPER, function(element) {
		SUPER.prototype.constructor.call(this, element);
	});
	jsuis.Object.addProperties(jsuis.lf.Component, {
		parent: null,
		layout: null,
		constraints: null,
		cursor: null,
		graphics: null,
	});
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
	jsuis.lf.Component.prototype.prepend = function(component) {
		var element = this.getElement();
		var componentElement = component.getElement();
		element.insertBefore(componentElement, null, 0);
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
		this.setAttribute("x", x);
		return this;
	}
	jsuis.lf.Component.prototype.getY = function() {
		return this.y || 0;
	}
	jsuis.lf.Component.prototype.setY = function(y) {
		this.y = y;
		this.setAttribute("y", y);
		return this;
	}
	jsuis.lf.Component.prototype.getOffsets = function() {
		return new jsuis.Insets();
	}
	jsuis.lf.Component.prototype.getWidth = function() {
		return this.width || 0;
	}
	jsuis.lf.Component.prototype.setWidth = function(width) {
		this.width = width;
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
		if (height >= 0) {
			this.setAttribute("height", height);
		}
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
})(jsuis);
