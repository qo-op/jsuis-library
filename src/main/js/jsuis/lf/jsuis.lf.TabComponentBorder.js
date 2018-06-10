/**
 * jsuis.lf.TabComponentBorder
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Border;
	jsuis.lf.TabComponentBorder = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.lf.TabComponentBorder.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets(0, 3);
	}
	jsuis.lf.TabComponentBorder.prototype.paintBorder = function(component) {
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
		
		var p = [
			{ x: thickness / 2, y: height },
			{ x: thickness / 2 + 2, y: thickness / 2 },
			{ x: width - thickness / 2 - 2, y: thickness / 2 },
			{ x: width - thickness / 2, y: height }
		];
		var points = this.pointsToString(p);
		
		var graphics = component.getGraphics();
		
		var data = [
			{ points: points, fill: nvl(background, "none").toString(), stroke: nvl(foreground, "none").toString(), strokeWidth: thickness }
		];
		var polylines = graphics.getComponentsByName("polyline");
		for (var i = polylines.length; i < data.length; i++) {
			var polyline = new jsuis.lf.Polyline();
			polyline.setName("polyline");
			graphics.add(polyline);
			polylines.push(polyline);
		}
		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			polylines[i]
				.setAttribute("points", d.points )
				.setStyleProperty("fill", d.fill )
				.setStyleProperty("stroke", d.stroke )
				.setStyleProperty("stroke-width", d.strokeWidth );
		}
	}
	jsuis.lf.TabComponentBorder.prototype.pointsToString = function(points) {
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
