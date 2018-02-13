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
	
	jsuis.defaultlf.Event.prototype.preventDefault = function() {
		var domEvent = this.getDomEvent();
		if (domEvent) {
			domEvent.preventDefault();
		}
	}
	
	jsuis.defaultlf.Event.prototype.stopPropagation = function() {
		var domEvent = this.getDomEvent();
		if (domEvent) {
			domEvent.stopPropagation();
		}
	}
}) (jsuis);
