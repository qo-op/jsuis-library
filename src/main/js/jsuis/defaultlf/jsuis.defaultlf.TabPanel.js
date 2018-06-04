/**
 * jsuis.defaultlf.TabPanel
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.TabPanel = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, new jsuis.FlowLayout(jsuis.Constants.LEFT, 0));
		this.setBorder(new jsuis.defaultlf.TabPanelBorder());
	});
}) (jsuis);
