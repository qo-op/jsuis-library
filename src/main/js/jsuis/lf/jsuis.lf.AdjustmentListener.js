/**
 * jsuis.lf.AdjustmentListener
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Listener;
	jsuis.lf.AdjustmentListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.lf.AdjustmentListener.prototype.adjustmentValueChanged = function(event) {
		var listener = this.getListener();
		if (listener && listener.adjustmentValueChanged) {
			listener.adjustmentValueChanged.call(this, event);
		}
	}
}) (jsuis);
