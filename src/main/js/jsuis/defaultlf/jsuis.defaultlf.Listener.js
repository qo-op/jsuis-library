/**
 * jsuis.defaultlf.Listener
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.defaultlf.Listener = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this);
		this.setListener(listener);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Listener, {
		listener: null,
		listenerComponent: null
	});
}) (jsuis);
