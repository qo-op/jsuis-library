/**
 * jsuis.Action
 */
(function(jsuis) {
	var SUPER = jsuis.ActionListener;
	jsuis.Action = jsuis.Object.extend(SUPER, function(listener) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Action(listener));
	});
	jsuis.Object.addPeerProperties(jsuis.Action, {
		enabled: false
	});
}) (jsuis);
