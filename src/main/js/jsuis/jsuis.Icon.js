/**
 * jsuis.Icon
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Icon = jsuis.Object.extend(SUPER, function() {
	});
	jsuis.Object.addPeerProperties(jsuis.Icon,
			new jsuis.Property("iconWidth"),
			new jsuis.Property("iconHeight")
	);
	jsuis.Icon.prototype.paintIcon = function(component, constraints) {
		var peer = this.getPeer();
		return peer.paintIcon(component, constraints);
	}
}) (jsuis);
