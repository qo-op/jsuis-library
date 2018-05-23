/**
 * jsuis.ButtonGroup
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.ButtonGroup = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
		this.setButtons([]);
	});
	jsuis.Object.addProperties(jsuis.ButtonGroup, {
		buttons: null,
		selection: null
	});
	jsuis.ButtonGroup.prototype.add = function(button) {
		var buttons = this.getButtons();
		buttons.push(button);
		button.setGroup(this);
	}
	jsuis.ButtonGroup.prototype.remove = function(button) {
		var buttons = this.getButtons();
		var index = buttons.indexOf(button);
		if (index === -1) {
			return;
		}
		buttons.splice(index, 1);
		var selection = this.getSelection();
		if (button === selection) {
			this.setSelection(null);
		}
		button.setGroup(null);
	}
	jsuis.ButtonGroup.prototype.isSelected = function(button) {
		var selection = this.getSelection();
		return (button === selection);
	}
	jsuis.ButtonGroup.prototype.setSelected = function(button) {
		var oldSelection = this.getSelection();
		if (oldSelection) {
			oldSelection.setSelected(false);
		}
		this.setSelection(button);
		if (button) {
			button.setSelected(true);
		}
		return this;
	}
}) (jsuis);
