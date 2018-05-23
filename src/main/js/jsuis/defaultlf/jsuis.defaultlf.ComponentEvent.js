/**
 * jsuis.defaultlf.ComponentEvent
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Event;
	jsuis.defaultlf.ComponentEvent = jsuis.Object.extend(SUPER, function(source, id) {
		SUPER.prototype.constructor.call(this, source, id);
	});
}) (jsuis);
