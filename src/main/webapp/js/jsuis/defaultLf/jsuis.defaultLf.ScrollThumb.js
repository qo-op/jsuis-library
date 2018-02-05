/**
 * jsuis.defaultLf.ScrollThumb
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.defaultLf.ScrollThumb = jsuis.Object.extend(SUPER, function(orientation) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		this.setOrientation(nvl(orientation, jsuis.Constants.VERTICAL));
		this.setBorder(new jsuis.LineBorder(null, 0, 8));
		this.setBackground(jsuis.Color.White.withAlpha(.4 * 255));
	});
	jsuis.Object.addProperties(jsuis.defaultLf.ScrollThumb,
			new jsuis.Property("orientation")
	);
	jsuis.defaultLf.ScrollThumb.prototype.getMinimumSize = function() {
		var orientation = this.getOrientation();
		if (orientation === jsuis.Constants.HORIZONTAL) {
			return new jsuis.Dimension(32, 16);
		} else {
			return new jsuis.Dimension(16, 32);
		}
	}
}) (jsuis);
