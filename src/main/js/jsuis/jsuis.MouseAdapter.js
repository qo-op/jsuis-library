/**
 * jsuis.MouseAdapter
 */
(function(jsuis) {
	var SUPER = jsuis.Listener;
	jsuis.MouseAdapter = jsuis.Object.extend(SUPER, function(listener) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].MouseAdapter(listener));
	});
	jsuis.MouseAdapter.prototype.mouseClicked = function(event) {
		var peer = this.getPeer();
		peer.mouseClicked(event);
	}
	jsuis.MouseAdapter.prototype.mousePressed = function(event) {
		var peer = this.getPeer();
		peer.mousePressed(event);
	}
	jsuis.MouseAdapter.prototype.mouseReleased = function(event) {
		var peer = this.getPeer();
		peer.mouseReleased(event);
	}
	jsuis.MouseAdapter.prototype.mouseEntered = function(event) {
		var peer = this.getPeer();
		peer.mouseEntered(event);
	}
	jsuis.MouseAdapter.prototype.mouseExited = function(event) {
		var peer = this.getPeer();
		peer.mouseExited(event);
	}
	jsuis.MouseAdapter.prototype.mouseDragged = function(event) {
		var peer = this.getPeer();
		peer.mouseDragged(event);
	}
	jsuis.MouseAdapter.prototype.mouseMoved = function(event) {
		var peer = this.getPeer();
		peer.mouseMoved(event);
	}
}) (jsuis);
