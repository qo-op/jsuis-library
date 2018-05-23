/**
 * jsuis.defaultlf.ActionEvent
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.InputEvent;
	jsuis.defaultlf.ActionEvent = jsuis.Object.extend(SUPER, function(source, id,
			actionCommand, when, modifiers) {
		SUPER.prototype.constructor.call(this, source, id, when, modifiers);
		this.setActionCommand(actionCommand);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ActionEvent, {
		actionCommand: null
	});
}) (jsuis);
