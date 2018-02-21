/**
 * jsuis.GridBagConstraints
 */
(function(jsuis) {
	var SUPER = jsuis.Constraints;
	jsuis.GridBagConstraints = jsuis.Object.extend(SUPER, function(
			gridx, gridy, gridwidth, gridheight,
			weightx, weighty,
			anchor, fill,
			insets, ipadx, ipady,
			layer) {
		SUPER.prototype.constructor.call(this, layer, anchor, fill, insets,
				new jsuis.Insets(nvl(ipady, 0), nvl(ipadx, 0)));
		this.setGridx(nvl(gridx, jsuis.Constants.RELATIVE));
		this.setGridy(nvl(gridy, jsuis.Constants.RELATIVE));
		this.setGridwidth(nvl(gridwidth, 1));
		this.setGridheight(nvl(gridheight, 1));
		this.setWeightx(nvl(weightx, 0));
		this.setWeighty(nvl(weighty, 0));
	});
	jsuis.Object.addProperties(jsuis.GridBagConstraints,
			new jsuis.Property("gridx"),
			new jsuis.Property("gridy"),
			new jsuis.Property("gridwidth"),
			new jsuis.Property("gridheight"),
			new jsuis.Property("weightx"),
			new jsuis.Property("weighty"),
			new jsuis.Property("relativeGridx"),
			new jsuis.Property("relativeGridy"),
			new jsuis.Property("remainderGridwidth"),
			new jsuis.Property("remainderGridheight")
	);
	jsuis.GridBagConstraints.prototype.getInsets = function() {
		return this.getMargin();
	}
	jsuis.GridBagConstraints.prototype.setInsets = function(insets) {
		this.setMargin(insets);
		return this;
	}
	jsuis.GridBagConstraints.prototype.getIpadx = function() {
		var padding = this.getPadding();
		return padding.getLeft();
	}
	jsuis.GridBagConstraints.prototype.setIpadx = function(ipadx) {
		var padding = this.getPadding();
		padding.setLeft(ipadx).setRight(ipadx);
		return this;
	}
	jsuis.GridBagConstraints.prototype.getIpady = function() {
		var padding = this.getPadding();
		return padding.getTop();
	}
	jsuis.GridBagConstraints.prototype.setIpady = function(ipady) {
		var padding = this.getPadding();
		padding.setTop(ipady).setBottom(ipady);
		return this;
	}
	jsuis.GridBagConstraints.prototype.withGridx = function(gridx) {
		return this.clone().setGridx(gridx);
	}
	jsuis.GridBagConstraints.prototype.withGridy = function(gridy) {
		return this.clone().setGridy(gridy);
	}
	jsuis.GridBagConstraints.prototype.withGridwidth = function(gridwidth) {
		return this.clone().setGridwidth(gridwidth);
	}
	jsuis.GridBagConstraints.prototype.withGridheight = function(gridheight) {
		return this.clone().setGridheight(gridheight);
	}
	jsuis.GridBagConstraints.prototype.withWeightx = function(weightx) {
		return this.clone().setWeightx(weightx);
	}
	jsuis.GridBagConstraints.prototype.withWeighty = function(weighty) {
		return this.clone().setWeighty(weighty);
	}
	
	jsuis.GridBagConstraints.prototype.clone = function() {
		return new jsuis.GridBagConstraints(
				this.getGridx(), this.getGridy(), this.getGridwidth(), this.getGridheight(),
				this.getWeightx(), this.getWeighty(),
				this.getAnchor(), this.getFill(),
				this.getInsets(), this.getIpadx(), this.getIpady(),
				this.getLayer());
	}
}) (jsuis);
