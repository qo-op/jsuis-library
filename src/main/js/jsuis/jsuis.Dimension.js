/**
 * jsuis.Dimension
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Dimension = jsuis.Object.extend(SUPER, function(width, height) {
		SUPER.prototype.constructor.call(this);
		this.setWidth(nvl(width, 0));
		this.setHeight(nvl(height, 0));
	});
	jsuis.Object.addProperties(jsuis.Dimension,
			new jsuis.Property("width"),
			new jsuis.Property("height")
	);
	jsuis.Dimension.prototype.add = function(dimension) {
		var width = this.getWidth() + dimension.getWidth();
		var height = this.getHeight() + dimension.getHeight();
		return new jsuis.Dimension(width, height);
	}
	jsuis.Dimension.prototype.subtract = function(dimension) {
		var width = this.getWidth() - dimension.getWidth();
		var height = this.getHeight() - dimension.getHeight();
		return new jsuis.Dimension(width, height);
	}
	jsuis.Dimension.prototype.clone = function() {
		return new jsuis.Dimension(this.getWidth(), this.getHeight());
	}
}) (jsuis);
