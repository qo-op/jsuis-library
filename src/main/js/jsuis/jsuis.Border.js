/**
 * jsuis.Border
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Border = jsuis.Object.extend(SUPER, function() {
	});
	jsuis.Object.addPeerProperties(jsuis.Border, {
		borderInsets: null,
		borderOutsets: null
	});
	jsuis.Border.prototype.paintBorder = function(component) {
		var peer = this.getPeer();
		peer.paintBorder(component);
	}
}) (jsuis);
