/**
 * jsuis.defaultlf.TabComponentBorder
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Border;
	jsuis.defaultlf.TabComponentBorder = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.defaultlf.TabComponentBorder.prototype.getBorderInsets = function(component) {
		return new jsuis.Insets(0, 3);
	}
	jsuis.defaultlf.TabComponentBorder.prototype.paintBorder = function(component) {
		var parent = component.getParent();
		if (!parent) {
			return;
		}
		var parentComponents = parent.getComponents();
		var index = parentComponents.indexOf(component);
		var graphics = component.getGraphics();
		graphics.setForeground(jsuis.Color.Gray);
		var selected = component.isSelected();
		if (selected) {
			graphics.setBackground(jsuis.Color.LightGray);
		} else {
			graphics.setBackground(jsuis.Color.LightSlateGray);
		}
		var width = graphics.getWidth();
		var height = graphics.getHeight();
		var x1 = 6.5;
		var y1 = height - .5;
		if (selected || !index) {
			x1 = .5;
		}
		var x2 = 3.5;
		var y2 = height / 2 + .5;
		var x3 = 6.5;
		var y3 = 1.5;
		var x4 = width - x3;
		var y4 = y3;
		var x5 = width -.5;
		var y5 = y1;
		graphics.setResource("Mx1,y1Lx2,y2Lx3,y3Lx4,y4Lx5,y5"
				.replace(/x1/g, x1).replace(/y1/g, y1)
				.replace(/x2/g, x2).replace(/y2/g, y2)
				.replace(/x3/g, x3).replace(/y3/g, y3)
				.replace(/x4/g, x4).replace(/y4/g, y4)
				.replace(/x5/g, x5).replace(/y5/g, y5));
	}
}) (jsuis);
