/**
 * jsuis.ActionEvent
 */
(function(jsuis) {
	var SUPER = jsuis.InputEvent;
	jsuis.ActionEvent = jsuis.Object.extend(SUPER, function(event) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ActionEvent(event));
	});
	jsuis.Object.addPeerProperties(jsuis.ActionEvent, {
		actionCommand: null
	});
}) (jsuis);
