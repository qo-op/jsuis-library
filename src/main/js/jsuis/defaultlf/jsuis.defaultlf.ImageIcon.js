/**
 * jsuis.defaultlf.ImageIcon
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Icon;
	jsuis.defaultlf.ImageIcon = jsuis.Object.extend(SUPER, function(resource) {
		SUPER.prototype.constructor.call(this, document.getElementById(resource));
		this.setResource(resource);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ImageIcon,
			new jsuis.Property("resource")
	);
}) (jsuis);
