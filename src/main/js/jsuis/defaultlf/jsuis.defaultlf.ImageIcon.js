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
	})
	jsuis.defaultlf.ImageIcon.prototype.paintIcon = function(component, constraints) {
		var iconComponent = new jsuis.defaultlf.Component(document.createElementNS(jsuis.Constants.SVG, "image"));
		var iconElement = iconComponent.getElement();
		var resource = this.getResource();
		iconElement.setAttributeNS("http://www.w3.org/1999/xlink", "href", resource);
		var iconWidth = this.getIconWidth();
		var iconHeight = this.getIconHeight();
		iconComponent.setPreferredSize(new jsuis.Dimension(iconWidth, iconHeight));
		component.add(iconComponent, constraints);
		return iconComponent;
	}
}) (jsuis);
