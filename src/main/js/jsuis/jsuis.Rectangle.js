/**
 * jsuis.Rectangle
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Rectangle = jsuis.Object.extend(SUPER, function(x, y, width, height) {
		SUPER.prototype.constructor.call(this);
		this.setX(nvl(x, 0));
		this.setY(nvl(y, 0));
		this.setWidth(nvl(width, 0));
		this.setHeight(nvl(height, 0));
	});
	jsuis.Object.addProperties(jsuis.Rectangle, {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	});
	jsuis.Rectangle.prototype.getPoint = function() {
		return new jsuis.Point(this.getX(), this.getY());
	}
	jsuis.Rectangle.prototype.getDimension = function() {
		return new jsuis.Dimension(this.getWidth(), this.getHeight());
	}
	jsuis.Rectangle.prototype.clone = function() {
		return new jsuis.Rectangle(this.getX(), this.getY(), this.getWidth(), this.getHeight());
	}
}) (jsuis);
