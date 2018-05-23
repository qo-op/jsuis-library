/**
 * jsuis.Properties
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Properties = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Properties());
	});
	jsuis.Properties.getInstance = function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		return jsuis[lookAndFeel].Properties.getInstance();
	}
	jsuis.Properties.prototype.getProperty = function(key) {
		var peer = this.getPeer();
		return peer.getProperty(key);
	}
	jsuis.Properties.prototype.getProperty = function(key, defaultValue) {
		var peer = this.getPeer();
		return peer.getProperty(key, defaultValue);
	}
	jsuis.Properties.prototype.setProperty = function(key, value) {
		var peer = this.getPeer();
		peer.setProperty(key, value);
		return this;
	}
	jsuis.Properties.prototype.get = function(key) {
		var peer = this.getPeer();
		return peer.get(key);
	}
	jsuis.Properties.prototype.set = function(key, value) {
		var peer = this.getPeer();
		peer.set(key, value);
		return this;
	}
	jsuis.Properties.prototype.load = function(properties) {
		var peer = this.getPeer();
		peer.load(properties);
	}
	jsuis.Properties.prototype.store = function(properties, comments) {
		var peer = this.getPeer();
		peer.store(properties, comments);
	}
}) (jsuis);
