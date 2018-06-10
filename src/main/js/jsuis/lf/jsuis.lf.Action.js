/**
 * jsuis.lf.Action
 */
(function(jsuis) {
	var SUPER = jsuis.lf.ActionListener;
	jsuis.lf.Action = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.lf.Action.prototype.isEnabled = function() {
		return this.enabled;
	}
	jsuis.lf.Action.prototype.setEnabled = function(enabled) {
		var oldEnabled = this.enabled;
		this.enabled = enabled;
		this.firePropertyChange("enabled", oldEnabled, enabled);
		return this;
	}
}) (jsuis);
