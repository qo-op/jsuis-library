/**
 * jsuis.lf.Event
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.lf.Event = jsuis.Object.extend(SUPER, function(event) {
		SUPER.prototype.constructor.call(this);
		this.setElement(event);
	});
	jsuis.Object.addProperties(jsuis.lf.Event, {
		source: null,
		id: null
	});
	
	jsuis.lf.Event.prototype.setComponent = jsuis.lf.Event.prototype.setSource;
	jsuis.lf.Event.prototype.getComponent = jsuis.lf.Event.prototype.getSource;
	
	jsuis.lf.Event.prototype.preventDefault = function() {
		var element = this.getElement();
		if (element) {
			element.preventDefault();
		}
	}
	
	jsuis.lf.Event.prototype.stopPropagation = function() {
		var element = this.getElement();
		if (element) {
			element.stopPropagation();
		}
	}
}) (jsuis);
