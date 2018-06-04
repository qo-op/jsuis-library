/**
 * jsuis.TouchListener
 */
(function(jsuis) {
	var SUPER = jsuis.Listener;
	jsuis.TouchListener = jsuis.Object.extend(SUPER, function(listener) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].TouchListener(listener));
	});
	jsuis.TouchListener.prototype.touchPressed = function(event) {
		var peer = this.getPeer();
		peer.touchPressed(event);
	}
	jsuis.TouchListener.prototype.touchReleased = function(event) {
		var peer = this.getPeer();
		peer.touchReleased(event);
	}
	jsuis.TouchListener.prototype.touchMoved = function(event) {
		var peer = this.getPeer();
		peer.touchMoved(event);
	}
	jsuis.TouchListener.prototype.touchDragged = function(event) {
		var peer = this.getPeer();
		peer.touchDragged(event);
	}
}) (jsuis);
