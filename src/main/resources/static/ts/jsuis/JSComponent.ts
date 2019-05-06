/// <reference path = "../jsuis.ts"/>
/**
 * JSComponent
 * 
 * @author Yassuo Toda
 */
class JSComponent {
    
    /*
     * horizontal alignment (JSLabel)
     */
    static LEFT: string = "left";
    static RIGHT: string = "right";
    static CENTER: string = "center";
    static JUSTIFY: string = "justify";
    
    /*
     * layer (JSLayeredPane)
     */
    static DEFAULT_LAYER: number = 0;
    static PALETTE_LAYER: number = 100;
    static MODAL_LAYER: number = 200;
    static POPUP_LAYER: number = 300;
    static DRAG_LAYER: number = 400;
    
    /*
     * tab placement (JSTabbedPane)
     */
    static TOP: string = "top";
    static BOTTOM: string = "bottom";
    // static LEFT: string = "left";
    // static RIGHT: string = "right";
    
    /*
     * orientation (JSProgressBar, JSSplitPane)
     */
    static HORIZONTAL: string = "horizontal";
    static VERTICAL: string = "vertical";
    
    /*
     * orientation (JSSplitPane)
     */
    static HORIZONTAL_SPLIT: string = "horizontal";
    static VERTICAL_SPLIT: string = "vertical";
    
    element: Element;
    
    constructor(element: Element) {
        this.element = element;
        if ((<any> this.element).data === undefined) {
            (<any> this.element).data = {};
        }
        this.init();
    }
    init(): void {
        this.addClass("JSComponent");
    }
    getAttribute(attribute: string): string {
        return this.element.getAttribute(attribute);
    }
    setAttribute(attribute: string, value: string): void {
        if (attribute === "width" && +value < 0) {
            try {
                throw "";
            } catch (e) {
                console.log(this.getName());
            }
        }
        this.element.setAttribute(attribute, value);
    }
    removeAttribute(attribute: string): void {
        this.element.removeAttribute(attribute);
    }
    getComputedStyle(style: string): string {
        return window.getComputedStyle(this.element)[<any> style];
    }
    getStyle(style: string): string {
        return (<{ style?: CSSStyleDeclaration }> this.element).style[<any> style];
    }
    setStyle(style:string, value: string) {
        if (value !== null) {
            (<{ style?: CSSStyleDeclaration }> this.element).style[<any> style] = value;
        } else {
            this.removeStyle(style);
        }
    }
    removeStyle(style: string) {
        (<{ style?: CSSStyleDeclaration }> this.element).style.removeProperty(style);
    }
    getData(key: string): any {
        var data = (<any> this.element).data;
        return data[key];
    }
    setData(key: string, value: any) {
        var data = (<any> this.element).data;
        data[key] = value;
    }
    getClientProperty(key: string): any {
        var clientProperties = (<any> this.element).clientProperties;
        if (!clientProperties) {
            clientProperties = {};
            (<any> this.element).clientProperties = clientProperties;
        }
        return clientProperties[key];
    }
    putClientProperty(key: string, value: any) {
        var clientProperties = (<any> this.element).clientProperties;
        if (!clientProperties) {
            clientProperties = {};
            (<any> this.element).clientProperties = clientProperties;
        }
        clientProperties[key] = value;
    }
    getId(): string {
        return this.getAttribute("id");
    }
    setId(id: string) {
        this.setAttribute("id", id);
    }
    withId(id: string) {
        this.setId(id);
        return this;
    }
    getName(): string {
        return this.getAttribute("name");
    }
    setName(name: string) {
        this.setAttribute("name", name);
    }
    withName(name: string) {
        this.setName(name);
        return this;
    }
    getClass(): string {
        return this.getAttribute("class");
    }
    setClass(clazzes: string) {
        this.setAttribute("class", clazzes);
    }
    hasClass(clazz: string): boolean {
        var clazzes: string = " " + (this.getAttribute("class") || "").trim() + " ";
        return clazzes.indexOf(" " + clazz + " ") !== -1;
    }
    addClass(clazz: string): void {
        var clazzes: string = " " + (this.getAttribute("class") || "").trim() + " ";
        if (clazzes.indexOf(" " + clazz + " ") !== -1) {
            return;
        }
        this.setClass(clazzes.trim() + " " + clazz);
    }
    removeClass(clazz: string): void {
        var clazzes: string = " " + (this.getAttribute("class") || "").trim() + " ";
        while (clazzes.indexOf(" " + clazz + " ") !== -1) {
            clazzes = clazzes.replace(" " + clazz + " ", " ");
        }
        this.setClass(clazzes.trim());
    }
    getX(): number {
        return 0;
    }
    setX(pixels: number, percent?: number) {
        this.setXPixels(pixels);
        if (percent !== undefined) {
            this.setXPercent(percent);
        }
    }
    getY(): number {
        return 0;
    }
    setY(pixels: number, percent?: number) {
        this.setYPixels(pixels);
        if (percent !== undefined) {
            this.setYPercent(percent);
        }
    }
    getWidth(): number {
        return 0;
    }
    setWidth(pixels: number, percent?: number) {
        this.setWidthPixels(pixels);
        if (percent !== undefined) {
            this.setWidthPercent(percent);
        }
    }
    getHeight(): number {
        return 0;
    }
    setHeight(pixels: number, percent?: number) {
        this.setHeightPixels(pixels);
        if (percent !== undefined) {
            this.setHeightPercent(percent);
        }
    }
    getOuterWidth(): number {
        return this.getWidth();
    }
    setOuterWidth(pixels: number, percent?: number) {
        this.setOuterWidthPixels(pixels);
        if (percent !== undefined) {
            this.setWidthPercent(percent);
        }
    }
    getOuterHeight(): number {
        return this.getHeight();
    }
    setOuterHeight(pixels: number, percent?: number) {
        this.setOuterHeightPixels(pixels);
        if (percent !== undefined) {
            this.setHeightPercent(percent);
        }
    }
    
