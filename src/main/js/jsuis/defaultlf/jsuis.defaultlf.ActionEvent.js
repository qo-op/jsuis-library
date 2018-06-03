/**
 * jsuis.defaultlf.ActionEvent
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.InputEvent;
	jsuis.defaultlf.ActionEvent = jsuis.Object.extend(SUPER, function(event) {
		SUPER.prototype.constructor.call(this, event);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ActionEvent, {
		actionCommand: null
	});
}) (jsuis);
