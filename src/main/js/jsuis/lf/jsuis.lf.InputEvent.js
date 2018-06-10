/**
 * jsuis.lf.InputEvent
 */
(function(jsuis) {
	var SUPER = jsuis.lf.ComponentEvent;
	jsuis.lf.InputEvent = jsuis.Object.extend(SUPER, function(event) {
		SUPER.prototype.constructor.call(this, event);
	});
	jsuis.Object.addProperties(jsuis.lf.InputEvent, {
		when: 0,
		modifiers: 0
	});
	
	jsuis.lf.InputEvent.SHIFT_MASK = 1;
	jsuis.lf.InputEvent.CTRL_MASK = 2;
	jsuis.lf.InputEvent.META_MASK = 4;
	jsuis.lf.InputEvent.ALT_MASK = 8;
	
	jsuis.lf.InputEvent.SHIFT_DOWN_MASK = 64;
	jsuis.lf.InputEvent.CTRL_DOWN_MASK = 128;
	jsuis.lf.InputEvent.META_DOWN_MASK = 256;
	jsuis.lf.InputEvent.ALT_DOWN_MASK = 512;
	
	jsuis.lf.InputEvent.prototype.getWhen = function() {
		var when = this.when;
		if (when !== null && when !== undefined) {
			return when;
		}
		var domEvent = this.getElement();
		if (domEvent) {
			when = domEvent.timeStamp;
		} else {
			when = new Date().getTime();
		}
		this.setWhen(when);
		return when;
	}
	jsuis.lf.InputEvent.prototype.getModifiers = function() {
		var modifiers = this.modifiers;
		if (modifiers !== null && modifiers !== undefined) {
			return modifiers;
		}
		var domEvent = this.getElement();
		if (domEvent) {
			modifiers = (domEvent.shiftKey ? (jsuis.lf.InputEvent.SHIFT_MASK | jsuis.lf.InputEvent.SHIFT_DOWN_MASK) : 0)
			| (domEvent.ctrlKey ? (jsuis.lf.InputEvent.CTRL_MASK | jsuis.lf.InputEvent.CTRL_DOWN_MASK) : 0)
			| (domEvent.altKey ? (jsuis.lf.InputEvent.ALT_MASK | jsuis.lf.InputEvent.ALT_DOWN_MASK) : 0)
			| (domEvent.metaKey ? (jsuis.lf.InputEvent.META_MASK | jsuis.lf.InputEvent.META_DOWN_MASK) : 0);
			this.setModifiers(modifiers);
		}
		return modifiers;
	}
}) (jsuis);
