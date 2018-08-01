/**
 * jsuis.lf.ActionListener
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Listener;
	jsuis.lf.ActionListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
		if (!listener.setListenerComponent) {
			listener.setListenerComponent = SUPER.prototype.setListenerComponent;
		}
		if (!listener.getListenerComponent) {
			listener.getListenerComponent = SUPER.prototype.getListenerComponent;
		}
	});
	jsuis.lf.ActionListener.prototype.actionPerformed = function(event) {
		var listener = this.getListener();
		if (listener && listener.actionPerformed) {
			var listenerComponent = this.getListenerComponent();
			listener.setListenerComponent(listenerComponent);
			listener.actionPerformed.call(listener, event);
		}
	}
}) (jsuis);
