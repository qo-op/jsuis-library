/**
 * jsuis.defaultlf.MouseListener
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Listener;
	jsuis.defaultlf.MouseListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.defaultlf.MouseListener.prototype.mouseClicked = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseClicked) {
			listener.mouseClicked.call(this, event);
		}
	}
	jsuis.defaultlf.MouseListener.prototype.mousePressed = function(event) {
		var listener = this.getListener();
		if (listener && listener.mousePressed) {
			listener.mousePressed.call(this, event);
		}
	}
	jsuis.defaultlf.MouseListener.prototype.mouseReleased = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseReleased) {
			listener.mouseReleased.call(this, event);
		}
	}
	jsuis.defaultlf.MouseListener.prototype.mouseEntered = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseEntered) {
			listener.mouseEntered.call(this, event);
		}
	}
	jsuis.defaultlf.MouseListener.prototype.mouseExited = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseExited) {
			listener.mouseExited.call(this, event);
		}
	}
}) (jsuis);
