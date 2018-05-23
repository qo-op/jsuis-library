/**
 * jsuis.Constraints
 */
(function(jsuis) {
	var SUPER = jsuis.Cloneable;
	jsuis.Constraints = jsuis.Object.extend(SUPER, function(
			layer, anchor, fill, margin, padding, border) {
		SUPER.prototype.constructor.call(this);
		this.setLayer(nvl(layer, jsuis.Constants.DEFAULT_LAYER));
		this.setAnchor(nvl(anchor, jsuis.Constants.CENTER));
		this.setFill(nvl(fill, jsuis.Constants.NONE));
		this.setMargin(nvl(margin, new jsuis.Insets()));
		this.setPadding(nvl(padding, new jsuis.Insets()));
		this.setBorder(nvl(border, jsuis.Constants.CENTER));
	});
	jsuis.Object.addProperties(jsuis.Constraints, {
		layer: null,
		anchor: null,
		fill: null,
		margin: null,
		padding: null,
		border: null,
		bounds: null
	});
	jsuis.Constraints.prototype.withLayer = function(layer) {
		return this.clone().setLayer(layer);
	}
	jsuis.Constraints.prototype.withAnchor = function(anchor) {
		return this.clone().setAnchor(anchor);
	}
	jsuis.Constraints.prototype.withFill = function(fill) {
		return this.clone().setFill(fill);
	}
	jsuis.Constraints.prototype.withMargin = function(margin) {
		return this.clone().setMargin(margin);
	}
	jsuis.Constraints.prototype.withPadding = function(padding) {
		return this.clone().setPadding(padding);
	}
	jsuis.Constraints.prototype.withBorder = function(border) {
		return this.clone().setBorder(border);
	}
	jsuis.Constraints.prototype.clone = function() {
		return new jsuis.Constraints(
				this.getLayer(), this.getAnchor(), this.getFill(),
				this.getMargin().clone(), this.getPadding().clone(),
				this.getBorder());
	}
	
	jsuis.CONSTRAINTS = jsuis.Object.extend(jsuis.Constraints, function(
			layer, anchor, fill, margin, padding, border) {
		jsuis.Constraints.prototype.constructor.call(this,
				layer, anchor, fill, margin, padding, border);
	});
	jsuis.Constraints.FRAME_CONTENT_LAYER = new jsuis.CONSTRAINTS(jsuis.Constants.FRAME_CONTENT_LAYER).withFill(jsuis.Constants.BOTH);
	jsuis.Constraints.DEFAULT_LAYER = new jsuis.CONSTRAINTS(jsuis.Constants.DEFAULT_LAYER).withFill(jsuis.Constants.BOTH);
	jsuis.Constraints.PALETTE_LAYER = new jsuis.CONSTRAINTS(jsuis.Constants.PALETTE_LAYER).withFill(jsuis.Constants.BOTH);
	jsuis.Constraints.MODAL_LAYER = new jsuis.CONSTRAINTS(jsuis.Constants.MODAL_LAYER).withFill(jsuis.Constants.BOTH);
	jsuis.Constraints.POPUP_LAYER = new jsuis.CONSTRAINTS(jsuis.Constants.POPUP_LAYER).withFill(jsuis.Constants.BOTH);
	jsuis.Constraints.DRAG_LAYER = new jsuis.CONSTRAINTS(jsuis.Constants.DRAG_LAYER).withFill(jsuis.Constants.BOTH);
	
	jsuis.CONSTRAINTS.prototype.setLayer = function(layer) {
	}
	jsuis.CONSTRAINTS.prototype.setAnchor = function(anchor) {
	}
	jsuis.CONSTRAINTS.prototype.setFill = function(fill) {
	}
	jsuis.CONSTRAINTS.prototype.setMargin = function(margin) {
	}
	jsuis.CONSTRAINTS.prototype.setPadding = function(padding) {
	}
	jsuis.CONSTRAINTS.prototype.setBorder = function(border) {
	}
}) (jsuis);
