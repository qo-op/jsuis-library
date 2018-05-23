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
		var graphics = component.getGraphics();
		var direction = this.getDirection();
		switch (direction) {
		case jsuis.Constants.SOUTH:
			graphics.setResource("M0,-8a8,8,0,0,0,16,0v16a8,8,0,0,1,-16,0Z");
			break;
		case jsuis.Constants.EAST:
			graphics.setResource("M-8,0a8,8,0,0,1,0,16h16a8,8,0,0,0,0,-16Z");
			break;
		case jsuis.Constants.WEST:
			graphics.setResource("M24,0a8,8,0,0,0,0,16h-16a8,8,0,0,1,0,-16Z");
			break;
		case jsuis.Constants.NORTH:
		default:
			graphics.setResource("M0,24a8,8,0,0,1,16,0v-16a8,8,0,0,0,-16,0Z");
		}
	}
}) (jsuis);
