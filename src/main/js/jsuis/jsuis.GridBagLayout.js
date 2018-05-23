/**
 * jsuis.GridBagLayout
 */
(function(jsuis) {
	var SUPER = jsuis.Layout;
	jsuis.GridBagLayout = jsuis.Object.extend(SUPER, function(hgap, vgap) {
		SUPER.prototype.constructor.call(this);
		hgap = nvl(hgap, 0);
		vgap = nvl(vgap, hgap);
		this.setHgap(hgap);
		this.setVgap(vgap);
	});
	jsuis.Object.addProperties(jsuis.GridBagLayout, {
		hgap: 0,
		vgap: 0,
		widths: null,
		heights: null,
		weightxs: null,
		weightys: null
	});
	jsuis.GridBagLayout.prototype.preferredLayoutSize = function(parent) {
		var preferredLayoutWidth = 0;
		var preferredLayoutHeight = 0;
		var hgap = this.getHgap();
		var vgap = this.getVgap();
		var maxGridx = 0;
		var maxGridy = 0;
		var previousGridx = -1;
		var previousGridy = -1;
		var components = parent.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			var constraints = component.getConstraints();
			if (!constraints) {
				constraints = new jsuis.GridBagConstraints();
				component.setConstraints(constraints);
			}
			if (!component.isVisible()) {
				continue;
			}
			var gridx = constraints.getGridx();
			if (gridx === jsuis.Constants.RELATIVE) {
				gridx = previousGridx + 1;
				constraints.setRelativeGridx(gridx);
			}
			previousGridx = gridx;
			var gridy = constraints.getGridy();
			if (gridy === jsuis.Constants.RELATIVE) {
				gridy = previousGridy + 1;
				constraints.setRelativeGridy(gridy);
			}
			previousGridy = gridy;
			var gridwidth = constraints.getGridwidth();
			if (gridwidth === jsuis.Constants.REMAINDER) {
				maxGridx = Math.max(maxGridx, gridx);
			} else {
				maxGridx = Math.max(maxGridx, gridx + gridwidth - 1);
			}
			var gridheight = constraints.getGridheight();
			if (gridheight === jsuis.Constants.REMAINDER) {
				maxGridy = Math.max(maxGridy, gridy);
			} else {
				maxGridy = Math.max(maxGridy, gridy + gridheight - 1);
			}
		}
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			if (!component.isVisible()) {
				continue;
			}
			var constraints = component.getConstraints();
			var gridx = constraints.getGridx();
			if (gridx === jsuis.Constants.RELATIVE) {
				gridx = constraints.getRelativeGridx();
			}
			var gridwidth = constraints.getGridwidth();
			if (gridwidth === jsuis.Constants.REMAINDER) {
				constraints.setRemainderGridwidth(maxGridx - gridx + 1);
			}
			var gridy = constraints.getGridy();
			if (gridy === jsuis.Constants.RELATIVE) {
				gridy = constraints.getRelativeGridy();
			}
			var gridheight = constraints.getGridheight();
			if (gridheight === jsuis.Constants.REMAINDER) {
				constraints.setRemainderGridheight(maxGridy - gridy + 1);
			}
		}
		var widthComponents = components.slice();
		var widths = [];
		var weightxs = [];
		for (var i = 0; i <= maxGridx; i++) {
			widths.push(0);
			weightxs.push(0);
			var remainingComponents = widthComponents.slice();
			for (var j = 0; j < widthComponents.length; j++) {
				var component = widthComponents[j];
				if (!component.isVisible()) {
					continue;
				}
				var constraints = component.getConstraints();
				var gridx = constraints.getGridx();
				if (gridx === jsuis.Constants.RELATIVE) {
					gridx = constraints.getRelativeGridx();
				}
				var gridwidth = constraints.getGridwidth();
				if (gridwidth === jsuis.Constants.REMAINDER) {
					gridwidth = constraints.getRemainderGridwidth();
				}
				if ((gridx + gridwidth - 1) !== i) {
					continue;
				}
				var componentPreferredSize = component.getPreferredSize();
				var width = componentPreferredSize.getWidth();
				var weightx = constraints.getWeightx();
				for (var k = 1; k < gridwidth; k++) {
					width -= widths[i - k];
					weightx -= weightxs[i - k];
				}
				widths[i] = Math.max(widths[i], width);
				weightxs[i] = Math.max(weightxs[i], weightx);
				var index = remainingComponents.indexOf(component);
				if (index !== -1) {
					remainingComponents.splice(index, 1);
				}
			}
			widthComponents = remainingComponents;
		}
		this.setWidths(widths);
		this.setWeightxs(weightxs);
		
		var x = 0;
		var xs = [];
		for (var i = 0; i < widths.length; i++) {
			xs.push(x);
			x += widths[i];
		}
		if (widths.length) {
			xs.push(x);
		}
		var heightComponents = components.slice();
		var heights = [];
		var weightys = [];
		for (var i = 0; i <= maxGridy; i++) {
			heights.push(0);
			weightys.push(0);
			var remainingComponents = heightComponents.slice();
			for (var j = 0; j < heightComponents.length; j++) {
				var component = heightComponents[j];
				if (!component.isVisible()) {
					continue;
				}
				var constraints = component.getConstraints();
				var gridy = constraints.getGridy();
				if (gridy === jsuis.Constants.RELATIVE) {
					gridy = constraints.getRelativeGridy();
				}
				var gridheight = constraints.getGridheight();
				if (gridheight === jsuis.Constants.REMAINDER) {
					gridheight = constraints.getRemainderGridheight();
				}
				if ((gridy + gridheight - 1) !== i) {
					continue;
				}
				var gridx = constraints.getGridx();
				if (gridx === jsuis.Constants.RELATIVE) {
					gridx = constraints.getRelativeGridx();
				}
				var gridwidth = constraints.getGridwidth();
				if (gridwidth === jsuis.Constants.REMAINDER) {
					gridwidth = constraints.getRemainderGridwidth();
				}
				var componentPreferredSize = component.getPreferredSize();
				var height = componentPreferredSize.getHeight();
				component.setSize(new jsuis.Dimension(xs[gridx + gridwidth] - xs[gridx], height));
				height = Math.max(height, component.getMinimumSize().getHeight());
				var weighty = constraints.getWeighty();
				for (var k = 1; k < gridheight; k++) {
					height -= heights[i - k];
					weighty -= weightys[i - k];
				}
				heights[i] = Math.max(heights[i], height);
				weightys[i] = Math.max(weightys[i], weighty);
				var index = remainingComponents.indexOf(component);
				if (index !== -1) {
					remainingComponents.splice(index, 1);
				}
			}
			heightComponents = remainingComponents;
		}
		this.setHeights(heights);
		this.setWeightys(weightys);
		
		for (var i = 0; i < widths.length; i++) {
			preferredLayoutWidth += widths[i] + hgap;
		}
		for (var i = 0; i < heights.length; i++) {
			preferredLayoutHeight += heights[i] + vgap;
		}
		if (components.length) {
			preferredLayoutWidth -= hgap;
			preferredLayoutHeight -= vgap;
		}
		var parentInsetsOutsets = parent.getInsets().add(parent.getOutsets());
		preferredLayoutWidth += parentInsetsOutsets.left + parentInsetsOutsets.right;
		preferredLayoutHeight += parentInsetsOutsets.top + parentInsetsOutsets.bottom;
		return new jsuis.Dimension(preferredLayoutWidth, preferredLayoutHeight);
	}
	jsuis.GridBagLayout.prototype.minimumLayoutSize = function(parent) {
		return this.preferredLayoutSize(parent);
	}
	jsuis.GridBagLayout.prototype.layoutContainer = function(parent) {
		var preferredLayoutSize = this.preferredLayoutSize(parent);
		var x = 0;
		var y = 0;
		var width = parent.getWidth();
		var height = parent.getHeight();
		var hgap = this.getHgap();
		var vgap = this.getVgap();
		var parentInsetsOutsets = parent.getInsets().add(parent.getOutsets());
		var preferredLayoutWidth = preferredLayoutSize.getWidth();
		var preferredLayoutHeight = preferredLayoutSize.getHeight();
		x += parentInsetsOutsets.getLeft();
		y += parentInsetsOutsets.getTop();
		var widths = this.getWidths().slice();
		var dwidth = width - preferredLayoutWidth;
		var weightxsSum = 0;
		var weightxs = this.getWeightxs();
		for (var i = 0; i < weightxs.length; i++) {
			weightxsSum += weightxs[i];
		}
		if (weightxsSum === 0) {
			x += dwidth / 2;
			dwidth = 0;
		} else {
			for (var i = 0; i < widths.length; i++) {
				widths[i] += dwidth * weightxs[i] / weightxsSum;
			}
		}
		var heights = this.getHeights().slice();
		var dheight = height - preferredLayoutHeight;
		var weightysSum = 0;
		var weightys = this.getWeightys();
		for (var i = 0; i < weightys.length; i++) {
			weightysSum += weightys[i];
		}
		if (weightysSum === 0) {
			y += dheight / 2;
			dheight = 0;
		} else {
			for (var i = 0; i < heights.length; i++) {
				heights[i] += dheight * weightys[i] / weightysSum;
			}
		}
		var dx = 0;
		var xs = [];
		for (var i = 0; i < widths.length; i++) {
			xs.push(Math.round(x + dx));
			dx += widths[i] + hgap;
		}
		if (widths.length) {
			xs.push(Math.round(x + dx));
		}
		var dy = 0;
		var ys = [];
		for (var i = 0; i < heights.length; i++) {
			ys.push(Math.round(y + dy));
			dy += heights[i] + vgap;
		}
		if (heights.length) {
			ys.push(Math.round(y + dy));
		}
		var components = parent.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			var constraints = component.getConstraints();
			if (!component.isVisible()) {
				continue;
			}
			var gridx = constraints.getGridx();
			if (gridx === jsuis.Constants.RELATIVE) {
				gridx = constraints.getRelativeGridx();
			}
			var gridy = constraints.getGridy();
			if (gridy === jsuis.Constants.RELATIVE) {
				gridy = constraints.getRelativeGridy();
			}
			var gridwidth = constraints.getGridwidth();
			if (gridwidth === jsuis.Constants.REMAINDER) {
				gridwidth = constraints.getRemainderGridwidth();
			}
			var gridheight = constraints.getGridheight();
			if (gridheight === jsuis.Constants.REMAINDER) {
				gridheight = constraints.getRemainderGridheight();
			}
			var weightx = constraints.getWeightx();
			var weighty = constraints.getWeighty();
			var componentX = xs[gridx];
			var componentY = ys[gridy];
			var componentWidth = xs[gridx + gridwidth] - componentX - hgap;
			var componentHeight = ys[gridy + gridheight] - componentY - vgap;
			var bounds;
			var leftToRight = parent.isLeftToRight();
			if (leftToRight) {
				bounds = new jsuis.Rectangle(componentX, componentY, componentWidth, componentHeight);
			} else {
				bounds = new jsuis.Rectangle(width - componentX - componentWidth, componentY, componentWidth, componentHeight);
			}
			constraints.setBounds(bounds);
		}
		SUPER.prototype.layoutContainer.call(this, parent);
	}
}) (jsuis);
