/**
 * jsuis.defaultlf.MenuBar
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.MenuBar = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, new jsuis.FlowLayout(jsuis.Constants.LEFT, 0));
		this.setBackground(jsuis.Color.Black.withAlpha(.1 * 255));
	});
	jsuis.Object.addProperties(jsuis.defaultlf.MenuBar,
			new jsuis.Property("selection")
	);
	jsuis.defaultlf.MenuBar.prototype.isSelected = function(menu) {
		var selection = this.getSelection();
		return (menu === selection);
	}
	jsuis.defaultlf.MenuBar.prototype.setSelected = function(menu) {
		var selection = this.getSelection();
		if (selection) {
			selection.setSelected(false);
		}
		this.setSelection(menu);
		if (menu) {
			menu.setSelected(true);
		}
		return this;
	}
}) (jsuis);
