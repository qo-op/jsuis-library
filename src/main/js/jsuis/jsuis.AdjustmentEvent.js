/**
 * jsuis.AdjustmentEvent
 */
(function(jsuis) {
	var SUPER = jsuis.InputEvent;
	jsuis.AdjustmentEvent = jsuis.Object.extend(SUPER, function(event) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].AdjustmentEvent(event));
	});
}) (jsuis);
