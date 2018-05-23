/**
 * jsuis.MouseMotionListener
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.MouseMotionListener = jsuis.Object.extend(SUPER, function(listener) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].MouseMotionListener(listener));
	});
	jsuis.Object.addPeerProperties(jsuis.MouseMotionListener, {
		listener: null,
		listenerComponent: null
	});
	jsuis.MouseMotionListener.prototype.mouseDragged = function(event) {
		var peer = this.getPeer();
		peer.mouseDragged(event);
	}
	jsuis.MouseMotionListener.prototype.mouseMoved = function(event) {
		var peer = this.getPeer();
		peer.mouseMoved(event);
	}
}) (jsuis);
