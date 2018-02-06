/**
 * jsuis.defaultlf.RootPane
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.LayeredPane;
	jsuis.defaultlf.RootPane = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
		this.setLayout(new jsuis.BorderLayout());
	});
}) (jsuis);
