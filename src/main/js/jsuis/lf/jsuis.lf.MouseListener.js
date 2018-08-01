/**
 * jsuis.lf.MouseListener
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Listener;
	jsuis.lf.MouseListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
		if (!listener.setListenerComponent) {
			listener.setListenerComponent = SUPER.prototype.setListenerComponent;
		}
		if (!listener.getListenerComponent) {
			listener.getListenerComponent = SUPER.prototype.getListenerComponent;
		}
	});
	jsuis.lf.MouseListener.prototype.mouseClicked = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseClicked) {
			var listenerComponent = this.getListenerComponent();
			listener.setListenerComponent(listenerComponent);
			listener.mouseClicked.call(listener, event);
		}
	}
	jsuis.lf.MouseListener.prototype.mousePressed = function(event) {
		var listener = this.getListener();
		if (listener && listener.mousePressed) {
			var listenerComponent = this.getListenerComponent();
			listener.setListenerComponent(listenerComponent);
			listener.mousePressed.call(listener, event);
		}
	}
	jsuis.lf.MouseListener.prototype.mouseReleased = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseReleased) {
			var listenerComponent = this.getListenerComponent();
			listener.setListenerComponent(listenerComponent);
			listener.mouseReleased.call(listener, event);
		}
	}
	jsuis.lf.MouseListener.prototype.mouseEntered = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseEntered) {
			var listenerComponent = this.getListenerComponent();
			listener.setListenerComponent(listenerComponent);
			listener.mouseEntered.call(listener, event);
		}
	}
	jsuis.lf.MouseListener.prototype.mouseExited = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseExited) {
			var listenerComponent = this.getListenerComponent();
			listener.setListenerComponent(listenerComponent);
			listener.mouseExited.call(listener, event);
		}
	}
}) (jsuis);
