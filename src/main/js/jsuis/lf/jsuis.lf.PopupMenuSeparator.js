/**
 * jsuis.lf.PopupMenuSeparator
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Svg;
	jsuis.lf.PopupMenuSeparator = jsuis.Object.extend(SUPER, function(size) {
		SUPER.prototype.constructor.call(this, null);
		var line = new jsuis.lf.Line();
		this.setLine(line);
		this.add(line);
		this.setPreferredSize(nvl(size, new jsuis.Dimension(5, 5)));
	});
	jsuis.Object.addProperties(jsuis.lf.PopupMenuSeparator, {
		line: null
	});
	jsuis.lf.PopupMenuSeparator.prototype.doLayout = function() {
		var popupMenu = this.getParent();
		if (!popupMenu) {
			return;
		}
		var width = this.getWidth();
		var height = this.getHeight();
		var line = this.getLine();
		var y = height / 2;
		line.setX1(0).setY1(y).setX2(width).setY2(y);
	}
}) (jsuis);
