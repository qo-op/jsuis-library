/**
 * jsuis.defaultlf.ToggleButton
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.AbstractButton;
	jsuis.defaultlf.ToggleButton = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, text, icon);
	});
	jsuis.defaultlf.ToggleButton.prototype.mouseReleased = function() {
		var selected = this.isSelected();
		selected = !selected;
		this.setSelected(selected);
	}
}) (jsuis);
