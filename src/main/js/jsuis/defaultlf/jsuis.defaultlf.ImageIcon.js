/**
 * jsuis.defaultlf.ImageIcon
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Icon;
	jsuis.defaultlf.ImageIcon = jsuis.Object.extend(SUPER, function(resource, width, height) {
		SUPER.prototype.constructor.call(this);
		this.setResource(resource);
		this.setWidth(nvl(width, 0));
		this.setHeight(nvl(height, 0));
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ImageIcon, {
		resource: null,
		width: 0,
		height: 0
	});
	jsuis.defaultlf.ImageIcon.prototype.paintIcon = function(component) {
		var image = component.getImage();
		var resource = this.getResource();
		image.setResource(resource);
		var width = this.getWidth();
		var height = this.getHeight();
		image.setPreferredSize(new jsuis.Dimension(width, height));
	}
}) (jsuis);
