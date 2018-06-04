/**
 * jsuis.defaultlf.Action
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.ActionListener;
	jsuis.defaultlf.Action = jsuis.Object.extend(SUPER, function(listener) {
		SUPER.prototype.constructor.call(this, listener);
	});
	jsuis.defaultlf.Action.prototype.isEnabled = function() {
		return this.enabled;
	}
	jsuis.defaultlf.Action.prototype.setEnabled = function(enabled) {
		var oldEnabled = this.enabled;
		this.enabled = enabled;
		this.firePropertyChange("enabled", oldEnabled, enabled);
		return this;
	}
}) (jsuis);
