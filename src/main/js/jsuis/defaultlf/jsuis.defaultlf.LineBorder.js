/**
 * jsuis.defaultlf.LineBorder
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Border;
	jsuis.defaultlf.LineBorder = jsuis.Object.extend(SUPER, function(color, thickness, rx, ry) {
		SUPER.prototype.constructor.call(this);
		this.setColor(nvl(color, jsuis.Color.GRAY));
		this.setThickness(nvl(thickness, 1));
		rx = nvl(rx, 0);
		ry = nvl(ry, rx);
		this.setRx(rx);
		this.setRy(ry);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.LineBorder, {
		color: null,
		thickness: 0,
		rx: 0,
		ry: 0
	});
	jsuis.defaultlf.LineBorder.prototype.getBorderInsets = function(component) {
		var thickness = this.getThickness();
		return new jsuis.Insets(thickness, thickness, thickness, thickness);
	}
	jsuis.defaultlf.LineBorder.prototype.paintBorder = function(component) {
		var width = component.getWidth();
		var height = component.getHeight();
		if (!width || !height) {
			return;
		}
		var color = this.getColor();
		var thickness = this.getThickness();
		var rx = this.getRx();
		var ry = this.getRy();
		var background = component.getBackground();
		var graphics = component.getGraphics();
		graphics
			.select("rect")
			.data([
				{ x: thickness / 2, y: thickness / 2, width: width - thickness, height: height - thickness,
					rx: rx, ry: ry, stroke: thickness ? nvl(color, "none").toString() : "none", strokeWidth: thickness, fill: nvl(background, "none").toString() }
			])
			.enter().append("rect")
			.all()
				.setAttribute("x", function(d) { return d.x; })
				.setAttribute("y", function(d) { return d.y; })
				.setAttribute("width", function(d) { return d.width; })
				.setAttribute("height", function(d) { return d.height; })
				.setAttribute("rx", function(d) { return d.rx; })
				.setAttribute("ry", function(d) { return d.ry; })
				.setStyleProperty("fill", function(d) { return d.fill; })
				.setStyleProperty("stroke", function(d) { return d.stroke; })
				.setStyleProperty("stroke-width", function(d) { return d.strokeWidth; });
	}
}) (jsuis);
