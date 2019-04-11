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
     * orientation (JSProgressBar, JSSeparator, JSSplitPane)
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
        this.setClass("JSComponent");
        this.setStyle("cursor", "inherit");
    }
    getAttribute(attribute: string): string {
        return this.element.getAttribute(attribute);
    }
    setAttribute(attribute: string, value: string): void {
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
    setClass(clazz: string) {
        this.setAttribute("class", clazz);
    }
    addClass(clazz: string): void {
        var clazzes: string = (this.getAttribute("class") || "").trim();
        if (clazzes.indexOf(" " + clazz + " ") !== -1 ||
                clazzes.indexOf(clazz + " ") !== -1 ||
                clazzes.indexOf(" " + clazz) !== -1) {
            return;
        }
        this.setClass((clazzes + " " + clazz).trim());
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
        var name = action.getName();
        if (name) {
            this.setText(name);
        }
        var icon = action.getIcon();
        if (icon) {
            this.setIcon(icon);
        }
        actionListener = action.getActionListener();
        if (actionListener) {
            this.addActionListener(actionListener);
        }
        mouseListener = action.getMouseListener();
        if (mouseListener) {
            this.addMouseListener(mouseListener);
        }
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
        this.element.addEventListener(event, listener, useCapture === true);
    }
    removeEventListener(event: string, listener: (event: Event) => void, useCapture?: boolean): void {
        this.element.removeEventListener(event, listener, useCapture === true);
    }
    getJSMouseListeners(): JSMouseListener[] {
        var jsMouseListeners: JSMouseListener[] = this.getData("jsMouseListeners");
        if (jsMouseListeners === undefined) {
            jsMouseListeners = [];
            this.setData("jsMouseListeners", jsMouseListeners);
        }
        return jsMouseListeners;
    }
    addMouseListener(mouseListener: MouseListener, useCapture?: boolean): void {
        var jsMouseListener: JSMouseListener = new JSMouseListener(mouseListener, true);
        jsMouseListener.setComponent(this);
        var jsMouseListeners: JSMouseListener[] = this.getJSMouseListeners();
        jsMouseListeners.push(jsMouseListener);
        if (mouseListener.mouseClicked) {
            this.element.addEventListener("click", jsMouseListener.mouseClicked, useCapture === true);
        }
        if (mouseListener.mousePressed) {
            this.element.addEventListener("mousedown", jsMouseListener.mousePressed, useCapture === true);
        }
        if (mouseListener.mouseReleased) {
            this.element.addEventListener("mouseup", jsMouseListener.mouseReleased, useCapture === true);
        }
        if (mouseListener.mouseEntered) {
            this.element.addEventListener("mouseenter", jsMouseListener.mouseEntered, useCapture === true);
        }
        if (mouseListener.mouseExited) {
            this.element.addEventListener("mouseleave", jsMouseListener.mouseExited, useCapture === true);
        }
        if (mouseListener.mouseMoved) {
            this.element.addEventListener("mousemove", jsMouseListener.mouseMoved, useCapture === true);
        }
        if (mouseListener.mouseDragged) {
            this.addMouseDraggedListener(<MouseDraggedListener> jsMouseListener, useCapture === true);
        }
    }
    removeMouseListener(mouseListener: MouseListener, useCapture?: boolean): void {
        var jsMouseListeners: JSMouseListener[] = this.getJSMouseListeners();
        var index: number = 0;
        var jsMouseListener: JSMouseListener;
        for (; index < jsMouseListeners.length; index++) {
            jsMouseListener = jsMouseListeners[index];
            if (jsMouseListener.getMouseListener() === mouseListener) {
                break;
            }
        }
        if (index === jsMouseListeners.length) {
            return;
        }
        jsMouseListener.setComponent(null);
        jsMouseListeners.splice(index, 1);
        if (mouseListener.mouseClicked) {
            this.element.removeEventListener("click", jsMouseListener.mouseClicked, useCapture === true);
        }
        if (mouseListener.mousePressed) {
            this.element.removeEventListener("mousedown", jsMouseListener.mouseClicked, useCapture === true);
        }
        if (mouseListener.mouseReleased) {
            this.element.removeEventListener("mouseup", jsMouseListener.mouseClicked, useCapture === true);
        }
        if (mouseListener.mouseEntered) {
            this.element.removeEventListener("mouseenter", jsMouseListener.mouseClicked, useCapture === true);
        }
        if (mouseListener.mouseExited) {
            this.element.removeEventListener("mouseleave", jsMouseListener.mouseClicked, useCapture === true);
        }
        if (mouseListener.mouseMoved) {
            this.element.removeEventListener("mousemove", jsMouseListener.mouseClicked, useCapture === true);
        }
        if (mouseListener.mouseDragged) {
            this.removeMouseDraggedListener(<MouseDraggedListener> jsMouseListener);
        }
    }
    getJSAdjustmentListeners(): JSAdjustmentListener[] {
        var jsAdjustmentListeners: JSAdjustmentListener[] = this.getData("jsAdjustmentListeners");
        if (jsAdjustmentListeners === undefined) {
            jsAdjustmentListeners = [];
            this.setData("jsAdjustmentListeners", jsAdjustmentListeners);
        }
        return jsAdjustmentListeners;
    }
    addAdjustmentListener(adjustmentListener: AdjustmentListener, useCapture?: boolean): void {
        var jsAdjustmentListener: JSAdjustmentListener = new JSAdjustmentListener(adjustmentListener, true);
        jsAdjustmentListener.setComponent(this);
        var jsAdjustmentListeners: JSAdjustmentListener[] = this.getJSAdjustmentListeners();
        jsAdjustmentListeners.push(jsAdjustmentListener);
        this.element.addEventListener("scroll", jsAdjustmentListener.adjustmentValueChanged, useCapture === true);
    }
    removeAdjustmentListener(adjustmentListener: AdjustmentListener, useCapture?: boolean): void {
        var jsAdjustmentListeners: JSAdjustmentListener[] = this.getJSAdjustmentListeners();
        var index: number = 0;
        var jsAdjustmentListener: JSAdjustmentListener;
        for (; index < jsAdjustmentListeners.length; index++) {
            jsAdjustmentListener = jsAdjustmentListeners[index];
            if (jsAdjustmentListener.getAdjustmentListener() === adjustmentListener) {
                break;
            }
        }
        if (index === jsAdjustmentListeners.length) {
            return;
        }
        jsAdjustmentListener.setComponent(null);
        jsAdjustmentListeners.splice(index, 1);
        this.element.removeEventListener("scroll", jsAdjustmentListener.adjustmentValueChanged, useCapture === true);
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
    addActionListener(actionListener: ActionListener) {
        var mouseListener = this.getData("actionListener");
        if (!mouseListener) {
            mouseListener = new JSMouseListener({
                mouseClicked(mouseEvent: MouseEvent, component: JSComponent): void {
                    component.fireActionPerformed(new JSActionEvent(component, component.getActionCommand()), component);
                }
            });
            this.addMouseListener(mouseListener);
            this.setData("actionListener", mouseListener);
        }
        var actionListeners: ActionListener[] = this.getActionListeners();
        actionListeners.push(actionListener);
    }
    removeActionListener(actionListener: ActionListener) {
        var actionListeners: ActionListener[] = this.getActionListeners();
        var index = actionListeners.indexOf(actionListener);
        if (index !== -1) {
            actionListeners.splice(index, 1);
        }
    }
    fireActionPerformed(actionEvent: JSActionEvent, component: JSComponent): void {
        var actionListeners: ActionListener[] = this.getActionListeners();
        for (var i: number = 0; i < actionListeners.length; i++) {
            var actionListener = actionListeners[i];
            actionListener.actionPerformed(actionEvent, component);
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
    addMouseDraggedListener(mouseDraggedListener: MouseDraggedListener, useCapture?: boolean) {
        var mouseListener = this.getData("mouseDraggedListener");
        if (!mouseListener) {
            mouseListener = new JSMouseListener({
                mousePressed(mouseEvent: MouseEvent, component: JSComponent): void {
                    JSBody.getInstance().setDragSource(component);
                }
            });
            this.addMouseListener(mouseListener, useCapture === true);
            this.setData("mouseDraggedListener", mouseListener);
        }
        var mouseDraggedListeners: MouseDraggedListener[] = this.getMouseDraggedListeners();
        mouseDraggedListeners.push(mouseDraggedListener);
    }
    removeMouseDraggedListener(mouseDraggedListener: MouseDraggedListener) {
        var mouseDraggedListeners: MouseDraggedListener[] = this.getMouseDraggedListeners();
        var index = mouseDraggedListeners.indexOf(mouseDraggedListener);
        if (index !== -1) {
            mouseDraggedListeners.splice(index, 1);
        }
    }
    fireMouseDragged(mouseEvent: MouseEvent, component: JSComponent): void {
        var mouseDraggedListeners: MouseDraggedListener[] = this.getMouseDraggedListeners();
        for (var i: number = 0; i < mouseDraggedListeners.length; i++) {
            var mouseDraggedListener: MouseDraggedListener = mouseDraggedListeners[i];
            mouseDraggedListener.mouseDragged(mouseEvent, component);
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
    addDragSourceListener(dragSourceListener: DragSourceListener, useCapture?: boolean) {
        this.setDragEnabled(true);
        var mouseListener = this.getData("dragSourceListener");
        if (!mouseListener) {
            mouseListener = new JSMouseListener({
                mousePressed(mouseEvent: MouseEvent, component: JSComponent): void {
                    JSBody.getInstance().setDragSource(component);
                }
            });
            this.addMouseListener(mouseListener, useCapture === true);
            this.setData("dragSourceListener", mouseListener);
        }
        var dragSourceListeners: DragSourceListener[] = this.getDragSourceListeners();
        dragSourceListeners.push(dragSourceListener);
    }
    removeDragSourceListener(dragSourceListener: DragSourceListener) {
        var dragSourceListeners: DragSourceListener[] = this.getDragSourceListeners();
        var index = dragSourceListeners.indexOf(dragSourceListener);
        if (index !== -1) {
            dragSourceListeners.splice(index, 1);
        }
    }
    fireDragStart(mouseEvent: MouseEvent, component: JSComponent): void {
        var dragSourceListeners: DragSourceListener[] = this.getDragSourceListeners();
        for (var i: number = 0; i < dragSourceListeners.length; i++) {
            var dragSourceListener = dragSourceListeners[i];
            if (dragSourceListener.dragStart) {
                dragSourceListener.dragStart(mouseEvent, component);
            }
        }
    }
    fireDrag(mouseEvent: MouseEvent, component: JSComponent): void {
        var dragSourceListeners: DragSourceListener[] = this.getDragSourceListeners();
        for (var i: number = 0; i < dragSourceListeners.length; i++) {
            var dragSourceListener = dragSourceListeners[i];
            if (dragSourceListener.drag) {
                dragSourceListener.drag(mouseEvent, component);
            }
        }
    }
    fireDragEnd(mouseEvent: MouseEvent, component: JSComponent): void {
        var dragSourceListeners: DragSourceListener[] = this.getDragSourceListeners();
        for (var i: number = 0; i < dragSourceListeners.length; i++) {
            var dragSourceListener = dragSourceListeners[i];
            if (dragSourceListener.dragEnd) {
                dragSourceListener.dragEnd(mouseEvent, component);
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
    addDropTargetListener(dropTargetListener: DropTargetListener, useCapture?: boolean) {
        var mouseListener = this.getData("dropTargetListener");
        if (!mouseListener) {
            mouseListener = new JSMouseListener({
                mouseEntered(mouseEvent: MouseEvent, component: JSComponent): void {
                    var dragSource: JSComponent = JSBody.getInstance().getDragSource();
                    if (dragSource && dragSource.isDragEnabled()) {
                        var dragStart = dragSource.getData("dragStart");
                        if (dragStart) {
                            component.fireDragEnter(mouseEvent, component);
                        }
                    }
                },
                mouseMoved(mouseEvent: MouseEvent, component: JSComponent): void {
                    var dragSource: JSComponent = JSBody.getInstance().getDragSource();
                    if (dragSource && dragSource.isDragEnabled()) {
                        var dragStart = dragSource.getData("dragStart");
                        if (dragStart) {
                            component.fireDragOver(mouseEvent, component);
                        }
                    }
                },
                mouseExited(mouseEvent: MouseEvent, component: JSComponent): void {
                    var dragSource: JSComponent = JSBody.getInstance().getDragSource();
                    if (dragSource && dragSource.isDragEnabled()) {
                        var dragStart = dragSource.getData("dragStart");
                        if (dragStart) {
                            component.fireDragLeave(mouseEvent, component);
                        }
                    }
                },
                mouseReleased(mouseEvent: MouseEvent, component: JSComponent): void {
                    var dragSource: JSComponent = JSBody.getInstance().getDragSource();
                    if (dragSource && dragSource.isDragEnabled()) {
                        var dragStart = dragSource.getData("dragStart");
                        if (dragStart) {
                            component.fireDrop(mouseEvent, component);
                        }
                    }
                }
            });
            this.addMouseListener(mouseListener, useCapture === true);
            this.setData("dropTargetListener", mouseListener);
        }
        var dropTargetListeners: DropTargetListener[] = this.getDropTargetListeners();
        dropTargetListeners.push(dropTargetListener);
    }
    removeDropTargetListener(dropTargetListener: DropTargetListener) {
        var dropTargetListeners: DropTargetListener[] = this.getDropTargetListeners();
        var index = dropTargetListeners.indexOf(dropTargetListener);
        if (index !== -1) {
            dropTargetListeners.splice(index, 1);
        }
    }
    fireDragEnter(mouseEvent: MouseEvent, component: JSComponent): void {
        var dropTargetListeners: DropTargetListener[] = this.getDropTargetListeners();
        for (var i: number = 0; i < dropTargetListeners.length; i++) {
            var dropTargetListener = dropTargetListeners[i];
            if (dropTargetListener.dragEnter) {
                dropTargetListener.dragEnter(mouseEvent, component);
            }
        }
    }
    fireDragOver(mouseEvent: MouseEvent, component: JSComponent): void {
        var dropTargetListeners: DropTargetListener[] = this.getDropTargetListeners();
        for (var i: number = 0; i < dropTargetListeners.length; i++) {
            var dropTargetListener = dropTargetListeners[i];
            if (dropTargetListener.dragOver) {
                dropTargetListener.dragOver(mouseEvent, component);
            }
        }
    }
    fireDragLeave(mouseEvent: MouseEvent, component: JSComponent): void {
        var dropTargetListeners: DropTargetListener[] = this.getDropTargetListeners();
        for (var i: number = 0; i < dropTargetListeners.length; i++) {
            var dropTargetListener = dropTargetListeners[i];
            if (dropTargetListener.dragLeave) {
                dropTargetListener.dragLeave(mouseEvent, component);
            }
        }
    }
    fireDrop(mouseEvent: MouseEvent, component: JSComponent): void {
        var dropTargetListeners: DropTargetListener[] = this.getDropTargetListeners();
        for (var i: number = 0; i < dropTargetListeners.length; i++) {
            var dropTargetListener = dropTargetListeners[i];
            if (dropTargetListener.drop) {
                dropTargetListener.drop(mouseEvent, component);
            }
        }
    }
    isDraggable(): boolean {
        return this.getAttribute("draggable") === "true";
    }
    setDraggable(draggable: boolean) {
        this.setAttribute("draggable", "" + draggable);
        this.setStyle("-webkit-user-drag", draggable? "element" : "none");
        this.setDragEnabled(draggable);
    }
    getJSDragListeners(): JSDragListener[] {
        var jsDragListeners: JSDragListener[] = this.getData("jsDragListeners");
        if (jsDragListeners === undefined) {
            jsDragListeners = [];
            this.setData("jsDragListeners", jsDragListeners);
        }
        return jsDragListeners;
    }
    addDragListener(dragListener: DragListener, useCapture?: boolean): void {
        this.setDraggable(true);
        var jsDragListener: JSDragListener = new JSDragListener(dragListener, true);
        jsDragListener.setComponent(this);
        var jsDragListeners: JSDragListener[] = this.getJSDragListeners();
        jsDragListeners.push(jsDragListener);
        if (jsDragListener.dragStart) {
            this.element.addEventListener("dragstart", jsDragListener.dragStart, useCapture === true);
        }
        if (jsDragListener.drag) {
            this.element.addEventListener("drag", jsDragListener.drag, useCapture === true);
        }
        if (jsDragListener.dragEnd) {
            this.element.addEventListener("dragend", jsDragListener.dragEnd, useCapture === true);
        }
    }
    removeDragListener(dragListener: DragListener, useCapture?: boolean): void {
        var jsDragListeners: JSDragListener[] = this.getJSDragListeners();
        var index: number = 0;
        var jsDragListener: JSDragListener;
        for (; index < jsDragListeners.length; index++) {
            jsDragListener = jsDragListeners[index];
            if (jsDragListener.getDragListener() === dragListener) {
                break;
            }
        }
        if (index === jsDragListeners.length) {
            return;
        }
        jsDragListener.setComponent(null);
        jsDragListeners.splice(index, 1);
        if (dragListener.dragStart) {
            this.element.removeEventListener("dragstart", jsDragListener.dragStart, useCapture === true);
        }
        if (dragListener.drag) {
            this.element.removeEventListener("drag", jsDragListener.drag, useCapture === true);
        }
        if (dragListener.dragEnd) {
            this.element.removeEventListener("dragend", jsDragListener.dragEnd, useCapture === true);
        }
    }
    getJSDropListeners(): JSDropListener[] {
        var jsDropListeners: JSDropListener[] = this.getData("jsDropListeners");
        if (jsDropListeners === undefined) {
            jsDropListeners = [];
            this.setData("jsDropListeners", jsDropListeners);
        }
        return jsDropListeners;
    }
    addDropListener(dropListener: DropListener, useCapture?: boolean): void {
        var jsDropListener: JSDropListener = new JSDropListener(dropListener, true);
        jsDropListener.setComponent(this);
        var jsDropListeners: JSDropListener[] = this.getJSDropListeners();
        jsDropListeners.push(jsDropListener);
        if (jsDropListener.dragEnter) {
            this.element.addEventListener("dragenter", jsDropListener.dragEnter, useCapture === true);
        }
        if (jsDropListener.dragOver) {
            this.element.addEventListener("dragover", jsDropListener.dragOver, useCapture === true);
        }
        if (jsDropListener.dragLeave) {
            this.element.addEventListener("dragleave", jsDropListener.dragLeave, useCapture === true);
        }
        if (jsDropListener.drop) {
            this.element.addEventListener("drop", jsDropListener.drop, useCapture === true);
        }
    }
    removeDropListener(dropListener: DropListener, useCapture?: boolean): void {
        var jsDropListeners: JSDropListener[] = this.getJSDropListeners();
        var index: number = 0;
        var jsDropListener: JSDropListener;
        for (; index < jsDropListeners.length; index++) {
            jsDropListener = jsDropListeners[index];
            if (jsDropListener.getDropListener() === dropListener) {
                break;
            }
        }
        if (index === jsDropListeners.length) {
            return;
        }
        jsDropListener.setComponent(null);
        jsDropListeners.splice(index, 1);
        if (dropListener.dragEnter) {
            this.element.removeEventListener("dragenter", jsDropListener.dragEnter, useCapture === true);
        }
        if (dropListener.dragOver) {
            this.element.removeEventListener("dragover", jsDropListener.dragOver, useCapture === true);
        }
        if (dropListener.dragLeave) {
            this.element.removeEventListener("dragleave", jsDropListener.dragLeave, useCapture === true);
        }
        if (dropListener.drop) {
            this.element.removeEventListener("drop", jsDropListener.drop, useCapture === true);
        }
    }
    getJSChangeListeners(): JSChangeListener[] {
        var jsChangeListeners: JSChangeListener[] = this.getData("jsChangeListeners");
        if (jsChangeListeners === undefined) {
            jsChangeListeners = [];
            this.setData("jsChangeListeners", jsChangeListeners);
        }
        return jsChangeListeners;
    }
    addChangeListener(changeListener: ChangeListener, useCapture?: boolean): void {
        var jsChangeListener: JSChangeListener;
        if (changeListener instanceof JSChangeListener) {
            jsChangeListener = changeListener;
        } else {
            jsChangeListener = new JSChangeListener(changeListener, true);
        }
        jsChangeListener.setComponent(this);
        var jsChangeListeners: JSChangeListener[] = this.getJSChangeListeners();
        jsChangeListeners.push(jsChangeListener);
        this.element.addEventListener("change", jsChangeListener.stateChanged, useCapture === true);
    }
    removeChangeListener(changeListener: ChangeListener, useCapture?: boolean): void {
        var jsChangeListeners: JSChangeListener[] = this.getJSChangeListeners();
        var index: number = 0;
        var jsChangeListener: JSChangeListener;
        for (; index < jsChangeListeners.length; index++) {
            jsChangeListener = jsChangeListeners[index];
            if (jsChangeListener.getChangeListener() === changeListener) {
                break;
            }
        }
        if (index === jsChangeListeners.length) {
            return;
        }
        jsChangeListener.setComponent(null);
        jsChangeListeners.splice(index, 1);
        this.element.removeEventListener("change", jsChangeListener.stateChanged, useCapture === true);
    }
}