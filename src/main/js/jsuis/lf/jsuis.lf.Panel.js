/**
 * jsuis.lf.Panel
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Container;
	jsuis.lf.Panel = jsuis.Object.extend(SUPER, function(layout) {
		SUPER.prototype.constructor.call(this, document.createElement("div"));
		this.setStyleProperty("position", "absolute");
		this.setLayout(layout !== undefined ? layout : new jsuis.FlowLayout());
	});
}) (jsuis);
