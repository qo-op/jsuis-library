/**
 * jsuis.defaultlf.ActionListener
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Listener;
	jsuis.defaultlf.ActionListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.defaultlf.ActionListener.prototype.actionPerformed = function(event) {
		var listener = this.getListener();
		if (listener && listener.actionPerformed) {
			listener.actionPerformed.call(this, event);
		}
	}
}) (jsuis);
