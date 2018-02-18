/**
 * jsuis.BorderLayout
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.BorderLayout = jsuis.Object.extend(SUPER, function(hgap, vgap, sort) {
		SUPER.prototype.constructor.call(this);
		hgap = nvl(hgap, 0);
		vgap = nvl(vgap, hgap);
		this.setHgap(hgap);
		this.setVgap(vgap);
		this.setSort(nvl(sort, true))
	});
	jsuis.Object.addProperties(jsuis.BorderLayout,
			new jsuis.Property("hgap"),
			new jsuis.Property("vgap"),
			new jsuis.Property("sort")
	);
	var comparator;
	jsuis.BorderLayout.getComparator = function() {
		if (!comparator) {
			comparator = function(a, b) {
				if (nvl(a.getConstraints(), jsuis.Constants.CENTER) === jsuis.Constants.CENTER) {
					if (nvl(b.getConstraints(), jsuis.Constants.CENTER) === jsuis.Constants.CENTER) {
						return 0;
					} else {
						return 1;
					}
				} else {
					if (nvl(b.getConstraints(), jsuis.Constants.CENTER) === jsuis.Constants.CENTER) {
						return -1;
					} else {
						return 0;
					}
				}
			};
		}
		return comparator;
	}
	jsuis.BorderLayout.prototype.addLayoutComponent = function(name, comp) {
	}
	jsuis.BorderLayout.prototype.removeLayoutComponent = function(comp) {
	}
	jsuis.BorderLayout.prototype.preferredLayoutSize = function(parent) {
		var preferredLayoutWidth = 0;
		var preferredLayoutHeight = 0;
		var hgap = this.getHgap();
		var vgap = this.getVgap();
		var components = parent.getComponents().slice();
		var sort = this.getSort();
		if (sort) {
			components.sort(jsuis.BorderLayout.getComparator());
		}
		for (var i = components.length - 1; i >= 0; i--) {
			var component = components[i];
			if (!component.isVisible()) {
				continue;
			}
			var componentPreferredSize = component.getPreferredSize();
			var componentPreferredWidth = componentPreferredSize.getWidth();
			var componentPreferredHeight = componentPreferredSize.getHeight();
			componentPreferredWidth += hgap;
			componentPreferredHeight += vgap;
			var constraints = nvl(component.getConstraints(), jsuis.Constants.CENTER);
			switch (constraints) {
			case jsuis.Constants.NORTH:
			case jsuis.Constants.SOUTH:
				preferredLayoutWidth = Math.max(preferredLayoutWidth, componentPreferredWidth);
				preferredLayoutHeight += componentPreferredHeight;
				break;
			case jsuis.Constants.EAST:
			case jsuis.Constants.WEST:
				preferredLayoutWidth += componentPreferredWidth;
				preferredLayoutHeight = Math.max(preferredLayoutHeight, componentPreferredHeight);
				break;
			case jsuis.Constants.CENTER:
			default:
				preferredLayoutWidth = Math.max(preferredLayoutWidth, componentPreferredWidth);
				preferredLayoutHeight = Math.max(preferredLayoutHeight, componentPreferredHeight);
			}
		}
		if (components.length) {
			preferredLayoutWidth -= hgap;
			preferredLayoutHeight -= vgap;
		}
		var parentInsetsOutsets = parent.getInsets().add(parent.getOutsets());
		preferredLayoutWidth += parentInsetsOutsets.getLeft() + parentInsetsOutsets.getRight();
		preferredLayoutHeight += parentInsetsOutsets.getTop() + parentInsetsOutsets.getBottom();
		return new jsuis.Dimension(preferredLayoutWidth, preferredLayoutHeight);
	}
	jsuis.BorderLayout.prototype.minimumLayoutSize = function(parent) {
		return this.preferredLayoutSize(parent);
	}
	jsuis.BorderLayout.prototype.layoutContainer = function(parent) {
		var x = 0;
		var y = 0;
		var width = parent.getWidth();
		var height = parent.getHeight();
		var hgap = this.getHgap();
		var vgap = this.getVgap();
		var parentInsetsOutsets = parent.getInsets().add(parent.getOutsets());
		x += parentInsetsOutsets.getLeft();
		y += parentInsetsOutsets.getTop();
		width -= parentInsetsOutsets.getLeft() + parentInsetsOutsets.getRight();
		height -= parentInsetsOutsets.getTop() + parentInsetsOutsets.getBottom();
		x += hgap / 2;
		y += vgap / 2;
		width += hgap;
		height += vgap;
		var components = parent.getComponents().slice();
		var sort = this.getSort();
		if (sort) {
			components.sort(jsuis.BorderLayout.getComparator());
		}
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			if (!component.isVisible()) {
				continue;
			}
			component.setFill(nvl(component.getFill(), jsuis.Constants.BOTH));
			var componentPreferredSize = component.getPreferredSize();
			var componentPreferredWidth = componentPreferredSize.getWidth();
			var componentPreferredHeight = componentPreferredSize.getHeight();
			var componentX = 0;
			var componentY = 0;
			var componentWidth = componentPreferredWidth + hgap;
			var componentHeight = componentPreferredHeight + vgap;
			var constraints = nvl(component.getConstraints(), jsuis.Constants.CENTER);
			switch (constraints) {
			case jsuis.Constants.NORTH:
				componentX = x;
				componentY = y;
				componentWidth = width;
				y += componentHeight;
				height -= componentHeight;
				break;
			case jsuis.Constants.SOUTH:
				componentX = x;
				componentY = y + height - componentHeight;
				componentWidth = width;
				height -= componentHeight;
				break;
			case jsuis.Constants.EAST:
				componentX = x + width - componentWidth;
				componentY = y;
				componentHeight = height;
				width -= componentWidth;
				break;
			case jsuis.Constants.WEST:
				componentX = x;
				componentY = y;
				componentHeight = height;
				x += componentWidth;
				width -= componentWidth;
				break;
			case jsuis.Constants.CENTER:
			default:
				componentX = x;
				componentY = y;
				componentWidth = width;
				componentHeight = height;
			}
			componentX -= hgap / 2;
			componentY -= vgap / 2;
			componentWidth -= hgap;
			componentHeight -= vgap;
			var rectangle = new jsuis.Rectangle(componentX, componentY, componentWidth, componentHeight);
			component.setMaximumLayoutBounds(rectangle);
		}
	}
}) (jsuis);
