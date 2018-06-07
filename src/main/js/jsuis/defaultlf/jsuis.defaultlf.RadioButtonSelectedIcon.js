/**
 * jsuis.defaultlf.RadioButtonSelectedIcon
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Icon;
	jsuis.defaultlf.RadioButtonSelectedIcon = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, 16, 16);
	});
	var instance;
	jsuis.defaultlf.RadioButtonSelectedIcon.getInstance = function() {
		if (!instance) {
			instance = new jsuis.defaultlf.RadioButtonSelectedIcon();
		}
		return instance;
	}
	jsuis.defaultlf.RadioButtonSelectedIcon.prototype.paintIcon = function(component) {
		var iconWidth = this.getIconWidth();
		var iconHeight = this.getIconHeight();
		var color = jsuis.Color.getColor(0x404040);
		var graphics = component.getGraphics();
		graphics
			.select("circle")
			.data([
				{ cx: 8, cy: 8, r: 7.5, fill: "none", stroke: color.toString(), strokeWidth: 1 },
				{ cx: 8, cy: 8, r: 3.5, fill: color.toString(), stroke: color.toString(), strokeWidth: 1 }
			])
			.enter().append("circle")
			.all()
				.setAttribute("cx", function(d) { return d.cx; })
				.setAttribute("cy", function(d) { return d.cy; })
				.setAttribute("r", function(d) { return d.r; })
				.setAttribute("fill", function(d) { return d.fill; })
				.setAttribute("stroke", function(d) { return d.stroke; })
				.setAttribute("stroke-width", function(d) { return d.strokeWidth; })
				.setStyleProperty("display", "");
	}
}) (jsuis);
