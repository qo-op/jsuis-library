/**
 * jsuis.lf.ComponentEvent
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Event;
	jsuis.lf.ComponentEvent = jsuis.Object.extend(SUPER, function(event) {
		SUPER.prototype.constructor.call(this, event);
	});
}) (jsuis);
