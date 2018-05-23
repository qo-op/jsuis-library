/**
 * jsuis.defaultlf.FocusEvent
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.ComponentEvent;
	jsuis.defaultlf.FocusEvent = jsuis.Object.extend(SUPER, function(source, id, temporary, opposite) {
		SUPER.prototype.constructor.call(this, source, id);
		this.setTemporary(temporary);
		this.setOpposite(opposite);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.FocusEvent, {
		opposite: null
	});
	jsuis.defaultlf.FocusEvent.prototype.setTemporary = function(opposite) {
		this.opposite = opposite;
	}
	jsuis.defaultlf.FocusEvent.prototype.isTemporary = function() {
		return this.opposite;
	}
	jsuis.defaultlf.FocusEvent.prototype.getOpposite = function() {
		var opposite = this.opposite;
		if (opposite) {
			return opposite;
		}
		var domEvent = this.getDomEvent();
		var relatedTarget = domEvent.relatedTarget;
		if (relatedTarget) {
			opposite = new jsuis.defaultlf.Component(relatedTarget);
			this.setOpposite(opposite);
		}
		return opposite;
	}
}) (jsuis);
