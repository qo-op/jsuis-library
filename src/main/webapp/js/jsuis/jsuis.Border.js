/**
 * jsuis.Border
 */
(function(jsuis) {
	var SUPER = jsuis.Peer;
	jsuis.Border = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Border());
	});
	jsuis.Border.prototype.install = function(component) {
		var peer = this.getPeer();
		peer.install(component);
	}
	jsuis.Border.prototype.getBorderInsets = function(component) {
		var peer = this.getPeer();
		return peer.getBorderInsets(component);
	}
	jsuis.Border.prototype.getBorderOutsets = function(component) {
		var peer = this.getPeer();
		return peer.getBorderOutsets(component);
	}
}) (jsuis);