    protected xPixels: number;
    protected yPixels: number;
    protected xPercent: number;
    protected yPercent: number;
    protected widthPixels: number;
    protected heightPixels: number;
    protected widthPercent: number;
    protected heightPercent: number;
    
    protected getXPixels(): number {
        return this.xPixels;
    }
    protected setXPixels(xPixels: number) {
        this.xPixels = xPixels;
    }
    protected getYPixels(): number {
        return this.yPixels;
    }
    protected setYPixels(yPixels: number) {
        this.yPixels = yPixels;
    }
    protected getXPercent(): number {
        return this.xPercent;
    }
    protected setXPercent(xPercent: number) {
        this.xPercent = xPercent;
    }
    protected getYPercent(): number {
        return this.yPercent;
    }
    protected setYPercent(yPercent: number) {
        this.yPercent = yPercent;
    }
    protected getWidthPixels(): number {
        return this.widthPixels;
    }
    protected setWidthPixels(widthPixels: number) {
        this.widthPixels = widthPixels;
    }
    protected getHeightPixels(): number {
        return this.heightPixels;
    }
    protected setHeightPixels(heightPixels: number) {
        this.heightPixels = heightPixels;
    }
    protected getWidthPercent(): number {
        return this.widthPercent;
    }
    protected setWidthPercent(widthPercent: number) {
        this.widthPercent = widthPercent;
    }
    protected getHeightPercent(): number {
        return this.heightPercent;
    }
    protected setHeightPercent(heightPercent: number) {
        this.heightPercent = heightPercent;
    }
    protected getOuterWidthPixels(): number {
        return this.getWidthPixels();
    }
    protected setOuterWidthPixels(outerWidthPixels: number) {
        this.setWidthPixels(outerWidthPixels);
    }
    protected getOuterHeightPixels(): number {
        return this.getHeightPixels();
    }
    protected setOuterHeightPixels(outerHeightPixels: number) {
        this.setHeightPixels(outerHeightPixels);
    }
    
