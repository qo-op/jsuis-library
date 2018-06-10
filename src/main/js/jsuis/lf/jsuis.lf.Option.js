/**
 * jsuis.lf.Option
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Component;
	jsuis.lf.Option = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, document.createElement("option"));
	});
}) (jsuis);
