/**
 * jsuis.DesktopPane
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.DesktopPane = jsuis.Object.extend(SUPER, function() {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].DesktopPane());
	});
	var instance;
	jsuis.DesktopPane.getInstance = function() {
		if (!instance) {
			instance = new jsuis.DesktopPane();
		}
		return instance;
	}
}) (jsuis);
