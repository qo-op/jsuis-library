/**
 * jsuis.CheckBox
 */
(function(jsuis) {
	var SUPER = jsuis.ToggleButton;
	jsuis.CheckBox = jsuis.Object.extend(SUPER, function(text, icon, selected) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].CheckBox(text, icon, selected));
	});
	jsuis.CheckBox.prototype.isSelected = function() {
		var peer = this.getPeer();
		return peer.isSelected();
	}
	jsuis.CheckBox.prototype.setSelected = function(selected) {
		var peer = this.getPeer();
		peer.setSelected(selected);
		return this;
	}
}) (jsuis);
