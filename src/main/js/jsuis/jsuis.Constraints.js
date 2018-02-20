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
	jsuis.Object.addProperties(jsuis.Constraints,
			new jsuis.Property("layer"),
			new jsuis.Property("anchor"),
			new jsuis.Property("fill"),
			new jsuis.Property("margin"),
			new jsuis.Property("padding"),
			new jsuis.Property("border"),
			new jsuis.Property("bounds")
	);
	jsuis.Constraints.prototype.withFill = function(fill) {
		return this.clone().setFill(fill);
	}
	jsuis.Constraints.prototype.clone = function() {
		return new jsuis.Constraints(
				this.getLayer(), this.getAnchor(), this.getFill(),
				this.getMargin().clone(), this.getPadding().clone(),
				this.getBorder());
	}
	
	jsuis.Constraints.FRAME_CONTENT_LAYER = new jsuis.Constraints(jsuis.Constants.FRAME_CONTENT_LAYER).setFill(jsuis.Constants.BOTH);
	jsuis.Constraints.DEFAULT_LAYER = new jsuis.Constraints(jsuis.Constants.DEFAULT_LAYER).setFill(jsuis.Constants.BOTH);
	jsuis.Constraints.PALETTE_LAYER = new jsuis.Constraints(jsuis.Constants.PALETTE_LAYER).setFill(jsuis.Constants.BOTH);
	jsuis.Constraints.MODAL_LAYER = new jsuis.Constraints(jsuis.Constants.MODAL_LAYER).setFill(jsuis.Constants.BOTH);
	jsuis.Constraints.POPUP_LAYER = new jsuis.Constraints(jsuis.Constants.POPUP_LAYER).setFill(jsuis.Constants.BOTH);
	jsuis.Constraints.DRAG_LAYER = new jsuis.Constraints(jsuis.Constants.DRAG_LAYER).setFill(jsuis.Constants.BOTH);
	
}) (jsuis);
