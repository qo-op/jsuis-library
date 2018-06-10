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
