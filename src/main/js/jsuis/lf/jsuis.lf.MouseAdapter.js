/**
 * jsuis.lf.MouseAdapter
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Listener;
	jsuis.lf.MouseAdapter = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
		if (!listener.setListenerComponent) {
			listener.setListenerComponent = SUPER.prototype.setListenerComponent;
		}
		if (!listener.getListenerComponent) {
			listener.getListenerComponent = SUPER.prototype.getListenerComponent;
		}
	});
	jsuis.lf.MouseAdapter.prototype.mouseClicked = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseClicked) {
			var listenerComponent = this.getListenerComponent();
			listener.setListenerComponent(listenerComponent);
			listener.mouseClicked.call(listener, event);
		}
	}
	jsuis.lf.MouseAdapter.prototype.mousePressed = function(event) {
		var listener = this.getListener();
		if (listener && listener.mousePressed) {
			var listenerComponent = this.getListenerComponent();
			listener.setListenerComponent(listenerComponent);
			listener.mousePressed.call(listener, event);
		}
	}
	jsuis.lf.MouseAdapter.prototype.mouseReleased = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseReleased) {
			var listenerComponent = this.getListenerComponent();
			listener.setListenerComponent(listenerComponent);
			listener.mouseReleased.call(listener, event);
		}
	}
	jsuis.lf.MouseAdapter.prototype.mouseEntered = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseEntered) {
			var listenerComponent = this.getListenerComponent();
			listener.setListenerComponent(listenerComponent);
			listener.mouseEntered.call(listener, event);
		}
	}
	jsuis.lf.MouseAdapter.prototype.mouseExited = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseExited) {
			var listenerComponent = this.getListenerComponent();
			listener.setListenerComponent(listenerComponent);
			listener.mouseExited.call(listener, event);
		}
	}
	jsuis.lf.MouseAdapter.prototype.mouseDragged = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseDragged) {
			var listenerComponent = this.getListenerComponent();
			listener.setListenerComponent(listenerComponent);
			listener.mouseDragged.call(listener, event);
		}
	}
	jsuis.lf.MouseAdapter.prototype.mouseMoved = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseMoved) {
			var listenerComponent = this.getListenerComponent();
			listener.setListenerComponent(listenerComponent);
			listener.mouseMoved.call(listener, event);
		}
	}
}) (jsuis);
