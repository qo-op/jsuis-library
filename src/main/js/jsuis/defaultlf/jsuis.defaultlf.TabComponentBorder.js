/**
 * jsuis.defaultlf.TabComponentBorder
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Border;
	jsuis.defaultlf.TabComponentBorder = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.defaultlf.TabComponentBorder.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets(0, 3);
	}
	jsuis.defaultlf.TabComponentBorder.prototype.paintBorder = function(component) {
		var parent = component.getParent();
		if (!parent) {
			return;
		}
		var width = component.getWidth();
		var height = component.getHeight();
		if (!width || !height) {
			return;
		}
		var selected = component.isSelected();
		var background;
		if (selected) {
			background = jsuis.Color.getColor(0xEEEEEE);
		} else {
			background = jsuis.Color.LightSlateGray;
		}
		var foreground = jsuis.Color.Gray;
		var thickness = 1;
		var graphics = component.getGraphics();
		var p = [
			{ x: thickness / 2, y: height },
			{ x: thickness / 2 + 2, y: thickness / 2 },
			{ x: width - thickness / 2 - 2, y: thickness / 2 },
			{ x: width - thickness / 2, y: height }
		];
		var points = this.pointsToString(p);
		graphics
			.select("polyline")
			.data([ { points: points, fill: nvl(background, "none").toString(), stroke: nvl(foreground, "none").toString(), strokeWidth: thickness } ])
			.enter().append("polyline")
			.all()
				.setAttribute("points", function(d) { return d.points; })
				.setStyleProperty("fill", function(d) { return d.fill; })
				.setStyleProperty("stroke", function(d) { return d.stroke; })
				.setStyleProperty("stroke-width", function(d) { return d.strokeWidth; });
	}
	jsuis.defaultlf.TabComponentBorder.prototype.pointsToString = function(points) {
		var string = "";
		for (var i = 0; i < points.length; i++) {
			var point = points[i];
			string += point.x;
			string += ",";
			string += point.y;
			string += " ";
		}
		string = string.trim();
		return string;
	}
}) (jsuis);
