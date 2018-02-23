/**
 * jsuis.defaultlf.PathIcon
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Icon;
	jsuis.defaultlf.PathIcon = jsuis.Object.extend(SUPER, function(resource) {
		SUPER.prototype.constructor.call(this);
		this.setResource(resource);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.PathIcon,
			new jsuis.Property("resource")
	);
	jsuis.defaultlf.PathIcon.prototype.paintIcon = function(component, constraints) {
		var resource = this.getResource();
		var iconComponent = new jsuis.defaultlf.Path(resource);
		component.add(iconComponent, constraints);
		return iconComponent;
	}
}) (jsuis);
