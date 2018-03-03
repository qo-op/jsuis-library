/**
 * jsuis.Border
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Border = jsuis.Object.extend(SUPER, function() {
	});
	jsuis.Border.prototype.getBorderInsets = function(component) {
		var peer = this.getPeer();
		return peer.getBorderInsets(component);
	}
	jsuis.Border.prototype.getBorderOutsets = function(component) {
		var peer = this.getPeer();
		return peer.getBorderOutsets(component);
	}
	jsuis.Border.prototype.paintBorder = function(component) {
		var peer = this.getPeer();
		return peer.paintBorder(component);
	}
}) (jsuis);
