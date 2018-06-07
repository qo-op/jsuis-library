/**
 * jsuis.defaultlf.RadioButton
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.ToggleButton;
	jsuis.defaultlf.RadioButton = jsuis.Object.extend(SUPER, function(text) {
		SUPER.prototype.constructor.call(this, text);
		this.setSelected(false);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.RadioButton, {
		group: null
	});
	jsuis.defaultlf.RadioButton.prototype.mouseReleased = function() {
		this.setSelected(true);
	}
	jsuis.defaultlf.RadioButton.prototype.setSelected = function(selected) {
		SUPER.prototype.setSelected.call(this, selected);
		if (selected) {
			var group = this.getGroup();
			if (group) {
				group.setSelected(this);
			}
		}
		if (selected) {
			var selectedIcon = jsuis.defaultlf.RadioButtonSelectedIcon.getInstance();
			this.setIcon(selectedIcon);
		} else {
			var unselectedIcon = jsuis.defaultlf.RadioButtonUnselectedIcon.getInstance();
			this.setIcon(unselectedIcon);
		}
	}
}) (jsuis);
