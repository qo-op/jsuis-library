/**
 * jsuis.TouchEvent
 */
(function(jsuis) {
	var SUPER = jsuis.InputEvent;
	jsuis.TouchEvent = jsuis.Object.extend(SUPER, function(event) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].TouchEvent(event));
	});
	jsuis.Object.addPeerProperties(jsuis.TouchEvent, {
		touches: null,
		x: 0,
		y: 0
	});
}) (jsuis);
