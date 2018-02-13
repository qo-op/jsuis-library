/**
 * jsuis.ToolBar
 */
(function(jsuis) {
	var SUPER = jsuis.Panel;
	jsuis.ToolBar = jsuis.Object.extend(SUPER, function(element) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].ToolBar(element));
	});
}) (jsuis);
