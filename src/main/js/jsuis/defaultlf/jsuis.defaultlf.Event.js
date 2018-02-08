/**
 * jsuis.defaultlf.Event
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.defaultlf.Event = jsuis.Object.extend(SUPER, function(source, id, when, modifiers) {
		SUPER.prototype.constructor.call(this);
		this.setSource(source);
		this.setId(id);
		this.setWhen(when);
		this.setModifiers(modifiers);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Event,
			new jsuis.Property("domEvent"),
			new jsuis.Property("source"),
			new jsuis.Property("id"),
			new jsuis.Property("when"),
			new jsuis.Property("modifiers")
	);
	
	jsuis.defaultlf.Event.prototype.setComponent = jsuis.defaultlf.Event.prototype.setSource;
	jsuis.defaultlf.Event.prototype.getComponent = jsuis.defaultlf.Event.prototype.getSource;
	
	jsuis.defaultlf.Event.prototype.stopPropagation = function() {
		var domEvent = this.getDomEvent();
		if (domEvent) {
			domEvent.stopPropagation();
		}
	}
	
	jsuis.defaultlf.Event.prototype.getWhen = function() {
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
	
	jsuis.defaultlf.Event.prototype.getModifiers = function() {
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
	
	jsuis.defaultlf.Event.SHIFT_MASK = 1;
	jsuis.defaultlf.Event.CTRL_MASK = 2;
	jsuis.defaultlf.Event.META_MASK = 4;
	jsuis.defaultlf.Event.ALT_MASK = 8;
	
	jsuis.defaultlf.Event.SHIFT_DOWN_MASK = 64;
	jsuis.defaultlf.Event.CTRL_DOWN_MASK = 128;
	jsuis.defaultlf.Event.META_DOWN_MASK = 256;
	jsuis.defaultlf.Event.ALT_DOWN_MASK = 512;
	
}) (jsuis);
