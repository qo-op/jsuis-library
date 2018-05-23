/**
 * jsuis.Dialog
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Dialog = jsuis.Object.extend(SUPER, function(owner, modal) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Dialog(owner, modal));
	});
	jsuis.Object.addPeerProperties(jsuis.Dialog, {
		title: null,
		layeredPane: null,
		contentPane: null,
		visible: false
	});
	jsuis.Dialog.prototype.pack = function() {
		var peer = this.getPeer();
		peer.pack();
	}
	jsuis.Dialog.prototype.setLocationRelativeTo = function(component) {
		var peer = this.getPeer();
		peer.setLocationRelativeTo(component);
	}
	jsuis.Dialog.prototype.dispose = function() {
		var peer = this.getPeer();
		peer.dispose();
	}
}) (jsuis);
