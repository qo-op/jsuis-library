/**
 * jsuis.defaultlf.ImageIcon
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.defaultlf.ImageIcon = jsuis.Object.extend(SUPER, function(resource, iconWidth, iconHeight) {
		SUPER.prototype.constructor.call(this, document.createElementNS(jsuis.Constants.SVG, "image"));
		this.setResource(resource);
		this.setIconWidth(nvl(iconWidth, 16));
		this.setIconHeight(nvl(iconHeight, 16));
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ImageIcon,
			new jsuis.Property("resource"),
			new jsuis.Property("iconWidth"),
			new jsuis.Property("iconHeight")
	);
	jsuis.defaultlf.ImageIcon.prototype.createComponent = function() {
		var iconComponent = new jsuis.defaultlf.Component(document.createElementNS(jsuis.Constants.SVG, "image"));
		var iconElement = iconComponent.getElement();
		var resource = this.getResource();
		iconElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', resource);
		var iconWidth = this.getIconWidth();
		var iconHeight = this.getIconHeight();
		iconComponent.setPreferredSize(new jsuis.Dimension(iconWidth, iconHeight));
		return iconComponent;
	}
}) (jsuis);
