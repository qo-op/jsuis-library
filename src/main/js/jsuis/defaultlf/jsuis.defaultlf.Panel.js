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
