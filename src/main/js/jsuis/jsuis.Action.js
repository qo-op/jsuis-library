/**
 * jsuis.Action
 */
(function(jsuis) {
	var SUPER = jsuis.ActionListener;
	jsuis.Action = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
}) (jsuis);
