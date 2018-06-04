/**
 * jsuis.ComponentListener
 */
(function(jsuis) {
	var SUPER = jsuis.Listener;
	jsuis.ComponentListener = jsuis.Object.extend(SUPER, function(listener) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ComponentListener(listener));
	});
	jsuis.ComponentListener.prototype.componentResized = function(event) {
		var peer = this.getPeer();
		peer.componentResized(event);
	}
	jsuis.ComponentListener.prototype.componentMoved = function(event) {
		var peer = this.getPeer();
		peer.componentMoved(event);
	}
}) (jsuis);
