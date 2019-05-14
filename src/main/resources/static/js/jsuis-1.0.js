var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var JSComponent = (function () {
    function JSComponent(element) {
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
        if (attribute === "width" && +value < 0) {
            try {
                throw "";
            }
            catch (e) {
                console.log(this.getName());
            }
        }
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
    };
    JSComponent.prototype.withId = function (id) {
        this.setId(id);
        return this;
    };
    JSComponent.prototype.getName = function () {
        return this.getAttribute("name");
    };
    JSComponent.prototype.setName = function (name) {
        this.setAttribute("name", name);
    };
    JSComponent.prototype.withName = function (name) {
        this.setName(name);
        return this;
    };
    JSComponent.prototype.getClass = function () {
        return this.getAttribute("class");
    };
    JSComponent.prototype.setClass = function (clazzes) {
        this.setAttribute("class", clazzes);
    };
    JSComponent.prototype.hasClass = function (clazz) {
        var clazzes = " " + (this.getAttribute("class") || "").trim() + " ";
        return clazzes.indexOf(" " + clazz + " ") !== -1;
    };
    JSComponent.prototype.addClass = function (clazz) {
        var clazzes = " " + (this.getAttribute("class") || "").trim() + " ";
        if (clazzes.indexOf(" " + clazz + " ") !== -1) {
            return;
        }
        this.setClass(clazzes.trim() + " " + clazz);
    };
    JSComponent.prototype.removeClass = function (clazz) {
        var clazzes = " " + (this.getAttribute("class") || "").trim() + " ";
        while (clazzes.indexOf(" " + clazz + " ") !== -1) {
            clazzes = clazzes.replace(" " + clazz + " ", " ");
        }
        this.setClass(clazzes.trim());
    };
    JSComponent.prototype.getX = function () {
        return this.x;
    };
    JSComponent.prototype.getY = function () {
        return this.y;
    };
    JSComponent.prototype.setX = function (x) {
        this.x = x;
    };
    JSComponent.prototype.setY = function (y) {
        this.y = y;
    };
    JSComponent.prototype.getWidth = function () {
        return this.width;
    };
    JSComponent.prototype.getOuterWidth = function () {
        return this.getWidth();
    };
    JSComponent.prototype.getHeight = function () {
        return this.height;
    };
    JSComponent.prototype.getOuterHeight = function () {
        return this.getHeight();
    };
    JSComponent.prototype.setWidth = function (width) {
        this.width = width;
    };
    JSComponent.prototype.setOuterWidth = function (outerWidth) {
        this.setWidth(outerWidth);
    };
    JSComponent.prototype.setHeight = function (height) {
        this.height = height;
    };
    JSComponent.prototype.setOuterHeight = function (outerHeight) {
        this.setHeight(outerHeight);
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
        var layout = this.getLayout();
        if (layout) {
            var parent = this.getParent();
            if (parent) {
                var parentLayout = parent.getLayout();
                if (!parentLayout) {
                    this.setStyle("min-width", this.getPreferredWidth() + "px");
                    this.setStyle("min-height", this.getPreferredHeight() + "px");
                    this.setStyle("position", "relative");
                }
            }
            layout.layoutContainer(this);
        }
        this.validateChildren();
    };
    JSComponent.prototype.validateChildren = function () {
        var components = this.getComponents();
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            component.validate();
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
        return +this.getAttribute("data-preferred-width");
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
        return +this.getAttribute("data-preferred-height");
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
    JSComponent.prototype.getAlign = function () {
        return this.align;
    };
    JSComponent.prototype.setAlign = function (align) {
        this.align = align;
    };
    JSComponent.prototype.getText = function () {
        return "";
    };
    JSComponent.prototype.setText = function (text) {
    };
    JSComponent.prototype.getBorder = function () {
        return this.getData("border");
    };
    JSComponent.prototype.setBorder = function (border) {
        this.setData("border", border);
        border.paintBorder(this);
    };
    JSComponent.prototype.getCursor = function () {
        return "";
    };
    JSComponent.prototype.setCursor = function (cursor) {
    };
    JSComponent.prototype.getGraphics = function () {
        return null;
    };
    JSComponent.prototype.getIcon = function () {
        return this.getData("icon");
    };
    JSComponent.prototype.setIcon = function (icon) {
        this.setData("icon", icon);
        var graphics = this.getGraphics();
        if (graphics) {
            if (icon) {
                icon.paintIcon(this, graphics);
            }
            else {
                graphics.removeAll();
            }
        }
    };
    JSComponent.prototype.getAction = function () {
        return this.getData("action");
    };
    JSComponent.prototype.setAction = function (action) {
        var oldAction = this.getAction();
        if (oldAction) {
            this.removeActionListener(oldAction);
        }
        var name = action.getName();
        if (name) {
            this.setText(name);
        }
        var icon = action.getIcon();
        if (icon) {
            this.setIcon(icon);
        }
        this.addActionListener(action);
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
    JSComponent.prototype.addEventListener = function (event, listener, useCapture) {
        this.element.addEventListener(event, listener, !!useCapture);
    };
    JSComponent.prototype.removeEventListener = function (event, listener, useCapture) {
        this.element.removeEventListener(event, listener, !!useCapture);
    };
    JSComponent.prototype.getMouseListeners = function () {
        var mouseListeners = this.getData("mouseListeners");
        if (mouseListeners === undefined) {
            mouseListeners = [];
            this.setData("mouseListeners", mouseListeners);
        }
        return mouseListeners;
    };
    JSComponent.prototype.getJSMouseListeners = function () {
        var jsMouseListeners = this.getData("jsMouseListeners");
        if (jsMouseListeners === undefined) {
            jsMouseListeners = [];
            this.setData("jsMouseListeners", jsMouseListeners);
        }
        return jsMouseListeners;
    };
    JSComponent.prototype.addMouseListener = function (mouseListener, useCapture) {
        var mouseListeners = this.getMouseListeners();
        mouseListeners.push(mouseListener);
        var jsMouseListener = new JSMouseListener(mouseListener);
        var jsMouseListeners = this.getJSMouseListeners();
        jsMouseListeners.push(jsMouseListener);
        if (jsMouseListener.mouseClicked) {
            this.element.addEventListener("click", jsMouseListener.mouseClicked, !!useCapture);
        }
        if (jsMouseListener.mousePressed) {
            this.element.addEventListener("mousedown", jsMouseListener.mousePressed, !!useCapture);
        }
        if (jsMouseListener.mouseReleased) {
            this.element.addEventListener("mouseup", jsMouseListener.mouseReleased, !!useCapture);
        }
        if (jsMouseListener.mouseEntered) {
            this.element.addEventListener("mouseenter", jsMouseListener.mouseEntered, !!useCapture);
        }
        if (jsMouseListener.mouseExited) {
            this.element.addEventListener("mouseleave", jsMouseListener.mouseExited, !!useCapture);
        }
        if (jsMouseListener.mouseMoved) {
            this.element.addEventListener("mousemove", jsMouseListener.mouseMoved, !!useCapture);
        }
        if (jsMouseListener.mouseDragged) {
            this.addMouseDraggedListener(jsMouseListener, !!useCapture);
        }
        return jsMouseListener.withParameters(this);
    };
    JSComponent.prototype.removeMouseListener = function (mouseListener, useCapture) {
        var mouseListeners = this.getMouseListeners();
        var index = mouseListeners.indexOf(mouseListener);
        if (index !== -1) {
            var jsMouseListeners = this.getJSMouseListeners();
            var jsMouseListener = jsMouseListeners[index];
            if (jsMouseListener.mouseClicked) {
                this.element.removeEventListener("click", jsMouseListener.mouseClicked, !!useCapture);
            }
            if (jsMouseListener.mousePressed) {
                this.element.removeEventListener("mousedown", jsMouseListener.mousePressed, !!useCapture);
            }
            if (jsMouseListener.mouseReleased) {
                this.element.removeEventListener("mouseup", jsMouseListener.mouseReleased, !!useCapture);
            }
            if (jsMouseListener.mouseEntered) {
                this.element.removeEventListener("mouseenter", jsMouseListener.mouseEntered, !!useCapture);
            }
            if (jsMouseListener.mouseExited) {
                this.element.removeEventListener("mouseleave", jsMouseListener.mouseExited, !!useCapture);
            }
            if (jsMouseListener.mouseMoved) {
                this.element.removeEventListener("mousemove", jsMouseListener.mouseMoved, !!useCapture);
            }
            if (jsMouseListener.mouseDragged) {
                this.removeMouseDraggedListener(jsMouseListener);
            }
            mouseListeners.splice(index, 1);
            jsMouseListeners.splice(index, 1);
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
    JSComponent.prototype.getJSActionListeners = function () {
        var jsActionListeners = this.getData("jsActionListeners");
        if (jsActionListeners === undefined) {
            jsActionListeners = [];
            this.setData("jsActionListeners", jsActionListeners);
        }
        return jsActionListeners;
    };
    JSComponent.prototype.addActionListener = function (actionListener, useCapture) {
        var actionListeners = this.getActionListeners();
        actionListeners.push(actionListener);
        var jsActionListener = new JSActionListener(actionListener);
        var jsActionListeners = this.getJSActionListeners();
        jsActionListeners.push(jsActionListener);
        var mouseListener = this.getData("actionListener" + !!useCapture);
        if (!mouseListener) {
            mouseListener = {
                mouseClicked: function (mouseEvent, source) {
                    source.fireActionPerformed(mouseEvent);
                    mouseEvent.stopPropagation();
                }
            };
            this.addMouseListener(mouseListener, !!useCapture).withParameters(this);
            this.setData("actionListener" + !!useCapture, mouseListener);
        }
        return jsActionListener.withParameters(this);
    };
    JSComponent.prototype.removeActionListener = function (actionListener) {
        var actionListeners = this.getActionListeners();
        var index = actionListeners.indexOf(actionListener);
        if (index !== -1) {
            var jsActionListeners = this.getJSActionListeners();
            actionListeners.splice(index, 1);
            jsActionListeners.splice(index, 1);
        }
    };
    JSComponent.prototype.fireActionPerformed = function (mouseEvent) {
        var jsActionListeners = this.getJSActionListeners();
        for (var i = 0; i < jsActionListeners.length; i++) {
            var jsActionListener = jsActionListeners[i];
            jsActionListener.actionPerformed(mouseEvent);
        }
    };
    JSComponent.prototype.getMouseDraggedListeners = function () {
        var mouseDraggedListeners = this.getData("mouseDraggedListeners");
        if (mouseDraggedListeners === undefined) {
            mouseDraggedListeners = [];
            this.setData("mouseDraggedListeners", mouseDraggedListeners);
        }
        return mouseDraggedListeners;
    };
    JSComponent.prototype.getJSMouseDraggedListeners = function () {
        var jsMouseDraggedListeners = this.getData("jsMouseDraggedListeners");
        if (jsMouseDraggedListeners === undefined) {
            jsMouseDraggedListeners = [];
            this.setData("jsMouseDraggedListeners", jsMouseDraggedListeners);
        }
        return jsMouseDraggedListeners;
    };
    JSComponent.prototype.addMouseDraggedListener = function (mouseDraggedListener, useCapture) {
        var mouseDraggedListeners = this.getMouseDraggedListeners();
        mouseDraggedListeners.push(mouseDraggedListener);
        var jsMouseDraggedListener = new JSMouseDraggedListener(mouseDraggedListener);
        var jsMouseDraggedListeners = this.getJSMouseDraggedListeners();
        jsMouseDraggedListeners.push(jsMouseDraggedListener);
        var mouseListener = this.getData("mouseDraggedListener" + !!useCapture);
        if (!mouseListener) {
            mouseListener = {
                mousePressed: function (mouseEvent, source) {
                    JSBody.getInstance().setDragSource(source);
                    mouseEvent.stopPropagation();
                }
            };
            this.addMouseListener(mouseListener, !!useCapture).withParameters(this);
            this.setData("mouseDraggedListener" + !!useCapture, mouseListener);
        }
        return jsMouseDraggedListener.withParameters(this);
    };
    JSComponent.prototype.removeMouseDraggedListener = function (mouseDraggedListener) {
        var mouseDraggedListeners = this.getMouseDraggedListeners();
        var index = mouseDraggedListeners.indexOf(mouseDraggedListener);
        if (index !== -1) {
            var jsMouseDraggedListeners = this.getJSMouseDraggedListeners();
            mouseDraggedListeners.splice(index, 1);
            jsMouseDraggedListeners.splice(index, 1);
        }
    };
    JSComponent.prototype.fireMouseDragged = function (mouseEvent) {
        var jsMouseDraggedListeners = this.getJSMouseDraggedListeners();
        for (var i = 0; i < jsMouseDraggedListeners.length; i++) {
            var jsMouseDraggedListener = jsMouseDraggedListeners[i];
            jsMouseDraggedListener.mouseDragged(mouseEvent);
        }
    };
    JSComponent.prototype.isDragEnabled = function () {
        return this.getData("dragEnabled");
    };
    JSComponent.prototype.setDragEnabled = function (dragEnable) {
        this.setData("dragEnabled", dragEnable);
    };
    JSComponent.prototype.getDragSourceListeners = function () {
        var dragSourceListeners = this.getData("dragSourceListeners");
        if (dragSourceListeners === undefined) {
            dragSourceListeners = [];
            this.setData("dragSourceListeners", dragSourceListeners);
        }
        return dragSourceListeners;
    };
    JSComponent.prototype.getJSDragSourceListeners = function () {
        var jsDragSourceListeners = this.getData("jsDragSourceListeners");
        if (jsDragSourceListeners === undefined) {
            jsDragSourceListeners = [];
            this.setData("jsDragSourceListeners", jsDragSourceListeners);
        }
        return jsDragSourceListeners;
    };
    JSComponent.prototype.addDragSourceListener = function (dragSourceListener, useCapture) {
        this.setDragEnabled(true);
        var dragSourceListeners = this.getDragSourceListeners();
        dragSourceListeners.push(dragSourceListener);
        var jsDragSourceListener = new JSDragSourceListener(dragSourceListener);
        var jsDragSourceListeners = this.getJSDragSourceListeners();
        jsDragSourceListeners.push(jsDragSourceListener);
        var mouseListener = this.getData("dragSourceListener" + !!useCapture);
        if (!mouseListener) {
            mouseListener = {
                mousePressed: function (mouseEvent, source) {
                    JSBody.getInstance().setDragSource(source);
                    mouseEvent.stopPropagation();
                }
            };
            this.addMouseListener(mouseListener, !!useCapture).withParameters(this);
            this.setData("dragSourceListener" + !!useCapture, mouseListener);
        }
        return jsDragSourceListener.withParameters(this);
    };
    JSComponent.prototype.removeDragSourceListener = function (dragSourceListener) {
        var dragSourceListeners = this.getDragSourceListeners();
        var index = dragSourceListeners.indexOf(dragSourceListener);
        if (index !== -1) {
            var jsDragSourceListeners = this.getJSDragSourceListeners();
            dragSourceListeners.splice(index, 1);
            jsDragSourceListeners.splice(index, 1);
        }
        if (!dragSourceListeners.length) {
            this.setDragEnabled(false);
        }
    };
    JSComponent.prototype.fireDragStart = function (mouseEvent) {
        var jsDragSourceListeners = this.getJSDragSourceListeners();
        for (var i = 0; i < jsDragSourceListeners.length; i++) {
            var jsDragSourceListener = jsDragSourceListeners[i];
            if (jsDragSourceListener.dragStart) {
                jsDragSourceListener.dragStart(mouseEvent);
            }
        }
    };
    JSComponent.prototype.fireDrag = function (mouseEvent) {
        var jsDragSourceListeners = this.getJSDragSourceListeners();
        for (var i = 0; i < jsDragSourceListeners.length; i++) {
            var jsDragSourceListener = jsDragSourceListeners[i];
            if (jsDragSourceListener.drag) {
                jsDragSourceListener.drag(mouseEvent);
            }
        }
    };
    JSComponent.prototype.fireDragEnd = function (mouseEvent) {
        var jsDragSourceListeners = this.getJSDragSourceListeners();
        for (var i = 0; i < jsDragSourceListeners.length; i++) {
            var jsDragSourceListener = jsDragSourceListeners[i];
            if (jsDragSourceListener.dragEnd) {
                jsDragSourceListener.dragEnd(mouseEvent);
            }
        }
    };
    JSComponent.prototype.getDropTargetListeners = function () {
        var dropTargetListeners = this.getData("dropTargetListeners");
        if (dropTargetListeners === undefined) {
            dropTargetListeners = [];
            this.setData("dropTargetListeners", dropTargetListeners);
        }
        return dropTargetListeners;
    };
    JSComponent.prototype.getJSDropTargetListeners = function () {
        var jsDropTargetListeners = this.getData("jsDropTargetListeners");
        if (jsDropTargetListeners === undefined) {
            jsDropTargetListeners = [];
            this.setData("jsDropTargetListeners", jsDropTargetListeners);
        }
        return jsDropTargetListeners;
    };
    JSComponent.prototype.addDropTargetListener = function (dropTargetListener, useCapture) {
        var dropTargetListeners = this.getDropTargetListeners();
        dropTargetListeners.push(dropTargetListener);
        var jsDropTargetListener = new JSDropTargetListener(dropTargetListener);
        var jsDropTargetListeners = this.getJSDropTargetListeners();
        jsDropTargetListeners.push(jsDropTargetListener);
        var mouseListener = this.getData("dropTargetListener" + !!useCapture);
        if (!mouseListener) {
            mouseListener = {
                mouseEntered: function (mouseEvent, source) {
                    var dragSource = JSBody.getInstance().getDragSource();
                    if (dragSource && dragSource.isDragEnabled()) {
                        var dragStart = dragSource.getData("dragStart");
                        if (dragStart) {
                            source.fireDragEnter(mouseEvent);
                        }
                    }
                    mouseEvent.stopPropagation();
                },
                mouseMoved: function (mouseEvent, source) {
                    var dragSource = JSBody.getInstance().getDragSource();
                    if (dragSource && dragSource.isDragEnabled()) {
                        var dragStart = dragSource.getData("dragStart");
                        if (dragStart) {
                            source.fireDragOver(mouseEvent);
                        }
                    }
                    mouseEvent.stopPropagation();
                },
                mouseExited: function (mouseEvent, source) {
                    var dragSource = JSBody.getInstance().getDragSource();
                    if (dragSource && dragSource.isDragEnabled()) {
                        var dragStart = dragSource.getData("dragStart");
                        if (dragStart) {
                            source.fireDragLeave(mouseEvent);
                        }
                    }
                    mouseEvent.stopPropagation();
                },
                mouseReleased: function (mouseEvent, source) {
                    var dragSource = JSBody.getInstance().getDragSource();
                    if (dragSource && dragSource.isDragEnabled()) {
                        var dragStart = dragSource.getData("dragStart");
                        if (dragStart) {
                            source.fireDrop(mouseEvent);
                        }
                    }
                    mouseEvent.stopPropagation();
                }
            };
            this.addMouseListener(mouseListener, !!useCapture).withParameters(this);
            this.setData("dropTargetListener" + !!useCapture, mouseListener);
        }
        return jsDropTargetListener.withParameters(this);
    };
    JSComponent.prototype.removeDropTargetListener = function (dropTargetListener) {
        var dropTargetListeners = this.getDropTargetListeners();
        var index = dropTargetListeners.indexOf(dropTargetListener);
        if (index !== -1) {
            var jsDropTargetListeners = this.getJSDropTargetListeners();
            dropTargetListeners.splice(index, 1);
            jsDropTargetListeners.splice(index, 1);
        }
    };
    JSComponent.prototype.fireDragEnter = function (mouseEvent) {
        var jsDropTargetListeners = this.getJSDropTargetListeners();
        for (var i = 0; i < jsDropTargetListeners.length; i++) {
            var jsDropTargetListener = jsDropTargetListeners[i];
            if (jsDropTargetListener.dragEnter) {
                jsDropTargetListener.dragEnter(mouseEvent, this);
            }
        }
    };
    JSComponent.prototype.fireDragOver = function (mouseEvent) {
        var jsDropTargetListeners = this.getJSDropTargetListeners();
        for (var i = 0; i < jsDropTargetListeners.length; i++) {
            var jsDropTargetListener = jsDropTargetListeners[i];
            if (jsDropTargetListener.dragOver) {
                jsDropTargetListener.dragOver(mouseEvent, this);
            }
        }
    };
    JSComponent.prototype.fireDragLeave = function (mouseEvent) {
        var jsDropTargetListeners = this.getJSDropTargetListeners();
        for (var i = 0; i < jsDropTargetListeners.length; i++) {
            var jsDropTargetListener = jsDropTargetListeners[i];
            if (jsDropTargetListener.dragLeave) {
                jsDropTargetListener.dragLeave(mouseEvent, this);
            }
        }
    };
    JSComponent.prototype.fireDrop = function (mouseEvent) {
        var jsDropTargetListeners = this.getJSDropTargetListeners();
        for (var i = 0; i < jsDropTargetListeners.length; i++) {
            var jsDropTargetListener = jsDropTargetListeners[i];
            if (jsDropTargetListener.drop) {
                jsDropTargetListener.drop(mouseEvent, this);
            }
        }
    };
    JSComponent.prototype.getAdjustmentListeners = function () {
        var adjustmentListeners = this.getData("adjustmentListeners");
        if (adjustmentListeners === undefined) {
            adjustmentListeners = [];
            this.setData("adjustmentListeners", adjustmentListeners);
        }
        return adjustmentListeners;
    };
    JSComponent.prototype.getJSAdjustmentListeners = function () {
        var jsAdjustmentListeners = this.getData("jsAdjustmentListeners");
        if (jsAdjustmentListeners === undefined) {
            jsAdjustmentListeners = [];
            this.setData("jsAdjustmentListeners", jsAdjustmentListeners);
        }
        return jsAdjustmentListeners;
    };
    JSComponent.prototype.addAdjustmentListener = function (adjustmentListener, useCapture) {
        var adjustmentListeners = this.getAdjustmentListeners();
        adjustmentListeners.push(adjustmentListener);
        var jsAdjustmentListener = new JSAdjustmentListener(adjustmentListener);
        var jsAdjustmentListeners = this.getJSAdjustmentListeners();
        jsAdjustmentListeners.push(jsAdjustmentListener);
        this.element.addEventListener("scroll", jsAdjustmentListener.adjustmentValueChanged, !!useCapture);
        return jsAdjustmentListener.withParameters(this);
    };
    JSComponent.prototype.removeAdjustmentListener = function (adjustmentListener, useCapture) {
        var adjustmentListeners = this.getAdjustmentListeners();
        var index = adjustmentListeners.indexOf(adjustmentListener);
        if (index !== -1) {
            var jsAdjustmentListeners = this.getJSAdjustmentListeners();
            var jsAdjustmentListener = jsAdjustmentListeners[index];
            this.element.removeEventListener("scroll", jsAdjustmentListener.adjustmentValueChanged, !!useCapture);
            adjustmentListeners.splice(index, 1);
            jsAdjustmentListeners.splice(index, 1);
        }
    };
    JSComponent.prototype.getChangeListeners = function () {
        var changeListeners = this.getData("changeListeners");
        if (changeListeners === undefined) {
            changeListeners = [];
            this.setData("changeListeners", changeListeners);
        }
        return changeListeners;
    };
    JSComponent.prototype.getJSChangeListeners = function () {
        var jsChangeListeners = this.getData("jsChangeListeners");
        if (jsChangeListeners === undefined) {
            jsChangeListeners = [];
            this.setData("jsChangeListeners", jsChangeListeners);
        }
        return jsChangeListeners;
    };
    JSComponent.prototype.addChangeListener = function (changeListener, useCapture) {
        var changeListeners = this.getChangeListeners();
        changeListeners.push(changeListener);
        var jsChangeListener = new JSChangeListener(changeListener);
        var jsChangeListeners = this.getJSChangeListeners();
        jsChangeListeners.push(jsChangeListener);
        this.element.addEventListener("change", jsChangeListener.stateChanged, !!useCapture);
        return jsChangeListener.withParameters(this);
    };
    JSComponent.prototype.removeChangeListener = function (changeListener, useCapture) {
        var changeListeners = this.getChangeListeners();
        var index = changeListeners.indexOf(changeListener);
        if (index !== -1) {
            var jsChangeListeners = this.getJSChangeListeners();
            var jsChangeListener = jsChangeListeners[index];
            this.element.removeEventListener("change", jsChangeListener.stateChanged, !!useCapture);
            changeListeners.splice(index, 1);
            jsChangeListeners.splice(index, 1);
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
        return 0;
    };
    JSLayout.prototype.preferredLayoutHeight = function (container) {
        return 0;
    };
    JSLayout.prototype.layoutContainer = function (container) {
    };
    JSLayout.NORTH = "north";
    JSLayout.SOUTH = "south";
    JSLayout.WEST = "west";
    JSLayout.EAST = "east";
    JSLayout.CENTER = "center";
    JSLayout.TOP = "top";
    JSLayout.LEFT = "left";
    JSLayout.BOTTOM = "bottom";
    JSLayout.RIGHT = "right";
    JSLayout.LEFT_RIGHT = "left_right";
    JSLayout.HORIZONTAL = "horizontal";
    JSLayout.VERTICAL = "vertical";
    JSLayout.BOTH = "both";
    JSLayout.NONE = "none";
    JSLayout.NORTHWEST = "northwest";
    JSLayout.NORTHEAST = "northeast";
    JSLayout.SOUTHWEST = "southwest";
    JSLayout.SOUTHEAST = "southeast";
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
    JSHTMLComponent.prototype.getWidth = function () {
        var width = _super.prototype.getWidth.call(this);
        if (width !== undefined) {
            return width;
        }
        return this.element.getBoundingClientRect().width - this.getBorderLeftWidth() - this.getPaddingLeft() - this.getPaddingRight() - this.getBorderRightWidth();
    };
    JSHTMLComponent.prototype.getHeight = function () {
        var height = _super.prototype.getHeight.call(this);
        if (height !== undefined) {
            return height;
        }
        return this.element.getBoundingClientRect().height - this.getBorderTopWidth() - this.getPaddingTop() - this.getPaddingBottom() - this.getBorderBottomWidth();
    };
    JSHTMLComponent.prototype.getOuterWidth = function () {
        return this.getWidth() +
            this.getMarginLeft() + this.getBorderLeftWidth() + this.getPaddingLeft() +
            this.getPaddingRight() + this.getBorderRightWidth() + this.getMarginRight();
    };
    JSHTMLComponent.prototype.getOuterHeight = function () {
        return this.getHeight() +
            this.getMarginTop() + this.getBorderTopWidth() + this.getPaddingTop() +
            this.getPaddingBottom() + this.getBorderBottomWidth() + this.getMarginBottom();
    };
    JSHTMLComponent.prototype.setX = function (x) {
        _super.prototype.setX.call(this, x);
        this.setStyle("left", x + "px");
    };
    JSHTMLComponent.prototype.setY = function (y) {
        _super.prototype.setY.call(this, y);
        this.setStyle("top", y + "px");
    };
    JSHTMLComponent.prototype.setWidth = function (width) {
        _super.prototype.setWidth.call(this, width);
        this.setStyle("width", width + "px");
    };
    JSHTMLComponent.prototype.setOuterWidth = function (outerWidth) {
        this.setWidth(outerWidth - this.getMarginLeft() - this.getBorderLeftWidth() - this.getPaddingLeft() -
            this.getPaddingRight() - this.getBorderRightWidth() - this.getMarginRight());
    };
    JSHTMLComponent.prototype.setHeight = function (height) {
        _super.prototype.setHeight.call(this, height);
        this.setStyle("height", height + "px");
    };
    JSHTMLComponent.prototype.setOuterHeight = function (outerHeight) {
        this.setHeight(outerHeight - this.getMarginTop() - this.getBorderTopWidth() - this.getPaddingTop() -
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
    JSHTMLComponent.prototype.setDisplayable = function (displayable) {
        if (!displayable) {
            this.setStyle("display", "none");
        }
    };
    JSHTMLComponent.prototype.getPreferredWidth = function () {
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
        var width = this.element.getBoundingClientRect().width - this.getBorderLeftWidth() - this.getPaddingLeft() - this.getPaddingRight() - this.getBorderRightWidth();
        if (cssWidth) {
            this.setStyle("width", cssWidth);
        }
        return width;
    };
    JSHTMLComponent.prototype.getPreferredHeight = function () {
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
        var height = this.element.getBoundingClientRect().height - this.getBorderTopWidth() - this.getPaddingTop() - this.getPaddingBottom() - this.getBorderBottomWidth();
        if (cssHeight) {
            this.setStyle("height", cssHeight);
        }
        return height;
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
    JSSVGComponent.prototype.getWidth = function () {
        var width = _super.prototype.getWidth.call(this);
        if (width !== undefined) {
            return width;
        }
        return this.element.getBoundingClientRect().width;
    };
    JSSVGComponent.prototype.getHeight = function () {
        var height = _super.prototype.getHeight.call(this);
        if (height !== undefined) {
            return height;
        }
        return this.element.getBoundingClientRect().height;
    };
    JSSVGComponent.prototype.setX = function (x) {
        _super.prototype.setX.call(this, x);
        this.setAttribute("x", x + "");
    };
    JSSVGComponent.prototype.setY = function (y) {
        _super.prototype.setY.call(this, y);
        this.setAttribute("y", y + "");
    };
    JSSVGComponent.prototype.setWidth = function (width) {
        _super.prototype.setWidth.call(this, width);
        this.setAttribute("width", width + "px");
    };
    JSSVGComponent.prototype.setOuterWidth = function (outerWidth) {
        this.setWidth(outerWidth - this.getMarginLeft() - this.getBorderLeftWidth() - this.getPaddingLeft() -
            this.getPaddingRight() - this.getBorderRightWidth() - this.getMarginRight());
    };
    JSSVGComponent.prototype.setHeight = function (height) {
        _super.prototype.setHeight.call(this, height);
        this.setAttribute("height", height + "px");
    };
    JSSVGComponent.prototype.setOuterHeight = function (outerHeight) {
        this.setHeight(outerHeight - this.getMarginTop() - this.getBorderTopWidth() - this.getPaddingTop() -
            this.getPaddingBottom() - this.getBorderBottomWidth() - this.getMarginBottom());
    };
    JSSVGComponent.prototype.getPreferredWidth = function () {
        var preferredWidth = this.getAttribute("data-preferred-width");
        if (preferredWidth) {
            return +preferredWidth;
        }
        var layout = this.getLayout();
        if (layout) {
            return layout.preferredLayoutWidth(this);
        }
        var widthAttribute = this.getAttribute("width");
        if (widthAttribute) {
            this.removeAttribute("width");
        }
        var width = this.element.getBoundingClientRect().width - this.getBorderLeftWidth() - this.getPaddingLeft() - this.getPaddingRight() - this.getBorderRightWidth();
        if (widthAttribute) {
            this.setAttribute("width", widthAttribute);
        }
        return width;
    };
    JSSVGComponent.prototype.getPreferredHeight = function () {
        var preferredHeight = this.getAttribute("data-preferred-height");
        if (preferredHeight) {
            return +preferredHeight;
        }
        var layout = this.getLayout();
        if (layout) {
            return layout.preferredLayoutHeight(this);
        }
        var heightAttribute = this.getAttribute("height");
        if (heightAttribute) {
            this.removeAttribute("height");
        }
        var height = this.element.getBoundingClientRect().height - this.getBorderTopWidth() - this.getPaddingTop() - this.getPaddingBottom() - this.getBorderBottomWidth();
        if (heightAttribute) {
            this.setAttribute("height", heightAttribute);
        }
        return height;
    };
    JSSVGComponent.prototype.getPreferredOuterWidth = function () {
        return this.getPreferredWidth();
    };
    JSSVGComponent.prototype.getPreferredOuterHeight = function () {
        return this.getPreferredHeight();
    };
    JSSVGComponent.prototype.getFill = function () {
        return this.getAttribute("fill");
    };
    JSSVGComponent.prototype.setFill = function (fill) {
        this.setAttribute("fill", fill);
    };
    JSSVGComponent.prototype.getStroke = function () {
        return this.getAttribute("stroke");
    };
    JSSVGComponent.prototype.setStroke = function (stroke) {
        this.setAttribute("stroke", stroke);
    };
    JSSVGComponent.prototype.getOpacity = function () {
        return +this.getAttribute("opacity");
    };
    JSSVGComponent.prototype.setOpacity = function (opacity) {
        this.setAttribute("opacity", "" + opacity);
    };
    return JSSVGComponent;
}(JSComponent));
var JSSVG = (function (_super) {
    __extends(JSSVG, _super);
    function JSSVG() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof SVGSVGElement) ? document.createElementNS("http://www.w3.org/2000/svg", "svg") : args[0]) || this;
        switch (args.length) {
            case 2:
                if (typeof args[0] === "number" && typeof args[1] === "number") {
                    var width = args[0];
                    var height = args[1];
                    _this.setWidth(width);
                    _this.setHeight(height);
                }
                break;
            default:
        }
        return _this;
    }
    JSSVG.prototype.init = function () {
        this.addClass("JSSVG");
    };
    JSSVG.prototype.setX = function (x) {
        this.setStyle("left", x + "px");
    };
    JSSVG.prototype.setY = function (y) {
        this.setStyle("top", y + "px");
    };
    JSSVG.prototype.getViewBox = function () {
        return this.getAttribute("viewBox");
    };
    JSSVG.prototype.setViewBox = function (viewBox) {
        this.setAttribute("viewBox", viewBox);
    };
    return JSSVG;
}(JSSVGComponent));
var JSIcon = (function () {
    function JSIcon() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        switch (args.length) {
            case 2:
                if (typeof args[0] === "number" && typeof args[1] === "number") {
                    var iconWidth = args[0];
                    var iconHeight = args[1];
                    this.setIconWidth(iconWidth);
                    this.setIconHeight(iconHeight);
                }
                break;
            default:
        }
    }
    JSIcon.prototype.getIconWidth = function () {
        return this.iconWidth;
    };
    JSIcon.prototype.setIconWidth = function (iconWidth) {
        this.iconWidth = iconWidth;
    };
    JSIcon.prototype.getIconHeight = function () {
        return this.iconHeight;
    };
    JSIcon.prototype.setIconHeight = function (iconHeight) {
        this.iconHeight = iconHeight;
    };
    JSIcon.prototype.paintIcon = function (component, graphics) {
    };
    return JSIcon;
}());
var JSImageIcon = (function (_super) {
    __extends(JSImageIcon, _super);
    function JSImageIcon() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        switch (args.length) {
            case 1:
                if (typeof args[0] === "string") {
                    var source = args[0];
                    _this.setSource(source);
                }
                break;
            case 3:
                if (typeof args[0] === "string" && typeof args[1] === "number" && typeof args[2] === "number") {
                    var source = args[0];
                    var iconWidth = args[1];
                    var iconHeight = args[2];
                    _this.setSource(source);
                    _this.setIconWidth(iconWidth);
                    _this.setIconHeight(iconHeight);
                }
                break;
            default:
        }
        return _this;
    }
    JSImageIcon.prototype.getSource = function () {
        return this.source;
    };
    JSImageIcon.prototype.setSource = function (source) {
        this.source = source;
    };
    JSImageIcon.prototype.paintIcon = function (component, graphics) {
        var source = this.getSource();
        var iconWidth = this.getIconWidth();
        var iconHeight = this.getIconHeight();
        var image = new JSImage(source, iconWidth, iconHeight);
        graphics.removeAll();
        graphics.add(image);
    };
    return JSImageIcon;
}(JSIcon));
var JSPathIcon = (function (_super) {
    __extends(JSPathIcon, _super);
    function JSPathIcon() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        switch (args.length) {
            case 1:
                if (typeof args[0] === "string") {
                    var source = args[0];
                    _this.setSource(source);
                }
                break;
            case 3:
                if (typeof args[0] === "string" && typeof args[1] === "number" && typeof args[2] === "number") {
                    var source = args[0];
                    var iconWidth = args[1];
                    var iconHeight = args[2];
                    _this.setSource(source);
                    _this.setIconWidth(iconWidth);
                    _this.setIconHeight(iconHeight);
                }
                break;
            case 4:
                if (typeof args[0] === "string" && typeof args[1] === "string" && typeof args[2] === "number" && typeof args[3] === "number") {
                    var viewBox = args[0];
                    var source = args[1];
                    var iconWidth = args[2];
                    var iconHeight = args[3];
                    _this.setViewBox(viewBox);
                    _this.setSource(source);
                    _this.setIconWidth(iconWidth);
                    _this.setIconHeight(iconHeight);
                }
                break;
            default:
        }
        return _this;
    }
    JSPathIcon.prototype.getViewBox = function () {
        return this.viewBox;
    };
    JSPathIcon.prototype.setViewBox = function (viewBox) {
        this.viewBox = viewBox;
    };
    JSPathIcon.prototype.withViewBox = function (viewBox) {
        this.setViewBox(viewBox);
        return this;
    };
    JSPathIcon.prototype.getFill = function () {
        return this.fill;
    };
    JSPathIcon.prototype.setFill = function (fill) {
        this.fill = fill;
    };
    JSPathIcon.prototype.withFill = function (fill) {
        this.setFill(fill);
        return this;
    };
    JSPathIcon.prototype.getStroke = function () {
        return this.stroke;
    };
    JSPathIcon.prototype.setStroke = function (stroke) {
        this.stroke = stroke;
    };
    JSPathIcon.prototype.withStroke = function (stroke) {
        this.setStroke(stroke);
        return this;
    };
    JSPathIcon.prototype.paintIcon = function (component, graphics) {
        var source = this.getSource();
        var iconWidth = this.getIconWidth();
        var iconHeight = this.getIconHeight();
        var image = new JSPathImage(source, iconWidth, iconHeight);
        var fill = this.getFill();
        if (fill !== undefined) {
            image.setFill(fill);
        }
        var stroke = this.getStroke();
        if (stroke !== undefined) {
            image.setStroke(stroke);
        }
        var viewBox = this.getViewBox();
        if (viewBox !== undefined) {
            image.setViewBox(viewBox);
        }
        graphics.removeAll();
        graphics.add(image);
    };
    return JSPathIcon;
}(JSImageIcon));
var JSPanel = (function (_super) {
    __extends(JSPanel, _super);
    function JSPanel() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
        switch (args.length) {
            case 1:
                if (args[0] instanceof JSLayout) {
                    var layout = args[0];
                    _this.setLayout(layout);
                }
                break;
            default:
        }
        return _this;
    }
    JSPanel.prototype.init = function () {
        this.addClass("JSPanel");
    };
    return JSPanel;
}(JSHTMLComponent));
var JSAction = (function () {
    function JSAction() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        switch (args.length) {
            case 1:
                if (args[0] instanceof JSIcon) {
                    var icon = args[0];
                    this.setIcon(icon);
                }
                else if (typeof args[0] === "string") {
                    var name = args[0];
                    this.setName(name);
                }
                break;
            case 2:
                if (typeof args[0] === "string" && args[1] instanceof JSIcon) {
                    var name = args[0];
                    var icon = args[1];
                    this.setName(name);
                    this.setIcon(icon);
                }
                break;
            default:
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
    JSAction.prototype.actionPerformed = function (mouseEvent) {
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
var JSActionListener = (function () {
    function JSActionListener(actionListener) {
        this.parameters = [];
        var jsActionListener = this;
        this.actionPerformed = function (mouseEvent) {
            var parameters = jsActionListener.getParameters().slice();
            parameters.unshift(mouseEvent);
            actionListener.actionPerformed.apply(actionListener, parameters);
        };
    }
    JSActionListener.prototype.getParameters = function () {
        return this.parameters;
    };
    JSActionListener.prototype.setParameters = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        this.parameters = parameters;
    };
    JSActionListener.prototype.withParameters = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        this.parameters = parameters;
        return this;
    };
    return JSActionListener;
}());
var JSAdjustmentListener = (function () {
    function JSAdjustmentListener(adjustmentListener) {
        this.parameters = [];
        var jsAdjustmentListener = this;
        this.adjustmentValueChanged = function (event) {
            var parameters = jsAdjustmentListener.getParameters().slice();
            parameters.unshift(event);
            adjustmentListener.adjustmentValueChanged.apply(adjustmentListener, parameters);
        };
    }
    JSAdjustmentListener.prototype.getParameters = function () {
        return this.parameters;
    };
    JSAdjustmentListener.prototype.setParameters = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        this.parameters = parameters;
    };
    JSAdjustmentListener.prototype.withParameters = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        this.parameters = parameters;
        return this;
    };
    return JSAdjustmentListener;
}());
var JSBody = (function (_super) {
    __extends(JSBody, _super);
    function JSBody() {
        var _this = _super.call(this, document.body) || this;
        _this.setLayout(new JSBorderLayout());
        var svg = _this.getSVG();
        _this.add(svg, JSBorderLayout.NORTH);
        var defs = _this.getDefs();
        svg.add(defs);
        var popupMenuContainer = _this.getPopupMenuContainer();
        _this.add(popupMenuContainer, JSBorderLayout.NORTH);
        var dragImageContainer = _this.getDragImageContainer();
        _this.add(dragImageContainer, JSBorderLayout.NORTH);
        _this.addMouseListener(_this, true);
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
    };
    JSBody.prototype.setContentPane = function (contentPane) {
        var oldContentPane = this.getData("contentPane");
        if (oldContentPane) {
            this.remove(oldContentPane);
        }
        if (contentPane) {
            this.add(contentPane);
        }
        this.setData("contentPane", contentPane);
    };
    JSBody.prototype.getSVG = function () {
        var svg = this.getData("svg");
        if (!svg) {
            svg = new JSSVG();
            svg.setWidth(0);
            svg.setHeight(0);
            this.setData("svg", svg);
        }
        return svg;
    };
    JSBody.prototype.getDefs = function () {
        var defs = this.getData("defs");
        if (!defs) {
            defs = new JSDefs();
            this.setData("defs", defs);
        }
        return defs;
    };
    JSBody.prototype.getPopupMenuContainer = function () {
        var popupMenuContainer = this.getData("popupMenuContainer");
        if (!popupMenuContainer) {
            popupMenuContainer = new JSPanel();
            this.setData("popupMenuContainer", popupMenuContainer);
        }
        return popupMenuContainer;
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
                popupMenu.validate();
            }
        }
        this.popupMenu = popupMenu;
    };
    JSBody.prototype.getDragImageContainer = function () {
        var dragImageContainer = this.getData("dragImageContainer");
        if (!dragImageContainer) {
            dragImageContainer = new JSPanel();
            dragImageContainer.setVisible(false);
            this.setData("dragImageContainer", dragImageContainer);
        }
        return dragImageContainer;
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
    JSBody.prototype.getDragSource = function () {
        return this.dragSource;
    };
    JSBody.prototype.setDragSource = function (dragSource) {
        this.dragSource = dragSource;
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
                this.add(fileChooser, JSBorderLayout.SOUTH);
            }
        }
        this.fileChooser = fileChooser;
    };
    JSBody.prototype.getTimer = function () {
        var timer = this.getData("timer");
        if (!timer) {
            timer = new JSTimer();
            this.setData("timer", timer);
        }
        return timer;
    };
    JSBody.prototype.mouseMoved = function (mouseEvent) {
        var dragSource = this.getDragSource();
        if (dragSource) {
            var dragStart = dragSource.getData("dragStart");
            if (!dragStart) {
                dragSource.fireDragStart(mouseEvent);
                dragSource.setData("dragStart", true);
            }
            dragSource.fireDrag(mouseEvent);
            dragSource.fireMouseDragged(mouseEvent);
        }
    };
    JSBody.prototype.mouseReleased = function (mouseEvent) {
        var dragSource = this.getDragSource();
        if (dragSource) {
            var timer = this.getTimer();
            timer.schedule({
                run: function () {
                    var dragStart = dragSource.getData("dragStart");
                    if (dragStart) {
                        dragSource.fireDragEnd(mouseEvent);
                        dragSource.setData("dragStart", false);
                    }
                    JSBody.getInstance().setDragSource(null);
                }
            }, 0);
        }
    };
    return JSBody;
}(JSHTMLComponent));
var JSBorderLayout = (function (_super) {
    __extends(JSBorderLayout, _super);
    function JSBorderLayout() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.hgap = 0;
        _this.vgap = 0;
        switch (args.length) {
            case 2:
                if (typeof args[0] === "number" && typeof args[1] === "number") {
                    var hgap = args[0];
                    var vgap = args[1];
                    _this.setHgap(hgap);
                    _this.setVgap(vgap);
                }
                break;
            default:
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
    JSBorderLayout.prototype.addLayoutComponent = function (component) {
        component.setStyle("position", "absolute");
    };
    JSBorderLayout.prototype.preferredLayoutWidth = function (container) {
        var preferredLayoutWidth = 0;
        var hgap = this.getHgap();
        var components = container.getComponents();
        for (var i = components.length - 1; i >= 0; i--) {
            var component = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var constraints = component.getConstraints();
            if (!constraints || constraints === JSLayout.CENTER) {
                var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                preferredLayoutWidth = Math.max(preferredLayoutWidth, componentPreferredOuterWidth + hgap);
            }
        }
        for (var i = components.length - 1; i >= 0; i--) {
            var component = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var constraints = component.getConstraints();
            if (!constraints || constraints === JSLayout.CENTER) {
                continue;
            }
            var componentPreferredOuterWidth = component.getPreferredOuterWidth();
            switch (constraints) {
                case JSBorderLayout.WEST:
                case JSBorderLayout.EAST:
                    preferredLayoutWidth += componentPreferredOuterWidth + hgap;
                    break;
                case JSBorderLayout.NORTH:
                case JSBorderLayout.SOUTH:
                    preferredLayoutWidth = Math.max(preferredLayoutWidth, componentPreferredOuterWidth + hgap);
                    break;
                default:
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
        var components = container.getComponents();
        for (var i = components.length - 1; i >= 0; i--) {
            var component = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var constraints = component.getConstraints();
            if (!constraints || constraints === JSLayout.CENTER) {
                var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                preferredLayoutHeight = Math.max(preferredLayoutHeight, componentPreferredOuterHeight + vgap);
            }
        }
        for (var i = components.length - 1; i >= 0; i--) {
            var component = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var constraints = component.getConstraints();
            if (!constraints || constraints === JSLayout.CENTER) {
                continue;
            }
            var componentPreferredOuterHeight = component.getPreferredOuterHeight();
            switch (constraints) {
                case JSBorderLayout.NORTH:
                case JSBorderLayout.SOUTH:
                    preferredLayoutHeight += componentPreferredOuterHeight + vgap;
                    break;
                case JSBorderLayout.EAST:
                case JSBorderLayout.WEST:
                    preferredLayoutHeight = Math.max(preferredLayoutHeight, componentPreferredOuterHeight + vgap);
                    break;
                default:
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
        var width = container.getWidth();
        var height = container.getHeight();
        var width100 = width + container.getPaddingLeft() + container.getPaddingRight();
        var height100 = height + container.getPaddingTop() + container.getPaddingBottom();
        var x = container.getInsetLeft();
        var y = container.getInsetTop();
        var components = container.getComponents().slice();
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var constraints = component.getConstraints();
            if (!constraints || constraints === JSLayout.CENTER) {
                continue;
            }
            var align = component.getAlign();
            switch (constraints) {
                case JSBorderLayout.NORTH:
                    switch (align) {
                        case JSLayout.LEFT:
                            var componentOuterWidth = component.getPreferredOuterWidth();
                            component.setOuterWidth(componentOuterWidth);
                            component.setX(x);
                            break;
                        case JSLayout.RIGHT:
                            var componentOuterWidth = component.getPreferredOuterWidth();
                            component.setOuterWidth(componentOuterWidth);
                            component.setX(x + width - componentOuterWidth);
                            break;
                        case JSLayout.CENTER:
                            var componentOuterWidth = component.getPreferredOuterWidth();
                            component.setOuterWidth(componentOuterWidth);
                            component.setX(x + (width - componentOuterWidth) / 2);
                            break;
                        default:
                            component.setOuterWidth(width);
                            component.setX(x);
                    }
                    var componentOuterHeight = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentOuterHeight);
                    component.setY(y);
                    height -= componentOuterHeight + vgap;
                    y += componentOuterHeight + vgap;
                    break;
                case JSBorderLayout.SOUTH:
                    switch (align) {
                        case JSLayout.LEFT:
                            var componentOuterWidth = component.getPreferredOuterWidth();
                            component.setOuterWidth(componentOuterWidth);
                            component.setX(x);
                            break;
                        case JSLayout.RIGHT:
                            var componentOuterWidth = component.getPreferredOuterWidth();
                            component.setOuterWidth(componentOuterWidth);
                            component.setX(x + width - componentOuterWidth);
                            break;
                        case JSLayout.CENTER:
                            var componentOuterWidth = component.getPreferredOuterWidth();
                            component.setOuterWidth(componentOuterWidth);
                            component.setX(x + (width - componentOuterWidth) / 2);
                            break;
                        default:
                            component.setOuterWidth(width);
                            component.setX(x);
                    }
                    var componentOuterHeight = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentOuterHeight);
                    component.setY(y + height - componentOuterHeight);
                    height -= componentOuterHeight + vgap;
                    break;
                case JSBorderLayout.WEST:
                    switch (align) {
                        case JSLayout.TOP:
                            var componentOuterHeight = component.getPreferredOuterHeight();
                            component.setOuterHeight(componentOuterHeight);
                            component.setY(y);
                            break;
                        case JSLayout.BOTTOM:
                            var componentOuterHeight = component.getPreferredOuterHeight();
                            component.setOuterHeight(componentOuterHeight);
                            component.setY(y + height - componentOuterHeight);
                            break;
                        case JSLayout.CENTER:
                            var componentOuterHeight = component.getPreferredOuterHeight();
                            component.setOuterHeight(componentOuterHeight);
                            component.setY(y + (height - componentOuterHeight) / 2);
                            break;
                        default:
                            component.setOuterHeight(height);
                            component.setY(y);
                    }
                    var componentOuterWidth = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentOuterWidth);
                    component.setX(x);
                    width -= componentOuterWidth + hgap;
                    x += componentOuterWidth + hgap;
                    break;
                case JSBorderLayout.EAST:
                    switch (align) {
                        case JSLayout.TOP:
                            var componentOuterHeight = component.getPreferredOuterHeight();
                            component.setOuterHeight(componentOuterHeight);
                            component.setY(y);
                            break;
                        case JSLayout.BOTTOM:
                            var componentOuterHeight = component.getPreferredOuterHeight();
                            component.setOuterHeight(componentOuterHeight);
                            component.setY(y + height - componentOuterHeight);
                            break;
                        case JSLayout.CENTER:
                            var componentOuterHeight = component.getPreferredOuterHeight();
                            component.setOuterHeight(componentOuterHeight);
                            component.setY(y + (height - componentOuterHeight) / 2);
                            break;
                        default:
                            component.setOuterHeight(height);
                            component.setY(y);
                    }
                    var componentOuterWidth = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentOuterWidth);
                    component.setX(x + width - componentOuterWidth);
                    width -= componentOuterWidth + hgap;
                    break;
                default:
            }
        }
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var constraints = component.getConstraints();
            if (!constraints || constraints === JSLayout.CENTER) {
                var align = component.getAlign();
                switch (align) {
                    case JSLayout.TOP:
                        var componentOuterWidth = Math.min(component.getPreferredOuterWidth(), width);
                        component.setOuterWidth(componentOuterWidth);
                        component.setX(x + (width - componentOuterWidth) / 2);
                        var componentOuterHeight = Math.min(component.getPreferredOuterHeight(), height);
                        component.setOuterHeight(componentOuterHeight);
                        component.setY(y);
                        break;
                    case JSLayout.BOTTOM:
                        var componentOuterWidth = Math.min(component.getPreferredOuterWidth(), width);
                        component.setOuterWidth(componentOuterWidth);
                        component.setX(x + (width - componentOuterWidth) / 2);
                        var componentOuterHeight = Math.min(component.getPreferredOuterHeight(), height);
                        component.setOuterHeight(componentOuterHeight);
                        component.setY(y + height - componentOuterHeight);
                        break;
                    case JSLayout.LEFT:
                        var componentOuterWidth = Math.min(component.getPreferredOuterWidth(), width);
                        component.setOuterWidth(componentOuterWidth);
                        component.setX(x);
                        var componentOuterHeight = Math.min(component.getPreferredOuterHeight(), height);
                        component.setOuterHeight(componentOuterHeight);
                        component.setY(y + (height - componentOuterHeight) / 2);
                        break;
                    case JSLayout.RIGHT:
                        var componentOuterWidth = Math.min(component.getPreferredOuterWidth(), width);
                        component.setOuterWidth(componentOuterWidth);
                        component.setX(x + width - componentOuterWidth);
                        var componentOuterHeight = Math.min(component.getPreferredOuterHeight(), height);
                        component.setOuterHeight(componentOuterHeight);
                        component.setY(y + (height - componentOuterHeight) / 2);
                        break;
                    case JSLayout.LEFT_RIGHT:
                        component.setOuterWidth(width);
                        component.setX(x);
                        var componentOuterHeight = Math.min(component.getPreferredOuterHeight(), height);
                        component.setOuterHeight(componentOuterHeight);
                        component.setY(y + (height - componentOuterHeight) / 2);
                        break;
                    case JSLayout.CENTER:
                        var componentOuterWidth = Math.min(component.getPreferredOuterWidth(), width);
                        component.setOuterWidth(componentOuterWidth);
                        component.setX(x + (width - componentOuterWidth) / 2);
                        var componentOuterHeight = Math.min(component.getPreferredOuterHeight(), height);
                        component.setOuterHeight(componentOuterHeight);
                        component.setY(y + (height - componentOuterHeight) / 2);
                        break;
                    default:
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
    function JSButton() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLButtonElement) ? document.createElement("button") : args[0]) || this;
        var graphics = _this.getGraphics();
        _this.add(graphics);
        switch (args.length) {
            case 1:
                if (args[0] instanceof JSAction) {
                    var action = args[0];
                    _this.setAction(action);
                }
                else if (args[0] instanceof JSIcon) {
                    var icon = args[0];
                    _this.setIcon(icon);
                }
                else if (typeof args[0] === "string") {
                    var text = args[0];
                    _this.setText(text);
                }
                break;
            case 2:
                if (typeof args[0] === "string" && args[1] instanceof JSIcon) {
                    var text = args[0];
                    var icon = args[1];
                    _this.setText(text);
                    _this.setIcon(icon);
                }
                break;
            default:
        }
        return _this;
    }
    JSButton.prototype.init = function () {
        this.addClass("JSButton");
    };
    JSButton.prototype.setIcon = function (icon) {
        _super.prototype.setIcon.call(this, icon);
        if (icon) {
            var span = this.getData("span");
            if (span) {
                var text = span.getText();
                span.setStyle("margin-left", text ? "4px" : "0");
            }
        }
    };
    JSButton.prototype.getGraphics = function () {
        var graphics = this.getData("graphics");
        if (!graphics) {
            graphics = new JSGraphics();
            this.setData("graphics", graphics);
        }
        return graphics;
    };
    JSButton.prototype.getText = function () {
        var span = this.getSpan();
        return span.getText();
    };
    JSButton.prototype.setText = function (text) {
        var span = this.getSpan();
        span.setText(text);
        var icon = this.getIcon();
        if (icon) {
            span.setStyle("margin-left", text ? "4px" : "0");
        }
    };
    JSButton.prototype.getSpan = function () {
        var span = this.getData("span");
        if (!span) {
            span = new JSSpan();
            this.add(span);
            this.setData("span", span);
        }
        return span;
    };
    JSButton.prototype.isUndecorated = function () {
        return this.hasClass("undecorated");
    };
    JSButton.prototype.setUndecorated = function (undecorated) {
        if (undecorated) {
            this.addClass("undecorated");
        }
        else {
            this.removeClass("undecorated");
        }
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
        var width100 = width + container.getPaddingLeft() + container.getPaddingRight();
        var height100 = height + container.getPaddingTop() + container.getPaddingBottom();
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
    JSCardLayout.prototype.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        switch (args.length) {
            case 2:
                if (args[0] instanceof JSComponent && typeof args[1] === "number") {
                    var container = args[0];
                    var index = args[1];
                    this.setSelectedIndex(container, index);
                }
                else if (args[0] instanceof JSComponent && typeof args[1] === "string") {
                    var container = args[0];
                    var constraints = args[1];
                    var components = container.getComponents();
                    for (var i = 0; i < components.length; i++) {
                        var component = components[i];
                        var componentConstraints = component.getConstraints();
                        if (componentConstraints === constraints) {
                            this.setSelectedIndex(container, i);
                            break;
                        }
                    }
                }
                break;
            default:
        }
    };
    return JSCardLayout;
}(JSLayout));
var JSChangeListener = (function () {
    function JSChangeListener(changeListener) {
        this.parameters = [];
        var jsChangeListener = this;
        this.stateChanged = function (event) {
            var parameters = jsChangeListener.getParameters().slice();
            parameters.unshift(event);
            changeListener.stateChanged.apply(changeListener, parameters);
        };
    }
    JSChangeListener.prototype.getParameters = function () {
        return this.parameters;
    };
    JSChangeListener.prototype.setParameters = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        this.parameters = parameters;
    };
    JSChangeListener.prototype.withParameters = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        this.parameters = parameters;
        return this;
    };
    return JSChangeListener;
}());
var JSCheckBox = (function (_super) {
    __extends(JSCheckBox, _super);
    function JSCheckBox() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
        var checkBoxInput = _this.getCheckBoxInput();
        _this.add(checkBoxInput);
        var label = _this.getLabel();
        _this.add(label);
        switch (args.length) {
            case 1:
                if (args[0] instanceof JSAction) {
                    var action = args[0];
                    _this.setAction(action);
                }
                else if (args[0] instanceof JSIcon) {
                    var icon = args[0];
                    _this.setIcon(icon);
                }
                else if (typeof args[0] === "string") {
                    var text = args[0];
                    _this.setText(text);
                }
                break;
            case 2:
                if (args[0] instanceof JSIcon && typeof args[1] === "boolean") {
                    var icon = args[0];
                    var selected = args[1];
                    _this.setIcon(icon);
                    _this.setSelected(selected);
                }
                else if (typeof args[0] === "string" && typeof args[1] === "boolean") {
                    var text = args[0];
                    var selected = args[1];
                    _this.setText(text);
                    _this.setSelected(selected);
                }
                else if (typeof args[0] === "string" && args[1] instanceof JSIcon) {
                    var text = args[0];
                    var icon = args[1];
                    _this.setText(text);
                    _this.setIcon(icon);
                }
                break;
            case 3:
                if (typeof args[0] === "string" && args[1] instanceof JSIcon && typeof args[2] === "boolean") {
                    var text = args[0];
                    var icon = args[1];
                    var selected = args[2];
                    _this.setText(text);
                    _this.setIcon(icon);
                    _this.setSelected(selected);
                }
                break;
            default:
        }
        return _this;
    }
    JSCheckBox.prototype.init = function () {
        this.addClass("JSCheckBox");
    };
    JSCheckBox.prototype.getCheckBoxInput = function () {
        var checkBoxInput = this.getData("checkBoxInput");
        if (!checkBoxInput) {
            checkBoxInput = new JSCheckBoxInput();
            this.setData("checkBoxInput", checkBoxInput);
        }
        return checkBoxInput;
    };
    JSCheckBox.prototype.getLabel = function () {
        var label = this.getData("label");
        if (!label) {
            label = new JSLabel();
            this.setData("label", label);
        }
        return label;
    };
    JSCheckBox.prototype.getIcon = function () {
        var label = this.getLabel();
        return label.getIcon();
    };
    JSCheckBox.prototype.setIcon = function (icon) {
        var label = this.getLabel();
        label.setIcon(icon);
    };
    JSCheckBox.prototype.getText = function () {
        var label = this.getLabel();
        return label.getText();
    };
    JSCheckBox.prototype.setText = function (text) {
        var label = this.getLabel();
        label.setText(text);
    };
    JSCheckBox.prototype.isSelected = function () {
        var checkBoxInput = this.getCheckBoxInput();
        return checkBoxInput.isSelected();
    };
    JSCheckBox.prototype.setSelected = function (selected) {
        var checkBoxInput = this.getCheckBoxInput();
        checkBoxInput.setSelected(selected);
    };
    return JSCheckBox;
}(JSHTMLComponent));
var JSCheckBoxInput = (function (_super) {
    __extends(JSCheckBoxInput, _super);
    function JSCheckBoxInput() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLInputElement) ? document.createElement("input") : args[0]) || this;
        _this.setAttribute("type", "checkbox");
        switch (args.length) {
            case 1:
                if (typeof args[0] === "boolean") {
                    var selected = args[0];
                    _this.setAttribute("checked", "" + selected);
                }
                break;
            default:
        }
        return _this;
    }
    JSCheckBoxInput.prototype.init = function () {
        this.addClass("JSCheckBoxInput");
    };
    JSCheckBoxInput.prototype.setSelected = function (selected) {
        this.element.checked = selected;
    };
    JSCheckBoxInput.prototype.isSelected = function () {
        return this.element.checked;
    };
    return JSCheckBoxInput;
}(JSHTMLComponent));
var JSComboBox = (function (_super) {
    __extends(JSComboBox, _super);
    function JSComboBox() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLSelectElement) ? document.createElement("select") : args[0]) || this;
        switch (args.length) {
            case 1:
                if (args[0] instanceof Array) {
                    var items = args[0];
                    _this.setItems(items);
                }
                break;
            default:
        }
        return _this;
    }
    JSComboBox.prototype.init = function () {
        this.addClass("JSComboBox");
    };
    JSComboBox.prototype.getItems = function () {
        return this.getData("item");
    };
    JSComboBox.prototype.setItems = function (items) {
        this.setData("items", items);
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var option = new JSOption(item);
            this.add(option);
        }
    };
    JSComboBox.prototype.getSelectedIndex = function () {
        return this.element.selectedIndex;
    };
    JSComboBox.prototype.getSelectedItem = function () {
        var items = this.getItems();
        var selectedIndex = this.getSelectedIndex();
        return items[selectedIndex];
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
        return JSBody.getInstance().getDragImage();
    };
    JSDataTransfer.prototype.setDragImage = function (dragImage) {
        JSBody.getInstance().setDragImage(dragImage);
    };
    return JSDataTransfer;
}());
var JSDefs = (function (_super) {
    __extends(JSDefs, _super);
    function JSDefs() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.call(this, args.length === 0 || !(args[0] instanceof SVGDefsElement) ? document.createElementNS("http://www.w3.org/2000/svg", "defs") : args[0]) || this;
    }
    JSDefs.prototype.init = function () {
        this.addClass("JSDefs");
    };
    return JSDefs;
}(JSSVGComponent));
var JSDialog = (function (_super) {
    __extends(JSDialog, _super);
    function JSDialog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
        _this.setVisible(false);
        switch (args.length) {
            case 0:
                break;
            case 1:
                if (args[0] instanceof JSComponent) {
                    var owner = args[0];
                    _this.setOwner(owner);
                }
                break;
            case 2:
                if (args[0] instanceof JSComponent && typeof args[1] === "boolean") {
                    var owner = args[0];
                    var modal = args[1];
                    _this.setOwner(owner);
                    _this.setModal(modal);
                }
                else if (args[0] instanceof JSComponent && typeof args[1] === "string") {
                    var owner = args[0];
                    var title = args[1];
                    _this.setOwner(owner);
                    _this.setTitle(title);
                }
                break;
            case 3:
                if (args[0] instanceof JSComponent && typeof args[1] === "string" && typeof args[2] === "boolean") {
                    var owner = args[0];
                    var title = args[1];
                    var modal = args[2];
                    _this.setOwner(owner);
                    _this.setTitle(title);
                    _this.setModal(modal);
                }
                break;
            default:
        }
        _this.setZIndex(JSLayeredPane.MODAL_LAYER);
        return _this;
    }
    JSDialog.prototype.init = function () {
        this.addClass("JSDialog");
    };
    JSDialog.prototype.getOwner = function () {
        return this.owner;
    };
    JSDialog.prototype.setOwner = function (owner) {
        this.owner = owner;
    };
    JSDialog.prototype.isModal = function () {
        return this.modal;
    };
    JSDialog.prototype.setModal = function (modal) {
        this.modal = modal;
    };
    JSDialog.prototype.getTitle = function () {
        return this.title;
    };
    JSDialog.prototype.setTitle = function (title) {
        this.title = title;
    };
    JSDialog.prototype.setVisible = function (visible) {
        if (visible) {
            this.setStyle("min-width", this.getPreferredWidth() + "px");
            this.setStyle("min-height", this.getPreferredHeight() + "px");
            JSBody.getInstance().setPopupMenu(this);
            _super.prototype.setVisible.call(this, visible);
        }
        else {
            _super.prototype.setVisible.call(this, visible);
            JSBody.getInstance().setPopupMenu(null);
        }
    };
    return JSDialog;
}(JSPanel));
var JSDiv = (function (_super) {
    __extends(JSDiv, _super);
    function JSDiv() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
    }
    JSDiv.prototype.init = function () {
        this.addClass("JSDiv");
    };
    return JSDiv;
}(JSHTMLComponent));
var JSDragSourceListener = (function () {
    function JSDragSourceListener(dragSourceListener) {
        this.parameters = [];
        var jsDragSourceListener = this;
        if (dragSourceListener.dragStart) {
            this.dragStart = function (mouseEvent) {
                var parameters = jsDragSourceListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                dragSourceListener.dragStart.apply(dragSourceListener, parameters);
            };
        }
        if (dragSourceListener.drag) {
            this.drag = function (mouseEvent) {
                var parameters = jsDragSourceListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                dragSourceListener.drag.apply(dragSourceListener, parameters);
            };
        }
        if (dragSourceListener.dragEnd) {
            this.dragEnd = function (mouseEvent) {
                var parameters = jsDragSourceListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                dragSourceListener.dragEnd.apply(dragSourceListener, parameters);
            };
        }
    }
    JSDragSourceListener.prototype.getParameters = function () {
        return this.parameters;
    };
    JSDragSourceListener.prototype.setParameters = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        this.parameters = parameters;
    };
    JSDragSourceListener.prototype.withParameters = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        this.parameters = parameters;
        return this;
    };
    return JSDragSourceListener;
}());
var JSDropTargetListener = (function () {
    function JSDropTargetListener(dropTargetListener) {
        this.parameters = [];
        var jsDropTargetListener = this;
        if (dropTargetListener.dragEnter) {
            this.dragEnter = function (mouseEvent) {
                var parameters = jsDropTargetListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                dropTargetListener.dragEnter.apply(dropTargetListener, parameters);
            };
        }
        if (dropTargetListener.dragOver) {
            this.dragOver = function (mouseEvent) {
                var parameters = jsDropTargetListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                dropTargetListener.dragOver.apply(dropTargetListener, parameters);
            };
        }
        if (dropTargetListener.dragLeave) {
            this.dragLeave = function (mouseEvent) {
                var parameters = jsDropTargetListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                dropTargetListener.dragLeave.apply(dropTargetListener, parameters);
            };
        }
        if (dropTargetListener.drop) {
            this.drop = function (mouseEvent) {
                var parameters = jsDropTargetListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                dropTargetListener.drop.apply(dropTargetListener, parameters);
            };
        }
    }
    JSDropTargetListener.prototype.getParameters = function () {
        return this.parameters;
    };
    JSDropTargetListener.prototype.setParameters = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        this.parameters = parameters;
    };
    JSDropTargetListener.prototype.withParameters = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        this.parameters = parameters;
        return this;
    };
    return JSDropTargetListener;
}());
var JSFileChooser = (function (_super) {
    __extends(JSFileChooser, _super);
    function JSFileChooser() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLInputElement) ? document.createElement("input") : args[0]) || this;
        _this.setAttribute("type", "file");
        JSBody.getInstance().setFileChooser(_this);
        _this.addChangeListener({
            stateChanged: function (event, source) {
                var fileChooser = source;
                fileChooser.setSelectedFiles(fileChooser.element.files);
            }
        });
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
    function JSFlowLayout() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.border = JSFlowLayout.NORTH;
        _this.align = JSFlowLayout.CENTER;
        _this.hgap = 0;
        _this.vgap = 0;
        switch (args.length) {
            case 0:
                break;
            case 2:
                if (typeof args[0] === "string" && typeof args[1] === "string") {
                    var border = args[0];
                    var align = args[1];
                    _this.setBorder(border);
                    _this.setAlign(align);
                }
                break;
            case 4:
                if (typeof args[0] === "string" && typeof args[1] === "string" && typeof args[2] === "number" && typeof args[3] === "number") {
                    var border = args[0];
                    var align = args[1];
                    var hgap = args[2];
                    var vgap = args[3];
                    _this.setBorder(border);
                    _this.setAlign(align);
                    _this.setHgap(hgap);
                    _this.setVgap(vgap);
                }
                break;
            default:
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
    JSFlowLayout.prototype.getBorder = function () {
        return this.border;
    };
    JSFlowLayout.prototype.setBorder = function (region) {
        this.border = region;
    };
    JSFlowLayout.prototype.addLayoutComponent = function (component) {
        component.setStyle("position", "absolute");
    };
    JSFlowLayout.prototype.preferredLayoutWidth = function (container) {
        var preferredLayoutWidth = 0;
        var border = this.getBorder();
        var hgap = this.getHgap();
        var vgap = this.getVgap();
        var components = container.getComponents();
        if (border === JSFlowLayout.WEST || border === JSFlowLayout.EAST) {
            var containerHeight = container.getPreferredHeight();
            var rowHeight = 0;
            var rowWidth = 0;
            for (var i = 0; i < components.length; i++) {
                var component = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                if (rowHeight + componentPreferredOuterHeight > containerHeight) {
                    preferredLayoutWidth += rowWidth;
                    rowHeight = 0;
                    rowWidth = 0;
                }
                rowHeight += componentPreferredOuterHeight + vgap;
                rowWidth = Math.max(rowWidth, componentPreferredOuterWidth + hgap);
            }
            preferredLayoutWidth += rowWidth;
            if (preferredLayoutWidth != 0) {
                preferredLayoutWidth -= hgap;
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
            var width = container.getWidth();
            if (width) {
                preferredLayoutWidth = Math.min(preferredLayoutWidth, width);
            }
        }
        return preferredLayoutWidth;
    };
    JSFlowLayout.prototype.preferredLayoutHeight = function (container) {
        var preferredLayoutHeight = 0;
        var border = this.getBorder();
        var hgap = this.getHgap();
        var vgap = this.getVgap();
        var components = container.getComponents();
        if (border === JSFlowLayout.WEST || border === JSFlowLayout.EAST) {
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
            var height = container.getHeight();
            if (height) {
                preferredLayoutHeight = Math.min(preferredLayoutHeight, height);
            }
        }
        else {
            var containerWidth = container.getPreferredWidth();
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
        return preferredLayoutHeight;
    };
    JSFlowLayout.prototype.layoutContainer = function (container) {
        var border = this.getBorder();
        var hgap = this.getHgap();
        var vgap = this.getVgap();
        var width = container.getWidth();
        var height = container.getHeight();
        var rowWidth = 0;
        var rowHeight = 0;
        var n = 0;
        var components = container.getComponents();
        if (border === JSFlowLayout.WEST) {
            var x = container.getInsetLeft();
            var y = container.getInsetTop();
            for (var i = 0; i < components.length; i++) {
                var component = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                if (rowHeight + componentPreferredOuterHeight > height) {
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
                rowWidth -= hgap;
                rowHeight -= vgap;
                this.layoutComponents(container, components.slice(n, i), x, y, rowWidth, rowHeight);
            }
        }
        else if (border === JSFlowLayout.EAST) {
            var x = width - container.getInsetRight();
            var y = container.getInsetTop();
            for (var i = 0; i < components.length; i++) {
                var component = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                if (rowHeight + componentPreferredOuterHeight > height) {
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
                rowWidth -= hgap;
                rowHeight -= vgap;
                this.layoutComponents(container, components.slice(n, i), x - rowWidth, y, rowWidth, rowHeight);
            }
        }
        else if (border === JSFlowLayout.SOUTH) {
            var x = container.getInsetLeft();
            var y = height - container.getInsetBottom();
            for (var i = 0; i < components.length; i++) {
                var component = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                if (rowWidth + componentPreferredOuterWidth > width) {
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
                rowHeight -= vgap;
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
                if (rowWidth + componentPreferredOuterWidth > width) {
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
                rowHeight -= vgap;
                this.layoutComponents(container, components.slice(n, i), x, y, rowWidth, rowHeight);
            }
        }
    };
    JSFlowLayout.prototype.layoutComponents = function (container, components, x, y, rowWidth, rowHeight) {
        var border = this.getBorder();
        var align = this.getAlign();
        var hgap = this.getHgap();
        var vgap = this.getVgap();
        var width = container.getWidth();
        var height = container.getHeight();
        var width100 = width + container.getPaddingLeft() + container.getPaddingRight();
        var height100 = height + container.getPaddingTop() + container.getPaddingBottom();
        if (border === JSFlowLayout.WEST || border === JSFlowLayout.EAST) {
            for (var i = 0; i < components.length; i++) {
                var component = components[i];
                var componentAlign = component.getAlign();
                if (componentAlign !== JSFlowLayout.TOP && componentAlign !== JSFlowLayout.BOTTOM) {
                    continue;
                }
                var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                component.setOuterHeight(componentPreferredOuterHeight);
                if (componentAlign === JSFlowLayout.TOP) {
                    component.setY(y);
                    y += componentPreferredOuterHeight + vgap;
                    if (align === JSFlowLayout.TOP || align === JSFlowLayout.BOTTOM) {
                        rowHeight -= componentPreferredOuterHeight + vgap;
                    }
                    else {
                        rowHeight -= 2 * (componentPreferredOuterHeight + vgap);
                    }
                }
                else {
                    component.setY(y + height - componentPreferredOuterHeight);
                    if (align === JSFlowLayout.TOP || align === JSFlowLayout.BOTTOM) {
                        rowHeight -= componentPreferredOuterHeight + vgap;
                    }
                    else {
                        y += componentPreferredOuterHeight + vgap;
                        rowHeight -= 2 * (componentPreferredOuterHeight + vgap);
                    }
                }
                var constraints = component.getConstraints();
                if (constraints === JSFlowLayout.BOTH || constraints === JSFlowLayout.HORIZONTAL) {
                    component.setOuterWidth(rowWidth);
                    component.setX(x);
                }
                else {
                    var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentPreferredOuterWidth);
                    component.setX(x + (rowWidth - componentPreferredOuterWidth) / 2);
                }
            }
            var yPc = 0;
            switch (align) {
                case JSFlowLayout.TOP:
                    break;
                case JSFlowLayout.BOTTOM:
                    y += height - rowHeight;
                    yPc = 100;
                    break;
                case JSFlowLayout.CENTER:
                default:
                    y += (height - rowHeight) / 2;
                    yPc = 50;
            }
            for (var i = 0; i < components.length; i++) {
                var component = components[i];
                var componentAlign = component.getAlign();
                if (componentAlign === JSFlowLayout.TOP || componentAlign === JSFlowLayout.BOTTOM) {
                    continue;
                }
                var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                component.setOuterHeight(componentPreferredOuterHeight);
                switch (componentAlign) {
                    case JSFlowLayout.BOTH:
                        component.setOuterWidth(rowWidth);
                        component.setX(x);
                        break;
                    case JSFlowLayout.LEFT:
                        var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                        component.setOuterWidth(componentPreferredOuterWidth);
                        component.setX(x);
                        break;
                    case JSFlowLayout.RIGHT:
                        var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                        component.setOuterWidth(componentPreferredOuterWidth);
                        component.setX(x + rowWidth - componentPreferredOuterWidth);
                        break;
                    case JSFlowLayout.CENTER:
                    default:
                        var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                        component.setOuterWidth(componentPreferredOuterWidth);
                        component.setX(x + (rowWidth - componentPreferredOuterWidth) / 2);
                }
                component.setY(y);
                y += componentPreferredOuterHeight + vgap;
            }
        }
        else {
            for (var i = 0; i < components.length; i++) {
                var component = components[i];
                var componentAlign = component.getAlign();
                if (componentAlign !== JSFlowLayout.LEFT && componentAlign !== JSFlowLayout.RIGHT) {
                    continue;
                }
                var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                component.setOuterWidth(componentPreferredOuterWidth);
                if (componentAlign === JSFlowLayout.LEFT) {
                    component.setX(x);
                    x += componentPreferredOuterWidth + hgap;
                    if (align === JSFlowLayout.LEFT || align === JSFlowLayout.RIGHT) {
                        rowWidth -= componentPreferredOuterWidth + hgap;
                    }
                    else {
                        rowWidth -= 2 * (componentPreferredOuterWidth + hgap);
                    }
                }
                else {
                    component.setX(x + width - componentPreferredOuterWidth);
                    if (align === JSFlowLayout.LEFT || align === JSFlowLayout.RIGHT) {
                        rowWidth -= componentPreferredOuterWidth + hgap;
                    }
                    else {
                        x += componentPreferredOuterWidth + hgap;
                        rowWidth -= 2 * (componentPreferredOuterWidth + hgap);
                    }
                }
                var constraints = component.getConstraints();
                if (constraints === JSFlowLayout.BOTH || constraints === JSFlowLayout.VERTICAL) {
                    component.setOuterHeight(rowHeight);
                    component.setY(y);
                }
                else {
                    var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentPreferredOuterHeight);
                    component.setY(y + (rowHeight - componentPreferredOuterHeight) / 2);
                }
            }
            var xPc = 0;
            switch (align) {
                case JSFlowLayout.LEFT:
                    break;
                case JSFlowLayout.RIGHT:
                    x += width - rowWidth;
                    xPc = 100;
                    break;
                case JSFlowLayout.CENTER:
                default:
                    x += (width - rowWidth) / 2;
                    xPc = 50;
            }
            for (var i = 0; i < components.length; i++) {
                var component = components[i];
                var componentAlign = component.getAlign();
                if (componentAlign === JSFlowLayout.LEFT || componentAlign === JSFlowLayout.RIGHT) {
                    continue;
                }
                var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                component.setOuterWidth(componentPreferredOuterWidth);
                switch (componentAlign) {
                    case JSFlowLayout.BOTH:
                        component.setOuterHeight(rowHeight);
                        component.setY(y);
                        break;
                    case JSFlowLayout.TOP:
                        var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                        component.setOuterHeight(componentPreferredOuterHeight);
                        component.setY(y);
                        break;
                    case JSFlowLayout.BOTTOM:
                        var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                        component.setOuterHeight(componentPreferredOuterHeight);
                        component.setY(y + rowHeight - componentPreferredOuterHeight);
                        break;
                    case JSFlowLayout.CENTER:
                    default:
                        var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                        component.setOuterHeight(componentPreferredOuterHeight);
                        component.setY(y + (rowHeight - componentPreferredOuterHeight) / 2);
                }
                component.setX(x);
                x += componentPreferredOuterWidth + hgap;
            }
        }
    };
    return JSFlowLayout;
}(JSLayout));
var JSForm = (function (_super) {
    __extends(JSForm, _super);
    function JSForm() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.call(this, args.length === 0 || !(args[0] instanceof HTMLFormElement) ? document.createElement("form") : args[0]) || this;
    }
    JSForm.post = function (url, params) {
        if (params) {
            new JSForm().post(url, params);
        }
        else {
            new JSForm().post(url);
        }
    };
    JSForm.prototype.init = function () {
        this.addClass("JSForm");
    };
    JSForm.prototype.getMethod = function () {
        return this.element.method;
    };
    JSForm.prototype.setMethod = function (method) {
        this.element.method = method;
    };
    JSForm.prototype.getUrl = function () {
        return this.element.action;
    };
    JSForm.prototype.setUrl = function (url) {
        this.element.action = url;
    };
    JSForm.prototype.submit = function () {
        JSBody.getInstance().add(this);
        this.element.submit();
    };
    JSForm.prototype.post = function (url, params) {
        this.setMethod(JSForm.POST);
        this.setUrl(url);
        this.submit();
    };
    JSForm.POST = "post";
    JSForm.GET = "get";
    return JSForm;
}(JSHTMLComponent));
var JSFrame = (function (_super) {
    __extends(JSFrame, _super);
    function JSFrame() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
        _this.setVisible(false);
        var body = JSBody.getInstance();
        body.setContentPane(_this);
        return _this;
    }
    JSFrame.prototype.init = function () {
        this.addClass("JSFrame");
    };
    JSFrame.prototype.setVisible = function (visible) {
        if (visible) {
            var body = JSBody.getInstance();
            for (var i = 0; i < 2; i++) {
                body.validate();
            }
        }
        _super.prototype.setVisible.call(this, visible);
    };
    JSFrame.prototype.validate = function () {
        var layout = this.getLayout();
        if (layout) {
            layout.layoutContainer(this);
        }
        this.validateChildren();
    };
    return JSFrame;
}(JSHTMLComponent));
var JSGraphics = (function (_super) {
    __extends(JSGraphics, _super);
    function JSGraphics() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
    }
    JSGraphics.prototype.init = function () {
        this.addClass("JSGraphics");
    };
    return JSGraphics;
}(JSHTMLComponent));
var JSGridBagLayout = (function (_super) {
    __extends(JSGridBagLayout, _super);
    function JSGridBagLayout() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.hgap = 0;
        _this.vgap = 0;
        switch (args.length) {
            case 2:
                if (typeof args[0] === "number" && typeof args[1] === "number") {
                    var hgap = args[0];
                    var vgap = args[1];
                    _this.setHgap(hgap);
                    _this.setVgap(vgap);
                }
                break;
            default:
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
    JSGridBagLayout.prototype.addLayoutComponent = function (component) {
        component.setStyle("position", "absolute");
    };
    JSGridBagLayout.prototype.preferredLayoutWidth = function (container) {
        var preferredLayoutWidth = 0;
        var width = container.getWidth();
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
        var widthsPx = [];
        var weightxs = [];
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
                widthsPx[gridx] = Math.max(widthsPx[gridx] || 0, componentPreferredOuterWidth);
            }
            else {
                widthsPx[gridx + gridwidth - 1] = Math.max(widthsPx[gridx + gridwidth - 1] || 0, componentPreferredOuterWidth - (widthsPx[gridx + gridwidth - 2] || 0));
            }
            var weightx = (constraints.weightx || 0) / gridwidth;
            for (var j = 0; j < gridwidth; j++) {
                weightxs[gridx + j] = Math.max(weightxs[gridx + j] || 0, weightx);
            }
        }
        var hgap = this.getHgap();
        for (var i = 0; i < widthsPx.length; i++) {
            preferredLayoutWidth += (widthsPx[i] || 0) + hgap;
        }
        if (preferredLayoutWidth != 0) {
            preferredLayoutWidth -= hgap;
        }
        if (width) {
            var extraHorizontalSpace = width - preferredLayoutWidth;
            if (extraHorizontalSpace) {
                var sum = 0;
                for (var i = 0; i < weightxs.length; i++) {
                    sum += weightxs[i] || 0;
                }
                if (sum) {
                    preferredLayoutWidth = Math.max(preferredLayoutWidth, width);
                }
            }
        }
        return preferredLayoutWidth;
    };
    JSGridBagLayout.prototype.preferredLayoutHeight = function (container) {
        var preferredLayoutWidth = 0;
        var width = container.getWidth();
        var width100 = width + container.getPaddingLeft() + container.getPaddingRight();
        var height = container.getHeight();
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
        var widthsPx = [];
        var widthsPc = [];
        var weightxs = [];
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
                widthsPx[gridx] = Math.max(widthsPx[gridx] || 0, componentPreferredOuterWidth);
            }
            else {
                widthsPx[gridx + gridwidth - 1] = Math.max(widthsPx[gridx + gridwidth - 1] || 0, componentPreferredOuterWidth - (widthsPx[gridx + gridwidth - 2] || 0));
            }
            var weightx = (constraints.weightx || 0) / gridwidth;
            for (var j = 0; j < gridwidth; j++) {
                weightxs[gridx + j] = Math.max(weightxs[gridx + j] || 0, weightx);
            }
        }
        var hgap = this.getHgap();
        for (var i = 0; i < widthsPx.length; i++) {
            preferredLayoutWidth += (widthsPx[i] || 0) + hgap;
        }
        if (preferredLayoutWidth != 0) {
            preferredLayoutWidth -= hgap;
        }
        if (width) {
            var extraHorizontalSpace = width - preferredLayoutWidth;
            if (extraHorizontalSpace) {
                var sum = 0;
                for (var i = 0; i < weightxs.length; i++) {
                    sum += weightxs[i] || 0;
                }
                if (sum) {
                    for (var i = 0; i < widthsPx.length; i++) {
                        widthsPx[i] = (widthsPx[i] || 0) + extraHorizontalSpace * (weightxs[i] || 0) / sum - width100 * (weightxs[i] || 0) / sum;
                        widthsPc[i] = 100 * (weightxs[i] || 0) / sum;
                    }
                    preferredLayoutWidth = Math.max(preferredLayoutWidth, width);
                }
            }
        }
        var xsPx = [];
        var xsPc = [];
        var extraHorizontalSpace = width - preferredLayoutWidth;
        if (extraHorizontalSpace) {
            xsPx[0] = container.getInsetLeft() + (width - preferredLayoutWidth) / 2 - width100 / 2;
            xsPc[0] = 50;
        }
        else {
            xsPx[0] = container.getInsetLeft();
            xsPc[0] = 0;
        }
        for (var i = 0; i < widthsPx.length; i++) {
            xsPx[i + 1] = xsPx[i] + (widthsPx[i] || 0) + hgap;
            xsPc[i + 1] = xsPc[i] + (widthsPc[i] || 0);
        }
        components = container.getComponents();
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var constraints = component.getConstraints() || {};
            var gridx = constraints.gridx || 0;
            var gridwidth = constraints.gridwidth || 1;
            var fill = constraints.fill;
            var anchor = constraints.anchor;
            switch (fill) {
                case JSGridBagLayout.BOTH:
                    component.setOuterWidth(xsPx[gridx + gridwidth] - xsPx[gridx] - hgap + (xsPc[gridx + gridwidth] - xsPc[gridx]) * width100 / 100);
                    component.setX(xsPx[gridx] + xsPc[gridx] * width100 / 100);
                    break;
                case JSGridBagLayout.HORIZONTAL:
                    component.setOuterWidth(xsPx[gridx + gridwidth] - xsPx[gridx] - hgap + (xsPc[gridx + gridwidth] - xsPc[gridx]) * width100 / 100);
                    component.setX(xsPx[gridx] + xsPc[gridx] * width100 / 100);
                    break;
                case JSGridBagLayout.VERTICAL:
                    var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentPreferredOuterWidth);
                    switch (anchor) {
                        case JSGridBagLayout.WEST:
                            component.setX(xsPx[gridx] + xsPc[gridx] * width100 / 100);
                            break;
                        case JSGridBagLayout.EAST:
                            var xPx = xsPx[gridx + gridwidth] - hgap - componentPreferredOuterWidth;
                            component.setX(xPx + xsPc[gridx + gridwidth] * width100 / 100);
                            break;
                        case JSGridBagLayout.CENTER:
                        default:
                            var xPc = xsPc[gridx] + (xsPc[gridx + gridwidth] - xsPc[gridx]) / 2;
                            var xPx = xsPx[gridx] + (xsPx[gridx + gridwidth] - xsPx[gridx] - hgap - componentPreferredOuterWidth) / 2;
                            component.setX(xPx + xPc * width100 / 100);
                    }
                    break;
                case JSGridBagLayout.NONE:
                default:
                    var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentPreferredOuterWidth);
                    switch (anchor) {
                        case JSGridBagLayout.WEST:
                        case JSGridBagLayout.NORTHWEST:
                        case JSGridBagLayout.SOUTHWEST:
                            component.setX(xsPx[gridx] + xsPc[gridx] * width100 / 100);
                            break;
                        case JSGridBagLayout.EAST:
                        case JSGridBagLayout.NORTHEAST:
                        case JSGridBagLayout.SOUTHEAST:
                            var xPx = xsPx[gridx + gridwidth] - hgap - componentPreferredOuterWidth;
                            component.setX(xPx + xsPc[gridx + gridwidth] * width100 / 100);
                            break;
                        case JSGridBagLayout.CENTER:
                        default:
                            var xPc = xsPc[gridx] + (xsPc[gridx + gridwidth] - xsPc[gridx]) / 2;
                            var xPx = xsPx[gridx] + (xsPx[gridx + gridwidth] - xsPx[gridx] - hgap - componentPreferredOuterWidth) / 2;
                            component.setX(xPx + xPc * width100 / 100);
                    }
            }
        }
        var preferredLayoutHeight = 0;
        components = container.getComponents().slice();
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
        var heightsPx = [];
        var weightys = [];
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
                heightsPx[gridy] = Math.max(heightsPx[gridy] || 0, componentPreferredOuterHeight);
            }
            else {
                heightsPx[gridy + gridheight - 1] = Math.max(heightsPx[gridy + gridheight - 1] || 0, componentPreferredOuterHeight - (heightsPx[gridy + gridheight - 2] || 0));
            }
            var weighty = (constraints.weighty || 0) / gridheight;
            for (var j = 0; j < gridheight; j++) {
                weightys[gridy + j] = Math.max(weightys[gridy + j] || 0, weighty);
            }
        }
        var vgap = this.getVgap();
        for (var i = 0; i < heightsPx.length; i++) {
            preferredLayoutHeight += (heightsPx[i] || 0) + vgap;
        }
        if (preferredLayoutHeight != 0) {
            preferredLayoutHeight -= vgap;
        }
        if (height) {
            var extraVerticalSpace = height - preferredLayoutHeight;
            if (extraVerticalSpace) {
                var sum = 0;
                for (var i = 0; i < weightys.length; i++) {
                    sum += weightys[i] || 0;
                }
                if (sum) {
                    preferredLayoutHeight = Math.max(preferredLayoutHeight, height);
                }
            }
        }
        return preferredLayoutHeight;
    };
    JSGridBagLayout.prototype.layoutContainer = function (container) {
        var preferredLayoutWidth = 0;
        var width = container.getWidth();
        var width100 = width + container.getPaddingLeft() + container.getPaddingRight();
        var height = container.getHeight();
        var height100 = height + container.getPaddingTop() + container.getPaddingBottom();
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
        var widthsPx = [];
        var widthsPc = [];
        var weightxs = [];
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
                widthsPx[gridx] = Math.max(widthsPx[gridx] || 0, componentPreferredOuterWidth);
            }
            else {
                widthsPx[gridx + gridwidth - 1] = Math.max(widthsPx[gridx + gridwidth - 1] || 0, componentPreferredOuterWidth - (widthsPx[gridx + gridwidth - 2] || 0));
            }
            var weightx = (constraints.weightx || 0) / gridwidth;
            for (var j = 0; j < gridwidth; j++) {
                weightxs[gridx + j] = Math.max(weightxs[gridx + j] || 0, weightx);
            }
        }
        var hgap = this.getHgap();
        for (var i = 0; i < widthsPx.length; i++) {
            preferredLayoutWidth += (widthsPx[i] || 0) + hgap;
        }
        if (preferredLayoutWidth != 0) {
            preferredLayoutWidth -= hgap;
        }
        if (width) {
            var extraHorizontalSpace = width - preferredLayoutWidth;
            if (extraHorizontalSpace) {
                var sum = 0;
                for (var i = 0; i < weightxs.length; i++) {
                    sum += weightxs[i] || 0;
                }
                if (sum) {
                    for (var i = 0; i < widthsPx.length; i++) {
                        widthsPx[i] = (widthsPx[i] || 0) + extraHorizontalSpace * (weightxs[i] || 0) / sum - width100 * (weightxs[i] || 0) / sum;
                        widthsPc[i] = 100 * (weightxs[i] || 0) / sum;
                    }
                    preferredLayoutWidth = Math.max(preferredLayoutWidth, width);
                }
            }
        }
        var xsPx = [];
        var xsPc = [];
        var extraHorizontalSpace = width - preferredLayoutWidth;
        if (extraHorizontalSpace) {
            xsPx[0] = container.getInsetLeft() + (width - preferredLayoutWidth) / 2 - width100 / 2;
            xsPc[0] = 50;
        }
        else {
            xsPx[0] = container.getInsetLeft();
            xsPc[0] = 0;
        }
        for (var i = 0; i < widthsPx.length; i++) {
            xsPx[i + 1] = xsPx[i] + (widthsPx[i] || 0) + hgap;
            xsPc[i + 1] = xsPc[i] + (widthsPc[i] || 0);
        }
        components = container.getComponents();
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var constraints = component.getConstraints() || {};
            var gridx = constraints.gridx || 0;
            var gridwidth = constraints.gridwidth || 1;
            var fill = constraints.fill;
            var anchor = constraints.anchor;
            switch (fill) {
                case JSGridBagLayout.BOTH:
                    component.setOuterWidth(xsPx[gridx + gridwidth] - xsPx[gridx] - hgap + (xsPc[gridx + gridwidth] - xsPc[gridx]) * 100);
                    component.setX(xsPx[gridx] + xsPc[gridx] * width100 / 100);
                    break;
                case JSGridBagLayout.HORIZONTAL:
                    component.setOuterWidth(xsPx[gridx + gridwidth] - xsPx[gridx] - hgap + (xsPc[gridx + gridwidth] - xsPc[gridx]) * 100);
                    component.setX(xsPx[gridx] + xsPc[gridx] * width100 / 100);
                    break;
                case JSGridBagLayout.VERTICAL:
                    var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentPreferredOuterWidth);
                    switch (anchor) {
                        case JSGridBagLayout.WEST:
                            component.setX(xsPx[gridx] + xsPc[gridx] * width100 / 100);
                            break;
                        case JSGridBagLayout.EAST:
                            var xPx = xsPx[gridx + gridwidth] - hgap - componentPreferredOuterWidth;
                            component.setX(xPx + xsPc[gridx + gridwidth] * width100 / 100);
                            break;
                        case JSGridBagLayout.CENTER:
                        default:
                            var xPc = xsPc[gridx] + (xsPc[gridx + gridwidth] - xsPc[gridx]) / 2;
                            var xPx = xsPx[gridx] + (xsPx[gridx + gridwidth] - xsPx[gridx] - hgap - componentPreferredOuterWidth) / 2;
                            component.setX(xPx + xPc * width100 / 100);
                    }
                    break;
                case JSGridBagLayout.NONE:
                default:
                    var componentPreferredOuterWidth = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentPreferredOuterWidth);
                    switch (anchor) {
                        case JSGridBagLayout.WEST:
                        case JSGridBagLayout.NORTHWEST:
                        case JSGridBagLayout.SOUTHWEST:
                            component.setX(xsPx[gridx] + xsPc[gridx] * width100 / 100);
                            break;
                        case JSGridBagLayout.EAST:
                        case JSGridBagLayout.NORTHEAST:
                        case JSGridBagLayout.SOUTHEAST:
                            var xPx = xsPx[gridx + gridwidth] - hgap - componentPreferredOuterWidth;
                            component.setX(xPx + xsPc[gridx + gridwidth] * width100 / 100);
                            break;
                        case JSGridBagLayout.CENTER:
                        default:
                            var xPc = xsPc[gridx] + (xsPc[gridx + gridwidth] - xsPc[gridx]) / 2;
                            var xPx = xsPx[gridx] + (xsPx[gridx + gridwidth] - xsPx[gridx] - hgap - componentPreferredOuterWidth) / 2;
                            component.setX(xPx + xPc * width100 / 100);
                    }
            }
        }
        var preferredLayoutHeight = 0;
        components = container.getComponents().slice();
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
        var heightsPx = [];
        var heightsPc = [];
        var weightys = [];
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
                heightsPx[gridy] = Math.max(heightsPx[gridy] || 0, componentPreferredOuterHeight);
            }
            else {
                heightsPx[gridy + gridheight - 1] = Math.max(heightsPx[gridy + gridheight - 1] || 0, componentPreferredOuterHeight - (heightsPx[gridy + gridheight - 2] || 0));
            }
            var weighty = (constraints.weighty || 0) / gridheight;
            for (var j = 0; j < gridheight; j++) {
                weightys[gridy + j] = Math.max(weightys[gridy + j] || 0, weighty);
            }
        }
        var vgap = this.getVgap();
        for (var i = 0; i < heightsPx.length; i++) {
            preferredLayoutHeight += (heightsPx[i] || 0) + vgap;
        }
        if (preferredLayoutHeight != 0) {
            preferredLayoutHeight -= vgap;
        }
        if (height) {
            var extraVerticalSpace = height - preferredLayoutHeight;
            if (extraVerticalSpace) {
                var sum = 0;
                for (var i = 0; i < weightys.length; i++) {
                    sum += weightys[i] || 0;
                }
                if (sum) {
                    for (var i = 0; i < heightsPx.length; i++) {
                        heightsPx[i] = (heightsPx[i] || 0) + extraVerticalSpace * (weightys[i] || 0) / sum - height100 * (weightys[i] || 0) / sum;
                        heightsPc[i] = 100 * (weightys[i] || 0) / sum;
                    }
                    preferredLayoutHeight = Math.max(preferredLayoutHeight, height);
                }
            }
        }
        var ysPx = [];
        var ysPc = [];
        var extraVerticalSpace = height - preferredLayoutHeight;
        if (extraVerticalSpace) {
            ysPx[0] = container.getInsetTop() + (height - preferredLayoutHeight) / 2 - height100 / 2;
            ysPc[0] = 50;
        }
        else {
            ysPx[0] = container.getInsetTop();
            ysPc[0] = 0;
        }
        for (var i = 0; i < heightsPx.length; i++) {
            ysPx[i + 1] = ysPx[i] + (heightsPx[i] || 0) + vgap;
            ysPc[i + 1] = ysPc[i] + (heightsPc[i] || 0);
        }
        components = container.getComponents();
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var constraints = component.getConstraints() || {};
            var gridy = constraints.gridy || 0;
            var gridheight = constraints.gridheight || 1;
            var fill = constraints.fill;
            var anchor = constraints.anchor;
            switch (fill) {
                case JSGridBagLayout.BOTH:
                    component.setOuterHeight(ysPx[gridy + gridheight] - ysPx[gridy] - vgap + (ysPc[gridy + gridheight] - ysPc[gridy]) * height100 / 100);
                    component.setY(ysPx[gridy] + ysPc[gridy] * height100 / 100);
                    break;
                case JSGridBagLayout.HORIZONTAL:
                    var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentPreferredOuterHeight);
                    switch (anchor) {
                        case JSGridBagLayout.NORTH:
                            component.setY(ysPx[gridy] + ysPc[gridy] * height100 / 100);
                            break;
                        case JSGridBagLayout.SOUTH:
                            var yPx = ysPx[gridy + gridheight] - vgap - componentPreferredOuterHeight;
                            component.setY(yPx + ysPc[gridy + gridheight] * height100 / 100);
                            break;
                        case JSGridBagLayout.CENTER:
                        default:
                            var yPc = ysPc[gridy] + (ysPc[gridy + gridheight] - ysPc[gridy]) / 2;
                            var yPx = ysPx[gridy] + (ysPx[gridy + gridheight] - ysPx[gridy] - vgap - componentPreferredOuterHeight) / 2;
                            component.setY(yPx + yPc * height100 / 100);
                    }
                    break;
                case JSGridBagLayout.VERTICAL:
                    component.setOuterHeight(ysPx[gridy + gridheight] - ysPx[gridy] - vgap + (ysPc[gridy + gridheight] - ysPc[gridy]) * height100 / 100);
                    component.setY(ysPx[gridy] + ysPc[gridy] * height100 / 100);
                    break;
                case JSGridBagLayout.NONE:
                default:
                    var componentPreferredOuterHeight = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentPreferredOuterHeight);
                    switch (anchor) {
                        case JSGridBagLayout.NORTH:
                        case JSGridBagLayout.NORTHWEST:
                        case JSGridBagLayout.NORTHEAST:
                            component.setY(ysPx[gridy] + ysPc[gridy] * height100 / 100);
                            break;
                        case JSGridBagLayout.SOUTH:
                        case JSGridBagLayout.SOUTHWEST:
                        case JSGridBagLayout.SOUTHEAST:
                            var yPx = ysPx[gridy + gridheight] - vgap - componentPreferredOuterHeight;
                            component.setY(yPx + ysPc[gridy + gridheight] * height100 / 100);
                            break;
                        case JSGridBagLayout.CENTER:
                        default:
                            var yPc = ysPc[gridy] + (ysPc[gridy + gridheight] - ysPc[gridy]) / 2;
                            var yPx = ysPx[gridy] + (ysPx[gridy + gridheight] - ysPx[gridy] - vgap - componentPreferredOuterHeight) / 2;
                            component.setY(yPx + yPc * height100 / 100);
                    }
            }
        }
    };
    return JSGridBagLayout;
}(JSLayout));
var JSHorizontalSeparator = (function (_super) {
    __extends(JSHorizontalSeparator, _super);
    function JSHorizontalSeparator() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
        var line = _this.getLine();
        _this.add(line);
        _this.addMouseListener({
            mousePressed: function (mouseEvent) {
                mouseEvent.stopPropagation();
            },
            mouseReleased: function (mouseEvent) {
                mouseEvent.stopPropagation();
            }
        });
        return _this;
    }
    JSHorizontalSeparator.prototype.init = function () {
        this.addClass("JSHorizontalSeparator");
    };
    JSHorizontalSeparator.prototype.getLine = function () {
        var line = this.getData("line");
        if (!line) {
            line = new JSDiv();
            this.setData("line", line);
        }
        return line;
    };
    return JSHorizontalSeparator;
}(JSHTMLComponent));
var JSImage = (function (_super) {
    __extends(JSImage, _super);
    function JSImage() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLImageElement) ? document.createElement("img") : args[0]) || this;
        switch (args.length) {
            case 0:
                break;
            case 1:
                if (args[0] instanceof JSIcon) {
                    var icon = args[0];
                    _this.setIcon(icon);
                }
                else if (typeof args[0] === "string") {
                    var source = args[0];
                    _this.setSource(source);
                }
                break;
            case 3:
                if (typeof args[0] === "string" && typeof args[1] === "number" && typeof args[2] === "number") {
                    var source = args[0];
                    var width = args[1];
                    var height = args[2];
                    _this.setSource(source);
                    _this.setWidth(width);
                    _this.setHeight(height);
                }
                break;
            default:
        }
        return _this;
    }
    JSImage.prototype.init = function () {
        this.addClass("JSImage");
    };
    JSImage.prototype.getSource = function () {
        return this.getAttribute("src");
    };
    JSImage.prototype.setSource = function (source) {
        this.setAttribute("src", source);
    };
    return JSImage;
}(JSHTMLComponent));
var JSLabel = (function (_super) {
    __extends(JSLabel, _super);
    function JSLabel() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLLabelElement) ? document.createElement("label") : args[0]) || this;
        var graphics = _this.getGraphics();
        _this.add(graphics);
        switch (args.length) {
            case 1:
                if (args[0] instanceof JSIcon) {
                    var icon = args[0];
                    _this.setIcon(icon);
                }
                else if (typeof args[0] === "string") {
                    var text = args[0];
                    _this.setText(text);
                }
                break;
            case 2:
                if (args[0] instanceof JSIcon && typeof args[1] === "string") {
                    var icon = args[0];
                    var horizontalAlignment = args[1];
                    _this.setIcon(icon);
                    _this.setStyle("text-align", horizontalAlignment);
                }
                else if (typeof args[0] === "string" && typeof args[1] === "string") {
                    var text = args[0];
                    var horizontalAlignment = args[1];
                    _this.setText(text);
                    _this.setStyle("text-align", horizontalAlignment);
                }
                else if (typeof args[0] === "string" && args[1] instanceof JSIcon) {
                    var text = args[0];
                    var icon = args[1];
                    _this.setText(text);
                    _this.setIcon(icon);
                }
                break;
            case 3:
                if (typeof args[0] === "string" && args[1] instanceof JSIcon && typeof args[2] === "string") {
                    var text = args[0];
                    var icon = args[1];
                    var horizontalAlignment = args[2];
                    _this.setText(text);
                    _this.setIcon(icon);
                    _this.setStyle("text-align", horizontalAlignment);
                }
                break;
            default:
        }
        return _this;
    }
    JSLabel.prototype.init = function () {
        this.addClass("JSLabel");
    };
    JSLabel.prototype.setIcon = function (icon) {
        _super.prototype.setIcon.call(this, icon);
        if (icon) {
            var span = this.getData("span");
            if (span) {
                var text = span.getText();
                span.setStyle("margin-left", text ? "4px" : "0");
            }
        }
    };
    JSLabel.prototype.getGraphics = function () {
        var graphics = this.getData("graphics");
        if (!graphics) {
            graphics = new JSGraphics();
            this.setData("graphics", graphics);
        }
        return graphics;
    };
    JSLabel.prototype.getText = function () {
        var span = this.getSpan();
        return span.getText();
    };
    JSLabel.prototype.setText = function (text) {
        var span = this.getSpan();
        span.setText(text);
        var icon = this.getIcon();
        if (icon) {
            span.setStyle("margin-left", text ? "4px" : "0");
        }
    };
    JSLabel.prototype.getSpan = function () {
        var span = this.getData("span");
        if (!span) {
            span = new JSSpan();
            this.add(span);
            this.setData("span", span);
        }
        return span;
    };
    JSLabel.prototype.isUndecorated = function () {
        return this.hasClass("undecorated");
    };
    JSLabel.prototype.setUndecorated = function (undecorated) {
        if (undecorated) {
            this.addClass("undecorated");
        }
        else {
            this.removeClass("undecorated");
        }
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
    function JSLayeredPane() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
        switch (args.length) {
            case 1:
                if (args[0] instanceof JSLayout) {
                    var layout = args[0];
                    _this.setLayout(layout);
                }
                break;
            default:
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
    JSLayeredPane.prototype.setLayer = function (component, layer) {
        component.setZIndex(layer);
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
    function JSMarker() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.call(this, args.length === 0 || !(args[0] instanceof SVGMarkerElement) ? document.createElementNS("http://www.w3.org/2000/svg", "marker") : args[0]) || this;
    }
    JSMarker.prototype.init = function () {
        this.addClass("JSMarker");
    };
    return JSMarker;
}(JSSVGComponent));
var JSMatteBorder = (function () {
    function JSMatteBorder(top, left, bottom, right, color) {
        this.setTop(top);
        this.setLeft(left);
        this.setBottom(bottom);
        this.setRight(right);
        this.setColor(color);
    }
    JSMatteBorder.prototype.getTop = function () {
        return this.top;
    };
    JSMatteBorder.prototype.setTop = function (top) {
        this.top = top;
    };
    JSMatteBorder.prototype.getLeft = function () {
        return this.left;
    };
    JSMatteBorder.prototype.setLeft = function (left) {
        this.left = left;
    };
    JSMatteBorder.prototype.getBottom = function () {
        return this.bottom;
    };
    JSMatteBorder.prototype.setBottom = function (bottom) {
        this.bottom = bottom;
    };
    JSMatteBorder.prototype.getRight = function () {
        return this.right;
    };
    JSMatteBorder.prototype.setRight = function (right) {
        this.right = right;
    };
    JSMatteBorder.prototype.getColor = function () {
        return this.color;
    };
    JSMatteBorder.prototype.setColor = function (color) {
        this.color = color;
    };
    JSMatteBorder.prototype.paintBorder = function (component) {
        var top = this.getTop();
        var left = this.getLeft();
        var bottom = this.getBottom();
        var right = this.getRight();
        var color = this.getColor();
        if (top) {
            component.setStyle("border-top", top + "px solid " + color);
        }
        if (left) {
            component.setStyle("border-left", left + "px solid " + color);
        }
        if (bottom) {
            component.setStyle("border-bottom", bottom + "px solid " + color);
        }
        if (right) {
            component.setStyle("border-right", right + "px solid " + color);
        }
    };
    return JSMatteBorder;
}());
var JSMenu = (function (_super) {
    __extends(JSMenu, _super);
    function JSMenu() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
        _this.delay = JSMenu.DELAY;
        var label = _this.getLabel();
        _super.prototype.add.call(_this, label);
        var graphics = _this.getGraphics();
        _super.prototype.add.call(_this, graphics);
        var popupMenuContainer = _this.getPopupMenuContainer();
        _super.prototype.add.call(_this, popupMenuContainer);
        switch (args.length) {
            case 1:
                if (args[0] instanceof JSIcon) {
                    var icon = args[0];
                    _this.setIcon(icon);
                }
                else if (typeof args[0] === "string") {
                    var text = args[0];
                    _this.setText(text);
                }
                break;
            case 2:
                if (typeof args[0] === "string" && args[1] instanceof JSIcon) {
                    var text = args[0];
                    var icon = args[1];
                    _this.setText(text);
                    _this.setIcon(icon);
                }
                break;
            default:
        }
        _this.addMouseListener({
            mousePressed: function (mouseEvent, menu) {
                var parent = menu.getParent();
                if (parent instanceof JSPopupMenu) {
                    var parentSelected = parent.isSelected();
                    if (parentSelected) {
                        parent.getSelection().setSelected(menu);
                    }
                }
                else {
                    menu.setData("changed", false);
                    var popupMenu = menu.getPopupMenu();
                    if (popupMenu) {
                        var parentSelected = parent.isSelected();
                        if (!parentSelected) {
                            parent.setSelected(true);
                            parent.getSelection().setSelected(menu);
                            menu.setData("changed", true);
                        }
                    }
                }
                mouseEvent.stopPropagation();
            },
            mouseReleased: function (mouseEvent, menu) {
                var parent = menu.getParent();
                if (!(parent instanceof JSPopupMenu)) {
                    var changed = menu.getData("changed");
                    if (!changed) {
                        var popupMenu = menu.getPopupMenu();
                        if (popupMenu) {
                            var parentSelected = parent.isSelected();
                            if (parentSelected) {
                                parent.setSelected(false);
                            }
                        }
                    }
                }
                mouseEvent.stopPropagation();
            },
            mouseEntered: function (mouseEvent, menu) {
                var parent = menu.getParent();
                if (parent instanceof JSPopupMenu) {
                    var timer = menu.getTimer();
                    timer.cancel();
                    timer.schedule({
                        run: function () {
                            var parentSelected = parent.isSelected();
                            if (parentSelected) {
                                parent.getSelection().setSelected(menu);
                            }
                        }
                    }, menu.getDelay());
                }
                else {
                    var parentSelected = parent.isSelected();
                    if (parentSelected) {
                        parent.getSelection().setSelected(menu);
                    }
                }
                mouseEvent.stopPropagation();
            },
            mouseExited: function (mouseEvent, menu) {
                var parent = menu.getParent();
                if (parent instanceof JSPopupMenu) {
                    var timer = menu.getTimer();
                    timer.cancel();
                }
            }
        }).withParameters(_this);
        return _this;
    }
    JSMenu.prototype.init = function () {
        this.addClass("JSMenu");
    };
    JSMenu.prototype.getLabel = function () {
        var label = this.getData("label");
        if (!label) {
            label = new JSLabel();
            this.setData("label", label);
        }
        return label;
    };
    JSMenu.prototype.getIcon = function () {
        var label = this.getLabel();
        return label.getIcon();
    };
    JSMenu.prototype.setIcon = function (icon) {
        var label = this.getLabel();
        label.setIcon(icon);
    };
    JSMenu.prototype.getText = function () {
        var label = this.getLabel();
        return label.getText();
    };
    JSMenu.prototype.setText = function (text) {
        var label = this.getLabel();
        label.setText(text);
    };
    JSMenu.prototype.getDelay = function () {
        return this.delay;
    };
    JSMenu.prototype.setDelay = function (delay) {
        this.delay = delay;
    };
    JSMenu.prototype.getTimer = function () {
        var timer = this.getData("timer");
        if (!timer) {
            timer = new JSTimer();
            this.setData("timer", timer);
        }
        return timer;
    };
    JSMenu.prototype.getSubmenuIcon = function () {
        return this.getData("submenuIcon");
    };
    JSMenu.prototype.setSubmenuIcon = function (icon) {
        this.setData("submenuIcon", icon);
        var graphics = this.getGraphics();
        if (graphics) {
            if (icon) {
                icon.paintIcon(this, graphics);
            }
            else {
                graphics.removeAll();
            }
            graphics.setStyle("top", "calc(50% - " + (icon.getIconHeight() / 2) + "px)");
        }
    };
    JSMenu.prototype.getGraphics = function () {
        var graphics = this.getData("graphics");
        if (!graphics) {
            graphics = new JSGraphics();
            graphics.setStyle("position", "absolute");
            graphics.setStyle("right", "0");
            this.setData("graphics", graphics);
        }
        return graphics;
    };
    JSMenu.prototype.getPopupMenuContainer = function () {
        var popupMenuContainer = this.getData("popupMenuContainer");
        if (!popupMenuContainer) {
            popupMenuContainer = new JSDiv();
            popupMenuContainer.setStyle("position", "absolute");
            this.setData("popupMenuContainer", popupMenuContainer);
        }
        return popupMenuContainer;
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
        if (component instanceof JSMenu || component instanceof JSMenuItem || component instanceof JSCheckBoxMenuItem || component instanceof JSHorizontalSeparator) {
            var popupMenu = this.getPopupMenu();
            if (!popupMenu) {
                popupMenu = new JSPopupMenu();
                this.setPopupMenu(popupMenu);
            }
            popupMenu.add(component);
            if (component instanceof JSMenu) {
                component.setStyle("display", "block");
                component.setSubmenuIcon(JSMenu.SUBMENU_ICON);
                var label = component.getLabel();
                label.setStyle("margin-right", JSMenu.SUBMENU_ICON.getIconWidth() + "px");
            }
        }
        else {
            _super.prototype.add.call(this, component);
        }
    };
    JSMenu.prototype.addSeparator = function () {
        this.add(new JSHorizontalSeparator());
    };
    JSMenu.prototype.setSelected = function (selected) {
        var popupMenu = this.getPopupMenu();
        if (popupMenu) {
            if (selected) {
                var parent = this.getParent();
                if (parent instanceof JSPopupMenu) {
                    popupMenu.show(this, this.getWidth(), 0 - this.getHeight() - popupMenu.getPaddingTop() - popupMenu.getBorderTopWidth());
                }
                else {
                    popupMenu.show(this, 0 - this.getPaddingLeft(), this.getPaddingBottom());
                }
            }
            else {
                popupMenu.setSelected(false);
            }
        }
        _super.prototype.setSelected.call(this, selected);
    };
    JSMenu.DELAY = 200;
    JSMenu.SUBMENU_ICON = new JSPathIcon("M5.17,2.34L10.83,8L5.17,13.66Z", 16, 16).withFill("gray");
    return JSMenu;
}(JSHTMLComponent));
var JSMenuBar = (function (_super) {
    __extends(JSMenuBar, _super);
    function JSMenuBar() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
        var menuContainer = _this.getMenuContainer();
        _super.prototype.add.call(_this, menuContainer);
        return _this;
    }
    JSMenuBar.prototype.init = function () {
        this.addClass("JSMenuBar");
    };
    JSMenuBar.prototype.add = function (menu) {
        var menuContainer = this.getMenuContainer();
        menuContainer.add(menu);
    };
    JSMenuBar.prototype.getMenuContainer = function () {
        var menuContainer = this.getData("menuContainer");
        if (!menuContainer) {
            menuContainer = new JSMenuContainer();
            this.setData("menuContainer", menuContainer);
        }
        return menuContainer;
    };
    return JSMenuBar;
}(JSPanel));
var JSMenuContainer = (function (_super) {
    __extends(JSMenuContainer, _super);
    function JSMenuContainer() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
        JSBody.getInstance().addMouseListener({
            mousePressed: function (mouseEvent, menuContainer) {
                menuContainer.setData("pressed", false);
                var timer = menuContainer.getTimer();
                timer.schedule({
                    run: function () {
                        var pressed = menuContainer.getData("pressed");
                        if (!pressed) {
                            menuContainer.setSelected(false);
                        }
                    }
                }, 0);
            }
        }, true).withParameters(_this);
        _this.addMouseListener({
            mousePressed: function (mouseEvent, menuContainer) {
                menuContainer.setData("pressed", true);
            }
        }, true).withParameters(_this);
        return _this;
    }
    JSMenuContainer.prototype.init = function () {
        this.addClass("JSMenuContainer");
    };
    JSMenuContainer.prototype.add = function (menu) {
        var selection = this.getSelection();
        if (!selection) {
            selection = new JSSelection();
            this.setSelection(selection);
        }
        selection.add(menu);
        menu.setStyle("display", "inline-block");
        _super.prototype.add.call(this, menu);
    };
    JSMenuContainer.prototype.setSelected = function (selected) {
        if (!selected) {
            var selection = this.getSelection();
            if (selection) {
                selection.setSelected(null);
            }
        }
        _super.prototype.setSelected.call(this, selected);
    };
    JSMenuContainer.prototype.getTimer = function () {
        var timer = this.getData("timer");
        if (!timer) {
            timer = new JSTimer();
            this.setData("timer", timer);
        }
        return timer;
    };
    return JSMenuContainer;
}(JSHTMLComponent));
var JSMenuItem = (function (_super) {
    __extends(JSMenuItem, _super);
    function JSMenuItem() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
        var label = _this.getLabel();
        _this.add(label);
        switch (args.length) {
            case 1:
                if (args[0] instanceof JSAction) {
                    var action = args[0];
                    _this.setAction(action);
                }
                else if (args[0] instanceof JSIcon) {
                    var icon = args[0];
                    _this.setIcon(icon);
                }
                else if (typeof args[0] === "string") {
                    var text = args[0];
                    _this.setText(text);
                }
                break;
            case 2:
                if (typeof args[0] === "string" && args[1] instanceof JSIcon) {
                    var text = args[0];
                    var icon = args[1];
                    _this.setText(text);
                    _this.setIcon(icon);
                }
                break;
            default:
        }
        _this.addMouseListener(_this);
        return _this;
    }
    JSMenuItem.prototype.init = function () {
        this.addClass("JSMenuItem");
    };
    JSMenuItem.prototype.getLabel = function () {
        var label = this.getData("label");
        if (!label) {
            label = new JSLabel();
            this.setData("label", label);
        }
        return label;
    };
    JSMenuItem.prototype.getIcon = function () {
        var label = this.getLabel();
        return label.getIcon();
    };
    JSMenuItem.prototype.setIcon = function (icon) {
        var label = this.getLabel();
        label.setIcon(icon);
    };
    JSMenuItem.prototype.getText = function () {
        var label = this.getLabel();
        return label.getText();
    };
    JSMenuItem.prototype.setText = function (text) {
        var label = this.getLabel();
        label.setText(text);
    };
    JSMenuItem.prototype.mouseEntered = function (mouseEvent) {
        var parent = this.getParent();
        var parentSelected = parent.isSelected();
        if (parentSelected) {
            parent.getSelection().setSelected(this);
        }
        mouseEvent.stopPropagation();
    };
    JSMenuItem.prototype.mouseClicked = function (mouseEvent) {
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
            if (parent instanceof JSMenuContainer) {
                parent.setSelected(false);
            }
            else if (invoker instanceof JSMenu) {
                invoker.setSelected(false);
            }
            else {
                popuMenu.setSelected(false);
            }
        }
        mouseEvent.stopPropagation();
    };
    return JSMenuItem;
}(JSHTMLComponent));
var JSMouseDraggedListener = (function () {
    function JSMouseDraggedListener(mouseDraggedListener) {
        this.parameters = [];
        var jsMouseDraggedListener = this;
        this.mouseDragged = function (mouseEvent) {
            var parameters = jsMouseDraggedListener.getParameters().slice();
            parameters.unshift(mouseEvent);
            mouseDraggedListener.mouseDragged.apply(mouseDraggedListener, parameters);
        };
    }
    JSMouseDraggedListener.prototype.getParameters = function () {
        return this.parameters;
    };
    JSMouseDraggedListener.prototype.setParameters = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        this.parameters = parameters;
    };
    JSMouseDraggedListener.prototype.withParameters = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        this.parameters = parameters;
        return this;
    };
    return JSMouseDraggedListener;
}());
var JSMouseListener = (function () {
    function JSMouseListener(mouseListener) {
        this.parameters = [];
        var jsMouseListener = this;
        if (mouseListener.mouseClicked) {
            this.mouseClicked = function (mouseEvent) {
                var parameters = jsMouseListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                mouseListener.mouseClicked.apply(mouseListener, parameters);
            };
        }
        if (mouseListener.mousePressed) {
            this.mousePressed = function (mouseEvent) {
                var parameters = jsMouseListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                mouseListener.mousePressed.apply(mouseListener, parameters);
            };
        }
        if (mouseListener.mouseReleased) {
            this.mouseReleased = function (mouseEvent) {
                var parameters = jsMouseListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                mouseListener.mouseReleased.apply(mouseListener, parameters);
            };
        }
        if (mouseListener.mouseEntered) {
            this.mouseEntered = function (mouseEvent) {
                var parameters = jsMouseListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                mouseListener.mouseEntered.apply(mouseListener, parameters);
            };
        }
        if (mouseListener.mouseExited) {
            this.mouseExited = function (mouseEvent) {
                var parameters = jsMouseListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                mouseListener.mouseExited.apply(mouseListener, parameters);
            };
        }
        if (mouseListener.mouseMoved) {
            this.mouseMoved = function (mouseEvent) {
                var parameters = jsMouseListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                mouseListener.mouseMoved.apply(mouseListener, parameters);
            };
        }
        if (mouseListener.mouseDragged) {
            this.mouseDragged = function (mouseEvent) {
                var parameters = jsMouseListener.getParameters().slice();
                parameters.unshift(mouseEvent);
                mouseListener.mouseDragged.apply(mouseListener, parameters);
            };
        }
    }
    JSMouseListener.prototype.getParameters = function () {
        return this.parameters;
    };
    JSMouseListener.prototype.setParameters = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        this.parameters = parameters;
    };
    JSMouseListener.prototype.withParameters = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        this.parameters = parameters;
        return this;
    };
    return JSMouseListener;
}());
var JSOption = (function (_super) {
    __extends(JSOption, _super);
    function JSOption() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLOptionElement) ? document.createElement("option") : args[0]) || this;
        switch (args.length) {
            case 1:
                if (typeof args[0] === "string") {
                    var text = args[0];
                    _this.setText(text);
                    _this.setValue(text);
                }
                break;
            default:
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
        this.element.text = "" + text;
    };
    JSOption.prototype.getValue = function () {
        return this.element.value;
    };
    JSOption.prototype.setValue = function (value) {
        this.element.value = value;
    };
    return JSOption;
}(JSHTMLComponent));
var JSP = (function (_super) {
    __extends(JSP, _super);
    function JSP() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLParagraphElement) ? document.createElement("p") : args[0]) || this;
        switch (args.length) {
            case 1:
                if (typeof args[0] === "string") {
                    var text = args[0];
                    _this.setText(text);
                }
                break;
            case 2:
                if (typeof args[0] === "string" && typeof args[1] === "string") {
                    var text = args[0];
                    var horizontalAlignment = args[1];
                    _this.setText(text);
                    _this.setStyle("text-align", horizontalAlignment);
                }
                break;
            default:
        }
        return _this;
    }
    JSP.prototype.init = function () {
        this.addClass("JSP");
    };
    return JSP;
}(JSHTMLComponent));
var JSPath = (function (_super) {
    __extends(JSPath, _super);
    function JSPath() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof SVGPathElement) ? document.createElementNS("http://www.w3.org/2000/svg", "path") : args[0]) || this;
        switch (args.length) {
            case 1:
                if (typeof args[0] === "string") {
                    var definition = args[0];
                    _this.setDefinition(definition);
                }
                break;
            default:
        }
        return _this;
    }
    JSPath.prototype.init = function () {
        this.addClass("JSPath");
    };
    JSPath.prototype.getDefinition = function () {
        return this.getAttributeNS("d");
    };
    JSPath.prototype.setDefinition = function (definition) {
        this.setAttributeNS("d", definition);
    };
    return JSPath;
}(JSSVGComponent));
var JSPathImage = (function (_super) {
    __extends(JSPathImage, _super);
    function JSPathImage() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof SVGSVGElement) ? document.createElementNS("http://www.w3.org/2000/svg", "svg") : args[0]) || this;
        var path = _this.getPath();
        _this.add(path);
        switch (args.length) {
            case 1:
                if (args[0] instanceof JSPathIcon) {
                    var icon = args[0];
                    _this.setIcon(icon);
                }
                else if (typeof args[0] === "string") {
                    var source = args[0];
                    _this.setSource(source);
                }
                break;
            case 3:
                if (typeof args[0] === "string" && typeof args[1] === "number" && typeof args[2] === "number") {
                    var source = args[0];
                    var width = args[1];
                    var height = args[2];
                    _this.setSource(source);
                    _this.setWidth(width);
                    _this.setHeight(height);
                }
                break;
            default:
        }
        return _this;
    }
    JSPathImage.prototype.init = function () {
        this.addClass("JSPathImage");
    };
    JSPathImage.prototype.getPath = function () {
        var path = this.getData("path");
        if (!path) {
            path = new JSPath();
            this.setData("path", path);
        }
        return path;
    };
    JSPathImage.prototype.getSource = function () {
        var path = this.getPath();
        return path.getDefinition();
    };
    JSPathImage.prototype.setSource = function (source) {
        var path = this.getPath();
        path.setDefinition(source);
    };
    JSPathImage.prototype.getFill = function () {
        var path = this.getPath();
        return path.getFill();
    };
    JSPathImage.prototype.setFill = function (fill) {
        var path = this.getPath();
        path.setFill(fill);
    };
    JSPathImage.prototype.getStroke = function () {
        var path = this.getPath();
        return path.getStroke();
    };
    JSPathImage.prototype.setStroke = function (stroke) {
        var path = this.getPath();
        path.setStroke(stroke);
    };
    return JSPathImage;
}(JSSVG));
var JSPopupMenu = (function (_super) {
    __extends(JSPopupMenu, _super);
    function JSPopupMenu() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
        _this.setVisible(false);
        JSBody.getInstance().addMouseListener({
            mousePressed: function (mouseEvent, popupMenu) {
                var invoker = popupMenu.getInvoker();
                if (!(invoker instanceof JSMenu)) {
                    popupMenu.setData("close", true);
                    var timer = popupMenu.getTimer();
                    timer.schedule({
                        run: function () {
                            var close = popupMenu.getData("close");
                            if (close) {
                                popupMenu.setSelected(false);
                            }
                        }
                    }, 0);
                }
            }
        }, true).withParameters(_this);
        _this.addMouseListener({
            mousePressed: function (mouseEvent, popupMenu) {
                popupMenu.setData("close", false);
            }
        }, true).withParameters(_this);
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
        this.add(new JSHorizontalSeparator());
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
    JSPopupMenu.prototype.getTimer = function () {
        var timer = this.getData("timer");
        if (!timer) {
            timer = new JSTimer();
            this.setData("timer", timer);
        }
        return timer;
    };
    return JSPopupMenu;
}(JSHTMLComponent));
var JSProgressBar = (function (_super) {
    __extends(JSProgressBar, _super);
    function JSProgressBar() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
        switch (args.length) {
            case 1:
                if (typeof args[0] === "string") {
                    var orientation = args[0];
                    _this.setOrientation(orientation);
                }
                break;
            case 2:
                if (typeof args[0] === "number" && typeof args[1] === "number") {
                    var min = args[0];
                    var max = args[1];
                    _this.setMin(min);
                    _this.setMax(max);
                }
                break;
            case 3:
                if (typeof args[0] === "string" && typeof args[1] === "number" && typeof args[2] === "number") {
                    var orientation = args[0];
                    var min = args[1];
                    var max = args[2];
                    _this.setOrientation(orientation);
                    _this.setMin(min);
                    _this.setMax(max);
                }
                break;
            default:
        }
        var bar = _this.getBar();
        _this.add(bar);
        _this.setHeight(14);
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
        var bar = this.getData("bar");
        if (!bar) {
            bar = new JSPanel();
            bar.setBackground("gray");
            bar.setHeight(12);
            this.setData("bar", bar);
        }
        return bar;
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
    JSProperties.prototype.getProperty = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var value;
        var properties = this.getProperties();
        switch (args.length) {
            case 1:
                if (typeof args[0] === "string") {
                    var key = args[0];
                    value = properties[key];
                }
            case 2:
                if (typeof args[0] === "string" && typeof args[1] === "string") {
                    var key = args[0];
                    var defaultValue = args[1];
                    value = properties[key];
                    if (value === undefined) {
                        value = defaultValue;
                    }
                }
                break;
            default:
        }
        return value;
    };
    JSProperties.prototype.setProperty = function (key, value) {
        var properties = this.getProperties();
        properties[key] = value;
    };
    JSProperties.prototype.load = function () {
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
    function JSPropertyChangeListener(propertyChangeListener) {
        this.propertyChange = propertyChangeListener.propertyChange;
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
var JSRadioButton = (function (_super) {
    __extends(JSRadioButton, _super);
    function JSRadioButton() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLInputElement) ? document.createElement("input") : args[0]) || this;
        _this.setAttribute("type", "radio");
        switch (args.length) {
            case 1:
                if (typeof args[0] === "boolean") {
                    var selected = args[0];
                    _this.setAttribute("checked", "" + selected);
                }
                break;
            default:
        }
        return _this;
    }
    JSRadioButton.prototype.init = function () {
        this.addClass("JSRadioButton");
    };
    return JSRadioButton;
}(JSHTMLComponent));
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
var JSRunnable = (function () {
    function JSRunnable(runnable) {
        this.parameters = [];
        var jsRunnable = this;
        this.run = function () {
            var parameters = jsRunnable.getParameters().slice();
            runnable.run.apply(runnable, parameters);
        };
    }
    JSRunnable.prototype.getPid = function () {
        return this.pid;
    };
    JSRunnable.prototype.setPid = function (pid) {
        this.pid = pid;
    };
    JSRunnable.prototype.getParameters = function () {
        return this.parameters;
    };
    JSRunnable.prototype.setParameters = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        this.parameters = parameters;
    };
    JSRunnable.prototype.withParameters = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        this.parameters = parameters;
        return this;
    };
    return JSRunnable;
}());
var JSScrollPane = (function (_super) {
    __extends(JSScrollPane, _super);
    function JSScrollPane() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
        var viewContainer = _this.getViewContainer();
        _this.add(viewContainer);
        _this.setVsbPolicy(JSScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);
        _this.setHsbPolicy(JSScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
        switch (args.length) {
            case 1:
                if (args[0] instanceof JSComponent) {
                    var view = args[0];
                    _this.setViewportView(view);
                }
                break;
            case 2:
                if (typeof args[0] === "string" && typeof args[1] === "string") {
                    var vsbPolicy = args[0];
                    var hsbPolicy = args[1];
                    _this.setVsbPolicy(vsbPolicy);
                    _this.setHsbPolicy(hsbPolicy);
                }
                break;
            case 3:
                if (args[0] instanceof JSComponent && typeof args[1] === "string" && typeof args[2] === "string") {
                    var view = args[0];
                    var vsbPolicy = args[1];
                    var hsbPolicy = args[2];
                    _this.setViewportView(view);
                    _this.setVsbPolicy(vsbPolicy);
                    _this.setHsbPolicy(hsbPolicy);
                }
                break;
            default:
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
    JSScrollPane.prototype.getViewContainer = function () {
        var viewContainer = this.getData("viewContainer");
        if (!viewContainer) {
            viewContainer = new JSPanel();
            this.setData("viewContainer", viewContainer);
        }
        return viewContainer;
    };
    JSScrollPane.prototype.getViewportView = function () {
        return this.getData("viewportView");
    };
    JSScrollPane.prototype.setViewportView = function (viewportView) {
        this.setData("viewportView", viewportView);
        var viewContainer = this.getViewContainer();
        if (viewportView) {
            viewContainer.removeAll();
            viewContainer.add(viewportView);
        }
        if (viewportView instanceof JSTable) {
        }
    };
    JSScrollPane.prototype.getPreferredWidth = function () {
        var preferredWidth = this.getAttribute("data-preferred-width");
        if (preferredWidth) {
            return +preferredWidth;
        }
        var viewContainer = this.getViewContainer();
        return viewContainer.getPreferredWidth();
    };
    JSScrollPane.prototype.getPreferredHeight = function () {
        var preferredHeight = this.getAttribute("data-preferred-height");
        if (preferredHeight) {
            return +preferredHeight;
        }
        var viewContainer = this.getViewContainer();
        return viewContainer.getPreferredHeight();
    };
    JSScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED = "auto";
    JSScrollPane.VERTICAL_SCROLLBAR_NEVER = "hidden";
    JSScrollPane.VERTICAL_SCROLLBAR_ALWAYS = "scroll";
    JSScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED = "auto";
    JSScrollPane.HORIZONTAL_SCROLLBAR_NEVER = "hidden";
    JSScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS = "scroll";
    return JSScrollPane;
}(JSHTMLComponent));
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
var JSSpan = (function (_super) {
    __extends(JSSpan, _super);
    function JSSpan() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.call(this, args.length === 0 || !(args[0] instanceof HTMLSpanElement) ? document.createElement("span") : args[0]) || this;
    }
    JSSpan.prototype.init = function () {
        this.addClass("JSSpan");
    };
    return JSSpan;
}(JSHTMLComponent));
var JSSplitPane = (function (_super) {
    __extends(JSSplitPane, _super);
    function JSSplitPane() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
        switch (args.length) {
            case 1:
                if (typeof args[0] === "string") {
                    var orientation = args[0];
                    _this.setOrientation(orientation);
                }
                break;
            default:
        }
        _this.setLayout(new JSSplitPaneLayout());
        var leftContainer = _this.getLeftContainer();
        _this.add(leftContainer);
        var divider = _this.getDivider();
        _this.add(divider);
        var rightContainer = _this.getRightContainer();
        _this.add(rightContainer);
        _this.setDividerSize(4);
        _this.setDividerProportionalLocation(.5);
        return _this;
    }
    JSSplitPane.prototype.init = function () {
        this.addClass("JSSplitPane");
    };
    JSSplitPane.prototype.getOrientation = function () {
        return this.getAttribute("data-orientation");
    };
    JSSplitPane.prototype.setOrientation = function (orientation) {
        this.setAttribute("data-orientation", orientation);
    };
    JSSplitPane.prototype.getLeftContainer = function () {
        var leftContainer = this.getData("leftContainer");
        if (!leftContainer) {
            leftContainer = new JSSplitPaneLeftContainer();
            this.setData("leftContainer", leftContainer);
        }
        return leftContainer;
    };
    JSSplitPane.prototype.getRightContainer = function () {
        var rightContainer = this.getData("rightContainer");
        if (!rightContainer) {
            rightContainer = new JSSplitPaneRightContainer();
            this.setData("rightContainer", rightContainer);
        }
        return rightContainer;
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
        var divider = this.getData("divider");
        if (!divider) {
            divider = new JSSplitPaneDivider();
            var orientation = this.getOrientation();
            divider.setCursor(orientation === JSSplitPane.VERTICAL_SPLIT ? "ns-resize" : "ew-resize");
            this.setData("divider", divider);
        }
        return divider;
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
    JSSplitPane.prototype.setDividerLocation = function (dividerLocation, dividerProportionalLocation) {
        if (dividerProportionalLocation === void 0) { dividerProportionalLocation = 0; }
        this.dividerLocation = dividerLocation;
        this.dividerProportionalLocation = dividerProportionalLocation;
        this.validate();
    };
    JSSplitPane.prototype.getDividerProportionalLocation = function () {
        return this.dividerProportionalLocation;
    };
    JSSplitPane.prototype.setDividerProportionalLocation = function (dividerProportionalLocation) {
        this.dividerProportionalLocation = dividerProportionalLocation;
        this.dividerLocation = 0;
        this.validate();
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
var JSSplitPaneDivider = (function (_super) {
    __extends(JSSplitPaneDivider, _super);
    function JSSplitPaneDivider() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
        _this.addMouseListener({
            mousePressed: function (mouseEvent, divider) {
                var splitPane = divider.getParent();
                var orientation = splitPane.getOrientation();
                if (orientation === JSSplitPane.VERTICAL_SPLIT) {
                    splitPane.setData("dy", mouseEvent.y - splitPane.getDividerLocation());
                }
                else {
                    splitPane.setData("dx", mouseEvent.x - splitPane.getDividerLocation());
                }
                mouseEvent.stopPropagation();
            },
            mouseDragged: function (mouseEvent, divider) {
                var splitPane = divider.getParent();
                var orientation = splitPane.getOrientation();
                if (orientation === JSSplitPane.VERTICAL_SPLIT) {
                    var y = mouseEvent.y;
                    if (y) {
                        splitPane.setDividerLocation(y - splitPane.getData("dy"), splitPane.getDividerProportionalLocation());
                    }
                }
                else {
                    var x = mouseEvent.x;
                    if (x) {
                        splitPane.setDividerLocation(x - splitPane.getData("dx"), splitPane.getDividerProportionalLocation());
                    }
                }
                mouseEvent.stopPropagation();
            }
        }).withParameters(_this);
        return _this;
    }
    JSSplitPaneDivider.prototype.init = function () {
        this.addClass("JSSplitPaneDivider");
    };
    return JSSplitPaneDivider;
}(JSPanel));
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
        var width100 = width + splitPane.getPaddingLeft() + splitPane.getPaddingRight();
        var height100 = height + splitPane.getPaddingTop() + splitPane.getPaddingBottom();
        var x = splitPane.getInsetLeft();
        var y = splitPane.getInsetTop();
        var orientation = splitPane.getOrientation();
        if (orientation === JSSplitPane.VERTICAL_SPLIT) {
            var leftContainer = splitPane.getLeftContainer();
            leftContainer.setOuterWidth(width);
            leftContainer.setX(x);
            leftContainer.setY(y);
            var divider = splitPane.getDivider();
            var dividerSize = splitPane.getDividerSize();
            divider.setOuterHeight(dividerSize);
            divider.setOuterWidth(width);
            divider.setX(x);
            var rightContainer = splitPane.getRightContainer();
            rightContainer.setOuterWidth(width);
            rightContainer.setX(x);
        }
        else {
            var leftContainer = splitPane.getLeftContainer();
            leftContainer.setOuterHeight(height);
            leftContainer.setX(x);
            leftContainer.setY(y);
            var divider = splitPane.getDivider();
            var dividerSize = splitPane.getDividerSize();
            divider.setOuterWidth(dividerSize);
            divider.setOuterHeight(height);
            divider.setY(y);
            var rightContainer = splitPane.getRightContainer();
            rightContainer.setOuterHeight(height);
            rightContainer.setY(y);
        }
        var dividerLocation = splitPane.getDividerLocation() || 0;
        var dividerProportionalLocation = splitPane.getDividerProportionalLocation() || 0;
        if (orientation === JSSplitPane.VERTICAL_SPLIT) {
            dividerLocation += dividerProportionalLocation * height100;
            var leftContainer = splitPane.getLeftContainer();
            leftContainer.setOuterHeight(dividerLocation - splitPane.getPaddingTop());
            var divider = splitPane.getDivider();
            divider.setY(dividerLocation);
            var rightContainer = splitPane.getRightContainer();
            var dividerSize = splitPane.getDividerSize();
            rightContainer.setOuterHeight(height - dividerSize - dividerLocation + splitPane.getPaddingTop());
            rightContainer.setY(dividerLocation + dividerSize);
        }
        else {
            dividerLocation += dividerProportionalLocation * width100;
            var leftContainer = splitPane.getLeftContainer();
            leftContainer.setOuterWidth(dividerLocation - splitPane.getPaddingLeft());
            var divider = splitPane.getDivider();
            divider.setX(dividerLocation);
            var rightContainer = splitPane.getRightContainer();
            var dividerSize = splitPane.getDividerSize();
            rightContainer.setOuterWidth(width - dividerSize - dividerLocation + splitPane.getPaddingLeft());
            rightContainer.setX(dividerLocation + dividerSize);
        }
    };
    return JSSplitPaneLayout;
}(JSLayout));
var JSSplitPaneLeftContainer = (function (_super) {
    __extends(JSSplitPaneLeftContainer, _super);
    function JSSplitPaneLeftContainer() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
    }
    JSSplitPaneLeftContainer.prototype.init = function () {
        this.addClass("JSSplitPaneLeftContainer");
        this.setLayout(new JSBorderLayout());
    };
    return JSSplitPaneLeftContainer;
}(JSPanel));
var JSSplitPaneRightContainer = (function (_super) {
    __extends(JSSplitPaneRightContainer, _super);
    function JSSplitPaneRightContainer() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
    }
    JSSplitPaneRightContainer.prototype.init = function () {
        this.addClass("JSSplitPaneRightContainer");
        this.setLayout(new JSBorderLayout());
    };
    return JSSplitPaneRightContainer;
}(JSPanel));
var JSSVGImage = (function (_super) {
    __extends(JSSVGImage, _super);
    function JSSVGImage() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof SVGImageElement) ? document.createElementNS("http://www.w3.org/2000/svg", "image") : args[0]) || this;
        switch (args.length) {
            case 1:
                if (args[0] instanceof JSIcon) {
                    var icon = args[0];
                    _this.setIcon(icon);
                }
                else if (typeof args[0] === "string") {
                    var source = args[0];
                    _this.setSource(source);
                }
                break;
            case 3:
                if (typeof args[0] === "string" && typeof args[1] === "number" && typeof args[2] === "number") {
                    var source = args[0];
                    var width = args[1];
                    var height = args[2];
                    _this.setSource(source);
                    _this.setWidth(width);
                    _this.setHeight(height);
                }
                break;
            default:
        }
        return _this;
    }
    JSSVGImage.prototype.init = function () {
        this.addClass("JSSVGImage");
    };
    JSSVGImage.prototype.getSource = function () {
        return this.element.getAttributeNS("http://www.w3.org/1999/xlink", "href");
    };
    JSSVGImage.prototype.setSource = function (source) {
        this.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", source);
    };
    return JSSVGImage;
}(JSSVGComponent));
var JSTab = (function (_super) {
    __extends(JSTab, _super);
    function JSTab() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
        var graphics = _this.getGraphics();
        _this.add(graphics);
        switch (args.length) {
            case 3:
                if (typeof args[0] === "string" && typeof args[1] === "boolean" && typeof args[2] === "string") {
                    var tabPlacement = args[0];
                    var closeable = args[1];
                    var text = args[2];
                    _this.setTabPlacement(tabPlacement);
                    _this.setCloseable(closeable);
                    _this.setText(text);
                }
                break;
            case 4:
                if (typeof args[0] === "string" && typeof args[1] === "boolean" && typeof args[2] === "string" && args[3] instanceof JSIcon) {
                    var tabPlacement = args[0];
                    var closeable = args[1];
                    var text = args[2];
                    var icon = args[3];
                    _this.setTabPlacement(tabPlacement);
                    _this.setCloseable(closeable);
                    _this.setText(text);
                    _this.setIcon(icon);
                }
                break;
            default:
        }
        return _this;
    }
    JSTab.prototype.init = function () {
        this.addClass("JSTab");
    };
    JSTab.prototype.getTabPlacement = function () {
        return this.getAttribute("data-tab-placement");
    };
    JSTab.prototype.setTabPlacement = function (tabPlacement) {
        this.setAttribute("data-tab-placement", tabPlacement);
        switch (tabPlacement) {
            case JSTabbedPane.RIGHT:
                this.setBorder(new JSMatteBorder(0, 0, 1, 1, "DarkGray"));
                break;
            case JSTabbedPane.LEFT:
                this.setBorder(new JSMatteBorder(0, 1, 1, 0, "DarkGray"));
                break;
            case JSTabbedPane.BOTTOM:
                this.setBorder(new JSMatteBorder(0, 0, 1, 1, "DarkGray"));
                break;
            case JSTabbedPane.TOP:
            default:
                this.setBorder(new JSMatteBorder(1, 0, 0, 1, "DarkGray"));
        }
        var graphics = this.getGraphics();
        if (tabPlacement === JSTabbedPane.LEFT || tabPlacement === JSTabbedPane.RIGHT) {
            graphics.setStyle("display", "block");
            graphics.setStyle("margin", "4px auto 0");
        }
        else {
            graphics.setStyle("margin-left", "4px");
            graphics.setStyle("vertical-align", "middle");
        }
    };
    JSTab.prototype.isCloseable = function () {
        var button = this.getCloseButton();
        return !!button;
    };
    JSTab.prototype.setCloseable = function (closeable) {
        if (closeable) {
            var button = this.getCloseButton();
            if (!button) {
                button = new JSButton(JSTab.CLOSE_ICON);
                var tabPlacement = this.getTabPlacement();
                if (tabPlacement === JSTabbedPane.LEFT || tabPlacement === JSTabbedPane.RIGHT) {
                    button.setStyle("margin", "0 auto 4px");
                }
                else {
                    button.setStyle("margin-right", "4px");
                    button.setStyle("vertical-align", "middle");
                }
                this.setCloseButton(button);
            }
        }
        else {
            this.setCloseButton(null);
        }
    };
    JSTab.prototype.getCloseButton = function () {
        return this.getData("closeButton");
    };
    JSTab.prototype.setCloseButton = function (closeButton) {
        var oldCloseButton = this.getData("closeButton");
        if (oldCloseButton) {
            this.remove(oldCloseButton);
        }
        if (closeButton) {
            this.add(closeButton);
        }
        this.setData("closeButton", closeButton);
    };
    JSTab.prototype.getText = function () {
        return this.getData("text");
    };
    JSTab.prototype.setText = function (text) {
        var label = this.getLabel();
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
    JSTab.prototype.getLabel = function () {
        var label = this.getData("label");
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
            var button = this.getCloseButton();
            if (button) {
                var components = this.getComponents();
                var index = components.indexOf(button);
                this.add(label, null, index);
            }
            else {
                this.add(label);
            }
            this.setData("label", label);
        }
        return label;
    };
    JSTab.prototype.getGraphics = function () {
        var graphics = this.getData("graphics");
        if (!graphics) {
            graphics = new JSGraphics();
            this.setData("graphics", graphics);
        }
        return graphics;
    };
    JSTab.prototype.setSelected = function (selected) {
        this.setBackground(selected ? "white" : "#BFBFBF");
        var label = this.getLabel();
        if (label) {
            label.setForeground(selected ? "black" : "#404040");
        }
        _super.prototype.setSelected.call(this, selected);
    };
    JSTab.CLOSE_ICON = new JSPathIcon("M0,0L8,8M8,0L0,8", 8, 8).withStroke("red");
    return JSTab;
}(JSPanel));
var JSTabbedPane = (function (_super) {
    __extends(JSTabbedPane, _super);
    function JSTabbedPane() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
        switch (args.length) {
            case 1:
                if (typeof args[0] === "string") {
                    var tabPlacement = args[0];
                    _this.setTabPlacement(tabPlacement);
                }
                break;
            default:
        }
        _this.setLayout(new JSBorderLayout());
        var tabContainer = _this.getTabContainer();
        var tabPlacement = _this.getTabPlacement();
        switch (tabPlacement) {
            case JSTabbedPane.LEFT:
                _this.add(tabContainer, JSBorderLayout.WEST);
                break;
            case JSTabbedPane.RIGHT:
                _this.add(tabContainer, JSBorderLayout.EAST);
                break;
            case JSTabbedPane.BOTTOM:
                _this.add(tabContainer, JSBorderLayout.SOUTH);
                break;
            case JSTabbedPane.TOP:
            default:
                _this.add(tabContainer, JSBorderLayout.NORTH);
        }
        var cardContainer = _this.getCardContainer();
        _this.add(cardContainer);
        var buttonContainer = _this.getButtonContainer();
        tabContainer.add(buttonContainer);
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
    JSTabbedPane.prototype.addTab = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var tab;
        var tabContainer = this.getTabContainer();
        switch (args.length) {
            case 2:
                if (typeof args[0] === "string" && args[1] instanceof JSComponent) {
                    var title = args[0];
                    var component = args[1];
                    tab = tabContainer.addTab(title);
                }
                break;
            case 3:
                if (typeof args[0] === "string" && args[1] instanceof JSIcon && args[2] instanceof JSComponent) {
                    var title = args[0];
                    var icon = args[1];
                    var component = args[2];
                    tab = tabContainer.addTab(title, icon);
                }
                break;
            default:
        }
        var cardContainer = this.getCardContainer();
        cardContainer.add(component);
        this.setSelectedIndex(this.indexOfTab(tab));
        tab.addActionListener({
            actionPerformed: function (mouseEvent, tab, tabbedPane) {
                tabbedPane.setSelectedIndex(tabbedPane.indexOfTab(tab));
                mouseEvent.stopPropagation();
            }
        }).withParameters(tab, this);
        return tab;
    };
    JSTabbedPane.prototype.addCloseableTab = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var tab;
        var tabContainer = this.getTabContainer();
        switch (args.length) {
            case 2:
                if (typeof args[0] === "string" && args[1] instanceof JSComponent) {
                    var title = args[0];
                    var component = args[1];
                    tab = tabContainer.addCloseabeTab(title);
                }
                break;
            case 3:
                if (typeof args[0] === "string" && args[1] instanceof JSIcon && args[2] instanceof JSComponent) {
                    var title = args[0];
                    var icon = args[1];
                    var component = args[2];
                    tab = tabContainer.addCloseabeTab(title, icon);
                }
                break;
            default:
        }
        var cardContainer = this.getCardContainer();
        cardContainer.add(component);
        this.setSelectedIndex(this.indexOfTab(tab));
        tab.addActionListener({
            actionPerformed: function (mouseEvent, tab, tabbedPane) {
                tabbedPane.setSelectedIndex(tabbedPane.indexOfTab(tab));
                mouseEvent.stopPropagation();
            }
        }).withParameters(tab, this);
        var closeButton = tab.getCloseButton();
        closeButton.addActionListener({
            actionPerformed: function (mouseEvent, tab, tabbedPane) {
                tabbedPane.removeTabAt(tabbedPane.indexOfTab(tab));
                var tabContainer = tabbedPane.getTabContainer();
                tabContainer.getParent().validate();
                var selectedIndex = tabbedPane.getSelectedIndex();
                if (selectedIndex === -1) {
                    tabbedPane.setSelectedIndex(0);
                }
            }
        }).withParameters(tab, this);
        return tab;
    };
    JSTabbedPane.prototype.getTabContainer = function () {
        var tabContainer = this.getData("tabContainer");
        if (!tabContainer) {
            var tabPlacement = this.getTabPlacement();
            tabContainer = new JSTabbedPaneTabContainer(tabPlacement);
            this.setData("tabContainer", tabContainer);
        }
        return tabContainer;
    };
    JSTabbedPane.prototype.getCardContainer = function () {
        var cardContainer = this.getData("cardContainer");
        if (!cardContainer) {
            cardContainer = new JSTabbedPaneCardContainer();
            this.setData("cardContainer", cardContainer);
        }
        return cardContainer;
    };
    JSTabbedPane.prototype.getButtonContainer = function () {
        var buttonContainer = this.getData("buttonContainer");
        if (!buttonContainer) {
            var tabPlacement = this.getTabPlacement();
            buttonContainer = new JSTabbedPaneButtonContainer(tabPlacement);
            this.setData("buttonContainer", buttonContainer);
        }
        return buttonContainer;
    };
    JSTabbedPane.prototype.removeTabAt = function (index) {
        var tabContainer = this.getTabContainer();
        var tabComponent = tabContainer.getTabComponentAt(index);
        tabContainer.remove(tabComponent);
        var cardContainer = this.getCardContainer();
        cardContainer.remove(index);
    };
    JSTabbedPane.prototype.setTabComponentAt = function (index, tabComponent) {
        var tabContainer = this.getTabContainer();
        tabContainer.setTabComponentAt(index, tabComponent);
        this.setSelectedIndex(index);
    };
    JSTabbedPane.prototype.indexOfComponent = function (component) {
        var cardContainer = this.getCardContainer();
        var components = cardContainer.getComponents();
        return components.indexOf(component);
    };
    JSTabbedPane.prototype.getComponentAt = function (index) {
        var cardContainer = this.getCardContainer();
        var components = cardContainer.getComponents();
        return components[index];
    };
    JSTabbedPane.prototype.indexOfTab = function (tabComponent) {
        var tabContainer = this.getTabContainer();
        return tabContainer.indexOfTab(tabComponent);
    };
    JSTabbedPane.prototype.getSelectedIndex = function () {
        var tabContainer = this.getTabContainer();
        return tabContainer.getSelectedIndex();
    };
    JSTabbedPane.prototype.setSelectedIndex = function (selectedIndex) {
        var tabContainer = this.getTabContainer();
        var tabSelection = tabContainer.getTabSelection();
        tabContainer.setSelectedIndex(selectedIndex);
        var cardContainer = this.getCardContainer();
        cardContainer.getLayout().show(cardContainer, this.getSelectedIndex());
    };
    JSTabbedPane.prototype.getTabCount = function () {
        var tabContainer = this.getTabContainer();
        return tabContainer.getTabCount();
    };
    JSTabbedPane.prototype.getTabComponentAt = function (index) {
        var tabContainer = this.getTabContainer();
        return tabContainer.getTabComponentAt(index);
    };
    return JSTabbedPane;
}(JSHTMLComponent));
var JSTabbedPaneButtonContainer = (function (_super) {
    __extends(JSTabbedPaneButtonContainer, _super);
    function JSTabbedPaneButtonContainer() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
        switch (args.length) {
            case 1:
                if (typeof args[0] === "string") {
                    var tabPlacement = args[0];
                    _this.setTabPlacement(tabPlacement);
                }
                break;
            default:
        }
        var tabPlacement = _this.getTabPlacement();
        switch (tabPlacement) {
            case JSTabbedPane.LEFT:
                _this.setLayout(new JSFlowLayout(JSFlowLayout.WEST, JSFlowLayout.BOTTOM));
                _this.setAlign(JSFlowLayout.TOP);
                _this.setStyle("border-bottom", "1px solid darkGray");
                break;
            case JSTabbedPane.RIGHT:
                _this.setLayout(new JSFlowLayout(JSFlowLayout.EAST, JSFlowLayout.BOTTOM));
                _this.setAlign(JSFlowLayout.TOP);
                _this.setStyle("border-bottom", "1px solid darkGray");
                break;
            case JSTabbedPane.BOTTOM:
                _this.setLayout(new JSFlowLayout(JSFlowLayout.SOUTH, JSFlowLayout.RIGHT));
                _this.setAlign(JSFlowLayout.RIGHT);
                _this.setStyle("border-left", "1px solid darkGray");
                break;
            case JSTabbedPane.TOP:
            default:
                _this.setLayout(new JSFlowLayout(JSFlowLayout.NORTH, JSFlowLayout.RIGHT));
                _this.setAlign(JSFlowLayout.RIGHT);
                _this.setStyle("border-left", "1px solid darkGray");
        }
        return _this;
    }
    JSTabbedPaneButtonContainer.prototype.init = function () {
        this.addClass("JSTabbedPaneButtonContainer");
    };
    JSTabbedPaneButtonContainer.prototype.getTabPlacement = function () {
        return this.getAttribute("data-tab-placement");
    };
    JSTabbedPaneButtonContainer.prototype.setTabPlacement = function (tabPlacement) {
        this.setAttribute("data-tab-placement", tabPlacement);
    };
    return JSTabbedPaneButtonContainer;
}(JSPanel));
var JSTabbedPaneCardContainer = (function (_super) {
    __extends(JSTabbedPaneCardContainer, _super);
    function JSTabbedPaneCardContainer() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
    }
    JSTabbedPaneCardContainer.prototype.init = function () {
        this.addClass("JSTabbedPaneCardContainer");
        this.setLayout(new JSCardLayout());
    };
    return JSTabbedPaneCardContainer;
}(JSPanel));
var JSTabbedPaneTabContainer = (function (_super) {
    __extends(JSTabbedPaneTabContainer, _super);
    function JSTabbedPaneTabContainer() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
        switch (args.length) {
            case 1:
                if (typeof args[0] === "string") {
                    var tabPlacement = args[0];
                    _this.setTabPlacement(tabPlacement);
                }
                break;
            default:
        }
        var tabPlacement = _this.getTabPlacement();
        switch (tabPlacement) {
            case JSTabbedPaneTabContainer.LEFT:
                _this.setLayout(new JSFlowLayout(JSFlowLayout.WEST, JSFlowLayout.TOP));
                break;
            case JSTabbedPaneTabContainer.RIGHT:
                _this.setLayout(new JSFlowLayout(JSFlowLayout.EAST, JSFlowLayout.TOP));
                break;
            case JSTabbedPaneTabContainer.BOTTOM:
                _this.setLayout(new JSFlowLayout(JSFlowLayout.SOUTH, JSFlowLayout.LEFT));
                break;
            case JSTabbedPaneTabContainer.TOP:
            default:
                _this.setLayout(new JSFlowLayout(JSFlowLayout.NORTH, JSFlowLayout.LEFT));
        }
        var tabSelection = _this.getTabSelection();
        if (!tabSelection) {
            tabSelection = new JSSelection();
            _this.setTabSelection(tabSelection);
        }
        return _this;
    }
    JSTabbedPaneTabContainer.prototype.init = function () {
        this.addClass("JSTabbedPaneTabContainer");
    };
    JSTabbedPaneTabContainer.prototype.getTabPlacement = function () {
        return this.getAttribute("data-tab-placement");
    };
    JSTabbedPaneTabContainer.prototype.setTabPlacement = function (tabPlacement) {
        this.setAttribute("data-tab-placement", tabPlacement);
    };
    JSTabbedPaneTabContainer.prototype.addTab = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var tabPlacement = this.getTabPlacement();
        var tab;
        switch (args.length) {
            case 1:
                if (typeof args[0] === "string") {
                    var title = args[0];
                    tab = new JSTab(tabPlacement || JSTabbedPaneTabContainer.TOP, false, title);
                }
                break;
            case 2:
                if (typeof args[0] === "string" && args[1] instanceof JSIcon) {
                    var title = args[0];
                    var icon = args[1];
                    tab = new JSTab(tabPlacement || JSTabbedPaneTabContainer.TOP, false, title, icon);
                }
                break;
            default:
        }
        var tabPlacement = this.getTabPlacement();
        switch (tabPlacement) {
            case JSTabbedPaneTabContainer.LEFT:
                tab.setAlign(JSFlowLayout.RIGHT);
                break;
            case JSTabbedPaneTabContainer.RIGHT:
                tab.setAlign(JSFlowLayout.LEFT);
                break;
            case JSTabbedPaneTabContainer.BOTTOM:
                tab.setAlign(JSFlowLayout.TOP);
                break;
            case JSTabbedPaneTabContainer.TOP:
            default:
                tab.setAlign(JSFlowLayout.BOTTOM);
        }
        var tabSelection = this.getTabSelection();
        tabSelection.add(tab);
        var selected = tabSelection.getSelected();
        if (!selected) {
            tabSelection.setSelectedIndex(0);
        }
        this.add(tab);
        var tabs = this.getTabs();
        tabs.push(tab);
        return tab;
    };
    JSTabbedPaneTabContainer.prototype.addCloseabeTab = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var tabPlacement = this.getTabPlacement();
        var tab;
        switch (args.length) {
            case 1:
                if (typeof args[0] === "string") {
                    var title = args[0];
                    var closeable = args[1];
                    tab = new JSTab(tabPlacement || JSTabbedPaneTabContainer.TOP, true, title);
                }
                break;
            case 2:
                if (typeof args[0] === "string" && args[1] instanceof JSIcon) {
                    var title = args[0];
                    var icon = args[1];
                    var closeable = args[2];
                    tab = new JSTab(tabPlacement || JSTabbedPaneTabContainer.TOP, true, title, icon);
                }
                break;
            default:
        }
        var tabPlacement = this.getTabPlacement();
        switch (tabPlacement) {
            case JSTabbedPaneTabContainer.LEFT:
                tab.setAlign(JSFlowLayout.RIGHT);
                break;
            case JSTabbedPaneTabContainer.RIGHT:
                tab.setAlign(JSFlowLayout.LEFT);
                break;
            case JSTabbedPaneTabContainer.BOTTOM:
                tab.setAlign(JSFlowLayout.TOP);
                break;
            case JSTabbedPaneTabContainer.TOP:
            default:
                tab.setAlign(JSFlowLayout.BOTTOM);
        }
        var tabSelection = this.getTabSelection();
        tabSelection.add(tab);
        var selected = tabSelection.getSelected();
        if (!selected) {
            tabSelection.setSelectedIndex(0);
        }
        this.add(tab);
        var tabs = this.getTabs();
        tabs.push(tab);
        return tab;
    };
    JSTabbedPaneTabContainer.prototype.addButton = function (button) {
        var tabPlacement = this.getTabPlacement();
        switch (tabPlacement) {
            case JSTabbedPaneTabContainer.RIGHT:
                break;
            case JSTabbedPaneTabContainer.LEFT:
                break;
            case JSTabbedPaneTabContainer.BOTTOM:
            case JSTabbedPaneTabContainer.TOP:
            default:
                button.setStyle("float", "right");
        }
        this.add(button);
    };
    JSTabbedPaneTabContainer.prototype.remove = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var component;
        switch (args.length) {
            case 1:
                if (args[0] instanceof JSComponent) {
                    component = args[0];
                }
                else if (typeof args[0] === "number") {
                    var index = args[0];
                    var components = this.getComponents();
                    component = components[index];
                }
                break;
            default:
        }
        var tabSelection = this.getTabSelection();
        tabSelection.remove(component);
        _super.prototype.remove.call(this, component);
        var tabs = this.getTabs();
        var index = tabs.indexOf(component);
        tabs.splice(index, 1);
    };
    JSTabbedPaneTabContainer.prototype.getTabSelection = function () {
        return this.getData("tabSelection");
    };
    JSTabbedPaneTabContainer.prototype.setTabSelection = function (tabSelection) {
        this.setData("tabSelection", tabSelection);
    };
    JSTabbedPaneTabContainer.prototype.getTabs = function () {
        var tabs = this.getData("tabs");
        if (tabs === undefined) {
            tabs = [];
            this.setData("tabs", tabs);
        }
        return tabs;
    };
    JSTabbedPaneTabContainer.prototype.getTabCount = function () {
        var tabs = this.getTabs();
        return tabs.length;
    };
    JSTabbedPaneTabContainer.prototype.getTabComponentAt = function (index) {
        var tabs = this.getTabs();
        return tabs[index];
    };
    JSTabbedPaneTabContainer.prototype.indexOfTab = function (tab) {
        var tabs = this.getTabs();
        return tabs.indexOf(tab);
    };
    JSTabbedPaneTabContainer.prototype.setTabComponentAt = function (index, tab) {
        var tabSelection = this.getTabSelection();
        tabSelection.add(tab);
        var selected = tabSelection.getSelected();
        if (!selected) {
            tabSelection.setSelectedIndex(0);
        }
        var tabs = this.getTabs();
        tabs.push(tab);
        return tab;
    };
    JSTabbedPaneTabContainer.prototype.getSelectedIndex = function () {
        var tabSelection = this.getTabSelection();
        return tabSelection.getSelectedIndex();
    };
    JSTabbedPaneTabContainer.prototype.setSelectedIndex = function (selectedIndex) {
        var tabSelection = this.getTabSelection();
        tabSelection.setSelectedIndex(selectedIndex);
    };
    return JSTabbedPaneTabContainer;
}(JSPanel));
var JSTable = (function (_super) {
    __extends(JSTable, _super);
    function JSTable() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLTableElement) ? document.createElement("table") : args[0]) || this;
        var tableHeader = _this.getTableHeader();
        _this.add(tableHeader);
        var tableBody = _this.getTableBody();
        _this.add(tableBody);
        switch (args.length) {
            case 2:
                if (args[0] instanceof Array && args[1] instanceof Array) {
                    var rows = args[0];
                    var columns = args[1];
                    _this.setRows(rows);
                    _this.setColumns(columns);
                }
                break;
            default:
        }
        return _this;
    }
    JSTable.prototype.init = function () {
        this.addClass("JSTable");
    };
    JSTable.prototype.getTableHeader = function () {
        var tableHeader = this.getData("tableHeader");
        if (!tableHeader) {
            tableHeader = new JSTableHeader();
            this.setData("tableHeader", tableHeader);
        }
        return tableHeader;
    };
    JSTable.prototype.getTableBody = function () {
        var tableBody = this.getData("tableBody");
        if (!tableBody) {
            tableBody = new JSTableBody();
            this.setData("tableBody", tableBody);
        }
        return tableBody;
    };
    JSTable.prototype.getColumns = function () {
        var tableHeader = this.getTableHeader();
        return tableHeader.getColumns();
    };
    JSTable.prototype.setColumns = function (columns) {
        var tableHeader = this.getTableHeader();
        tableHeader.setColumns(columns);
    };
    JSTable.prototype.getRows = function () {
        var tableBody = this.getTableBody();
        return tableBody.getRows();
    };
    JSTable.prototype.setRows = function (rows) {
        var tableBody = this.getTableBody();
        tableBody.setRows(rows);
    };
    return JSTable;
}(JSHTMLComponent));
var JSTableBody = (function (_super) {
    __extends(JSTableBody, _super);
    function JSTableBody() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLTableSectionElement) ? document.createElement("tbody") : args[0]) || this;
        _this.setEditable(true);
        return _this;
    }
    JSTableBody.prototype.init = function () {
        this.addClass("JSTableBody");
    };
    JSTableBody.prototype.getRows = function () {
        var rows = [];
        var components = this.getComponents();
        for (var i = 0; i < components.length; i++) {
            var tableRow = components[i];
            rows.push(tableRow.getValues());
        }
        return rows;
    };
    JSTableBody.prototype.setRows = function (rows) {
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var tableRow = new JSTableRow(row);
            this.add(tableRow);
        }
    };
    return JSTableBody;
}(JSHTMLComponent));
var JSTableCell = (function (_super) {
    __extends(JSTableCell, _super);
    function JSTableCell() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLTableCellElement) ? document.createElement("td") : args[0]) || this;
        switch (args.length) {
            case 1:
                if (!(args[0] instanceof HTMLTableCellElement)) {
                    var value = args[0];
                    _this.setValue(value);
                }
                break;
            default:
        }
        return _this;
    }
    JSTableCell.prototype.init = function () {
        this.addClass("JSTableCell");
    };
    JSTableCell.prototype.getValue = function () {
        return this.getData("value") || this.getText();
    };
    JSTableCell.prototype.setValue = function (value) {
        if (typeof value === "string") {
            this.setText(value);
        }
        else {
            this.setText("" + value);
            this.setData("value", value);
        }
    };
    return JSTableCell;
}(JSHTMLComponent));
var JSTableHeader = (function (_super) {
    __extends(JSTableHeader, _super);
    function JSTableHeader() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLTableSectionElement) ? document.createElement("thead") : args[0]) || this;
        var tableHeaderRow = _this.getTableHeaderRow();
        _this.add(tableHeaderRow);
        return _this;
    }
    JSTableHeader.prototype.init = function () {
        this.addClass("JSTableHeader");
    };
    JSTableHeader.prototype.getTableHeaderRow = function () {
        var tableHeaderRow = this.getData("tableHeaderRow");
        if (!tableHeaderRow) {
            tableHeaderRow = new JSTableRow();
            this.setData("tableHeaderRow", tableHeaderRow);
        }
        return tableHeaderRow;
    };
    JSTableHeader.prototype.getColumns = function () {
        var columns = [];
        var tableHeaderRow = this.getTableHeaderRow();
        var components = tableHeaderRow.getComponents();
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            columns.push(component.getText());
        }
        return columns;
    };
    JSTableHeader.prototype.setColumns = function (columns) {
        var tableHeaderRow = this.getTableHeaderRow();
        for (var i = 0; i < columns.length; i++) {
            var column = columns[i];
            tableHeaderRow.add(new JSTableHeaderCell(column));
        }
    };
    return JSTableHeader;
}(JSHTMLComponent));
var JSTableHeaderCell = (function (_super) {
    __extends(JSTableHeaderCell, _super);
    function JSTableHeaderCell() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLTableCellElement) ? document.createElement("th") : args[0]) || this;
        var container = _this.getContainer();
        _this.add(container);
        switch (args.length) {
            case 1:
                if (typeof args[0] === "string") {
                    var text = args[0];
                    _this.setText(text);
                }
                break;
            default:
        }
        return _this;
    }
    JSTableHeaderCell.prototype.init = function () {
        this.addClass("JSTableHeaderCell");
    };
    JSTableHeaderCell.prototype.getContainer = function () {
        var container = this.getData("container");
        if (!container) {
            container = new JSDiv();
            this.setData("container", container);
        }
        return container;
    };
    JSTableHeaderCell.prototype.getText = function () {
        var container = this.getContainer();
        return container.getText();
    };
    JSTableHeaderCell.prototype.setText = function (text) {
        var container = this.getContainer();
        container.setText(text);
    };
    return JSTableHeaderCell;
}(JSHTMLComponent));
var JSTableRow = (function (_super) {
    __extends(JSTableRow, _super);
    function JSTableRow() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLTableRowElement) ? document.createElement("tr") : args[0]) || this;
        switch (args.length) {
            case 1:
                if (args[0] instanceof Array) {
                    var values = args[0];
                    _this.setValues(values);
                }
                break;
            default:
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
            var tableCell = components[i];
            values.push(tableCell.getValue());
        }
        return values;
    };
    JSTableRow.prototype.setValues = function (values) {
        for (var i = 0; i < values.length; i++) {
            var value = values[i];
            var tableCell = new JSTableCell(value);
            this.add(tableCell);
        }
    };
    return JSTableRow;
}(JSHTMLComponent));
var JSTextArea = (function (_super) {
    __extends(JSTextArea, _super);
    function JSTextArea() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLTextAreaElement) ? document.createElement("textarea") : args[0]) || this;
        switch (args.length) {
            case 0:
                break;
            case 1:
                if (typeof args[0] === "string") {
                    var text = args[0];
                    _this.setText(text);
                }
                break;
            case 2:
                if (typeof args[0] === "number" && typeof args[1] === "number") {
                    var rows = args[0];
                    var columns = args[1];
                    _this.setRows(rows);
                    _this.setColumns(columns);
                }
                break;
            case 3:
                if (typeof args[0] === "string" && typeof args[1] === "number" && typeof args[2] === "number") {
                    var text = args[0];
                    var rows = args[1];
                    var columns = args[2];
                    _this.setText(text);
                    _this.setRows(rows);
                    _this.setColumns(columns);
                }
                break;
            default:
        }
        return _this;
    }
    JSTextArea.prototype.init = function () {
        this.addClass("JSTextArea");
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
    function JSTextField() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLInputElement) ? document.createElement("input") : args[0]) || this;
        _this.setAttribute("type", "text");
        switch (args.length) {
            case 1:
                if (typeof args[0] === "number") {
                    var columns = args[0];
                    _this.setColumns(columns);
                }
                else if (typeof args[0] === "string") {
                    var text = args[0];
                    _this.setText(text);
                }
                break;
            case 2:
                if (typeof args[0] === "string" && typeof args[1] === "number") {
                    var text = args[0];
                    var columns = args[1];
                    _this.setText(text);
                    _this.setColumns(columns);
                }
                break;
            default:
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
var JSTimer = (function () {
    function JSTimer() {
        this.pids = {};
    }
    JSTimer.prototype.getPids = function () {
        return this.pids;
    };
    JSTimer.prototype.schedule = function (runnable, delay) {
        var jsRunnable = new JSRunnable(runnable);
        var pids = this.getPids();
        var pid = setTimeout(function () {
            jsRunnable.run();
            var pid = jsRunnable.getPid();
            delete pids["" + pid];
        }, delay);
        pids["" + pid] = null;
        jsRunnable.setPid(pid);
        return jsRunnable;
    };
    JSTimer.prototype.cancel = function () {
        var pids = this.getPids();
        for (var pid in pids) {
            clearTimeout(+pid);
            delete pids[pid];
        }
    };
    return JSTimer;
}());
var JSToolBar = (function (_super) {
    __extends(JSToolBar, _super);
    function JSToolBar() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
    }
    JSToolBar.prototype.init = function () {
        this.addClass("JSToolBar");
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
    function JSTree() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
        switch (args.length) {
            case 1:
                if (args[0] instanceof JSTreeNode) {
                    var root = args[0];
                    _this.setRoot(root);
                }
                break;
            default:
        }
        _this.setLayout(new JSTreeLayout());
        _this.setRootVisible(true);
        return _this;
    }
    JSTree.prototype.init = function () {
        this.addClass("JSTree");
    };
    JSTree.prototype.getRoot = function () {
        var root = this.getData("root");
        if (!root) {
            root = new JSTreeNode();
            this.setRoot(root);
        }
        return root;
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
            this.setData("treeCells", treeCells);
        }
        return treeCells;
    };
    JSTree.prototype.removeTreeCells = function () {
        this.setData("treeCells", {});
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
        var container = this;
        var parentNode = treeNode.getParent();
        if (parentNode) {
            var parentTreeCell = this.getTreeCell(parentNode.getTreePath());
            container = parentTreeCell.getContainer();
            if (!container) {
                container = new JSDiv();
                container.setStyle("display", "none");
                var grandParentContainer = this;
                var grandParentNode = parentNode.getParent();
                if (grandParentNode) {
                    var grandParentTreeCell = this.getTreeCell(grandParentNode.getTreePath());
                    grandParentContainer = grandParentTreeCell.getContainer();
                }
                grandParentContainer.add(container);
                parentTreeCell.setContainer(container);
            }
        }
        var treeCellRenderer = this.getTreeCellRenderer();
        var treeCell = treeCellRenderer.getTreeCellRendererComponent(this, treeNode);
        container.add(treeCell);
        var treePath = treeNode.getTreePath();
        this.setTreeCell(treePath, treeCell);
        treeCell.addMouseListener({
            mousePressed: function (mouseEvent, treeCell, tree) {
                tree.setSelectionTreeNode(treeCell.getValue());
            }
        }).withParameters(treeCell, this);
    };
    JSTree.prototype.getSelectionTreeNode = function () {
        return this.selectionTreeNode;
    };
    JSTree.prototype.setSelectionTreeNode = function (selectionTreeNode) {
        this.selectionTreeNode = selectionTreeNode;
    };
    JSTree.prototype.expand = function (treeNode) {
        treeNode.setExpanded(true);
        var treePath = treeNode.getTreePath();
        var treeCell = this.getTreeCell(treePath);
        if (!treeCell) {
            this.validate();
        }
        treeCell = this.getTreeCell(treePath);
        var container = treeCell.getContainer();
        container.setStyle("display", "");
        var treeCell = this.getTreeCell(treePath);
        treeCell.setOpenIcon(JSTreeCell.EXPANDED_PATH_ICON);
    };
    JSTree.prototype.collapse = function (treeNode) {
        treeNode.setExpanded(false);
        var treePath = treeNode.getTreePath();
        var treeCell = this.getTreeCell(treePath);
        if (!treeCell) {
            this.validate();
        }
        treeCell = this.getTreeCell(treePath);
        var container = treeCell.getContainer();
        container.setStyle("display", "none");
        var treeCell = this.getTreeCell(treePath);
        treeCell.setClosedIcon(JSTreeCell.COLLAPSED_PATH_ICON);
    };
    JSTree.prototype.load = function () {
        this.removeAll();
        this.removeTreeCells();
        var rootVisible = this.isRootVisible();
        this.loadTreeNode(this.getRoot());
        var root = this.getRoot();
        var rootTreeCell = this.getTreeCell(root.getTreePath());
        rootTreeCell.setStyle("display", rootVisible ? "" : "none");
        var rootContainer = rootTreeCell.getContainer();
        rootContainer.setStyle("display", "");
    };
    JSTree.prototype.loadTreeNode = function (treeNode) {
        this.addTreeNode(treeNode);
        var treeCell = this.getTreeCell(treeNode.getTreePath());
        var children = treeNode.children();
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            this.loadTreeNode(child);
        }
    };
    return JSTree;
}(JSHTMLComponent));
var JSTreeLayout = (function (_super) {
    __extends(JSTreeLayout, _super);
    function JSTreeLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSTreeLayout.prototype.preferredLayoutWidth = function (tree) {
        var preferredLayoutWidth = 0;
        var components = tree.getComponents();
        if (!components.length) {
            tree.load();
        }
        var treeCells = tree.getTreeCells();
        for (var treePath in treeCells) {
            var treeCell = treeCells[treePath];
            var treeCellPreferredWidth = treeCell.getPreferredWidth();
            preferredLayoutWidth = Math.max(preferredLayoutWidth, treeCellPreferredWidth);
        }
        return preferredLayoutWidth;
    };
    JSTreeLayout.prototype.preferredLayoutHeight = function (tree) {
        var components = tree.getComponents();
        if (!components.length) {
            tree.load();
        }
        return _super.prototype.preferredLayoutHeight.call(this, tree);
    };
    JSTreeLayout.prototype.layoutContainer = function (tree) {
        var components = tree.getComponents();
        if (!components.length) {
            tree.load();
        }
    };
    return JSTreeLayout;
}(JSLayout));
var JSTreeCell = (function (_super) {
    __extends(JSTreeCell, _super);
    function JSTreeCell() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
        var graphics = _this.getGraphics();
        _super.prototype.add.call(_this, graphics);
        var label = _this.getLabel();
        _this.add(label);
        switch (args.length) {
            case 1:
                if (!(args[0] instanceof HTMLDivElement)) {
                    var value = args[0];
                    _this.setValue(value);
                }
                break;
            case 2:
                if (args[1] instanceof JSIcon) {
                    var value = args[0];
                    var icon = args[1];
                    _this.setValue(value);
                    _this.setIcon(icon);
                }
                break;
            default:
        }
        return _this;
    }
    JSTreeCell.prototype.init = function () {
        this.addClass("JSTreeCell");
    };
    JSTreeCell.prototype.getValue = function () {
        return this.getData("value");
    };
    JSTreeCell.prototype.setValue = function (value) {
        this.setData("value", value);
        this.setText("" + value);
        var children = value.children();
        if (children.length) {
            var closedIcon = this.getClosedIcon();
            var openIcon = this.getOpenIcon();
            if (!closedIcon && !openIcon) {
                this.addMouseListener({
                    mouseClicked: function (mouseEvent, treeCell) {
                        var container = treeCell.getContainer();
                        if (container.isDisplayable()) {
                            treeCell.setClosedIcon(JSTreeCell.COLLAPSED_PATH_ICON);
                            container.setStyle("display", "none");
                        }
                        else {
                            treeCell.setOpenIcon(JSTreeCell.EXPANDED_PATH_ICON);
                            container.setStyle("display", "");
                        }
                        mouseEvent.stopPropagation();
                    }
                }).withParameters(this);
            }
            this.setClosedIcon(JSTreeCell.COLLAPSED_PATH_ICON);
        }
    };
    JSTreeCell.prototype.getClosedIcon = function () {
        return this.getData("closedIcon");
    };
    JSTreeCell.prototype.setClosedIcon = function (icon) {
        this.setData("closedIcon", icon);
        var graphics = this.getGraphics();
        if (graphics) {
            if (icon) {
                icon.paintIcon(this, graphics);
            }
            else {
                graphics.removeAll();
            }
            graphics.setStyle("top", "calc(50% - " + (icon.getIconHeight() / 2) + "px)");
        }
        if (icon) {
            var label = this.getLabel();
            label.setStyle("margin-left", icon.getIconWidth() + "px");
        }
    };
    JSTreeCell.prototype.getOpenIcon = function () {
        return this.getData("openIcon");
    };
    JSTreeCell.prototype.setOpenIcon = function (icon) {
        this.setData("openIcon", icon);
        var graphics = this.getGraphics();
        if (graphics) {
            if (icon) {
                icon.paintIcon(this, graphics);
            }
            else {
                graphics.removeAll();
            }
            graphics.setStyle("top", "calc(50% - " + (icon.getIconHeight() / 2) + "px)");
        }
        if (icon) {
            var label = this.getLabel();
            label.setStyle("margin-left", icon.getIconWidth() + "px");
        }
    };
    JSTreeCell.prototype.getGraphics = function () {
        var graphics = this.getData("graphics");
        if (!graphics) {
            graphics = new JSGraphics();
            graphics.setStyle("position", "absolute");
            this.setData("graphics", graphics);
        }
        return graphics;
    };
    JSTreeCell.prototype.getPreferredWidth = function () {
        var label = this.getLabel();
        var closedIcon = this.getClosedIcon();
        var openIcon = this.getOpenIcon();
        if (closedIcon) {
            return label.getPreferredOuterWidth() + closedIcon.getIconWidth() + this.getPaddingLeft() + this.getPaddingRight();
        }
        else if (openIcon) {
            return label.getPreferredOuterWidth() + openIcon.getIconWidth() + this.getPaddingLeft() + this.getPaddingRight();
        }
        else {
            return label.getPreferredOuterWidth() + this.getPaddingLeft() + this.getPaddingRight();
        }
    };
    JSTreeCell.prototype.getButton = function () {
        return this.getData("button");
    };
    JSTreeCell.prototype.setButton = function (button) {
        var oldButton = this.getData("button");
        if (oldButton) {
            this.remove(oldButton);
        }
        if (button) {
            this.add(button, null, 0);
        }
        this.setData("button", button);
    };
    JSTreeCell.prototype.getLabel = function () {
        var label = this.getData("label");
        if (!label) {
            label = new JSLabel();
            label.setStyle("vertical-align", "middle");
            this.setData("label", label);
        }
        return label;
    };
    JSTreeCell.prototype.getIcon = function () {
        var label = this.getLabel();
        return label.getIcon();
    };
    JSTreeCell.prototype.setIcon = function (icon) {
        var label = this.getLabel();
        label.setIcon(icon);
    };
    JSTreeCell.prototype.getText = function () {
        var label = this.getLabel();
        return label.getText();
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
    JSTreeCell.COLLAPSED_PATH_DEFINITION = "M4.17,2.34L9.83,8L4.17,13.66Z";
    JSTreeCell.EXPANDED_PATH_DEFINITION = "M10,4L10,12L2,12Z";
    JSTreeCell.COLLAPSED_PATH_ICON = new JSPathIcon(JSTreeCell.COLLAPSED_PATH_DEFINITION, 16, 16).withFill("gray");
    JSTreeCell.EXPANDED_PATH_ICON = new JSPathIcon(JSTreeCell.EXPANDED_PATH_DEFINITION, 16, 16).withFill("gray");
    return JSTreeCell;
}(JSHTMLComponent));
var JSTreeCellButton = (function (_super) {
    __extends(JSTreeCellButton, _super);
    function JSTreeCellButton(icon) {
        var _this = _super.call(this, icon) || this;
        _this.setUndecorated(true);
        return _this;
    }
    return JSTreeCellButton;
}(JSButton));
var JSTreeCellRenderer = (function () {
    function JSTreeCellRenderer() {
        this.icons = {};
        this.leafMargin = 32;
        this.openMargin = 0;
        this.closedMargin = 0;
    }
    JSTreeCellRenderer.prototype.getTreeCellRendererComponent = function (tree, value) {
        var treeNode = value;
        var treeCell = new JSTreeCell(value);
        var icon = this.getIcon(treeNode);
        if (icon) {
            treeCell.setIcon(icon);
        }
        else if (treeNode.isLeaf()) {
            var leafIcon = this.getLeafIcon();
            if (leafIcon) {
                treeCell.setIcon(leafIcon);
            }
        }
        else if (treeNode.isExpanded()) {
            var openIcon = this.getOpenIcon();
            if (openIcon) {
                treeCell.setIcon(openIcon);
            }
        }
        else {
            var closedIcon = this.getClosedIcon();
            if (closedIcon) {
                treeCell.setIcon(closedIcon);
            }
        }
        var margin = 0;
        var root = tree.getRoot();
        var rootVisible = tree.isRootVisible();
        var parentNode = treeNode.getParent();
        while (treeNode !== root && (rootVisible || parentNode !== root)) {
            margin += treeNode.isLeaf() ? this.getLeafMargin() : treeNode.isExpanded() ? this.getOpenMargin() : this.getClosedMargin();
            treeNode = parentNode;
            parentNode = treeNode.getParent();
        }
        treeCell.getLabel().setStyle("margin-left", margin + "px");
        return treeCell;
    };
    JSTreeCellRenderer.prototype.getIcon = function (treeNode) {
        var treePath = treeNode.getTreePath();
        return this.icons[treePath];
    };
    JSTreeCellRenderer.prototype.setIcon = function (treeNode, icon) {
        var treePath = treeNode.getTreePath();
        this.icons[treePath] = icon;
    };
    JSTreeCellRenderer.prototype.getLeafIcon = function () {
        return this.leafIcon;
    };
    JSTreeCellRenderer.prototype.setLeafIcon = function (leafIcon) {
        this.leafIcon = leafIcon;
    };
    JSTreeCellRenderer.prototype.getOpenIcon = function () {
        return this.openIcon;
    };
    JSTreeCellRenderer.prototype.setOpenIcon = function (openIcon) {
        this.openIcon = openIcon;
    };
    JSTreeCellRenderer.prototype.getClosedIcon = function () {
        return this.closedIcon;
    };
    JSTreeCellRenderer.prototype.setClosedIcon = function (closedIcon) {
        this.closedIcon = closedIcon;
    };
    JSTreeCellRenderer.prototype.getLeafMargin = function () {
        return this.leafMargin;
    };
    JSTreeCellRenderer.prototype.setLeafMargin = function (leafMargin) {
        this.leafMargin = leafMargin;
    };
    JSTreeCellRenderer.prototype.getOpenMargin = function () {
        return this.openMargin;
    };
    JSTreeCellRenderer.prototype.setOpenMargin = function (openMargin) {
        this.openMargin = openMargin;
    };
    JSTreeCellRenderer.prototype.getClosedMargin = function () {
        return this.closedMargin;
    };
    JSTreeCellRenderer.prototype.setClosedMargin = function (closedMargin) {
        this.closedMargin = closedMargin;
    };
    return JSTreeCellRenderer;
}());
var JSTreeNode = (function () {
    function JSTreeNode() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.userObject = null;
        this.nodes = [];
        this.parent = null;
        this.expanded = false;
        switch (args.length) {
            case 1:
                var userObject = args[0];
                this.setUserObject(userObject);
                break;
            default:
        }
    }
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
    JSTreeNode.prototype.isLeaf = function () {
        return this.children().length === 0;
    };
    JSTreeNode.prototype.isExpanded = function () {
        return this.expanded;
    };
    JSTreeNode.prototype.setExpanded = function (expanded) {
        this.expanded = expanded;
    };
    JSTreeNode.prototype.toString = function () {
        return "" + (this.userObject || "");
    };
    return JSTreeNode;
}());
var JSCheckBoxMenuItem = (function (_super) {
    __extends(JSCheckBoxMenuItem, _super);
    function JSCheckBoxMenuItem() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]) || this;
        var checkBoxInput = _this.getCheckBoxInput();
        _this.add(checkBoxInput);
        var label = _this.getLabel();
        _this.add(label);
        switch (args.length) {
            case 1:
                if (args[0] instanceof JSAction) {
                    var action = args[0];
                    _this.setAction(action);
                }
                else if (args[0] instanceof JSIcon) {
                    var icon = args[0];
                    _this.setIcon(icon);
                }
                else if (typeof args[0] === "string") {
                    var text = args[0];
                    _this.setText(text);
                }
                break;
            case 2:
                if (args[0] instanceof JSIcon && typeof args[1] === "boolean") {
                    var icon = args[0];
                    var selected = args[1];
                    _this.setIcon(icon);
                    _this.setSelected(selected);
                }
                else if (typeof args[0] === "string" && typeof args[1] === "boolean") {
                    var text = args[0];
                    var selected = args[1];
                    _this.setText(text);
                    _this.setSelected(selected);
                }
                else if (typeof args[0] === "string" && args[1] instanceof JSIcon) {
                    var text = args[0];
                    var icon = args[1];
                    _this.setText(text);
                    _this.setIcon(icon);
                }
                break;
            case 3:
                if (typeof args[0] === "string" && args[1] instanceof JSIcon && typeof args[2] === "boolean") {
                    var text = args[0];
                    var icon = args[1];
                    var selected = args[2];
                    _this.setText(text);
                    _this.setIcon(icon);
                    _this.setSelected(selected);
                }
                break;
            default:
        }
        _this.addMouseListener(_this);
        return _this;
    }
    JSCheckBoxMenuItem.prototype.init = function () {
        this.addClass("JSCheckBoxMenuItem");
    };
    JSCheckBoxMenuItem.prototype.getCheckBoxInput = function () {
        var checkBoxInput = this.getData("checkBoxInput");
        if (!checkBoxInput) {
            checkBoxInput = new JSCheckBoxInput();
            this.setData("checkBoxInput", checkBoxInput);
        }
        return checkBoxInput;
    };
    JSCheckBoxMenuItem.prototype.isSelected = function () {
        var checkBoxInput = this.getCheckBoxInput();
        return checkBoxInput.isSelected();
    };
    JSCheckBoxMenuItem.prototype.setSelected = function (selected) {
        var checkBoxInput = this.getCheckBoxInput();
        checkBoxInput.setSelected(selected);
    };
    return JSCheckBoxMenuItem;
}(JSMenuItem));
