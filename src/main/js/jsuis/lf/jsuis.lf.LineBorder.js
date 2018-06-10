/**
 * jsuis.lf.LineBorder
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Border;
	jsuis.lf.LineBorder = jsuis.Object.extend(SUPER, function(color, thickness, rx, ry) {
		SUPER.prototype.constructor.call(this);
		this.setColor(nvl(color, jsuis.Color.GRAY));
		this.setThickness(nvl(thickness, 1));
		rx = nvl(rx, 0);
		ry = nvl(ry, rx);
		this.setRx(rx);
		this.setRy(ry);
	});
	jsuis.Object.addProperties(jsuis.lf.LineBorder, {
		color: null,
		thickness: 0,
		rx: 0,
		ry: 0
	});
	jsuis.lf.LineBorder.prototype.getBorderInsets = function(component) {
		var thickness = this.getThickness();
		return new jsuis.Insets(thickness, thickness, thickness, thickness);
	}
	jsuis.lf.LineBorder.prototype.getBorderOffsets = function(component) {
		var element = component.getElement();
		if (element instanceof HTMLElement) {
			var thickness = this.getThickness();
			return new jsuis.Insets(thickness, thickness, thickness, thickness);
		} else {
			return new jsuis.Insets();
		}
	}
	jsuis.lf.LineBorder.prototype.paintBorder = function(component) {
		var color = this.getColor();
		var thickness = this.getThickness();
		var rx = this.getRx();
		var ry = this.getRy();
		var background = component.getBackground();
		
		var element = component.getElement();
		if (element instanceof HTMLElement) {
			
			component.setStyleProperty("border", thickness + "px solid " + nvl(color, "none").toString());
			component.setStyleProperty("background-color", nvl(background, "none").toString());
		} else {
			
			var graphics = component.getGraphics();
			var width = component.getWidth();
			var height = component.getHeight();
			if (!width || !height) {
				return;
			}
			
			var data = [
				{  x: thickness / 2, y: thickness / 2, width: width - thickness, height: height - thickness,
					rx: rx, ry: ry, stroke: thickness ? nvl(color, "none").toString() : "none", strokeWidth: thickness, fill: nvl(background, "none").toString() }
			];
			var rects = graphics.getComponentsByName("rect");
			for (var i = rects.length; i < data.length; i++) {
				var rect = new jsuis.lf.Rect();
				rect.setName("rect");
				graphics.add(rect);
				rects.push(rect);
			}
			for (var i = 0; i < data.length; i++) {
				var d = data[i];
				rects[i]
					.setAttribute("x", d.x)
					.setAttribute("y", d.y)
					.setAttribute("width", d.width)
					.setAttribute("height", d.height)
					.setAttribute("rx", d.rx)
					.setAttribute("ry", d.ry)
					.setStyleProperty("fill", d.fill)
					.setStyleProperty("stroke", d.stroke)
					.setStyleProperty("stroke-width", d.strokeWidth);
			}
		}
	}
}) (jsuis);
