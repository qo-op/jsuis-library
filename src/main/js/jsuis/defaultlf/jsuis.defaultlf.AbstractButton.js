/**
 * jsuis.defaultlf.AbstractButton
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Label;
	jsuis.defaultlf.AbstractButton = jsuis.Object.extend(SUPER, function(text, icon) {
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
	jsuis.Object.addProperties(jsuis.defaultlf.AbstractButton, {
		rollover: false,
		selected: false
	});
	jsuis.defaultlf.AbstractButton.prototype.mouseClicked = function() {
	}
	jsuis.defaultlf.AbstractButton.prototype.mousePressed = function() {
	}
	jsuis.defaultlf.AbstractButton.prototype.mouseReleased = function() {
	}
	jsuis.defaultlf.AbstractButton.prototype.mouseEntered = function() {
	}
	jsuis.defaultlf.AbstractButton.prototype.mouseExited = function() {
	}
}) (jsuis);
