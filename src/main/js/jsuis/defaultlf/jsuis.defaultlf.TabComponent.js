/**
 * jsuis.defaultlf.TabComponent
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.AbstractButton;
	jsuis.defaultlf.TabComponent = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, text, icon);
		this.setBorder(new jsuis.defaultlf.TabComponentBorder());
	});
	jsuis.defaultlf.TabComponent.prototype.setSelected = function(selected) {
		SUPER.prototype.setSelected.call(this, selected);
		var border = this.getBorder();
		border.paintBorder(this);
		return this;
	}
}) (jsuis);
