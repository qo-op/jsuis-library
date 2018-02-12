/**
 * jsuis.defaultlf.InputEvent
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.ComponentEvent;
	jsuis.defaultlf.InputEvent = jsuis.Object.extend(SUPER, function(source, id,
			when, modifiers) {
		SUPER.prototype.constructor.call(this, source, id);
		this.setWhen(when);
		this.setModifiers(modifiers);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.InputEvent,
			new jsuis.Property("when"),
			new jsuis.Property("modifiers")
	);
	jsuis.defaultlf.InputEvent.prototype.getWhen = function() {
		var when = this.when;
		if (when !== null && when !== undefined) {
			return when;
		}
		var domEvent = this.getDomEvent();
		if (domEvent) {
			when = domEvent.timeStamp;
		} else {
			when = new Date().getTime();
		}
		this.setWhen(when);
		return when;
	}
	jsuis.defaultlf.InputEvent.prototype.getModifiers = function() {
		var modifiers = this.modifiers;
		if (modifiers !== null && modifiers !== undefined) {
			return modifiers;
		}
		var domEvent = this.getDomEvent();
		if (domEvent) {
			modifiers = (domEvent.shiftKey ? (jsuis.defaultlf.Event.SHIFT_MASK | jsuis.defaultlf.Event.SHIFT_DOWN_MASK) : 0)
			| (domEvent.ctrlKey ? (jsuis.defaultlf.Event.CTRL_MASK | jsuis.defaultlf.Event.CTRL_DOWN_MASK) : 0)
			| (domEvent.metaKey ? (jsuis.defaultlf.Event.META_MASK | jsuis.defaultlf.Event.META_DOWN_MASK) : 0)
			| (domEvent.altKey ? (jsuis.defaultlf.Event.ALT_MASK | jsuis.defaultlf.Event.ALT_DOWN_MASK) : 0);
			this.setModifiers(modifiers);
		}
		return modifiers;
	}
}) (jsuis);
