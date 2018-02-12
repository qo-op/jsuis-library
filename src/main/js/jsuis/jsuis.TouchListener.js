/**
 * jsuis.TouchListener
 */
(function(jsuis) {
	var SUPER = jsuis.Listener;
	jsuis.TouchListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.TouchListener.prototype.touchPressed = function(event) {
		var listener = this.getListener();
		if (listener && listener.touchPressed) {
			listener.touchPressed.call(this, event);
		}
	}
	jsuis.TouchListener.prototype.touchReleased = function(event) {
		var listener = this.getListener();
		if (listener && listener.touchReleased) {
			listener.touchReleased.call(this, event);
		}
	}
	jsuis.TouchListener.prototype.touchMoved = function(event) {
		var listener = this.getListener();
		if (listener && listener.touchMoved) {
			listener.touchMoved.call(this, event);
		}
	}
	jsuis.TouchListener.prototype.touchDragged = function(event) {
		var listener = this.getListener();
		if (listener && listener.touchDragged) {
			listener.touchDragged.call(this, event);
		}
	}
}) (jsuis);
