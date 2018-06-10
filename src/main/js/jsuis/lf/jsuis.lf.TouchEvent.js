/**
 * jsuis.lf.TouchEvent
 */
(function(jsuis) {
	var SUPER = jsuis.lf.InputEvent;
	jsuis.lf.TouchEvent = jsuis.Object.extend(SUPER, function(event) {
		SUPER.prototype.constructor.call(this, event);
	});
	jsuis.Object.addProperties(jsuis.lf.TouchEvent, {
		touches: null,
		x: 0,
		y: 0
	});
	jsuis.lf.TouchEvent.prototype.getTouches = function() {
		var touches = this.touches;
		if (touches !== null && touches !== undefined) {
			return touches;
		}
		touches = [];
		var domEvent = this.getElement();
		var touchList = domEvent.touches;
		for (var i = 0; i < touchList.length; i++) {
			touches.push(touchList.item(i));
		}
		this.setTouches(touches);
		return touches;
	}
	jsuis.lf.TouchEvent.prototype.getTouch = function() {
		var source = this.getSource();
		var sourceElement = source.getElement();
		var touches = this.getTouches();
		for (var i = 0; i < touches.length; i++) {
			var touch = touches[i];
			if (touch.target === sourceElement) {
				return touch;
			}
		}
		return touches[0];
	}
	jsuis.lf.TouchEvent.prototype.getPoint = function() {
		var x = this.x;
		var y = this.y;
		if (x !== null && x !== undefined && y !== null && y !== undefined) {
			return new jsuis.Point(x, y);
		}
		var touch = this.getTouch();
		var source = this.getSource();
		var boundingClientRect = source.getElement().getBoundingClientRect();
		var outsets = source.getOutsets();
		x = nvl(x, touch.clientX - boundingClientRect.left + outsets.getLeft());
		y = nvl(y, touch.clientY - boundingClientRect.top + outsets.getTop());
		this.setX(x).setY(y);
		return new jsuis.Point(x, y);
	}
	jsuis.lf.TouchEvent.prototype.getX = function() {
		var point = this.getPoint();
		return point.getX();
	}
	jsuis.lf.TouchEvent.prototype.getY = function() {
		var point = this.getPoint();
		return point.getY();
	}
}) (jsuis);
