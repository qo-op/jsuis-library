/**
 * jsuis.defaultlf.Polygon
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.Polygon = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "polygon"));
	});
}) (jsuis);
