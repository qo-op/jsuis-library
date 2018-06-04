/**
 * jsuis.defaultlf.Rect
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.Rect = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "rect"));
	});
	jsuis.defaultlf.Rect.prototype.getRx = function() {
		return this.rx || 0;
	}
	jsuis.defaultlf.Rect.prototype.setRx = function(rx) {
		this.setAttribute("rx", +nvl(rx, 0));
		this.rx = rx;
		return this;
	}
	jsuis.defaultlf.Rect.prototype.getRy = function() {
		return this.ry || 0;
	}
	jsuis.defaultlf.Rect.prototype.setRy = function(ry) {
		this.setAttribute("ry", +nvl(ry, 0));
		this.ry = ry;
		return this;
	}
}) (jsuis);
