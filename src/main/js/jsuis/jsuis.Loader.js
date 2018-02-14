/**
 * jsuis.Loader
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Loader = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Loader());
	});
	jsuis.Loader.getInstance = function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		return jsuis[lookAndFeel].Loader.getInstance();
	}
	jsuis.Loader.prototype.add = function(resources) {
		var peer = this.getPeer();
		peer.add(resources);
	}
	jsuis.Loader.prototype.getResource = function(name) {
		var peer = this.getPeer();
		return peer.getResource(name);
	}
}) (jsuis);
