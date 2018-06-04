/**
 * jsuis.ActionListener
 */
(function(jsuis) {
	var SUPER = jsuis.Listener;
	jsuis.ActionListener = jsuis.Object.extend(SUPER, function(listener) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ActionListener(listener));
	});
	jsuis.ActionListener.prototype.actionPerformed = function(event) {
		var peer = this.getPeer();
		peer.actionPerformed(event);
	}
}) (jsuis);
