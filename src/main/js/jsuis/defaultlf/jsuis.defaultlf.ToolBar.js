/**
 * jsuis.defaultlf.ToolBar
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.ToolBar = jsuis.Object.extend(SUPER, function(orientation) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout(2));
		this.setOrientation(nvl(orientation, jsuis.Constants.HORIZONTAL));
		this.setPadding(new jsuis.Insets(2));
		this.setBackground(jsuis.Color.Black.withAlpha(.1 * 255));
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ToolBar,
			new jsuis.Property("orientation")
	);
	jsuis.defaultlf.ToolBar.prototype.add = function(component, constraints, index) {
		var orientation = this.getOrientation();
		switch (orientation) {
		case jsuis.Constants.VERTICAL:
			SUPER.prototype.add.call(this, component, nvl(constraints, jsuis.Constants.NORTH), index);
			break;
		case jsuis.Constants.HORIZONTAL:
		default:
			SUPER.prototype.add.call(this, component, nvl(constraints, jsuis.Constants.WEST), index);
		}
	}
}) (jsuis);
