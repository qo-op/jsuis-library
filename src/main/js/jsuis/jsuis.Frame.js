/**
 * jsuis.Frame
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Frame = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Frame());
	});
	jsuis.Object.addPeerProperties(jsuis.Frame,
			new jsuis.Property("layeredPane"),
			new jsuis.Property("menuBar"),
			new jsuis.Property("contentPane")
	);
	jsuis.Frame.prototype.dispose = function() {
		var peer = this.getPeer();
		peer.dispose();
	}
}) (jsuis);
