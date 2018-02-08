/**
 * jsuis.defaultlf.Panel
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.Panel = jsuis.Object.extend(SUPER, function(layout, shape) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "g"));
		this.setShape(nvl(shape, new jsuis.defaultlf.Rect()));
		this.setLayout(layout !== undefined ? layout : new jsuis.FlowLayout());
		this.setBackground(null);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Panel,
			new jsuis.Property("shape")
	);
	jsuis.defaultlf.Panel.prototype.setShape = function(shape) {
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
	jsuis.defaultlf.Panel.prototype.setX = function(x) {
		this.setAttribute("transform", "translate(" + nvl(x, 0) + "," + this.getY() + ")");
		var shape = this.getShape();
		var outsets = this.getOutsets();
		shape.setX(outsets.getLeft());
		this.x = x;
		return this;
	}
	jsuis.defaultlf.Panel.prototype.setY = function(y) {
		this.setAttribute("transform", "translate(" + this.getX() + "," + nvl(y, 0) + ")");
		var shape = this.getShape();
		var outsets = this.getOutsets();
		shape.setY(outsets.getTop());
		this.y = y;
		return this;
	}
	jsuis.defaultlf.Panel.prototype.getWidth = function() {
		var shape = this.getShape();
		var outsets = this.getOutsets();
		return shape.getWidth() + outsets.getLeft() + outsets.getRight();
	}
	jsuis.defaultlf.Panel.prototype.setWidth = function(width) {
		var shape = this.getShape();
		var outsets = this.getOutsets();
		shape.setWidth(width - outsets.getLeft() - outsets.getRight());
		return this;
	}
	jsuis.defaultlf.Panel.prototype.getHeight = function() {
		var shape = this.getShape();
		var outsets = this.getOutsets();
		return shape.getHeight() + outsets.getTop() + outsets.getBottom();
	}
	jsuis.defaultlf.Panel.prototype.setHeight = function(height) {
		var shape = this.getShape();
		var outsets = this.getOutsets();
		shape.setHeight(height - outsets.getTop() - outsets.getBottom());
		return this;
	}
	jsuis.defaultlf.Panel.prototype.setVisible = function(visible) {
		var shape = this.getShape();
		shape.setVisible(visible);
		SUPER.prototype.setVisible.call(this, visible);
		return this;
	}
	jsuis.defaultlf.Panel.prototype.getBackground = function() {
		var shape = this.getShape();
		return shape.getBackground();
	}
	jsuis.defaultlf.Panel.prototype.setBackground = function(background) {
		var shape = this.getShape();
		shape.setBackground(background);
		return this;
	}
	jsuis.defaultlf.Panel.prototype.addMouseListener = function(mouseListener) {
		var shape = this.getShape();
		SUPER.prototype.addMouseListener.call(this, mouseListener, shape);
	}
}) (jsuis);
