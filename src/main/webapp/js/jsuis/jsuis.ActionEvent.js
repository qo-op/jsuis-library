/**
 * jsuis.ActionEvent
 */
(function(jsuis) {
	var SUPER = jsuis.Event;
	jsuis.ActionEvent = jsuis.Object.extend(SUPER, function(component, id, actionCommand, when, modifiers) {
		SUPER.prototype.constructor.call(this, component, id, when, modifiers);
		this.setActionCommand(actionCommand);
	});
	jsuis.Object.addProperties(jsuis.ActionEvent,
			new jsuis.Property("actionCommand")
	);
}) (jsuis);
