/**
 * jsuis.ComponentListener
 */
(function(jsuis) {
	var SUPER = jsuis.Listener;
	jsuis.ComponentListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.ComponentListener.prototype.componentResized = function(event) {
		var listener = this.getListener();
		if (listener && listener.componentResized) {
			listener.componentResized.call(this, event);
		}
	}
	jsuis.ComponentListener.prototype.componentMoved = function(event) {
		var listener = this.getListener();
		if (listener && listener.componentMoved) {
			listener.componentMoved.call(this, event);
		}
	}
}) (jsuis);
