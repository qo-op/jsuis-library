/**
 * jsuis.lf.ImageIcon
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Icon;
	jsuis.lf.ImageIcon = jsuis.Object.extend(SUPER, function(resource, iconWidth, iconHeight) {
		SUPER.prototype.constructor.call(this, iconWidth, iconHeight);
		this.setResource(resource);
	});
	jsuis.Object.addProperties(jsuis.lf.ImageIcon, {
		resource: null
	});
	jsuis.lf.ImageIcon.prototype.paintIcon = function(component) {
		var resource = this.getResource();
		var iconWidth = this.getIconWidth();
		var iconHeight = this.getIconHeight();
		var graphics = component.getGraphics();
	
		var data = [
			{ resource: resource, width: iconWidth, height: iconHeight }
		];
		var images = graphics.getComponentsByName("image");
		for (var i = images.length; i < data.length; i++) {
			var image = new jsuis.lf.Image();
			image.setName("image");
			graphics.add(image);
			images.push(image);
		}
		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			images[i]
				.setAttributeNS("http://www.w3.org/1999/xlink", "href", d.resource)
				.setAttribute("width", d.width)
				.setAttribute("height", d.height);
		}
	}
}) (jsuis);
