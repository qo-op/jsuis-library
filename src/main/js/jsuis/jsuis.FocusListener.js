/**
 * jsuis.FocusListener
 */
(function(jsuis) {
	var SUPER = jsuis.Listener;
	jsuis.FocusListener = jsuis.Object.extend(SUPER, function(listener) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].FocusListener(listener));
	});
	jsuis.FocusListener.prototype.focusGained = function(event) {
		var peer = this.getPeer();
		peer.focusGained(event);
	}
	jsuis.FocusListener.prototype.focusLost = function(event) {
		var peer = this.getPeer();
		peer.focusLost(event);
	}
}) (jsuis);
