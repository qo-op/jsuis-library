/**
 * jsuis.defaultlf.Polyline
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.Polyline = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "polyline"));
	});
}) (jsuis);
