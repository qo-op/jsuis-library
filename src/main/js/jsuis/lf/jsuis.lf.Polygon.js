/**
 * jsuis.lf.Polygon
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.Polygon = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "polygon"));
	});
}) (jsuis);
