/**
 * jsuis.lf.ActionListener
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Listener;
	jsuis.lf.ActionListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.lf.ActionListener.prototype.actionPerformed = function(event) {
		var listener = this.getListener();
		if (listener && listener.actionPerformed) {
			listener.actionPerformed.call(this, event);
		}
	}
}) (jsuis);
