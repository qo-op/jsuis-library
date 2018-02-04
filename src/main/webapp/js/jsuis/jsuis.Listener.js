/**
 * jsuis.Listener
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Listener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this);
		this.setListener(listener);
	});
	jsuis.Object.addProperties(jsuis.Listener,
			new jsuis.Property("listener"),
			new jsuis.Property("listenerComponent")
	);
}) (jsuis);
