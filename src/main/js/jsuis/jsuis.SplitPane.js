/**
 * jsuis.SplitPane
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.SplitPane = jsuis.Object.extend(SUPER, function(orientation, leftComponent, rightComponent) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].SplitPane(orientation, leftComponent, rightComponent));
	});
	jsuis.Object.addPeerProperties(jsuis.SplitPane, {
		orientation: null,
		leftComponent: null,
		rightComponent: null,
		topComponent: null,
		bottomComponent: null,
		dividerLocation: 0,
		dividerSize: 0,
		resizeWeight: 0
	});
}) (jsuis);
