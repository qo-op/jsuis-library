/**
 * jsuis.defaultlf.PathIcon
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Icon;
	jsuis.defaultlf.PathIcon = jsuis.Object.extend(SUPER, function(resource, iconWidth, iconHeight) {
		SUPER.prototype.constructor.call(this);
		this.setResource(resource);
		this.setIconWidth(nvl(iconWidth, 16));
		this.setIconHeight(nvl(iconHeight, 16));
	});
	jsuis.Object.addProperties(jsuis.defaultlf.PathIcon, {
		resource: null
	});
	jsuis.defaultlf.PathIcon.prototype.paintIcon = function(component, constraints) {
		var resource = this.getResource();
		var iconComponent = new jsuis.defaultlf.Path(resource);
		var iconWidth = this.getIconWidth();
		var iconHeight = this.getIconHeight();
		iconComponent.setPreferredSize(new jsuis.Dimension(iconWidth, iconHeight));
		var style = this.getStyle();
		if (style) {
			for (var property in style) {
				iconComponent.setStyleProperty(property, style[property]);
			}
		}
		component.add(iconComponent, constraints);
		return iconComponent;
	}
}) (jsuis);
