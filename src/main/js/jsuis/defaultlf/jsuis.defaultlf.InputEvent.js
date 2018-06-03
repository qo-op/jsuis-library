/**
 * jsuis.defaultlf.InputEvent
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.ComponentEvent;
	jsuis.defaultlf.InputEvent = jsuis.Object.extend(SUPER, function(event) {
		SUPER.prototype.constructor.call(this, event);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.InputEvent, {
		when: 0,
		modifiers: 0
	});
	
	jsuis.defaultlf.InputEvent.SHIFT_MASK = 1;
	jsuis.defaultlf.InputEvent.CTRL_MASK = 2;
	jsuis.defaultlf.InputEvent.META_MASK = 4;
	jsuis.defaultlf.InputEvent.ALT_MASK = 8;
	
	jsuis.defaultlf.InputEvent.SHIFT_DOWN_MASK = 64;
	jsuis.defaultlf.InputEvent.CTRL_DOWN_MASK = 128;
	jsuis.defaultlf.InputEvent.META_DOWN_MASK = 256;
	jsuis.defaultlf.InputEvent.ALT_DOWN_MASK = 512;
	
	jsuis.defaultlf.InputEvent.prototype.getWhen = function() {
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
	jsuis.defaultlf.InputEvent.prototype.getModifiers = function() {
		var modifiers = this.modifiers;
		if (modifiers !== null && modifiers !== undefined) {
			return modifiers;
		}
		var domEvent = this.getElement();
		if (domEvent) {
			modifiers = (domEvent.shiftKey ? (jsuis.defaultlf.InputEvent.SHIFT_MASK | jsuis.defaultlf.InputEvent.SHIFT_DOWN_MASK) : 0)
			| (domEvent.ctrlKey ? (jsuis.defaultlf.InputEvent.CTRL_MASK | jsuis.defaultlf.InputEvent.CTRL_DOWN_MASK) : 0)
			| (domEvent.altKey ? (jsuis.defaultlf.InputEvent.ALT_MASK | jsuis.defaultlf.InputEvent.ALT_DOWN_MASK) : 0)
			| (domEvent.metaKey ? (jsuis.defaultlf.InputEvent.META_MASK | jsuis.defaultlf.InputEvent.META_DOWN_MASK) : 0);
			this.setModifiers(modifiers);
		}
		return modifiers;
	}
}) (jsuis);
