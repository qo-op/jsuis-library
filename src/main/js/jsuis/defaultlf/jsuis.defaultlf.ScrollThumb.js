/**
 * jsuis.defaultlf.ScrollThumb
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.ScrollThumb = jsuis.Object.extend(SUPER, function(orientation) {
		SUPER.prototype.constructor.call(this, null);
		this.setOrientation(nvl(orientation, jsuis.Constants.VERTICAL));
		this.setBorder(new jsuis.defaultlf.LineBorder(null, 0, 8));
		this.setBackground(jsuis.Color.White.withAlpha(.4 * 255));
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ScrollThumb,
			new jsuis.Property("orientation")
	);
	jsuis.defaultlf.ScrollThumb.prototype.getMinimumSize = function() {
		var orientation = this.getOrientation();
		if (orientation === jsuis.Constants.HORIZONTAL) {
			return new jsuis.Dimension(32, 16);
		} else {
			return new jsuis.Dimension(16, 32);
		}
	}
	jsuis.defaultlf.ScrollThumb.prototype.setHeight = function(height) {
		SUPER.prototype.setHeight.call(this, height);
		return this;
	}
}) (jsuis);
