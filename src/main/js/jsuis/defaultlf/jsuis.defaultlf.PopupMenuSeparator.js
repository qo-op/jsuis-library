/**
 * jsuis.defaultlf.PopupMenuSeparator
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.PopupMenuSeparator = jsuis.Object.extend(SUPER, function(size) {
		SUPER.prototype.constructor.call(this, null);
		var line = new jsuis.defaultlf.Line();
		this.setLine(line);
		this.add(line);
		this.setPreferredSize(nvl(size, new jsuis.Dimension(5, 5)));
	});
	jsuis.Object.addProperties(jsuis.defaultlf.PopupMenuSeparator,
			new jsuis.Property("line")
	);
	jsuis.defaultlf.PopupMenuSeparator.prototype.doLayout = function() {
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
