/**
 * jsuis.lf.TabPanel
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Panel;
	jsuis.lf.TabPanel = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, new jsuis.FlowLayout(jsuis.Constants.LEFT, 0));
		// this.setBorder(new jsuis.lf.TabPanelBorder());
	});
}) (jsuis);
