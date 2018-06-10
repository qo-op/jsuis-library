/**
 * jsuis.lf.FocusListener
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Listener;
	jsuis.lf.FocusListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.lf.FocusListener.prototype.focusGained = function(event) {
		var listener = this.getListener();
		if (listener && listener.focusGained) {
			listener.focusGained.call(this, event);
		}
	}
	jsuis.lf.FocusListener.prototype.focusLost = function(event) {
		var listener = this.getListener();
		if (listener && listener.focusLost) {
			listener.focusLost.call(this, event);
		}
	}
}) (jsuis);
