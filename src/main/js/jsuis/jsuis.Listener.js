/**
 * jsuis.Listener
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Listener = jsuis.Object.extend(SUPER, function(listener) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Listener(listener));
	});
	jsuis.Object.addPeerProperties(jsuis.Listener, {
		element: null,
		listener: null,
		listenerComponent: null
	});
}) (jsuis);
