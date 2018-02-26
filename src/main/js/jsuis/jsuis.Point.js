/**
 * jsuis.Point
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Point = jsuis.Object.extend(SUPER, function(x, y) {
		SUPER.prototype.constructor.call(this);
		this.setX(nvl(x, 0));
		this.setY(nvl(y, 0));
	});
	jsuis.Object.addProperties(jsuis.Point, {
		x: 0,
		y: 0
	});
	jsuis.Point.prototype.add = function(point) {
		this.setX(this.getX() + point.getX());
		this.setY(this.getY() + point.getY());
	}
	jsuis.Point.prototype.clone = function() {
		return new jsuis.Point(this.getX(), this.getY());
	}
}) (jsuis);
