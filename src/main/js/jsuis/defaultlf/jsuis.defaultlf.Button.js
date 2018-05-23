/**
 * jsuis.defaultlf.Button
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Label;
	jsuis.defaultlf.Button = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, text, icon);
		this.setPadding(new jsuis.Insets(2, 4));
		this.setBorder(new jsuis.defaultlf.LineBorder(jsuis.Color.Black.withAlpha(.4 * 255)));
		this.setBackground(jsuis.Color.Black.withAlpha(.1 * 255));
		this.setRolloverColor(jsuis.Color.Black.withAlpha(.2 * 255));
		this.setPressedColor(jsuis.Color.Black.withAlpha(.3 * 255));
		
		var mouseListener = new jsuis.MouseListener({
			mouseClicked: function(event) {
				var button = this.getListenerComponent();
				button.mouseClicked();
			},
			mousePressed: function(event) {
				var button = this.getListenerComponent();
				button.mousePressed();
			},
			mouseReleased: function(event) {
				var button = this.getListenerComponent();
				button.mouseReleased();
			},
			mouseEntered: function(event) {
				var button = this.getListenerComponent();
				button.mouseEntered();
			},
			mouseExited: function(event) {
				var button = this.getListenerComponent();
				button.mouseExited();
			}
		});
		mouseListener.setListenerComponent(this);
		this.addMouseListener(mouseListener);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Button, {
		selected: false,
		rollover: false,
		releasedColor: null,
		rolloverColor: null,
		pressedColor: null,
		group: null
	});
	jsuis.defaultlf.Button.prototype.setBackground = function(background) {
		this.setReleasedColor(background);
		SUPER.prototype.setBackground.call(this, background);
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
	jsuis.defaultlf.Button.prototype.paint = function() {
		var releasedColor = this.getReleasedColor();
		SUPER.prototype.setBackground.call(this, releasedColor);
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
