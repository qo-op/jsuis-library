/**
 * jsuis.BorderLayout
 */
(function(jsuis) {
	var SUPER = jsuis.Layout;
	jsuis.BorderLayout = jsuis.Object.extend(SUPER, function(hgap, vgap, sort) {
		SUPER.prototype.constructor.call(this);
		hgap = nvl(hgap, 0);
		vgap = nvl(vgap, hgap);
		this.setHgap(hgap);
		this.setVgap(vgap);
		this.setSort(nvl(sort, true));
	});
	jsuis.Object.addProperties(jsuis.BorderLayout, {
		hgap: 0,
		vgap: 0,
		sort: false
	});
	var comparator;
	jsuis.BorderLayout.getComparator = function() {
		if (!comparator) {
			comparator = function(a, b) {
				var aConstraints = a.getConstraints();
				if (!aConstraints) {
					aConstraints = jsuis.Constraints.CENTER.clone();
					a.setConstraints(aConstraints);
				}
				var bConstraints = b.getConstraints();
				if (!bConstraints) {
					bConstraints = jsuis.Constraints.CENTER.clone();
					b.setConstraints(bConstraints);
				}
				if (aConstraints.getBorder() === jsuis.Constants.CENTER) {
					if (bConstraints.getBorder() === jsuis.Constants.CENTER) {
						return 0;
					} else {
						return 1;
					}
				} else {
					if (bConstraints.getBorder() === jsuis.Constants.CENTER) {
						return -1;
					} else {
						return 0;
					}
				}
			};
		}
		return comparator;
	}
	jsuis.BorderLayout.prototype.preferredLayoutSize = function(parent) {
		var preferredLayoutWidth = 0;
		var preferredLayoutHeight = 0;
		var hgap = this.getHgap();
		var vgap = this.getVgap();
		var components = parent.getComponents().slice();
		var sort = this.isSort();
		if (sort) {
			components.sort(jsuis.BorderLayout.getComparator());
		}
		for (var i = components.length - 1; i >= 0; i--) {
			var component = components[i];
			var constraints = component.getConstraints();
			if (!constraints) {
				constraints = jsuis.Constraints.CENTER.clone();
				component.setConstraints(constraints);
			}
			if (!component.isVisible()) {
				continue;
			}
			var componentPreferredSize = component.getPreferredSize();
			var componentPreferredWidth = componentPreferredSize.getWidth();
			var componentPreferredHeight = componentPreferredSize.getHeight();
			componentPreferredWidth += hgap;
			componentPreferredHeight += vgap;
			switch (constraints.getBorder()) {
			case jsuis.Constants.NORTH:
			case jsuis.Constants.PAGE_START:
			case jsuis.Constants.TOP:
			case jsuis.Constants.SOUTH:
			case jsuis.Constants.PAGE_END:
			case jsuis.Constants.BOTTOM:
				preferredLayoutWidth = Math.max(preferredLayoutWidth, componentPreferredWidth);
				preferredLayoutHeight += componentPreferredHeight;
				break;
			case jsuis.Constants.WEST:
			case jsuis.Constants.LINE_START:
			case jsuis.Constants.LEFT:
			case jsuis.Constants.EAST:
			case jsuis.Constants.LINE_END:
			case jsuis.Constants.RIGHT:
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
		var sort = this.isSort();
		if (sort) {
			components.sort(jsuis.BorderLayout.getComparator());
		}
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			var constraints = component.getConstraints();
			if (!constraints) {
				constraints = jsuis.Constraints.CENTER.clone();
				component.setConstraints(constraints);
			}
			if (!component.isVisible() && constraints.getBorder() !== jsuis.Constants.CENTER) {
				continue;
			}
			var componentPreferredSize = component.getPreferredSize();
			var componentPreferredWidth = componentPreferredSize.getWidth();
			var componentPreferredHeight = componentPreferredSize.getHeight();
			var componentX = 0;
			var componentY = 0;
			var componentWidth = componentPreferredWidth + hgap;
			var componentHeight = componentPreferredHeight + vgap;
			switch (constraints.getBorder()) {
			case jsuis.Constants.NORTH:
			case jsuis.Constants.PAGE_START:
			case jsuis.Constants.TOP:
				componentX = x;
				componentY = y;
				componentWidth = width;
				component.setSize(new jsuis.Dimension(componentWidth - hgap, componentHeight));
				componentHeight = Math.max(componentHeight, component.getMinimumSize().getHeight() + vgap);
				y += componentHeight;
				height -= componentHeight;
				break;
			case jsuis.Constants.SOUTH:
			case jsuis.Constants.PAGE_END:
			case jsuis.Constants.BOTTOM:
				componentX = x;
				componentY = y + height - componentHeight;
				componentWidth = width;
				component.setSize(new jsuis.Dimension(componentWidth - hgap, componentHeight));
				componentHeight = Math.max(componentHeight, component.getMinimumSize().getHeight() + vgap);
				height -= componentHeight;
				break;
			case jsuis.Constants.WEST:
			case jsuis.Constants.LINE_START:
			case jsuis.Constants.LEFT:
				componentX = x;
				componentY = y;
				componentHeight = height;
				x += componentWidth;
				width -= componentWidth;
				break;
			case jsuis.Constants.EAST:
			case jsuis.Constants.LINE_END:
			case jsuis.Constants.RIGHT:
				componentX = x + width - componentWidth;
				componentY = y;
				componentHeight = height;
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
			var bounds = new jsuis.Rectangle(componentX, componentY, componentWidth, componentHeight);
			constraints.setBounds(bounds);
		}
		SUPER.prototype.layoutContainer.call(this, parent);
	}
}) (jsuis);
