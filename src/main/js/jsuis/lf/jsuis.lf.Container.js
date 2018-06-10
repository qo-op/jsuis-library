/**
 * jsuis.lf.Container
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.lf.Container = jsuis.Object.extend(SUPER, function(element) {
		SUPER.prototype.constructor.call(this);
		this.setElement(element);
		this.addClass(this.getClassName());
		this.setComponents([]);
		this.setEventListeners({});
		this.setComponentListeners([]);
		this.setMouseListeners([]);
		this.setMouseMotionListeners([]);
		this.setTouchListeners([]);
		this.setFocusListeners([]);
		this.setActionListeners([]);
	});
	jsuis.Object.addProperties(jsuis.lf.Container, {
		components: null,
		parent: null,
		layout: null,
		constraints: null,
		horizontalAlignment: null,
		graphics: null,
		eventListeners: null,
		componentListeners: null,
		mouseListeners: null,
		mouseMotionListeners: null,
		touchListeners: null,
		focusListeners: null,
		actionListeners: null,
		actionCommand: null,
		action: null
	});
	jsuis.lf.Container.prototype.getPeer = function() {
		return this;
	}
	jsuis.lf.Container.prototype.addClass = function(name) {
		var value = this.getAttribute("class");
		var classes = value ? value.split(" ") : [];
		if (classes.indexOf(name) === -1) {
			classes.push(name);
			var value = classes.join(" ");
			this.setAttribute("class", value);
		}
	}
	jsuis.lf.Container.prototype.getAttribute = function(attribute) {
		var element = this.getElement();
		return element.getAttribute(attribute);
	}
	jsuis.lf.Container.prototype.setAttribute = function(attribute, value) {
		var element = this.getElement();
		if ((value === null) || (value === undefined)) {
			element.removeAttribute(attribute);
			return this;
		}
		element.setAttribute(attribute, value);
		return this;
	}
	jsuis.lf.Container.prototype.setStyleProperty = function(property, value) {
		var element = this.getElement();
		element.style[property] = value;
		return this;
	}
	jsuis.lf.Container.prototype.getStyleProperty = function(property) {
		var element = this.getElement();
		var computedStyle = getComputedStyle(element);
		return computedStyle[property];
	}
	jsuis.lf.Container.prototype.setProperty = function(property, value) {
		var element = this.getElement();
		element[property] = value;
		return this;
	}
	jsuis.lf.Container.prototype.getProperty = function(property) {
		var element = this.getElement();
		return element[property];
	}
	jsuis.lf.Container.prototype.addChild = function(component, constraints, index) {
		var components = this.getComponents();
		var referenceComponent;
		if (index !== undefined) {
			referenceComponent = components[index];
		}
		var element = this.getElement();
		var componentElement = component.getElement();
		var referenceElement;
		if (referenceComponent) {
			referenceElement = referenceComponent.getElement();
		}
		element.insertBefore(componentElement, referenceElement || null);
	}
	jsuis.lf.Container.prototype.removeChild = function(component) {
		var element = this.getElement();
		var componentElement = component.getElement();
		element.removeChild(componentElement);
	}
	jsuis.lf.Container.prototype.add = function(component, constraints, index) {
		component = component.getPeer();
		this.addChild(component, constraints, index);
		if (constraints !== null && constraints !== undefined) {
			if (constraints instanceof jsuis.Cloneable) {
				constraints = constraints.clone();
			}
			component.setConstraints(constraints);
		}
		component.setParent(this);
		var components = this.getComponents();
		if (index !== undefined) {
			components.splice(index, 0, component);
		} else {
			components.push(component);
		}
	}
	jsuis.lf.Container.prototype.remove = function(component) {
		component = component.getPeer();
		this.removeChild(component);
		component.setParent(undefined);
		var components = this.getComponents();
		var index = components.indexOf(component);
		if (index !== -1) {
			components.splice(index, 1);
		}
	}
	jsuis.lf.Container.prototype.removeAll = function() {
		var components = this.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			this.removeChild(component);
			component.setParent(undefined);
		}
		components.length = 0;
	}
	jsuis.lf.Container.prototype.getX = function() {
		return this.x || 0;
	}
	jsuis.lf.Container.prototype.setX = function(x) {
		this.x = x;
		var outsets = this.getOutsets();
		// x += outsets.getLeft();
		this.setStyleProperty("left", x + "px");
		return this;
	}
	jsuis.lf.Container.prototype.getY = function() {
		return this.y || 0;
	}
	jsuis.lf.Container.prototype.setY = function(y) {
		this.y = y;
		var outsets = this.getOutsets();
		// y += outsets.getTop();
		this.setStyleProperty("top", y + "px");
		return this;
	}
	jsuis.lf.Container.prototype.getOffsets = function() {
		var border = this.getBorder();
		if (border) {
			return border.getBorderOffsets(this);
		}
		return new jsuis.Insets();
	}
	jsuis.lf.Container.prototype.getLocation = function() {
		return new jsuis.Point(this.getX(), this.getY());
	}
	jsuis.lf.Container.prototype.setLocation = function(point) {
		var componentListeners = this.getComponentListeners();
		if (!componentListeners.length) {
			this.setX(point.getX());
			this.setY(point.getY());
		} else {
			var oldX = this.getX();
			var oldY = this.getY();
			var x = point.getX();
			var y = point.getY();
			this.setX(x);
			this.setY(y);
			if ((x !== oldX) || (y !== oldY)) {
				this.fireComponentMoved();
			}
		}
		return this;
	}
	jsuis.lf.Container.prototype.getWidth = function() {
		return this.width || 0;
	}
	jsuis.lf.Container.prototype.setWidth = function(width) {
		this.width = width;
		var outsets = this.getOutsets();
		// width -= outsets.getLeft() + outsets.getRight();
		var offsets = this.getOffsets();
		width -= offsets.getLeft() + offsets.getRight();
		if (width >= 0) {
			this.setStyleProperty("width", width + "px");
		}
		return this;
	}
	jsuis.lf.Container.prototype.getHeight = function() {
		return this.height || 0;
	}
	jsuis.lf.Container.prototype.setHeight = function(height) {
		this.height = height;
		var outsets = this.getOutsets();
		// height -= outsets.getTop() + outsets.getBottom();
		var offsets = this.getOffsets();
		height -= offsets.getTop() + offsets.getBottom();
		if (height >= 0) {
			this.setStyleProperty("height", height + "px");
		}
		return this;
	}
	jsuis.lf.Container.prototype.getMargin = function() {
		if (!this.margin) {
			this.margin = new jsuis.Insets();
		}
		return this.margin.clone();
	}
	jsuis.lf.Container.prototype.setMargin = function(margin) {
		if (!this.margin || margin) {
			this.margin = new jsuis.Insets();
		}
		if (margin) {
			this.margin
			.setTop(margin.getTop())
			.setLeft(margin.getLeft())
			.setBottom(margin.getBottom())
			.setRight(margin.getRight());
		}
		return this;
	}
	jsuis.lf.Container.prototype.getBorder = function() {
		return this.border;
	}
	jsuis.lf.Container.prototype.setBorder = function(border) {
		this.border = border;
		if (border) {
			border.paintBorder(this);
		}
		return this;
	}
	jsuis.lf.Container.prototype.setHtml = function(html) {
		var element = this.getElement();
		element.innerHTML = html;
		return this;
	}
	jsuis.lf.Container.prototype.getHtml = function() {
		var element = this.getElement();
		return element.innerHTML;
	}
	jsuis.lf.Container.prototype.setHorizontalAlignment = function(horizontalAlignment) {
		this.setStyleProperty("text-align", horizontalAlignment);
		this.horizontalAlignment = horizontalAlignment;
		return this;
	}
	jsuis.lf.Container.prototype.getPreferredSize = function() {
		var constraints = nvl(this.getConstraints(), new jsuis.Constraints());
		var layoutPaddingMargin = constraints.getPadding().add(constraints.getMargin());
		var preferredSize = this.preferredSize;
		if (preferredSize) {
			return preferredSize.add(
					layoutPaddingMargin.getDimension());
		}
		var layout = this.getLayout();
		if (layout) {
			var preferredLayoutSize = layout.preferredLayoutSize(this);
			return preferredLayoutSize;
		}
		var element = this.getElement();
		var bbox = element.getBoundingClientRect();
		return new jsuis.Dimension(Math.ceil(bbox.width), Math.ceil(bbox.height)).add(
				layoutPaddingMargin.getDimension());
	}
	jsuis.lf.Container.prototype.setPreferredSize = function(preferredSize) {
		this.preferredSize = preferredSize ? preferredSize.clone() : preferredSize;
		return this;
	}
	jsuis.lf.Container.prototype.getMinimumSize = function() {
		var minimumSize = this.minimumSize;
		if (minimumSize) {
			return minimumSize;
		}
		var layout = this.getLayout();
		if (layout) {
			var minimumLayoutSize = layout.minimumLayoutSize(this);
			return minimumLayoutSize;
		}
		return this.getPreferredSize();
	}
	jsuis.lf.Container.prototype.setMinimumSize = function(minimumSize) {
		this.minimumSize = minimumSize ? minimumSize.clone() : minimumSize;
		return this;
	}
	jsuis.lf.Container.prototype.getBounds = function() {
		return new jsuis.Rectangle(this.getX(), this.getY(), this.getWidth(), this.getHeight());
	}
	jsuis.lf.Container.prototype.setBounds = function(rectangle) {
		this.setLocation(rectangle.getPoint());
		this.setSize(rectangle.getDimension());
		return this;
	}
	jsuis.lf.Container.prototype.getPadding = function() {
		if (!this.padding) {
			this.padding = new jsuis.Insets();
		}
		return this.padding.clone();
	}
	jsuis.lf.Container.prototype.setPadding = function(padding) {
		if (!this.padding || padding) {
			this.padding = new jsuis.Insets();
		}
		if (padding) {
			this.padding
			.setTop(padding.getTop())
			.setLeft(padding.getLeft())
			.setBottom(padding.getBottom())
			.setRight(padding.getRight());
		}
		return this;
	}
	jsuis.lf.Container.prototype.getInsets = function() {
		var constraints = nvl(this.getConstraints(), new jsuis.Constraints());
		var insets = this.getPadding().add(constraints.getPadding());
		var border = this.getBorder();
		if (border) {
			return insets.add(border.getBorderInsets(this));
		}
		return insets;
	}
	jsuis.lf.Container.prototype.getOutsets = function() {
		var constraints = nvl(this.getConstraints(), new jsuis.Constraints());
		var outsets = this.getMargin().add(constraints.getMargin());
		var border = this.getBorder();
		if (border) {
			return outsets.add(border.getBorderOutsets(this));
		}
		return outsets;
	}
	jsuis.lf.Container.prototype.getSize = function() {
		return new jsuis.Dimension(this.getWidth(), this.getHeight());
	}
	jsuis.lf.Container.prototype.setSize = function(dimension) {
		this.setWidth(dimension.getWidth());
		this.setHeight(dimension.getHeight());
		return this;
	}
	jsuis.lf.Container.prototype.isLeftToRight = function() {
		return nvl(this.leftToRight, true);
	}
	jsuis.lf.Container.prototype.setLeftToRight = function(leftToRight) {
		this.leftToRight = leftToRight;
		return this;
	}
	jsuis.lf.Container.prototype.validate = function() {
		this.doLayout();
		var components = this.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			component.validate();
		}
	}
	jsuis.lf.Container.prototype.doLayout = function() {
		var layout = this.getLayout();
		if (layout) {
			layout.layoutContainer(this);
		}
	}
	jsuis.lf.Container.prototype.paint = function() {
		var border = this.getBorder();
		if (border) {
			border.paintBorder(this);
		}
		var components = this.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			try {
				component.paint();
			} catch (e) {
				console.log(component);
				console.log(e);
			}
		}
	}
	jsuis.lf.Container.prototype.isVisible = function() {
		return nvl(this.visible, true);
	}
	jsuis.lf.Container.prototype.setVisible = function(visible) {
		this.setStyleProperty("display", visible ? "" : "none");
		this.visible = visible;
		return this;
	}
	jsuis.lf.Container.prototype.getBackground = function() {
		return this.background;
	}
	jsuis.lf.Container.prototype.setBackground = function(background) {
		this.background = background;
		this.paint();
		return this;
	}
	jsuis.lf.Container.prototype.getForeground = function() {
		return this.foreground;
	}
	jsuis.lf.Container.prototype.setForeground = function(foreground) {
		this.foreground = foreground;
		this.paint();
		return this;
	}
	jsuis.lf.Container.prototype.getCursor = function() {
		return this.cursor;
	}
	jsuis.lf.Container.prototype.setCursor = function(cursor) {
		this.cursor = cursor;
		if (cursor) {
			this.setStyleProperty("cursor", nvl(cursor, "").toString());
		}
		return this;
	}
	jsuis.lf.Container.prototype.isPressed = function() {
		return this.pressed;
	}
	jsuis.lf.Container.prototype.setPressed = function(pressed) {
		this.pressed = pressed;
		return this;
	}
	jsuis.lf.Container.prototype.requestFocus = function() {
		var element = this.getElement();
		element.focus();
	}
	jsuis.lf.Container.prototype.getEventListener = function(type) {
		var eventListeners = this.getEventListeners();
		return eventListeners["on" + type];
	}
	jsuis.lf.Container.prototype.setEventListener = function(type, eventListener) {
		var oldEventListener = this.getEventListener(type);
		if (oldEventListener) {
			this.removeEventListener(type, oldEventListener);
		}
		this.addEventListener(type, eventListener);
		var eventListeners = this.getEventListeners();
		eventListeners["on" + type] = eventListener;
		return this;
	}
	jsuis.lf.Container.prototype.addEventListener = function(type, eventListener) {
		var element = this.getElement();
		element.addEventListener(type, eventListener);
	}
	jsuis.lf.Container.prototype.removeEventListener = function(type, eventListener) {
		var element = this.getElement();
		element.removeEventListener(type, eventListener);
	}
	jsuis.lf.Container.prototype.addComponentListener = function(componentListener) {
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
	jsuis.lf.Container.prototype.removeComponentListener = function(componentListener) {
		var componentListeners = this.getComponentListeners();
		var index = componentListeners.indexOf(componentListener);
		if (index !== -1) {
			componentListeners.splice(index, 1);
		}
	}
	jsuis.lf.Container.prototype.fireComponentResized = function(domEvent) {
		var event = new jsuis.lf.ComponentEvent(domEvent).setSource(this).setId(jsuis.Constants.COMPONENT_RESIZED);
		var componentListeners = this.getComponentListeners();
		for (var i = 0; i < componentListeners.length; i++) {
			var componentListener = componentListeners[i];
			componentListener.componentResized(event);
		}
	}
	jsuis.lf.Container.prototype.fireComponentMoved = function() {
		var event = new jsuis.lf.ComponentEvent().setSource(this).setId(jsuis.Constants.COMPONENT_MOVED);
		var componentListeners = this.getComponentListeners();
		for (var i = 0; i < componentListeners.length; i++) {
			var componentListener = componentListeners[i];
			componentListener.componentMoved(event);
		}
	}
	jsuis.lf.Container.prototype.addMouseAdapter = function(mouseAdapter) {
		var mouseListeners = this.getMouseListeners();
		var mouseMotionListeners = this.getMouseMotionListeners();
		// TODO MouseWheelListener
		if (mouseAdapter instanceof jsuis.MouseAdapter) {
			mouseListeners.push(mouseAdapter);
			mouseMotionListeners.push(mouseAdapter);
		} else if (mouseAdapter instanceof jsuis.MouseListener) {
			mouseListeners.push(mouseAdapter);
		} else if (mouseAdapter instanceof jsuis.MouseMotionListener) {
			mouseMotionListeners.push(mouseAdapter);
		} else {
			return;
		}
		var component = this;
		var listener = mouseAdapter.getListener();
		if (listener.mouseClicked) {
			var onclick = this.getEventListener("click");
			if (!onclick) {
				this.setEventListener("click", function(event) {
					component.fireMouseClicked(event);
				});
			}
			var ondblclick = this.getEventListener("dblclick");
			if (!ondblclick) {
				this.setEventListener("dblclick", function(event) {
					component.fireMouseDoubleClicked(event);
				});
			}
			var oncontextmenu = this.getEventListener("contextmenu");
			if (!oncontextmenu) {
				this.setEventListener("contextmenu", function(event) {
					component.fireMouseRightClicked(event);
				});
			}
		}
		if (listener.mousePressed || listener.mouseReleased || listener.mouseDragged) {
			var onmousedown = this.getEventListener("pointerdown");
			if (!onmousedown) {
				if ("onpointerdown" in window) {
					this.setEventListener("pointerdown", function(event) {
						component.fireMousePressed(event);
					});
				} else {
					this.setEventListener("mousedown", function(event) {
						component.fireMousePressed(event);
					});
				}
			}
			var browserWindow = jsuis.lf.BrowserWindow.getInstance();
			var browserWindowMouseListeners = browserWindow.getMouseListeners();
			var i = 0;
			for (; i < browserWindowMouseListeners.length; i++) {
				var browserWindowMouseListener = browserWindowMouseListeners[i];
				if (browserWindowMouseListener.getListenerComponent() === this) {
					break;
				}
			}
			if (i === browserWindowMouseListeners.length) {
				var mouseListener = new jsuis.MouseListener({
					mouseReleased: function(event) {
						var component = this.getListenerComponent();
						if (component.isPressed()) {
							component.fireMouseReleased(event.getElement());
						}
					}
				});
				mouseListener.setListenerComponent(this);
				browserWindow.addMouseListener(mouseListener);
			}
		}
		if (listener.mouseEntered) {
			var onmouseenter = this.getEventListener("pointerenter");
			if (!onmouseenter) {
				if ("onpointerenter" in window) {
					this.setEventListener("pointerenter", function(event) {
						component.fireMouseEntered(event);
					});
				} else {
					this.setEventListener("mouseenter", function(event) {
						component.fireMouseEntered(event);
					});
				}
			}
		}
		if (listener.mouseExited) {
			var onmouseleave = this.getEventListener("pointerleave");
			if (!onmouseleave) {
				if ("onpointerleave" in window) {
					this.setEventListener("pointerleave", function(event) {
						component.fireMouseExited(event);
					});
				} else {
					this.setEventListener("mouseleave", function(event) {
						component.fireMouseExited(event);
					});
				}
			}
		}
		if (listener.mouseMoved) {
			var onmousemove = this.getEventListener("pointermove");
			if (!onmousemove) {
				if ("onpointermove" in window) {
					this.setEventListener("pointermove", function(event) {
						component.fireMouseMoved(event);
					});
				} else {
					this.setEventListener("mousemove", function(event) {
						component.fireMouseMoved(event);
					});
				}
			}
		}
		if (listener.mouseDragged) {
			var browserWindow = jsuis.lf.BrowserWindow.getInstance();
			var browserWindowMouseMotionListeners = browserWindow.getMouseMotionListeners();
			var i = 0;
			for (; i < browserWindowMouseMotionListeners.length; i++) {
				var browserWindowMouseMotionListener = browserWindowMouseMotionListeners[i];
				if (browserWindowMouseMotionListener.getListenerComponent() === this) {
					break;
				}
			}
			if (i === browserWindowMouseMotionListeners.length) {
				var mouseMotionListener = new jsuis.MouseMotionListener({
					mouseDragged: function(event) {
						var component = this.getListenerComponent();
						if (component.isPressed()) {
							component.fireMouseDragged(event.getElement());
						}
					}
				});
				mouseMotionListener.setListenerComponent(this);
				browserWindow.addMouseMotionListener(mouseMotionListener);
			}
		}
	}
	jsuis.lf.Container.prototype.removeMouseAdapter = function(mouseAdapter) {
		this.removeMouseListener(mouseAdapter);
		this.removeMouseMotionListener(mouseAdapter);
	}
	jsuis.lf.Container.prototype.addMouseListener = function(mouseListener) {
		this.addMouseAdapter(mouseListener);
	}
	jsuis.lf.Container.prototype.removeMouseListener = function(mouseListener) {
		var mouseListeners = this.getMouseListeners();
		var index = mouseListeners.indexOf(mouseListener);
		if (index !== -1) {
			mouseListeners.splice(index, 1);
		}
	}
	jsuis.lf.Container.prototype.fireMouseClicked = function(domEvent) {
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_CLICKED);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseClicked(mouseEvent);
		}
	}
	jsuis.lf.Container.prototype.fireMouseDoubleClicked = function(domEvent) {
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_CLICKED).setClickCount(2);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseClicked(mouseEvent);
		}
	}
	jsuis.lf.Container.prototype.fireMouseRightClicked = function(domEvent) {
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_CLICKED).setPopupTrigger(true);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseClicked(mouseEvent);
		}
	}
	jsuis.lf.Container.prototype.fireMousePressed = function(domEvent) {
		this.setPressed(true);
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_PRESSED);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mousePressed(mouseEvent);
		}
	}
	jsuis.lf.Container.prototype.fireMouseReleased = function(domEvent) {
		this.setPressed(false);
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_RELEASED);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseReleased(mouseEvent);
		}
	}
	jsuis.lf.Container.prototype.fireMouseEntered = function(domEvent) {
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_ENTERED);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseEntered(mouseEvent);
		}
	}
	jsuis.lf.Container.prototype.fireMouseExited = function(domEvent) {
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_EXITED);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseExited(mouseEvent);
		}
	}
	jsuis.lf.Container.prototype.addMouseMotionListener = function(mouseMotionListener) {
		this.addMouseAdapter(mouseMotionListener);
	}
	jsuis.lf.Container.prototype.removeMouseMotionListener = function(mouseMotionListener) {
		var mouseMotionListeners = this.getMouseMotionListeners();
		var index = mouseMotionListeners.indexOf(mouseMotionListener);
		if (index !== -1) {
			mouseMotionListeners.splice(index, 1);
		}
	}
	jsuis.lf.Container.prototype.fireMouseMoved = function(domEvent) {
		if (this.isPressed()) {
			return;
		}
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_MOVED);
		var mouseMotionListeners = this.getMouseMotionListeners();
		for (var i = 0; i < mouseMotionListeners.length; i++) {
			var mouseMotionListener = mouseMotionListeners[i];
			mouseMotionListener.mouseMoved(mouseEvent);
		}
	}
	jsuis.lf.Container.prototype.fireMouseDragged = function(domEvent) {
		var mouseEvent = new jsuis.lf.MouseEvent(domEvent).setSource(this).setId(jsuis.Constants.MOUSE_DRAGGED);
		var mouseMotionListeners = this.getMouseMotionListeners();
		for (var i = 0; i < mouseMotionListeners.length; i++) {
			var mouseMotionListener = mouseMotionListeners[i];
			mouseMotionListener.mouseDragged(mouseEvent);
		}
	}
	jsuis.lf.Container.prototype.addTouchListener = function(touchListener) {
		var touchListeners = this.getTouchListeners();
		touchListeners.push(touchListener);
		var component = this;
		var listener = touchListener.getListener();
		if (listener.touchPressed) {
			var ontouchstart = this.getEventListener("touchstart");
			if (!ontouchstart) {
				this.setEventListener("touchstart", function(event) {
					component.fireTouchPressed(event);
				});
			}
		}
		if (listener.touchReleased) {
			var ontouchend = this.getEventListener("touchend");
			if (!ontouchend) {
				this.setEventListener("touchend", function(event) {
					component.fireTouchReleased(event);
				});
			}
		}
		if (listener.touchMoved) {
			var ontouchmove = this.getEventListener("touchmove");
			if (!ontouchmove) {
				this.setEventListener("touchmove", function(event) {
					component.fireTouchMoved(event);
				});
			}
		}
	}
	jsuis.lf.Container.prototype.removeTouchListener = function(touchListener) {
		var touchListeners = this.getTouchListeners();
		var index = touchListeners.indexOf(touchListener);
		if (index !== -1) {
			touchListeners.splice(index, 1);
		}
	}
	jsuis.lf.Container.prototype.fireTouchPressed = function(domEvent) {
		var touchEvent = new jsuis.lf.TouchEvent(domEvent).setSource(this).setId(jsuis.Constants.TOUCH_PRESSED);
		var touchListeners = this.getTouchListeners();
		for (var i = 0; i < touchListeners.length; i++) {
			var touchListener = touchListeners[i];
			touchListener.touchPressed(touchEvent);
		}
	}
	jsuis.lf.Container.prototype.fireTouchReleased = function(domEvent) {
		var touchEvent = new jsuis.lf.TouchEvent(domEvent).setSource(this).setId(jsuis.Constants.TOUCH_RELEASED);
		var touchListeners = this.getTouchListeners();
		for (var i = 0; i < touchListeners.length; i++) {
			var touchListener = touchListeners[i];
			touchListener.touchReleased(touchEvent);
		}
	}
	jsuis.lf.Container.prototype.fireTouchMoved = function(domEvent) {
		var touchEvent = new jsuis.lf.TouchEvent(domEvent).setSource(this).setId(jsuis.Constants.TOUCH_MOVED);
		var touchListeners = this.getTouchListeners();
		for (var i = 0; i < touchListeners.length; i++) {
			var touchListener = touchListeners[i];
			touchListener.touchMoved(touchEvent);
		}
	}
	jsuis.lf.Container.prototype.addFocusListener = function(focusListener) {
		var focusListeners = this.getFocusListeners();
		focusListeners.push(focusListener);
		var component = this;
		var listener = focusListener.getListener();
		if (listener.focusGained) {
			var onfocus = this.getEventListener("focus");
			if (!onfocus) {
				this.setEventListener("focus", function(event) {
					component.fireFocusGained(event);
				});
			}
		}
		if (listener.focusLost) {
			var onblur = this.getEventListener("blur");
			if (!onblur) {
				this.setEventListener("blur", function(event) {
					component.fireFocusLost(event);
				});
			}
		}
	}
	jsuis.lf.Container.prototype.removeFocusListener = function(focusListener) {
		var focusListeners = this.getFocusListeners();
		var index = focusListeners.indexOf(focusListener);
		if (index !== -1) {
			focusListeners.splice(index, 1);
		}
	}
	jsuis.lf.Container.prototype.fireFocusGained = function(domEvent) {
		var focusEvent = new jsuis.lf.FocusEvent(domEvent).setSource(this).setId(jsuis.Constants.FOCUS_GAINED);
		var focusListeners = this.getFocusListeners();
		for (var i = 0; i < focusListeners.length; i++) {
			var focusListener = focusListeners[i];
			focusListener.focusGained(focusEvent);
		}
	}
	jsuis.lf.Container.prototype.fireFocusLost = function(domEvent) {
		var focusEvent = new jsuis.lf.FocusEvent(domEvent).setSource(this).setId(jsuis.Constants.FOCUS_LOST);
		var focusListeners = this.getFocusListeners();
		for (var i = 0; i < focusListeners.length; i++) {
			var focusListener = focusListeners[i];
			focusListener.focusLost(focusEvent);
		}
	}
	jsuis.lf.Container.prototype.addActionListener = function(actionListener) {
		var actionListeners = this.getActionListeners();
		actionListeners.push(actionListener);
		var mouseListener = new jsuis.MouseListener({
			mouseClicked: function(event) {
				var source = event.getSource();
				source.fireActionPerformed(event.getElement());
			}
		});
		mouseListener.setListenerComponent(actionListener.getListenerComponent());
		this.addMouseListener(mouseListener);
	}
	jsuis.lf.Container.prototype.removeActionListener = function(actionListener) {
		var actionListeners = this.getActionListeners();
		var index = actionListeners.indexOf(actionListener);
		if (index !== -1) {
			actionListeners.splice(index, 1);
		}
	}
	jsuis.lf.Container.prototype.fireActionPerformed = function(domEvent) {
		var event = new jsuis.lf.ActionEvent(domEvent).setSource(this).setId(jsuis.Constants.ACTION_PERFORMED).setActionCommand(this.getActionCommand());
		var actionListeners = this.getActionListeners();
		for (var i = 0; i < actionListeners.length; i++) {
			var actionListener = actionListeners[i];
			actionListener.actionPerformed(event);
		}
	}
}) (jsuis);
