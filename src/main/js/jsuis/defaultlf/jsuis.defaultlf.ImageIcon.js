/**
 * jsuis.defaultlf.ImageIcon
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Icon;
	jsuis.defaultlf.ImageIcon = jsuis.Object.extend(SUPER, function(resource) {
		SUPER.prototype.constructor.call(this);
		this.setResource(resource);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ImageIcon, {
		resource: null
	});
	jsuis.defaultlf.ImageIcon.prototype.paintIcon = function(component) {
		var image = component.getImage();
		var resource = this.getResource();
		image.setResource(resource);
	}
}) (jsuis);
