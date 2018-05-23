/**
 * jsuis.defaultlf.ClipPath
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.ClipPath = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "clipPath"));
		this.setId(jsuis.defaultlf.ClipPath.next());
	});
	var sequence = 0;
	jsuis.defaultlf.ClipPath.next = function() {
		return "ClipPath-" + sequence++;
	};
}) (jsuis);
