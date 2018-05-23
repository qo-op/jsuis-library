/**
 * jsuis.Cloneable
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Cloneable = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
	});
	jsuis.Cloneable.prototype.clone = function() {
		return null;
	}
}) (jsuis);
