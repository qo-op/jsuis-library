/**
 * jsuis.defaultlf.Path
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.Path = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "path"));
	});
}) (jsuis);
