/**
 * jsuis.lf.Icon
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.lf.Icon = jsuis.Object.extend(SUPER, function(iconWidth, iconHeight) {
		SUPER.prototype.constructor.call(this);
		this.setIconWidth(iconWidth);
		this.setIconHeight(iconHeight);
	});
	jsuis.Object.addProperties(jsuis.lf.Icon, {
		iconWidth: 0,
		iconHeight: 0
	});
}) (jsuis);
