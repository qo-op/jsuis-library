/**
 * jsuis.lf.ClipPath
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.ClipPath = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "clipPath"));
		this.setId(jsuis.lf.ClipPath.next());
	});
	var sequence = 0;
	jsuis.lf.ClipPath.next = function() {
		return "ClipPath-" + sequence++;
	};
}) (jsuis);
