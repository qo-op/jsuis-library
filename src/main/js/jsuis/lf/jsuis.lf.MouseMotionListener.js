/**
 * jsuis.lf.MouseMotionListener
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Listener;
	jsuis.lf.MouseMotionListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
		if (!listener.setListenerComponent) {
			listener.setListenerComponent = SUPER.prototype.setListenerComponent;
		}
		if (!listener.getListenerComponent) {
			listener.getListenerComponent = SUPER.prototype.getListenerComponent;
		}
	});
	jsuis.lf.MouseMotionListener.prototype.mouseDragged = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseDragged) {
			var listenerComponent = this.getListenerComponent();
			listener.setListenerComponent(listenerComponent);
			listener.mouseDragged.call(listener, event);
		}
	}
	jsuis.lf.MouseMotionListener.prototype.mouseMoved = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseMoved) {
			var listenerComponent = this.getListenerComponent();
			listener.setListenerComponent(listenerComponent);
			listener.mouseMoved.call(listener, event);
		}
	}
}) (jsuis);
