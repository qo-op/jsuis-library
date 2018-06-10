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
		this.layoutContainer(parent);
		var preferredLayoutX = 0;
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
			var componentX = component.getX();
			var componentY = component.getY();
			var componentWidth = component.getWidth();
			var componentHeight = component.getHeight();
			preferredLayoutX = Math.min(preferredLayoutX, componentX);
			preferredLayoutWidth = Math.max(preferredLayoutWidth, componentX + componentWidth);
			preferredLayoutHeight = Math.max(preferredLayoutHeight, componentY + componentHeight);
		}
		preferredLayoutWidth = preferredLayoutWidth - preferredLayoutX + 2 * hgap;
		preferredLayoutHeight = preferredLayoutHeight - vgap + 2 * vgap;
		var parentInsets = parent.getInsets();
		preferredLayoutWidth += parentInsets.getLeft() + parentInsets.getRight();
		preferredLayoutHeight += parentInsets.getTop() + parentInsets.getBottom();
		return new jsuis.Dimension(preferredLayoutWidth, preferredLayoutHeight);
	}
	jsuis.FlowLayout.prototype.minimumLayoutSize = function(parent) {
		return this.preferredLayoutSize(parent);
	}
	jsuis.FlowLayout.prototype.layoutContainer = function(parent) {
		var m = 1;
		for (var l = 0; l < m; l++) {
			var minX = 0;
			var minY = 0;
			var maxWidth = parent.getWidth();
			var maxHeight = parent.getHeight();
			var hgap = this.getHgap();
			var vgap = this.getVgap();
			var parentInsets = parent.getInsets();
			maxWidth -= parentInsets.getLeft() + parentInsets.getRight() + 2 * hgap;
			maxHeight -= parentInsets.getTop() + parentInsets.getBottom() + 2 * vgap;
			var offsets = parent.getOffsets();
			minX += parentInsets.getLeft() - offsets.getLeft() + hgap;
			minY += parentInsets.getTop() - offsets.getTop() + vgap;
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
				var layout = component.getLayout();
				if (layout instanceof jsuis.FlowLayout) {
					m = 2;
				}
				var componentPreferredSize = component.getPreferredSize();
				var outsets = component.getOutsets();
				var componentX = x;
				var componentY = y;
				var componentWidth = componentPreferredSize.getWidth() + hgap + outsets.getLeft() + outsets.getRight();
				var componentHeight = componentPreferredSize.getHeight() + vgap + outsets.getTop() + outsets.getBottom();
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
							bounds = new jsuis.Rectangle(
									rowComponentX + outsets.getLeft(),
									rowComponentY + outsets.getTop(),
									rowComponentWidth - outsets.getLeft() - outsets.getRight(),
									rowComponentHeight - outsets.getTop() - outsets.getBottom());
						} else {
							bounds = new jsuis.Rectangle(parent.getWidth() - rowComponentX - rowComponentWidth + outsets.getLeft(),
									rowComponentY + outsets.getTop(),
									rowComponentWidth - outsets.getLeft() - outsets.getRight(),
									rowComponentHeight - outsets.getTop() - outsets.getBottom());
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
	}
}) (jsuis);
