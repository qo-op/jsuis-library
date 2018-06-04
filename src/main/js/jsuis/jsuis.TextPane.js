/**
 * jsuis.TextPane
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.TextPane = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].TextPane());
	});
	jsuis.Object.addPeerProperties(jsuis.TextPane, {
		text: null,
		editable: false,
		highlighter: false
	});
	jsuis.TextPane.prototype.append = function(text) {
		var peer = this.getPeer();
		peer.append(text);
	}
}) (jsuis);
