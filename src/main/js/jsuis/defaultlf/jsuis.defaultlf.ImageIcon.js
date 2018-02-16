/**
 * jsuis.defaultlf.ImageIcon
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Icon;
	jsuis.defaultlf.ImageIcon = jsuis.Object.extend(SUPER, function(resource) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "image"));
		this.setResource(resource);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ImageIcon,
			new jsuis.Property("resource")
	);
	jsuis.defaultlf.ImageIcon.prototype.setResource = function(resource) {
		var element = this.getElement();
		element.setAttributeNS('http://www.w3.org/1999/xlink','href', resource);
		this.resource = resource;
		return this;
	}
}) (jsuis);
