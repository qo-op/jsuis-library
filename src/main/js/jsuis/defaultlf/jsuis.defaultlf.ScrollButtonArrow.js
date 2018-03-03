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
		var graphics = component.getGraphics();
		var direction = this.getDirection();
		switch (direction) {
		case jsuis.Constants.SOUTH:
			graphics.setResource("M8,11l-4,-6h8Z");
			break;
		case jsuis.Constants.EAST:
			graphics.setResource("M11,8l-6,-4v8Z");
			break;
		case jsuis.Constants.WEST:
			graphics.setResource("M5,8l6,-4v8Z");
			break;
		case jsuis.Constants.NORTH:
		default:
			graphics.setResource("M8,5l-4,6h8Z");
		}
	}
}) (jsuis);
