/**
 * jsuis.lf.Path
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.Path = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "path"));
	});
}) (jsuis);
