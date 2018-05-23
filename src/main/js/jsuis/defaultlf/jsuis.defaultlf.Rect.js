/**
 * jsuis.defaultlf.Rect
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.Rect = jsuis.Object.extend(SUPER, function(x, y, width, height) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "rect"));
		this.setX(nvl(x, 0));
		this.setY(nvl(y, 0));
		this.setWidth(nvl(width, 0));
		this.setHeight(nvl(height, 0));
	});
}) (jsuis);
