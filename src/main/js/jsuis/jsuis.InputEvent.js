/**
 * jsuis.InputEvent
 */
(function(jsuis) {
	var SUPER = jsuis.ComponentEvent;
	jsuis.InputEvent = jsuis.Object.extend(SUPER, function(event) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].InputEvent(event));
	});
	jsuis.Object.addPeerProperties(jsuis.InputEvent, {
		when: 0,
		modifiers: 0
	});
}) (jsuis);
