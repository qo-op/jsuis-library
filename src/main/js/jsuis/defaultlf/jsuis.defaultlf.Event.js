/**
 * jsuis.defaultlf.Event
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.defaultlf.Event = jsuis.Object.extend(SUPER, function(event) {
		SUPER.prototype.constructor.call(this);
		this.setElement(event);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Event, {
		source: null,
		id: null
	});
	
	jsuis.defaultlf.Event.prototype.setComponent = jsuis.defaultlf.Event.prototype.setSource;
	jsuis.defaultlf.Event.prototype.getComponent = jsuis.defaultlf.Event.prototype.getSource;
	
	jsuis.defaultlf.Event.prototype.preventDefault = function() {
		var element = this.getElement();
		if (element) {
			element.preventDefault();
		}
	}
	
	jsuis.defaultlf.Event.prototype.stopPropagation = function() {
		var element = this.getElement();
		if (element) {
			element.stopPropagation();
		}
	}
}) (jsuis);
