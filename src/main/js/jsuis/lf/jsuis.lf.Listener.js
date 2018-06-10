/**
 * jsuis.lf.Listener
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.lf.Listener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this);
		this.setListener(listener);
	});
	jsuis.Object.addProperties(jsuis.lf.Listener, {
		listener: null,
		listenerComponent: null
	});
}) (jsuis);
