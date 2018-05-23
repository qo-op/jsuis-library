/**
 * jsuis.defaultlf.MouseAdapter
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Listener;
	jsuis.defaultlf.MouseAdapter = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.defaultlf.MouseAdapter.prototype.mouseClicked = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseClicked) {
			listener.mouseClicked.call(this, event);
		}
	}
	jsuis.defaultlf.MouseAdapter.prototype.mousePressed = function(event) {
		var listener = this.getListener();
		if (listener && listener.mousePressed) {
			listener.mousePressed.call(this, event);
		}
	}
	jsuis.defaultlf.MouseAdapter.prototype.mouseReleased = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseReleased) {
			listener.mouseReleased.call(this, event);
		}
	}
	jsuis.defaultlf.MouseAdapter.prototype.mouseEntered = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseEntered) {
			listener.mouseEntered.call(this, event);
		}
	}
	jsuis.defaultlf.MouseAdapter.prototype.mouseExited = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseExited) {
			listener.mouseExited.call(this, event);
		}
	}
	jsuis.defaultlf.MouseAdapter.prototype.mouseDragged = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseDragged) {
			listener.mouseDragged.call(this, event);
		}
	}
	jsuis.defaultlf.MouseAdapter.prototype.mouseMoved = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseMoved) {
			listener.mouseMoved.call(this, event);
		}
	}
}) (jsuis);
