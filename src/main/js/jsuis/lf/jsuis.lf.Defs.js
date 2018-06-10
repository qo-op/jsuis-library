/**
 * jsuis.lf.Defs
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.Defs = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "defs"));
	});
}) (jsuis);
