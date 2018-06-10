/**
 * jsuis.lf.ToggleButton
 */
(function(jsuis) {
	var SUPER = jsuis.lf.AbstractButton;
	jsuis.lf.ToggleButton = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, text, icon);
	});
	jsuis.lf.ToggleButton.prototype.mouseReleased = function() {
		var selected = this.isSelected();
		selected = !selected;
		this.setSelected(selected);
	}
}) (jsuis);
