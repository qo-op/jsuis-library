/**
 * jsuis.Event
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Event = jsuis.Object.extend(SUPER, function(source, id, when, modifiers) {
		SUPER.prototype.constructor.call(this);
		this.setSource(source);
		this.setId(id);
		this.setWhen(when);
		this.setModifiers(modifiers);
	});
	jsuis.Object.addProperties(jsuis.Event,
			new jsuis.Property("domEvent"),
			new jsuis.Property("source"),
			new jsuis.Property("id"),
			new jsuis.Property("when"),
			new jsuis.Property("modifiers")
	);
	
	jsuis.Event.prototype.setComponent = jsuis.Event.prototype.setSource;
	jsuis.Event.prototype.getComponent = jsuis.Event.prototype.getSource;
	
	jsuis.Event.prototype.stopPropagation = function() {
		var domEvent = this.getDomEvent();
		if (domEvent) {
			domEvent.stopPropagation();
		}
	}
	
	jsuis.Event.prototype.getWhen = function() {
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
	
	jsuis.Event.prototype.getModifiers = function() {
		var modifiers = this.modifiers;
		if (modifiers !== null && modifiers !== undefined) {
			return modifiers;
		}
		var domEvent = this.getDomEvent();
		if (domEvent) {
			modifiers = (domEvent.shiftKey ? (jsuis.Event.SHIFT_MASK | jsuis.Event.SHIFT_DOWN_MASK) : 0)
			| (domEvent.ctrlKey ? (jsuis.Event.CTRL_MASK | jsuis.Event.CTRL_DOWN_MASK) : 0)
			| (domEvent.metaKey ? (jsuis.Event.META_MASK | jsuis.Event.META_DOWN_MASK) : 0)
			| (domEvent.altKey ? (jsuis.Event.ALT_MASK | jsuis.Event.ALT_DOWN_MASK) : 0);
			this.setModifiers(modifiers);
		}
		return modifiers;
	}
	
	jsuis.Event.SHIFT_MASK = 1;
	jsuis.Event.CTRL_MASK = 2;
	jsuis.Event.META_MASK = 4;
	jsuis.Event.ALT_MASK = 8;
	
	jsuis.Event.SHIFT_DOWN_MASK = 64;
	jsuis.Event.CTRL_DOWN_MASK = 128;
	jsuis.Event.META_DOWN_MASK = 256;
	jsuis.Event.ALT_DOWN_MASK = 512;
	
}) (jsuis);
