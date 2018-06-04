/**
 * jsuis.defaultlf.ComponentListener
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Listener;
	jsuis.defaultlf.ComponentListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.defaultlf.ComponentListener.prototype.componentResized = function(event) {
		var listener = this.getListener();
		if (listener && listener.componentResized) {
			listener.componentResized.call(this, event);
		}
	}
	jsuis.defaultlf.ComponentListener.prototype.componentMoved = function(event) {
		var listener = this.getListener();
		if (listener && listener.componentMoved) {
			listener.componentMoved.call(this, event);
		}
	}
}) (jsuis);
