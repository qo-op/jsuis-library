/**
 * jsuis.defaultlf.ImageIcon
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Icon;
	jsuis.defaultlf.ImageIcon = jsuis.Object.extend(SUPER, function(image, iconWidth, iconHeight) {
		SUPER.prototype.constructor.call(this, iconWidth, iconHeight);
		this.setImage(image);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ImageIcon, {
		image: null
	});
	jsuis.defaultlf.ImageIcon.prototype.paintIcon = function(component) {
		var image = this.getImage();
		var iconWidth = this.getIconWidth();
		var iconHeight = this.getIconHeight();
		var graphics = component.getGraphics();
		graphics
			.select("image")
			.data([ { href: image, width: iconWidth, height: iconHeight } ])
			.enter().append("image")
			.all()
				.setAttributeNS("http://www.w3.org/1999/xlink", "href", function(d) { return d.href; })
				.setAttribute("width", function(d) { return d.width; })
				.setAttribute("height", function(d) { return d.height; });
	}
}) (jsuis);
