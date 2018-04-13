/**
 * jsuis.defaultlf.GridBorder
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Border;
	jsuis.defaultlf.GridBorder = jsuis.Object.extend(SUPER, function(color, spacing) {
		SUPER.prototype.constructor.call(this);
		this.setColor(nvl(color, jsuis.Color.GRAY));
		this.setSpacing(nvl(spacing, 16));
	});
	jsuis.Object.addProperties(jsuis.defaultlf.GridBorder, {
		color: null,
		spacing: 0
	});
	jsuis.defaultlf.GridBorder.prototype.getBorderInsets = function(component) {
	}
	jsuis.defaultlf.GridBorder.prototype.paintBorder = function(component) {
	}
}) (jsuis);
