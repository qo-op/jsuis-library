/**
 * jsuis.defaultlf.TouchEvent
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.InputEvent;
	jsuis.defaultlf.TouchEvent = jsuis.Object.extend(SUPER, function(source, id,
			when, modifiers, touches) {
		SUPER.prototype.constructor.call(this, source, id, when, modifiers);
		this.setTouches(touches);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.TouchEvent, {
		touches: null,
		x: 0,
		y: 0
	});
	jsuis.defaultlf.TouchEvent.prototype.getTouches = function() {
		var touches = this.touches;
		if (touches !== null && touches !== undefined) {
			return touches;
		}
		touches = [];
		var domEvent = this.getDomEvent();
		var touchList = domEvent.touches;
		for (var i = 0; i < touchList.length; i++) {
			touches.push(touchList.item(i));
		}
		this.setTouches(touches);
		return touches;
	}
	jsuis.defaultlf.TouchEvent.prototype.getTouch = function() {
		var source = this.getSource();
		var graphics = source.getGraphics();
		var graphicsElement = graphics.getElement();
		var touches = this.getTouches();
		for (var i = 0; i < touches.length; i++) {
			var touch = touches[i];
			if (touch.target === graphicsElement) {
				return touch;
			}
		}
		return touches[0];
	}
	jsuis.defaultlf.TouchEvent.prototype.getPoint = function() {
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
	jsuis.defaultlf.TouchEvent.prototype.getX = function() {
		var point = this.getPoint();
		return point.getX();
	}
	jsuis.defaultlf.TouchEvent.prototype.getY = function() {
		var point = this.getPoint();
		return point.getY();
	}
}) (jsuis);
