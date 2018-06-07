/**
 * jsuis.Icon
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Icon = jsuis.Object.extend(SUPER, function() {
	});
	jsuis.Object.addPeerProperties(jsuis.Icon, {
		iconWidth: 0,
		iconHeight: 0
	});
	jsuis.Icon.prototype.paintIcon = function(component) {
		var peer = this.getPeer();
		return peer.paintIcon(component);
	}
}) (jsuis);
