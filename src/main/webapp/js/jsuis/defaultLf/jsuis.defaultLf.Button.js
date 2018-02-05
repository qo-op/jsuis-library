/**
 * jsuis.defaultLf.Button
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.defaultLf.Button = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, null);
		this.setLayout(new jsuis.GridBagLayout());
		if ((text !== null) && (text !== undefined)) {
			this.setText(text);
		}
		if ((icon !== null) && (icon !== undefined)) {
			this.setIcon(icon);
		}
		this.setIconTextGap(4);
		this.setPadding(new jsuis.Insets(2, 4));
		this.setBorder(new jsuis.LineBorder(jsuis.Color.Black.withAlpha(.4 * 255)));
		this.setBackground(jsuis.Color.Black.withAlpha(.1 * 255));
		this.setRolloverColor(jsuis.Color.Black.withAlpha(.2 * 255));
		this.setPressedColor(jsuis.Color.Black.withAlpha(.3 * 255));
		this.setForeground(jsuis.Color.Black);
		// this.setDisabledColor(jsuis.Color.Gray);
		var mouseListener = new jsuis.MouseListener({
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
	jsuis.Object.addProperties(jsuis.defaultLf.Button,
			new jsuis.Property("label"),
			new jsuis.Property("icon"),
			new jsuis.Property("iconTextGap"),
			new jsuis.Property("color"),
			new jsuis.Property("pressedColor"),
			new jsuis.Property("rolloverColor")
	);
	jsuis.defaultLf.Button.prototype.setText = function(text, textConstraints) {
		var label = this.getLabel();
		if (!label) {
			label = new jsuis.Label();
			this.setLabel(label);
			this.add(label, nvl(textConstraints, new jsuis.GridBagConstraints().setGridx(1).setGridy(0)));
		}
		label.setText(text);
		var layout = this.getLayout();
		var icon = this.getIcon();
		if (icon && text) {
			var iconTextGap = this.getIconTextGap();
			layout.setHgap(iconTextGap).setVgap(iconTextGap);
		} else {
			layout.setHgap(0).setVgap(0);
		}
		return this;
	}
	jsuis.defaultLf.Button.prototype.getText = function() {
		var label = this.getLabel();
		if (label) {
			return label.getText();
		}
		return "";
	}
	jsuis.defaultLf.Button.prototype.setIcon = function(icon, iconConstraints) {
		var oldIcon = this.getIcon();
		if (oldIcon) {
			this.remove(oldIcon);
		}
		if (icon) {
			icon.setEnabled(false);
			this.add(icon, nvl(iconConstraints, new jsuis.GridBagConstraints().setGridx(0).setGridy(0)));
		}
		var layout = this.getLayout();
		var text = this.getText();
		if (icon && text) {
			var iconTextGap = this.getIconTextGap();
			layout.setHgap(iconTextGap).setVgap(iconTextGap);
		} else {
			layout.setHgap(0).setVgap(0);
		}
		this.icon = icon;
		return this;
	}
	jsuis.defaultLf.Button.prototype.setIconTextGap = function(iconTextGap) {
		var layout = this.getLayout();
		var icon = this.getIcon();
		var text = this.getText();
		if (icon && text) {
			layout.setHgap(iconTextGap).setVgap(iconTextGap);
		} else {
			layout.setHgap(0).setVgap(0);
		}
		this.iconTextGap = iconTextGap;
		return this;
	}
	jsuis.defaultLf.Button.prototype.setBackground = function(background) {
		this.setColor(background);
		this.setRolloverColor(background);
		this.setPressedColor(background);
		SUPER.prototype.setBackground.call(this, background);
		return this;
	}
	jsuis.defaultLf.Button.prototype.getForeground = function() {
		var label = this.getLabel();
		return label.getForeground();
	}
	jsuis.defaultLf.Button.prototype.setForeground = function(foreground) {
		var label = this.getLabel();
		label.setForeground(foreground);
		return this;
	}
	jsuis.defaultLf.Button.prototype.setEnabled = function(enabled) {
		var label = this.getLabel();
		label.setEnabled(enabled);
		SUPER.prototype.setEnabled.call(this, enabled);
		return this;
	}
	jsuis.defaultLf.Button.prototype.mousePressed = function() {
		var pressedColor = this.getPressedColor();
		SUPER.prototype.setBackground.call(this, pressedColor);
	}
	jsuis.defaultLf.Button.prototype.mouseReleased = function() {
		var color = this.getColor();
		SUPER.prototype.setBackground.call(this, color);
	}
	jsuis.defaultLf.Button.prototype.mouseEntered = function() {
		var enabled = this.isEnabled();
		var rolloverColor = this.getRolloverColor();
		SUPER.prototype.setBackground.call(this, rolloverColor);
	}
	jsuis.defaultLf.Button.prototype.mouseExited = function() {
		var color = this.getColor();
		SUPER.prototype.setBackground.call(this, color);
	}
}) (jsuis);
