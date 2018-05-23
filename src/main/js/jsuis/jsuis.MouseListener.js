/**
 * jsuis.MouseListener
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.MouseListener = jsuis.Object.extend(SUPER, function(listener) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].MouseListener(listener));
	});
	jsuis.Object.addPeerProperties(jsuis.MouseListener, {
		listener: null,
		listenerComponent: null
	});
	jsuis.MouseListener.prototype.mouseClicked = function(event) {
		var peer = this.getPeer();
		peer.mouseClicked(event);
	}
	jsuis.MouseListener.prototype.mousePressed = function(event) {
		var peer = this.getPeer();
		peer.mousePressed(event);
	}
	jsuis.MouseListener.prototype.mouseReleased = function(event) {
		var peer = this.getPeer();
		peer.mouseReleased(event);
	}
	jsuis.MouseListener.prototype.mouseEntered = function(event) {
		var peer = this.getPeer();
		peer.mouseEntered(event);
	}
	jsuis.MouseListener.prototype.mouseExited = function(event) {
		var peer = this.getPeer();
		peer.mouseExited(event);
	}
}) (jsuis);
