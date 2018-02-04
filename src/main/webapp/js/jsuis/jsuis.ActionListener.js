/**
 * jsuis.ActionListener
 */
(function(jsuis) {
	var SUPER = jsuis.Listener;
	jsuis.ActionListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.ActionListener.prototype.actionPerformed = function(event) {
		var listener = this.getListener();
		listener.actionPerformed.call(this, event);
	}
}) (jsuis);