    getInsetTop(): number {
        return 0;
    }
    getInsetLeft(): number {
        return 0;
    }
    getInsetBottom(): number {
        return 0;
    }
    getInsetRight(): number {
        return 0;
    }
    isDisplayable(): boolean {
        return true;
    }
    getLayout(): JSLayout {
        return this.getData("layout");
    }
    setLayout(layout: JSLayout) {
        this.setData("layout", layout);
    }
    getConstraints(): string | { [ key: string ]: string } {
        return this.getData("constraints");
    }
    setConstraints(constraints: string | { [ key: string]: number | string }) {
        this.setData("constraints", constraints);
    }
    getZIndex(): number {
        var zIndex: number = +this.getStyle("z-index");
        if (isNaN(zIndex)) {
            return 0;
        }
        return zIndex;
    }
    setZIndex(zIndex: number) {
        if (zIndex === null) {
            this.setStyle("z-index", "auto");
            return;
        }
        this.setStyle("z-index", "" + zIndex);
    }
    getComponents(): JSComponent[] {
        var components: JSComponent[] = this.getData("components");
        if (components === undefined) {
            components = [];
            this.setData("components", components);
        }
        return components;
    }
    getComponentCount(): number {
        return this.getComponents().length;    
    }
    getParent(): JSComponent {
        return this.getData("parent");
    }
    setParent(parent: JSComponent) {
        this.setData("parent", parent);
    }
    add(component: JSComponent): void;
    add(component: JSComponent, constraints: number | string | { [ key: string ]: number | string }): void;
    add(component: JSComponent, constraints: number | string | { [ key: string ]: number | string }, index: number): void;
    // overload
    add(component: JSComponent, constraints?: number | string | { [ key: string ]: number | string }, index?: number): void {
        if (constraints !== undefined) {
            if (typeof constraints === "number") {
                component.setZIndex(constraints);
            } else {
                component.setConstraints(constraints);
            }
        }
        var parent = component.getParent();
        if (parent) {
            parent.remove(component);
        }
        var components: JSComponent[] = this.getComponents();
        if (index !== undefined && index < components.length) {
            this.element.insertBefore(component.element, components[index].element);
            components.splice(index, 0, component);
        } else {
            this.element.appendChild(component.element);
            components.push(component);
        }
        component.setParent(this);
        var layout: JSLayout = this.getLayout();
        if (layout) {
            layout.addLayoutComponent(component);
        }
    }
    remove(index: number): void;
    remove(component: JSComponent): void;
    // overload
    remove(indexOrComponent: number | JSComponent): void {
        var component: JSComponent;
        var components: JSComponent[] = this.getComponents();
        if (typeof indexOrComponent === "number") {
            if (indexOrComponent < components.length) {
                component = components[indexOrComponent];
            } else {
                return;
            }
        } else {
            component = indexOrComponent;
        }
        var layout: JSLayout = this.getLayout();
        if (layout) {
            layout.removeLayoutComponent(component);
        }
        component.setParent(null);
        var index: number = components.indexOf(component);
        if (index !== -1) {
            components.splice(index, 1);
            this.element.removeChild(component.element);
        }
    }
    removeAll() {
        var components: JSComponent[] = this.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            this.remove(component);
        }
    }
    validate(): void {
        var layout: JSLayout = this.getLayout();
        if (layout) {
            var parent: JSComponent = this.getParent();
            if (parent) {
                var parentLayout: JSLayout = parent.getLayout();
                if (!parentLayout) {
                    this.setStyle("min-width", this.getPreferredWidth() + "px");
                    this.setStyle("min-height", this.getPreferredHeight() + "px");
                    this.setStyle("position", "relative");
                }
            }
            layout.layoutContainer(this);
        }
        this.validateChildren();
    }
    validateChildren(): void {
        var components: JSComponent[] = this.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            component.validate();
        }
    }
    isVisible(): boolean {
        return this.getStyle("visibility") !== "hidden";
    }
    setVisible(visible: boolean) {
        this.setStyle("visibility", visible ? "" : "hidden");
    }
    clone(): JSComponent {
        return null;
    }
    getBoundingClientRect(): ClientRect {
        return this.element.getBoundingClientRect();
    }
    getPreferredWidth(): number {
        var preferredWidth: string = this.getAttribute("data-preferred-width");
        if (preferredWidth) {
            return +preferredWidth;
        }
        var layout: JSLayout = this.getLayout();
        if (layout) {
            return layout.preferredLayoutWidth(this);
        }
        var cssWidth: string = this.getStyle("width");
        if (cssWidth) {
            this.removeStyle("width");
        }
        var widthAttribute: string = this.getAttribute("width");
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
    }
    setPreferredWidth(preferredWidth: number) {
        if (preferredWidth === null) {
            this.removeAttribute("data-preferred-width");
        } else {
            this.setAttribute("data-preferred-width", "" + preferredWidth);
        }
    }
    getPreferredHeight(): number {
        var preferredHeight: string = this.getAttribute("data-preferred-height");
        if (preferredHeight) {
            return +preferredHeight;
        }
        var layout: JSLayout = this.getLayout();
        if (layout) {
            return layout.preferredLayoutHeight(this);
        }
        var cssHeight: string = this.getStyle("height");
        if (cssHeight) {
            this.removeStyle("height");
        }
        var heightAttribute: string = this.getAttribute("height");
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
    }
    setPreferredHeight(preferredHeight: number) {
        if (preferredHeight === null) {
            this.removeAttribute("data-preferred-height");
        } else {
            this.setAttribute("data-preferred-height", "" + preferredHeight);
        }
    }
    getPreferredOuterWidth(): number {
        return 0;
    }
    getPreferredOuterHeight(): number {
        return 0;
    }
    getMarginTop(): number {
        return 0;
    }
    getMarginLeft(): number {
        return 0;
    }
    getMarginBottom(): number {
        return 0;
    }
    getMarginRight(): number {
        return 0;
    }
    getBorderTopWidth(): number {
        return 0;
    }
    getBorderLeftWidth(): number {
        return 0;
    }
    getBorderBottomWidth(): number {
        return 0;
    }
    getBorderRightWidth(): number {
        return 0;
    }
    getPaddingTop(): number {
        return 0;
    }
    getPaddingLeft(): number {
        return 0;
    }
    getPaddingBottom(): number {
        return 0;
    }
    getPaddingRight(): number {
        return 0;
    }
    
    align: string;
    
    getAlign(): string {
        return this.align;
    }
    setAlign(align: string) {
        this.align = align;
    }
    
    getBackground(): string {
        return "";
    }
    setBackground(background: string) {
    }
    getForeground(): string {
        return "";
    }
    setForeground(foreground: string) {
    }
    getText(): string {
        return "";
    }
    setText(text: string) {
    }
    getBorder(): Border {
        return this.getData("border");
    }
    setBorder(border: Border) {
        this.setData("border", border);
        border.paintBorder(this);
    }
    getCursor(): string {
        return "";
    }
    setCursor(cursor: string) {
    }
    getIcon(): JSIcon {
        return this.getData("icon");
    }
    setIcon(icon: JSIcon) {
        this.setData("icon", icon);
    }
    getImage(): JSComponent {
        return this.getData("image");
    }
    setImage(image: JSComponent) {
        this.setData("image", image);
    }
    getAction(): JSAction {
        return this.getData("action");
    }
    setAction(action: JSAction) {
        var oldAction: JSAction = this.getAction();
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
    }
    getComponentPopupMenu(): JSPopupMenu {
        return this.getData("componentPopupMenu"); 
    }
    setComponentPopupMenu(componentPopupMenu: JSPopupMenu) {
        var oldContextmenuListener = this.getData("contextmenuListener");
        if (oldContextmenuListener) {
            this.removeEventListener("contextmenu", oldContextmenuListener, false);
        }
        var invoker: JSComponent = this;
        var contextmenuListener = function(mouseEvent: MouseEvent) {
            componentPopupMenu.show(invoker, mouseEvent.x, mouseEvent.y);
            mouseEvent.preventDefault();
            mouseEvent.stopPropagation();
        };
        this.addEventListener("contextmenu", contextmenuListener, false);
        this.setData("contextmenuListener", contextmenuListener);
        this.setData("componentPopupMenu", componentPopupMenu);
    }
    isSelected(): boolean {
        var selected: string = this.getAttribute("selected");
        if (selected === null) {
           return false;
        }
        return (selected || "true") === "true";
    }
    setSelected(selected: boolean) {
        this.setAttribute("selected", "" + selected);
    }
    getSelection(): JSSelection {
        return this.getData("selection"); 
    }
    setSelection(selection: JSSelection) {
        this.setData("selection", selection);
    }
    isEditable(): boolean {
        return this.getAttribute("contenteditable") === "true";
    }
    setEditable(contenteditable: boolean) {
        this.setAttribute("contenteditable", "" + contenteditable);
    }
    setTimeout(thisValue: JSComponent, timeout: () => void): void;
    setTimeout(thisValue: JSComponent, timeout: () => void, delay: number): void;
    // overload
    setTimeout(thisValue: JSComponent, timeout: () => void, delay?: number): void {
        this.setData("timeout", setTimeout(function() { timeout.call(thisValue); }, delay || 0));
    }
    clearTimeout(): void {
        var timeout = this.getData("timeout");
        if (timeout) {
            this.setData("timeout", undefined);
            clearTimeout(timeout);
        }
    }
    addEventListener(event: string, listener: (event: Event) => void, useCapture?: boolean): void {
        this.element.addEventListener(event, listener, !!useCapture);
    }
    removeEventListener(event: string, listener: (event: Event) => void, useCapture?: boolean): void {
        this.element.removeEventListener(event, listener, !!useCapture);
    }
    extendListener(listener: any) {
        if (!listener.getSource) {
            listener.getSource = function(): JSComponent {
                return this.source;
            }
        }
        if (!listener.setSource) {
            listener.setSource = function(source: JSComponent) {
                this.source = source;
            }
        }
        if (!listener.withSource) {
            listener.withSource = function(source: JSComponent): ActionListener {
                this.setSource(source);
                return this;
            }
        }
        return listener;
    }
    getMouseListeners(): MouseListener[] {
        var mouseListeners: MouseListener[] = this.getData("mouseListeners");
        if (mouseListeners === undefined) {
            mouseListeners = [];
            this.setData("mouseListeners", mouseListeners);
        }
        return mouseListeners;
    }
    getJSMouseListeners(): JSMouseListener[] {
        var jsMouseListeners: JSMouseListener[] = this.getData("jsMouseListeners");
        if (jsMouseListeners === undefined) {
            jsMouseListeners = [];
            this.setData("jsMouseListeners", jsMouseListeners);
        }
        return jsMouseListeners;
    }
    addMouseListener(mouseListener: MouseListener, useCapture?: boolean): JSMouseListener {
        var mouseListeners: MouseListener[] = this.getMouseListeners();
        mouseListeners.push(mouseListener);
        var jsMouseListener: JSMouseListener = new JSMouseListener(mouseListener);
        var jsMouseListeners: JSMouseListener[] = this.getJSMouseListeners();
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
            this.addMouseDraggedListener(<MouseDraggedListener> jsMouseListener, !!useCapture);
        }
        return jsMouseListener.withArgs(this);
    }
    removeMouseListener(mouseListener: MouseListener, useCapture?: boolean): void {
        var mouseListeners: MouseListener[] = this.getMouseListeners();
        var index: number = mouseListeners.indexOf(mouseListener);
        if (index !== -1) {
            var jsMouseListeners: JSMouseListener[] = this.getJSMouseListeners();
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
                this.removeMouseDraggedListener(<MouseDraggedListener> jsMouseListener);
            }
            mouseListeners.splice(index, 1);
            jsMouseListeners.splice(index, 1);
        }
    }
    getActionCommand(): string {
        return this.getAttribute("data-action-command");
    }
    setActionCommand(actionCommand: string) {
        this.setAttribute("data-action-command", actionCommand);
    }
    getActionListeners(): ActionListener[] {
        var actionListeners: ActionListener[] = this.getData("actionListeners");
        if (actionListeners === undefined) {
            actionListeners = [];
            this.setData("actionListeners", actionListeners);
        }
        return actionListeners;
    }
    getJSActionListeners(): JSActionListener[] {
        var jsActionListeners: JSActionListener[] = this.getData("jsActionListeners");
        if (jsActionListeners === undefined) {
            jsActionListeners = [];
            this.setData("jsActionListeners", jsActionListeners);
        }
        return jsActionListeners;
    }
    addActionListener(actionListener: ActionListener, useCapture?: boolean): JSActionListener {
        var actionListeners: ActionListener[] = this.getActionListeners();
        actionListeners.push(actionListener);
        var jsActionListener: JSActionListener = new JSActionListener(actionListener);
        var jsActionListeners: JSActionListener[] = this.getJSActionListeners();
        jsActionListeners.push(jsActionListener);
        var mouseListener = this.getData("actionListener" + !!useCapture);
        if (!mouseListener) {
            mouseListener = {
                mouseClicked(mouseEvent: MouseEvent, source: JSComponent): void {
                    source.fireActionPerformed(mouseEvent);
                    mouseEvent.stopPropagation();
                }
            };
            this.addMouseListener(mouseListener, !!useCapture).withArgs(this);
            this.setData("actionListener" + !!useCapture, mouseListener);
        }
        return jsActionListener.withArgs(this);
    }
    removeActionListener(actionListener: ActionListener): void {
        var actionListeners: ActionListener[] = this.getActionListeners();
        var index = actionListeners.indexOf(actionListener);
        if (index !== -1) {
            var jsActionListeners: JSActionListener[] = this.getJSActionListeners();
            actionListeners.splice(index, 1);
            jsActionListeners.splice(index, 1);
        }
    }
    fireActionPerformed(mouseEvent: MouseEvent): void {
        var jsActionListeners: JSActionListener[] = this.getJSActionListeners();
        for (var i: number = 0; i < jsActionListeners.length; i++) {
            var jsActionListener: JSActionListener = jsActionListeners[i];
            jsActionListener.actionPerformed(mouseEvent);
        }
    }
    getMouseDraggedListeners(): MouseDraggedListener[] {
        var mouseDraggedListeners: MouseDraggedListener[] = this.getData("mouseDraggedListeners");
        if (mouseDraggedListeners === undefined) {
            mouseDraggedListeners = [];
            this.setData("mouseDraggedListeners", mouseDraggedListeners);
        }
        return mouseDraggedListeners;
    }
    getJSMouseDraggedListeners(): JSMouseDraggedListener[] {
        var jsMouseDraggedListeners: JSMouseDraggedListener[] = this.getData("jsMouseDraggedListeners");
        if (jsMouseDraggedListeners === undefined) {
            jsMouseDraggedListeners = [];
            this.setData("jsMouseDraggedListeners", jsMouseDraggedListeners);
        }
        return jsMouseDraggedListeners;
    }
    addMouseDraggedListener(mouseDraggedListener: MouseDraggedListener, useCapture?: boolean): JSMouseDraggedListener {
        var mouseDraggedListeners: MouseDraggedListener[] = this.getMouseDraggedListeners();
        mouseDraggedListeners.push(mouseDraggedListener);
        var jsMouseDraggedListener: JSMouseDraggedListener = new JSMouseDraggedListener(mouseDraggedListener);
        var jsMouseDraggedListeners: JSMouseDraggedListener[] = this.getJSMouseDraggedListeners();
        jsMouseDraggedListeners.push(jsMouseDraggedListener);
        var mouseListener = this.getData("mouseDraggedListener" + !!useCapture);
        if (!mouseListener) {
            mouseListener = {
                mousePressed(mouseEvent: MouseEvent, source: JSComponent): void {
                    JSBody.getInstance().setDragSource(source);
                    mouseEvent.stopPropagation();
                }
            };
            this.addMouseListener(mouseListener, !!useCapture).withArgs(this);
            this.setData("mouseDraggedListener" + !!useCapture, mouseListener);
        }
        return jsMouseDraggedListener.withArgs(this);
    }
    removeMouseDraggedListener(mouseDraggedListener: MouseDraggedListener): void {
        var mouseDraggedListeners: MouseDraggedListener[] = this.getMouseDraggedListeners();
        var index = mouseDraggedListeners.indexOf(mouseDraggedListener);
        if (index !== -1) {
            var jsMouseDraggedListeners: JSMouseDraggedListener[] = this.getJSMouseDraggedListeners();
            mouseDraggedListeners.splice(index, 1);
            jsMouseDraggedListeners.splice(index, 1);
        }
    }
    fireMouseDragged(mouseEvent: MouseEvent): void {
        var jsMouseDraggedListeners: JSMouseDraggedListener[] = this.getJSMouseDraggedListeners();
        for (var i: number = 0; i < jsMouseDraggedListeners.length; i++) {
            var jsMouseDraggedListener: JSMouseDraggedListener = jsMouseDraggedListeners[i];
            jsMouseDraggedListener.mouseDragged(mouseEvent);
        }
    }
    isDragEnabled(): boolean {
        return this.getData("dragEnabled");
    }
    setDragEnabled(dragEnable: boolean) {
        this.setData("dragEnabled", dragEnable);
    }
    getDragSourceListeners(): DragSourceListener[] {
        var dragSourceListeners: DragSourceListener[] = this.getData("dragSourceListeners");
        if (dragSourceListeners === undefined) {
            dragSourceListeners = [];
            this.setData("dragSourceListeners", dragSourceListeners);
        }
        return dragSourceListeners;
    }
    getJSDragSourceListeners(): JSDragSourceListener[] {
        var jsDragSourceListeners: JSDragSourceListener[] = this.getData("jsDragSourceListeners");
        if (jsDragSourceListeners === undefined) {
            jsDragSourceListeners = [];
            this.setData("jsDragSourceListeners", jsDragSourceListeners);
        }
        return jsDragSourceListeners;
    }
    addDragSourceListener(dragSourceListener: DragSourceListener, useCapture?: boolean): JSDragSourceListener {
        this.setDragEnabled(true);
        var dragSourceListeners: DragSourceListener[] = this.getDragSourceListeners();
        dragSourceListeners.push(dragSourceListener);
        var jsDragSourceListener: JSDragSourceListener = new JSDragSourceListener(dragSourceListener);
        var jsDragSourceListeners: JSDragSourceListener[] = this.getJSDragSourceListeners();
        jsDragSourceListeners.push(jsDragSourceListener);
        var mouseListener = this.getData("dragSourceListener" + !!useCapture);
        if (!mouseListener) {
            mouseListener = {
                mousePressed(mouseEvent: MouseEvent, source: JSComponent): void {
                    JSBody.getInstance().setDragSource(source);
                    mouseEvent.stopPropagation();
                }
            };
            this.addMouseListener(mouseListener, !!useCapture).withArgs(this);
            this.setData("dragSourceListener" + !!useCapture, mouseListener);
        }
        return jsDragSourceListener.withArgs(this);
    }
    removeDragSourceListener(dragSourceListener: DragSourceListener): void {
        var dragSourceListeners: DragSourceListener[] = this.getDragSourceListeners();
        var index = dragSourceListeners.indexOf(dragSourceListener);
        if (index !== -1) {
            var jsDragSourceListeners: JSDragSourceListener[] = this.getJSDragSourceListeners();
            dragSourceListeners.splice(index, 1);
            jsDragSourceListeners.splice(index, 1);
        }
        if (!dragSourceListeners.length) {
            this.setDragEnabled(false);
        }
    }
    fireDragStart(mouseEvent: MouseEvent): void {
        var jsDragSourceListeners: JSDragSourceListener[] = this.getJSDragSourceListeners();
        for (var i: number = 0; i < jsDragSourceListeners.length; i++) {
            var jsDragSourceListener: JSDragSourceListener = jsDragSourceListeners[i];
            if (jsDragSourceListener.dragStart) {
                jsDragSourceListener.dragStart(mouseEvent);
            }
        }
    }
    fireDrag(mouseEvent: MouseEvent): void {
        var jsDragSourceListeners: JSDragSourceListener[] = this.getJSDragSourceListeners();
        for (var i: number = 0; i < jsDragSourceListeners.length; i++) {
            var jsDragSourceListener: JSDragSourceListener = jsDragSourceListeners[i];
            if (jsDragSourceListener.drag) {
                jsDragSourceListener.drag(mouseEvent);
            }
        }
    }
    fireDragEnd(mouseEvent: MouseEvent): void {
        var jsDragSourceListeners: JSDragSourceListener[] = this.getJSDragSourceListeners();
        for (var i: number = 0; i < jsDragSourceListeners.length; i++) {
            var jsDragSourceListener: JSDragSourceListener = jsDragSourceListeners[i];
            if (jsDragSourceListener.dragEnd) {
                jsDragSourceListener.dragEnd(mouseEvent);
            }
        }
    }
    getDropTargetListeners(): DropTargetListener[] {
        var dropTargetListeners: DropTargetListener[] = this.getData("dropTargetListeners");
        if (dropTargetListeners === undefined) {
            dropTargetListeners = [];
            this.setData("dropTargetListeners", dropTargetListeners);
        }
        return dropTargetListeners;
    }
    getJSDropTargetListeners(): JSDropTargetListener[] {
        var jsDropTargetListeners: JSDropTargetListener[] = this.getData("jsDropTargetListeners");
        if (jsDropTargetListeners === undefined) {
            jsDropTargetListeners = [];
            this.setData("jsDropTargetListeners", jsDropTargetListeners);
        }
        return jsDropTargetListeners;
    }
    addDropTargetListener(dropTargetListener: DropTargetListener, useCapture?: boolean): JSDropTargetListener {
        var dropTargetListeners: DropTargetListener[] = this.getDropTargetListeners();
        dropTargetListeners.push(dropTargetListener);
        var jsDropTargetListener: JSDropTargetListener = new JSDropTargetListener(dropTargetListener);
        var jsDropTargetListeners: JSDropTargetListener[] = this.getJSDropTargetListeners();
        jsDropTargetListeners.push(jsDropTargetListener);
        var mouseListener = this.getData("dropTargetListener" + !!useCapture);
        if (!mouseListener) {
            mouseListener = {
                mouseEntered(mouseEvent: MouseEvent, source: JSComponent): void {
                    var dragSource: JSComponent = JSBody.getInstance().getDragSource();
                    if (dragSource && dragSource.isDragEnabled()) {
                        var dragStart = dragSource.getData("dragStart");
                        if (dragStart) {
                            source.fireDragEnter(mouseEvent);
                        }
                    }
                    mouseEvent.stopPropagation();
                },
                mouseMoved(mouseEvent: MouseEvent, source: JSComponent): void {
                    var dragSource: JSComponent = JSBody.getInstance().getDragSource();
                    if (dragSource && dragSource.isDragEnabled()) {
                        var dragStart = dragSource.getData("dragStart");
                        if (dragStart) {
                            source.fireDragOver(mouseEvent);
                        }
                    }
                    mouseEvent.stopPropagation();
                },
                mouseExited(mouseEvent: MouseEvent, source: JSComponent): void {
                    var dragSource: JSComponent = JSBody.getInstance().getDragSource();
                    if (dragSource && dragSource.isDragEnabled()) {
                        var dragStart = dragSource.getData("dragStart");
                        if (dragStart) {
                            source.fireDragLeave(mouseEvent);
                        }
                    }
                    mouseEvent.stopPropagation();
                },
                mouseReleased(mouseEvent: MouseEvent, source: JSComponent): void {
                    var dragSource: JSComponent = JSBody.getInstance().getDragSource();
                    if (dragSource && dragSource.isDragEnabled()) {
                        var dragStart = dragSource.getData("dragStart");
                        if (dragStart) {
                            source.fireDrop(mouseEvent);
                        }
                    }
                    mouseEvent.stopPropagation();
                }
            };
            this.addMouseListener(mouseListener, !!useCapture).withArgs(this);
            this.setData("dropTargetListener" + !!useCapture, mouseListener);
        }
        return jsDropTargetListener.withArgs(this);
    }
    removeDropTargetListener(dropTargetListener: DropTargetListener): void {
        var dropTargetListeners: DropTargetListener[] = this.getDropTargetListeners();
        var index = dropTargetListeners.indexOf(dropTargetListener);
        if (index !== -1) {
            var jsDropTargetListeners: JSDropTargetListener[] = this.getJSDropTargetListeners();
            dropTargetListeners.splice(index, 1);
            jsDropTargetListeners.splice(index, 1);
        }
    }
    fireDragEnter(mouseEvent: MouseEvent): void {
        var jsDropTargetListeners: JSDropTargetListener[] = this.getJSDropTargetListeners();
        for (var i: number = 0; i < jsDropTargetListeners.length; i++) {
            var jsDropTargetListener = jsDropTargetListeners[i];
            if (jsDropTargetListener.dragEnter) {
                jsDropTargetListener.dragEnter(mouseEvent, this);
            }
        }
    }
    fireDragOver(mouseEvent: MouseEvent): void {
        var jsDropTargetListeners: JSDropTargetListener[] = this.getJSDropTargetListeners();
        for (var i: number = 0; i < jsDropTargetListeners.length; i++) {
            var jsDropTargetListener = jsDropTargetListeners[i];
            if (jsDropTargetListener.dragOver) {
                jsDropTargetListener.dragOver(mouseEvent, this);
            }
        }
    }
    fireDragLeave(mouseEvent: MouseEvent): void {
        var jsDropTargetListeners: JSDropTargetListener[] = this.getJSDropTargetListeners();
        for (var i: number = 0; i < jsDropTargetListeners.length; i++) {
            var jsDropTargetListener = jsDropTargetListeners[i];
            if (jsDropTargetListener.dragLeave) {
                jsDropTargetListener.dragLeave(mouseEvent, this);
            }
        }
    }
    fireDrop(mouseEvent: MouseEvent): void {
        var jsDropTargetListeners: JSDropTargetListener[] = this.getJSDropTargetListeners();
        for (var i: number = 0; i < jsDropTargetListeners.length; i++) {
            var jsDropTargetListener = jsDropTargetListeners[i];
            if (jsDropTargetListener.drop) {
                jsDropTargetListener.drop(mouseEvent, this);
            }
        }
    }
    getAdjustmentListeners(): AdjustmentListener[] {
        var adjustmentListeners: AdjustmentListener[] = this.getData("adjustmentListeners");
        if (adjustmentListeners === undefined) {
            adjustmentListeners = [];
            this.setData("adjustmentListeners", adjustmentListeners);
        }
        return adjustmentListeners;
    }
    getJSAdjustmentListeners(): JSAdjustmentListener[] {
        var jsAdjustmentListeners: JSAdjustmentListener[] = this.getData("jsAdjustmentListeners");
        if (jsAdjustmentListeners === undefined) {
            jsAdjustmentListeners = [];
            this.setData("jsAdjustmentListeners", jsAdjustmentListeners);
        }
        return jsAdjustmentListeners;
    }
    addAdjustmentListener(adjustmentListener: AdjustmentListener, useCapture?: boolean): JSAdjustmentListener {
        var adjustmentListeners: AdjustmentListener[] = this.getAdjustmentListeners();
        adjustmentListeners.push(adjustmentListener);
        var jsAdjustmentListener: JSAdjustmentListener = new JSAdjustmentListener(adjustmentListener);
        var jsAdjustmentListeners: JSAdjustmentListener[] = this.getJSAdjustmentListeners();
        jsAdjustmentListeners.push(jsAdjustmentListener);
        this.element.addEventListener("scroll", jsAdjustmentListener.adjustmentValueChanged, !!useCapture);
        return jsAdjustmentListener.withArgs(this);
    }
    removeAdjustmentListener(adjustmentListener: AdjustmentListener, useCapture?: boolean): void {
        var adjustmentListeners: AdjustmentListener[] = this.getAdjustmentListeners();
        var index: number = adjustmentListeners.indexOf(adjustmentListener);
        if (index !== -1) {
            var jsAdjustmentListeners: JSAdjustmentListener[] = this.getJSAdjustmentListeners();
            var jsAdjustmentListener = jsAdjustmentListeners[index];
            this.element.removeEventListener("scroll", jsAdjustmentListener.adjustmentValueChanged, !!useCapture);
            adjustmentListeners.splice(index, 1);
            jsAdjustmentListeners.splice(index, 1);
        }
    }
    getChangeListeners(): ChangeListener[] {
        var changeListeners: ChangeListener[] = this.getData("changeListeners");
        if (changeListeners === undefined) {
            changeListeners = [];
            this.setData("changeListeners", changeListeners);
        }
        return changeListeners;
    }
    getJSChangeListeners(): JSChangeListener[] {
        var jsChangeListeners: JSChangeListener[] = this.getData("jsChangeListeners");
        if (jsChangeListeners === undefined) {
            jsChangeListeners = [];
            this.setData("jsChangeListeners", jsChangeListeners);
        }
        return jsChangeListeners;
    }
    addChangeListener(changeListener: ChangeListener, useCapture?: boolean): JSChangeListener {
        var changeListeners: ChangeListener[] = this.getChangeListeners();
        changeListeners.push(changeListener);
        var jsChangeListener: JSChangeListener = new JSChangeListener(changeListener);
        var jsChangeListeners: JSChangeListener[] = this.getJSChangeListeners();
        jsChangeListeners.push(jsChangeListener);
        this.element.addEventListener("change", jsChangeListener.stateChanged, !!useCapture);
        return jsChangeListener.withArgs(this);
    }
    removeChangeListener(changeListener: ChangeListener, useCapture?: boolean): void {
        var changeListeners: ChangeListener[] = this.getChangeListeners();
        var index: number = changeListeners.indexOf(changeListener);
        if (index !== -1) {
            var jsChangeListeners: JSChangeListener[] = this.getJSChangeListeners();
            var jsChangeListener = jsChangeListeners[index];
            this.element.removeEventListener("change", jsChangeListener.stateChanged, !!useCapture);
            changeListeners.splice(index, 1);
            jsChangeListeners.splice(index, 1);
        }
    }
}