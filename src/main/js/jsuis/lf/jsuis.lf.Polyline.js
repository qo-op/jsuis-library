/**
 * jsuis.lf.Polyline
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.Polyline = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "polyline"));
	});
}) (jsuis);
