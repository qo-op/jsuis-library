/**
 * jsuis.lf.BrowserWindow
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.lf.BrowserWindow = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
		this.setElement(window);
		this.setEventListeners({});
		this.setComponentListeners([]);
		this.setMouseListeners([]);
		this.setMouseMotionListeners([]);
		if ("onpointerdown" in window) {
			this.setEventListener("pointerdown", function(domEvent) {
				jsuis.lf.BrowserWindow.getInstance().fireMousePressed(domEvent);
			});
		} else {
			this.setEventListener("mousedown", function(domEvent) {
				jsuis.lf.BrowserWindow.getInstance().fireMousePressed(domEvent);
			});
		}
		if ("onpointerup" in window) {
			this.setEventListener("pointerup", function(domEvent) {
				jsuis.lf.BrowserWindow.getInstance().fireMouseReleased(domEvent);
			});
		} else {
			this.setEventListener("mouseup", function(domEvent) {
				jsuis.lf.BrowserWindow.getInstance().fireMouseReleased(domEvent);
			});
		}
		if ("onpointermove" in window) {
			this.setEventListener("pointermove", function(domEvent) {
				var browserWindow = jsuis.lf.BrowserWindow.getInstance();
				if (browserWindow.isPressed()) {
					browserWindow.fireMouseDragged(domEvent);
				}
			});
		} else {
			this.setEventListener("mousemove", function(domEvent) {
				var browserWindow = jsuis.lf.BrowserWindow.getInstance();
				if (browserWindow.isPressed()) {
					browserWindow.fireMouseDragged(domEvent);
				}
			});
		}
	});
	jsuis.Object.addProperties(jsuis.lf.BrowserWindow, {
		eventListeners: null,
		componentListeners: null,
		mouseListeners: null,
		mouseMotionListeners: null
	});
	var instance;
	jsuis.lf.BrowserWindow.getInstance = function() {
		if (!instance) {
			instance = new jsuis.lf.BrowserWindow();
		}
		return instance;
	}
	jsuis.lf.BrowserWindow.prototype.getEventListener = function(type) {
		var eventListeners = this.getEventListeners();
		return eventListeners["on" + type];
	}
	jsuis.lf.BrowserWindow.prototype.setEventListener = function(type, eventListener) {
		var oldEventListener = this.getEventListener(type);
		if (oldEventListener) {
			this.removeEventListener(type, oldEventListener);
		}
		this.addEventListener(type, eventListener);
		var eventListeners = this.getEventListeners();
		eventListeners["on" + type] = eventListener;
		return this;
	}
	jsuis.lf.BrowserWindow.prototype.addEventListener = function(type, eventListener) {
		var element = this.getElement();
		element.addEventListener(type, eventListener);
	}
	jsuis.lf.BrowserWindow.prototype.removeEventListener = function(type, eventListener) {
		var element = this.getElement();
		element.removeEventListener(type, eventListener);
	}
	jsuis.lf.BrowserWindow.prototype.addComponentListener = function(componentListener) {
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
	jsuis.lf.BrowserWindow.prototype.removeComponentListener = function(componentListener) {
		var componentListeners = this.getComponentListeners();
		var index = componentListeners.indexOf(componentListener);
		if (index !== -1) {
			componentListeners.splice(index, 1);
		}
	}
	jsuis.lf.BrowserWindow.prototype.fireComponentResized = function(domEvent) {
		var event = new jsuis.lf.ComponentEvent(domEvent).setSource(this).setId(jsuis.Constants.COMPONENT_RESIZED);
		var componentListeners = this.getComponentListeners();
		for (var i = 0; i < componentListeners.length; i++) {
			var componentListener = componentListeners[i];
			componentListener.componentResized(event);
		}
	}
	jsuis.lf.BrowserWindow.prototype.isPressed = function() {
		return this.pressed;
	}
	jsuis.lf.BrowserWindow.prototype.setPressed = function(pressed) {
		this.pressed = pressed;
		return this;
	}
	jsuis.lf.BrowserWindow.prototype.addMouseListener = function(mouseListener) {
		var mouseListeners = this.getMouseListeners();
		mouseListeners.push(mouseListener);
	}
	jsuis.lf.BrowserWindow.prototype.removeMouseListener = function(mouseListener) {
		var mouseListeners = this.getMouseListeners();
		var index = mouseListeners.indexOf(mouseListener);
		if (index !== -1) {
			mouseListeners.splice(index, 1);
		}
	}
	jsuis.lf.BrowserWindow.prototype.fireMousePressed = function(domEvent) {
		this.setPressed(true);
	}
	jsuis.lf.BrowserWindow.prototype.fireMouseReleased = function(domEvent) {
		this.setPressed(false);
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_RELEASED);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseReleased(mouseEvent);
		}
	}
	jsuis.lf.BrowserWindow.prototype.addMouseMotionListener = function(mouseMotionListener) {
		var mouseMotionListeners = this.getMouseMotionListeners();
		mouseMotionListeners.push(mouseMotionListener);
	}
	jsuis.lf.BrowserWindow.prototype.removeMouseMotionListener = function(mouseMotionListener) {
		var mouseMotionListeners = this.getMouseMotionListeners();
		var index = mouseMotionListeners.indexOf(mouseMotionListener);
		if (index !== -1) {
			mouseMotionListeners.splice(index, 1);
		}
	}
	jsuis.lf.BrowserWindow.prototype.fireMouseDragged = function(domEvent) {
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_DRAGGED);
		var mouseMotionListeners = this.getMouseMotionListeners();
		for (var i = 0; i < mouseMotionListeners.length; i++) {
			var mouseMotionListener = mouseMotionListeners[i];
			mouseMotionListener.mouseDragged(mouseEvent);
		}
	}
}) (jsuis);
