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
	
	jsuis.BORDER_CONSTRAINTS = jsuis.Object.extend(jsuis.BorderConstraints, function(
			border, anchor, fill, margin, padding, layer) {
		jsuis.BorderConstraints.prototype.constructor.call(this,
				border, anchor, fill, margin, padding, layer);
	});
	jsuis.BorderConstraints.NORTH = new jsuis.BORDER_CONSTRAINTS(jsuis.Constants.NORTH);
	jsuis.BorderConstraints.SOUTH = new jsuis.BORDER_CONSTRAINTS(jsuis.Constants.SOUTH);
	jsuis.BorderConstraints.EAST = new jsuis.BORDER_CONSTRAINTS(jsuis.Constants.EAST);
	jsuis.BorderConstraints.WEST = new jsuis.BORDER_CONSTRAINTS(jsuis.Constants.WEST);
	jsuis.BorderConstraints.CENTER = new jsuis.BORDER_CONSTRAINTS(jsuis.Constants.CENTER);
	
	jsuis.BORDER_CONSTRAINTS.prototype.setBorder = function(border) {
	}
	jsuis.BORDER_CONSTRAINTS.prototype.setAnchor = function(anchor) {
	}
	jsuis.BORDER_CONSTRAINTS.prototype.setFill = function(fill) {
	}
	jsuis.BORDER_CONSTRAINTS.prototype.setMargin = function(margin) {
	}
	jsuis.BORDER_CONSTRAINTS.prototype.setPadding = function(padding) {
	}
	jsuis.BORDER_CONSTRAINTS.prototype.setLayer = function(layer) {
	}
}) (jsuis);
