/**
 * jsuis.RootPane
 */
(function(jsuis) {
	var SUPER = jsuis.LayeredPane;
	jsuis.RootPane = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
		this.setLayout(new jsuis.BorderLayout());
	});
}) (jsuis);
