/**
 * jsuis.defaultlf.Image
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Component;
	jsuis.defaultlf.Image = jsuis.Object.extend(SUPER, function(image) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "image"));
		if (image) {
			this.setImage(image);
		}
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Image, {
		image: null
	});
	jsuis.defaultlf.Image.prototype.setImage = function(image) {
		var element = this.getElement();
		element.setAttributeNS("http://www.w3.org/1999/xlink", "href", image);
		this.image = image;
		return this;
	}
}) (jsuis);
