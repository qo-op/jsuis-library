/**
 * jsuis.defaultlf.MouseEvent
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.InputEvent;
	jsuis.defaultlf.MouseEvent = jsuis.Object.extend(SUPER, function(source, id,
			when, modifiers, x, y, xAbs, yAbs, clickCount, popupTrigger, button) {
		SUPER.prototype.constructor.call(this, source, id, when, modifiers);
		this.setX(x);
		this.setY(y);
		this.setXAbs(xAbs);
		this.setYAbs(yAbs);
		this.setClickCount(clickCount);
		this.setPopupTrigger(popupTrigger);
		this.setButton(button);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.MouseEvent, {
		x: 0,
		y: 0,
		xAbs: 0,
		yAbs: 0,
		clickCount: 0,
		popupTrigger: null,
		button: null
	});
	jsuis.defaultlf.MouseEvent.prototype.getPoint = function() {
		var x = this.x;
		var y = this.y;
		if (x !== null && x !== undefined && y !== null && y !== undefined) {
			return new jsuis.Point(x, y);
		}
		var domEvent = this.getDomEvent();
		var source = this.getSource();
		var boundingClientRect = source.getElement().getBoundingClientRect();
		var outsets = source.getOutsets();
		x = nvl(x, domEvent.clientX - boundingClientRect.left + outsets.getLeft());
		y = nvl(y, domEvent.clientY - boundingClientRect.top + outsets.getTop());
		this.setX(x).setY(y);
		return new jsuis.Point(x, y);
	}
	jsuis.defaultlf.MouseEvent.prototype.getX = function() {
		var point = this.getPoint();
		return point.getX();
	}
	jsuis.defaultlf.MouseEvent.prototype.getY = function() {
		var point = this.getPoint();
		return point.getY();
	}
	jsuis.defaultlf.MouseEvent.prototype.getLocationOnScreen = function() {
		var xAbs = this.xAbs;
		var yAbs = this.yAbs;
		if (xAbs !== null && xAbs !== undefined && yAbs !== null && yAbs !== undefined) {
			return new jsuis.Point(xAbs, yAbs);
		}
		var domEvent = this.getDomEvent();
		xAbs = nvl(xAbs, domEvent.screenX);
		yAbs = nvl(yAbs, domEvent.screenY);
		this.setXAbs(xAbs).setYAbs(yAbs);
		return new jsuis.Point(xAbs, yAbs);
	}
	jsuis.defaultlf.MouseEvent.prototype.getXOnScreen = function() {
		var locationOnScreen = this.getLocationOnScreen();
		return locationOnScreen.getX();
	}
	jsuis.defaultlf.MouseEvent.prototype.getYOnScreen = function() {
		var locationOnScreen = this.getLocationOnScreen();
		return locationOnScreen.getY();
	}
	jsuis.defaultlf.MouseEvent.prototype.getClickCount = function() {
		var clickCount = this.clickCount;
		if (clickCount !== null && clickCount !== undefined) {
			return clickCount;
		}
		var domEvent = this.getDomEvent();
		clickCount = domEvent.detail;
		this.setClickCount(clickCount);
		return clickCount;
	}
	jsuis.defaultlf.MouseEvent.prototype.getPopupTrigger = function() {
		var popupTrigger = this.popupTrigger;
		if (popupTrigger !== null && popupTrigger !== undefined) {
			return popupTrigger;
		}
		var button = this.getButton();
		popupTrigger = (button === 3);
		this.setPopupTrigger(popupTrigger);
		return popupTrigger;
	}
	jsuis.defaultlf.MouseEvent.prototype.getButton = function() {
		var button = this.button;
		if (button !== null && button !== undefined) {
			return button;
		}
		var domEvent = this.getDomEvent();
		button = domEvent.button + 1;
		this.setButton(button);
		return button;
	}
}) (jsuis);
