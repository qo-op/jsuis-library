/**
 * jsuis.lf.Circle
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.Circle = jsuis.Object.extend(SUPER, function(cx, cy, r) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "circle"));
		cx = nvl(cx, 0);
		cy = nvl(cy, cx);
		r = nvl(r, cx);
		this.setCx(cx);
		this.setCy(cy);
		this.setR(r);
	});
	jsuis.lf.Circle.prototype.getCx = function() {
		return this.cx || 0;
	}
	jsuis.lf.Circle.prototype.setCx = function(cx) {
		this.setAttribute("cx", +nvl(cx, 0));
		this.cx = cx;
		return this;
	}
	jsuis.lf.Circle.prototype.getCy = function() {
		return this.cy || 0;
	}
	jsuis.lf.Circle.prototype.setCy = function(cy) {
		this.setAttribute("cy", +nvl(cy, 0));
		this.cy = cy;
		return this;
	}
	jsuis.lf.Circle.prototype.getR = function() {
		return this.r || 0;
	}
	jsuis.lf.Circle.prototype.setR = function(r) {
		this.setAttribute("r", +nvl(r, 0));
		this.r = r;
		return this;
	}
}) (jsuis);
