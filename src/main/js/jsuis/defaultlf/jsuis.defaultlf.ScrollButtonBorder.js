/**
 * jsuis.defaultlf.ScrollButtonBorder
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Border;
	jsuis.defaultlf.ScrollButtonBorder = jsuis.Object.extend(SUPER, function(direction) {
		this.setDirection(direction);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ScrollButtonBorder, {
		direction: null
	});
	jsuis.defaultlf.ScrollButtonBorder.prototype.paintBorder = function(component) {
		var width = component.getWidth();
		var height = component.getHeight();
		if (!width || !height) {
			return;
		}
		var d;
		var direction = this.getDirection();
		switch (direction) {
		case jsuis.Constants.SOUTH:
			d = "M0,-8a8,8,0,0,0,16,0v16a8,8,0,0,1,-16,0Z";
			break;
		case jsuis.Constants.EAST:
			d = "M-8,0a8,8,0,0,1,0,16h16a8,8,0,0,0,0,-16Z";
			break;
		case jsuis.Constants.WEST:
			d = "M24,0a8,8,0,0,0,0,16h-16a8,8,0,0,1,0,-16Z";
			break;
		case jsuis.Constants.NORTH:
		default:
			d = "M0,24a8,8,0,0,1,16,0v-16a8,8,0,0,0,-16,0Z";
		}
		var graphics = component.getGraphics();
		graphics
			.select("path")
			.data([ d ])
			.enter().append("path")
			.all()
				.setAttribute("d", function(d) { return d; });
	}
}) (jsuis);
