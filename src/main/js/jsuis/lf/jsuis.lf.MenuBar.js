/**
 * jsuis.lf.MenuBar
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Panel;
	jsuis.lf.MenuBar = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, new jsuis.FlowLayout(jsuis.Constants.LEFT, 0));
		this.setBackground(jsuis.Color.Black.withAlpha(.1 * 255));
	});
	jsuis.Object.addProperties(jsuis.lf.MenuBar, {
		selection: null
	});
	jsuis.lf.MenuBar.prototype.isSelected = function(menu) {
		var selection = this.getSelection();
		return (menu === selection);
	}
	jsuis.lf.MenuBar.prototype.setSelected = function(menu) {
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
