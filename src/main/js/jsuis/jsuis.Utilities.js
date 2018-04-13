/**
 * jsuis.Utilities
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Utilities = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Utilities());
	});
	var instance;
	jsuis.Utilities.getInstance = function() {
		if (!instance) {
			instance = new jsuis.Utilities();
		}
		return instance;
	}
	jsuis.Utilities.prototype.convertPoint = function(source, x, y, destination) {
		var peer = this.getPeer();
		return peer.convertPoint(source, x, y, destination);
	}
}) (jsuis);
