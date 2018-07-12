/**
 * jsuis.lf.MouseEvent
 */
(function(jsuis) {
	var SUPER = jsuis.lf.InputEvent;
	jsuis.lf.MouseEvent = jsuis.Object.extend(SUPER, function(event) {
		SUPER.prototype.constructor.call(this, event);
	});
	jsuis.Object.addProperties(jsuis.lf.MouseEvent, {
		x: 0,
		y: 0,
		xAbs: 0,
		yAbs: 0,
		clickCount: 0,
		popupTrigger: null,
		button: null
	});
	jsuis.lf.MouseEvent.prototype.getPoint = function() {
		var x = this.x;
		var y = this.y;
		if (x !== null && x !== undefined && y !== null && y !== undefined) {
			return new jsuis.Point(x, y);
		}
		var domEvent = this.getElement();
		var source = this.getSource();
		var boundingClientRect = source.getElement().getBoundingClientRect();
		/*
		var outsets = source.getOutsets();
		x = nvl(x, domEvent.clientX - boundingClientRect.left + outsets.getLeft());
		y = nvl(y, domEvent.clientY - boundingClientRect.top + outsets.getTop());
		*/
		x = nvl(x, domEvent.clientX - boundingClientRect.left);
		y = nvl(y, domEvent.clientY - boundingClientRect.top);
		this.setX(x).setY(y);
		return new jsuis.Point(x, y);
	}
	jsuis.lf.MouseEvent.prototype.getX = function() {
		var point = this.getPoint();
		return point.getX();
	}
	jsuis.lf.MouseEvent.prototype.getY = function() {
		var point = this.getPoint();
		return point.getY();
	}
	jsuis.lf.MouseEvent.prototype.getLocationOnScreen = function() {
		var xAbs = this.xAbs;
		var yAbs = this.yAbs;
		if (xAbs !== null && xAbs !== undefined && yAbs !== null && yAbs !== undefined) {
			return new jsuis.Point(xAbs, yAbs);
		}
		var domEvent = this.getElement();
		xAbs = nvl(xAbs, domEvent.screenX);
		yAbs = nvl(yAbs, domEvent.screenY);
		this.setXAbs(xAbs).setYAbs(yAbs);
		return new jsuis.Point(xAbs, yAbs);
	}
	jsuis.lf.MouseEvent.prototype.getXOnScreen = function() {
		var locationOnScreen = this.getLocationOnScreen();
		return locationOnScreen.getX();
	}
	jsuis.lf.MouseEvent.prototype.getYOnScreen = function() {
		var locationOnScreen = this.getLocationOnScreen();
		return locationOnScreen.getY();
	}
	jsuis.lf.MouseEvent.prototype.getClickCount = function() {
		var clickCount = this.clickCount;
		if (clickCount !== null && clickCount !== undefined) {
			return clickCount;
		}
		var domEvent = this.getElement();
		clickCount = domEvent.detail;
		this.setClickCount(clickCount);
		return clickCount;
	}
	jsuis.lf.MouseEvent.prototype.getPopupTrigger = function() {
		var popupTrigger = this.popupTrigger;
		if (popupTrigger !== null && popupTrigger !== undefined) {
			return popupTrigger;
		}
		var button = this.getButton();
		popupTrigger = (button === 3);
		this.setPopupTrigger(popupTrigger);
		return popupTrigger;
	}
	jsuis.lf.MouseEvent.prototype.getButton = function() {
		var button = this.button;
		if (button !== null && button !== undefined) {
			return button;
		}
		var domEvent = this.getElement();
		button = domEvent.button + 1;
		this.setButton(button);
		return button;
	}
}) (jsuis);
