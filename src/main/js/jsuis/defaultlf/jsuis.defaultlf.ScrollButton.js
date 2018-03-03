/**
 * jsuis.defaultlf.ScrollButton
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.LayeredPane;
	jsuis.defaultlf.ScrollButton = jsuis.Object.extend(SUPER, function(direction) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		this.setDirection(direction);
		this.setBorder(new jsuis.defaultlf.ScrollButtonBorder(direction));
		var arrow = new jsuis.defaultlf.Panel();
		arrow.setBorder(new jsuis.defaultlf.ScrollButtonArrowBorder(direction));
		arrow.setBackground(jsuis.Color.Black);
		this.add(arrow);
		this.setPreferredSize(new jsuis.Dimension(16, 16));
		var color = jsuis.Color.Black.withAlpha(.1 * 255);
		this.setBackground(color);
		this.setReleasedColor(color);
		this.setRolloverColor(jsuis.Color.Black.withAlpha(.2 * 255));
		this.setPressedColor(jsuis.Color.Black.withAlpha(.3 * 255));
		var mouseListener = new jsuis.MouseListener({
			mousePressed: function(event) {
				var source = event.getSource();
				var pressedColor = source.getPressedColor();
				source.setBackground(pressedColor);
			},
			mouseReleased: function(event) {
				var source = event.getSource();
				var releasedColor = source.getReleasedColor();
				source.setBackground(releasedColor);
			},
			mouseEntered: function(event) {
				var source = event.getSource();
				var rolloverColor = source.getRolloverColor();
				source.setBackground(rolloverColor);
			},
			mouseExited: function(event) {
				var source = event.getSource();
				var releasedColor = source.getReleasedColor();
				source.setBackground(releasedColor);
			}
		});
		this.addMouseListener(mouseListener);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ScrollButton, {
		direction: null,
		releasedColor: null,
		rolloverColor: null,
		pressedColor: null
	});
}) (jsuis);
