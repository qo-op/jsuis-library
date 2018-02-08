/**
 * jsuis.defaultlf.ComponentEvent
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Event;
	jsuis.defaultlf.ComponentEvent = jsuis.Object.extend(SUPER, function(component, id) {
		SUPER.prototype.constructor.call(this, component, id);
	});
}) (jsuis);
