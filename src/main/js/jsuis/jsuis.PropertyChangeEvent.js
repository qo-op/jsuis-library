/**
 * jsuis.PropertyChangeEvent
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.PropertyChangeEvent = jsuis.Object.extend(SUPER, function(source, propertyName, oldValue, newValue) {
		SUPER.prototype.constructor.call(this);
		this.setSource(source);
		this.setPropertyName(propertyName);
		this.setOldValue(oldValue);
		this.setNewValue(newValue);
	});
	jsuis.Object.addProperties(jsuis.PropertyChangeEvent,
			new jsuis.Property("source"),
			new jsuis.Property("propertyName"),
			new jsuis.Property("oldValue"),
			new jsuis.Property("newValue")
	);
}) (jsuis);