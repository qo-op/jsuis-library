/**
 * jsuis.lf.ComponentListener
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Listener;
	jsuis.lf.ComponentListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.lf.ComponentListener.prototype.componentResized = function(event) {
		var listener = this.getListener();
		if (listener && listener.componentResized) {
			listener.componentResized.call(this, event);
		}
	}
	jsuis.lf.ComponentListener.prototype.componentMoved = function(event) {
		var listener = this.getListener();
		if (listener && listener.componentMoved) {
			listener.componentMoved.call(this, event);
		}
	}
}) (jsuis);
