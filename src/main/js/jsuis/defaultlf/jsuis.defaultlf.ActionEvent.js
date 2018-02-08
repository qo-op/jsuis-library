/**
 * jsuis.defaultlf.ActionEvent
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Event;
	jsuis.defaultlf.ActionEvent = jsuis.Object.extend(SUPER, function(component, id, actionCommand, when, modifiers) {
		SUPER.prototype.constructor.call(this, component, id, when, modifiers);
		this.setActionCommand(actionCommand);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.ActionEvent,
			new jsuis.Property("actionCommand")
	);
}) (jsuis);
