/**
 * jsuis.lf.PopupMenu
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Panel;
	jsuis.lf.PopupMenu = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		this.setBorder(new jsuis.lf.LineBorder(jsuis.Color.Black.withAlpha(.4 * 255)));
		this.setBackground(jsuis.Color.Black.withAlpha(.1 * 255));
	});
	jsuis.lf.PopupMenu.prototype.add = function(component, constraints, index) {
		SUPER.prototype.add.call(this, component, nvl(constraints, jsuis.Constraints.NORTH), index);
	}
	jsuis.lf.PopupMenu.prototype.show = function(invoker, x, y) {
		var invokerX = 0;
		var invokerY = 0;
		var component = invoker;
		while (component && !(component instanceof jsuis.lf.Frame)) {
			invokerX += component.getX();
			invokerY += component.getY();
			component = component.getParent();
		}
		if (!component) {
			return;
		}
		var layeredPane = this.getParent();
		if (!layeredPane) {
			layeredPane = component.getLayeredPane();
			layeredPane.add(this, jsuis.Constraints.POPUP_LAYER);
		}
		this.setLocation(new jsuis.Point(invokerX + x, invokerY + y));
		this.setVisible(true);
	}
	jsuis.lf.PopupMenu.prototype.setVisible = function(visible) {
		SUPER.prototype.setVisible.call(this, visible);
		if (visible) {
			this.setSize(this.getPreferredSize());
			this.validate();
		}
		return this;
	}
}) (jsuis);
