/**
 * jsuis.defaultlf.ImageIcon
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Icon;
	jsuis.defaultlf.ImageIcon = jsuis.Object.extend(SUPER, function(source) {
		SUPER.prototype.constructor.call(this, document.getElementById(source));
		this.setSource(source);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ImageIcon,
			new jsuis.Property("source")
	);
}) (jsuis);
