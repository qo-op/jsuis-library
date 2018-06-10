/**
 * Border
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.lf.Border = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.lf.Border.prototype.paintBorder = function(component) {
		var width = component.getWidth();
		var height = component.getHeight();
		if (!width || !height) {
			return;
		}
		var color = null;
		var rx = 0;
		var ry = 0;
		var background = component.getBackground();
		var graphics = component.getGraphics();
	
		var data = [
			{ x: 0, y: 0, width: width, height: height, fill: nvl(background, "none").toString() }
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
				.setStyleProperty("fill", d.fill);
		}
	}
	jsuis.lf.Border.prototype.getPeer = function() {
		return this;
	}
	jsuis.lf.Border.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets();
	}
	jsuis.lf.Border.prototype.getBorderOutsets = function(component) {
		return new jsuis.Insets();
	}
	jsuis.lf.Border.prototype.getBorderOffsets = function(component) {
		return new jsuis.Insets();
	}
})(jsuis);
