/**
 * jsuis.defaultlf.MenuBar
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.MenuBar = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, new jsuis.FlowLayout(jsuis.Constants.LEFT));
		this.setBackground(jsuis.Color.Black.withAlpha(.1 * 255));
	});
}) (jsuis);
