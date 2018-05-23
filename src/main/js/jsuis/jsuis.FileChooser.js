/**
 * jsuis.FileChooser
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.FileChooser = jsuis.Object.extend(SUPER, function(owner, modal) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].FileChooser(owner, modal));
	});
	jsuis.Object.addPeerProperties(jsuis.FileChooser, {
		selectedFile: null
	});
	jsuis.FileChooser.prototype.showOpenDialog = function(parent) {
		var peer = this.getPeer();
		return peer.showOpenDialog(parent);
	}
	jsuis.FileChooser.prototype.showSaveDialog = function(parent) {
		var peer = this.getPeer();
		return peer.showSaveDialog(parent);
	}
}) (jsuis);
