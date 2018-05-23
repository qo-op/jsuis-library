/**
 * jsuis.MouseEvent
 */
(function(jsuis) {
	var SUPER = jsuis.InputEvent;
	jsuis.MouseEvent = jsuis.Object.extend(SUPER, function(event) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].MouseEvent(event));
	});
	jsuis.Object.addPeerProperties(jsuis.MouseEvent, {
		x: 0,
		y: 0,
		xAbs: 0,
		yAbs: 0,
		clickCount: 0,
		popupTrigger: null,
		button: null
	});
}) (jsuis);
