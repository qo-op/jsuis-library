/**
 * jsuis.defaultlf.ScrollTrack
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.ScrollTrack = jsuis.Object.extend(SUPER, function(direction) {
		SUPER.prototype.constructor.call(this, null);
		direction = nvl(direction, jsuis.Constants.VERTICAL);
		this.setDirection(direction);
		this.setBorder(new jsuis.defaultlf.LineBorder(null, 0, 8));
		this.setBackground(jsuis.Color.Black.withAlpha(.2 * 255));
		if (direction === jsuis.Constants.HORIZONTAL) {
			this.setMargin(new jsuis.Insets(0, -16));
		} else {
			this.setMargin(new jsuis.Insets(-16, 0));
		}
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ScrollTrack,
			new jsuis.Property("direction"),
			new jsuis.Property("path"),
			new jsuis.Property("viewport")
	);
}) (jsuis);