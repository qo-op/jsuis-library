/**
 * jsuis.lf.FocusListener
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Listener;
	jsuis.lf.FocusListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
		if (!listener.setListenerComponent) {
			listener.setListenerComponent = SUPER.prototype.setListenerComponent;
		}
		if (!listener.getListenerComponent) {
			listener.getListenerComponent = SUPER.prototype.getListenerComponent;
		}
	});
	jsuis.lf.FocusListener.prototype.focusGained = function(event) {
		var listener = this.getListener();
		if (listener && listener.focusGained) {
			var listenerComponent = this.getListenerComponent();
			listener.setListenerComponent(listenerComponent);
			listener.focusGained.call(listener, event);
		}
	}
	jsuis.lf.FocusListener.prototype.focusLost = function(event) {
		var listener = this.getListener();
		if (listener && listener.focusLost) {
			var listenerComponent = this.getListenerComponent();
			listener.setListenerComponent(listenerComponent);
			listener.focusLost.call(listener, event);
		}
	}
}) (jsuis);
