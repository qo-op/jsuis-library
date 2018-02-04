/**
 * jsuis.ComponentEvent
 */
(function(jsuis) {
	var SUPER = jsuis.Event;
	jsuis.ComponentEvent = jsuis.Object.extend(SUPER, function(component, id) {
		SUPER.prototype.constructor.call(this, component, id);
	});
}) (jsuis);
