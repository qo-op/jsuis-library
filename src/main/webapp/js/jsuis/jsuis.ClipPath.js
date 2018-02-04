/**
 * jsuis.ClipPath
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.ClipPath = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.SVG, "clipPath"));
		this.setId(jsuis.ClipPath.next());
	});
	jsuis.ClipPath.sequence = 0;
	jsuis.ClipPath.next = function() {
		return "ClipPath-" + jsuis.ClipPath.sequence++;
	};
}) (jsuis);
