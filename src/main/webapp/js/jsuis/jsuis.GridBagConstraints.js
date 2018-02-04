/**
 * jsuis.GridBagConstraints
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.GridBagConstraints = jsuis.Object.extend(SUPER, function(
			gridx, gridy, gridwidth, gridheight,
			weightx, weighty,
			anchor, fill,
			insets, ipadx, ipady) {
		SUPER.prototype.constructor.call(this);
		this.setGridx(nvl(gridx, jsuis.Constants.RELATIVE));
		this.setGridy(nvl(gridy, jsuis.Constants.RELATIVE));
		this.setGridwidth(nvl(gridwidth, 1));
		this.setGridheight(nvl(gridheight, 1));
		this.setWeightx(nvl(weightx, 0));
		this.setWeighty(nvl(weighty, 0));
		this.setAnchor(nvl(anchor, jsuis.Constants.CENTER));
		this.setFill(nvl(fill, jsuis.Constants.NONE));
		this.setInsets(nvl(insets, new jsuis.Insets()));
		this.setIpadx(nvl(ipadx, 0));
		this.setIpady(nvl(ipady, 0));
	});
	jsuis.Object.addProperties(jsuis.GridBagConstraints,
			new jsuis.Property("gridx"),
			new jsuis.Property("gridy"),
			new jsuis.Property("gridwidth"),
			new jsuis.Property("gridheight"),
			new jsuis.Property("weightx"),
			new jsuis.Property("weighty"),
			new jsuis.Property("anchor"),
			new jsuis.Property("fill"),
			new jsuis.Property("insets"),
			new jsuis.Property("ipadx"),
			new jsuis.Property("ipady"),
			new jsuis.Property("relativeGridx"),
			new jsuis.Property("relativeGridy"),
			new jsuis.Property("remainderGridwidth"),
			new jsuis.Property("remainderGridheight")
	);
	jsuis.GridBagConstraints.prototype.setGridx = function(gridx) {
		this.gridx = gridx;
		return this;
	}
	jsuis.GridBagConstraints.prototype.setGridy = function(gridy) {
		this.gridy = gridy;
		return this;
	}
	jsuis.GridBagConstraints.prototype.setGridwidth = function(gridwidth) {
		this.gridwidth = gridwidth;
		return this;
	}
	jsuis.GridBagConstraints.prototype.setGridheight = function(gridheight) {
		this.gridheight = gridheight;
		return this;
	}
	jsuis.GridBagConstraints.prototype.setWeightx = function(weightx) {
		this.weightx = weightx;
		return this;
	}
	jsuis.GridBagConstraints.prototype.setWeighty = function(weighty) {
		this.weighty = weighty;
		return this;
	}
	jsuis.GridBagConstraints.prototype.setAnchor = function(anchor) {
		this.anchor = anchor;
		return this;
	}
	jsuis.GridBagConstraints.prototype.setFill = function(fill) {
		this.fill = fill;
		return this;
	}
	jsuis.GridBagConstraints.prototype.setInsets = function(insets) {
		this.insets = insets;
		return this;
	}
	jsuis.GridBagConstraints.prototype.setIpadx = function(ipadx) {
		this.ipadx = ipadx;
		return this;
	}
	jsuis.GridBagConstraints.prototype.setIpady = function(ipady) {
		this.ipady = ipady;
		return this;
	}
	jsuis.GridBagConstraints.prototype.clone = function() {
		return new jsuis.GridBagConstraints(
				this.getGridx(), this.getGridy(), this.getGridwidth(), this.getGridheight(),
				this.getWeightx(), this.getWeighty(),
				this.getAnchor(), this.getFill(),
				this.getInsets(), this.getIpadx(), this.getIpady());
	}
}) (jsuis);
