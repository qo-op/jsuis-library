/**
 * jsuis.lf.ActionEvent
 */
(function(jsuis) {
	var SUPER = jsuis.lf.InputEvent;
	jsuis.lf.ActionEvent = jsuis.Object.extend(SUPER, function(event) {
		SUPER.prototype.constructor.call(this, event);
	});
	jsuis.Object.addProperties(jsuis.lf.ActionEvent, {
		actionCommand: null
	});
}) (jsuis);
