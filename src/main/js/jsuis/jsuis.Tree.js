/**
 * jsuis.Tree
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.Tree = jsuis.Object.extend(SUPER, function(model) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Tree());
		this.setModel(nvl(model, new jsuis.TreeModel()));
	});
	jsuis.Object.addPeerProperties(jsuis.Tree,
			new jsuis.Property("model"),
			new jsuis.Property("root")
	);
	jsuis.Tree.prototype.isRootVisible = function() {
		var peer = this.getPeer();
		return peer.isRootVisible();
	}
	jsuis.Tree.prototype.setRootVisible = function(rootVisible) {
		var peer = this.getPeer();
		peer.setRootVisible(rootVisible);
		return this;
	}
}) (jsuis);
