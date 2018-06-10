/**
 * jsuis.lf.GridBorder
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Border;
	jsuis.lf.GridBorder = jsuis.Object.extend(SUPER, function(color, spacing) {
		SUPER.prototype.constructor.call(this);
		this.setColor(nvl(color, jsuis.Color.GRAY));
		this.setSpacing(nvl(spacing, 16));
	});
	jsuis.Object.addProperties(jsuis.lf.GridBorder, {
		color: null,
		spacing: 0
	});
	jsuis.lf.GridBorder.prototype.getBorderInsets = function(component) {
	}
	jsuis.lf.GridBorder.prototype.paintBorder = function(component) {
	}
}) (jsuis);
