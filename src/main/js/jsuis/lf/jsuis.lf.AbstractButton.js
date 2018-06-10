/**
 * jsuis.lf.AbstractButton
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Label;
	jsuis.lf.AbstractButton = jsuis.Object.extend(SUPER, function(text, icon) {
		SUPER.prototype.constructor.call(this, text, icon);
		this.setBackground(jsuis.Color.Black.withAlpha(0));
		
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
				button.setRollover(true);
				button.mouseEntered();
			},
			mouseExited: function(event) {
				var button = this.getListenerComponent();
				button.setRollover(false);
				button.mouseExited();
			}
		});
		mouseListener.setListenerComponent(this);
		this.addMouseListener(mouseListener);
	});
	jsuis.Object.addProperties(jsuis.lf.AbstractButton, {
		rollover: false,
		selected: false
	});
	jsuis.lf.AbstractButton.prototype.mouseClicked = function() {
	}
	jsuis.lf.AbstractButton.prototype.mousePressed = function() {
	}
	jsuis.lf.AbstractButton.prototype.mouseReleased = function() {
	}
	jsuis.lf.AbstractButton.prototype.mouseEntered = function() {
	}
	jsuis.lf.AbstractButton.prototype.mouseExited = function() {
	}
}) (jsuis);
