/**
 * jsuis.lf.TabComponent
 */
(function(jsuis) {
	var SUPER = jsuis.lf.AbstractButton;
	jsuis.lf.TabComponent = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, text, icon);
		this.setBorder(new jsuis.lf.TabComponentBorder());
	});
	jsuis.lf.TabComponent.prototype.setSelected = function(selected) {
		SUPER.prototype.setSelected.call(this, selected);
		var border = this.getBorder();
		border.paintBorder(this);
		return this;
	}
}) (jsuis);
