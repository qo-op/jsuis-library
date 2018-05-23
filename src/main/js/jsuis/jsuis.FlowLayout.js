/**
 * jsuis.FlowLayout
 */
(function(jsuis) {
	var SUPER = jsuis.Layout;
	jsuis.FlowLayout = jsuis.Object.extend(SUPER, function(align, hgap, vgap) {
		SUPER.prototype.constructor.call(this);
		this.setAlign(nvl(align, jsuis.Constants.CENTER));
		hgap = nvl(hgap, 4);
		vgap = nvl(vgap, hgap);
		this.setHgap(hgap);
		this.setVgap(vgap);
	});
	jsuis.Object.addProperties(jsuis.FlowLayout, {
		align: null,
		hgap: 0,
		vgap: 0
	});
	jsuis.FlowLayout.prototype.preferredLayoutSize = function(parent) {
		var preferredLayoutWidth = 0;
		var preferredLayoutHeight = 0;
		var hgap = this.getHgap();
		var vgap = this.getVgap();
		var components = parent.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			if (!component.isVisible()) {
				continue;
			}
			var componentPreferredSize = component.getPreferredSize();
			var componentPreferredWidth = componentPreferredSize.getWidth();
			var componentPreferredHeight = componentPreferredSize.getHeight();
			componentPreferredWidth += hgap;
			componentPreferredHeight += vgap;
			preferredLayoutWidth += componentPreferredWidth;
			preferredLayoutHeight = Math.max(preferredLayoutHeight, componentPreferredHeight);
		}
		if (components.length) {
			preferredLayoutWidth -= hgap;
			preferredLayoutHeight -= vgap;
		}
		var parentInsetsOutsets = parent.getInsets().add(parent.getOutsets());
		preferredLayoutWidth += parentInsetsOutsets.left + parentInsetsOutsets.right;
		preferredLayoutHeight += parentInsetsOutsets.top + parentInsetsOutsets.bottom;
		return new jsuis.Dimension(preferredLayoutWidth + 2 * hgap, preferredLayoutHeight + 2 * vgap);
	}
	jsuis.FlowLayout.prototype.minimumLayoutSize = function(parent) {
		this.layoutContainer(parent);
		var minimumLayoutX = 0;
		var minimumLayoutWidth = 0;
		var minimumLayoutHeight = 0;
		var hgap = this.getHgap();
		var vgap = this.getVgap();
		var components = parent.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			if (!component.isVisible()) {
				continue;
			}
			var componentX = component.getX();
			var componentY = component.getY();
			var componentWidth = component.getWidth();
			var componentHeight = component.getHeight();
			minimumLayoutX = Math.min(minimumLayoutX, componentX);
			minimumLayoutWidth = Math.max(minimumLayoutWidth, componentX + componentWidth);
			minimumLayoutHeight = Math.max(minimumLayoutHeight, componentY + componentHeight);
		}
		return new jsuis.Dimension(minimumLayoutWidth - minimumLayoutX + 2 * hgap, minimumLayoutHeight - vgap + 2 * vgap);
	}
	jsuis.FlowLayout.prototype.layoutContainer = function(parent) {
		var minX = 0;
		var minY = 0;
		var maxWidth = parent.getWidth();
		var maxHeight = parent.getHeight();
		var hgap = this.getHgap();
		var vgap = this.getVgap();
		var parentInsetsOutsets = parent.getInsets().add(parent.getOutsets());
		minX += parentInsetsOutsets.getLeft() + hgap;
		minY += parentInsetsOutsets.getTop() + vgap;
		maxWidth -= parentInsetsOutsets.getLeft() + parentInsetsOutsets.getRight() + 2 * hgap;
		maxHeight -= parentInsetsOutsets.getTop() + parentInsetsOutsets.getBottom() + 2 * vgap;
		minX += hgap / 2;
		minY += vgap / 2;
		maxWidth += hgap;
		maxHeight += vgap;
		var x = minX;
		var y = minY;
		var width = 0;
		var height = 0;
		var rowComponents = [];
		var components = parent.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			var constraints = component.getConstraints();
			if (!constraints) {
				constraints = new jsuis.Constraints();
				component.setConstraints(constraints);
			}
			if (!component.isVisible()) {
				continue;
			}
			var componentPreferredSize = component.getPreferredSize();
			var componentPreferredWidth = componentPreferredSize.getWidth();
			var componentPreferredHeight = componentPreferredSize.getHeight();
			var componentX = x;
			var componentY = y;
			var componentWidth = componentPreferredWidth + hgap;
			var componentHeight = componentPreferredHeight + vgap;
			if ((componentX + componentWidth < maxWidth) || (rowComponents.length == 0)) {
				x += componentWidth;
				width += componentWidth;
				height = Math.max(height, componentHeight);
				component.setBounds(new jsuis.Rectangle(componentX - hgap / 2, componentY - vgap / 2,
						componentWidth - hgap, componentHeight - vgap));
				rowComponents.push(component);
			}
			if ((componentX + componentWidth >= maxWidth) || (i === components.length - 1)) {
				var dx = 0;
				var align = this.getAlign();
				switch (align) {
				case jsuis.Constants.LEFT:
				case jsuis.Constants.LEADING:
					break;
				case jsuis.Constants.RIGHT:
				case jsuis.Constants.TRAILING:
					dx = maxWidth - width;
					break;
				case jsuis.Constants.CENTER:
				default:
					dx = Math.round((maxWidth - width) / 2);
				}
				for (var j = 0; j < rowComponents.length; j++) {
					var rowComponent = rowComponents[j];
					var rowComponentX = rowComponent.getX();
					var rowComponentY = rowComponent.getY();
					var rowComponentWidth = rowComponent.getWidth();
					var rowComponentHeight = rowComponent.getHeight();
					rowComponentX += dx;
					rowComponentHeight = height - vgap;
					var bounds;
					var leftToRight = parent.isLeftToRight();
					if (leftToRight) {
						bounds = new jsuis.Rectangle(rowComponentX, rowComponentY, rowComponentWidth, rowComponentHeight);
					} else {
						bounds = new jsuis.Rectangle(parent.getWidth() - rowComponentX - rowComponentWidth, rowComponentY, rowComponentWidth, rowComponentHeight);
					}
					var constraints = rowComponent.getConstraints();
					constraints.setBounds(bounds);
				}
				rowComponents.length = 0;
				x = minX;
				y += height;
				width = 0;
				height = 0;
				if ((componentX + componentWidth >= maxWidth) && (x + componentWidth < maxWidth)) {
					i--;
				}
			}
		}
		SUPER.prototype.layoutContainer.call(this, parent);
	}
}) (jsuis);
