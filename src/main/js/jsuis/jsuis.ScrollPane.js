/**
 * jsuis.ScrollPane
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.ScrollPane = jsuis.Object.extend(SUPER, function(view, vsbPolicy, hsbPolicy) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ScrollPane(view, vsbPolicy, hsbPolicy));
	});
	jsuis.Object.addPeerProperties(jsuis.ScrollPane, {
		vsbPolicy: null,
		hsbPolicy: null,
		viewport: null,
		verticalScrollBar: null,
		horizontalScrollBar: null
	});
	jsuis.ScrollPane.prototype.setViewportView = function(view) {
		var peer = this.getPeer();
		peer.setViewportView(view);
		return this;
	}
	jsuis.ScrollPane.prototype.getViewportView = function() {
		var peer = this.getPeer();
		return peer.getViewportView();
	}
}) (jsuis);
