/**
 * jsuis.defaultlf.ImageIcon
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Icon;
	jsuis.defaultlf.ImageIcon = jsuis.Object.extend(SUPER, function(resource, iconWidth, iconHeight) {
		SUPER.prototype.constructor.call(this);
		this.setResource(resource);
		this.setIconWidth(nvl(iconWidth, 16));
		this.setIconHeight(nvl(iconHeight, 16));
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ImageIcon, {
		resource: null
	});
	jsuis.defaultlf.ImageIcon.prototype.paintIcon = function(component) {
		var image = component.getImage();
		var resource = this.getResource();
		image.setResource(resource);
		var iconWidth = this.getIconWidth();
		var iconHeight = this.getIconHeight();
		image.setPreferredSize(new jsuis.Dimension(iconWidth, iconHeight));
	}
}) (jsuis);
