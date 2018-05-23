/**
 * jsuis.Frame
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Frame = jsuis.Object.extend(SUPER, function(title) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Frame(title));
	});
	jsuis.Object.addPeerProperties(jsuis.Frame, {
		title: null,
		layeredPane: null,
		menuBar: null,
		contentPane: null,
		visible: false
	});
	jsuis.Frame.prototype.pack = function() {
		var peer = this.getPeer();
		peer.pack();
	}
	// TODO
	jsuis.Frame.prototype.setLocationRelativeTo = function(component) {
		var peer = this.getPeer();
		peer.setLocationRelativeTo(component);
	}
	jsuis.Frame.prototype.dispose = function() {
		var peer = this.getPeer();
		peer.dispose();
	}
}) (jsuis);
