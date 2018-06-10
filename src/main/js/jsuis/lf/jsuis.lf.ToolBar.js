/**
 * jsuis.lf.ToolBar
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Panel;
	jsuis.lf.ToolBar = jsuis.Object.extend(SUPER, function(orientation) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout(2));
		this.setOrientation(nvl(orientation, jsuis.Constants.HORIZONTAL));
		this.setPadding(new jsuis.Insets(2));
		this.setBackground(jsuis.Color.Black.withAlpha(.1 * 255));
	});
	jsuis.Object.addProperties(jsuis.lf.ToolBar, {
		orientation: null
	});
	jsuis.lf.ToolBar.prototype.add = function(component, constraints, index) {
		var orientation = this.getOrientation();
		switch (orientation) {
		case jsuis.Constants.VERTICAL:
			SUPER.prototype.add.call(this, component, nvl(constraints, jsuis.Constraints.NORTH), index);
			break;
		case jsuis.Constants.HORIZONTAL:
		default:
			SUPER.prototype.add.call(this, component, nvl(constraints, jsuis.Constraints.WEST), index);
		}
	}
	jsuis.lf.ToolBar.prototype.addSeparator = function(size) {
		this.add(new jsuis.lf.TollBarSeparator(size));
	}
}) (jsuis);
