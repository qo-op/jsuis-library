/**
 * jsuis.Event
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Event = jsuis.Object.extend(SUPER, function(event) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Event(event));
	});
	jsuis.Object.addPeerProperties(jsuis.Event, {
		source: null,
		id: null
	});
}) (jsuis);
