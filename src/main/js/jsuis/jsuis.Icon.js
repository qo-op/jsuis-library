/**
 * jsuis.Icon
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Icon = jsuis.Object.extend(SUPER, function() {
	});
	jsuis.Icon.prototype.paintIcon = function(component) {
		var peer = this.getPeer();
		return peer.paintIcon(component);
	}
}) (jsuis);
