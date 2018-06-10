/**
 * jsuis.lf.FocusEvent
 */
(function(jsuis) {
	var SUPER = jsuis.lf.ComponentEvent;
	jsuis.lf.FocusEvent = jsuis.Object.extend(SUPER, function(event) {
		SUPER.prototype.constructor.call(this, event);
	});
	jsuis.Object.addProperties(jsuis.lf.FocusEvent, {
		opposite: null
	});
	jsuis.lf.FocusEvent.prototype.setTemporary = function(opposite) {
		this.opposite = opposite;
	}
	jsuis.lf.FocusEvent.prototype.isTemporary = function() {
		return this.opposite;
	}
	jsuis.lf.FocusEvent.prototype.getOpposite = function() {
		var opposite = this.opposite;
		if (opposite) {
			return opposite;
		}
		var domEvent = this.getElement();
		var relatedTarget = domEvent.relatedTarget;
		if (relatedTarget) {
			opposite = new jsuis.lf.Component(relatedTarget);
			this.setOpposite(opposite);
		}
		return opposite;
	}
}) (jsuis);
