/**
 * jsuis.defaultlf.ClipPath
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.ClipPath = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "clipPath"));
		this.setId(jsuis.defaultlf.ClipPath.next());
	});
	jsuis.defaultlf.ClipPath.sequence = 0;
	jsuis.defaultlf.ClipPath.next = function() {
		return "ClipPath-" + jsuis.defaultlf.ClipPath.sequence++;
	};
}) (jsuis);