/**
 * jsuis.Loader
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Loader = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Loader());
	});
	var instance;
	jsuis.Loader.getInstance = function() {
		if (!instance) {
			instance = new jsuis.Loader();
		}
		return instance;
	}
	jsuis.Loader.prototype.load = function(resources) {
		var peer = this.getPeer();
		peer.load(resources);
	}
	jsuis.Loader.prototype.getResource = function(name) {
		var peer = this.getPeer();
		return peer.getResource(name);
	}
}) (jsuis);
