/**
 * jsuis.SplitPane
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.SplitPane = jsuis.Object.extend(SUPER, function(orientation, leftComponent, rightComponent) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].SplitPane(orientation, leftComponent, rightComponent));
	});
	jsuis.Object.addPeerProperties(jsuis.SplitPane,
			new jsuis.Property("orientation"),
			new jsuis.Property("leftComponent"),
			new jsuis.Property("rightComponent"),
			new jsuis.Property("topComponent"),
			new jsuis.Property("bottomComponent"),
			new jsuis.Property("dividerLocation"),
			new jsuis.Property("dividerSize"),
			new jsuis.Property("resizeWeight")
	);
}) (jsuis);
