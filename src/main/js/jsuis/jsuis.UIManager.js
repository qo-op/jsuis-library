/**
 * jsuis.UIManager
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.UIManager = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	var lookAndFeel = "lf";
	jsuis.UIManager.getLookAndFeel = function() {
		return lookAndFeel;
	}
	jsuis.UIManager.setLookAndFeel = function(newLookAndFeel) {
		lookAndFeel = newLookAndFeel;
	}
})(jsuis);
