/**
 * jsuis.PopupMenu
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.PopupMenu = jsuis.Object.extend(SUPER, function(layout, target) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].PopupMenu(layout, target));
	});
}) (jsuis);
