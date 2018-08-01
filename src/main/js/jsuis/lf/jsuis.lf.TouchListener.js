/**
 * jsuis.lf.TouchListener
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Listener;
	jsuis.lf.TouchListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
		if (!listener.setListenerComponent) {
			listener.setListenerComponent = SUPER.prototype.setListenerComponent;
		}
		if (!listener.getListenerComponent) {
			listener.getListenerComponent = SUPER.prototype.getListenerComponent;
		}
	});
	jsuis.lf.TouchListener.prototype.touchPressed = function(event) {
		var listener = this.getListener();
		if (listener && listener.touchPressed) {
			var listenerComponent = this.getListenerComponent();
			listener.setListenerComponent(listenerComponent);
			listener.touchPressed.call(listener, event);
		}
	}
	jsuis.lf.TouchListener.prototype.touchReleased = function(event) {
		var listener = this.getListener();
		if (listener && listener.touchReleased) {
			var listenerComponent = this.getListenerComponent();
			listener.setListenerComponent(listenerComponent);
			listener.touchReleased.call(listener, event);
		}
	}
	jsuis.lf.TouchListener.prototype.touchMoved = function(event) {
		var listener = this.getListener();
		if (listener && listener.touchMoved) {
			var listenerComponent = this.getListenerComponent();
			listener.setListenerComponent(listenerComponent);
			listener.touchMoved.call(listener, event);
		}
	}
	jsuis.lf.TouchListener.prototype.touchDragged = function(event) {
		var listener = this.getListener();
		if (listener && listener.touchDragged) {
			var listenerComponent = this.getListenerComponent();
			listener.setListenerComponent(listenerComponent);
			listener.touchDragged.call(listener, event);
		}
	}
}) (jsuis);
