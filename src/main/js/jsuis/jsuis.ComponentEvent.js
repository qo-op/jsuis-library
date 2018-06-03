/**
 * jsuis.ComponentEvent
 */
(function(jsuis) {
	var SUPER = jsuis.Event;
	jsuis.ComponentEvent = jsuis.Object.extend(SUPER, function(event) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Event(event));
	});
}) (jsuis);
