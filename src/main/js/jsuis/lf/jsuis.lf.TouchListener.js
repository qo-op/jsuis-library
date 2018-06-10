/**
 * jsuis.lf.TouchListener
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Listener;
	jsuis.lf.TouchListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.lf.TouchListener.prototype.touchPressed = function(event) {
		var listener = this.getListener();
		if (listener && listener.touchPressed) {
			listener.touchPressed.call(this, event);
		}
	}
	jsuis.lf.TouchListener.prototype.touchReleased = function(event) {
		var listener = this.getListener();
		if (listener && listener.touchReleased) {
			listener.touchReleased.call(this, event);
		}
	}
	jsuis.lf.TouchListener.prototype.touchMoved = function(event) {
		var listener = this.getListener();
		if (listener && listener.touchMoved) {
			listener.touchMoved.call(this, event);
		}
	}
	jsuis.lf.TouchListener.prototype.touchDragged = function(event) {
		var listener = this.getListener();
		if (listener && listener.touchDragged) {
			listener.touchDragged.call(this, event);
		}
	}
}) (jsuis);
