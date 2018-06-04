/**
 * Border
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.defaultlf.Border = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.defaultlf.Border.prototype.paintBorder = function(component) {
		var width = component.getWidth();
		var height = component.getHeight();
		if (!width || !height) {
			return;
		}
		var color = null;
		var rx = 0;
		var ry = 0;
		var background = component.getBackground();
		var graphics = component.getGraphics();
		graphics
			.select("rect")
			.data([ { x: 0, y: 0, width: width, height: height, fill: nvl(background, "none").toString() } ])
			.enter().append("rect")
			.all()
				.setAttribute("x", function(d) { return d.x; })
				.setAttribute("y", function(d) { return d.y; })
				.setAttribute("width", function(d) { return d.width; })
				.setAttribute("height", function(d) { return d.height; })
				.setStyleProperty("fill", function(d) { return d.fill; });
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
