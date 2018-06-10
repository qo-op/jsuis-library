/**
 * jsuis.lf.RadioButton
 */
(function(jsuis) {
	var SUPER = jsuis.lf.ToggleButton;
	jsuis.lf.RadioButton = jsuis.Object.extend(SUPER, function(text) {
		SUPER.prototype.constructor.call(this, text);
		this.setSelected(false);
	});
	jsuis.Object.addProperties(jsuis.lf.RadioButton, {
		group: null
	});
	jsuis.lf.RadioButton.prototype.mouseReleased = function() {
		this.setSelected(true);
	}
	jsuis.lf.RadioButton.prototype.setSelected = function(selected) {
		SUPER.prototype.setSelected.call(this, selected);
		if (selected) {
			var group = this.getGroup();
			if (group) {
				group.setSelected(this);
			}
		}
		if (selected) {
			var selectedIcon = jsuis.lf.RadioButtonSelectedIcon.getInstance();
			this.setIcon(selectedIcon);
		} else {
			var unselectedIcon = jsuis.lf.RadioButtonUnselectedIcon.getInstance();
			this.setIcon(unselectedIcon);
		}
	}
}) (jsuis);
