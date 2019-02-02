/// <reference path = "../jsuis.ts"/>
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
    
    constructor();
    constructor(element: Element);
    // overload
    constructor(element?: Element) {
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
        return this;
    }
    getName(): string {
        return this.getAttribute("name");
    }
    setName(name: string) {
        this.setAttribute("name", name);
        return this;
    }
	addClass(clazz: string): void {
        var clazzes: string = (this.getAttribute("class") || "").trim();
        if (clazzes.indexOf(" " + clazz + " ") !== -1 ||
                clazzes.indexOf(clazz + " ") !== -1 ||
                clazzes.indexOf(" " + clazz) !== -1) {
            return;
        }
        this.setAttribute("class", (clazzes + " " + clazz).trim());
	}
    getX(): number {
        return 0;
    }
    setX(x: number): void;
    setX(x: string): void;
    // overload
    setX(x: number | string): void {
    }
    getY(): number {
        return 0;
    }
    setY(y: number): void;
    setY(y: string): void;
    // overload
    setY(y: number | string): void {
    }
    
    width: number = 0;
    height: number = 0;
    oldWidth: number = -1;
    oldHeight: number = -1;
    
    getWidth(): number {
        return this.width;
    }
    setWidth(width: number): void;
    setWidth(width: string): void;
    // overload
    setWidth(width: number | string): void {
        if (typeof width === "number") {
            this.oldWidth = this.width;
            this.width = width;
        }
    }
    getHeight(): number {
        return this.height;
    }
    setHeight(height: number): void;
    setHeight(height: string): void;
    // overload
    setHeight(height: number | string): void {
        if (typeof height === "number") {
            this.oldHeight = this.height;
            this.height = height;
        }
    }
    
    getOuterWidth(): number {
        return 0;
    }
    setOuterWidth(outerWidth: number) {
    }
    getOuterHeight(): number {
        return 0;
    }
    setOuterHeight(outerHeight: number) {
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
        if (this.width !== this.oldWidth || this.height !== this.oldHeight) {
            var layout: JSLayout = this.getLayout();
            if (layout) {
                layout.layoutContainer(this);
            }
            this.validateChildren();
        }
    }
    validateChildren(): void {
        var components: JSComponent[] = this.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            component.validate();
        }
    }
    revalidate(): void {
        var layout: JSLayout = this.getLayout();
        if (layout) {
            layout.layoutContainer(this);
        }
        this.revalidateChildren();
    }
    revalidateChildren(): void {
        var components: JSComponent[] = this.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            component.revalidate();
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
    getIcon(): JSComponent {
        return this.getData("icon"); 
    }
    setIcon(icon: JSComponent) {
        this.setData("icon", icon);
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
    addEventListener(event: string, listener: (event: Event) => void, useCapture: boolean): void {
        this.element.addEventListener(event, listener, useCapture);
    }
    removeEventListener(event: string, listener: (event: Event) => void): void;
    removeEventListener(event: string, listener: (event: Event) => void, useCapture: boolean): void;
    // overload
    removeEventListener(event: string, listener: (event: Event) => void, useCapture?: boolean): void {
        if (useCapture === undefined) {
            this.element.removeEventListener(event, listener);
            this.element.removeEventListener(event, listener, true);
        } else {
            this.element.removeEventListener(event, listener, useCapture);
        }
    }
    addMouseListener(mouseListener: MouseListener): void;
    addMouseListener(mouseListener: MouseListener, useCapture: boolean): void;
    // overload
    addMouseListener(mouseListener: MouseListener, useCapture?: boolean): void {
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
            this.addMouseDraggedListener(<MouseDraggedListener> mouseListener, useCapture === true);
        }
    }
    removeMouseListener(mouseListener: MouseListener): void;
    removeMouseListener(mouseListener: MouseListener, useCapture: boolean): void;
    // overload
    removeMouseListener(mouseListener: MouseListener, useCapture?: boolean): void {
        if (mouseListener.mouseClicked) {
            if (useCapture === undefined) {
                this.element.removeEventListener("click", mouseListener.mouseClicked);
                this.element.removeEventListener("click", mouseListener.mouseClicked, true);
            } else {
                this.element.removeEventListener("click", mouseListener.mouseClicked, useCapture);
            }
        }
        if (mouseListener.mousePressed) {
            if (useCapture === undefined) {
                this.element.removeEventListener("mousedown", mouseListener.mouseClicked);
                this.element.removeEventListener("mousedown", mouseListener.mouseClicked, true);
            } else {
                this.element.removeEventListener("mousedown", mouseListener.mouseClicked, useCapture);
            }
        }
        if (mouseListener.mouseReleased) {
            if (useCapture === undefined) {
                this.element.removeEventListener("mouseup", mouseListener.mouseClicked);
                this.element.removeEventListener("mouseup", mouseListener.mouseClicked, true);
            } else {
                this.element.removeEventListener("mouseup", mouseListener.mouseClicked, useCapture);
            }
        }
        if (mouseListener.mouseEntered) {
            if (useCapture === undefined) {
                this.element.removeEventListener("mouseenter", mouseListener.mouseClicked);
                this.element.removeEventListener("mouseenter", mouseListener.mouseClicked, true);
            } else {
                this.element.removeEventListener("mouseenter", mouseListener.mouseClicked, useCapture);
            }
        }
        if (mouseListener.mouseExited) {
            if (useCapture === undefined) {
                this.element.removeEventListener("mouseleave", mouseListener.mouseClicked);
                this.element.removeEventListener("mouseleave", mouseListener.mouseClicked, true);
            } else {
                this.element.removeEventListener("mouseleave", mouseListener.mouseClicked, useCapture);
            }
        }
        if (mouseListener.mouseMoved) {
            if (useCapture === undefined) {
                this.element.removeEventListener("mousemove", mouseListener.mouseClicked);
                this.element.removeEventListener("mousemove", mouseListener.mouseClicked, true);
            } else {
                this.element.removeEventListener("mousemove", mouseListener.mouseClicked, useCapture);
            }
        }
        if (mouseListener.mouseDragged) {
            this.removeMouseDraggedListener(<MouseDraggedListener> mouseListener);
        }
    }
    addAdjustmentListener(adjustmentListener: AdjustmentListener): void;
    addAdjustmentListener(adjustmentListener: AdjustmentListener, useCapture: boolean): void;
    // overload
    addAdjustmentListener(adjustmentListener: AdjustmentListener, useCapture?: boolean): void {
        this.element.addEventListener("scroll", adjustmentListener.adjustmentValueChanged, useCapture === true);
    }
    removeAdjustmentListener(adjustmentListener: AdjustmentListener): void;
    removeAdjustmentListener(adjustmentListener: AdjustmentListener, useCapture: boolean): void;
    // overload
    removeAdjustmentListener(adjustmentListener: AdjustmentListener, useCapture?: boolean): void {
        if (useCapture === undefined) {
            this.element.removeEventListener("scroll", adjustmentListener.adjustmentValueChanged);
            this.element.removeEventListener("scroll", adjustmentListener.adjustmentValueChanged, true);
        } else {
            this.element.removeEventListener("scroll", adjustmentListener.adjustmentValueChanged, useCapture);
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
    addActionListener(actionListener: ActionListener) {
        var mouseListener = this.getData("actionListener");
        if (!mouseListener) {
            mouseListener = new JSMouseListener(this, {
                mouseClicked(mouseEvent: MouseEvent): void {
                    this.fireActionPerformed(new JSActionEvent(this, this.getActionCommand()));
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
    fireActionPerformed(actionEvent: JSActionEvent): void {
        var actionListeners: ActionListener[] = this.getActionListeners();
        for (var i: number = 0; i < actionListeners.length; i++) {
            var actionListener = actionListeners[i];
            actionListener.actionPerformed(actionEvent);
        }
    }
    getMouseDraggedListeners(): MouseDraggedListener[] {
        var mousedraggedListeners: MouseDraggedListener[] = this.getData("mouseDraggedListeners");
        if (mousedraggedListeners === undefined) {
            mousedraggedListeners = [];
            this.setData("mouseDraggedListeners", mousedraggedListeners);
        }
        return mousedraggedListeners;
    }
    addMouseDraggedListener(mouseDraggedListener: MouseDraggedListener, useCapture: boolean) {
        var mouseListener = this.getData("dragListener");
        if (!mouseListener) {
            mouseListener = new JSMouseListener(this, {
                mousePressed(mouseEvent: MouseEvent): void {
                    var body = JSBody.getInstance();
                    body.setDragSource(this);
                }
            });
            this.addMouseListener(mouseListener, useCapture);
            this.setData("dragListener", mouseListener);
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
    fireMouseDragged(mouseEvent: MouseEvent): void {
        var mouseDraggedListeners: MouseDraggedListener[] = this.getMouseDraggedListeners();
        for (var i: number = 0; i < mouseDraggedListeners.length; i++) {
            var mouseDraggedListener: MouseDraggedListener = mouseDraggedListeners[i];
            mouseDraggedListener.mouseDragged(mouseEvent);
        }
    }
    setDraggable(draggable: boolean) {
        this.setAttribute("draggable", "" + draggable);
        this.setStyle("-webkit-user-drag", draggable? "element" : "none");
    }
    addDragListener(dragListener: DragListener): void;
    addDragListener(dragListener: DragListener, useCapture: boolean): void;
    // overload
    addDragListener(dragListener: DragListener, useCapture?: boolean): void {
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
    }
    removeDragListener(dragListener: DragListener): void;
    removeDragListener(dragListener: DragListener, useCapture: boolean): void;
    // overload
    removeDragListener(dragListener: DragListener, useCapture?: boolean): void {
        if (dragListener.dragStart) {
            if (useCapture === undefined) {
                this.element.removeEventListener("dragstart", dragListener.dragStart);
                this.element.removeEventListener("dragstart", dragListener.dragStart, true);
            } else {
                this.element.removeEventListener("dragstart", dragListener.dragStart, useCapture);
            }
        }
        if (dragListener.drag) {
            if (useCapture === undefined) {
                this.element.removeEventListener("drag", dragListener.drag);
                this.element.removeEventListener("drag", dragListener.drag, true);
            } else {
                this.element.removeEventListener("drag", dragListener.drag, useCapture);
            }
        }
        if (dragListener.dragEnd) {
            if (useCapture === undefined) {
                this.element.removeEventListener("dragend", dragListener.dragEnd);
                this.element.removeEventListener("dragend", dragListener.dragEnd, true);
            } else {
                this.element.removeEventListener("dragend", dragListener.dragEnd, useCapture);
            }
        }
    }
    addDropListener(dropListener: DropListener): void;
    addDropListener(dropListener: DropListener, useCapture: boolean): void;
    addDropListener(dropListener: DropListener, useCapture?: boolean): void {
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
    }
    removeDropListener(dropListener: DropListener): void;
    removeDropListener(dropListener: DropListener, useCapture: boolean): void;
    // overload
    removeDropListener(dropListener: DropListener, useCapture?: boolean): void {
        if (dropListener.dragEnter) {
            if (useCapture === undefined) {
                this.element.removeEventListener("dragenter", dropListener.dragEnter);
                this.element.removeEventListener("dragenter", dropListener.dragEnter, true);
            } else {
                this.element.removeEventListener("dragenter", dropListener.dragEnter, useCapture);
            }
        }
        if (dropListener.dragOver) {
            if (useCapture === undefined) {
                this.element.removeEventListener("dragover", dropListener.dragOver);
                this.element.removeEventListener("dragover", dropListener.dragOver, true);
            } else {
                this.element.removeEventListener("dragover", dropListener.dragOver, useCapture);
            }
        }
        if (dropListener.dragLeave) {
            if (useCapture === undefined) {
                this.element.removeEventListener("dragleave", dropListener.dragLeave);
                this.element.removeEventListener("dragleave", dropListener.dragLeave, true);
            } else {
                this.element.removeEventListener("dragleave", dropListener.dragLeave, useCapture);
            }
        }
        if (dropListener.drop) {
            if (useCapture === undefined) {
                this.element.removeEventListener("drop", dropListener.drop);
                this.element.removeEventListener("drop", dropListener.drop, true);
            } else {
                this.element.removeEventListener("drop", dropListener.drop, useCapture);
            }
        }
    }
    addChangeListener(changeListener: ChangeListener): void;
    addChangeListener(changeListener: ChangeListener, useCapture: boolean): void;
    // overload
    addChangeListener(changeListener: ChangeListener, useCapture?: boolean): void {
        this.element.addEventListener("change", changeListener.stateChanged, useCapture === true);
    }
    removeChangeListener(changeListener: ChangeListener): void;
    removeChangeListener(changeListener: ChangeListener, useCapture: boolean): void;
    // overload
    removeChangeListener(changeListener: ChangeListener, useCapture?: boolean): void {
        if (useCapture === undefined) {
            this.element.removeEventListener("change", changeListener.stateChanged);
            this.element.removeEventListener("change", changeListener.stateChanged, true);
        } else {
            this.element.removeEventListener("change", changeListener.stateChanged, useCapture);
        }
    }
}