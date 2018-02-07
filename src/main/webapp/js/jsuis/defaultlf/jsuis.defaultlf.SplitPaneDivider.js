/**
 * jsuis.defaultlf.SplitPaneDivider
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.defaultlf.SplitPaneDivider = jsuis.Object.extend(SUPER, function(direction) {
		SUPER.prototype.constructor.call(this, null);
		direction = nvl(direction, jsuis.Constants.HORIZONTAL);
		this.setDirection(direction);
		this.setBackground(jsuis.Color.Black.withAlpha(0));
		if (direction === jsuis.Constants.HORIZONTAL) {
			this.setCursor(jsuis.Cursor.E_RESIZE_CURSOR);
		} else {
			this.setCursor(jsuis.Cursor.S_RESIZE_CURSOR);
		}
	});
	jsuis.Object.addProperties(jsuis.defaultlf.SplitPaneDivider,
			new jsuis.Property("direction")
	);
}) (jsuis);