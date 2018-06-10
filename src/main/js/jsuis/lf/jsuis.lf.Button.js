/**
 * jsuis.lf.Button
 */
(function(jsuis) {
	var SUPER = jsuis.lf.AbstractButton;
	jsuis.lf.Button = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, text, icon);
		this.setPadding(new jsuis.Insets(2, 4));
		this.setBorder(new jsuis.lf.LineBorder(jsuis.Color.Black.withAlpha(.4 * 255)));
		this.setBackground(jsuis.Color.Black.withAlpha(.1 * 255));
		this.setRolloverColor(jsuis.Color.Black.withAlpha(.2 * 255));
		this.setPressedColor(jsuis.Color.Black.withAlpha(.3 * 255));
	});
	jsuis.Object.addProperties(jsuis.lf.Button, {
		releasedColor: null,
		rolloverColor: null,
		pressedColor: null
	});
	jsuis.lf.Button.prototype.setBackground = function(background) {
		this.setReleasedColor(background);
		SUPER.prototype.setBackground.call(this, background);
		return this;
	}
	jsuis.lf.Button.prototype.setEnabled = function(enabled) {
		var label = this.getLabel();
		if (label) {
			label.setEnabled(enabled);
		}
		SUPER.prototype.setEnabled.call(this, enabled);
		return this;
	}
	jsuis.lf.Button.prototype.paintReleased = function() {
		var releasedColor = this.getReleasedColor();
		SUPER.prototype.setBackground.call(this, releasedColor);
	}
	jsuis.lf.Button.prototype.paintPressed = function() {
		var pressedColor = this.getPressedColor();
		SUPER.prototype.setBackground.call(this, pressedColor);
	}
	jsuis.lf.Button.prototype.paintRollover = function() {
		var rolloverColor = this.getRolloverColor();
		SUPER.prototype.setBackground.call(this, rolloverColor);
	}
	jsuis.lf.Button.prototype.mouseClicked = function() {
	}
	jsuis.lf.Button.prototype.mousePressed = function() {
		this.paintPressed();
	}
	jsuis.lf.Button.prototype.mouseReleased = function() {
		var rollover = this.isRollover();
		if (rollover) {
			this.paintRollover();
		} else {
			this.paintReleased();
		}
	}
	jsuis.lf.Button.prototype.mouseEntered = function() {
		this.paintRollover();
	}
	jsuis.lf.Button.prototype.mouseExited = function() {
		this.paintReleased();
	}
}) (jsuis);
