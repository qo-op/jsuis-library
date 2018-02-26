/**
 * jsuis.defaultlf.BrowserWindow
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.defaultlf.BrowserWindow = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
		this.setElement(window);
		this.setEventListeners({});
		this.setComponentListeners([]);
		this.setMouseListeners([]);
		this.setMouseMotionListeners([]);
		
		this.setEventListener("mousedown", function(domEvent) {
			jsuis.defaultlf.BrowserWindow.getInstance().fireMousePressed(domEvent);
		});
		this.setEventListener("mouseup", function(domEvent) {
			jsuis.defaultlf.BrowserWindow.getInstance().fireMouseReleased(domEvent);
		});
		this.setEventListener("mousemove", function(domEvent) {
			var browserWindow = jsuis.defaultlf.BrowserWindow.getInstance();
			if (browserWindow.isPressed()) {
				browserWindow.fireMouseDragged(domEvent);
			}
		});
	});
	jsuis.Object.addProperties(jsuis.defaultlf.BrowserWindow, {
		eventListeners: null,
		componentListeners: null,
		mouseListeners: null,
		mouseMotionListeners: null
	});
	var instance;
	jsuis.defaultlf.BrowserWindow.getInstance = function() {
		if (!instance) {
			instance = new jsuis.defaultlf.BrowserWindow();
		}
		return instance;
	}
	jsuis.defaultlf.BrowserWindow.prototype.getEventListener = function(type) {
		var eventListeners = this.getEventListeners();
		return eventListeners["on" + type];
	}
	jsuis.defaultlf.BrowserWindow.prototype.setEventListener = function(type, eventListener) {
		var oldEventListener = this.getEventListener(type);
		if (oldEventListener) {
			this.removeEventListener(type, oldEventListener);
		}
		this.addEventListener(type, eventListener);
		var eventListeners = this.getEventListeners();
		eventListeners["on" + type] = eventListener;
		return this;
	}
	jsuis.defaultlf.BrowserWindow.prototype.addEventListener = function(type, eventListener) {
		var element = this.getElement();
		element.addEventListener(type, eventListener);
	}
	jsuis.defaultlf.BrowserWindow.prototype.removeEventListener = function(type, eventListener) {
		var element = this.getElement();
		element.removeEventListener(type, eventListener);
	}
	jsuis.defaultlf.BrowserWindow.prototype.addComponentListener = function(componentListener) {
		var componentListeners = this.getComponentListeners();
		componentListeners.push(componentListener);
		var component = this;
		var listener = componentListener.getListener();
		if (listener.componentResized) {
			var onresize = this.getEventListener("resize");
			if (!onresize) {
				this.setEventListener("resize", function(event) {
					component.fireComponentResized(event);
				});
			}
		}
	}
	jsuis.defaultlf.BrowserWindow.prototype.removeComponentListener = function(componentListener) {
		var componentListeners = this.getComponentListeners();
		var index = componentListeners.indexOf(componentListener);
		if (index !== -1) {
			componentListeners.splice(index, 1);
		}
	}
	jsuis.defaultlf.BrowserWindow.prototype.fireComponentResized = function(domEvent) {
		var event = new jsuis.defaultlf.ComponentEvent(this, jsuis.Constants.COMPONENT_RESIZED).setDomEvent(domEvent);
		var componentListeners = this.getComponentListeners();
		for (var i = 0; i < componentListeners.length; i++) {
			var componentListener = componentListeners[i];
			componentListener.componentResized(event);
		}
	}
	jsuis.defaultlf.BrowserWindow.prototype.isPressed = function() {
		return this.pressed;
	}
	jsuis.defaultlf.BrowserWindow.prototype.setPressed = function(pressed) {
		this.pressed = pressed;
		return this;
	}
	jsuis.defaultlf.BrowserWindow.prototype.addMouseListener = function(mouseListener) {
		var mouseListeners = this.getMouseListeners();
		mouseListeners.push(mouseListener);
	}
	jsuis.defaultlf.BrowserWindow.prototype.removeMouseListener = function(mouseListener) {
		var mouseListeners = this.getMouseListeners();
		var index = mouseListeners.indexOf(mouseListener);
		if (index !== -1) {
			mouseListeners.splice(index, 1);
		}
	}
	jsuis.defaultlf.BrowserWindow.prototype.fireMousePressed = function(domEvent) {
		this.setPressed(true);
	}
	jsuis.defaultlf.BrowserWindow.prototype.fireMouseReleased = function(domEvent) {
		this.setPressed(false);
		var mouseEvent = new jsuis.defaultlf.MouseEvent(this, jsuis.Constants.MOUSE_RELEASED).setDomEvent(domEvent);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseReleased(mouseEvent);
		}
	}
	jsuis.defaultlf.BrowserWindow.prototype.addMouseMotionListener = function(mouseMotionListener) {
		var mouseMotionListeners = this.getMouseMotionListeners();
		mouseMotionListeners.push(mouseMotionListener);
	}
	jsuis.defaultlf.BrowserWindow.prototype.removeMouseMotionListener = function(mouseMotionListener) {
		var mouseMotionListeners = this.getMouseMotionListeners();
		var index = mouseMotionListeners.indexOf(mouseMotionListener);
		if (index !== -1) {
			mouseMotionListeners.splice(index, 1);
		}
	}
	jsuis.defaultlf.BrowserWindow.prototype.fireMouseDragged = function(domEvent) {
		var mouseEvent = new jsuis.defaultlf.MouseEvent(this, jsuis.Constants.MOUSE_DRAGGED).setDomEvent(domEvent);
		var mouseMotionListeners = this.getMouseMotionListeners();
		for (var i = 0; i < mouseMotionListeners.length; i++) {
			var mouseMotionListener = mouseMotionListeners[i];
			mouseMotionListener.mouseDragged(mouseEvent);
		}
	}
}) (jsuis);
