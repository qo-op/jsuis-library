/**
 * jsuis.defaultlf.Event
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.defaultlf.Event = jsuis.Object.extend(SUPER, function(source, id) {
		SUPER.prototype.constructor.call(this);
		this.setSource(source);
		this.setId(id);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Event,
			new jsuis.Property("domEvent"),
			new jsuis.Property("source"),
			new jsuis.Property("id")
	);
	
	jsuis.defaultlf.Event.prototype.setComponent = jsuis.defaultlf.Event.prototype.setSource;
	jsuis.defaultlf.Event.prototype.getComponent = jsuis.defaultlf.Event.prototype.getSource;
	
	jsuis.defaultlf.Event.prototype.stopPropagation = function() {
		var domEvent = this.getDomEvent();
		if (domEvent) {
			domEvent.stopPropagation();
		}
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
