/**
 * jsuis.defaultlf.ToolBarSeparator
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.ToolBarSeparator = jsuis.Object.extend(SUPER, function(size) {
		SUPER.prototype.constructor.call(this, null);
		var line = new jsuis.defaultlf.Line();
		this.setLine(line);
		this.add(line);
		this.setPreferredSize(nvl(size, new jsuis.Dimension(5, 5)));
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ToolBarSeparator, {
		line: null
	});
	jsuis.defaultlf.ToolBarSeparator.prototype.validate = function() {
		var toolBar = this.getParent();
		if (!toolBar) {
			return;
		}
		var width = this.getWidth();
		var height = this.getWidth();
		var line = this.getLine();
		var toolBarOrientation = toolBar.getOrientantion();
		if (toolBarOrientation === jsuis.Constants.VERTICAL) {
			var y = height / 2 - line.getThickness() / 2;
			line.setX1(0).setY1(y).setX2(width).setY2(y);
		} else {
			var x = width / 2 - line.getThickness() / 2;
			line.setX1(x).setY1(0).setX2(x).setY2(height);
		}
	}
}) (jsuis);
