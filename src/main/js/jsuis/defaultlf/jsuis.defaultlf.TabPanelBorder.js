/**
 * jsuis.defaultlf.TabPanelBorder
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Border;
	jsuis.defaultlf.TabPanelBorder = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.defaultlf.TabPanelBorder.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets();
	}
	jsuis.defaultlf.TabPanelBorder.prototype.paintBorder = function(component) {
		var width = component.getWidth();
		var height = component.getHeight();
		if (!width || !height) {
			return;
		}
		var color = jsuis.Color.LightSlateGray;
		var thickness = 1;
		var graphics = component.getGraphics();
		graphics
			.select("line")
			.data([
				{ x1: 0, y1: height - thickness / 2, x2: width, y2: height - thickness / 2,
					stroke: color.toString(), strokeWidth: thickness }
			])
			.enter().append("line")
			.all()
				.setAttribute("x1", function(d) { return d.x1; })
				.setAttribute("y1", function(d) { return d.y1; })
				.setAttribute("x2", function(d) { return d.x2; })
				.setAttribute("y2", function(d) { return d.y2; })
				.setStyleProperty("stroke", function(d) { return d.stroke; })
				.setStyleProperty("stroke-width", function(d) { return d.strokeWidth; });
	}
}) (jsuis);
