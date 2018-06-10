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
