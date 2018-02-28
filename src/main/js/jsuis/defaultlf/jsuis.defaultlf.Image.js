/**
 * jsuis.defaultlf.Image
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.Image = jsuis.Object.extend(SUPER, function(resource) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "image"));
		if (resource) {
			this.setResource(resource);
		}
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Image, {
		resource: null
	});
	jsuis.defaultlf.Image.prototype.setResource = function(resource) {
		var element = this.getElement();
		element.setAttributeNS("http://www.w3.org/1999/xlink", "href", resource);
		this.resource = resource;
		return this;
	}
}) (jsuis);
