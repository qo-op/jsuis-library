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
