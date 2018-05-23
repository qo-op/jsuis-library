/**
 * jsuis.ProgressBar
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.ProgressBar = jsuis.Object.extend(SUPER, function(layout) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ProgressBar(layout));
	});
	jsuis.Object.addPeerProperties(jsuis.ProgressBar, {
		maximum: 0,
		progress: 0,
		stringPainted: false,
		string: null
	});
}) (jsuis);
