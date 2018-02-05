/**
 * Component
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Component = jsuis.Object.extend(SUPER, function(element) {
		SUPER.prototype.constructor.call(this);
		this.setElement(element);
		this.addClass(this.getClassName());
		this.setComponents([]);
		this.setEventListeners({});
		this.setComponentListeners([]);
		this.setMouseListeners([]);
		this.setMouseMotionListeners([]);
		this.setPropertyChangeListeners({});
		this.setActionListeners([]);
	});
	jsuis.Object.addProperties(jsuis.Component,
			new jsuis.Property("element"),
			new jsuis.Property("components"),
			new jsuis.Property("parent"),
			new jsuis.Property("layout"),
			new jsuis.Property("constraints"),
			new jsuis.Property("anchor"),
			new jsuis.Property("fill"),
			new jsuis.Property("actionCommand"),
			new jsuis.Property("eventListeners"),
			new jsuis.Property("componentListeners"),
			new jsuis.Property("mouseListeners"),
			new jsuis.Property("mouseMotionListeners"),
			new jsuis.Property("propertyChangeListeners"),
			new jsuis.Property("actionListeners")
	);
	jsuis.Component.prototype.addClass = function(name) {
		var value = this.getAttribute("class");
		var classes = value ? value.split(" ") : [];
		if (classes.indexOf(name) === -1) {
			classes.push(name);
			var value = classes.join(" ");
			this.setAttribute("class", value);
		}
	}
	jsuis.Component.prototype.getAttribute = function(attribute) {
		var element = this.getElement();
		return element.getAttribute(attribute);
	}
	jsuis.Component.prototype.setAttribute = function(attribute, value) {
		var element = this.getElement();
		if (value === null) {
			element.removeAttribute(attribute);
			return this;
		}
		element.setAttribute(attribute, value);
		return this;
	}
	jsuis.Component.prototype.setStyleProperty = function(property, value) {
		var element = this.getElement();
		element.style[property] = value;
		return this;
	}
	jsuis.Component.prototype.getStyleProperty = function(property) {
		var element = this.getElement();
		var computedStyle = getComputedStyle(element);
		return computedStyle[property];
	}
	/*
	jsuis.Component.prototype.getEventListener = function(type) {
		var element = this.getElement();
		return element["on" + type];
	}
	jsuis.Component.prototype.setEventListener = function(type, listener) {
		var element = this.getElement();
		element["on" + type] = listener;
		return this;
	}
	*/
	jsuis.Component.prototype.getEventListener = function(type) {
		var eventListeners = this.getEventListeners();
		return eventListeners["on" + type];
	}
	jsuis.Component.prototype.setEventListener = function(type, eventListener) {
		var oldEventListener = this.getEventListener(type);
		if (oldEventListener) {
			this.removeEventListener(type, oldEventListener);
		}
		this.addEventListener(type, eventListener);
		var eventListeners = this.getEventListeners();
		eventListeners["on" + type] = eventListener;
		return this;
	}
	jsuis.Component.prototype.addEventListener = function(type, eventListener) {
		var element = this.getElement();
		element.addEventListener(type, eventListener);
	}
	jsuis.Component.prototype.removeEventListener = function(type, eventListener) {
		var element = this.getElement();
		element.removeEventListener(type, eventListener);
	}
	jsuis.Component.prototype.getId = function() {
		return this.getAttribute("id");
	}
	jsuis.Component.prototype.setId = function(id) {
		this.setAttribute("id", id);
		return this;
	}
	jsuis.Component.prototype.getName = function() {
		return this.getAttribute("name");
	}
	jsuis.Component.prototype.setName = function(name) {
		this.setAttribute("name", name);
		return this;
	}
	jsuis.Component.prototype.addChild = function(component, referenceComponent) {
		var element = this.getElement();
		var componentElement = component.getElement();
		var referenceElement;
		if (referenceComponent) {
			referenceElement = referenceComponent.getElement();
		}
		element.insertBefore(componentElement, referenceElement || null);
	}
	jsuis.Component.prototype.removeChild = function(component) {
		var element = this.getElement();
		var componentElement = component.getElement();
		element.removeChild(componentElement);
	}
	jsuis.Component.prototype.add = function(component, constraints, index) {
		component.init();
		var components = this.getComponents();
		var referenceComponent = undefined;
		if (index !== undefined) {
			referenceComponent = components[index];
		}
		this.addChild(component, referenceComponent);
		component.setConstraints(jsuis.Object.clone(constraints));
		component.setParent(this);
		if (index !== undefined) {
			components.splice(index, 0, component);
		} else {
			components.push(component);
		}
	}
	jsuis.Component.prototype.remove = function(component) {
		this.removeChild(component);
		component.setParent(undefined);
		var components = this.getComponents();
		var index = components.indexOf(component);
		if (index !== -1) {
			components.splice(index, 1);
		}
	}
	jsuis.Component.prototype.removeAll = function() {
		var components = this.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			this.removeChild(component);
			component.setParent(undefined);
		}
		components.length = 0;
	}
	jsuis.Component.prototype.getX = function() {
		return this.x || 0;
	}
	jsuis.Component.prototype.setX = function(x) {
		var outsets = this.getOutsets();
		this.setAttribute("x", +nvl(x, 0) + outsets.getLeft());
		this.x = x;
		return this;
	}
	jsuis.Component.prototype.getY = function() {
		return this.y || 0;
	}
	jsuis.Component.prototype.setY = function(y) {
		var outsets = this.getOutsets();
		this.setAttribute("y", +nvl(y, 0) + outsets.getTop());
		this.y = y;
		return this;
	}
	jsuis.Component.prototype.getLocation = function() {
		return new jsuis.Point(this.getX(), this.getY());
	}
	jsuis.Component.prototype.setLocation = function(point) {
		this.setX(point.getX());
		this.setY(point.getY());
		return this;
	}
	jsuis.Component.prototype.getWidth = function() {
		return this.width || 0;
	}
	jsuis.Component.prototype.setWidth = function(width) {
		var outsets = this.getOutsets();
		width -= outsets.getLeft() + outsets.getRight();
		if (width >= 0) {
			this.setAttribute("width", width);
		}
		this.width = width;
		return this;
	}
	jsuis.Component.prototype.getHeight = function() {
		return this.height || 0;
	}
	jsuis.Component.prototype.setHeight = function(height) {
		var outsets = this.getOutsets();
		height -= outsets.getTop() + outsets.getBottom();
		if (height >= 0) {
			this.setAttribute("height", height);
		}
		this.height = height;
		return this;
	}
	jsuis.Component.prototype.getSize = function() {
		return new jsuis.Dimension(this.getWidth(), this.getHeight());
	}
	jsuis.Component.prototype.setSize = function(dimension) {
		this.setWidth(dimension.getWidth());
		this.setHeight(dimension.getHeight());
		return this;
	}
	jsuis.Component.prototype.getPreferredSize = function() {
		var layoutPaddingMargin = this.getLayoutPadding().add(this.getLayoutMargin());
		var preferredSize = this.preferredSize;
		if (preferredSize) {
			return preferredSize.add(layoutPaddingMargin.getDimension());
		}
		var layout = this.getLayout();
		if (layout) {
			var preferredLayoutSize = layout.preferredLayoutSize(this);
			return preferredLayoutSize.add(layoutPaddingMargin.getDimension());
		}
		var element = this.getElement();
		var bbox = element.getBBox();
		return new jsuis.Dimension(Math.ceil(bbox.width), Math.ceil(bbox.height)).add(layoutPaddingMargin.getDimension());
	}
	jsuis.Component.prototype.setPreferredSize = function(preferredSize) {
		this.preferredSize = preferredSize ? preferredSize.clone() : preferredSize;
		return this;
	}
	jsuis.Component.prototype.getMinimumSize = function() {
		var layoutPaddingMargin = this.getLayoutPadding().add(this.getLayoutMargin());
		var minimumSize = this.minimumSize;
		if (minimumSize) {
			return minimumSize.add(layoutPaddingMargin.getDimension());
		}
		var layout = this.getLayout();
		if (layout) {
			var minimumLayoutSize = layout.minimumLayoutSize(this);
			return minimumLayoutSize.add(layoutPaddingMargin.getDimension());
		}
		return this.getPreferredSize();
	}
	jsuis.Component.prototype.setMinimumSize = function(minimumSize) {
		this.minimumSize = minimumSize ? minimumSize.clone() : minimumSize;
		return this;
	}
	jsuis.Component.prototype.getBounds = function() {
		return new jsuis.Rectangle(this.getX(), this.getY(), this.getWidth(), this.getHeight());
	}
	jsuis.Component.prototype.setBounds = function(rectangle) {
		this.setX(rectangle.getX());
		this.setY(rectangle.getY());
		this.setWidth(rectangle.getWidth());
		this.setHeight(rectangle.getHeight());
		return this;
	}
	jsuis.Component.prototype.getMaximumLayoutBounds = function() {
		return this.maximumLayoutBounds;
	}
	jsuis.Component.prototype.setMaximumLayoutBounds = function(maximumLayoutBounds) {
		this.maximumLayoutBounds = maximumLayoutBounds ? maximumLayoutBounds.clone() : maximumLayoutBounds;
		return this;
	}
	jsuis.Component.prototype.getPadding = function() {
		if (!this.padding) {
			this.padding = new jsuis.Insets();
		}
		return this.padding.clone();
	}
	jsuis.Component.prototype.setPadding = function(padding) {
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
	jsuis.Component.prototype.getMargin = function() {
		if (!this.margin) {
			this.margin = new jsuis.Insets();
		}
		return this.margin.clone();
	}
	jsuis.Component.prototype.setMargin = function(margin) {
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
	jsuis.Component.prototype.getLayoutPadding = function() {
		if (!this.layoutPadding) {
			this.layoutPadding = new jsuis.Insets();
		}
		return this.layoutPadding.clone();
	}
	jsuis.Component.prototype.setLayoutPadding = function(layoutPadding) {
		if (!this.layoutPadding || !layoutPadding) {
			this.layoutPadding = new jsuis.Insets();
		}
		if (layoutPadding) {
			this.layoutPadding
			.setTop(layoutPadding.getTop())
			.setLeft(layoutPadding.getLeft())
			.setBottom(layoutPadding.getBottom())
			.setRight(layoutPadding.getRight());
		}
		return this;
	}
	jsuis.Component.prototype.getLayoutMargin = function() {
		if (!this.layoutMargin) {
			this.layoutMargin = new jsuis.Insets();
		}
		return this.layoutMargin.clone();
	}
	jsuis.Component.prototype.setLayoutMargin = function(layoutMargin) {
		if (!this.layoutMargin || !layoutMargin) {
			this.layoutMargin = new jsuis.Insets();
		}
		if (layoutMargin) {
			this.layoutMargin
			.setTop(layoutMargin.getTop())
			.setLeft(layoutMargin.getLeft())
			.setBottom(layoutMargin.getBottom())
			.setRight(layoutMargin.getRight());
		}
		return this;
	}
	jsuis.Component.prototype.getBorder = function() {
		return this.border;
	}
	jsuis.Component.prototype.setBorder = function(border) {
		this.border = border;
		border = nvl(border, new jsuis.Border());
		border.install(this);
		return this;
	}
	jsuis.Component.prototype.getInsets = function() {
		var insets = this.getPadding();
		var border = this.getBorder();
		if (border) {
			return insets.add(border.getBorderInsets(this));
		}
		return insets;
	}
	jsuis.Component.prototype.getOutsets = function() {
		var outsets = this.getMargin();
		var border = this.getBorder();
		if (border) {
			return outsets.add(border.getBorderOutsets(this));
		}
		return outsets;
	}
	jsuis.Component.prototype.isLeftToRight = function() {
		return nvl(this.leftToRight, true);
	}
	jsuis.Component.prototype.setLeftToRight = function(leftToRight) {
		this.leftToRight = leftToRight;
		return this;
	}
	jsuis.Component.prototype.validate = function() {
		var anchor = this.getAnchor();
		var fill = this.getFill();
		if (anchor || fill) {
			anchor = nvl(anchor, jsuis.Constants.CENTER);
			fill = nvl(fill, jsuis.Constants.NONE);
			var maximumLayoutBounds = this.getMaximumLayoutBounds();
			if (maximumLayoutBounds) {
				var x = maximumLayoutBounds.getX();
				var y = maximumLayoutBounds.getY();
				var width = maximumLayoutBounds.getWidth();
				var height = maximumLayoutBounds.getHeight();
				if (fill !== jsuis.Constants.BOTH) {
					var preferredSize = this.getPreferredSize();
					var preferredWidth = preferredSize.getWidth();
					var preferredHeight = preferredSize.getHeight();
					switch (anchor) {
					case jsuis.Constants.NORTH:
					case jsuis.Constants.PAGE_START:
						if (fill === jsuis.Constants.HORIZONTAL) {
							height = preferredHeight;
						} else if (fill === jsuis.Constants.VERTICAL) {
							x += (width - preferredWidth) / 2;
							width = preferredWidth;
						} else {
							x += (width - preferredWidth) / 2;
							width = preferredWidth;
							height = preferredHeight;
						}
						break;
					case jsuis.Constants.SOUTH:
					case jsuis.Constants.PAGE_END:
						if (fill === jsuis.Constants.HORIZONTAL) {
							y += height - preferredHeight;
							height = preferredHeight;
						} else if (fill === jsuis.Constants.VERTICAL) {
							x += (width - preferredWidth) / 2;
							width = preferredWidth;
						} else {
							x += (width - preferredWidth) / 2;
							y += height - preferredHeight;
							width = preferredWidth;
							height = preferredHeight;
						}
						break;
					case jsuis.Constants.WEST:
					case jsuis.Constants.LINE_START:
						if (fill === jsuis.Constants.HORIZONTAL) {
							y += (height - preferredHeight) / 2;
							height = preferredHeight;
						} else if (fill === jsuis.Constants.VERTICAL) {
							width = preferredWidth;
						} else {
							y += (height - preferredHeight) / 2;
							width = preferredWidth;
							height = preferredHeight;
						}
						break;
					case jsuis.Constants.EAST:
					case jsuis.Constants.LINE_END:
						if (fill === jsuis.Constants.HORIZONTAL) {
							y += (height - preferredHeight) / 2;
							height = preferredHeight;
						} else if (fill === jsuis.Constants.VERTICAL) {
							x += width - preferredWidth;
							width = preferredWidth;
						} else {
							x += width - preferredWidth;
							y += (height - preferredHeight) / 2;
							width = preferredWidth;
							height = preferredHeight;
						}
						break;
					case jsuis.Constants.NORTHWEST:
					case jsuis.Constants.NORTH_WEST:
					case jsuis.Constants.FIRST_LINE_START:
						if (fill === jsuis.Constants.HORIZONTAL) {
							height = preferredHeight;
						} else if (fill === jsuis.Constants.VERTICAL) {
							width = preferredWidth;
						} else {
							width = preferredWidth;
							height = preferredHeight;
						}
						break;
					case jsuis.Constants.NORTHEAST:
					case jsuis.Constants.NORTH_EAST:
					case jsuis.Constants.FIRST_LINE_END:
						if (fill === jsuis.Constants.HORIZONTAL) {
							height = preferredHeight;
						} else if (fill === jsuis.Constants.VERTICAL) {
							x += width - preferredWidth;
							width = preferredWidth;
						} else {
							x += width - preferredWidth;
							width = preferredWidth;
							height = preferredHeight;
						}
						break;
					case jsuis.Constants.SOUTHWEST:
					case jsuis.Constants.SOUTH_WEST:
					case jsuis.Constants.LAST_LINE_START:
						if (fill === jsuis.Constants.HORIZONTAL) {
							y += height - preferredHeight;
							height = preferredHeight;
						} else if (fill === jsuis.Constants.VERTICAL) {
							width = preferredWidth;
						} else {
							y += height - preferredHeight;
							width = preferredWidth;
							height = preferredHeight;
						}
						break;
					case jsuis.Constants.SOUTHEAST:
					case jsuis.Constants.SOUTH_EAST:
					case jsuis.Constants.LAST_LINE_END:
						if (fill === jsuis.Constants.HORIZONTAL) {
							y += height - preferredHeight;
							height = preferredHeight;
						} else if (fill === jsuis.Constants.VERTICAL) {
							x += width - preferredWidth;
							width = preferredWidth;
						} else {
							x += width - preferredWidth;
							y += height - preferredHeight;
							width = preferredWidth;
							height = preferredHeight;
						}
						break;
					case jsuis.Constants.CENTER:
					default:
						if (fill === jsuis.Constants.HORIZONTAL) {
							y += (height - preferredHeight) / 2;
							height = preferredHeight;
						} else if (fill === jsuis.Constants.VERTICAL) {
							x += (width - preferredWidth) / 2;
							width = preferredWidth;
						} else {
							x += (width - preferredWidth) / 2;
							y += (height - preferredHeight) / 2;
							width = preferredWidth;
							height = preferredHeight;
						}
					}
				}
				this.setBounds(new jsuis.Rectangle(Math.round(x), Math.round(y), width, height));
			}
		}
		this.doLayout();
		var components = this.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			component.validate();
		}
	}
	jsuis.Component.prototype.doLayout = function() {
		var layout = this.getLayout();
		if (layout) {
			layout.layoutContainer(this);
		}
	}
	jsuis.Component.prototype.isVisible = function() {
		return nvl(this.visible, true);
	}
	jsuis.Component.prototype.setVisible = function(visible) {
		this.setStyleProperty("display", visible ? "" : "none");
		var components = this.getComponents();
		for (var i = 0; i < components.length; i++) {
			var component = components[i];
			component.setVisible(visible);
		}
		this.visible = visible;
		return this;
	}
	jsuis.Component.prototype.getBackground = function() {
		return this.background;
	}
	jsuis.Component.prototype.setBackground = function(background) {
		this.background = background;
		this.setStyleProperty("fill", nvl(background, "none").toString());
		return this;
	}
	jsuis.Component.prototype.getForeground = function() {
		return this.foreground;
	}
	jsuis.Component.prototype.setForeground = function(foreground) {
		this.foreground = foreground;
		this.setStyleProperty("stroke", nvl(foreground, "none").toString());
		return this;
	}
	jsuis.Component.prototype.getFont = function() {
		return this.font;
	}
	jsuis.Component.prototype.setFont = function(font) {
		this.font = font;
		if (font) {
			this.setAttribute("font-family", font.getName());
			this.setAttribute("font-style", font.getStyle());
			this.setAttribute("font-size", font.getSize());
		}
		return this;
	}
	jsuis.Component.prototype.addComponentListener = function(componentListener) {
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
		if (listener.componentMoved) {
			//TODO
		}
	}
	jsuis.Component.prototype.removeComponentListener = function(componentListener) {
		var componentListeners = this.getComponentListeners();
		var index = componentListeners.indexOf(componentListener);
		if (index !== -1) {
			componentListeners.splice(index, 1);
		}
	}
	jsuis.Component.prototype.fireComponentResized = function(domEvent) {
		var event = new jsuis.ComponentEvent(this, jsuis.Constants.COMPONENT_RESIZED).setDomEvent(domEvent);
		var componentListeners = this.getComponentListeners();
		for (var i = 0; i < componentListeners.length; i++) {
			var componentListener = componentListeners[i];
			componentListener.componentResized(event);
		}
	}
	jsuis.Component.prototype.fireComponentMoved = function(domEvent) {
		var event = new jsuis.ComponentEvent(this, jsuis.Constants.COMPONENT_MOVED).setDomEvent(domEvent);
		var componentListeners = this.getComponentListeners();
		for (var i = 0; i < componentListeners.length; i++) {
			var componentListener = componentListeners[i];
			componentListener.componentMoved(event);
		}
	}
	jsuis.Component.prototype.isEnabled = function() {
		return nvl(this.enabled, true);
	}
	jsuis.Component.prototype.setEnabled = function(enabled) {
		this.setStyleProperty("pointer-events", enabled ? "" : "none");
		return this;
	}
	jsuis.Component.prototype.isSelectable = function() {
		return nvl(this.selectable, true);
	}
	jsuis.Component.prototype.setSelectable = function(selectable) {
		this.selectable = selectable;
		this
		.setStyleProperty("-webkit-touch-callout", selectable ? "text" : "none")
		.setStyleProperty("-webkit-user-select", selectable ? "text" : "none")
		.setStyleProperty("-khtml-user-select", selectable ? "text" : "none")
		.setStyleProperty("-moz-user-select", selectable ? "text" : "none")
		.setStyleProperty("-ms-user-select", selectable ? "text" : "none")
		.setStyleProperty("user-select", selectable ? "text" : "none");
		return this;
	}
	jsuis.Component.prototype.isPressed = function() {
		return this.pressed;
	}
	jsuis.Component.prototype.setPressed = function(pressed) {
		this.pressed = pressed;
		return this;
	}
	jsuis.Component.prototype.addMouseListener = function(mouseListener) {
		var mouseListeners = this.getMouseListeners();
		mouseListeners.push(mouseListener);
		var component = this;
		var listener = mouseListener;
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
		if (listener.mousePressed) {
			var onmousedown = this.getEventListener("mousedown");
			if (!onmousedown) {
				this.setEventListener("mousedown", function(event) {
					component.fireMousePressed(event);
				});
			}
		}
		if (listener.mouseReleased) {
			var browserWindow = jsuis.BrowserWindow.getInstance();
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
							component.fireMouseReleased(event.getDomEvent());
						}
					}
				});
				mouseListener.setListenerComponent(this);
				browserWindow.addMouseListener(mouseListener);
			}
		}
		if (listener.mouseEntered) {
			var onmouseenter = this.getEventListener("mouseenter");
			if (!onmouseenter) {
				this.setEventListener("mouseenter", function(event) {
					component.fireMouseEntered(event);
				});
			}
		}
		if (listener.mouseExited) {
			var onmouseleave = this.getEventListener("mouseleave");
			if (!onmouseleave) {
				this.setEventListener("mouseleave", function(event) {
					component.fireMouseExited(event);
				});
			}
		}
	}
	jsuis.Component.prototype.removeMouseListener = function(mouseListener) {
		var mouseListeners = this.getMouseListeners();
		var index = mouseListeners.indexOf(mouseListener);
		if (index !== -1) {
			mouseListeners.splice(index, 1);
		}
	}
	jsuis.Component.prototype.fireMouseClicked = function(domEvent) {
		var mouseEvent = new jsuis.MouseEvent(this, jsuis.Constants.MOUSE_CLICKED).setDomEvent(domEvent);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseClicked(mouseEvent);
		}
	}
	jsuis.Component.prototype.fireMouseDoubleClicked = function(domEvent) {
		var mouseEvent = new jsuis.MouseEvent(this, jsuis.Constants.MOUSE_CLICKED).setDomEvent(domEvent).setClickCount(2);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseClicked(mouseEvent);
		}
	}
	jsuis.Component.prototype.fireMouseRightClicked = function(domEvent) {
		var mouseEvent = new jsuis.MouseEvent(this, jsuis.Constants.MOUSE_CLICKED).setDomEvent(domEvent).setPopupTrigger(true);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseClicked(mouseEvent);
		}
	}
	jsuis.Component.prototype.fireMousePressed = function(domEvent) {
		this.setPressed(true);
		var mouseEvent = new jsuis.MouseEvent(this, jsuis.Constants.MOUSE_PRESSED).setDomEvent(domEvent);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mousePressed(mouseEvent);
		}
	}
	jsuis.Component.prototype.fireMouseReleased = function(domEvent) {
		this.setPressed(false);
		var mouseEvent = new jsuis.MouseEvent(this, jsuis.Constants.MOUSE_RELEASED).setDomEvent(domEvent);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseReleased(mouseEvent);
		}
	}
	jsuis.Component.prototype.fireMouseEntered = function(domEvent) {
		var mouseEvent = new jsuis.MouseEvent(this, jsuis.Constants.MOUSE_ENTERED).setDomEvent(domEvent);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseEntered(mouseEvent);
		}
	}
	jsuis.Component.prototype.fireMouseExited = function(domEvent) {
		var mouseEvent = new jsuis.MouseEvent(this, jsuis.Constants.MOUSE_EXITED).setDomEvent(domEvent);
		var mouseListeners = this.getMouseListeners();
		for (var i = 0; i < mouseListeners.length; i++) {
			var mouseListener = mouseListeners[i];
			mouseListener.mouseExited(mouseEvent);
		}
	}
	jsuis.Component.prototype.addMouseMotionListener = function(mouseMotionListener) {
		var mouseMotionListeners = this.getMouseMotionListeners();
		mouseMotionListeners.push(mouseMotionListener);
		var component = this;
		var listener = mouseMotionListener.getListener();
		if (listener.mouseMoved) {
			var onmousemove = this.getEventListener("mousemove");
			if (!onmousemove) {
				this.setEventListener("mousemove", function(event) {
					component.fireMouseMoved(event);
				});
			}
		}
		if (listener.mouseDragged) {
			var browserWindow = jsuis.BrowserWindow.getInstance();
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
							component.fireMouseDragged(event.getDomEvent());
						}
					}
				});
				mouseMotionListener.setListenerComponent(this);
				browserWindow.addMouseMotionListener(mouseMotionListener);
			}
		}
	}
	jsuis.Component.prototype.removeMouseMotionListener = function(mouseMotionListener) {
		var mouseMotionListeners = this.getMouseMotionListeners();
		var index = mouseMotionListeners.indexOf(mouseMotionListener);
		if (index !== -1) {
			mouseMotionListeners.splice(index, 1);
		}
	}
	jsuis.Component.prototype.fireMouseMoved = function(domEvent) {
		if (this.isPressed()) {
			return;
		}
		var mouseEvent = new jsuis.MouseEvent(this, jsuis.Constants.MOUSE_MOVED).setDomEvent(domEvent);
		var mouseMotionListeners = this.getMouseMotionListeners();
		for (var i = 0; i < mouseMotionListeners.length; i++) {
			var mouseMotionListener = mouseMotionListeners[i];
			mouseMotionListener.mouseMoved(mouseEvent);
		}
	}
	jsuis.Component.prototype.fireMouseDragged = function(domEvent) {
		var mouseEvent = new jsuis.MouseEvent(this, jsuis.Constants.MOUSE_DRAGGED).setDomEvent(domEvent);
		var mouseMotionListeners = this.getMouseMotionListeners();
		for (var i = 0; i < mouseMotionListeners.length; i++) {
			var mouseMotionListener = mouseMotionListeners[i];
			mouseMotionListener.mouseDragged(mouseEvent);
		}
	}
	jsuis.Component.prototype.addPropertyChangeListener = function(propertyChangeListener) {
		var propertyName = propertyChangeListener.getPropertyName() || "";
		var propertyChangeListeners = this.getPropertyChangeListeners(propertyName);
		propertyChangeListeners.push(propertyChangeListener);
		if (propertyName !== "") {
			propertyChangeListeners = this.getPropertyChangeListeners();
			propertyChangeListeners.push(propertyChangeListener);
		}
	}
	jsuis.Component.prototype.removePropertyChangeListener = function(propertyChangeListener) {
		var propertyName = propertyChangeListener.getPropertyName() || "";
		var propertyChangeListeners = this.getPropertyChangeListeners(propertyName);
		var index = propertyChangeListeners.indexOf(propertyChangeListener);
		if (index !== -1) {
			propertyChangeListeners.splice(index, 1);
		}
		if (propertyName !== "") {
			var propertyChangeListeners = this.getPropertyChangeListeners();
			var index = propertyChangeListeners.indexOf(propertyChangeListener);
			if (index !== -1) {
				propertyChangeListeners.splice(index, 1);
			}
		}
	}
	jsuis.Component.prototype.getPropertyChangeListeners = function(propertyName) {
		propertyName = propertyName || "";
		var propertyChangeListeners = this.propertyChangeListeners;
		if (!propertyChangeListeners[propertyName]) {
			propertyChangeListeners[propertyName] = [];
		}
		return propertyChangeListeners[propertyName];
	}
	jsuis.Component.prototype.firePropertyChange = function(propertyName, oldValue, newValue) {
		var propertyChangeEvent = new jsuis.PropertyChangeEvent(this, propertyName, oldValue, newValue);
		var propertyChangeListeners = this.getPropertyChangeListeners(propertyName);
		for (var i = 0; i < propertyChangeListeners.length; i++) {
			var propertyChangeListener = propertyChangeListeners[i];
			propertyChangeListener.propertyChange(propertyChangeEvent);
		}
	}
	jsuis.Component.prototype.addActionListener = function(actionListener) {
		var actionListeners = this.getActionListeners();
		actionListeners.push(actionListener);
		var mouseListener = new jsuis.MouseListener({
			mouseClicked: function(event) {
				var source = event.getSource();
				source.fireActionPerformed(event.getDomEvent());
			}
		});
		mouseListener.setListenerComponent(actionListener.getListenerComponent());
		this.addMouseListener(mouseListener);
	}
	jsuis.Component.prototype.removeActionListener = function(actionListener) {
		var actionListeners = this.getActionListeners();
		var index = actionListeners.indexOf(actionListener);
		if (index !== -1) {
			actionListeners.splice(index, 1);
		}
	}
	jsuis.Component.prototype.fireActionPerformed = function(domEvent) {
		var event = new jsuis.ActionEvent(this, jsuis.Constants.ACTION_PERFORMED, this.getActionCommand()).setDomEvent(domEvent);
		var actionListeners = this.getActionListeners();
		for (var i = 0; i < actionListeners.length; i++) {
			var actionListener = actionListeners[i];
			actionListener.actionPerformed(event);
		}
	}
})(jsuis);
