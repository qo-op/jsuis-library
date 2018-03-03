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
		var graphics = component.getGraphics();
		var color = this.getColor();
		graphics.setForeground(color);
		var thickness = this.getThickness();
		graphics.setStyleProperty("stroke-width", thickness);
		var width = graphics.getWidth();
		var height = graphics.getHeight();
		var rx = this.getRx();
		var ry = this.getRy();
		if (rx && ry) {
			var x1 = thickness / 2 + rx;
			var y1 = thickness / 2;
			var x2 = width - thickness / 2 - rx;
			var y2 = y1;
			var x3 = width - thickness / 2;
			var y3 = thickness / 2 + ry;
			var x4 = x3;
			var y4 = height - thickness / 2 - ry;
			var x5 = x2;
			var y5 = height - thickness / 2;
			var x6 = x1;
			var y6 = y5;
			var x7 = thickness / 2;
			var y7 = y4;
			var x8 = x7;
			var y8 = y3;
			graphics.setResource("Mx1,y1Lx2,y2Arx,ry,0,0,1,x3,y3Lx4,y4Arx,ry,0,0,1,x5,y5Lx6,y6Arx,ry,0,0,1,x7,y7Lx8,y8Arx,ry,0,0,1,x1,y1"
					.replace(/rx/g, rx).replace(/ry/g, ry)
					.replace(/x1/g, x1).replace(/y1/g, y1)
					.replace(/x2/g, x2).replace(/y2/g, y2)
					.replace(/x3/g, x3).replace(/y3/g, y3)
					.replace(/x4/g, x4).replace(/y4/g, y4)
					.replace(/x5/g, x5).replace(/y5/g, y5)
					.replace(/x6/g, x6).replace(/y6/g, y6)
					.replace(/x7/g, x7).replace(/y7/g, y7)
					.replace(/x8/g, x8).replace(/y8/g, y8));
		} else {
			var x1 = thickness / 2;
			var y1 = thickness / 2;
			var x2 = width - thickness / 2;
			var y2 = height - thickness / 2;
			graphics.setResource("Mx1,y1Lx2,y1Lx2,y2Lx1,y2Z"
					.replace(/x1/g, x1).replace(/y1/g, y1)
					.replace(/x2/g, x2).replace(/y2/g, y2));
		}
	}
}) (jsuis);
