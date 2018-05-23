/**
 * jsuis.defaultlf.MouseMotionListener
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Listener;
	jsuis.defaultlf.MouseMotionListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.defaultlf.MouseMotionListener.prototype.mouseDragged = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseDragged) {
			listener.mouseDragged.call(this, event);
		}
	}
	jsuis.defaultlf.MouseMotionListener.prototype.mouseMoved = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseMoved) {
			listener.mouseMoved.call(this, event);
		}
	}
}) (jsuis);
