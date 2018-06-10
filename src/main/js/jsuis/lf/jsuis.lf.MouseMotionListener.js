/**
 * jsuis.lf.MouseMotionListener
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Listener;
	jsuis.lf.MouseMotionListener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.lf.MouseMotionListener.prototype.mouseDragged = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseDragged) {
			listener.mouseDragged.call(this, event);
		}
	}
	jsuis.lf.MouseMotionListener.prototype.mouseMoved = function(event) {
		var listener = this.getListener();
		if (listener && listener.mouseMoved) {
			listener.mouseMoved.call(this, event);
		}
	}
}) (jsuis);
