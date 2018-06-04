/**
 * jsuis.defaultlf.FocusListener
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Listener;
	jsuis.defaultlf.FocusListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.defaultlf.FocusListener.prototype.focusGained = function(event) {
		var listener = this.getListener();
		if (listener && listener.focusGained) {
			listener.focusGained.call(this, event);
		}
	}
	jsuis.defaultlf.FocusListener.prototype.focusLost = function(event) {
		var listener = this.getListener();
		if (listener && listener.focusLost) {
			listener.focusLost.call(this, event);
		}
	}
}) (jsuis);
