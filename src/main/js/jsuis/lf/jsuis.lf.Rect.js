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
