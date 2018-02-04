/**
 * jsuis.Defs
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Defs = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.SVG, "defs"));
	});
}) (jsuis);
