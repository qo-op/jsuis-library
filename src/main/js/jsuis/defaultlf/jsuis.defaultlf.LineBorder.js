/**
 * jsuis.defaultlf.LineBorder
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Border;
	jsuis.defaultlf.LineBorder = jsuis.Object.extend(SUPER, function(color, thickness, rx, ry) {
		SUPER.prototype.constructor.call(this, color, thickness);
		this.setColor(nvl(color, jsuis.Color.black));
		this.setThickness(nvl(thickness, 1));
		rx = nvl(rx, 0);
		ry = nvl(ry, rx);
		this.setRx(rx);
		this.setRy(ry);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.LineBorder,
			new jsuis.Property("color"),
			new jsuis.Property("thickness"),
			new jsuis.Property("rx"),
			new jsuis.Property("ry")
	);
	jsuis.defaultlf.LineBorder.prototype.getBorderInsets = function(component) {
		var thickness = this.getThickness();
		return new jsuis.Insets(thickness / 2, thickness / 2, thickness / 2, thickness / 2);
	}
	jsuis.defaultlf.LineBorder.prototype.getBorderOutsets = function(component) {
		var thickness = this.getThickness();
		return new jsuis.Insets(thickness / 2, thickness / 2, thickness / 2, thickness / 2);
	}
	jsuis.defaultlf.LineBorder.prototype.install = function(component) {
		var target = component.getTarget();
		if (!target) {
			return;
		}
		var color = this.getColor();
		target.setForeground(color);
		var thickness = this.getThickness();
		target.setStyleProperty("stroke-width", thickness);
		var rx = this.getRx();
		target.setAttribute("rx", rx);
		var ry = this.getRy();
		target.setAttribute("ry", ry);
	}
}) (jsuis);
