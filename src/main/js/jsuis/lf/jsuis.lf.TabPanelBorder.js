/**
 * jsuis.lf.TabPanelBorder
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Border;
	jsuis.lf.TabPanelBorder = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.lf.TabPanelBorder.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets();
	}
	jsuis.lf.TabPanelBorder.prototype.paintBorder = function(component) {
		var width = component.getWidth();
		var height = component.getHeight();
		if (!width || !height) {
			return;
		}
		var color = jsuis.Color.LightSlateGray;
		var thickness = 1;
		var graphics = component.getGraphics();
		
		var data = [
			{ x1: 0, y1: height - thickness / 2, x2: width, y2: height - thickness / 2,
				stroke: color.toString(), strokeWidth: thickness }
		];
		var lines = graphics.getComponentsByName("line");
		for (var i = lines.length; i < data.length; i++) {
			var line = new jsuis.lf.Line();
			line.setName("line");
			graphics.add(line);
			lines.push(line);
		}
		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			lines[i]
				.setAttribute("x1", d.x1)
				.setAttribute("y1", d.y1)
				.setAttribute("x2", d.x2)
				.setAttribute("y2", d.y2)
				.setStyleProperty("stroke", d.stroke)
				.setStyleProperty("stroke-width", d.strokeWidth);
		}
	}
}) (jsuis);
