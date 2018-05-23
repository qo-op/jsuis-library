/**
 * jsuis.FocusEvent
 */
(function(jsuis) {
	var SUPER = jsuis.InputEvent;
	jsuis.FocusEvent = jsuis.Object.extend(SUPER, function(event) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].FocusEvent(event));
	});
	jsuis.Object.addPeerProperties(jsuis.FocusEvent, {
		opposite: null
	});
}) (jsuis);
