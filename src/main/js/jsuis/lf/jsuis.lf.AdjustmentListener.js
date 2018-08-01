/**
 * jsuis.lf.AdjustmentListener
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Listener;
	jsuis.lf.AdjustmentListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
		if (!listener.setListenerComponent) {
			listener.setListenerComponent = SUPER.prototype.setListenerComponent;
		}
		if (!listener.getListenerComponent) {
			listener.getListenerComponent = SUPER.prototype.getListenerComponent;
		}
	});
	jsuis.lf.AdjustmentListener.prototype.adjustmentValueChanged = function(event) {
		var listener = this.getListener();
		if (listener && listener.adjustmentValueChanged) {
			var listenerComponent = this.getListenerComponent();
			listener.setListenerComponent(listenerComponent);
			listener.adjustmentValueChanged.call(listener, event);
		}
	}
}) (jsuis);
