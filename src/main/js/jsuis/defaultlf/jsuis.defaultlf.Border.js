/**
 * Border
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.defaultlf.Border = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.defaultlf.Border.prototype.paintBorder = function(component) {
		var graphics = component.getGraphics();
		graphics.setForeground(null);
		var w = graphics.getWidth();
		var h = graphics.getHeight();
		graphics.setResource("M0,0Lw,0Lw,hL0,hZ"
				.replace(/w/g, w).replace(/h/g, h));
	}
	jsuis.defaultlf.Border.prototype.getPeer = function() {
		return this;
	}
	jsuis.defaultlf.Border.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets();
	}
	jsuis.defaultlf.Border.prototype.getBorderOutsets = function(component) {
		return new jsuis.Insets();
	}
})(jsuis);
