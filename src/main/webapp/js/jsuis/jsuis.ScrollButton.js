/**
 * jsuis.ScrollButton
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.ScrollButton = jsuis.Object.extend(SUPER, function(direction) {
		SUPER.prototype.constructor.call(this, new jsuis.GridBagLayout());
		this.setDirection(nvl(direction, jsuis.Constants.NORTH));
		var shape;
		var icon;
		switch (direction) {
		case jsuis.Constants.SOUTH:
			shape = new jsuis.Path("M 0 -8 a 8 8 0 0 0 16 0 v 16 a 8 8 0 0 1 -16 0 z");
			icon = new jsuis.Path("M 4 6 l -4 -6 h 8 z");
			break;
		case jsuis.Constants.EAST:
			shape = new jsuis.Path("M -8 0 a 8 8 0 0 1 0 16 h 16 a 8 8 0 0 0 0 -16 z");
			icon = new jsuis.Path("M 6 4 l -6 -4 v 8 z");
			break;
		case jsuis.Constants.WEST:
			shape = new jsuis.Path("M 24 0 a 8 8 0 0 0 0 16 h -16 a 8 8 0 0 1 0 -16 z");
			icon = new jsuis.Path("M 0 4 l 6 -4 v 8 z");
			break;
		case jsuis.Constants.NORTH:
		default:
			shape = new jsuis.Path("M 0 24 a 8 8 0 0 1 16 0 v -16 a 8 8 0 0 0 -16 0 z");
			icon = new jsuis.Path("M 4 0 l -4 6 h 8 z");
		}
		this.setShape(shape);
		icon.setEnabled(false);
		this.add(icon);
		this.setPreferredSize(new jsuis.Dimension(16, 16));
		var color = jsuis.Color.Black.withAlpha(.1 * 255);
		this.setColor(color);
		this.setRolloverColor(jsuis.Color.Black.withAlpha(.2 * 255));
		this.setPressedColor(jsuis.Color.Black.withAlpha(.3 * 255));
		this.setBackground(color);
		var mouseListener = new jsuis.MouseListener({
			mousePressed: function(event) {
				var source = event.getSource();
				var pressedColor = source.getPressedColor();
				source.setBackground(pressedColor);
			},
			mouseReleased: function(event) {
				var source = event.getSource();
				var color = source.getColor();
				source.setBackground(color);
			},
			mouseEntered: function(event) {
				var source = event.getSource();
				var rolloverColor = source.getRolloverColor();
				source.setBackground(rolloverColor);
			},
			mouseExited: function(event) {
				var source = event.getSource();
				var color = source.getColor();
				source.setBackground(color);
			}
		});
		this.addMouseListener(mouseListener);
	});
	jsuis.Object.addProperties(jsuis.ScrollButton,
			new jsuis.Property("direction"),
			new jsuis.Property("color"),
			new jsuis.Property("pressedColor"),
			new jsuis.Property("rolloverColor")
	);
}) (jsuis);
