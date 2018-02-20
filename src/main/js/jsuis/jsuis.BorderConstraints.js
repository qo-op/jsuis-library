/**
 * jsuis.BorderConstraints
 */
(function(jsuis) {
	var SUPER = jsuis.Constraints;
	jsuis.BorderConstraints = jsuis.Object.extend(SUPER, function(
			border, anchor, fill, margin, padding, layer) {
		SUPER.prototype.constructor.call(this, layer, anchor, nvl(fill, jsuis.Constants.BOTH),
				margin, padding, border);
	});
	jsuis.BorderConstraints.prototype.clone = function() {
		return new jsuis.BorderConstraints(
				this.getBorder(), this.getAnchor(), this.getFill(),
				this.getMargin().clone(), this.getPadding().clone(),
				this.getLayer());
	}
	
	jsuis.BorderConstraints.NORTH = new jsuis.BorderConstraints(jsuis.Constants.NORTH);
	jsuis.BorderConstraints.SOUTH = new jsuis.BorderConstraints(jsuis.Constants.SOUTH);
	jsuis.BorderConstraints.EAST = new jsuis.BorderConstraints(jsuis.Constants.EAST);
	jsuis.BorderConstraints.WEST = new jsuis.BorderConstraints(jsuis.Constants.WEST);
	jsuis.BorderConstraints.CENTER = new jsuis.BorderConstraints(jsuis.Constants.CENTER);
	
}) (jsuis);
