/**
 * Border
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.defaultlf.Border = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.defaultlf.Border.prototype.paintBorder = function(component) {
		var target = component.getTarget();
		if (!target) {
			return;
		}
		target.setStyleProperty("stroke-width", 0);
	}
	jsuis.defaultlf.Border.prototype.getPeer = function() {
		return this;
	}
	jsuis.defaultlf.Border.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets();
	}
	jsuis.defaultlf.Border.prototype.getBorderOutsets = function(component) {
		return new jsuis.Insets();
	}
})(jsuis);
