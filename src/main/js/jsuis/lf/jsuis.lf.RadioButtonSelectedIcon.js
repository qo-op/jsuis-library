/**
 * jsuis.lf.RadioButtonSelectedIcon
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Icon;
	jsuis.lf.RadioButtonSelectedIcon = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, 16, 16);
	});
	var instance;
	jsuis.lf.RadioButtonSelectedIcon.getInstance = function() {
		if (!instance) {
			instance = new jsuis.lf.RadioButtonSelectedIcon();
		}
		return instance;
	}
	jsuis.lf.RadioButtonSelectedIcon.prototype.paintIcon = function(component) {
		var iconWidth = this.getIconWidth();
		var iconHeight = this.getIconHeight();
		var color = jsuis.Color.getColor(0x404040);
		var graphics = component.getGraphics();
	
		var data = [
			{ cx: 8, cy: 8, r: 7.5, fill: "none", stroke: color.toString(), strokeWidth: 1 },
			{ cx: 8, cy: 8, r: 3.5, fill: color.toString(), stroke: color.toString(), strokeWidth: 1 }
		];
		var circles = graphics.getComponentsByName("circle");
		for (var i = circles.length; i < data.length; i++) {
			var circle = new jsuis.lf.Circle();
			circle.setName("circle");
			graphics.add(circle);
			circles.push(circle);
		}
		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			circles[i]
				.setAttribute("cx", d.cx )
				.setAttribute("cy", d.cy )
				.setAttribute("r", d.r )
				.setAttribute("fill", d.fill )
				.setAttribute("stroke", d.stroke )
				.setAttribute("stroke-width", d.strokeWidth )
				.setStyleProperty("display", "");
		}
	}
}) (jsuis);
