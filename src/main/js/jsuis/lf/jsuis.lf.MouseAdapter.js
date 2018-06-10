/**
 * jsuis.lf.MouseAdapter
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Listener;
	jsuis.lf.MouseAdapter = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.lf.MouseAdapter.prototype.mouseClicked = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseClicked) {
			listener.mouseClicked.call(this, event);
		}
	}
	jsuis.lf.MouseAdapter.prototype.mousePressed = function(event) {
		var listener = this.getListener();
		if (listener && listener.mousePressed) {
			listener.mousePressed.call(this, event);
		}
	}
	jsuis.lf.MouseAdapter.prototype.mouseReleased = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseReleased) {
			listener.mouseReleased.call(this, event);
		}
	}
	jsuis.lf.MouseAdapter.prototype.mouseEntered = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseEntered) {
			listener.mouseEntered.call(this, event);
		}
	}
	jsuis.lf.MouseAdapter.prototype.mouseExited = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseExited) {
			listener.mouseExited.call(this, event);
		}
	}
	jsuis.lf.MouseAdapter.prototype.mouseDragged = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseDragged) {
			listener.mouseDragged.call(this, event);
		}
	}
	jsuis.lf.MouseAdapter.prototype.mouseMoved = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseMoved) {
			listener.mouseMoved.call(this, event);
		}
	}
}) (jsuis);
