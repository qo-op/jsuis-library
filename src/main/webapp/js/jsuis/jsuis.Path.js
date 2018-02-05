/**
 * jsuis.Path
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Path = jsuis.Object.extend(SUPER, function(d) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "path"));
		this.setAttribute("d", d);
	});
	jsuis.Path.prototype.setX = function(x) {
		this.setAttribute("transform", "translate(" + nvl(x, 0) + "," + this.getY() + ")");
		this.x = x;
		return this;
	}
	jsuis.Path.prototype.setY = function(y) {
		this.setAttribute("transform", "translate(" + this.getX() + "," + nvl(y, 0) + ")");
		this.y = y;
		return this;
	}
}) (jsuis);
