/**
 * Border
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Border = jsuis.Object.extend(SUPER, function(color, thickness) {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.Border.prototype.install = function(component) {
		var shape = component.getShape();
		if (!shape) {
			return;
		}
		shape.setForeground(null);
	}
	jsuis.Border.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets();
	}
	jsuis.Border.prototype.getBorderOutsets = function(component) {
		return new jsuis.Insets();
	}
})(jsuis);
