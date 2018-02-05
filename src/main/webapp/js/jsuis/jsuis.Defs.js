/**
 * jsuis.Defs
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Defs = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "defs"));
	});
}) (jsuis);
