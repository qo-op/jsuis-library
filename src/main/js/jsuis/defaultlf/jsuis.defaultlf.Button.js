/**
 * jsuis.defaultlf.Button
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.Button = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		if ((text !== null) && (text !== undefined)) {
			this.setText(text);
		}
		if ((icon !== null) && (icon !== undefined)) {
			this.setIcon(icon);
		}
		this.setIconTextGap(4);
		this.setPadding(new jsuis.Insets(2, 4));
		this.setBorder(new jsuis.defaultlf.LineBorder(jsuis.Color.Black.withAlpha(.4 * 255)));
		this.setBackground(jsuis.Color.Black.withAlpha(.1 * 255));
		this.setRolloverColor(jsuis.Color.Black.withAlpha(.2 * 255));
		this.setPressedColor(jsuis.Color.Black.withAlpha(.3 * 255));
		this.setForeground(jsuis.Color.Black);
		var mouseListener = new jsuis.MouseListener({
			mouseClicked: function(event) {
				var button = event.getSource();
				button.mouseClicked();
			},
			mousePressed: function(event) {
				var button = event.getSource();
				button.mousePressed();
			},
			mouseReleased: function(event) {
				var button = event.getSource();
				button.mouseReleased();
			},
			mouseEntered: function(event) {
				var button = event.getSource();
				button.mouseEntered();
			},
			mouseExited: function(event) {
				var button = event.getSource();
				button.mouseExited();
			}
		});
		this.addMouseListener(mouseListener);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Button,
			new jsuis.Property("label"),
			new jsuis.Property("icon"),
			new jsuis.Property("iconComponent"),
			new jsuis.Property("iconTextGap"),
			new jsuis.Property("color"),
			new jsuis.Property("pressedColor"),
			new jsuis.Property("rolloverColor"),
			new jsuis.Property("group")
	);
	jsuis.defaultlf.Button.prototype.setText = function(text, textConstraints) {
		var label = this.getLabel();
		if (!label) {
			label = new jsuis.defaultlf.Label();
			this.setLabel(label);
			this.add(label, nvl(textConstraints,
					jsuis.BorderConstraints.CENTER.withFill(jsuis.Constants.NONE)));
		} else if (textConstraints) {
			label.setConstraints(textConstraints);
		}
		label.setText(text);
		return this;
	}
	jsuis.defaultlf.Button.prototype.getText = function() {
		var label = this.getLabel();
		if (label) {
			return label.getText();
		}
		return "";
	}
	jsuis.defaultlf.Button.prototype.setIcon = function(icon, iconConstraints) {
		var oldIconComponent = this.getIconComponent();
		if (oldIconComponent) {
			this.remove(oldIconComponent);
		}
		if (icon) {
			var iconComponent = icon.createComponent();
			this.setIconComponent(iconComponent);
			this.add(iconComponent, nvl(iconConstraints, jsuis.BorderConstraints.WEST));
			iconComponent.setEnabled(false);
		}
		this.icon = icon;
		return this;
	}
	jsuis.defaultlf.Button.prototype.setIconTextGap = function(iconTextGap) {
		var layout = this.getLayout();
		layout.setHgap(iconTextGap).setVgap(iconTextGap);
		this.iconTextGap = iconTextGap;
		return this;
	}
	jsuis.defaultlf.Button.prototype.setBackground = function(background) {
		this.setColor(background);
		SUPER.prototype.setBackground.call(this, background);
		return this;
	}
	jsuis.defaultlf.Button.prototype.setForeground = function(foreground) {
		var label = this.getLabel();
		if (label) {
			label.setForeground(foreground);
		}
		this.foreground = foreground;
		return this;
	}
	jsuis.defaultlf.Button.prototype.setEnabled = function(enabled) {
		var label = this.getLabel();
		if (label) {
			label.setEnabled(enabled);
		}
		SUPER.prototype.setEnabled.call(this, enabled);
		return this;
	}
	jsuis.defaultlf.Button.prototype.isSelected = function() {
		return this.selected;
	}
	jsuis.defaultlf.Button.prototype.setSelected = function(selected) {
		this.selected = selected;
		return this;
	}
	jsuis.defaultlf.Button.prototype.isRollover = function() {
		return this.rollover;
	}
	jsuis.defaultlf.Button.prototype.setRollover = function(rollover) {
		this.rollover = rollover;
		return this;
	}
	jsuis.defaultlf.Button.prototype.paint = function() {
		var color = this.getColor();
		SUPER.prototype.setBackground.call(this, color);
	}
	jsuis.defaultlf.Button.prototype.paintPressed = function() {
		var pressedColor = this.getPressedColor();
		SUPER.prototype.setBackground.call(this, pressedColor);
	}
	jsuis.defaultlf.Button.prototype.paintRollover = function() {
		var rolloverColor = this.getRolloverColor();
		SUPER.prototype.setBackground.call(this, rolloverColor);
	}
	jsuis.defaultlf.Button.prototype.mouseClicked = function() {
	}
	jsuis.defaultlf.Button.prototype.mousePressed = function() {
		this.paintPressed();
	}
	jsuis.defaultlf.Button.prototype.mouseReleased = function() {
		var rollover = this.isRollover();
		if (rollover) {
			this.paintRollover();
		} else {
			this.paint();
		}
	}
	jsuis.defaultlf.Button.prototype.mouseEntered = function() {
		this.paintRollover();
		this.setRollover(true);
	}
	jsuis.defaultlf.Button.prototype.mouseExited = function() {
		this.paint();
		this.setRollover(false);
	}
}) (jsuis);
