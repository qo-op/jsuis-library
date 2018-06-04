/**
 * jsuis.defaultlf.ScrollButtonArrowBorder
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Border;
	jsuis.defaultlf.ScrollButtonArrowBorder = jsuis.Object.extend(SUPER, function(direction) {
		this.setDirection(direction);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ScrollButtonArrowBorder, {
		direction: null
	});
	jsuis.defaultlf.ScrollButtonArrowBorder.prototype.paintBorder = function(component) {
		var width = component.getWidth();
		var height = component.getHeight();
		/*
		if (!width || !height) {
			return;
		}
		*/
		var d;
		var direction = this.getDirection();
		switch (direction) {
		case jsuis.Constants.SOUTH:
			d = "M8,11l-4,-6h8Z";
			break;
		case jsuis.Constants.EAST:
			d = "M11,8l-6,-4v8Z";
			break;
		case jsuis.Constants.WEST:
			d = "M5,8l6,-4v8Z";
			break;
		case jsuis.Constants.NORTH:
		default:
			d = "M8,5l-4,6h8Z";
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
