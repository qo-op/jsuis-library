var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var JSComponent = (function () {
    function JSComponent(element) {
        this.width = 0;
        this.height = 0;
        this.oldWidth = -1;
        this.oldHeight = -1;
        this.element = element;
        if (this.element.data === undefined) {
            this.element.data = {};
        }
        this.init();
    }
    JSComponent.prototype.init = function () {
        this.addClass("JSComponent");
    };
    JSComponent.prototype.getAttribute = function (attribute) {
        return this.element.getAttribute(attribute);
    };
    JSComponent.prototype.setAttribute = function (attribute, value) {
        this.element.setAttribute(attribute, value);
    };
    JSComponent.prototype.removeAttribute = function (attribute) {
        this.element.removeAttribute(attribute);
    };
    JSComponent.prototype.getComputedStyle = function (style) {
        return window.getComputedStyle(this.element)[style];
    };
    JSComponent.prototype.getStyle = function (style) {
        return this.element.style[style];
    };
    JSComponent.prototype.setStyle = function (style, value) {
        if (value !== null) {
            this.element.style[style] = value;
        }
        else {
            this.removeStyle(style);
        }
    };
    JSComponent.prototype.removeStyle = function (style) {
        this.element.style.removeProperty(style);
    };
    JSComponent.prototype.getData = function (key) {
        var data = this.element.data;
        return data[key];
    };
    JSComponent.prototype.setData = function (key, value) {
        var data = this.element.data;
        data[key] = value;
    };
    JSComponent.prototype.getClientProperty = function (key) {
        var clientProperties = this.element.clientProperties;
        if (!clientProperties) {
            clientProperties = {};
            this.element.clientProperties = clientProperties;
        }
        return clientProperties[key];
    };
    JSComponent.prototype.putClientProperty = function (key, value) {
        var clientProperties = this.element.clientProperties;
        if (!clientProperties) {
            clientProperties = {};
            this.element.clientProperties = clientProperties;
        }
        clientProperties[key] = value;
    };
    JSComponent.prototype.getId = function () {
        return this.getAttribute("id");
    };
    JSComponent.prototype.setId = function (id) {
        this.setAttribute("id", id);
        return this;
    };
    JSComponent.prototype.getName = function () {
        return this.getAttribute("name");
    };
    JSComponent.prototype.setName = function (name) {
        this.setAttribute("name", name);
        return this;
    };
    JSComponent.prototype.addClass = function (clazz) {
        var clazzes = (this.getAttribute("class") || "").trim();
        if (clazzes.indexOf(" " + clazz + " ") !== -1 ||
            clazzes.indexOf(clazz + " ") !== -1 ||
            clazzes.indexOf(" " + clazz) !== -1) {
            return;
        }
        this.setAttribute("class", (clazzes + " " + clazz).trim());
    };
    JSComponent.prototype.getX = function () {
        return 0;
    };
    JSComponent.prototype.setX = function (x) {
    };
    JSComponent.prototype.getY = function () {
        return 0;
    };
    JSComponent.prototype.setY = function (y) {
    };
    JSComponent.prototype.getWidth = function () {
        return this.width;
    };
    JSComponent.prototype.setWidth = function (width) {
        this.oldWidth = this.width;
        this.width = width;
    };
    JSComponent.prototype.getHeight = function () {
        return this.height;
    };
    JSComponent.prototype.setHeight = function (height) {
        this.oldHeight = this.height;
        this.height = height;
    };
    JSComponent.prototype.getOuterWidth = function () {
        return 0;
    };
    JSComponent.prototype.setOuterWidth = function (outerWidth) {
    };
    JSComponent.prototype.getOuterHeight = function () {
        return 0;
    };
    JSComponent.prototype.setOuterHeight = function (outerHeight) {
    };
    JSComponent.prototype.getInsetTop = function () {
        return 0;
    };
    JSComponent.prototype.getInsetLeft = function () {
        return 0;
    };
    JSComponent.prototype.getInsetBottom = function () {
        return 0;
    };
    JSComponent.prototype.getInsetRight = function () {
        return 0;
    };
    JSComponent.prototype.isDisplayable = function () {
        return true;
    };
    JSComponent.prototype.getLayout = function () {
        return this.getData("layout");
    };
    JSComponent.prototype.setLayout = function (layout) {
        this.setData("layout", layout);
    };
    JSComponent.prototype.getConstraints = function () {
        return this.getData("constraints");
    };
    JSComponent.prototype.setConstraints = function (constraints) {
        this.setData("constraints", constraints);
    };
    JSComponent.prototype.getZIndex = function () {
        var zIndex = +this.getStyle("z-index");
        if (isNaN(zIndex)) {
            return 0;
        }
        return zIndex;
    };
    JSComponent.prototype.setZIndex = function (zIndex) {
        if (zIndex === null) {
            this.setStyle("z-index", "auto");
            return;
        }
        this.setStyle("z-index", "" + zIndex);
    };
    JSComponent.prototype.getComponents = function () {
        var components = this.getData("components");
        if (components === undefined) {
            components = [];
            this.setData("components", components);
        }
        return components;
    };
    JSComponent.prototype.getComponentCount = function () {
        return this.getComponents().length;
    };
    JSComponent.prototype.getParent = function () {
        return this.getData("parent");
    };
    JSComponent.prototype.setParent = function (parent) {
        this.setData("parent", parent);
    };
    JSComponent.prototype.add = function (component, constraints, index) {
        if (constraints !== undefined) {
            if (typeof constraints === "number") {
                component.setZIndex(constraints);
            }
            else {
                component.setConstraints(constraints);
            }
        }
        var parent = component.getParent();
        if (parent) {
            parent.remove(component);
        }
        var components = this.getComponents();
        if (index !== undefined && index < components.length) {
            this.element.insertBefore(component.element, components[index].element);
            components.splice(index, 0, component);
        }
        else {
            this.element.appendChild(component.element);
            components.push(component);
        }
        component.setParent(this);
        var layout = this.getLayout();
        if (layout) {
            layout.addLayoutComponent(component);
        }
    };
    JSComponent.prototype.remove = function (indexOrComponent) {
        var component;
        var components = this.getComponents();
        if (typeof indexOrComponent === "number") {
            if (indexOrComponent < components.length) {
                component = components[indexOrComponent];
            }
            else {
                return;
            }
        }
        else {
            component = indexOrComponent;
        }
        var layout = this.getLayout();
        if (layout) {
            layout.removeLayoutComponent(component);
        }
        component.setParent(null);
        var index = components.indexOf(component);
        if (index !== -1) {
            components.splice(index, 1);
            this.element.removeChild(component.element);
        }
    };
    JSComponent.prototype.removeAll = function () {
        var components = this.getComponents();
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            this.remove(component);
        }
    };
    JSComponent.prototype.validate = function () {
        if (this.width !== this.oldWidth || this.height !== this.oldHeight) {
            var layout = this.getLayout();
            if (layout) {
                layout.layoutContainer(this);
            }
            this.validateChildren();
        }
    };
    JSComponent.prototype.validateChildren = function () {
        var components = this.getComponents();
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            component.validate();
        }
    };
    JSComponent.prototype.revalidate = function () {
        var layout = this.getLayout();
        if (layout) {
            layout.layoutContainer(this);
        }
        this.revalidateChildren();
    };
    JSComponent.prototype.revalidateChildren = function () {
        var components = this.getComponents();
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            component.revalidate();
        }
    };
    JSComponent.prototype.isVisible = function () {
        return this.getStyle("visibility") !== "hidden";
    };
    JSComponent.prototype.setVisible = function (visible) {
        this.setStyle("visibility", visible ? "" : "hidden");
    };
    JSComponent.prototype.clone = function () {
        return null;
    };
    JSComponent.prototype.getBoundingClientRect = function () {
        return this.element.getBoundingClientRect();
    };
    JSComponent.prototype.getPreferredWidth = function () {
        var preferredWidth = this.getAttribute("data-preferred-width");
        if (preferredWidth) {
            return +preferredWidth;
        }
        var layout = this.getLayout();
        if (layout) {
            return layout.preferredLayoutWidth(this);
        }
        var cssWidth = this.getStyle("width");
        if (cssWidth) {
            this.removeStyle("width");
        }
        var widthAttribute = this.getAttribute("width");
        if (widthAttribute) {
            this.removeAttribute("width");
        }
        var width = this.element.getBoundingClientRect().width - this.getBorderLeftWidth() - this.getPaddingLeft() - this.getPaddingRight() - this.getBorderRightWidth();
        if (widthAttribute) {
            this.setAttribute("width", widthAttribute);
        }
        if (cssWidth) {
            this.setStyle("width", cssWidth);
        }
        return width;
    };
    JSComponent.prototype.setPreferredWidth = function (preferredWidth) {
        if (preferredWidth === null) {
            this.removeAttribute("data-preferred-width");
        }
        else {
            this.setAttribute("data-preferred-width", "" + preferredWidth);
        }
    };
    JSComponent.prototype.getPreferredHeight = function () {
        var preferredHeight = this.getAttribute("data-preferred-height");
        if (preferredHeight) {
            return +preferredHeight;
        }
        var layout = this.getLayout();
        if (layout) {
            return layout.preferredLayoutHeight(this);
        }
        var cssHeight = this.getStyle("height");
        if (cssHeight) {
            this.removeStyle("height");
        }
        var heightAttribute = this.getAttribute("height");
        if (heightAttribute) {
            this.removeAttribute("height");
        }
        var height = this.element.getBoundingClientRect().height - this.getBorderTopWidth() - this.getPaddingTop() - this.getPaddingBottom() - this.getBorderBottomWidth();
        if (heightAttribute) {
            this.setAttribute("height", heightAttribute);
        }
        if (cssHeight) {
            this.setStyle("height", cssHeight);
        }
        return height;
    };
    JSComponent.prototype.setPreferredHeight = function (preferredHeight) {
        if (preferredHeight === null) {
            this.removeAttribute("data-preferred-height");
        }
        else {
            this.setAttribute("data-preferred-height", "" + preferredHeight);
        }
    };
    JSComponent.prototype.getPreferredOuterWidth = function () {
        return 0;
    };
    JSComponent.prototype.getPreferredOuterHeight = function () {
        return 0;
    };
    JSComponent.prototype.getMarginTop = function () {
        return 0;
    };
    JSComponent.prototype.getMarginLeft = function () {
        return 0;
    };
    JSComponent.prototype.getMarginBottom = function () {
        return 0;
    };
    JSComponent.prototype.getMarginRight = function () {
        return 0;
    };
    JSComponent.prototype.getBorderTopWidth = function () {
        return 0;
    };
    JSComponent.prototype.getBorderLeftWidth = function () {
        return 0;
    };
    JSComponent.prototype.getBorderBottomWidth = function () {
        return 0;
    };
    JSComponent.prototype.getBorderRightWidth = function () {
        return 0;
    };
    JSComponent.prototype.getPaddingTop = function () {
        return 0;
    };
    JSComponent.prototype.getPaddingLeft = function () {
        return 0;
    };
    JSComponent.prototype.getPaddingBottom = function () {
        return 0;
    };
    JSComponent.prototype.getPaddingRight = function () {
        return 0;
    };
    JSComponent.prototype.getBackground = function () {
        return "";
    };
    JSComponent.prototype.setBackground = function (background) {
    };
    JSComponent.prototype.getForeground = function () {
        return "";
    };
    JSComponent.prototype.setForeground = function (foreground) {
    };
    JSComponent.prototype.getText = function () {
        return "";
    };
    JSComponent.prototype.setText = function (text) {
    };
    JSComponent.prototype.getCursor = function () {
        return "";
    };
    JSComponent.prototype.setCursor = function (cursor) {
    };
    JSComponent.prototype.getIcon = function () {
        return this.getData("icon");
    };
    JSComponent.prototype.setIcon = function (icon) {
        this.setData("icon", icon);
    };
    JSComponent.prototype.getAction = function () {
        return this.getData("action");
    };
    JSComponent.prototype.setAction = function (action) {
        var oldAction = this.getAction();
        if (oldAction) {
            var actionListener = oldAction.getActionListener();
            if (actionListener) {
                this.removeActionListener(actionListener);
            }
            var mouseListener = oldAction.getMouseListener();
            if (mouseListener) {
                this.removeMouseListener(mouseListener);
            }
        }
        this.setText(action.getName());
        this.setIcon(action.getIcon().clone());
        actionListener = action.getActionListener();
        if (actionListener) {
            this.addActionListener(actionListener);
        }
        mouseListener = action.getMouseListener();
        if (mouseListener) {
            this.addMouseListener(mouseListener);
        }
        this.setData("action", action);
    };
    JSComponent.prototype.getComponentPopupMenu = function () {
        return this.getData("componentPopupMenu");
    };
    JSComponent.prototype.setComponentPopupMenu = function (componentPopupMenu) {
        var oldContextmenuListener = this.getData("contextmenuListener");
        if (oldContextmenuListener) {
            this.removeEventListener("contextmenu", oldContextmenuListener, false);
        }
        var invoker = this;
        var contextmenuListener = function (mouseEvent) {
            componentPopupMenu.show(invoker, mouseEvent.x, mouseEvent.y);
            mouseEvent.preventDefault();
            mouseEvent.stopPropagation();
        };
        this.addEventListener("contextmenu", contextmenuListener, false);
        this.setData("contextmenuListener", contextmenuListener);
        this.setData("componentPopupMenu", componentPopupMenu);
    };
    JSComponent.prototype.isSelected = function () {
        var selected = this.getAttribute("selected");
        if (selected === null) {
            return false;
        }
        return (selected || "true") === "true";
    };
    JSComponent.prototype.setSelected = function (selected) {
        this.setAttribute("selected", "" + selected);
    };
    JSComponent.prototype.getSelection = function () {
        return this.getData("selection");
    };
    JSComponent.prototype.setSelection = function (selection) {
        this.setData("selection", selection);
    };
    JSComponent.prototype.isEditable = function () {
        return this.getAttribute("contenteditable") === "true";
    };
    JSComponent.prototype.setEditable = function (contenteditable) {
        this.setAttribute("contenteditable", "" + contenteditable);
    };
    JSComponent.prototype.setTimeout = function (thisValue, timeout, delay) {
        this.setData("timeout", setTimeout(function () { timeout.call(thisValue); }, delay || 0));
    };
    JSComponent.prototype.clearTimeout = function () {
        var timeout = this.getData("timeout");
        if (timeout) {
            this.setData("timeout", undefined);
            clearTimeout(timeout);
        }
    };
    JSComponent.prototype.addEventListener = function (event, listener, useCapture) {
        this.element.addEventListener(event, listener, useCapture);
    };
    JSComponent.prototype.removeEventListener = function (event, listener, useCapture) {
        if (useCapture === undefined) {
            this.element.removeEventListener(event, listener);
            this.element.removeEventListener(event, listener, true);
        }
        else {
            this.element.removeEventListener(event, listener, useCapture);
        }
    };
    JSComponent.prototype.addMouseListener = function (mouseListener, useCapture) {
        if (mouseListener.mouseClicked) {
            this.element.addEventListener("click", mouseListener.mouseClicked, useCapture === true);
        }
        if (mouseListener.mousePressed) {
            this.element.addEventListener("mousedown", mouseListener.mousePressed, useCapture === true);
        }
        if (mouseListener.mouseReleased) {
            this.element.addEventListener("mouseup", mouseListener.mouseReleased, useCapture === true);
        }
        if (mouseListener.mouseEntered) {
            this.element.addEventListener("mouseenter", mouseListener.mouseEntered, useCapture === true);
        }
        if (mouseListener.mouseExited) {
            this.element.addEventListener("mouseleave", mouseListener.mouseExited, useCapture === true);
        }
        if (mouseListener.mouseMoved) {
            this.element.addEventListener("mousemove", mouseListener.mouseMoved, useCapture === true);
        }
        if (mouseListener.mouseDragged) {
            this.addMouseDraggedListener(mouseListener, useCapture === true);
        }
    };
    JSComponent.prototype.removeMouseListener = function (mouseListener, useCapture) {
        if (mouseListener.mouseClicked) {
            if (useCapture === undefined) {
                this.element.removeEventListener("click", mouseListener.mouseClicked);
                this.element.removeEventListener("click", mouseListener.mouseClicked, true);
            }
            else {
                this.element.removeEventListener("click", mouseListener.mouseClicked, useCapture);
            }
        }
        if (mouseListener.mousePressed) {
            if (useCapture === undefined) {
                this.element.removeEventListener("mousedown", mouseListener.mouseClicked);
                this.element.removeEventListener("mousedown", mouseListener.mouseClicked, true);
            }
            else {
                this.element.removeEventListener("mousedown", mouseListener.mouseClicked, useCapture);
            }
        }
        if (mouseListener.mouseReleased) {
            if (useCapture === undefined) {
                this.element.removeEventListener("mouseup", mouseListener.mouseClicked);
                this.element.removeEventListener("mouseup", mouseListener.mouseClicked, true);
            }
            else {
                this.element.removeEventListener("mouseup", mouseListener.mouseClicked, useCapture);
            }
        }
        if (mouseListener.mouseEntered) {
            if (useCapture === undefined) {
                this.element.removeEventListener("mouseenter", mouseListener.mouseClicked);
                this.element.removeEventListener("mouseenter", mouseListener.mouseClicked, true);
            }
            else {
                this.element.removeEventListener("mouseenter", mouseListener.mouseClicked, useCapture);
            }
        }
        if (mouseListener.mouseExited) {
            if (useCapture === undefined) {
                this.element.removeEventListener("mouseleave", mouseListener.mouseClicked);
                this.element.removeEventListener("mouseleave", mouseListener.mouseClicked, true);
            }
            else {
                this.element.removeEventListener("mouseleave", mouseListener.mouseClicked, useCapture);
            }
        }
        if (mouseListener.mouseMoved) {
            if (useCapture === undefined) {
                this.element.removeEventListener("mousemove", mouseListener.mouseClicked);
                this.element.removeEventListener("mousemove", mouseListener.mouseClicked, true);
            }
            else {
                this.element.removeEventListener("mousemove", mouseListener.mouseClicked, useCapture);
            }
        }
        if (mouseListener.mouseDragged) {
            this.removeMouseDraggedListener(mouseListener);
        }
    };
    JSComponent.prototype.addAdjustmentListener = function (adjustmentListener, useCapture) {
        this.element.addEventListener("scroll", adjustmentListener.adjustmentValueChanged, useCapture === true);
    };
    JSComponent.prototype.removeAdjustmentListener = function (adjustmentListener, useCapture) {
        if (useCapture === undefined) {
            this.element.removeEventListener("scroll", adjustmentListener.adjustmentValueChanged);
            this.element.removeEventListener("scroll", adjustmentListener.adjustmentValueChanged, true);
        }
        else {
            this.element.removeEventListener("scroll", adjustmentListener.adjustmentValueChanged, useCapture);
        }
    };
    JSComponent.prototype.getActionCommand = function () {
        return this.getAttribute("data-action-command");
    };
    JSComponent.prototype.setActionCommand = function (actionCommand) {
        this.setAttribute("data-action-command", actionCommand);
    };
    JSComponent.prototype.getActionListeners = function () {
        var actionListeners = this.getData("actionListeners");
        if (actionListeners === undefined) {
            actionListeners = [];
            this.setData("actionListeners", actionListeners);
        }
        return actionListeners;
    };
    JSComponent.prototype.addActionListener = function (actionListener) {
        var mouseListener = this.getData("actionListener");
        if (!mouseListener) {
            mouseListener = new JSMouseListener(this, {
                mouseClicked: function (mouseEvent) {
                    this.fireActionPerformed(new JSActionEvent(this, this.getActionCommand()));
                }
            });
            this.addMouseListener(mouseListener);
            this.setData("actionListener", mouseListener);
        }
        var actionListeners = this.getActionListeners();
        actionListeners.push(actionListener);
    };
    JSComponent.prototype.removeActionListener = function (actionListener) {
        var actionListeners = this.getActionListeners();
        var index = actionListeners.indexOf(actionListener);
        if (index !== -1) {
            actionListeners.splice(index, 1);
        }
    };
    JSComponent.prototype.fireActionPerformed = function (actionEvent) {
        var actionListeners = this.getActionListeners();
        for (var i = 0; i < actionListeners.length; i++) {
            var actionListener = actionListeners[i];
            actionListener.actionPerformed(actionEvent);
        }
    };
    JSComponent.prototype.getMouseDraggedListeners = function () {
        var mousedraggedListeners = this.getData("mouseDraggedListeners");
        if (mousedraggedListeners === undefined) {
            mousedraggedListeners = [];
            this.setData("mouseDraggedListeners", mousedraggedListeners);
        }
        return mousedraggedListeners;
    };
    JSComponent.prototype.addMouseDraggedListener = function (mouseDraggedListener, useCapture) {
        var mouseListener = this.getData("dragListener");
        if (!mouseListener) {
            mouseListener = new JSMouseListener(this, {
                mousePressed: function (mouseEvent) {
                    var body = JSBody.getInstance();
                    body.setDragSource(this);
                }
            });
            this.addMouseListener(mouseListener, useCapture);
            this.setData("dragListener", mouseListener);
        }
        var mouseDraggedListeners = this.getMouseDraggedListeners();
        mouseDraggedListeners.push(mouseDraggedListener);
    };
    JSComponent.prototype.removeMouseDraggedListener = function (mouseDraggedListener) {
        var mouseDraggedListeners = this.getMouseDraggedListeners();
        var index = mouseDraggedListeners.indexOf(mouseDraggedListener);
        if (index !== -1) {
            mouseDraggedListeners.splice(index, 1);
        }
    };
    JSComponent.prototype.fireMouseDragged = function (mouseEvent) {
        var mouseDraggedListeners = this.getMouseDraggedListeners();
        for (var i = 0; i < mouseDraggedListeners.length; i++) {
            var mouseDraggedListener = mouseDraggedListeners[i];
            mouseDraggedListener.mouseDragged(mouseEvent);
        }
    };
    JSComponent.prototype.setDraggable = function (draggable) {
        this.setAttribute("draggable", "" + draggable);
        this.setStyle("-webkit-user-drag", draggable ? "element" : "none");
    };
    JSComponent.prototype.addDragListener = function (dragListener, useCapture) {
        this.setDraggable(true);
        if (dragListener.dragStart) {
            this.element.addEventListener("dragstart", dragListener.dragStart, useCapture === true);
        }
        if (dragListener.drag) {
            this.element.addEventListener("drag", dragListener.drag, useCapture === true);
        }
        if (dragListener.dragEnd) {
            this.element.addEventListener("dragend", dragListener.dragEnd, useCapture === true);
        }
    };
    JSComponent.prototype.removeDragListener = function (dragListener, useCapture) {
        if (dragListener.dragStart) {
            if (useCapture === undefined) {
                this.element.removeEventListener("dragstart", dragListener.dragStart);
                this.element.removeEventListener("dragstart", dragListener.dragStart, true);
            }
            else {
                this.element.removeEventListener("dragstart", dragListener.dragStart, useCapture);
            }
        }
        if (dragListener.drag) {
            if (useCapture === undefined) {
                this.element.removeEventListener("drag", dragListener.drag);
                this.element.removeEventListener("drag", dragListener.drag, true);
            }
            else {
                this.element.removeEventListener("drag", dragListener.drag, useCapture);
            }
        }
        if (dragListener.dragEnd) {
            if (useCapture === undefined) {
                this.element.removeEventListener("dragend", dragListener.dragEnd);
                this.element.removeEventListener("dragend", dragListener.dragEnd, true);
            }
            else {
                this.element.removeEventListener("dragend", dragListener.dragEnd, useCapture);
            }
        }
    };
    JSComponent.prototype.addDropListener = function (dropListener, useCapture) {
        if (dropListener.dragEnter) {
            this.element.addEventListener("dragenter", dropListener.dragEnter, useCapture === true);
        }
        if (dropListener.dragOver) {
            this.element.addEventListener("dragover", dropListener.dragOver, useCapture === true);
        }
        if (dropListener.dragLeave) {
            this.element.addEventListener("dragleave", dropListener.dragLeave, useCapture === true);
        }
        if (dropListener.drop) {
            this.element.addEventListener("drop", dropListener.drop, useCapture === true);
        }
    };
    JSComponent.prototype.removeDropListener = function (dropListener, useCapture) {
        if (dropListener.dragEnter) {
            if (useCapture === undefined) {
                this.element.removeEventListener("dragenter", dropListener.dragEnter);
                this.element.removeEventListener("dragenter", dropListener.dragEnter, true);
            }
            else {
                this.element.removeEventListener("dragenter", dropListener.dragEnter, useCapture);
            }
        }
        if (dropListener.dragOver) {
            if (useCapture === undefined) {
                this.element.removeEventListener("dragover", dropListener.dragOver);
                this.element.removeEventListener("dragover", dropListener.dragOver, true);
            }
            else {
                this.element.removeEventListener("dragover", dropListener.dragOver, useCapture);
            }
        }
        if (dropListener.dragLeave) {
            if (useCapture === undefined) {
                this.element.removeEventListener("dragleave", dropListener.dragLeave);
                this.element.removeEventListener("dragleave", dropListener.dragLeave, true);
            }
            else {
                this.element.removeEventListener("dragleave", dropListener.dragLeave, useCapture);
            }
        }
        if (dropListener.drop) {
            if (useCapture === undefined) {
                this.element.removeEventListener("drop", dropListener.drop);
                this.element.removeEventListener("drop", dropListener.drop, true);
            }
            else {
                this.element.removeEventListener("drop", dropListener.drop, useCapture);
            }
        }
    };
    JSComponent.prototype.addChangeListener = function (changeListener, useCapture) {
        this.element.addEventListener("change", changeListener.stateChanged, useCapture === true);
    };
    JSComponent.prototype.removeChangeListener = function (changeListener, useCapture) {
        if (useCapture === undefined) {
            this.element.removeEventListener("change", changeListener.stateChanged);
            this.element.removeEventListener("change", changeListener.stateChanged, true);
        }
        else {
            this.element.removeEventListener("change", changeListener.stateChanged, useCapture);
        }
    };
    JSComponent.LEFT = "left";
    JSComponent.RIGHT = "right";
    JSComponent.CENTER = "center";
    JSComponent.JUSTIFY = "justify";
    JSComponent.DEFAULT_LAYER = 0;
    JSComponent.PALETTE_LAYER = 100;
    JSComponent.MODAL_LAYER = 200;
    JSComponent.POPUP_LAYER = 300;
    JSComponent.DRAG_LAYER = 400;
    JSComponent.TOP = "top";
    JSComponent.BOTTOM = "bottom";
    JSComponent.HORIZONTAL = "horizontal";
    JSComponent.VERTICAL = "vertical";
    JSComponent.HORIZONTAL_SPLIT = "horizontal";
    JSComponent.VERTICAL_SPLIT = "vertical";
    return JSComponent;
}());
var JSLayout = (function () {
    function JSLayout() {
    }
    JSLayout.prototype.addLayoutComponent = function (component) {
    };
    JSLayout.prototype.removeLayoutComponent = function (component) {
    };
    JSLayout.prototype.preferredLayoutWidth = function (container) {
        var cssWidth = container.getStyle("width");
        if (cssWidth) {
            container.removeStyle("width");
        }
        var widthAttribute = container.getAttribute("width");
        if (widthAttribute) {
            container.removeAttribute("width");
        }
        var width = container.element.getBoundingClientRect().width - container.getBorderLeftWidth() - container.getPaddingLeft() - container.getPaddingRight() - container.getBorderRightWidth();
        if (widthAttribute) {
            container.setAttribute("width", widthAttribute);
        }
        if (cssWidth) {
            container.setStyle("width", cssWidth);
        }
        return width;
    };
    JSLayout.prototype.preferredLayoutHeight = function (container) {
        var cssHeight = container.getStyle("height");
        if (cssHeight) {
            container.removeStyle("height");
        }
        var heightAttribute = container.getAttribute("height");
        if (heightAttribute) {
            container.removeAttribute("height");
        }
        var height = container.element.getBoundingClientRect().height - container.getBorderTopWidth() - container.getPaddingTop() - container.getPaddingBottom() - container.getBorderBottomWidth();
        if (heightAttribute) {
            container.setAttribute("height", heightAttribute);
        }
        if (cssHeight) {
            container.setStyle("height", cssHeight);
        }
        return height;
    };
    JSLayout.prototype.layoutContainer = function (container) {
    };
    JSLayout.TOP = "top";
    JSLayout.LEFT = "left";
    JSLayout.BOTTOM = "bottom";
    JSLayout.RIGHT = "right";
    JSLayout.CENTER = "center";
    JSLayout.NORTH = "north";
    JSLayout.SOUTH = "south";
    JSLayout.WEST = "west";
    JSLayout.EAST = "east";
    JSLayout.NONE = "none";
    JSLayout.HORIZONTAL = "horizontal";
    JSLayout.VERTICAL = "vertical";
    JSLayout.BOTH = "both";
    JSLayout.NORTHWEST = "northwest";
    JSLayout.NORTHEAST = "northeast";
    JSLayout.SOUTHWEST = "southwest";
    JSLayout.SOUTHEAST = "southeast";
    JSLayout.TOP_TO_BOTTOM = "topToBottom";
    JSLayout.BOTTOM_TO_TOP = "bottomToTop";
    JSLayout.LEFT_TO_RIGHT = "leftToRight";
    JSLayout.RIGHT_TO_LEFT = "rightToLeft";
    return JSLayout;
}());
var JSHTMLComponent = (function (_super) {
    __extends(JSHTMLComponent, _super);
    function JSHTMLComponent(element) {
        return _super.call(this, element) || this;
    }
    JSHTMLComponent.prototype.init = function () {
        this.addClass("JSHTMLComponent");
    };
    JSHTMLComponent.prototype.getX = function () {
        return +this.getComputedStyle("left").replace("px", "");
    };
    JSHTMLComponent.prototype.setX = function (x) {
        this.setStyle("left", x + "px");
    };
    JSHTMLComponent.prototype.getY = function () {
        return +this.getComputedStyle("top").replace("px", "");
    };
    JSHTMLComponent.prototype.setY = function (y) {
        this.setStyle("top", y + "px");
    };
    JSHTMLComponent.prototype.getWidth = function () {
        return this.width || this.element.getBoundingClientRect().width - this.getBorderLeftWidth() - this.getPaddingLeft() - this.getPaddingRight() - this.getBorderRightWidth();
    };
    JSHTMLComponent.prototype.setWidth = function (width) {
        this.oldWidth = this.width;
        this.setStyle("width", width + "px");
        this.width = width;
    };
    JSHTMLComponent.prototype.getHeight = function () {
        return this.height || this.element.getBoundingClientRect().height - this.getBorderTopWidth() - this.getPaddingTop() - this.getPaddingBottom() - this.getBorderBottomWidth();
    };
    JSHTMLComponent.prototype.setHeight = function (height) {
        this.oldHeight = this.height;
        this.setStyle("height", height + "px");
        this.height = height;
    };
    JSHTMLComponent.prototype.getOuterWidth = function () {
        return this.getWidth() +
            this.getMarginLeft() + this.getBorderLeftWidth() + this.getPaddingLeft() +
            this.getPaddingRight() + this.getBorderRightWidth() + this.getMarginRight();
    };
    JSHTMLComponent.prototype.setOuterWidth = function (outerWidth) {
        this.setWidth(outerWidth -
            this.getMarginLeft() - this.getBorderLeftWidth() - this.getPaddingLeft() -
            this.getPaddingRight() - this.getBorderRightWidth() - this.getMarginRight());
    };
    JSHTMLComponent.prototype.getOuterHeight = function () {
        return this.getHeight() +
            this.getMarginTop() + this.getBorderTopWidth() + this.getPaddingTop() +
            this.getPaddingBottom() + this.getBorderBottomWidth() + this.getMarginBottom();
    };
    JSHTMLComponent.prototype.setOuterHeight = function (outerHeight) {
        this.setHeight(outerHeight -
            this.getMarginTop() - this.getBorderTopWidth() - this.getPaddingTop() -
            this.getPaddingBottom() - this.getBorderBottomWidth() - this.getMarginBottom());
    };
    JSHTMLComponent.prototype.getInsetTop = function () {
        return this.getPaddingTop();
    };
    JSHTMLComponent.prototype.getInsetLeft = function () {
        return this.getPaddingLeft();
    };
    JSHTMLComponent.prototype.getInsetBottom = function () {
        return this.getPaddingBottom();
    };
    JSHTMLComponent.prototype.getInsetRight = function () {
        return this.getPaddingRight();
    };
    JSHTMLComponent.prototype.isDisplayable = function () {
        return this.getStyle("display") !== "none";
    };
    JSHTMLComponent.prototype.getPreferredOuterWidth = function () {
        return this.getPreferredWidth() +
            this.getMarginLeft() + this.getBorderLeftWidth() + this.getPaddingLeft() +
            this.getPaddingRight() + this.getBorderRightWidth() + this.getMarginRight();
    };
    JSHTMLComponent.prototype.getPreferredOuterHeight = function () {
        return this.getPreferredHeight() +
            this.getMarginTop() + this.getBorderTopWidth() + this.getPaddingTop() +
            this.getPaddingBottom() + this.getBorderBottomWidth() + this.getMarginBottom();
    };
    JSHTMLComponent.prototype.getMarginTop = function () {
        return +this.getComputedStyle("margin-top").replace("px", "");
    };
    JSHTMLComponent.prototype.getMarginLeft = function () {
        return +this.getComputedStyle("margin-left").replace("px", "");
    };
    JSHTMLComponent.prototype.getMarginBottom = function () {
        return +this.getComputedStyle("margin-bottom").replace("px", "");
    };
    JSHTMLComponent.prototype.getMarginRight = function () {
        return +this.getComputedStyle("margin-right").replace("px", "");
    };
    JSHTMLComponent.prototype.getBorderTopWidth = function () {
        var boxSizing = this.getComputedStyle("box-sizing");
        if (boxSizing === "border-box") {
            return 0;
        }
        else {
            return +this.getComputedStyle("border-top-width").replace("px", "");
        }
    };
    JSHTMLComponent.prototype.getBorderLeftWidth = function () {
        var boxSizing = this.getComputedStyle("box-sizing");
        if (boxSizing === "border-box") {
            return 0;
        }
        else {
            return +this.getComputedStyle("border-left-width").replace("px", "");
        }
    };
    JSHTMLComponent.prototype.getBorderBottomWidth = function () {
        var boxSizing = this.getComputedStyle("box-sizing");
        if (boxSizing === "border-box") {
            return 0;
        }
        else {
            return +this.getComputedStyle("border-bottom-width").replace("px", "");
        }
    };
    JSHTMLComponent.prototype.getBorderRightWidth = function () {
        var boxSizing = this.getComputedStyle("box-sizing");
        if (boxSizing === "border-box") {
            return 0;
        }
        else {
            return +this.getComputedStyle("border-right-width").replace("px", "");
        }
    };
    JSHTMLComponent.prototype.getPaddingTop = function () {
        var boxSizing = this.getComputedStyle("box-sizing");
        if (boxSizing === "border-box") {
            return 0;
        }
        else {
            return +this.getComputedStyle("padding-top").replace("px", "");
        }
    };
    JSHTMLComponent.prototype.getPaddingLeft = function () {
        var boxSizing = this.getComputedStyle("box-sizing");
        if (boxSizing === "border-box") {
            return 0;
        }
        else {
            return +this.getComputedStyle("padding-left").replace("px", "");
        }
    };
    JSHTMLComponent.prototype.getPaddingBottom = function () {
        var boxSizing = this.getComputedStyle("box-sizing");
        if (boxSizing === "border-box") {
            return 0;
        }
        else {
            return +this.getComputedStyle("padding-bottom").replace("px", "");
        }
    };
    JSHTMLComponent.prototype.getPaddingRight = function () {
        var boxSizing = this.getComputedStyle("box-sizing");
        if (boxSizing === "border-box") {
            return 0;
        }
        else {
            return +this.getComputedStyle("padding-right").replace("px", "");
        }
    };
    JSHTMLComponent.prototype.getBackground = function () {
        return this.getStyle("background-color");
    };
    JSHTMLComponent.prototype.setBackground = function (background) {
        this.setStyle("background-color", background);
    };
    JSHTMLComponent.prototype.getForeground = function () {
        return this.getStyle("color");
    };
    JSHTMLComponent.prototype.setForeground = function (foreground) {
        this.setStyle("color", foreground);
    };
    JSHTMLComponent.prototype.getText = function () {
        return this.element.textContent;
    };
    JSHTMLComponent.prototype.setText = function (text) {
        if (text) {
            var s = text.trim().toLowerCase();
            if (s.indexOf("<html>") === 0 && s.indexOf("</html>", s.length - "</html>".length) !== -1) {
                this.element.innerHTML = text;
                return;
            }
        }
        this.element.textContent = text;
    };
    JSHTMLComponent.prototype.getCursor = function () {
        return this.getStyle("cursor");
    };
    JSHTMLComponent.prototype.setCursor = function (cursor) {
        this.setStyle("cursor", cursor);
    };
    return JSHTMLComponent;
}(JSComponent));
var JSSVGComponent = (function (_super) {
    __extends(JSSVGComponent, _super);
    function JSSVGComponent(element) {
        return _super.call(this, element) || this;
    }
    JSSVGComponent.prototype.init = function () {
        this.addClass("JSSVGComponent");
    };
    JSSVGComponent.prototype.getAttributeNS = function (attribute) {
        return this.element.getAttributeNS(null, attribute);
    };
    JSSVGComponent.prototype.setAttributeNS = function (attribute, value) {
        this.element.setAttributeNS(null, attribute, value);
    };
    JSSVGComponent.prototype.removeAttributeNS = function (attribute) {
        this.element.removeAttributeNS(null, attribute);
    };
    JSSVGComponent.prototype.getX = function () {
        return +this.getAttribute("x");
    };
    JSSVGComponent.prototype.setX = function (x) {
        this.setAttribute("x", "" + x);
    };
    JSSVGComponent.prototype.getY = function () {
        return +this.getAttribute("y");
    };
    JSSVGComponent.prototype.setY = function (y) {
        this.setAttribute("y", "" + y);
    };
    JSSVGComponent.prototype.getWidth = function () {
        return this.width || this.element.getBoundingClientRect().width;
    };
    JSSVGComponent.prototype.setWidth = function (width) {
        this.oldWidth = this.width;
        this.setAttribute("width", "" + width);
        this.width = width;
    };
    JSSVGComponent.prototype.getHeight = function () {
        return this.height || this.element.getBoundingClientRect().height;
    };
    JSSVGComponent.prototype.setHeight = function (height) {
        this.oldHeight = this.height;
        this.setAttribute("height", "" + height);
        this.height = height;
    };
    JSSVGComponent.prototype.getOuterWidth = function () {
        return this.getWidth();
    };
    JSSVGComponent.prototype.setOuterWidth = function (outerWidth) {
        this.setWidth(outerWidth);
    };
    JSSVGComponent.prototype.getOuterHeight = function () {
        return this.getHeight();
    };
    JSSVGComponent.prototype.setOuterHeight = function (outerHeight) {
        this.setHeight(outerHeight);
    };
    JSSVGComponent.prototype.getPreferredOuterWidth = function () {
        return this.getPreferredWidth();
    };
    JSSVGComponent.prototype.getPreferredOuterHeight = function () {
        return this.getPreferredHeight();
    };
    JSSVGComponent.prototype.getBackground = function () {
        return this.getAttribute("fill");
    };
    JSSVGComponent.prototype.setBackground = function (background) {
        this.setAttribute("fill", background);
    };
    JSSVGComponent.prototype.getForeground = function () {
        return this.getAttribute("stroke");
    };
    JSSVGComponent.prototype.setForeground = function (foreground) {
        this.setAttribute("stroke", foreground);
    };
    JSSVGComponent.prototype.getOpacity = function () {
        return +this.getAttribute("opacity");
    };
    JSSVGComponent.prototype.setOpacity = function (opacity) {
        this.setAttribute("opacity", "" + opacity);
    };
    return JSSVGComponent;
}(JSComponent));
var JSAction = (function () {
    function JSAction(nameOrIcon, icon) {
        if (nameOrIcon !== undefined) {
            if (nameOrIcon instanceof JSComponent) {
                this.setIcon(nameOrIcon);
            }
            else {
                this.setName(nameOrIcon);
                if (icon) {
                    this.setIcon(icon);
                }
            }
        }
        this.setPropertyChangeSupport(new JSPropertyChangeSupport());
    }
    JSAction.prototype.getName = function () {
        return this.name;
    };
    JSAction.prototype.setName = function (name) {
        this.name = name;
    };
    JSAction.prototype.getIcon = function () {
        return this.icon;
    };
    JSAction.prototype.setIcon = function (icon) {
        this.icon = icon;
    };
    JSAction.prototype.isEnabled = function () {
        return this.enabled;
    };
    JSAction.prototype.setEnabled = function (enabled) {
        var oldEnabled = this.isEnabled();
        if (oldEnabled !== enabled) {
            this.enabled = enabled;
            this.firePropertyChange(new JSPropertyChangeEvent(this, "enabled", oldEnabled, enabled));
        }
    };
    JSAction.prototype.getActionListener = function () {
        return this.actionListener;
    };
    JSAction.prototype.setActionListener = function (actionListener) {
        this.actionListener = actionListener;
    };
    JSAction.prototype.getMouseListener = function () {
        return this.mouseListener;
    };
    JSAction.prototype.setMouseListener = function (mouseListener) {
        this.mouseListener = mouseListener;
    };
    JSAction.prototype.getPropertyChangeSupport = function () {
        return this.propertyChangeSupport;
    };
    JSAction.prototype.setPropertyChangeSupport = function (propertyChangeSupport) {
        this.propertyChangeSupport = propertyChangeSupport;
    };
    JSAction.prototype.addPropertyChangeListener = function (propertyChangeListener) {
        this.getPropertyChangeSupport().addPropertyChangeListener(propertyChangeListener);
    };
    JSAction.prototype.removePropertyChangeListener = function (propertyChangeListener) {
        this.getPropertyChangeSupport().removePropertyChangeListener(propertyChangeListener);
    };
    JSAction.prototype.firePropertyChange = function (propertyChangeEvent) {
        this.getPropertyChangeSupport().firePropertyChange(propertyChangeEvent);
    };
    return JSAction;
}());
var JSActionEvent = (function () {
    function JSActionEvent(source, actionCommand) {
        this.setSource(source);
        if (actionCommand !== undefined) {
            this.setActionCommand(actionCommand);
        }
    }
    JSActionEvent.prototype.getSource = function () {
        return this.source;
    };
    JSActionEvent.prototype.setSource = function (source) {
        this.source = source;
    };
    JSActionEvent.prototype.getActionCommand = function () {
        return this.actionCommand;
    };
    JSActionEvent.prototype.setActionCommand = function (actionCommand) {
        this.actionCommand = actionCommand;
    };
    return JSActionEvent;
}());
var JSActionListener = (function () {
    function JSActionListener(actionListenerOrThisValue, actionListener) {
        if (actionListener === undefined) {
            actionListener = actionListenerOrThisValue;
            this.actionPerformed = function (actionEvent) {
                actionListener.actionPerformed(actionEvent);
            };
        }
        else {
            var thisValue = actionListenerOrThisValue;
            this.actionPerformed = function (actionEvent) {
                actionListener.actionPerformed.call(thisValue, actionEvent);
            };
        }
    }
    return JSActionListener;
}());
var JSAdjustmentListener = (function () {
    function JSAdjustmentListener(adjustmentListenerOrThisValue, redispatchOrAdjustmentListener, redispatch) {
        if (redispatchOrAdjustmentListener === undefined || typeof redispatchOrAdjustmentListener === "boolean") {
            var adjustmentListener = adjustmentListenerOrThisValue;
            redispatch = redispatchOrAdjustmentListener;
            this.adjustmentValueChanged = function (event) {
                adjustmentListener.adjustmentValueChanged(event);
                if (!redispatch) {
                    event.stopPropagation();
                }
            };
        }
        else {
            var thisValue = adjustmentListenerOrThisValue;
            var adjustmentListener = redispatchOrAdjustmentListener;
            this.adjustmentValueChanged = function (event) {
                adjustmentListener.adjustmentValueChanged.call(thisValue, event);
                if (!redispatch) {
                    event.stopPropagation();
                }
            };
        }
    }
    return JSAdjustmentListener;
}());
var JSBody = (function (_super) {
    __extends(JSBody, _super);
    function JSBody() {
        var _this = _super.call(this, document.body) || this;
        var graphics = _this.getGraphics();
        if (!graphics) {
            graphics = new JSGraphics();
            _this.add(graphics);
            _this.setGraphics(graphics);
        }
        var defs = _this.getDefs();
        if (!defs) {
            defs = new JSDefs();
            graphics.add(defs);
            _this.setDefs(defs);
        }
        var popupMenuContainer = _this.getPopupMenuContainer();
        if (!popupMenuContainer) {
            popupMenuContainer = new JSDiv();
            _this.add(popupMenuContainer, JSBorderLayout.NORTH);
            _this.setPopupMenuContainer(popupMenuContainer);
        }
        var dragImageContainer = _this.getDragImageContainer();
        if (!dragImageContainer) {
            dragImageContainer = new JSDiv();
            dragImageContainer.setVisible(false);
            _this.add(dragImageContainer, JSBorderLayout.NORTH);
            _this.setDragImageContainer(dragImageContainer);
        }
        _this.addMouseListener({
            mouseReleased: function (mouseEvent) {
                var body = JSBody.getInstance();
                body.setDragSource(null);
            },
            mouseMoved: function (mouseEvent) {
                var body = JSBody.getInstance();
                var dragSource = body.getDragSource();
                if (dragSource) {
                    dragSource.fireMouseDragged(mouseEvent);
                }
            }
        }, true);
        window.addEventListener("resize", function () {
            JSBody.getInstance().validate();
        });
        return _this;
    }
    JSBody.getInstance = function () {
        if (JSBody.instance === undefined) {
            JSBody.instance = new JSBody();
        }
        return JSBody.instance;
    };
    JSBody.prototype.init = function () {
        this.addClass("JSBody");
        this.setStyle("height", "100%");
        this.setStyle("margin", "0");
        this.setStyle("overflow", "hidden");
        this.setStyle("user-select", "none");
        this.setStyle("-ms-user-select", "none");
        this.setStyle("-moz-user-select", "none");
        this.setStyle("-webkit-user-select", "none");
        document.documentElement.style.height = "100%";
    };
    JSBody.prototype.getGraphics = function () {
        return this.getData("graphics");
    };
    JSBody.prototype.setGraphics = function (graphics) {
        this.setData("graphics", graphics);
    };
    JSBody.prototype.getDefs = function () {
        return this.getData("defs");
    };
    JSBody.prototype.setDefs = function (defs) {
        this.setData("defs", defs);
    };
    JSBody.prototype.getContentPane = function () {
        return this.getData("contentPane");
    };
    JSBody.prototype.setContentPane = function (contentPane) {
        if (contentPane) {
            var oldContentPane = this.getContentPane();
            if (oldContentPane !== contentPane) {
                if (oldContentPane) {
                    this.remove(oldContentPane);
                }
                if (contentPane) {
                    this.add(contentPane);
                }
            }
        }
        this.setData("contentPane", contentPane);
    };
    JSBody.prototype.getPopupMenuContainer = function () {
        return this.getData("popupMenuContainer");
    };
    JSBody.prototype.setPopupMenuContainer = function (popupMenuContainer) {
        this.setData("popupMenuContainer", popupMenuContainer);
    };
    JSBody.prototype.getPopupMenu = function () {
        return this.popupMenu;
    };
    JSBody.prototype.setPopupMenu = function (popupMenu) {
        var oldPopupMenu = this.getPopupMenu();
        if (oldPopupMenu !== popupMenu) {
            var popupMenuContainer = this.getPopupMenuContainer();
            if (oldPopupMenu) {
                popupMenuContainer.remove(oldPopupMenu);
            }
            if (popupMenu) {
                popupMenuContainer.add(popupMenu);
                popupMenuContainer.validate();
            }
        }
        this.popupMenu = popupMenu;
    };
    JSBody.prototype.getDragImageContainer = function () {
        return this.getData("dragImageContainer");
    };
    JSBody.prototype.setDragImageContainer = function (dragImageContainer) {
        this.setData("dragImageContainer", dragImageContainer);
    };
    JSBody.prototype.getDragSource = function () {
        return this.dragSource;
    };
    JSBody.prototype.setDragSource = function (dragSource) {
        this.dragSource = dragSource;
    };
    JSBody.prototype.getDragImage = function () {
        return this.dragImage;
    };
    JSBody.prototype.setDragImage = function (dragImage) {
        var oldDragImage = this.getDragImage();
        if (oldDragImage !== dragImage) {
            var dragImageContainer = this.getDragImageContainer();
            if (oldDragImage) {
                dragImageContainer.remove(new JSComponent(oldDragImage));
            }
            if (dragImage) {
                dragImageContainer.add(new JSComponent(dragImage));
                dragImageContainer.validate();
            }
        }
        this.dragImage = dragImage;
    };
    JSBody.prototype.getFileChooser = function () {
        return this.fileChooser;
    };
    JSBody.prototype.setFileChooser = function (fileChooser) {
        var oldFileChooser = this.getFileChooser();
        if (oldFileChooser !== fileChooser) {
            if (oldFileChooser) {
                this.remove(oldFileChooser);
            }
            if (fileChooser) {
                this.add(fileChooser);
            }
        }
        this.fileChooser = fileChooser;
    };
    return JSBody;
}(JSHTMLComponent));
var JSBorderLayout = (function (_super) {
    __extends(JSBorderLayout, _super);
    function JSBorderLayout(hgapOrFloat, vgapOrHgap, vgap) {
        var _this = _super.call(this) || this;
        _this.hgap = 0;
        _this.vgap = 0;
        _this.float = false;
        if (typeof hgapOrFloat === "number") {
            _this.setHgap(hgapOrFloat);
            _this.setVgap(vgapOrHgap);
        }
        else {
            _this.setFloat(hgapOrFloat);
            if (vgapOrHgap !== undefined) {
                _this.setHgap(vgapOrHgap);
                _this.setVgap(vgap);
            }
        }
        return _this;
    }
    JSBorderLayout.prototype.getHgap = function () {
        return this.hgap;
    };
    JSBorderLayout.prototype.setHgap = function (hgap) {
        this.hgap = hgap;
    };
    JSBorderLayout.prototype.getVgap = function () {
        return this.vgap;
    };
    JSBorderLayout.prototype.setVgap = function (vgap) {
        this.vgap = vgap;
    };
    JSBorderLayout.prototype.isFloat = function () {
        return this.float;
    };
    JSBorderLayout.prototype.setFloat = function (float) {
        this.float = float;
    };
    JSBorderLayout.prototype.addLayoutComponent = function (component) {
        component.setStyle("position", "absolute");
    };
    JSBorderLayout.prototype.preferredLayoutWidth = function (container) {
        var preferredLayoutWidth = 0;
        var hgap = this.getHgap();
        var float = this.isFloat();
        var components = container.getComponents();
        if (float) {
            for (var i = components.length - 1; i >= 0; i--) {
                var component = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                var constraints = component.getConstraints();
                switch (constraints) {
                    case JSBorderLayout.WEST:
                    case JSBorderLayout.EAST:
                        preferredLayoutWidth += componentPreferredOuterWidth + hgap;
                        break;
                    case JSBorderLayout.NORTH:
                    case JSBorderLayout.SOUTH:
                    case JSBorderLayout.CENTER:
                    default:
                        preferredLayoutWidth = Math.max(preferredLayoutWidth, componentPreferredOuterWidth + hgap);
                }
            }
        }
        else {
            for (var i = components.length - 1; i >= 0; i--) {
                var component = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var constraints = component.getConstraints();
                if (!constraints || constraints === JSBorderLayout.CENTER) {
                    preferredLayoutWidth = Math.max(preferredLayoutWidth, component.getPreferredOuterWidth() + hgap);
                }
            }
            for (var i = components.length - 1; i >= 0; i--) {
                var component = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var constraints = component.getConstraints();
                if (constraints === JSBorderLayout.WEST || constraints === JSBorderLayout.EAST) {
                    preferredLayoutWidth += component.getPreferredOuterWidth() + hgap;
                }
            }
            for (var i = components.length - 1; i >= 0; i--) {
                var component = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var constraints = component.getConstraints();
                if (constraints === JSBorderLayout.NORTH || constraints === JSBorderLayout.SOUTH) {
                    preferredLayoutWidth = Math.max(preferredLayoutWidth, component.getPreferredOuterWidth() + hgap);
                }
            }
        }
        if (preferredLayoutWidth != 0) {
            preferredLayoutWidth -= hgap;
        }
        return preferredLayoutWidth;
    };
    JSBorderLayout.prototype.preferredLayoutHeight = function (container) {
        var preferredLayoutHeight = 0;
        var vgap = this.getVgap();
        var float = this.isFloat();
        var components = container.getComponents();
        if (float) {
            for (var i = components.length - 1; i >= 0; i--) {
                var component = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                var constraints = component.getConstraints();
                switch (constraints) {
                    case JSBorderLayout.NORTH:
                    case JSBorderLayout.SOUTH:
                        preferredLayoutHeight += componentPreferredOuterHeight + vgap;
                        break;
                    case JSBorderLayout.EAST:
                    case JSBorderLayout.WEST:
                    case JSBorderLayout.CENTER:
                    default:
                        preferredLayoutHeight = Math.max(preferredLayoutHeight, componentPreferredOuterHeight + vgap);
                }
            }
        }
        else {
            for (var i = components.length - 1; i >= 0; i--) {
                var component = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var constraints = component.getConstraints();
                if (!constraints || constraints === JSBorderLayout.CENTER) {
                    preferredLayoutHeight = Math.max(preferredLayoutHeight, component.getPreferredOuterHeight() + vgap);
                }
            }
            for (var i = components.length - 1; i >= 0; i--) {
                var component = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var constraints = component.getConstraints();
                if (constraints === JSBorderLayout.WEST || constraints === JSBorderLayout.EAST) {
                    preferredLayoutHeight = Math.max(preferredLayoutHeight, component.getPreferredOuterHeight() + vgap);
                }
            }
            for (var i = components.length - 1; i >= 0; i--) {
                var component = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var constraints = component.getConstraints();
                if (constraints === JSBorderLayout.NORTH || constraints === JSBorderLayout.SOUTH) {
                    preferredLayoutHeight += component.getPreferredOuterHeight() + vgap;
                }
            }
        }
        if (preferredLayoutHeight != 0) {
            preferredLayoutHeight -= vgap;
        }
        return preferredLayoutHeight;
    };
    JSBorderLayout.prototype.layoutContainer = function (container) {
        var hgap = this.getHgap();
        var vgap = this.getVgap();
        var float = this.isFloat();
        var width = container.getWidth();
        var height = container.getHeight();
        var x = container.getInsetLeft();
        var y = container.getInsetTop();
        var components = container.getComponents().slice();
        if (float) {
            for (var i = 0; i < components.length; i++) {
                var component = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var constraints = component.getConstraints();
                switch (constraints) {
                    case JSBorderLayout.NORTH:
                        component.setOuterWidth(width);
                        var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                        component.setOuterHeight(componentPreferredOuterHeight);
                        component.setX(x);
                        component.setY(y);
                        height -= componentPreferredOuterHeight + vgap;
                        y += componentPreferredOuterHeight + vgap;
                        break;
                    case JSBorderLayout.SOUTH:
                        component.setOuterWidth(width);
                        var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                        component.setOuterHeight(componentPreferredOuterHeight);
                        component.setX(x);
                        component.setY(y + height - componentPreferredOuterHeight);
                        height -= componentPreferredOuterHeight + vgap;
                        break;
                    case JSBorderLayout.WEST:
                        component.setOuterHeight(height);
                        var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                        component.setOuterWidth(componentPreferredOuterWidth);
                        component.setX(x);
                        component.setY(y);
                        width -= componentPreferredOuterWidth + hgap;
                        x += componentPreferredOuterWidth + hgap;
                        break;
                    case JSBorderLayout.EAST:
                        component.setOuterHeight(height);
                        var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                        component.setOuterWidth(componentPreferredOuterWidth);
                        component.setX(x + width - componentPreferredOuterWidth);
                        component.setY(y);
                        width -= componentPreferredOuterWidth + hgap;
                        break;
                    case JSBorderLayout.CENTER:
                    default:
                        component.setOuterWidth(width);
                        component.setOuterHeight(height);
                        component.setX(x);
                        component.setY(y);
                }
            }
        }
        else {
            for (var i = 0; i < components.length; i++) {
                var component = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var constraints = component.getConstraints();
                if (constraints === JSBorderLayout.NORTH) {
                    component.setOuterWidth(width);
                    var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentPreferredOuterHeight);
                    component.setX(x);
                    component.setY(y);
                    height -= componentPreferredOuterHeight + vgap;
                    y += componentPreferredOuterHeight + vgap;
                }
                else if (constraints === JSBorderLayout.SOUTH) {
                    component.setOuterWidth(width);
                    var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentPreferredOuterHeight);
                    component.setX(x);
                    component.setY(y + height - componentPreferredOuterHeight);
                    height -= componentPreferredOuterHeight + vgap;
                }
            }
            for (var i = 0; i < components.length; i++) {
                var component = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var constraints = component.getConstraints();
                if (constraints === JSBorderLayout.WEST) {
                    component.setOuterHeight(height);
                    var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentPreferredOuterWidth);
                    component.setX(x);
                    component.setY(y);
                    width -= componentPreferredOuterWidth + hgap;
                    x += componentPreferredOuterWidth + hgap;
                }
                else if (constraints === JSBorderLayout.EAST) {
                    component.setOuterHeight(height);
                    var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentPreferredOuterWidth);
                    component.setX(x + width - componentPreferredOuterWidth);
                    component.setY(y);
                    width -= componentPreferredOuterWidth + hgap;
                }
            }
            for (var i = 0; i < components.length; i++) {
                var component = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var constraints = component.getConstraints();
                if (!constraints || constraints === JSBorderLayout.CENTER) {
                    component.setOuterWidth(width);
                    component.setOuterHeight(height);
                    component.setX(x);
                    component.setY(y);
                }
            }
        }
    };
    return JSBorderLayout;
}(JSLayout));
var JSButton = (function (_super) {
    __extends(JSButton, _super);
    function JSButton(elementOrActionOrIconOrText, icon) {
        var _this = _super.call(this, elementOrActionOrIconOrText === undefined || !(elementOrActionOrIconOrText instanceof HTMLButtonElement) ? document.createElement("button") : elementOrActionOrIconOrText) || this;
        if (elementOrActionOrIconOrText !== undefined && !(elementOrActionOrIconOrText instanceof HTMLButtonElement)) {
            if (elementOrActionOrIconOrText instanceof JSAction) {
                _this.setAction(elementOrActionOrIconOrText);
            }
            else if (elementOrActionOrIconOrText instanceof HTMLImageElement) {
                _this.setIcon(new JSImageIcon(elementOrActionOrIconOrText));
            }
            else if (elementOrActionOrIconOrText instanceof JSComponent) {
                _this.setIcon(elementOrActionOrIconOrText);
            }
            else {
                _this.setText(elementOrActionOrIconOrText);
                if (icon !== undefined) {
                    if (icon instanceof HTMLImageElement) {
                        _this.setIcon(new JSImageIcon(icon));
                    }
                    else {
                        _this.setIcon(icon);
                    }
                }
            }
        }
        return _this;
    }
    JSButton.prototype.init = function () {
        this.addClass("JSButton");
        this.setStyle("white-space", "nowrap");
    };
    JSButton.prototype.setIcon = function (icon) {
        var oldIcon = this.getIcon();
        if (oldIcon !== icon) {
            if (oldIcon) {
                this.remove(oldIcon);
            }
            if (icon) {
                var text = this.getText();
                if (text) {
                    icon.setStyle("margin-right", "4px");
                }
                icon.setStyle("vertical-align", "middle");
                this.add(icon, null, 0);
            }
        }
        _super.prototype.setIcon.call(this, icon);
    };
    JSButton.prototype.getSpan = function () {
        var span = this.getData("span");
        if (!span) {
            span = new JSSpan();
            span.setStyle("vertical-align", "middle");
            this.add(span);
            this.setSpan(span);
        }
        return span;
    };
    JSButton.prototype.setSpan = function (span) {
        this.setData("span", span);
    };
    JSButton.prototype.getText = function () {
        var span = this.getSpan();
        return span.getText();
    };
    JSButton.prototype.setText = function (text) {
        var icon = this.getIcon();
        if (icon) {
            icon.setStyle("margin-right", text ? "4px" : "0");
        }
        var span = this.getSpan();
        span.setText(text);
    };
    JSButton.prototype.getPropertyChangeListener = function () {
        var propertyChangeListener = this.getData("propertyChangeListener");
        if (!propertyChangeListener) {
            propertyChangeListener = new JSPropertyChangeListener(this, {
                propertyChange: function (propertyChangeEvent) {
                    var propertyName = propertyChangeEvent.getPropertyName();
                    if (propertyName === "enabled") {
                        var newValue = propertyChangeEvent.getNewValue();
                        this.setEnabled(newValue);
                    }
                }
            });
            this.setData("propertyChangeListener", propertyChangeListener);
        }
        return propertyChangeListener;
    };
    return JSButton;
}(JSHTMLComponent));
var JSCardLayout = (function (_super) {
    __extends(JSCardLayout, _super);
    function JSCardLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selected = null;
        return _this;
    }
    JSCardLayout.prototype.addLayoutComponent = function (component) {
        component.setStyle("position", "absolute");
    };
    JSCardLayout.prototype.preferredLayoutWidth = function (container) {
        var preferredLayoutWidth = 0;
        var components = container.getComponents();
        for (var i = components.length - 1; i >= 0; i--) {
            var component = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var componentPreferredOuterWidth = component.getPreferredOuterWidth();
            preferredLayoutWidth = Math.max(preferredLayoutWidth, componentPreferredOuterWidth);
        }
        return preferredLayoutWidth;
    };
    JSCardLayout.prototype.preferredLayoutHeight = function (container) {
        var preferredLayoutHeight = 0;
        var components = container.getComponents();
        for (var i = components.length - 1; i >= 0; i--) {
            var component = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var componentPreferredOuterHeight = component.getPreferredOuterHeight();
            preferredLayoutHeight = Math.max(preferredLayoutHeight, componentPreferredOuterHeight);
        }
        return preferredLayoutHeight;
    };
    JSCardLayout.prototype.layoutContainer = function (container) {
        var width = container.getWidth();
        var height = container.getHeight();
        var x = container.getInsetLeft();
        var y = container.getInsetTop();
        var components = container.getComponents();
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            component.setOuterWidth(width);
            component.setOuterHeight(height);
            component.setX(x);
            component.setY(y);
        }
        var selected = this.getSelected();
        if (!selected) {
            this.first(container);
        }
    };
    JSCardLayout.prototype.getSelected = function () {
        return this.selected;
    };
    JSCardLayout.prototype.setSelected = function (container, component) {
        var selected = this.getSelected();
        if (selected === component) {
            return;
        }
        if (selected) {
            selected.setVisible(false);
        }
        else {
            var components = container.getComponents();
            for (var i = 0; i < components.length; i++) {
                components[i].setVisible(false);
            }
        }
        if (component) {
            component.setVisible(true);
        }
        this.selected = component;
    };
    JSCardLayout.prototype.setSelectedIndex = function (container, selectedIndex) {
        var components = container.getComponents();
        this.setSelected(container, components[selectedIndex]);
    };
    JSCardLayout.prototype.getSelectedIndex = function (container) {
        var components = container.getComponents();
        return components.indexOf(this.getSelected());
    };
    JSCardLayout.prototype.first = function (container) {
        this.setSelectedIndex(container, 0);
    };
    JSCardLayout.prototype.next = function (container) {
        var componentCount = container.getComponentCount();
        this.setSelectedIndex(container, (this.getSelectedIndex(container) + 1) % componentCount);
    };
    JSCardLayout.prototype.previous = function (container) {
        var componentCount = container.getComponentCount();
        this.setSelectedIndex(container, (this.getSelectedIndex(container) - 1 + componentCount) % componentCount);
    };
    JSCardLayout.prototype.last = function (container) {
        var componentCount = container.getComponentCount();
        this.setSelectedIndex(container, componentCount - 1);
    };
    JSCardLayout.prototype.show = function (container, indexOrConstraints) {
        if (typeof indexOrConstraints === "number") {
            this.setSelectedIndex(container, indexOrConstraints);
        }
        else {
            var components = container.getComponents();
            for (var i = 0; i < components.length; i++) {
                var component = components[i];
                var constraints = component.getConstraints();
                if (constraints === indexOrConstraints) {
                    this.setSelectedIndex(container, i);
                    break;
                }
            }
        }
    };
    return JSCardLayout;
}(JSLayout));
var JSChangeListener = (function () {
    function JSChangeListener(changeListenerOrThisValue, redispatchOrChangeListener, redispatch) {
        if (redispatchOrChangeListener === undefined || typeof redispatchOrChangeListener === "boolean") {
            var changeListener = changeListenerOrThisValue;
            redispatch = redispatchOrChangeListener;
            this.stateChanged = function (event) {
                changeListener.stateChanged(event);
                if (!redispatch) {
                    event.stopPropagation();
                }
            };
        }
        else {
            var thisValue = changeListenerOrThisValue;
            var changeListener = redispatchOrChangeListener;
            this.stateChanged = function (event) {
                changeListener.stateChanged.call(thisValue, event);
                if (!redispatch) {
                    event.stopPropagation();
                }
            };
        }
    }
    return JSChangeListener;
}());
var JSCheckBox = (function (_super) {
    __extends(JSCheckBox, _super);
    function JSCheckBox(element) {
        var _this = _super.call(this, element === undefined ? document.createElement("input") : element) || this;
        _this.setAttribute("type", "checkbox");
        return _this;
    }
    JSCheckBox.prototype.init = function () {
        this.addClass("JSCheckBox");
    };
    return JSCheckBox;
}(JSHTMLComponent));
var JSComboBox = (function (_super) {
    __extends(JSComboBox, _super);
    function JSComboBox(elementOrItems) {
        var _this = _super.call(this, elementOrItems === undefined || !(elementOrItems instanceof HTMLSelectElement) ? document.createElement("select") : elementOrItems) || this;
        if (elementOrItems !== undefined && !(elementOrItems instanceof HTMLSelectElement)) {
            for (var i = 0; i < elementOrItems.length; i++) {
                var item = elementOrItems[i];
                var option = new JSOption(item);
                _this.add(option);
            }
        }
        return _this;
    }
    JSComboBox.prototype.init = function () {
        this.addClass("JSComboBox");
    };
    return JSComboBox;
}(JSHTMLComponent));
var JSDataTransfer = (function () {
    function JSDataTransfer() {
        this.data = {};
    }
    JSDataTransfer.getInstance = function () {
        if (JSDataTransfer.instance === undefined) {
            JSDataTransfer.instance = new JSDataTransfer();
        }
        return JSDataTransfer.instance;
    };
    JSDataTransfer.getData = function (key) {
        return JSDataTransfer.getInstance().getData(key);
    };
    JSDataTransfer.setData = function (key, value) {
        JSDataTransfer.getInstance().setData(key, value);
    };
    JSDataTransfer.getDragImage = function () {
        return JSDataTransfer.getInstance().getDragImage();
    };
    JSDataTransfer.setDragImage = function (dragImage) {
        JSDataTransfer.getInstance().setDragImage(dragImage);
    };
    JSDataTransfer.prototype.getData = function (key) {
        var data = this.data;
        return data[key];
    };
    JSDataTransfer.prototype.setData = function (key, value) {
        var data = this.data;
        data[key] = value;
    };
    JSDataTransfer.prototype.getDragImage = function () {
        var dragImage = this.getData("dragImage");
        if (!dragImage) {
            dragImage = new Image(1, 1);
            dragImage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAANSURBVBhXY/j///9/AAn7A/0FQ0XKAAAAAElFTkSuQmCC";
            this.setDragImage(dragImage);
        }
        return dragImage;
    };
    JSDataTransfer.prototype.setDragImage = function (dragImage) {
        JSBody.getInstance().setDragImage(dragImage);
        this.setData("dragImage", dragImage);
    };
    return JSDataTransfer;
}());
var JSDefs = (function (_super) {
    __extends(JSDefs, _super);
    function JSDefs(element) {
        return _super.call(this, element === undefined ? document.createElementNS("http://www.w3.org/2000/svg", "defs") : element) || this;
    }
    JSDefs.prototype.init = function () {
        this.addClass("JSDefs");
    };
    return JSDefs;
}(JSSVGComponent));
var JSDiv = (function (_super) {
    __extends(JSDiv, _super);
    function JSDiv(element) {
        return _super.call(this, element === undefined ? document.createElement("div") : element) || this;
    }
    JSDiv.prototype.init = function () {
        this.addClass("JSDiv");
    };
    return JSDiv;
}(JSHTMLComponent));
var JSDragListener = (function () {
    function JSDragListener(dragListenerOrThisValue, redispatchOrDragListener, redispatch) {
        if (redispatchOrDragListener === undefined || typeof redispatchOrDragListener === "boolean") {
            var dragListener = dragListenerOrThisValue;
            redispatch = redispatchOrDragListener;
            if (dragListener.dragStart) {
                this.dragStart = function (dragEvent) {
                    dragListener.dragStart(dragEvent);
                    if (!redispatch) {
                        event.stopPropagation();
                    }
                };
            }
            if (dragListener.drag) {
                this.drag = function (dragEvent) {
                    dragListener.drag(dragEvent);
                    if (!redispatch) {
                        event.stopPropagation();
                    }
                };
            }
            if (dragListener.dragEnd) {
                this.dragEnd = function (dragEvent) {
                    dragListener.dragEnd(dragEvent);
                    if (!redispatch) {
                        event.stopPropagation();
                    }
                };
            }
        }
        else {
            var thisValue = dragListenerOrThisValue;
            var dragListener = redispatchOrDragListener;
            if (dragListener.dragStart) {
                this.dragStart = function (dragEvent) {
                    dragListener.dragStart.call(thisValue, dragEvent);
                    if (!redispatch) {
                        event.stopPropagation();
                    }
                };
            }
            if (dragListener.drag) {
                this.drag = function (dragEvent) {
                    dragListener.drag.call(thisValue, dragEvent);
                    if (!redispatch) {
                        event.stopPropagation();
                    }
                };
            }
            if (dragListener.dragEnd) {
                this.dragEnd = function (dragEvent) {
                    dragListener.dragEnd.call(thisValue, dragEvent);
                    if (!redispatch) {
                        event.stopPropagation();
                    }
                };
            }
        }
    }
    return JSDragListener;
}());
var JSDropListener = (function () {
    function JSDropListener(dropListenerOrThisValue, redispatchOrDropListener, redispatch) {
        if (redispatchOrDropListener === undefined || typeof redispatchOrDropListener === "boolean") {
            var dropListener = dropListenerOrThisValue;
            redispatch = redispatchOrDropListener;
            if (dropListener.dragEnter) {
                this.dragEnter = function (dragEvent) {
                    dropListener.dragEnter(dragEvent);
                    if (!redispatch) {
                        dragEvent.stopPropagation();
                    }
                };
            }
            if (dropListener.dragOver) {
                this.dragOver = function (dragEvent) {
                    var preventDefault = dropListener.dragOver(dragEvent);
                    if (preventDefault) {
                        dragEvent.preventDefault();
                    }
                    if (!redispatch) {
                        dragEvent.stopPropagation();
                    }
                    return preventDefault;
                };
            }
            if (dropListener.dragLeave) {
                this.dragLeave = function (dragEvent) {
                    dropListener.dragLeave(dragEvent);
                    if (!redispatch) {
                        dragEvent.stopPropagation();
                    }
                };
            }
            if (dropListener.drop) {
                this.drop = function (dragEvent) {
                    var preventDefault = dropListener.drop(dragEvent);
                    if (preventDefault) {
                        dragEvent.preventDefault();
                    }
                    if (!redispatch) {
                        dragEvent.stopPropagation();
                    }
                    return preventDefault;
                };
            }
        }
        else {
            var thisValue = dropListenerOrThisValue;
            var dropListener = redispatchOrDropListener;
            if (dropListener.dragEnter) {
                this.dragEnter = function (dragEvent) {
                    dropListener.dragEnter.call(thisValue, dragEvent);
                    if (!redispatch) {
                        dragEvent.stopPropagation();
                    }
                };
            }
            if (dropListener.dragOver) {
                this.dragOver = function (dragEvent) {
                    var preventDefault = dropListener.dragOver.call(thisValue, dragEvent);
                    if (preventDefault) {
                        dragEvent.preventDefault();
                    }
                    if (!redispatch) {
                        dragEvent.stopPropagation();
                    }
                    return preventDefault;
                };
            }
            if (dropListener.dragLeave) {
                this.dragLeave = function (dragEvent) {
                    dropListener.dragLeave.call(thisValue, dragEvent);
                    if (!redispatch) {
                        dragEvent.stopPropagation();
                    }
                };
            }
            if (dropListener.drop) {
                this.drop = function (dragEvent) {
                    var preventDefault = dropListener.drop.call(thisValue, dragEvent);
                    if (preventDefault) {
                        dragEvent.preventDefault();
                    }
                    if (!redispatch) {
                        dragEvent.stopPropagation();
                    }
                    return preventDefault;
                };
            }
        }
    }
    return JSDropListener;
}());
var JSFileChooser = (function (_super) {
    __extends(JSFileChooser, _super);
    function JSFileChooser(element) {
        var _this = _super.call(this, element === undefined ? document.createElement("input") : element) || this;
        _this.setAttribute("type", "file");
        _this.setStyle("display", "none");
        JSBody.getInstance().setFileChooser(_this);
        _this.addChangeListener(new JSChangeListener(_this, {
            stateChanged: function (event) {
                this.setSelectedFiles(this.element.files);
            }
        }));
        return _this;
    }
    JSFileChooser.prototype.init = function () {
        this.addClass("JSFileChooser");
    };
    JSFileChooser.prototype.getFileFilter = function () {
        return this.getAttribute("accept");
    };
    JSFileChooser.prototype.setFileFilter = function (fileFilter) {
        this.setAttribute("accept", fileFilter);
    };
    JSFileChooser.prototype.showOpenDialog = function () {
        this.element.click();
    };
    JSFileChooser.prototype.getSelectedFiles = function () {
        return this.selectedFiles;
    };
    JSFileChooser.prototype.setSelectedFiles = function (selectedFiles) {
        this.selectedFiles = selectedFiles;
    };
    return JSFileChooser;
}(JSHTMLComponent));
var JSFileUtils = (function () {
    function JSFileUtils() {
    }
    JSFileUtils.writeStringToFile = function (filename, text) {
        var a = document.createElement("a");
        a.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
        a.setAttribute("download", filename);
        var event = document.createEvent("MouseEvents");
        event.initEvent("click", true, true);
        a.dispatchEvent(event);
    };
    return JSFileUtils;
}());
var JSFlowLayout = (function (_super) {
    __extends(JSFlowLayout, _super);
    function JSFlowLayout(hgapOrAlignOrOrientation, vgapOrHgapOrAlign, vgapOrHgap, vgap) {
        var _this = _super.call(this) || this;
        _this.hgap = 0;
        _this.vgap = 0;
        _this.align = JSFlowLayout.CENTER;
        _this.orientation = JSFlowLayout.TOP_TO_BOTTOM;
        if (hgapOrAlignOrOrientation !== undefined) {
            if (typeof hgapOrAlignOrOrientation === "number") {
                _this.setHgap(hgapOrAlignOrOrientation);
                _this.setVgap(vgapOrHgapOrAlign);
            }
            else if (vgapOrHgapOrAlign === undefined) {
                _this.setAlign(hgapOrAlignOrOrientation);
            }
            else if (typeof vgapOrHgapOrAlign === "number") {
                _this.setAlign(hgapOrAlignOrOrientation);
                _this.setHgap(vgapOrHgapOrAlign);
                _this.setVgap(vgapOrHgap);
            }
            else {
                _this.setOrientation(hgapOrAlignOrOrientation);
                _this.setAlign(vgapOrHgapOrAlign);
                if (vgapOrHgap !== undefined) {
                    _this.setHgap(vgapOrHgap);
                    _this.setVgap(vgap);
                }
            }
        }
        return _this;
    }
    JSFlowLayout.prototype.getHgap = function () {
        return this.hgap;
    };
    JSFlowLayout.prototype.setHgap = function (hgap) {
        this.hgap = hgap;
    };
    JSFlowLayout.prototype.getVgap = function () {
        return this.vgap;
    };
    JSFlowLayout.prototype.setVgap = function (vgap) {
        this.vgap = vgap;
    };
    JSFlowLayout.prototype.getAlign = function () {
        return this.align;
    };
    JSFlowLayout.prototype.setAlign = function (align) {
        this.align = align;
    };
    JSFlowLayout.prototype.getOrientation = function () {
        return this.orientation;
    };
    JSFlowLayout.prototype.setOrientation = function (orientation) {
        this.orientation = orientation;
    };
    JSFlowLayout.prototype.addLayoutComponent = function (component) {
        component.setStyle("position", "absolute");
    };
    JSFlowLayout.prototype.preferredLayoutWidth = function (container) {
        var preferredLayoutWidth = 0;
        var hgap = this.getHgap();
        var vgap = this.getVgap();
        var components = container.getComponents();
        var whiteSpace = container.getStyle("white-space");
        var orientation = this.getOrientation();
        if (orientation === JSFlowLayout.LEFT_TO_RIGHT || orientation === JSFlowLayout.RIGHT_TO_LEFT) {
            if (whiteSpace === "nowrap") {
                for (var i = 0; i < components.length; i++) {
                    var component = components[i];
                    if (!component.isDisplayable()) {
                        continue;
                    }
                    var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                    preferredLayoutWidth = Math.max(preferredLayoutWidth, componentPreferredOuterWidth);
                }
            }
            else {
                var containerHeight = container.getHeight();
                var rowWidth = 0;
                var rowHeight = 0;
                for (var i = 0; i < components.length; i++) {
                    var component = components[i];
                    if (!component.isDisplayable()) {
                        continue;
                    }
                    var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                    var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                    if (rowHeight + componentPreferredOuterHeight > containerHeight) {
                        preferredLayoutWidth += rowWidth;
                        rowWidth = 0;
                        rowHeight = 0;
                    }
                    rowWidth = Math.max(rowWidth, componentPreferredOuterWidth + hgap);
                    rowHeight += componentPreferredOuterHeight + vgap;
                }
                preferredLayoutWidth += rowWidth;
                if (preferredLayoutWidth != 0) {
                    preferredLayoutWidth -= hgap;
                }
            }
        }
        else {
            for (var i = 0; i < components.length; i++) {
                var component = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                preferredLayoutWidth += componentPreferredOuterWidth + hgap;
            }
            if (preferredLayoutWidth != 0) {
                preferredLayoutWidth -= hgap;
            }
            if (whiteSpace !== "nowrap") {
                var parent = container.getParent();
                preferredLayoutWidth = Math.min(preferredLayoutWidth, parent.getWidth());
            }
        }
        return preferredLayoutWidth;
    };
    JSFlowLayout.prototype.preferredLayoutHeight = function (container) {
        var preferredLayoutHeight = 0;
        var hgap = this.getHgap();
        var vgap = this.getVgap();
        var components = container.getComponents();
        var whiteSpace = container.getStyle("white-space");
        var orientation = this.getOrientation();
        if (orientation === JSFlowLayout.LEFT_TO_RIGHT || orientation === JSFlowLayout.RIGHT_TO_LEFT) {
            for (var i = 0; i < components.length; i++) {
                var component = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                preferredLayoutHeight += componentPreferredOuterHeight + vgap;
            }
            if (preferredLayoutHeight != 0) {
                preferredLayoutHeight -= vgap;
            }
            if (whiteSpace !== "nowrap") {
                var parent = container.getParent();
                preferredLayoutHeight = Math.min(preferredLayoutHeight, parent.getHeight());
            }
        }
        else {
            if (whiteSpace === "nowrap") {
                for (var i = 0; i < components.length; i++) {
                    var component = components[i];
                    if (!component.isDisplayable()) {
                        continue;
                    }
                    var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                    preferredLayoutHeight = Math.max(preferredLayoutHeight, componentPreferredOuterHeight);
                }
            }
            else {
                var containerWidth = container.getWidth();
                var rowWidth = 0;
                var rowHeight = 0;
                for (var i = 0; i < components.length; i++) {
                    var component = components[i];
                    if (!component.isDisplayable()) {
                        continue;
                    }
                    var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                    var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                    if (rowWidth + componentPreferredOuterWidth > containerWidth) {
                        preferredLayoutHeight += rowHeight;
                        rowWidth = 0;
                        rowHeight = 0;
                    }
                    rowWidth += componentPreferredOuterWidth + hgap;
                    rowHeight = Math.max(rowHeight, componentPreferredOuterHeight + vgap);
                }
                preferredLayoutHeight += rowHeight;
                if (preferredLayoutHeight != 0) {
                    preferredLayoutHeight -= vgap;
                }
            }
        }
        return preferredLayoutHeight;
    };
    JSFlowLayout.prototype.layoutContainer = function (container) {
        var hgap = this.getHgap();
        var vgap = this.getVgap();
        var containerWidth = container.getWidth();
        var containerHeight = container.getHeight();
        var rowWidth = 0;
        var rowHeight = 0;
        var n = 0;
        var components = container.getComponents();
        var orientation = this.getOrientation();
        if (orientation === JSFlowLayout.RIGHT_TO_LEFT) {
            var x = containerWidth - container.getInsetRight();
            var y = container.getInsetTop();
            for (var i = 0; i < components.length; i++) {
                var component = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                if (rowHeight + componentPreferredOuterHeight > containerHeight) {
                    rowHeight -= vgap;
                    this.layoutComponents(container, components.slice(n, i), x - rowWidth, y, rowWidth, rowHeight);
                    x -= rowWidth;
                    rowWidth = 0;
                    rowHeight = 0;
                    n = i;
                }
                rowWidth = Math.max(rowWidth, componentPreferredOuterWidth + hgap);
                rowHeight += componentPreferredOuterHeight + vgap;
            }
            if (n < i) {
                rowHeight -= vgap;
                this.layoutComponents(container, components.slice(n, i), x - rowWidth, y, rowWidth, rowHeight);
            }
        }
        else if (orientation === JSFlowLayout.LEFT_TO_RIGHT) {
            var x = container.getInsetLeft();
            var y = container.getInsetTop();
            for (var i = 0; i < components.length; i++) {
                var component = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                if (rowHeight + componentPreferredOuterHeight > containerHeight) {
                    rowHeight -= vgap;
                    this.layoutComponents(container, components.slice(n, i), x, y, rowWidth, rowHeight);
                    x += rowWidth;
                    rowWidth = 0;
                    rowHeight = 0;
                    n = i;
                }
                rowWidth = Math.max(rowWidth, componentPreferredOuterWidth + hgap);
                rowHeight += componentPreferredOuterHeight + vgap;
            }
            if (n < i) {
                rowHeight -= vgap;
                this.layoutComponents(container, components.slice(n, i), x, y, rowWidth, rowHeight);
            }
        }
        else if (orientation === JSFlowLayout.BOTTOM_TO_TOP) {
            var x = container.getInsetLeft();
            var y = containerHeight - container.getInsetBottom();
            for (var i = 0; i < components.length; i++) {
                var component = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                if (rowWidth + componentPreferredOuterWidth > containerWidth) {
                    rowWidth -= hgap;
                    this.layoutComponents(container, components.slice(n, i), x, y - rowHeight, rowWidth, rowHeight);
                    y -= rowHeight;
                    rowWidth = 0;
                    rowHeight = 0;
                    n = i;
                }
                rowWidth += componentPreferredOuterWidth + hgap;
                rowHeight = Math.max(rowHeight, componentPreferredOuterHeight + vgap);
            }
            if (n < i) {
                rowWidth -= hgap;
                this.layoutComponents(container, components.slice(n, i), x, y - rowHeight, rowWidth, rowHeight);
            }
        }
        else {
            var x = container.getInsetLeft();
            var y = container.getInsetTop();
            for (var i = 0; i < components.length; i++) {
                var component = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                if (rowWidth + componentPreferredOuterWidth > containerWidth) {
                    rowWidth -= hgap;
                    this.layoutComponents(container, components.slice(n, i), x, y, rowWidth, rowHeight);
                    y += rowHeight;
                    rowWidth = 0;
                    rowHeight = 0;
                    n = i;
                }
                rowWidth += componentPreferredOuterWidth + hgap;
                rowHeight = Math.max(rowHeight, componentPreferredOuterHeight + vgap);
            }
            if (n < i) {
                rowWidth -= hgap;
                this.layoutComponents(container, components.slice(n, i), x, y, rowWidth, rowHeight);
            }
        }
    };
    JSFlowLayout.prototype.layoutComponents = function (container, components, x, y, rowWidth, rowHeight) {
        var align = this.getAlign();
        var hgap = this.getHgap();
        var vgap = this.getVgap();
        var containerWidth = container.getWidth();
        var containerHeight = container.getHeight();
        var z;
        var orientation = this.getOrientation();
        if (orientation === JSFlowLayout.LEFT_TO_RIGHT || orientation === JSFlowLayout.RIGHT_TO_LEFT) {
            switch (align) {
                case JSFlowLayout.TOP:
                    z = containerHeight;
                    break;
                case JSFlowLayout.BOTTOM:
                    y += containerHeight - rowHeight;
                    z = 0;
                    break;
                case JSFlowLayout.CENTER:
                default:
                    y += (containerHeight - rowHeight) / 2;
            }
            for (var i = 0; i < components.length; i++) {
                var component = components[i];
                var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                component.setOuterHeight(componentPreferredOuterHeight);
                var constraints = component.getConstraints() || {};
                var fill = constraints.fill;
                var anchor = constraints.anchor;
                switch (fill) {
                    case JSFlowLayout.BOTH:
                    case JSFlowLayout.HORIZONTAL:
                        component.setX(x);
                        component.setOuterWidth(rowWidth);
                        break;
                    case JSFlowLayout.NONE:
                    case JSFlowLayout.VERTICAL:
                    default:
                        var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                        component.setOuterWidth(componentPreferredOuterWidth);
                        switch (anchor) {
                            case JSFlowLayout.WEST:
                            case JSFlowLayout.NORTHWEST:
                            case JSFlowLayout.SOUTHWEST:
                                component.setX(x);
                                break;
                            case JSFlowLayout.EAST:
                            case JSFlowLayout.NORTHEAST:
                            case JSFlowLayout.SOUTHEAST:
                                component.setX(x + rowWidth - componentPreferredOuterWidth);
                                break;
                            case JSFlowLayout.CENTER:
                            default:
                                component.setX(x + (rowWidth - componentPreferredOuterWidth) / 2);
                        }
                }
                if (align === JSFlowLayout.TOP && (anchor === JSFlowLayout.SOUTH || anchor === JSFlowLayout.SOUTHWEST || anchor === JSFlowLayout.SOUTHEAST)) {
                    component.setY(z - componentPreferredOuterHeight);
                    z -= componentPreferredOuterHeight + vgap;
                }
                else if (align === JSFlowLayout.BOTTOM && (anchor === JSFlowLayout.NORTH || anchor === JSFlowLayout.NORTHWEST || anchor === JSFlowLayout.NORTHEAST)) {
                    component.setY(z);
                    z += componentPreferredOuterHeight + vgap;
                }
                else {
                    component.setY(y);
                    y += componentPreferredOuterHeight + vgap;
                }
            }
        }
        else {
            switch (align) {
                case JSFlowLayout.LEFT:
                    z = containerWidth;
                    break;
                case JSFlowLayout.RIGHT:
                    x += containerWidth - rowWidth;
                    z = 0;
                    break;
                case JSFlowLayout.CENTER:
                default:
                    x += (containerWidth - rowWidth) / 2;
            }
            for (var i = 0; i < components.length; i++) {
                var component = components[i];
                var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                component.setOuterWidth(componentPreferredOuterWidth);
                var constraints = component.getConstraints() || {};
                var fill = constraints.fill;
                var anchor = constraints.anchor;
                switch (fill) {
                    case JSFlowLayout.BOTH:
                    case JSFlowLayout.VERTICAL:
                        component.setOuterHeight(rowHeight);
                        component.setY(y);
                        break;
                    case JSFlowLayout.NONE:
                    case JSFlowLayout.HORIZONTAL:
                    default:
                        var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                        component.setOuterHeight(componentPreferredOuterHeight);
                        switch (anchor) {
                            case JSFlowLayout.NORTH:
                            case JSFlowLayout.NORTHWEST:
                            case JSFlowLayout.NORTHEAST:
                                component.setY(y);
                                break;
                            case JSFlowLayout.SOUTH:
                            case JSFlowLayout.SOUTHWEST:
                            case JSFlowLayout.SOUTHEAST:
                                component.setY(y + rowHeight - componentPreferredOuterHeight);
                                break;
                            case JSFlowLayout.CENTER:
                            default:
                                component.setY(y + (rowHeight - componentPreferredOuterHeight) / 2);
                        }
                }
                if (align === JSFlowLayout.LEFT && (anchor === JSFlowLayout.EAST || anchor === JSFlowLayout.NORTHEAST || anchor === JSFlowLayout.SOUTHEAST)) {
                    component.setX(z - componentPreferredOuterWidth);
                    z -= componentPreferredOuterWidth + hgap;
                }
                else if (align === JSFlowLayout.RIGHT && (anchor === JSFlowLayout.WEST || anchor === JSFlowLayout.NORTHWEST || anchor === JSFlowLayout.SOUTHWEST)) {
                    component.setX(z);
                    z += componentPreferredOuterWidth + hgap;
                }
                else {
                    component.setX(x);
                    x += componentPreferredOuterWidth + hgap;
                }
            }
        }
    };
    return JSFlowLayout;
}(JSLayout));
var JSFrame = (function (_super) {
    __extends(JSFrame, _super);
    function JSFrame(element) {
        var _this = _super.call(this, element === undefined ? document.createElement("div") : element) || this;
        var body = JSBody.getInstance();
        body.setContentPane(_this);
        _this.setLayout(new JSBorderLayout());
        return _this;
    }
    JSFrame.prototype.init = function () {
        this.addClass("JSFrame");
        this.setStyle("height", "100%");
        this.setVisible(false);
    };
    JSFrame.prototype.getMenuBar = function () {
        return this.getData("menuBar");
    };
    JSFrame.prototype.setMenuBar = function (menuBar) {
        this.add(menuBar, JSBorderLayout.NORTH, 0);
        this.setData("menuBar", menuBar);
    };
    JSFrame.prototype.setVisible = function (visible) {
        if (visible) {
            var body = JSBody.getInstance();
            body.validate();
        }
        _super.prototype.setVisible.call(this, visible);
    };
    return JSFrame;
}(JSHTMLComponent));
var JSGraphics = (function (_super) {
    __extends(JSGraphics, _super);
    function JSGraphics(elementOrWidth, height) {
        var _this = _super.call(this, elementOrWidth === undefined || !(elementOrWidth instanceof SVGSVGElement) ? document.createElementNS("http://www.w3.org/2000/svg", "svg") : elementOrWidth) || this;
        if (elementOrWidth !== undefined && !(elementOrWidth instanceof SVGSVGElement)) {
            _this.setWidth(elementOrWidth);
            _this.setHeight(height);
        }
        return _this;
    }
    JSGraphics.prototype.init = function () {
        this.addClass("JSGraphics");
        this.setStyle("display", "inline-block");
    };
    return JSGraphics;
}(JSSVGComponent));
var JSGridBagLayout = (function (_super) {
    __extends(JSGridBagLayout, _super);
    function JSGridBagLayout(hgap, vgap) {
        var _this = _super.call(this) || this;
        _this.hgap = 0;
        _this.vgap = 0;
        if (hgap !== undefined) {
            _this.setHgap(hgap);
            _this.setVgap(vgap);
        }
        return _this;
    }
    JSGridBagLayout.prototype.getHgap = function () {
        return this.hgap;
    };
    JSGridBagLayout.prototype.setHgap = function (hgap) {
        this.hgap = hgap;
    };
    JSGridBagLayout.prototype.getVgap = function () {
        return this.vgap;
    };
    JSGridBagLayout.prototype.setVgap = function (vgap) {
        this.vgap = vgap;
    };
    JSGridBagLayout.prototype.getPreferredWidths = function () {
        return this.preferredWidths;
    };
    JSGridBagLayout.prototype.setPreferredWidths = function (preferredWidths) {
        this.preferredWidths = preferredWidths;
    };
    JSGridBagLayout.prototype.getPreferredHeights = function () {
        return this.preferredHeights;
    };
    JSGridBagLayout.prototype.setPreferredHeights = function (preferredHeights) {
        this.preferredHeights = preferredHeights;
    };
    JSGridBagLayout.prototype.getWeightxs = function () {
        return this.weightxs;
    };
    JSGridBagLayout.prototype.setWeightxs = function (weightxs) {
        this.weightxs = weightxs;
    };
    JSGridBagLayout.prototype.getWeightys = function () {
        return this.weightys;
    };
    JSGridBagLayout.prototype.setWeightys = function (weightys) {
        this.weightys = weightys;
    };
    JSGridBagLayout.prototype.addLayoutComponent = function (component) {
        component.setStyle("position", "absolute");
    };
    JSGridBagLayout.prototype.preferredLayoutWidth = function (container) {
        var preferredLayoutWidth = 0;
        var hgap = this.getHgap();
        var preferredWidths = [];
        this.setPreferredWidths(preferredWidths);
        var weightxs = [];
        this.setWeightxs(weightxs);
        var components = container.getComponents().slice();
        components.sort(function (a, b) {
            var c = ((a.getConstraints() || {}).gridx || 0) + ((a.getConstraints() || {}).gridwidth || 1);
            var d = ((b.getConstraints() || {}).gridx || 0) + ((b.getConstraints() || {}).gridwidth || 1);
            if (c < d) {
                return -1;
            }
            if (c > d) {
                return 1;
            }
            return 0;
        });
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var componentPreferredOuterWidth = component.getPreferredOuterWidth();
            var constraints = component.getConstraints() || {};
            var gridx = constraints.gridx || 0;
            var gridwidth = constraints.gridwidth || 1;
            if (gridwidth === 1) {
                preferredWidths[gridx] = Math.max(preferredWidths[gridx] || 0, componentPreferredOuterWidth);
            }
            else {
                preferredWidths[gridx + gridwidth - 1] = Math.max(preferredWidths[gridx + gridwidth - 1] || 0, componentPreferredOuterWidth - (preferredWidths[gridx + gridwidth - 2] || 0));
            }
            var weightx = (constraints.weightx || 0) / gridwidth;
            for (var j = 0; j < gridwidth; j++) {
                weightxs[gridx + j] = Math.max(weightxs[gridx + j] || 0, weightx);
            }
        }
        for (var i = 0; i < preferredWidths.length; i++) {
            preferredLayoutWidth += (preferredWidths[i] || 0) + hgap;
        }
        if (preferredLayoutWidth != 0) {
            preferredLayoutWidth -= hgap;
        }
        return preferredLayoutWidth;
    };
    JSGridBagLayout.prototype.preferredLayoutHeight = function (container) {
        var preferredLayoutHeight = 0;
        var vgap = this.getVgap();
        var preferredHeights = [];
        this.setPreferredHeights(preferredHeights);
        var weightys = [];
        this.setWeightys(weightys);
        var components = container.getComponents().slice();
        components.sort(function (a, b) {
            var c = ((a.getConstraints() || {}).gridy || 0) + ((a.getConstraints() || {}).gridheight || 1);
            var d = ((b.getConstraints() || {}).gridy || 0) + ((b.getConstraints() || {}).gridheight || 1);
            if (c < d) {
                return -1;
            }
            if (c > d) {
                return 1;
            }
            return 0;
        });
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var componentPreferredOuterHeight = component.getPreferredOuterHeight();
            var constraints = component.getConstraints() || {};
            var gridy = constraints.gridy || 0;
            var gridheight = constraints.gridheight || 1;
            if (gridheight === 1) {
                preferredHeights[gridy] = Math.max(preferredHeights[gridy] || 0, componentPreferredOuterHeight);
            }
            else {
                preferredHeights[gridy + gridheight - 1] = Math.max(preferredHeights[gridy + gridheight - 1] || 0, componentPreferredOuterHeight - (preferredHeights[gridy + gridheight - 2] || 0));
            }
            var weighty = (constraints.weighty || 0) / gridheight;
            for (var j = 0; j < gridheight; j++) {
                weightys[gridy + j] = Math.max(weightys[gridy + j] || 0, weighty);
            }
        }
        for (var i = 0; i < preferredHeights.length; i++) {
            preferredLayoutHeight += (preferredHeights[i] || 0) + vgap;
        }
        if (preferredLayoutHeight != 0) {
            preferredLayoutHeight -= vgap;
        }
        return preferredLayoutHeight;
    };
    JSGridBagLayout.prototype.layoutContainer = function (container) {
        var hgap = this.getHgap();
        var vgap = this.getVgap();
        var preferredWidths = this.getPreferredWidths();
        var preferredHeights = this.getPreferredHeights();
        var preferredLayoutWidth = 0;
        if (preferredWidths && preferredWidths.length) {
            for (var i = 0; i < preferredWidths.length; i++) {
                preferredLayoutWidth += (preferredWidths[i] || 0) + hgap;
            }
            if (preferredLayoutWidth != 0) {
                preferredLayoutWidth -= hgap;
            }
        }
        else {
            preferredLayoutWidth = this.preferredLayoutWidth(container);
            preferredWidths = this.getPreferredWidths();
        }
        var preferredLayoutHeight = 0;
        if (preferredHeights && preferredHeights.length) {
            for (var i = 0; i < preferredHeights.length; i++) {
                preferredLayoutHeight += (preferredHeights[i] || 0) + vgap;
            }
            if (preferredLayoutHeight != 0) {
                preferredLayoutHeight -= vgap;
            }
        }
        else {
            preferredLayoutHeight = this.preferredLayoutHeight(container);
            preferredHeights = this.getPreferredHeights();
        }
        var weightxs = this.getWeightxs();
        var weightys = this.getWeightys();
        var containerWidth = container.getWidth();
        var containerHeight = container.getHeight();
        var left = container.getInsetLeft();
        var widths = preferredWidths.slice();
        var extraHorizontalSpace = Math.max(containerWidth - preferredLayoutWidth, 0);
        if (extraHorizontalSpace) {
            var sum = 0;
            for (var i = 0; i < weightxs.length; i++) {
                sum += weightxs[i] || 0;
            }
            if (sum) {
                for (var i = 0; i < widths.length; i++) {
                    widths[i] = (widths[i] || 0) + extraHorizontalSpace * (weightxs[i] || 0) / sum;
                }
            }
            else {
                left += extraHorizontalSpace / 2;
            }
        }
        var xs = [left];
        for (var i = 0; i < widths.length; i++) {
            xs[i + 1] = xs[i] + (widths[i] || 0) + hgap;
        }
        var top = container.getInsetTop();
        var heights = preferredHeights.slice();
        var extraVerticalSpace = Math.max(containerHeight - preferredLayoutHeight, 0);
        if (extraVerticalSpace) {
            var sum = 0;
            for (var i = 0; i < weightys.length; i++) {
                sum += weightys[i] || 0;
            }
            if (sum) {
                for (var i = 0; i < heights.length; i++) {
                    heights[i] = (heights[i] || 0) + extraVerticalSpace * (weightys[i] || 0) / sum;
                }
            }
            else {
                top += extraVerticalSpace / 2;
            }
        }
        var ys = [top];
        for (var i = 0; i < heights.length; i++) {
            ys[i + 1] = ys[i] + (heights[i] || 0) + vgap;
        }
        var components = container.getComponents();
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var constraints = component.getConstraints() || {};
            var gridx = constraints.gridx || 0;
            var gridy = constraints.gridy || 0;
            var gridwidth = constraints.gridwidth || 1;
            var gridheight = constraints.gridheight || 1;
            var fill = constraints.fill;
            var anchor = constraints.anchor;
            switch (fill) {
                case JSGridBagLayout.BOTH:
                    component.setX(xs[gridx]);
                    component.setY(ys[gridy]);
                    component.setOuterWidth(xs[gridx + gridwidth] - hgap - xs[gridx]);
                    component.setOuterHeight(ys[gridy + gridheight] - vgap - ys[gridy]);
                    break;
                case JSGridBagLayout.HORIZONTAL:
                    component.setOuterWidth(xs[gridx + gridwidth] - hgap - xs[gridx]);
                    var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentPreferredOuterHeight);
                    component.setX(xs[gridx]);
                    switch (anchor) {
                        case JSGridBagLayout.NORTH:
                            component.setY(ys[gridy]);
                            break;
                        case JSGridBagLayout.SOUTH:
                            component.setY(ys[gridy + gridheight] - vgap - componentPreferredOuterHeight);
                            break;
                        case JSGridBagLayout.CENTER:
                        default:
                            component.setY(ys[gridy] + (ys[gridy + gridheight] - vgap - ys[gridy] - componentPreferredOuterHeight) / 2);
                    }
                    break;
                case JSGridBagLayout.VERTICAL:
                    component.setOuterHeight(ys[gridy + gridheight] - vgap - ys[gridy]);
                    var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentPreferredOuterWidth);
                    component.setY(ys[gridy]);
                    switch (anchor) {
                        case JSGridBagLayout.WEST:
                            component.setX(xs[gridx]);
                            break;
                        case JSGridBagLayout.EAST:
                            component.setX(xs[gridx + gridwidth] - hgap - componentPreferredOuterWidth);
                            break;
                        case JSGridBagLayout.CENTER:
                        default:
                            component.setX(xs[gridx] + (xs[gridx + gridwidth] - hgap - xs[gridx] - componentPreferredOuterWidth) / 2);
                    }
                    break;
                case JSGridBagLayout.NONE:
                default:
                    var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentPreferredOuterWidth);
                    var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentPreferredOuterHeight);
                    switch (anchor) {
                        case JSGridBagLayout.WEST:
                        case JSGridBagLayout.NORTHWEST:
                        case JSGridBagLayout.SOUTHWEST:
                            component.setX(xs[gridx]);
                            break;
                        case JSGridBagLayout.EAST:
                        case JSGridBagLayout.NORTHEAST:
                        case JSGridBagLayout.SOUTHEAST:
                            component.setX(xs[gridx + gridwidth] - hgap - componentPreferredOuterWidth);
                            break;
                        case JSGridBagLayout.CENTER:
                        default:
                            component.setX(xs[gridx] + (xs[gridx + gridwidth] - hgap - xs[gridx] - componentPreferredOuterWidth) / 2);
                    }
                    switch (anchor) {
                        case JSGridBagLayout.NORTH:
                        case JSGridBagLayout.NORTHWEST:
                        case JSGridBagLayout.NORTHEAST:
                            component.setY(ys[gridy]);
                            break;
                        case JSGridBagLayout.SOUTH:
                        case JSGridBagLayout.SOUTHWEST:
                        case JSGridBagLayout.SOUTHEAST:
                            component.setY(ys[gridy + gridheight] - vgap - componentPreferredOuterHeight);
                            break;
                        case JSGridBagLayout.CENTER:
                        default:
                            component.setY(ys[gridy] + (ys[gridy + gridheight] - vgap - ys[gridy] - componentPreferredOuterHeight) / 2);
                    }
            }
        }
        this.setPreferredWidths(null);
        this.setPreferredHeights(null);
    };
    return JSGridBagLayout;
}(JSLayout));
var JSImageIcon = (function (_super) {
    __extends(JSImageIcon, _super);
    function JSImageIcon(elementOrWidthOrLocation, heightOrWidth, height) {
        var _this = _super.call(this, elementOrWidthOrLocation === undefined || !(elementOrWidthOrLocation instanceof HTMLImageElement) ? document.createElement("img") : elementOrWidthOrLocation) || this;
        if (elementOrWidthOrLocation !== undefined && !(elementOrWidthOrLocation instanceof HTMLImageElement)) {
            if (typeof elementOrWidthOrLocation === "number") {
                _this.setWidth(elementOrWidthOrLocation);
                _this.setHeight(heightOrWidth);
            }
            else {
                _this.setLocation(elementOrWidthOrLocation);
                if (heightOrWidth !== undefined) {
                    _this.setWidth(heightOrWidth);
                    _this.setHeight(height);
                }
            }
        }
        _this.setStyle("-webkit-user-drag", "none");
        return _this;
    }
    JSImageIcon.prototype.init = function () {
        this.addClass("JSImageIcon");
    };
    JSImageIcon.prototype.getWidth = function () {
        return this.width || +this.getAttribute("width");
    };
    JSImageIcon.prototype.setWidth = function (width) {
        this.oldWidth = this.width;
        this.setAttribute("width", "" + width);
        this.width = width;
    };
    JSImageIcon.prototype.getHeight = function () {
        return this.height || +this.getAttribute("height");
    };
    JSImageIcon.prototype.setHeight = function (height) {
        this.oldHeight = this.height;
        this.setAttribute("height", "" + height);
        this.height = height;
    };
    JSImageIcon.prototype.getPreferredWidth = function () {
        var preferredWidth = this.getAttribute("data-preferred-width");
        if (preferredWidth) {
            return +preferredWidth;
        }
        return this.getWidth();
    };
    JSImageIcon.prototype.getPreferredHeight = function () {
        var preferredHeight = this.getAttribute("data-preferred-height");
        if (preferredHeight) {
            return +preferredHeight;
        }
        return this.getHeight();
    };
    JSImageIcon.prototype.getLocation = function () {
        return this.getAttribute("src");
    };
    JSImageIcon.prototype.setLocation = function (location) {
        this.setAttribute("src", location);
    };
    JSImageIcon.prototype.clone = function () {
        var clone = new JSImageIcon();
        clone.setWidth(this.getWidth());
        clone.setHeight(this.getHeight());
        clone.setLocation(this.getLocation());
        return clone;
    };
    return JSImageIcon;
}(JSHTMLComponent));
var JSLabel = (function (_super) {
    __extends(JSLabel, _super);
    function JSLabel(elementOrText, horizontalAlignment) {
        var _this = _super.call(this, elementOrText === undefined || !(elementOrText instanceof HTMLLabelElement) ? document.createElement("label") : elementOrText) || this;
        if (elementOrText !== undefined && !(elementOrText instanceof HTMLLabelElement)) {
            _this.setText(elementOrText);
            if (horizontalAlignment !== undefined) {
                _this.setStyle("text-align", horizontalAlignment);
            }
        }
        return _this;
    }
    JSLabel.prototype.init = function () {
        this.addClass("JSLabel");
        this.setStyle("display", "inline-block");
        this.setStyle("white-space", "nowrap");
    };
    JSLabel.prototype.getFor = function () {
        return this.getAttribute("for");
    };
    JSLabel.prototype.setFor = function (id) {
        this.setAttribute("for", id);
    };
    return JSLabel;
}(JSHTMLComponent));
var JSLayeredPane = (function (_super) {
    __extends(JSLayeredPane, _super);
    function JSLayeredPane(elementOrLayout) {
        var _this = _super.call(this, elementOrLayout === undefined || !(elementOrLayout instanceof HTMLDivElement) ? document.createElement("div") : elementOrLayout) || this;
        if (elementOrLayout !== undefined && !(elementOrLayout instanceof HTMLDivElement)) {
            _this.setLayout(elementOrLayout);
        }
        var layout = _this.getLayout();
        if (!layout) {
            _this.setLayout(new JSLayeredPaneLayout());
        }
        return _this;
    }
    JSLayeredPane.prototype.init = function () {
        this.addClass("JSLayeredPane");
    };
    return JSLayeredPane;
}(JSHTMLComponent));
var JSLayeredPaneLayout = (function (_super) {
    __extends(JSLayeredPaneLayout, _super);
    function JSLayeredPaneLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSLayeredPaneLayout.prototype.addLayoutComponent = function (component) {
        component.setStyle("position", "absolute");
    };
    return JSLayeredPaneLayout;
}(JSLayout));
var JSMarker = (function (_super) {
    __extends(JSMarker, _super);
    function JSMarker(element) {
        return _super.call(this, element === undefined ? document.createElementNS("http://www.w3.org/2000/svg", "marker") : element) || this;
    }
    JSMarker.prototype.init = function () {
        this.addClass("JSMarker");
    };
    return JSMarker;
}(JSSVGComponent));
var JSMenu = (function (_super) {
    __extends(JSMenu, _super);
    function JSMenu(elementOrIconOrText, icon) {
        var _this = _super.call(this, elementOrIconOrText === undefined || !(elementOrIconOrText instanceof HTMLDivElement) ? document.createElement("div") : elementOrIconOrText) || this;
        _this.delay = 500;
        var popupMenuContainer = _this.getPopupMenuContainer();
        if (!popupMenuContainer) {
            popupMenuContainer = new JSDiv();
            popupMenuContainer.setStyle("position", "absolute");
            _super.prototype.add.call(_this, popupMenuContainer);
            _this.setPopupMenuContainer(popupMenuContainer);
        }
        if (elementOrIconOrText !== undefined && !(elementOrIconOrText instanceof HTMLDivElement)) {
            if (elementOrIconOrText instanceof HTMLImageElement) {
                _this.setIcon(new JSImageIcon(elementOrIconOrText));
            }
            else if (elementOrIconOrText instanceof JSComponent) {
                _this.setIcon(elementOrIconOrText);
            }
            else {
                _this.setText(elementOrIconOrText);
                if (icon !== undefined) {
                    if (icon instanceof HTMLImageElement) {
                        _this.setIcon(new JSImageIcon(icon));
                    }
                    else {
                        _this.setIcon(icon);
                    }
                }
            }
        }
        _this.addMouseListener(new JSMouseListener(_this, {
            mouseEntered: function (mouseEvent) {
                this.setBackground("#e6e6e6");
            },
            mouseExited: function (mouseEvent) {
                this.setBackground(null);
            }
        }));
        _this.addMouseListener(new JSMouseListener(_this, {
            mousePressed: function (mouseEvent) {
                var parent = this.getParent();
                if (parent instanceof JSPopupMenu) {
                    var parentSelected = parent.isSelected();
                    if (parentSelected) {
                        parent.getSelection().setSelected(this);
                    }
                }
                else {
                    this.setData("changed", false);
                    var popupMenu = this.getPopupMenu();
                    if (popupMenu) {
                        var parentSelected = parent.isSelected();
                        if (!parentSelected) {
                            parent.setSelected(true);
                            parent.getSelection().setSelected(this);
                            this.setData("changed", true);
                        }
                    }
                }
            },
            mouseReleased: function (mouseEvent) {
                var parent = this.getParent();
                if (!(parent instanceof JSPopupMenu)) {
                    var changed = this.getData("changed");
                    if (!changed) {
                        var popupMenu = this.getPopupMenu();
                        if (popupMenu) {
                            var parentSelected = parent.isSelected();
                            if (parentSelected) {
                                parent.setSelected(false);
                            }
                        }
                    }
                }
            },
            mouseEntered: function (mouseEvent) {
                var parent = this.getParent();
                if (parent instanceof JSPopupMenu) {
                    parent.clearTimeout();
                    parent.setTimeout(this, function () {
                        var parentSelected = parent.isSelected();
                        if (parentSelected) {
                            parent.getSelection().setSelected(this);
                        }
                    }, this.getDelay());
                }
                else {
                    var parentSelected = parent.isSelected();
                    if (parentSelected) {
                        parent.getSelection().setSelected(this);
                    }
                }
            }
        }));
        return _this;
    }
    JSMenu.prototype.init = function () {
        this.addClass("JSMenu");
        this.setBackground("#f2f2f2");
    };
    JSMenu.prototype.setIcon = function (icon) {
        var oldIcon = this.getIcon();
        if (oldIcon !== icon) {
            if (oldIcon) {
                this.remove(oldIcon);
            }
            if (icon) {
                icon.setStyle("vertical-align", "middle");
                _super.prototype.add.call(this, icon, null, 1);
            }
        }
        _super.prototype.setIcon.call(this, icon);
    };
    JSMenu.prototype.getLabel = function () {
        return this.getData("label");
    };
    JSMenu.prototype.setLabel = function (label) {
        this.setData("label", label);
    };
    JSMenu.prototype.getText = function () {
        var label = this.getLabel();
        return label.getText();
    };
    JSMenu.prototype.setText = function (text) {
        var label = this.getLabel();
        if (!label) {
            label = new JSLabel();
            label.setStyle("vertical-align", "middle");
            _super.prototype.add.call(this, label);
            this.setLabel(label);
        }
        label.setText(text);
    };
    JSMenu.prototype.getExpandIcon = function () {
        return this.getData("expandIcon");
    };
    JSMenu.prototype.setExpandIcon = function (expandIcon) {
        this.setData("expandIcon", expandIcon);
    };
    JSMenu.prototype.getPopupMenuContainer = function () {
        return this.getData("popupMenuContainer");
    };
    JSMenu.prototype.setPopupMenuContainer = function (popupMenuContainer) {
        this.setData("popupMenuContainer", popupMenuContainer);
    };
    JSMenu.prototype.getPopupMenu = function () {
        return this.getData("popupMenu");
    };
    JSMenu.prototype.setPopupMenu = function (popupMenu) {
        if (popupMenu) {
            var oldPopupMenu = this.getPopupMenu();
            if (oldPopupMenu !== popupMenu) {
                var popupMenuContainer = this.getPopupMenuContainer();
                if (oldPopupMenu) {
                    popupMenuContainer.remove(oldPopupMenu);
                }
                if (popupMenu) {
                    popupMenuContainer.add(popupMenu, null, 0);
                    popupMenuContainer.validate();
                }
            }
        }
        this.setData("popupMenu", popupMenu);
    };
    JSMenu.prototype.add = function (component) {
        if (component instanceof JSMenu || component instanceof JSMenuItem || component instanceof JSSeparator) {
            var popupMenu = this.getPopupMenu();
            if (!popupMenu) {
                popupMenu = new JSPopupMenu();
                this.setPopupMenu(popupMenu);
            }
            popupMenu.add(component);
            if (component instanceof JSMenu) {
                var expandIcon = component.getExpandIcon();
                if (!expandIcon) {
                    expandIcon = new JSPathIcon("M5.17,2.34L10.83,8L5.17,13.66Z", 16, 16);
                    expandIcon.getPath().setBackground("gray");
                    expandIcon.setStyle("vertical-align", "middle");
                    component.add(expandIcon);
                    component.setExpandIcon(expandIcon);
                }
            }
        }
        else {
            _super.prototype.add.call(this, component);
        }
    };
    JSMenu.prototype.addSeparator = function () {
        this.add(new JSSeparator());
    };
    JSMenu.prototype.getDelay = function () {
        return this.delay;
    };
    JSMenu.prototype.setDelay = function (delay) {
        this.delay = delay;
    };
    JSMenu.prototype.setSelected = function (selected) {
        var popupMenu = this.getPopupMenu();
        if (popupMenu) {
            if (selected) {
                var parent = this.getParent();
                if (parent instanceof JSPopupMenu) {
                    popupMenu.show(this, this.getWidth() - 4, 0 - popupMenu.getPaddingTop() - popupMenu.getBorderTopWidth());
                }
                else {
                    popupMenu.show(this, 0, this.getHeight());
                }
            }
            else {
                popupMenu.setSelected(false);
            }
        }
        _super.prototype.setSelected.call(this, selected);
    };
    return JSMenu;
}(JSHTMLComponent));
var JSMenuBar = (function (_super) {
    __extends(JSMenuBar, _super);
    function JSMenuBar(element) {
        var _this = _super.call(this, element === undefined ? document.createElement("div") : element) || this;
        var menuBarContainer = _this.getMenuBarContainer();
        if (!menuBarContainer) {
            menuBarContainer = new JSMenuBarContainer();
            _super.prototype.add.call(_this, menuBarContainer);
            _this.setMenuBarContainer(menuBarContainer);
        }
        return _this;
    }
    JSMenuBar.prototype.init = function () {
        this.addClass("JSMenuBar");
        this.setBackground("#f2f2f2");
    };
    JSMenuBar.prototype.getMenuBarContainer = function () {
        return this.getData("menuBarContainer");
    };
    JSMenuBar.prototype.setMenuBarContainer = function (menuBarContainer) {
        this.setData("menuBarContainer", menuBarContainer);
    };
    JSMenuBar.prototype.add = function (menu) {
        var menuBarContainer = this.getMenuBarContainer();
        menuBarContainer.add(menu);
    };
    return JSMenuBar;
}(JSHTMLComponent));
var JSMenuBarContainer = (function (_super) {
    __extends(JSMenuBarContainer, _super);
    function JSMenuBarContainer(element) {
        var _this = _super.call(this, element === undefined ? document.createElement("div") : element) || this;
        var menuBarContainer = _this;
        var body = JSBody.getInstance();
        body.addMouseListener({
            mousePressed: function (mouseEvent) {
                menuBarContainer.setData("pressed", false);
                body.setTimeout(menuBarContainer, function () {
                    var pressed = menuBarContainer.getData("pressed");
                    if (!pressed) {
                        menuBarContainer.setSelected(false);
                    }
                });
            }
        }, true);
        _this.addMouseListener({
            mousePressed: function () {
                menuBarContainer.setData("pressed", true);
            }
        }, true);
        return _this;
    }
    JSMenuBarContainer.prototype.init = function () {
        this.addClass("JSMenuBarContainer");
        this.setStyle("display", "inline-block");
    };
    JSMenuBarContainer.prototype.add = function (menu) {
        var selection = this.getSelection();
        if (!selection) {
            selection = new JSSelection();
            this.setSelection(selection);
        }
        selection.add(menu);
        menu.getLabel().setStyle("margin", "0 8px");
        menu.setStyle("display", "inline-block");
        _super.prototype.add.call(this, menu);
    };
    JSMenuBarContainer.prototype.setSelected = function (selected) {
        if (!selected) {
            var selection = this.getSelection();
            if (selection) {
                selection.setSelected(null);
            }
        }
        _super.prototype.setSelected.call(this, selected);
    };
    return JSMenuBarContainer;
}(JSHTMLComponent));
var JSMenuItem = (function (_super) {
    __extends(JSMenuItem, _super);
    function JSMenuItem(elementOrActionOrIconOrText, icon) {
        var _this = _super.call(this, elementOrActionOrIconOrText === undefined || !(elementOrActionOrIconOrText instanceof HTMLDivElement) ? document.createElement("div") : elementOrActionOrIconOrText) || this;
        _this.delay = 500;
        if (elementOrActionOrIconOrText !== undefined && !(elementOrActionOrIconOrText instanceof HTMLDivElement)) {
            if (elementOrActionOrIconOrText instanceof JSAction) {
                _this.setAction(elementOrActionOrIconOrText);
            }
            else if (elementOrActionOrIconOrText instanceof HTMLImageElement) {
                _this.setIcon(new JSImageIcon(elementOrActionOrIconOrText));
            }
            else if (elementOrActionOrIconOrText instanceof JSComponent) {
                _this.setIcon(elementOrActionOrIconOrText);
            }
            else {
                _this.setText(elementOrActionOrIconOrText);
                if (icon !== undefined) {
                    if (icon instanceof HTMLImageElement) {
                        _this.setIcon(new JSImageIcon(icon));
                    }
                    else {
                        _this.setIcon(icon);
                    }
                }
            }
        }
        _this.addMouseListener(new JSMouseListener(_this, {
            mouseEntered: function (mouseEvent) {
                this.setBackground("#e6e6e6");
            },
            mouseExited: function (mouseEvent) {
                this.setBackground(null);
            }
        }));
        _this.addMouseListener(new JSMouseListener(_this, {
            mousePressed: function (mouseEvent) {
            },
            mouseReleased: function (mouseEvent) {
            },
            mouseEntered: function (mouseEvent) {
                var parent = this.getParent();
                var parentSelected = parent.isSelected();
                if (parentSelected) {
                    parent.getSelection().setSelected(this);
                }
            },
            mouseClicked: function (mouseEvent) {
                var parent = this.getParent();
                if (parent instanceof JSPopupMenu) {
                    var popuMenu = parent;
                    var invoker = popuMenu.getInvoker();
                    while (invoker) {
                        parent = invoker.getParent();
                        if (parent instanceof JSPopupMenu) {
                            popuMenu = parent;
                            invoker = popuMenu.getInvoker();
                        }
                        else {
                            break;
                        }
                    }
                    if (parent instanceof JSMenuBarContainer) {
                        parent.setSelected(false);
                    }
                    else if (invoker instanceof JSMenu) {
                        invoker.setSelected(false);
                    }
                    else {
                        popuMenu.setSelected(false);
                    }
                }
            }
        }));
        return _this;
    }
    JSMenuItem.prototype.init = function () {
        this.addClass("JSMenuItem");
        this.setStyle("white-space", "nowrap");
    };
    JSMenuItem.prototype.setIcon = function (icon) {
        var oldIcon = this.getIcon();
        if (oldIcon !== icon) {
            if (oldIcon) {
                this.remove(oldIcon);
            }
            if (icon) {
                icon.setStyle("vertical-align", "middle");
                this.add(icon, null, 0);
            }
        }
        _super.prototype.setIcon.call(this, icon);
    };
    JSMenuItem.prototype.getLabel = function () {
        return this.getData("label");
    };
    JSMenuItem.prototype.setLabel = function (label) {
        this.setData("label", label);
    };
    JSMenuItem.prototype.getText = function () {
        var label = this.getLabel();
        return label.getText();
    };
    JSMenuItem.prototype.setText = function (text) {
        var label = this.getLabel();
        if (!label) {
            label = new JSLabel();
            label.setStyle("vertical-align", "middle");
            this.add(label);
            this.setLabel(label);
        }
        label.setText(text);
    };
    JSMenuItem.prototype.getDelay = function () {
        return this.delay;
    };
    JSMenuItem.prototype.setDelay = function (delay) {
        this.delay = delay;
    };
    return JSMenuItem;
}(JSHTMLComponent));
var JSMouseListener = (function () {
    function JSMouseListener(mouseListenerOrThisValue, redispatchOrMouseListener, redispatch) {
        if (redispatchOrMouseListener === undefined || typeof redispatchOrMouseListener === "boolean") {
            var mouseListener = mouseListenerOrThisValue;
            redispatch = redispatchOrMouseListener;
            if (mouseListener.mouseClicked) {
                this.mouseClicked = function (mouseEvent) {
                    mouseListener.mouseClicked(mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                };
            }
            if (mouseListener.mousePressed) {
                this.mousePressed = function (mouseEvent) {
                    mouseListener.mousePressed(mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                };
            }
            if (mouseListener.mouseReleased) {
                this.mouseReleased = function (mouseEvent) {
                    mouseListener.mouseReleased(mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                };
            }
            if (mouseListener.mouseEntered) {
                this.mouseEntered = function (mouseEvent) {
                    mouseListener.mouseEntered(mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                };
            }
            if (mouseListener.mouseExited) {
                this.mouseExited = function (mouseEvent) {
                    mouseListener.mouseExited(mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                };
            }
            if (mouseListener.mouseMoved) {
                this.mouseMoved = function (mouseEvent) {
                    mouseListener.mouseMoved(mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                };
            }
            if (mouseListener.mouseDragged) {
                this.mouseDragged = function (mouseEvent) {
                    mouseListener.mouseDragged(mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                };
            }
        }
        else {
            var thisValue = mouseListenerOrThisValue;
            var mouseListener = redispatchOrMouseListener;
            if (mouseListener.mouseClicked) {
                this.mouseClicked = function (mouseEvent) {
                    mouseListener.mouseClicked.call(thisValue, mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                };
            }
            if (mouseListener.mousePressed) {
                this.mousePressed = function (mouseEvent) {
                    mouseListener.mousePressed.call(thisValue, mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                };
            }
            if (mouseListener.mouseReleased) {
                this.mouseReleased = function (mouseEvent) {
                    mouseListener.mouseReleased.call(thisValue, mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                };
            }
            if (mouseListener.mouseEntered) {
                this.mouseEntered = function (mouseEvent) {
                    mouseListener.mouseEntered.call(thisValue, mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                };
            }
            if (mouseListener.mouseExited) {
                this.mouseExited = function (mouseEvent) {
                    mouseListener.mouseExited.call(thisValue, mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                };
            }
            if (mouseListener.mouseMoved) {
                this.mouseMoved = function (mouseEvent) {
                    mouseListener.mouseMoved.call(thisValue, mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                };
            }
            if (mouseListener.mouseDragged) {
                this.mouseDragged = function (mouseEvent) {
                    mouseListener.mouseDragged.call(thisValue, mouseEvent);
                    if (!redispatch) {
                        mouseEvent.stopPropagation();
                    }
                };
            }
        }
    }
    return JSMouseListener;
}());
var JSOption = (function (_super) {
    __extends(JSOption, _super);
    function JSOption(elementOrText) {
        var _this = _super.call(this, elementOrText === undefined || !(elementOrText instanceof HTMLOptionElement) ? document.createElement("option") : elementOrText) || this;
        if (elementOrText !== undefined && !(elementOrText instanceof HTMLOptionElement)) {
            _this.setText(elementOrText);
            _this.setValue(elementOrText);
        }
        return _this;
    }
    JSOption.prototype.init = function () {
        this.addClass("JSOption");
    };
    JSOption.prototype.getText = function () {
        return this.element.text;
    };
    JSOption.prototype.setText = function (text) {
        this.element.text = text;
    };
    JSOption.prototype.getValue = function () {
        return this.element.value;
    };
    JSOption.prototype.setValue = function (value) {
        this.element.value = value;
    };
    return JSOption;
}(JSHTMLComponent));
var JSPanel = (function (_super) {
    __extends(JSPanel, _super);
    function JSPanel(elementOrLayout) {
        var _this = _super.call(this, elementOrLayout === undefined || !(elementOrLayout instanceof HTMLDivElement) ? document.createElement("div") : elementOrLayout) || this;
        if (elementOrLayout !== undefined && !(elementOrLayout instanceof HTMLDivElement)) {
            _this.setLayout(elementOrLayout);
        }
        _this.setStyle("display", "inline-block");
        return _this;
    }
    JSPanel.prototype.init = function () {
        this.addClass("JSPanel");
    };
    return JSPanel;
}(JSHTMLComponent));
var JSPath = (function (_super) {
    __extends(JSPath, _super);
    function JSPath(elementOrPathDefinition) {
        var _this = _super.call(this, elementOrPathDefinition === undefined || !(elementOrPathDefinition instanceof SVGPathElement) ? document.createElementNS("http://www.w3.org/2000/svg", "path") : elementOrPathDefinition) || this;
        if (elementOrPathDefinition !== undefined && !(elementOrPathDefinition instanceof SVGPathElement)) {
            _this.setPathDefinition(elementOrPathDefinition);
        }
        return _this;
    }
    JSPath.prototype.init = function () {
        this.addClass("JSPath");
    };
    JSPath.prototype.getPathDefinition = function () {
        return this.getAttributeNS("d");
    };
    JSPath.prototype.setPathDefinition = function (pathDefinition) {
        this.setAttributeNS("d", pathDefinition);
    };
    return JSPath;
}(JSSVGComponent));
var JSPathIcon = (function (_super) {
    __extends(JSPathIcon, _super);
    function JSPathIcon(elementOrWidthOrPathDefinition, heightOrWidth, height) {
        var _this = _super.call(this, elementOrWidthOrPathDefinition === undefined || !(elementOrWidthOrPathDefinition instanceof HTMLDivElement) ? document.createElement("div") : elementOrWidthOrPathDefinition) || this;
        var graphics = _this.getGraphics();
        if (!graphics) {
            graphics = new JSGraphics();
            _this.add(graphics);
            _this.setGraphics(graphics);
        }
        var path = _this.getPath();
        if (!path) {
            path = new JSPath();
            graphics.add(path);
            _this.setPath(path);
        }
        if (elementOrWidthOrPathDefinition !== undefined && !(elementOrWidthOrPathDefinition instanceof HTMLDivElement)) {
            if (typeof elementOrWidthOrPathDefinition === "number") {
                _this.setWidth(elementOrWidthOrPathDefinition);
                _this.setHeight(heightOrWidth);
            }
            else {
                _this.setPathDefinition(elementOrWidthOrPathDefinition);
                if (heightOrWidth !== undefined) {
                    _this.setWidth(heightOrWidth);
                    _this.setHeight(height);
                }
            }
        }
        return _this;
    }
    JSPathIcon.prototype.init = function () {
        this.addClass("JSPathIcon");
        this.setStyle("display", "inline-block");
    };
    JSPathIcon.prototype.getGraphics = function () {
        return this.getData("graphics");
    };
    JSPathIcon.prototype.setGraphics = function (graphics) {
        this.setData("graphics", graphics);
    };
    JSPathIcon.prototype.getPath = function () {
        return this.getData("path");
    };
    JSPathIcon.prototype.setPath = function (path) {
        this.setData("path", path);
    };
    JSPathIcon.prototype.setWidth = function (width) {
        var graphics = this.getGraphics();
        graphics.setWidth(width);
        _super.prototype.setWidth.call(this, width);
    };
    JSPathIcon.prototype.setHeight = function (height) {
        var graphics = this.getGraphics();
        graphics.setHeight(height);
        _super.prototype.setHeight.call(this, height);
    };
    JSPathIcon.prototype.getPathDefinition = function () {
        var path = this.getPath();
        return path.getPathDefinition();
    };
    JSPathIcon.prototype.setPathDefinition = function (pathDefinition) {
        var path = this.getPath();
        path.setPathDefinition(pathDefinition);
    };
    JSPathIcon.prototype.getPreferredWidth = function () {
        var preferredWidth = this.getAttribute("data-preferred-width");
        if (preferredWidth) {
            return +preferredWidth;
        }
        return this.getWidth();
    };
    JSPathIcon.prototype.getPreferredHeight = function () {
        var preferredHeight = this.getAttribute("data-preferred-height");
        if (preferredHeight) {
            return +preferredHeight;
        }
        return this.getHeight();
    };
    JSPathIcon.prototype.clone = function () {
        var clone = new JSPathIcon();
        clone.setWidth(this.getWidth());
        clone.setHeight(this.getHeight());
        clone.setPathDefinition(this.getPathDefinition());
        return clone;
    };
    return JSPathIcon;
}(JSHTMLComponent));
var JSPopupMenu = (function (_super) {
    __extends(JSPopupMenu, _super);
    function JSPopupMenu(element) {
        var _this = _super.call(this, element === undefined ? document.createElement("div") : element) || this;
        _this.setLayout(new JSPopupMenuLayout());
        _this.addEventListener("contextmenu", function (mouseEvent) {
            mouseEvent.preventDefault();
            mouseEvent.stopPropagation();
        }, false);
        var popupMenu = _this;
        var body = JSBody.getInstance();
        body.addMouseListener({
            mousePressed: function (mouseEvent) {
                var invoker = popupMenu.getInvoker();
                if (!(invoker instanceof JSMenu)) {
                    popupMenu.setData("close", true);
                    body.setTimeout(popupMenu, function () {
                        var close = popupMenu.getData("close");
                        if (close) {
                            popupMenu.setSelected(false);
                        }
                    });
                }
            }
        }, true);
        _this.addMouseListener({
            mousePressed: function () {
                popupMenu.setData("close", false);
            }
        }, true);
        _this.setBackground("#f2f2f2");
        _this.setStyle("border", "1px solid gray");
        _this.setStyle("padding", "4px 0");
        _this.setStyle("position", "absolute");
        _this.setVisible(false);
        _this.setZIndex(JSLayeredPane.POPUP_LAYER);
        return _this;
    }
    JSPopupMenu.prototype.init = function () {
        this.addClass("JSPopupMenu");
    };
    JSPopupMenu.prototype.add = function (component) {
        var selection = this.getSelection();
        if (!selection) {
            selection = new JSSelection();
            this.setSelection(selection);
        }
        selection.add(component);
        _super.prototype.add.call(this, component);
    };
    JSPopupMenu.prototype.addSeparator = function () {
        this.add(new JSSeparator());
    };
    JSPopupMenu.prototype.getInvoker = function () {
        return this.invoker;
    };
    JSPopupMenu.prototype.setInvoker = function (invoker) {
        this.invoker = invoker;
    };
    JSPopupMenu.prototype.show = function (invoker, x, y) {
        if (!(invoker instanceof JSMenu)) {
            var body = JSBody.getInstance();
            body.setPopupMenu(this);
        }
        this.setInvoker(invoker);
        this.setX(x);
        this.setY(y);
        this.setSelected(true);
        this.setData("close", false);
    };
    JSPopupMenu.prototype.setSelected = function (selected) {
        this.setVisible(selected);
        if (!selected) {
            var selection = this.getSelection();
            if (selection) {
                selection.setSelected(null);
            }
        }
        _super.prototype.setSelected.call(this, selected);
    };
    return JSPopupMenu;
}(JSHTMLComponent));
var JSPopupMenuLayout = (function (_super) {
    __extends(JSPopupMenuLayout, _super);
    function JSPopupMenuLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hgap = 8;
        return _this;
    }
    JSPopupMenuLayout.prototype.getHgap = function () {
        return this.hgap;
    };
    JSPopupMenuLayout.prototype.setHgap = function (hgap) {
        this.hgap = hgap;
    };
    JSPopupMenuLayout.prototype.getPreferredWidths = function () {
        return this.preferredWidths;
    };
    JSPopupMenuLayout.prototype.setPreferredWidths = function (preferredWidths) {
        this.preferredWidths = preferredWidths;
    };
    JSPopupMenuLayout.prototype.preferredLayoutWidth = function (container) {
        var preferredLayoutWidth = 0;
        var hgap = this.getHgap();
        var preferredWidths = [];
        this.setPreferredWidths(preferredWidths);
        var components = container.getComponents();
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            if (component instanceof JSMenu || component instanceof JSMenuItem) {
                var icon = component.getIcon();
                if (icon) {
                    var iconPreferredWidth = icon.getPreferredWidth();
                    preferredWidths[0] = Math.max(preferredWidths[0] || 0, iconPreferredWidth);
                }
                var label = component.getLabel();
                if (label) {
                    var labelPreferredWidth = label.getPreferredWidth();
                    if (component instanceof JSMenu) {
                        var expandIcon = component.getExpandIcon();
                        if (expandIcon) {
                            var expandIconPreferredWidth = expandIcon.getPreferredWidth();
                            labelPreferredWidth += hgap / 2 + expandIconPreferredWidth;
                        }
                    }
                    preferredWidths[1] = Math.max(preferredWidths[1] || 0, labelPreferredWidth);
                }
            }
        }
        for (var i = 0; i < preferredWidths.length; i++) {
            if (preferredWidths[i]) {
                preferredLayoutWidth += preferredWidths[i] + hgap;
            }
        }
        if (preferredLayoutWidth != 0) {
            preferredLayoutWidth -= hgap;
        }
        return hgap + preferredLayoutWidth + hgap;
    };
    JSPopupMenuLayout.prototype.layoutContainer = function (container) {
        var hgap = this.getHgap();
        var preferredWidths = this.getPreferredWidths();
        var preferredLayoutWidth = 0;
        if (preferredWidths && preferredWidths.length) {
            for (var i = 0; i < preferredWidths.length; i++) {
                if (preferredWidths[i]) {
                    preferredLayoutWidth += preferredWidths[i] + hgap;
                }
            }
            if (preferredLayoutWidth != 0) {
                preferredLayoutWidth -= hgap;
            }
            preferredLayoutWidth = hgap + preferredLayoutWidth + hgap;
        }
        else {
            preferredLayoutWidth = this.preferredLayoutWidth(container);
            preferredWidths = this.getPreferredWidths();
        }
        container.setWidth(preferredLayoutWidth);
        var xs = [hgap];
        for (var i = 0; i < preferredWidths.length; i++) {
            if (preferredWidths[i]) {
                xs[i + 1] = xs[i] + preferredWidths[i] + hgap;
            }
            else {
                xs[i + 1] = xs[i];
            }
        }
        var components = container.getComponents();
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            if (component instanceof JSMenu || component instanceof JSMenuItem) {
                var x = 0;
                var icon = component.getIcon();
                if (icon) {
                    var iconPreferredWidth = icon.getPreferredWidth();
                    x = xs[0] + (xs[1] - hgap - xs[0] - iconPreferredWidth) / 2;
                    icon.setStyle("margin-left", x + "px");
                    x += iconPreferredWidth;
                }
                var label = component.getLabel();
                if (label) {
                    var labelPreferredWidth = label.getPreferredWidth();
                    if (icon) {
                        label.setStyle("margin-left", (xs[1] - x) + "px");
                    }
                    else {
                        label.setStyle("margin-left", xs[1] + "px");
                    }
                    x = xs[1] + labelPreferredWidth;
                }
                if (component instanceof JSMenu) {
                    var expandIcon = component.getExpandIcon();
                    if (expandIcon) {
                        var expandIconPreferredWidth = expandIcon.getPreferredWidth();
                        expandIcon.setStyle("margin-left", (preferredLayoutWidth - hgap / 2 - expandIconPreferredWidth - x) + "px");
                    }
                }
            }
        }
        this.setPreferredWidths(null);
    };
    return JSPopupMenuLayout;
}(JSLayout));
var JSProgressBar = (function (_super) {
    __extends(JSProgressBar, _super);
    function JSProgressBar(elementOrMinOrOrientation, maxOrMin, max) {
        var _this = _super.call(this, elementOrMinOrOrientation === undefined || !(elementOrMinOrOrientation instanceof HTMLDivElement) ? document.createElement("div") : elementOrMinOrOrientation) || this;
        if (elementOrMinOrOrientation !== undefined && !(elementOrMinOrOrientation instanceof HTMLDivElement)) {
            if (typeof elementOrMinOrOrientation === "number") {
                _this.setMin(elementOrMinOrOrientation);
                _this.setMax(maxOrMin);
            }
            else {
                _this.setOrientation(elementOrMinOrOrientation);
                if (maxOrMin !== undefined) {
                    _this.setMin(maxOrMin);
                    _this.setMax(max);
                }
            }
        }
        var bar = _this.getBar();
        if (!bar) {
            bar = new JSPanel();
            bar.setBackground("gray");
            bar.setHeight(12);
            _this.add(bar);
            _this.setBar(bar);
        }
        _this.setHeight(14);
        _this.setStyle("border", "1px solid gray");
        _this.setStyle("white-space", "nowrap");
        return _this;
    }
    JSProgressBar.prototype.init = function () {
        this.addClass("JSProgressBar");
    };
    JSProgressBar.prototype.getOrientation = function () {
        return this.getAttribute("data-orientation");
    };
    JSProgressBar.prototype.setOrientation = function (orientation) {
        this.setAttribute("data-orientation", orientation);
    };
    JSProgressBar.prototype.getMin = function () {
        return +this.getAttribute("data-min");
    };
    JSProgressBar.prototype.setMin = function (min) {
        this.setAttribute("data-min", "" + min);
    };
    JSProgressBar.prototype.getMax = function () {
        return +this.getAttribute("data-max");
    };
    JSProgressBar.prototype.setMax = function (max) {
        this.setAttribute("data-max", "" + max);
    };
    JSProgressBar.prototype.getBarContainer = function () {
        return this.getData("barContainer");
    };
    JSProgressBar.prototype.setBarContainer = function (barContainer) {
        this.setData("barContainer", barContainer);
    };
    JSProgressBar.prototype.getBar = function () {
        return this.getData("bar");
    };
    JSProgressBar.prototype.setBar = function (bar) {
        this.setData("bar", bar);
    };
    JSProgressBar.prototype.getValue = function () {
        return this.value;
    };
    JSProgressBar.prototype.setValue = function (value) {
        var barContainer = this.getBarContainer();
        var width = barContainer.getWidth();
        var bar = this.getBar();
        var min = this.getMin();
        var max = this.getMax();
        bar.setWidth(width * (value - min) / (max - min));
        this.value = value;
    };
    return JSProgressBar;
}(JSHTMLComponent));
var JSProperties = (function () {
    function JSProperties() {
        this.setProperties({});
    }
    JSProperties.prototype.getProperties = function () {
        return this.properties;
    };
    JSProperties.prototype.setProperties = function (properties) {
        this.properties = properties;
    };
    JSProperties.prototype.getProperty = function (key, defaultValue) {
        var properties = this.getProperties();
        if (defaultValue === undefined) {
            return properties[key];
        }
        else {
            var value = properties[key];
            if (value !== undefined) {
                return value;
            }
            else {
                return defaultValue;
            }
        }
    };
    JSProperties.prototype.setProperty = function (key, value) {
        var properties = this.getProperties();
        properties[key] = value;
    };
    return JSProperties;
}());
var JSPropertyChangeEvent = (function () {
    function JSPropertyChangeEvent(source, propertyName, oldValue, newValue) {
        this.setSource(source);
        this.setPropertyName(propertyName);
        this.setOldValue(oldValue);
        this.setNewValue(newValue);
    }
    JSPropertyChangeEvent.prototype.getSource = function () {
        return this.source;
    };
    JSPropertyChangeEvent.prototype.setSource = function (source) {
        this.source = source;
    };
    JSPropertyChangeEvent.prototype.getPropertyName = function () {
        return this.propertyName;
    };
    JSPropertyChangeEvent.prototype.setPropertyName = function (propertyName) {
        this.propertyName = propertyName;
    };
    JSPropertyChangeEvent.prototype.getOldValue = function () {
        return this.oldValue;
    };
    JSPropertyChangeEvent.prototype.setOldValue = function (oldValue) {
        this.oldValue = oldValue;
    };
    JSPropertyChangeEvent.prototype.getNewValue = function () {
        return this.newValue;
    };
    JSPropertyChangeEvent.prototype.setNewValue = function (newValue) {
        this.newValue = newValue;
    };
    return JSPropertyChangeEvent;
}());
var JSPropertyChangeListener = (function () {
    function JSPropertyChangeListener(propertyChangeListenerOrThisValue, propertyChangeListener) {
        if (propertyChangeListener === undefined) {
            propertyChangeListener = propertyChangeListenerOrThisValue;
            this.propertyChange = function (propertyChangeEvent) {
                propertyChangeListener.propertyChange(propertyChangeEvent);
            };
        }
        else {
            var thisValue = propertyChangeListenerOrThisValue;
            this.propertyChange = function (propertyChangeEvent) {
                propertyChangeListener.propertyChange.call(thisValue, propertyChangeEvent);
            };
        }
    }
    return JSPropertyChangeListener;
}());
var JSPropertyChangeSupport = (function () {
    function JSPropertyChangeSupport() {
    }
    JSPropertyChangeSupport.prototype.getPropertyChangeListeners = function () {
        var propertyChangeListeners = this.propertyChangeListeners;
        if (propertyChangeListeners === undefined) {
            propertyChangeListeners = [];
            this.propertyChangeListeners = propertyChangeListeners;
        }
        return propertyChangeListeners;
    };
    JSPropertyChangeSupport.prototype.addPropertyChangeListener = function (propertyChangeListener) {
        var propertyChangeListeners = this.getPropertyChangeListeners();
        propertyChangeListeners.push(propertyChangeListener);
    };
    JSPropertyChangeSupport.prototype.removePropertyChangeListener = function (propertyChangeListener) {
        var propertyChangeListeners = this.getPropertyChangeListeners();
        var index = propertyChangeListeners.indexOf(propertyChangeListener);
        if (index !== -1) {
            propertyChangeListeners.splice(index, 1);
        }
    };
    JSPropertyChangeSupport.prototype.firePropertyChange = function (propertyChangeEvent) {
        var propertyChangeListeners = this.getPropertyChangeListeners();
        for (var i = 0; i < propertyChangeListeners.length; i++) {
            var propertyChangeListener = propertyChangeListeners[i];
            propertyChangeListener.propertyChange(propertyChangeEvent);
        }
    };
    return JSPropertyChangeSupport;
}());
var JSResourceBundle = (function () {
    function JSResourceBundle() {
        this.setContents({});
    }
    JSResourceBundle.prototype.getContents = function () {
        return this.contents;
    };
    JSResourceBundle.prototype.setContents = function (contents) {
        this.contents = contents;
    };
    return JSResourceBundle;
}());
var JSScrollPane = (function (_super) {
    __extends(JSScrollPane, _super);
    function JSScrollPane(elementOrVsbPolicyOrView, hsbPolicyOrVsbPolicy, hsbPolicy) {
        var _this = _super.call(this, elementOrVsbPolicyOrView === undefined || !(elementOrVsbPolicyOrView instanceof HTMLDivElement) ? document.createElement("div") : elementOrVsbPolicyOrView) || this;
        _this.setLayout(new JSScrollPaneLayout());
        if (elementOrVsbPolicyOrView !== undefined && !(elementOrVsbPolicyOrView instanceof HTMLDivElement)) {
            if (typeof elementOrVsbPolicyOrView === "string") {
                _this.setVsbPolicy(elementOrVsbPolicyOrView);
                _this.setHsbPolicy(hsbPolicyOrVsbPolicy);
            }
            else {
                _this.setViewportView(elementOrVsbPolicyOrView);
                if (hsbPolicyOrVsbPolicy !== undefined) {
                    _this.setVsbPolicy(hsbPolicyOrVsbPolicy);
                    _this.setHsbPolicy(hsbPolicy);
                }
                else {
                    _this.setVsbPolicy(JSScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);
                    _this.setHsbPolicy(JSScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
                }
            }
        }
        return _this;
    }
    JSScrollPane.prototype.init = function () {
        this.addClass("JSScrollPane");
    };
    JSScrollPane.prototype.getVsbPolicy = function () {
        return this.getStyle("overflow-y");
    };
    JSScrollPane.prototype.setVsbPolicy = function (vsbPolicy) {
        this.setStyle("overflow-y", vsbPolicy);
    };
    JSScrollPane.prototype.getHsbPolicy = function () {
        return this.getStyle("overflow-x");
    };
    JSScrollPane.prototype.setHsbPolicy = function (hsbPolicy) {
        this.setStyle("overflow-x", hsbPolicy);
    };
    JSScrollPane.prototype.getViewportView = function () {
        return this.getData("viewportView");
    };
    JSScrollPane.prototype.setViewportView = function (viewportView) {
        if (viewportView) {
            this.removeAll();
            this.add(viewportView);
        }
        if (viewportView instanceof JSTable) {
            this.addAdjustmentListener(new JSAdjustmentListener(this, {
                adjustmentValueChanged: function (event) {
                    var table = this.getViewportView();
                    table.getTableHeader().setStyle("transform", "translate(0, " + this.element.scrollTop + "px)");
                }
            }));
        }
        this.setData("viewportView", viewportView);
    };
    JSScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED = "auto";
    JSScrollPane.VERTICAL_SCROLLBAR_NEVER = "hidden";
    JSScrollPane.VERTICAL_SCROLLBAR_ALWAYS = "scroll";
    JSScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED = "auto";
    JSScrollPane.HORIZONTAL_SCROLLBAR_NEVER = "hidden";
    JSScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS = "scroll";
    return JSScrollPane;
}(JSHTMLComponent));
var JSScrollPaneLayout = (function (_super) {
    __extends(JSScrollPaneLayout, _super);
    function JSScrollPaneLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSScrollPaneLayout.prototype.preferredLayoutWidth = function (scrollPane) {
        var preferredLayoutWidth = 0;
        var viewportView = scrollPane.getViewportView();
        if (viewportView && viewportView.isDisplayable()) {
            preferredLayoutWidth = viewportView.getPreferredOuterWidth();
        }
        return preferredLayoutWidth;
    };
    JSScrollPaneLayout.prototype.preferredLayoutHeight = function (scrollPane) {
        var preferredLayoutHeight = 0;
        var viewportView = scrollPane.getViewportView();
        if (viewportView && viewportView.isDisplayable()) {
            preferredLayoutHeight = viewportView.getPreferredOuterHeight();
        }
        return preferredLayoutHeight;
    };
    JSScrollPaneLayout.prototype.layoutContainer = function (scrollPane) {
        var viewportView = scrollPane.getViewportView();
        if (viewportView && viewportView.isDisplayable()) {
            var vsbPolicy = scrollPane.getVsbPolicy();
            var hsbPolicy = scrollPane.getHsbPolicy();
            if (vsbPolicy === JSScrollPane.VERTICAL_SCROLLBAR_NEVER && hsbPolicy === JSScrollPane.HORIZONTAL_SCROLLBAR_NEVER) {
                viewportView.setOuterWidth(scrollPane.getWidth());
                viewportView.setOuterHeight(scrollPane.getHeight());
            }
            else if (vsbPolicy === JSScrollPane.VERTICAL_SCROLLBAR_NEVER && hsbPolicy === JSScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS) {
                viewportView.setOuterWidth(Math.max(scrollPane.getWidth(), viewportView.getPreferredOuterWidth()));
                viewportView.setOuterHeight(scrollPane.element.clientHeight - 1);
            }
            else if (vsbPolicy === JSScrollPane.VERTICAL_SCROLLBAR_NEVER && hsbPolicy === JSScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED) {
                viewportView.setOuterWidth(Math.max(scrollPane.getWidth(), viewportView.getPreferredOuterWidth()));
                viewportView.setOuterHeight(scrollPane.element.clientHeight - 1);
            }
            else if (vsbPolicy === JSScrollPane.VERTICAL_SCROLLBAR_ALWAYS && hsbPolicy === JSScrollPane.HORIZONTAL_SCROLLBAR_NEVER) {
                viewportView.setOuterHeight(Math.max(scrollPane.getHeight(), viewportView.getPreferredOuterHeight()));
                viewportView.setOuterWidth(scrollPane.element.clientWidth - 1);
            }
            else if (vsbPolicy === JSScrollPane.VERTICAL_SCROLLBAR_ALWAYS && hsbPolicy === JSScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS) {
                viewportView.setOuterWidth(Math.max(scrollPane.element.clientWidth - 1, viewportView.getPreferredOuterWidth()));
                viewportView.setOuterHeight(Math.max(scrollPane.element.clientHeight - 1, viewportView.getPreferredOuterHeight()));
            }
            else if (vsbPolicy === JSScrollPane.VERTICAL_SCROLLBAR_ALWAYS && hsbPolicy === JSScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED) {
                viewportView.setOuterWidth(Math.max(scrollPane.element.clientWidth - 1, viewportView.getPreferredOuterWidth()));
                viewportView.setOuterHeight(Math.max(scrollPane.element.clientHeight - 1, viewportView.getPreferredOuterHeight()));
            }
            else if (vsbPolicy === JSScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED && hsbPolicy === JSScrollPane.HORIZONTAL_SCROLLBAR_NEVER) {
                viewportView.setOuterHeight(Math.max(scrollPane.getHeight(), viewportView.getPreferredHeight()));
                viewportView.setOuterWidth(scrollPane.element.clientWidth - 1);
            }
            else if (vsbPolicy === JSScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED && hsbPolicy === JSScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS) {
                viewportView.setOuterHeight(Math.max(scrollPane.element.clientHeight - 1, viewportView.getPreferredHeight()));
                viewportView.setOuterWidth(Math.max(scrollPane.element.clientWidth - 1, viewportView.getPreferredWidth()));
            }
            else {
                viewportView.setOuterWidth(Math.max(scrollPane.getWidth(), viewportView.getPreferredWidth()));
                viewportView.setOuterHeight(Math.max(scrollPane.element.clientHeight - 1, viewportView.getPreferredHeight()));
                viewportView.setOuterWidth(Math.max(scrollPane.element.clientWidth - 1, viewportView.getPreferredWidth()));
                viewportView.setOuterHeight(Math.max(scrollPane.element.clientHeight - 1, viewportView.getPreferredHeight()));
            }
        }
    };
    return JSScrollPaneLayout;
}(JSLayout));
var JSSelection = (function () {
    function JSSelection() {
        this.components = [];
        this.selected = null;
    }
    JSSelection.prototype.add = function (component) {
        var components = this.getComponents();
        components.push(component);
    };
    JSSelection.prototype.remove = function (component) {
        var components = this.getComponents();
        var index = components.indexOf(component);
        if (index === -1) {
            return;
        }
        components.splice(index, 1);
        var selected = this.getSelected();
        if (selected === component) {
            this.setSelected(null);
        }
    };
    JSSelection.prototype.getComponents = function () {
        return this.components;
    };
    JSSelection.prototype.getSelected = function () {
        return this.selected;
    };
    JSSelection.prototype.setSelected = function (component) {
        var selected = this.getSelected();
        if (selected === component) {
            return;
        }
        if (selected) {
            selected.setSelected(false);
        }
        else {
            var components = this.getComponents();
            for (var i = 0; i < components.length; i++) {
                components[i].setSelected(false);
            }
        }
        if (component) {
            component.setSelected(true);
        }
        this.selected = component;
    };
    JSSelection.prototype.setSelectedIndex = function (selectedIndex) {
        var components = this.getComponents();
        this.setSelected(components[selectedIndex]);
    };
    JSSelection.prototype.getSelectedIndex = function () {
        var components = this.getComponents();
        return components.indexOf(this.getSelected());
    };
    return JSSelection;
}());
var JSSeparator = (function (_super) {
    __extends(JSSeparator, _super);
    function JSSeparator(elementOrOrientation) {
        var _this = _super.call(this, elementOrOrientation === undefined || !(elementOrOrientation instanceof HTMLDivElement) ? document.createElement("div") : elementOrOrientation) || this;
        _this.orientation = JSSeparator.HORIZONTAL;
        if (elementOrOrientation !== undefined && !(elementOrOrientation instanceof HTMLDivElement)) {
            _this.setOrientation(elementOrOrientation);
        }
        var line = _this.getLine();
        if (!line) {
            line = new JSDiv();
            var orientation = _this.getOrientation();
            if (orientation === JSSeparator.VERTICAL) {
                line.setWidth(4);
                line.setStyle("border-right", "1px solid gray");
                _this.setStyle("padding-right", "4px");
            }
            else {
                line.setHeight(4);
                line.setStyle("border-bottom", "1px solid gray");
                _this.setStyle("padding-bottom", "4px");
            }
            _this.add(line);
            _this.setLine(line);
        }
        _this.addMouseListener(new JSMouseListener({
            mousePressed: function (mouseEvent) {
            },
            mouseReleased: function (mouseEvent) {
            }
        }));
        return _this;
    }
    JSSeparator.prototype.init = function () {
        this.addClass("JSSeparator");
    };
    JSSeparator.prototype.getLine = function () {
        return this.getData("line");
    };
    JSSeparator.prototype.setLine = function (line) {
        this.setData("line", line);
    };
    JSSeparator.prototype.getOrientation = function () {
        return this.getAttribute("data-orientation");
    };
    JSSeparator.prototype.setOrientation = function (orientation) {
        this.setAttribute("data-orientation", orientation);
    };
    return JSSeparator;
}(JSHTMLComponent));
var JSSpan = (function (_super) {
    __extends(JSSpan, _super);
    function JSSpan(element) {
        return _super.call(this, element === undefined ? document.createElement("span") : element) || this;
    }
    JSSpan.prototype.init = function () {
        this.addClass("JSSpan");
    };
    return JSSpan;
}(JSHTMLComponent));
var JSSplitPane = (function (_super) {
    __extends(JSSplitPane, _super);
    function JSSplitPane(elementOrOrientation) {
        var _this = _super.call(this, elementOrOrientation === undefined || !(elementOrOrientation instanceof HTMLDivElement) ? document.createElement("div") : elementOrOrientation) || this;
        _this.dividerLocation = -1;
        _this.dividerProportionalLocation = -1;
        _this.lastDividerLocation = -1;
        if (elementOrOrientation !== undefined && !(elementOrOrientation instanceof HTMLDivElement)) {
            _this.setOrientation(elementOrOrientation);
        }
        _this.setLayout(new JSSplitPaneLayout());
        var orientation = _this.getOrientation();
        var leftContainer = _this.getLeftContainer();
        if (!leftContainer) {
            leftContainer = new JSPanel(new JSBorderLayout());
            leftContainer.setBackground("white");
            leftContainer.setStyle("overflow", "hidden");
            _this.add(leftContainer);
            _this.setLeftContainer(leftContainer);
        }
        var rightContainer = _this.getRightContainer();
        if (!rightContainer) {
            rightContainer = new JSPanel(new JSBorderLayout());
            rightContainer.setBackground("white");
            rightContainer.setStyle("overflow", "hidden");
            _this.add(rightContainer);
            _this.setRightContainer(rightContainer);
        }
        var divider = _this.getDivider();
        if (!divider) {
            divider = new JSPanel(new JSBorderLayout());
            divider.setBackground("#f2f2f2");
            divider.setCursor(orientation === JSSplitPane.VERTICAL_SPLIT ? "ns-resize" : "ew-resize");
            _this.add(divider);
            divider.addMouseListener(new JSMouseListener(_this, {
                mousePressed: function (mouseEvent) {
                    var orientation = this.getOrientation();
                    if (orientation === JSSplitPane.VERTICAL_SPLIT) {
                        this.setData("dy", mouseEvent.y - this.getDividerLocation());
                    }
                    else {
                        this.setData("dx", mouseEvent.x - this.getDividerLocation());
                    }
                },
                mouseDragged: function (mouseEvent) {
                    var orientation = this.getOrientation();
                    if (orientation === JSSplitPane.VERTICAL_SPLIT) {
                        var y = mouseEvent.y;
                        if (y) {
                            this.setDividerLocation(y - this.getData("dy"));
                        }
                    }
                    else {
                        var x = mouseEvent.x;
                        if (x) {
                            this.setDividerLocation(x - this.getData("dx"));
                        }
                    }
                }
            }));
            _this.setDivider(divider);
        }
        return _this;
    }
    JSSplitPane.prototype.init = function () {
        this.addClass("JSSplitPane");
        this.setDividerSize(4);
    };
    JSSplitPane.prototype.getOrientation = function () {
        return this.getAttribute("data-orientation");
    };
    JSSplitPane.prototype.setOrientation = function (orientation) {
        this.setAttribute("data-orientation", orientation);
    };
    JSSplitPane.prototype.getLeftContainer = function () {
        return this.getData("leftContainer");
    };
    JSSplitPane.prototype.setLeftContainer = function (leftContainer) {
        this.setData("leftContainer", leftContainer);
    };
    JSSplitPane.prototype.getRightContainer = function () {
        return this.getData("rightContainer");
    };
    JSSplitPane.prototype.setRightContainer = function (rightContainer) {
        this.setData("rightContainer", rightContainer);
    };
    JSSplitPane.prototype.getLeftComponent = function () {
        var leftContainer = this.getLeftContainer();
        var components = leftContainer.getComponents();
        if (components.length === 1) {
            return components[0];
        }
        return null;
    };
    JSSplitPane.prototype.setLeftComponent = function (leftComponent) {
        var leftContainer = this.getLeftContainer();
        leftContainer.removeAll();
        leftContainer.add(leftComponent);
    };
    JSSplitPane.prototype.getRightComponent = function () {
        var rightContainer = this.getRightContainer();
        var components = rightContainer.getComponents();
        if (components.length === 1) {
            return components[0];
        }
        return null;
    };
    JSSplitPane.prototype.setRightComponent = function (rightComponent) {
        var rightContainer = this.getRightContainer();
        rightContainer.removeAll();
        rightContainer.add(rightComponent);
    };
    JSSplitPane.prototype.getTopComponent = function () {
        return this.getLeftComponent();
    };
    JSSplitPane.prototype.setTopComponent = function (component) {
        this.setLeftComponent(component);
    };
    JSSplitPane.prototype.getBottomComponent = function () {
        return this.getRightComponent();
    };
    JSSplitPane.prototype.setBottomComponent = function (component) {
        this.setRightComponent(component);
    };
    JSSplitPane.prototype.getDivider = function () {
        return this.getData("divider");
    };
    JSSplitPane.prototype.setDivider = function (divider) {
        this.setData("divider", divider);
    };
    JSSplitPane.prototype.getDividerSize = function () {
        return +this.getAttribute("data-divider-size");
    };
    JSSplitPane.prototype.setDividerSize = function (dividerSize) {
        this.setAttribute("data-divider-size", "" + dividerSize);
    };
    JSSplitPane.prototype.getDividerLocation = function () {
        return this.dividerLocation;
    };
    JSSplitPane.prototype.getDividerProportionalLocation = function () {
        return this.dividerProportionalLocation;
    };
    JSSplitPane.prototype.setDividerProportionalLocation = function (dividerProportionalLocation) {
        this.dividerProportionalLocation = dividerProportionalLocation;
    };
    JSSplitPane.prototype.setDividerLocation = function (dividerLocation) {
        this._setDividerLocation(dividerLocation);
        this.validateChildren();
    };
    JSSplitPane.prototype._setDividerLocation = function (dividerLocation) {
        dividerLocation = Math.min(Math.max(dividerLocation, this.getMinimumDividerLocation()), this.getMaximumDividerLocation());
        this.dividerLocation = dividerLocation;
        var orientation = this.getOrientation();
        var leftContainer = this.getLeftContainer();
        var rightContainer = this.getRightContainer();
        var divider = this.getDivider();
        var dividerSize = this.getDividerSize();
        if (orientation === JSSplitPane.VERTICAL_SPLIT) {
            var height = this.getHeight();
            divider.setY(dividerLocation);
            rightContainer.setY(dividerLocation + dividerSize);
            leftContainer.setOuterHeight(dividerLocation);
            rightContainer.setOuterHeight(height - dividerLocation - dividerSize);
        }
        else {
            var width = this.getWidth();
            divider.setX(dividerLocation);
            rightContainer.setX(dividerLocation + dividerSize);
            leftContainer.setOuterWidth(dividerLocation);
            rightContainer.setOuterWidth(width - dividerLocation - dividerSize);
        }
    };
    JSSplitPane.prototype.getMinimumDividerLocation = function () {
        return 0;
    };
    JSSplitPane.prototype.getMaximumDividerLocation = function () {
        var dividerSize = this.getDividerSize();
        var orientation = this.getOrientation();
        if (orientation === JSSplitPane.VERTICAL_SPLIT) {
            return this.getHeight() - dividerSize;
        }
        else {
            return this.getWidth() - dividerSize;
        }
    };
    return JSSplitPane;
}(JSHTMLComponent));
var JSSplitPaneLayout = (function (_super) {
    __extends(JSSplitPaneLayout, _super);
    function JSSplitPaneLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSSplitPaneLayout.prototype.addLayoutComponent = function (component) {
        component.setStyle("position", "absolute");
    };
    JSSplitPaneLayout.prototype.preferredLayoutWidth = function (splitPane) {
        var orientation = splitPane.getOrientation();
        var leftContainer = splitPane.getLeftContainer();
        var rightContainer = splitPane.getRightContainer();
        if (orientation === JSSplitPane.VERTICAL_SPLIT) {
            return Math.max(leftContainer.getPreferredOuterWidth(), rightContainer.getPreferredOuterWidth());
        }
        else {
            return leftContainer.getPreferredOuterWidth() + splitPane.getDividerSize() + rightContainer.getPreferredOuterWidth();
        }
    };
    JSSplitPaneLayout.prototype.preferredLayoutHeight = function (splitPane) {
        var orientation = splitPane.getOrientation();
        var leftContainer = splitPane.getLeftContainer();
        var rightContainer = splitPane.getRightContainer();
        if (orientation === JSSplitPane.VERTICAL_SPLIT) {
            return leftContainer.getPreferredOuterHeight() + splitPane.getDividerSize() + rightContainer.getPreferredOuterHeight();
        }
        else {
            return Math.max(leftContainer.getPreferredOuterHeight(), rightContainer.getPreferredOuterHeight());
        }
    };
    JSSplitPaneLayout.prototype.layoutContainer = function (splitPane) {
        var width = splitPane.getWidth();
        var height = splitPane.getHeight();
        var x = splitPane.getInsetLeft();
        var y = splitPane.getInsetTop();
        var orientation = splitPane.getOrientation();
        var leftContainer = splitPane.getLeftContainer();
        var rightContainer = splitPane.getRightContainer();
        var divider = splitPane.getDivider();
        var dividerSize = splitPane.getDividerSize();
        var dividerLocation = splitPane.getDividerLocation();
        var dividerProportionalLocation = splitPane.getDividerProportionalLocation();
        if (orientation === JSSplitPane.VERTICAL_SPLIT) {
            leftContainer.setOuterWidth(width);
            rightContainer.setOuterWidth(width);
            divider.setOuterWidth(width);
            leftContainer.setX(x);
            rightContainer.setX(x);
            divider.setX(x);
            leftContainer.setY(y);
            divider.setOuterHeight(dividerSize);
            if (dividerLocation === -1) {
                if (dividerProportionalLocation !== -1) {
                    dividerLocation = (splitPane.getMaximumDividerLocation() - splitPane.getMinimumDividerLocation()) * dividerProportionalLocation;
                }
                else {
                    dividerLocation = leftContainer.getPreferredOuterHeight();
                }
            }
        }
        else {
            leftContainer.setOuterHeight(height);
            rightContainer.setOuterHeight(height);
            divider.setOuterHeight(height);
            leftContainer.setY(y);
            rightContainer.setY(y);
            divider.setY(y);
            leftContainer.setX(x);
            divider.setOuterWidth(dividerSize);
            if (dividerLocation === -1) {
                if (dividerProportionalLocation !== -1) {
                    dividerLocation = (splitPane.getMaximumDividerLocation() - splitPane.getMinimumDividerLocation()) * dividerProportionalLocation;
                }
                else {
                    dividerLocation = leftContainer.getPreferredOuterWidth();
                }
            }
        }
        splitPane._setDividerLocation(dividerLocation);
    };
    return JSSplitPaneLayout;
}(JSLayout));
var JSSVGImage = (function (_super) {
    __extends(JSSVGImage, _super);
    function JSSVGImage(elementOrWidthOrLocation, heightOrWidth, height) {
        var _this = _super.call(this, elementOrWidthOrLocation === undefined || !(elementOrWidthOrLocation instanceof SVGImageElement) ? document.createElementNS("http://www.w3.org/2000/svg", "image") : elementOrWidthOrLocation) || this;
        if (elementOrWidthOrLocation !== undefined && !(elementOrWidthOrLocation instanceof SVGImageElement)) {
            if (typeof elementOrWidthOrLocation === "number") {
                _this.setWidth(elementOrWidthOrLocation);
                _this.setHeight(heightOrWidth);
            }
            else {
                _this.setLocation(elementOrWidthOrLocation);
                if (heightOrWidth !== undefined) {
                    _this.setWidth(heightOrWidth);
                    _this.setHeight(height);
                }
            }
        }
        return _this;
    }
    JSSVGImage.prototype.init = function () {
        this.addClass("JSSVGImage");
    };
    JSSVGImage.prototype.getPreferredWidth = function () {
        var preferredWidth = this.getAttribute("data-preferred-width");
        if (preferredWidth) {
            return +preferredWidth;
        }
        return this.getWidth();
    };
    JSSVGImage.prototype.getPreferredHeight = function () {
        var preferredHeight = this.getAttribute("data-preferred-height");
        if (preferredHeight) {
            return +preferredHeight;
        }
        return this.getHeight();
    };
    JSSVGImage.prototype.getLocation = function () {
        return this.element.getAttributeNS("http://www.w3.org/1999/xlink", "href");
    };
    JSSVGImage.prototype.setLocation = function (location) {
        this.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", location);
    };
    return JSSVGImage;
}(JSSVGComponent));
var JSTab = (function (_super) {
    __extends(JSTab, _super);
    function JSTab(elementOrCloseable, tabPlacement, iconOrText, icon) {
        var _this = _super.call(this, elementOrCloseable === undefined || !(elementOrCloseable instanceof HTMLDivElement) ? document.createElement("div") : elementOrCloseable) || this;
        var container = _this.getContainer();
        if (!container) {
            container = new JSPanel();
            _this.add(container);
            _this.setContainer(container);
        }
        if (elementOrCloseable !== undefined && !(elementOrCloseable instanceof HTMLDivElement)) {
            _this.setTabPlacement(tabPlacement);
            _this.setCloseable(elementOrCloseable);
            if (iconOrText instanceof HTMLImageElement) {
                _this.setIcon(new JSImageIcon(iconOrText));
            }
            else if (iconOrText instanceof JSComponent) {
                _this.setIcon(iconOrText);
            }
            else {
                _this.setText(iconOrText);
                if (icon !== undefined) {
                    if (icon instanceof HTMLImageElement) {
                        _this.setIcon(new JSImageIcon(icon));
                    }
                    else {
                        _this.setIcon(icon);
                    }
                }
            }
        }
        _this.addMouseListener(new JSMouseListener(_this, {
            mouseClicked: function (mouseEvent) {
                var tabContainer = this.getParent();
                if (tabContainer) {
                    tabContainer.setSelectedIndex(tabContainer.indexOfTab(this));
                }
            }
        }));
        _this.addDragListener(new JSDragListener(_this, {
            dragStart: function (dragEvent) {
                if (dragEvent.dataTransfer.setDragImage) {
                    dragEvent.dataTransfer.setDragImage(JSDataTransfer.getDragImage(), 0, 0);
                    var tabContainer = this.getParent();
                    tabContainer.setSelectedIndex(tabContainer.indexOfTab(this));
                    JSDataTransfer.setData("dragSource", this);
                }
                else {
                }
            }
        }));
        _this.addDropListener(new JSDropListener(_this, {
            dragOver: function (dragEvent) {
                var container = this.getContainer();
                this.setStyle("z-index", "1");
                var boundingClientRect = this.getBoundingClientRect();
                if (dragEvent.x >= (boundingClientRect.left + boundingClientRect.width / 2)) {
                    container.setStyle("box-shadow", "2px 0 #404040, -1px 0 #404040 inset");
                }
                else {
                    container.setStyle("box-shadow", "-2px 0 #404040, 1px 0 #404040 inset");
                }
                return true;
            },
            dragLeave: function (dragEent) {
                var container = this.getContainer();
                this.setStyle("z-index", "0");
                container.setStyle("box-shadow", "none");
            },
            drop: function (dragEvent) {
                console.log("drop");
                this.setStyle("z-index", "0");
                container.setStyle("box-shadow", "none");
                return true;
            }
        }));
        _this.setBackground("gray");
        _this.setStyle("display", "inline-block");
        _this.setStyle("white-space", "nowrap");
        return _this;
    }
    JSTab.prototype.init = function () {
        this.addClass("JSTab");
    };
    JSTab.prototype.getContainer = function () {
        return this.getData("container");
    };
    JSTab.prototype.setContainer = function (container) {
        this.setData("container", container);
    };
    JSTab.prototype.getTabPlacement = function () {
        return this.getAttribute("data-tab-placement");
    };
    JSTab.prototype.setTabPlacement = function (tabPlacement) {
        this.setAttribute("data-tab-placement", tabPlacement);
        var container = this.getContainer();
        switch (tabPlacement) {
            case JSTabbedPane.RIGHT:
                this.setStyle("padding", "0 0 1px 0");
                container.setStyle("border-right", "1px solid gray");
                break;
            case JSTabbedPane.LEFT:
                this.setStyle("padding", "0 0 1px 0");
                container.setStyle("border-left", "1px solid gray");
                break;
            case JSTabbedPane.BOTTOM:
                this.setStyle("padding", "0 1px 0 0");
                container.setStyle("border-bottom", "1px solid gray");
                break;
            case JSTabbedPane.TOP:
            default:
                this.setStyle("padding", "0 1px 0 0");
                container.setStyle("border-top", "1px solid gray");
        }
    };
    JSTab.prototype.isCloseable = function () {
        var closeButton = this.getCloseButton();
        return !!closeButton;
    };
    JSTab.prototype.setCloseable = function (closeable) {
        if (closeable) {
            var closeButton = this.getCloseButton();
            if (!closeButton) {
                closeButton = new JSPathIcon("M4,4L12,12M12,4L4,12", 16, 16);
                closeButton.getPath().setForeground("red");
                closeButton.addMouseListener(new JSMouseListener(this, {
                    mouseClicked: function (mouseEvent) {
                        var tabContainer = this.getParent();
                        tabContainer.fireTabClosing(new JSTabEvent(this));
                    }
                }));
                this.setCloseButton(closeButton);
            }
        }
    };
    JSTab.prototype.setIcon = function (icon) {
        var oldIcon = this.getIcon();
        if (oldIcon !== icon) {
            var container = this.getContainer();
            if (oldIcon) {
                container.remove(oldIcon);
            }
            if (icon) {
                var tabPlacement = this.getTabPlacement();
                if (tabPlacement === JSTabbedPane.LEFT || tabPlacement === JSTabbedPane.RIGHT) {
                    icon.setStyle("display", "block");
                    icon.setStyle("margin", "4px auto 0");
                }
                else {
                    icon.setStyle("margin-left", "4px");
                    icon.setStyle("vertical-align", "middle");
                }
                container.add(icon, null, 0);
            }
        }
        _super.prototype.setIcon.call(this, icon);
    };
    JSTab.prototype.getLabel = function () {
        return this.getData("label");
    };
    JSTab.prototype.setLabel = function (label) {
        this.setData("label", label);
    };
    JSTab.prototype.getCloseButton = function () {
        return this.getData("closeButton");
    };
    JSTab.prototype.setCloseButton = function (closeButton) {
        if (closeButton) {
            var oldCloseButton = this.getCloseButton();
            if (oldCloseButton !== closeButton) {
                var container = this.getContainer();
                if (oldCloseButton) {
                    container.remove(oldCloseButton);
                }
                if (closeButton) {
                    var tabPlacement = this.getTabPlacement();
                    if (tabPlacement === JSTabbedPane.LEFT || tabPlacement === JSTabbedPane.RIGHT) {
                        closeButton.setStyle("margin", "-4px auto 0");
                    }
                    else {
                        closeButton.setStyle("margin-left", "-4px");
                        closeButton.setStyle("vertical-align", "middle");
                    }
                    container.add(closeButton);
                }
            }
        }
        this.setData("closeButton", closeButton);
    };
    JSTab.prototype.getText = function () {
        return this.getData("text");
    };
    JSTab.prototype.setText = function (text) {
        var label = this.getLabel();
        if (!label) {
            label = new JSLabel();
            var tabPlacement = this.getTabPlacement();
            if (tabPlacement === JSTabbedPane.LEFT || tabPlacement === JSTabbedPane.RIGHT) {
                label.setStyle("display", "block");
                label.setStyle("margin", "4px 0");
                label.setStyle("text-align", "center");
            }
            else {
                label.setStyle("margin", "0 4px");
                label.setStyle("vertical-align", "middle");
            }
            var container = this.getContainer();
            var closeButton = this.getCloseButton();
            if (closeButton) {
                var components = container.getComponents();
                var index = components.indexOf(closeButton);
                container.add(label, null, index);
            }
            else {
                container.add(label);
            }
            this.setLabel(label);
        }
        if (text) {
            var tabPlacement = this.getTabPlacement();
            if (tabPlacement === JSTabbedPane.LEFT || tabPlacement === JSTabbedPane.RIGHT) {
                label.setText("<html>" + text.split("").join("<br>") + "</html>");
            }
            else {
                label.setText(text);
            }
        }
        else {
            label.setText("");
        }
        this.setData("text", text);
    };
    JSTab.prototype.setSelected = function (selected) {
        var container = this.getContainer();
        container.setBackground(selected ? "white" : "#BFBFBF");
        var label = this.getLabel();
        if (label) {
            label.setForeground(selected ? "black" : "#404040");
        }
        _super.prototype.setSelected.call(this, selected);
    };
    JSTab.prototype.clone = function () {
        var clone = new JSTab();
        clone.setTabPlacement(this.getTabPlacement());
        clone.setCloseable(this.isCloseable());
        clone.setText(this.getText());
        clone.setIcon(this.getIcon().clone());
        return clone;
    };
    return JSTab;
}(JSHTMLComponent));
var JSTabbedPane = (function (_super) {
    __extends(JSTabbedPane, _super);
    function JSTabbedPane(elementOrTabPlacement) {
        var _this = _super.call(this, elementOrTabPlacement === undefined || !(elementOrTabPlacement instanceof HTMLDivElement) ? document.createElement("div") : elementOrTabPlacement) || this;
        if (elementOrTabPlacement !== undefined && !(elementOrTabPlacement instanceof HTMLDivElement)) {
            _this.setTabPlacement(elementOrTabPlacement);
        }
        var tabPlacement = _this.getTabPlacement();
        if (!tabPlacement) {
            tabPlacement = JSTabbedPane.TOP;
            _this.setTabPlacement(tabPlacement);
        }
        _this.setLayout(new JSBorderLayout());
        var tabContainer = _this.getTabContainer();
        if (!tabContainer) {
            tabContainer = new JSTabContainer(tabPlacement);
            switch (tabPlacement) {
                case JSTabbedPane.RIGHT:
                    _this.add(tabContainer, JSBorderLayout.EAST);
                    break;
                case JSTabbedPane.LEFT:
                    _this.add(tabContainer, JSBorderLayout.WEST);
                    break;
                case JSTabbedPane.BOTTOM:
                    _this.add(tabContainer, JSBorderLayout.SOUTH);
                    break;
                case JSTabbedPane.TOP:
                default:
                    _this.add(tabContainer, JSBorderLayout.NORTH);
            }
            _this.setTabContainer(tabContainer);
        }
        var componentContainer = _this.getComponentContainer();
        if (!componentContainer) {
            componentContainer = new JSPanel(new JSCardLayout());
            _this.add(componentContainer);
            _this.setComponentContainer(componentContainer);
        }
        tabContainer.addTabListener(new JSTabListener(_this, {
            tabOpened: function (tabEvent) {
                var tab = tabEvent.getSource();
                var tabContainer = this.getTabContainer();
                var index = tabContainer.indexOfTab(tab);
                tabContainer.setSelectedIndex(index);
            },
            tabActivated: function (tabEvent) {
                var tabContainer = this.getTabContainer();
                var componentContainer = this.getComponentContainer();
                componentContainer.getLayout().show(componentContainer, tabContainer.getSelectedIndex());
            },
            tabClosed: function (tabEvent) {
                var tabContainer = this.getTabContainer();
                var selectedIndex = tabContainer.getSelectedIndex();
                if (selectedIndex === -1) {
                    tabContainer.setSelectedIndex(0);
                }
            }
        }));
        return _this;
    }
    JSTabbedPane.prototype.init = function () {
        this.addClass("JSTabbedPane");
    };
    JSTabbedPane.prototype.getTabPlacement = function () {
        return this.getAttribute("data-tab-placement");
    };
    JSTabbedPane.prototype.setTabPlacement = function (tabPlacement) {
        this.setAttribute("data-tab-placement", tabPlacement);
    };
    JSTabbedPane.prototype.getTabContainer = function () {
        return this.getData("tabContainer");
    };
    JSTabbedPane.prototype.setTabContainer = function (tabContainer) {
        this.setData("tabContainer", tabContainer);
    };
    JSTabbedPane.prototype.getComponentContainer = function () {
        return this.getData("componentContainer");
    };
    JSTabbedPane.prototype.setComponentContainer = function (componentContainer) {
        this.setData("componentContainer", componentContainer);
    };
    JSTabbedPane.prototype.getTabCount = function () {
        var tabContainer = this.getTabContainer();
        return tabContainer.getTabCount();
    };
    JSTabbedPane.prototype.getTabComponentAt = function (index) {
        var tabContainer = this.getTabContainer();
        return tabContainer.getTabComponentAt(index);
    };
    JSTabbedPane.prototype.addTab = function (iconOrTitle, componentOrIcon, component) {
        if (iconOrTitle instanceof JSComponent) {
            return this._addTab(false, iconOrTitle, componentOrIcon);
        }
        else if (component === undefined) {
            return this._addTab(false, iconOrTitle, componentOrIcon);
        }
        else {
            return this._addTab(false, iconOrTitle, componentOrIcon, component);
        }
    };
    JSTabbedPane.prototype.addCloseableTab = function (iconOrTitle, componentOrIcon, component) {
        if (iconOrTitle instanceof JSComponent) {
            return this._addTab(true, iconOrTitle, componentOrIcon);
        }
        else if (component === undefined) {
            return this._addTab(true, iconOrTitle, componentOrIcon);
        }
        else {
            return this._addTab(true, iconOrTitle, componentOrIcon, component);
        }
    };
    JSTabbedPane.prototype._addTab = function (closeable, iconOrTitle, componentOrIcon, component) {
        if (iconOrTitle instanceof JSComponent) {
            component = componentOrIcon;
        }
        else if (component === undefined) {
            component = componentOrIcon;
        }
        var componentContainer = this.getComponentContainer();
        componentContainer.add(component);
        var tabContainer = this.getTabContainer();
        if (iconOrTitle instanceof JSComponent) {
            return tabContainer.addTab(closeable, iconOrTitle);
        }
        else if (componentOrIcon === component) {
            return tabContainer.addTab(closeable, iconOrTitle);
        }
        else {
            return tabContainer.addTab(closeable, iconOrTitle, componentOrIcon);
        }
    };
    JSTabbedPane.prototype.removeTabAt = function (index) {
        var tabContainer = this.getTabContainer();
        var tabComponent = tabContainer.getTabComponentAt(index);
        tabContainer.remove(tabComponent);
        var componentContainer = this.getComponentContainer();
        componentContainer.remove(index);
    };
    JSTabbedPane.prototype.setTabComponentAt = function (index, tabComponent) {
        var tabContainer = this.getTabContainer();
        tabContainer.setTabComponentAt(index, tabComponent);
    };
    JSTabbedPane.prototype.indexOfComponent = function (component) {
        var componentContainer = this.getComponentContainer();
        var components = componentContainer.getComponents();
        return components.indexOf(component);
    };
    JSTabbedPane.prototype.getComponentAt = function (index) {
        var componentContainer = this.getComponentContainer();
        var components = componentContainer.getComponents();
        return components[index];
    };
    JSTabbedPane.prototype.indexOfTab = function (tabComponent) {
        var tabContainer = this.getTabContainer();
        return tabContainer.indexOfTab(tabComponent);
    };
    JSTabbedPane.prototype.addButton = function (button, constraints) {
        var tabContainer = this.getTabContainer();
        if (constraints !== undefined) {
            tabContainer.addButton(button);
        }
        else {
            tabContainer.addButton(button, constraints);
        }
    };
    JSTabbedPane.prototype.addTabListener = function (tabListener) {
        var tabContainer = this.getTabContainer();
        tabContainer.addTabListener(tabListener);
    };
    JSTabbedPane.prototype.removeTabListener = function (tabListener) {
        var tabContainer = this.getTabContainer();
        tabContainer.removeTabListener(tabListener);
    };
    JSTabbedPane.prototype.getSelectedIndex = function () {
        var tabContainer = this.getTabContainer();
        return tabContainer.getSelectedIndex();
    };
    JSTabbedPane.prototype.setSelectedIndex = function (selectedIndex) {
        var tabContainer = this.getTabContainer();
        tabContainer.setSelectedIndex(selectedIndex);
    };
    return JSTabbedPane;
}(JSHTMLComponent));
var JSTabContainer = (function (_super) {
    __extends(JSTabContainer, _super);
    function JSTabContainer(elementOrTabPlacement) {
        var _this = _super.call(this, elementOrTabPlacement === undefined || !(elementOrTabPlacement instanceof HTMLDivElement) ? document.createElement("div") : elementOrTabPlacement) || this;
        if (elementOrTabPlacement !== undefined && !(elementOrTabPlacement instanceof HTMLDivElement)) {
            _this.setTabPlacement(elementOrTabPlacement);
        }
        var tabPlacement = _this.getTabPlacement();
        if (!tabPlacement) {
            tabPlacement = JSTabContainer.TOP;
            _this.setTabPlacement(tabPlacement);
        }
        var tabSelection = _this.getTabSelection();
        if (!tabSelection) {
            tabSelection = new JSSelection();
            _this.setTabSelection(tabSelection);
        }
        _this.setBackground("#BFBFBF");
        switch (tabPlacement) {
            case JSTabContainer.RIGHT:
                _this.setLayout(new JSFlowLayout(JSFlowLayout.RIGHT_TO_LEFT, JSFlowLayout.TOP));
                _this.setStyle("padding", "1px 0");
                break;
            case JSTabContainer.LEFT:
                _this.setLayout(new JSFlowLayout(JSFlowLayout.LEFT_TO_RIGHT, JSFlowLayout.TOP));
                _this.setStyle("padding", "1px 0");
                break;
            case JSTabContainer.BOTTOM:
                _this.setLayout(new JSFlowLayout(JSFlowLayout.BOTTOM_TO_TOP, JSFlowLayout.LEFT));
                _this.setStyle("padding", "0 1px");
                break;
            case JSTabContainer.TOP:
            default:
                _this.setLayout(new JSFlowLayout(JSFlowLayout.TOP_TO_BOTTOM, JSFlowLayout.LEFT));
                _this.setStyle("padding", "0 1px");
        }
        return _this;
    }
    JSTabContainer.prototype.init = function () {
        this.addClass("JSTabContainer");
    };
    JSTabContainer.prototype.getTabPlacement = function () {
        return this.getAttribute("data-tab-placement");
    };
    JSTabContainer.prototype.setTabPlacement = function (tabPlacement) {
        this.setAttribute("data-tab-placement", tabPlacement);
    };
    JSTabContainer.prototype.getTabSelection = function () {
        return this.getData("tabSelection");
    };
    JSTabContainer.prototype.setTabSelection = function (tabSelection) {
        this.setData("tabSelection", tabSelection);
    };
    JSTabContainer.prototype.getTabComponents = function () {
        var tabComponents = this.getData("tabComponents");
        if (tabComponents === undefined) {
            tabComponents = [];
            this.setData("tabComponents", tabComponents);
        }
        return tabComponents;
    };
    JSTabContainer.prototype.getTabCount = function () {
        var tabComponents = this.getTabComponents();
        return tabComponents.length;
    };
    JSTabContainer.prototype.getTabComponentAt = function (index) {
        var tabComponents = this.getTabComponents();
        return tabComponents[index];
    };
    JSTabContainer.prototype.indexOfTab = function (tabComponent) {
        var tabComponents = this.getTabComponents();
        return tabComponents.indexOf(tabComponent);
    };
    JSTabContainer.prototype.addTab = function (closeable, iconOrTitle, icon) {
        var title;
        if (iconOrTitle instanceof JSComponent) {
            icon = iconOrTitle;
        }
        else {
            title = iconOrTitle;
        }
        var tabComponent;
        var tabPlacement = this.getTabPlacement();
        if (!title) {
            tabComponent = new JSTab(closeable, tabPlacement, icon);
        }
        else if (!icon) {
            tabComponent = new JSTab(closeable, tabPlacement, title);
        }
        else {
            tabComponent = new JSTab(closeable, tabPlacement, title, icon);
        }
        var tabSelection = this.getTabSelection();
        tabSelection.add(tabComponent);
        var selected = tabSelection.getSelected();
        if (!selected) {
            tabSelection.setSelectedIndex(0);
        }
        switch (tabPlacement) {
            case JSTabContainer.RIGHT:
                this.add(tabComponent, { anchor: JSFlowLayout.WEST });
                break;
            case JSTabContainer.LEFT:
                this.add(tabComponent, { anchor: JSFlowLayout.EAST });
                break;
            case JSTabContainer.BOTTOM:
                this.add(tabComponent, { anchor: JSFlowLayout.NORTH });
                break;
            case JSTabContainer.TOP:
            default:
                this.add(tabComponent, { anchor: JSFlowLayout.SOUTH });
        }
        var tabComponents = this.getTabComponents();
        tabComponents.push(tabComponent);
        this.fireTabOpened(new JSTabEvent(tabComponent));
        return tabComponent;
    };
    JSTabContainer.prototype.remove = function (indexOrComponent) {
        var component;
        var components = this.getComponents();
        if (typeof indexOrComponent === "number") {
            if (indexOrComponent < components.length) {
                component = components[indexOrComponent];
            }
            else {
                return;
            }
        }
        else {
            component = indexOrComponent;
        }
        var tabSelection = this.getTabSelection();
        tabSelection.remove(component);
        _super.prototype.remove.call(this, component);
        var tabComponents = this.getTabComponents();
        var index = tabComponents.indexOf(component);
        tabComponents.splice(index, 1);
        this.fireTabClosed(new JSTabEvent(component));
    };
    JSTabContainer.prototype.setTabComponentAt = function (index, tabComponent) {
        var tabPlacement = this.getTabPlacement();
        var tabSelection = this.getTabSelection();
        tabSelection.add(tabComponent);
        var selected = tabSelection.getSelected();
        if (!selected) {
            tabSelection.setSelectedIndex(0);
        }
        switch (tabPlacement) {
            case JSTabContainer.RIGHT:
                this.add(tabComponent, { anchor: JSFlowLayout.WEST }, index);
                break;
            case JSTabContainer.LEFT:
                this.add(tabComponent, { anchor: JSFlowLayout.EAST }, index);
                break;
            case JSTabContainer.BOTTOM:
                this.add(tabComponent, { anchor: JSFlowLayout.NORTH }, index);
                break;
            case JSTabContainer.TOP:
            default:
                this.add(tabComponent, { anchor: JSFlowLayout.SOUTH }, index);
        }
        var tabComponents = this.getTabComponents();
        tabComponents.push(tabComponent);
        this.fireTabOpened(new JSTabEvent(tabComponent));
        return tabComponent;
    };
    JSTabContainer.prototype.addButton = function (button, constraints) {
        if (constraints === undefined) {
            var tabPlacement = this.getTabPlacement();
            switch (tabPlacement) {
                case JSTabContainer.RIGHT:
                    constraints = { anchor: JSFlowLayout.EAST };
                    break;
                case JSTabContainer.LEFT:
                    constraints = { anchor: JSFlowLayout.WEST };
                    break;
                case JSTabContainer.BOTTOM:
                    constraints = { anchor: JSFlowLayout.SOUTHEAST };
                    break;
                case JSTabContainer.TOP:
                default:
                    constraints = { anchor: JSFlowLayout.NORTHEAST };
            }
        }
        this.add(button, constraints);
    };
    JSTabContainer.prototype.getSelectedIndex = function () {
        var tabSelection = this.getTabSelection();
        return tabSelection.getSelectedIndex();
    };
    JSTabContainer.prototype.setSelectedIndex = function (selectedIndex) {
        var tabSelection = this.getTabSelection();
        this.fireTabDeactivated(new JSTabEvent(tabSelection.getSelected()));
        tabSelection.setSelectedIndex(selectedIndex);
        this.fireTabActivated(new JSTabEvent(tabSelection.getSelected()));
    };
    JSTabContainer.prototype.getTabListeners = function () {
        var tabListeners = this.getData("tabListeners");
        if (tabListeners === undefined) {
            tabListeners = [];
            this.setData("tabListeners", tabListeners);
        }
        return tabListeners;
    };
    JSTabContainer.prototype.addTabListener = function (tabListener) {
        var tabListeners = this.getTabListeners();
        tabListeners.push(tabListener);
    };
    JSTabContainer.prototype.removeTabListener = function (tabListener) {
        var tabListeners = this.getTabListeners();
        var index = tabListeners.indexOf(tabListener);
        if (index !== -1) {
            tabListeners.splice(index, 1);
        }
    };
    JSTabContainer.prototype.fireTabOpened = function (tabEvent) {
        var tabListeners = this.getTabListeners();
        for (var i = 0; i < tabListeners.length; i++) {
            var tabListener = tabListeners[i];
            if (tabListener.tabOpened) {
                tabListener.tabOpened(tabEvent);
            }
        }
    };
    JSTabContainer.prototype.fireTabClosing = function (tabEvent) {
        var tabListeners = this.getTabListeners();
        for (var i = 0; i < tabListeners.length; i++) {
            var tabListener = tabListeners[i];
            if (tabListener.tabClosing) {
                tabListener.tabClosing(tabEvent);
            }
        }
    };
    JSTabContainer.prototype.fireTabClosed = function (tabEvent) {
        var tabListeners = this.getTabListeners();
        for (var i = 0; i < tabListeners.length; i++) {
            var tabListener = tabListeners[i];
            if (tabListener.tabClosed) {
                tabListener.tabClosed(tabEvent);
            }
        }
    };
    JSTabContainer.prototype.fireTabActivated = function (tabEvent) {
        var tabListeners = this.getTabListeners();
        for (var i = 0; i < tabListeners.length; i++) {
            var tabListener = tabListeners[i];
            if (tabListener.tabActivated) {
                tabListener.tabActivated(tabEvent);
            }
        }
    };
    JSTabContainer.prototype.fireTabDeactivated = function (tabEvent) {
        var tabListeners = this.getTabListeners();
        for (var i = 0; i < tabListeners.length; i++) {
            var tabListener = tabListeners[i];
            if (tabListener.tabDeactivated) {
                tabListener.tabDeactivated(tabEvent);
            }
        }
    };
    return JSTabContainer;
}(JSHTMLComponent));
var JSTabEvent = (function () {
    function JSTabEvent(source) {
        this.setSource(source);
    }
    JSTabEvent.prototype.getSource = function () {
        return this.source;
    };
    JSTabEvent.prototype.setSource = function (source) {
        this.source = source;
    };
    return JSTabEvent;
}());
var JSTable = (function (_super) {
    __extends(JSTable, _super);
    function JSTable(elementOrRows, columns) {
        var _this = _super.call(this, elementOrRows === undefined || !(elementOrRows instanceof HTMLTableElement) ? document.createElement("table") : elementOrRows) || this;
        var tableHeader = _this.getTableHeader();
        if (!tableHeader) {
            tableHeader = new JSTableHeader();
            _this.add(tableHeader);
            _this.setTableHeader(tableHeader);
        }
        var tableContent = _this.getTableContent();
        if (!tableContent) {
            tableContent = new JSTableContent();
            _this.add(tableContent);
            _this.setTableContent(tableContent);
        }
        if (elementOrRows !== undefined && !(elementOrRows instanceof HTMLTableElement)) {
            if (columns === undefined) {
                _this.setRows(elementOrRows);
            }
            else {
                _this.setRows(elementOrRows);
                _this.setColumns(columns);
            }
        }
        return _this;
    }
    JSTable.prototype.init = function () {
        this.addClass("JSTable");
        this.setStyle("border-collapse", "collapse");
    };
    JSTable.prototype.getRows = function () {
        var tableContent = this.getTableContent();
        return tableContent.getRows();
    };
    JSTable.prototype.setRows = function (rows) {
        var tableContent = this.getTableContent();
        tableContent.setRows(rows);
    };
    JSTable.prototype.getColumns = function () {
        var tableHeader = this.getTableHeader();
        return tableHeader.getColumns();
    };
    JSTable.prototype.setColumns = function (columns) {
        var tableHeader = this.getTableHeader();
        tableHeader.setColumns(columns);
    };
    JSTable.prototype.getTableHeader = function () {
        return this.getData("tableHeader");
    };
    JSTable.prototype.setTableHeader = function (tableHeader) {
        this.setData("tableHeader", tableHeader);
    };
    JSTable.prototype.getTableContent = function () {
        return this.getData("tableContent");
    };
    JSTable.prototype.setTableContent = function (tableContent) {
        this.setData("tableContent", tableContent);
    };
    return JSTable;
}(JSHTMLComponent));
var JSTableContent = (function (_super) {
    __extends(JSTableContent, _super);
    function JSTableContent(element) {
        return _super.call(this, element === undefined ? document.createElement("tbody") : element) || this;
    }
    JSTableContent.prototype.init = function () {
        this.addClass("JSTableBody");
        this.setEditable(true);
    };
    JSTableContent.prototype.getRows = function () {
        var rows = [];
        var components = this.getComponents();
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            rows.push(component.getValues());
        }
        return rows;
    };
    JSTableContent.prototype.setRows = function (rows) {
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var tableRow = new JSTableRow(row);
            this.add(tableRow);
        }
    };
    return JSTableContent;
}(JSHTMLComponent));
var JSTableDataCell = (function (_super) {
    __extends(JSTableDataCell, _super);
    function JSTableDataCell(elementOrValue) {
        var _this = _super.call(this, elementOrValue === undefined || !(elementOrValue instanceof HTMLTableCellElement) ? document.createElement("td") : elementOrValue) || this;
        if (elementOrValue !== undefined && !(elementOrValue instanceof HTMLTableCellElement)) {
            _this.setValue(elementOrValue);
        }
        return _this;
    }
    JSTableDataCell.prototype.init = function () {
        this.addClass("JSTableDataCell");
        this.setStyle("border", "1px solid gray");
        this.setStyle("border-collapse", "collapse");
    };
    JSTableDataCell.prototype.getValue = function () {
        return this.getData("value") || this.getText();
    };
    JSTableDataCell.prototype.setValue = function (value) {
        if (typeof value === "string") {
            this.setText(value);
        }
        else {
            this.setText("" + value);
            this.setData("value", value);
        }
    };
    return JSTableDataCell;
}(JSHTMLComponent));
var JSTableHeader = (function (_super) {
    __extends(JSTableHeader, _super);
    function JSTableHeader(element) {
        return _super.call(this, element === undefined ? document.createElement("thead") : element) || this;
    }
    JSTableHeader.prototype.init = function () {
        this.addClass("JSTableHeader");
        this.setBackground("#f2f2f2");
    };
    JSTableHeader.prototype.getColumns = function () {
        var columns = [];
        var components = this.getComponents();
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            columns.push(component.getText());
        }
        return columns;
    };
    JSTableHeader.prototype.setColumns = function (columns) {
        for (var i = 0; i < columns.length; i++) {
            var column = columns[i];
            this.add(new JSTableHeaderCell(column));
        }
    };
    return JSTableHeader;
}(JSHTMLComponent));
var JSTableHeaderCell = (function (_super) {
    __extends(JSTableHeaderCell, _super);
    function JSTableHeaderCell(elementOrText) {
        var _this = _super.call(this, elementOrText === undefined || !(elementOrText instanceof HTMLTableCellElement) ? document.createElement("th") : elementOrText) || this;
        var div = _this.getDiv();
        if (!div) {
            div = new JSDiv();
            div.setStyle("outline", "1px solid gray");
            _this.add(div);
            _this.setDiv(div);
        }
        if (elementOrText !== undefined && !(elementOrText instanceof HTMLTableCellElement)) {
            div.setText(elementOrText);
        }
        return _this;
    }
    JSTableHeaderCell.prototype.init = function () {
        this.addClass("JSTableHeaderCell");
        this.setStyle("border-collapse", "collapse");
    };
    JSTableHeaderCell.prototype.getDiv = function () {
        return this.getData("div");
    };
    JSTableHeaderCell.prototype.setDiv = function (div) {
        this.setData("div", div);
    };
    return JSTableHeaderCell;
}(JSHTMLComponent));
var JSTableRow = (function (_super) {
    __extends(JSTableRow, _super);
    function JSTableRow(elementOrValues) {
        var _this = _super.call(this, elementOrValues === undefined || !(elementOrValues instanceof HTMLTableRowElement) ? document.createElement("tr") : elementOrValues) || this;
        if (elementOrValues !== undefined && !(elementOrValues instanceof HTMLTableRowElement)) {
            _this.setValues(elementOrValues);
        }
        return _this;
    }
    JSTableRow.prototype.init = function () {
        this.addClass("JSTableRow");
    };
    JSTableRow.prototype.getValues = function () {
        var values = [];
        var components = this.getComponents();
        for (var i = 0; i < components.length; i++) {
            var tableDataCell = components[i];
            values.push(tableDataCell.getValue());
        }
        return values;
    };
    JSTableRow.prototype.setValues = function (values) {
        for (var i = 0; i < values.length; i++) {
            var value = values[i];
            var tableDataCell = new JSTableDataCell(value);
            this.add(tableDataCell);
        }
    };
    return JSTableRow;
}(JSHTMLComponent));
var JSTabListener = (function () {
    function JSTabListener(tabListenerOrThisValue, tabListener) {
        if (tabListener === undefined) {
            tabListener = tabListenerOrThisValue;
            if (tabListener.tabOpened) {
                this.tabOpened = function (tabEvent) {
                    tabListener.tabOpened(tabEvent);
                };
            }
            if (tabListener.tabClosing) {
                this.tabClosing = function (tabEvent) {
                    tabListener.tabClosing(tabEvent);
                };
            }
            if (tabListener.tabClosed) {
                this.tabClosed = function (tabEvent) {
                    tabListener.tabClosed(tabEvent);
                };
            }
            if (tabListener.tabActivated) {
                this.tabActivated = function (tabEvent) {
                    tabListener.tabActivated(tabEvent);
                };
            }
            if (tabListener.tabDeactivated) {
                this.tabDeactivated = function (tabEvent) {
                    tabListener.tabDeactivated(tabEvent);
                };
            }
        }
        else {
            var thisValue = tabListenerOrThisValue;
            if (tabListener.tabOpened) {
                this.tabOpened = function (tabEvent) {
                    tabListener.tabOpened.call(thisValue, tabEvent);
                };
            }
            if (tabListener.tabClosing) {
                this.tabClosing = function (tabEvent) {
                    tabListener.tabClosing.call(thisValue, tabEvent);
                };
            }
            if (tabListener.tabClosed) {
                this.tabClosed = function (tabEvent) {
                    tabListener.tabClosed.call(thisValue, tabEvent);
                };
            }
            if (tabListener.tabActivated) {
                this.tabActivated = function (tabEvent) {
                    tabListener.tabActivated.call(thisValue, tabEvent);
                };
            }
            if (tabListener.tabDeactivated) {
                this.tabDeactivated = function (tabEvent) {
                    tabListener.tabDeactivated.call(thisValue, tabEvent);
                };
            }
        }
    }
    return JSTabListener;
}());
var JSTextArea = (function (_super) {
    __extends(JSTextArea, _super);
    function JSTextArea(elementOrRowsOrText, columnsOrRows, columns) {
        var _this = _super.call(this, elementOrRowsOrText === undefined || !(elementOrRowsOrText instanceof HTMLTextAreaElement) ? document.createElement("textarea") : elementOrRowsOrText) || this;
        if (elementOrRowsOrText !== undefined && !(elementOrRowsOrText instanceof HTMLTextAreaElement)) {
            if (typeof elementOrRowsOrText === "number") {
                _this.setRows(elementOrRowsOrText);
                _this.setColumns(columnsOrRows);
            }
            else {
                _this.setText(elementOrRowsOrText);
                if (columnsOrRows !== undefined) {
                    _this.setRows(columnsOrRows);
                    _this.setColumns(columns);
                }
            }
        }
        return _this;
    }
    JSTextArea.prototype.init = function () {
        this.addClass("JSTextArea");
        this.setStyle("border", "0");
        this.setStyle("margin", "0");
        this.setStyle("padding", "0");
    };
    JSTextArea.prototype.getRows = function () {
        return +this.getAttribute("rows");
    };
    JSTextArea.prototype.setRows = function (rows) {
        this.setAttribute("rows", "" + rows);
    };
    JSTextArea.prototype.getColumns = function () {
        return +this.getAttribute("columns");
    };
    JSTextArea.prototype.setColumns = function (columns) {
        this.setAttribute("columns", "" + columns);
    };
    return JSTextArea;
}(JSHTMLComponent));
var JSTextField = (function (_super) {
    __extends(JSTextField, _super);
    function JSTextField(elementOrColumnsOrText, columns) {
        var _this = _super.call(this, elementOrColumnsOrText === undefined || !(elementOrColumnsOrText instanceof HTMLInputElement) ? document.createElement("input") : elementOrColumnsOrText) || this;
        _this.setAttribute("type", "text");
        if (elementOrColumnsOrText !== undefined && !(elementOrColumnsOrText instanceof HTMLInputElement)) {
            if (typeof elementOrColumnsOrText === "number") {
                _this.setColumns(elementOrColumnsOrText);
            }
            else {
                _this.setText(elementOrColumnsOrText);
                if (columns !== undefined) {
                    _this.setColumns(columns);
                }
            }
        }
        return _this;
    }
    JSTextField.prototype.init = function () {
        this.addClass("JSTextField");
    };
    JSTextField.prototype.getColumns = function () {
        return +this.getAttribute("size");
    };
    JSTextField.prototype.setColumns = function (columns) {
        this.setAttribute("size", "" + columns);
    };
    JSTextField.prototype.getText = function () {
        return this.getAttribute("value");
    };
    JSTextField.prototype.setText = function (text) {
        this.setAttribute("value", text);
    };
    return JSTextField;
}(JSHTMLComponent));
var JSToolBar = (function (_super) {
    __extends(JSToolBar, _super);
    function JSToolBar(element) {
        return _super.call(this, element === undefined ? document.createElement("div") : element) || this;
    }
    JSToolBar.prototype.init = function () {
        this.addClass("JSToolBar");
        this.setBackground("#f2f2f2");
    };
    JSToolBar.prototype.addSeparator = function () {
        var separator = new JSPanel();
        separator.setWidth(8);
        this.add(separator);
    };
    return JSToolBar;
}(JSHTMLComponent));
var JSTree = (function (_super) {
    __extends(JSTree, _super);
    function JSTree(elementOrRoot) {
        var _this = _super.call(this, elementOrRoot === undefined || !(elementOrRoot instanceof HTMLDivElement) ? document.createElement("div") : elementOrRoot) || this;
        if (elementOrRoot !== undefined && !(elementOrRoot instanceof HTMLDivElement)) {
            _this.setRoot(elementOrRoot);
        }
        var root = _this.getRoot();
        if (!root) {
            root = new JSTreeNode();
            _this.setRoot(root);
        }
        _this.setLayout(new JSTreeLayout());
        _this.setRootVisible(true);
        return _this;
    }
    JSTree.prototype.init = function () {
        this.addClass("JSTree");
        this.setStyle("white-space", "nowrap");
    };
    JSTree.prototype.getRoot = function () {
        return this.getData("root");
    };
    JSTree.prototype.setRoot = function (root) {
        this.setData("root", root);
    };
    JSTree.prototype.isRootVisible = function () {
        return this.getAttribute("data-root-visible") === "true";
    };
    JSTree.prototype.setRootVisible = function (rootVisible) {
        this.setAttribute("data-root-visible", "" + rootVisible);
    };
    JSTree.prototype.getTreeCells = function () {
        var treeCells = this.getData("treeCells");
        if (!treeCells) {
            treeCells = {};
            this.setTreeCells(treeCells);
        }
        return treeCells;
    };
    JSTree.prototype.setTreeCells = function (treeCells) {
        this.setData("treeCells", treeCells);
    };
    JSTree.prototype.getTreeCell = function (treePath) {
        var treeCells = this.getTreeCells();
        return treeCells[treePath];
    };
    JSTree.prototype.setTreeCell = function (treePath, treeCell) {
        var treeCells = this.getTreeCells();
        treeCells[treePath] = treeCell;
    };
    JSTree.prototype.getTreeCellRenderer = function () {
        var treeCellRenderer = this.getData("treeCellRenderer");
        if (!treeCellRenderer) {
            treeCellRenderer = new JSTreeCellRenderer();
            this.setTreeCellRenderer(treeCellRenderer);
        }
        return treeCellRenderer;
    };
    JSTree.prototype.setTreeCellRenderer = function (treeCellRenderer) {
        this.setData("treeCellRenderer", treeCellRenderer);
    };
    JSTree.prototype.addTreeNode = function (treeNode) {
        var treeOrContainer = this;
        var parent = treeNode.getParent();
        if (parent) {
            var parentTreeCell = this.getTreeCell(parent.getTreePath());
            if (parentTreeCell) {
                treeOrContainer = parentTreeCell.getContainer();
                ;
            }
        }
        var treeCellRenderer = this.getTreeCellRenderer();
        var selectionTreeNode = this.getSelectionTreeNode();
        var treeCell = treeCellRenderer.getTreeCellRendererComponent(this, treeNode);
        treeOrContainer.add(treeCell);
        var treePath = treeNode.getTreePath();
        this.setTreeCell(treePath, treeCell);
        if (treeNode.getAllowsChildren()) {
            var container = new JSDiv();
            container.setStyle("display", "none");
            treeOrContainer.add(container);
            treeCell.setContainer(container);
        }
        var tree = this;
        treeCell.addMouseListener({
            mousePressed: function (mouseEvent) {
                tree.setSelectionTreeNode(treeCell.getValue());
            }
        });
    };
    JSTree.prototype.getSelectionTreeNode = function () {
        return this.selectionTreeNode;
    };
    JSTree.prototype.setSelectionTreeNode = function (selectionTreeNode) {
        this.selectionTreeNode = selectionTreeNode;
    };
    JSTree.prototype.expand = function (treePath) {
        var treeCell = this.getTreeCell(treePath);
        if (!treeCell) {
            this.validate();
        }
        treeCell = this.getTreeCell(treePath);
        var container = treeCell.getContainer();
        container.setStyle("display", "");
        var treeCell = this.getTreeCell(treePath);
        treeCell.getBranchIcon().setPathDefinition(JSTreeCell.EXPANDED_PATH_DEFINITION);
    };
    JSTree.prototype.collapse = function (treePath) {
        var treeCell = this.getTreeCell(treePath);
        if (!treeCell) {
            this.validate();
        }
        treeCell = this.getTreeCell(treePath);
        var container = treeCell.getContainer();
        container.setStyle("display", "none");
        var treeCell = this.getTreeCell(treePath);
        treeCell.getBranchIcon().setPathDefinition(JSTreeCell.COLLAPSED_PATH_DEFINITION);
    };
    JSTree.prototype.reload = function () {
        this.removeAll();
        this.load(this.getRoot());
        this.pad(this, this.isRootVisible() ? 4 : -8);
        this.setVisible(true);
    };
    JSTree.prototype.load = function (treeNode) {
        this.addTreeNode(treeNode);
        var children = treeNode.children();
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            this.load(child);
        }
    };
    JSTree.prototype.pad = function (container, padding) {
        var components = container.getComponents();
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            if (component instanceof JSTreeCell) {
                var branchIcon = component.getBranchIcon();
                if (branchIcon) {
                    component.setStyle("padding-left", padding + "px");
                }
                else {
                    component.setStyle("padding-left", (padding + 16 + 4) + "px");
                }
            }
            else {
                this.pad(component, padding + 12);
            }
        }
    };
    JSTree.prototype.setVisible = function (visible) {
        if (visible) {
            var components = this.getComponents();
            var rootTreeCell = components[0];
            var rootVisible = this.isRootVisible();
            rootTreeCell.setStyle("display", rootVisible ? "" : "none");
            var rootContainer = components[1];
            rootContainer.setStyle("display", "");
        }
        _super.prototype.setVisible.call(this, visible);
    };
    return JSTree;
}(JSHTMLComponent));
var JSTreeLayout = (function (_super) {
    __extends(JSTreeLayout, _super);
    function JSTreeLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSTreeLayout.prototype.layoutContainer = function (tree) {
        var components = tree.getComponents();
        if (!components.length) {
            tree.reload();
        }
    };
    return JSTreeLayout;
}(JSLayout));
var JSTreeCell = (function (_super) {
    __extends(JSTreeCell, _super);
    function JSTreeCell(elementOrValue, icon) {
        var _this = _super.call(this, elementOrValue === undefined || !(elementOrValue instanceof HTMLDivElement) ? document.createElement("div") : elementOrValue) || this;
        var label = _this.getLabel();
        if (!label) {
            label = new JSLabel();
            label.setStyle("vertical-align", "middle");
            _this.add(label);
            _this.setLabel(label);
        }
        if (elementOrValue !== undefined && !(elementOrValue instanceof HTMLDivElement)) {
            _this.setValue(elementOrValue);
            if (icon !== undefined) {
                if (icon instanceof HTMLImageElement) {
                    _this.setIcon(new JSImageIcon(icon));
                }
                else {
                    _this.setIcon(icon);
                }
            }
        }
        _this.addMouseListener(new JSMouseListener(_this, {
            mouseEntered: function (mouseEvent) {
                this.setBackground("#e6e6e6");
            },
            mouseExited: function (mouseEvent) {
                this.setBackground(null);
            }
        }));
        return _this;
    }
    JSTreeCell.prototype.init = function () {
        this.addClass("JSTreeCell");
        this.setStyle("padding", "0 4px");
    };
    JSTreeCell.prototype.getValue = function () {
        return this.getData("value");
    };
    JSTreeCell.prototype.setValue = function (value) {
        this.setData("value", value);
        this.setText("" + value);
        if (value.getAllowsChildren()) {
            var children = value.children();
            if (children.length) {
                var branchIcon = this.getBranchIcon();
                if (!branchIcon) {
                    branchIcon = new JSPathIcon(JSTreeCell.COLLAPSED_PATH_DEFINITION, 16, 16);
                    branchIcon.getPath().setBackground("gray");
                    branchIcon.setStyle("margin-right", "4px");
                    branchIcon.setStyle("vertical-align", "middle");
                    this.add(branchIcon, null, 0);
                    branchIcon.addMouseListener(new JSMouseListener(this, {
                        mouseClicked: function (mouseEvent) {
                            var container = this.getContainer();
                            if (container.isDisplayable()) {
                                this.getBranchIcon().getPath().setPathDefinition(JSTreeCell.COLLAPSED_PATH_DEFINITION);
                                container.setStyle("display", "none");
                            }
                            else {
                                this.getBranchIcon().getPath().setPathDefinition(JSTreeCell.EXPANDED_PATH_DEFINITION);
                                container.setStyle("display", "");
                            }
                        }
                    }));
                    this.setBranchIcon(branchIcon);
                    this.addMouseListener(new JSMouseListener(this, {
                        mouseClicked: function (mouseEvent) {
                            var container = this.getContainer();
                            if (container.isDisplayable()) {
                                this.getBranchIcon().getPath().setPathDefinition(JSTreeCell.COLLAPSED_PATH_DEFINITION);
                                container.setStyle("display", "none");
                            }
                            else {
                                this.getBranchIcon().getPath().setPathDefinition(JSTreeCell.EXPANDED_PATH_DEFINITION);
                                container.setStyle("display", "");
                            }
                        }
                    }));
                }
            }
        }
    };
    JSTreeCell.prototype.getBranchIcon = function () {
        return this.getData("branchIcon");
    };
    JSTreeCell.prototype.setBranchIcon = function (branchIcon) {
        this.setData("branchIcon", branchIcon);
    };
    JSTreeCell.prototype.setIcon = function (icon) {
        var oldIcon = this.getIcon();
        if (oldIcon !== icon) {
            if (oldIcon) {
                this.remove(oldIcon);
            }
            if (icon) {
                icon.setStyle("margin-right", "4px");
                icon.setStyle("vertical-align", "middle");
                var branchIcon = this.getBranchIcon();
                this.add(icon, null, branchIcon ? 1 : 0);
            }
        }
        _super.prototype.setIcon.call(this, icon);
    };
    JSTreeCell.prototype.getLabel = function () {
        return this.getData("label");
    };
    JSTreeCell.prototype.setLabel = function (label) {
        this.setData("label", label);
    };
    JSTreeCell.prototype.setText = function (text) {
        var label = this.getLabel();
        label.setText(text);
    };
    JSTreeCell.prototype.getContainer = function () {
        return this.getData("container");
    };
    JSTreeCell.prototype.setContainer = function (container) {
        this.setData("container", container);
    };
    JSTreeCell.COLLAPSED_PATH_DEFINITION = "M5.17,2.34L10.83,8L5.17,13.66Z";
    JSTreeCell.EXPANDED_PATH_DEFINITION = "M12,4L12,12L4,12Z";
    return JSTreeCell;
}(JSHTMLComponent));
var JSTreeCellRenderer = (function () {
    function JSTreeCellRenderer() {
        this.icons = {};
    }
    JSTreeCellRenderer.prototype.getTreeCellRendererComponent = function (tree, value) {
        var treeNode = value;
        var icon = this.getIcon(treeNode.getTreePath());
        return new JSTreeCell(value, icon);
    };
    JSTreeCellRenderer.prototype.setIcon = function (treePath, icon) {
        this.icons[treePath] = icon;
    };
    JSTreeCellRenderer.prototype.getIcon = function (treePath) {
        return this.icons[treePath];
    };
    return JSTreeCellRenderer;
}());
var JSTreeNode = (function () {
    function JSTreeNode(userObject, allowsChildren) {
        this.userObject = null;
        this.allowsChildren = true;
        this.nodes = [];
        this.parent = null;
        if (userObject !== undefined) {
            this.setUserObject(userObject);
            if (allowsChildren !== undefined) {
                this.setAllowsChildren(allowsChildren);
            }
        }
    }
    JSTreeNode.prototype.getAllowsChildren = function () {
        return this.allowsChildren;
    };
    JSTreeNode.prototype.setAllowsChildren = function (allowsChildren) {
        this.allowsChildren = allowsChildren;
    };
    JSTreeNode.prototype.add = function (node) {
        this.nodes.push(node);
        node.parent = this;
    };
    JSTreeNode.prototype.remove = function (node) {
        var index = this.nodes.indexOf(node);
        if (index === -1) {
            return;
        }
        this.nodes.splice(index, 1);
        node.parent = null;
    };
    JSTreeNode.prototype.children = function () {
        return this.nodes;
    };
    JSTreeNode.prototype.getParent = function () {
        return this.parent;
    };
    JSTreeNode.prototype.getUserObject = function () {
        return this.userObject;
    };
    JSTreeNode.prototype.setUserObject = function (userObject) {
        this.userObject = userObject;
    };
    JSTreeNode.prototype.getTreePath = function () {
        var treePath = this.toString();
        var parent = this.getParent();
        while (parent) {
            treePath = parent.toString() + "/" + treePath;
            parent = parent.getParent();
        }
        return treePath;
    };
    JSTreeNode.prototype.toString = function () {
        return "" + (this.userObject || "");
    };
    return JSTreeNode;
}());
