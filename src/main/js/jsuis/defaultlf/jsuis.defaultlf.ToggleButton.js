/**
 * jsuis.defaultlf.ToggleButton
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Button;
	jsuis.defaultlf.ToggleButton = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, text, icon);
	});
	jsuis.defaultlf.ToggleButton.prototype.mousePressed = function() {
		var selected = this.isSelected();
		selected = !selected;
		this.setSelected(selected);
		if (selected) {
			SUPER.prototype.mousePressed.call(this);
		}
	}
	jsuis.defaultlf.ToggleButton.prototype.mouseReleased = function() {
		var selected = this.isSelected();
		if (!selected) {
			SUPER.prototype.mouseReleased.call(this);
		}
	}
}) (jsuis);
