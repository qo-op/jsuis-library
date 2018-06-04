/**
 * jsuis.defaultlf.Panel
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.Panel = jsuis.Object.extend(SUPER, function(layout) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "g"));
		this.setLayout(layout !== undefined ? layout : new jsuis.FlowLayout());
		this.setBorder(new jsuis.defaultlf.Border());
		this.setBackground(null);
		var graphics = new jsuis.defaultlf.Graphics();
		this.setGraphics(graphics);
		this.addChild(graphics);
	});
	jsuis.defaultlf.Panel.prototype.setX = function(x) {
		this.setAttribute("transform", "translate(" + nvl(x, 0) + "," + this.getY() + ")");
		this.x = x;
		return this;
	}
	jsuis.defaultlf.Panel.prototype.setY = function(y) {
		this.setAttribute("transform", "translate(" + this.getX() + "," + nvl(y, 0) + ")");
		this.y = y;
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
		SUPER.prototype.setVisible.call(this, visible);
		return this;
	}
}) (jsuis);
