/**
 * jsuis.lf.ComponentListener
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Listener;
	jsuis.lf.ComponentListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
		if (!listener.setListenerComponent) {
			listener.setListenerComponent = SUPER.prototype.setListenerComponent;
		}
		if (!listener.getListenerComponent) {
			listener.getListenerComponent = SUPER.prototype.getListenerComponent;
		}
	});
	jsuis.lf.ComponentListener.prototype.componentResized = function(event) {
		var listener = this.getListener();
		if (listener && listener.componentResized) {
			var listenerComponent = this.getListenerComponent();
			listener.setListenerComponent(listenerComponent);
			listener.componentResized.call(listener, event);
		}
	}
	jsuis.lf.ComponentListener.prototype.componentMoved = function(event) {
		var listener = this.getListener();
		if (listener && listener.componentMoved) {
			var listenerComponent = this.getListenerComponent();
			listener.setListenerComponent(listenerComponent);
			listener.componentMoved.call(listener, event);
		}
	}
}) (jsuis);
