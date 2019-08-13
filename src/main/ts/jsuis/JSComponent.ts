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
     * orientation (JSProgressBar, JSScrollBar, JSSplitPane)
     */
    static HORIZONTAL: string = "horizontal";
    static VERTICAL: string = "vertical";
    
    /*
     * orientation (JSSplitPane)
     */
    static HORIZONTAL_SPLIT: string = "horizontal";
    static VERTICAL_SPLIT: string = "vertical";
    
    /*
     * policies
     */
    static VERTICAL_SCROLLBAR_AS_NEEDED: string = "auto";
    static VERTICAL_SCROLLBAR_NEVER: string = "hidden";
    static VERTICAL_SCROLLBAR_ALWAYS: string = "scroll";
    
    static HORIZONTAL_SCROLLBAR_AS_NEEDED: string = "auto";
    static HORIZONTAL_SCROLLBAR_NEVER: string = "hidden";
    static HORIZONTAL_SCROLLBAR_ALWAYS: string = "scroll";
    
    element: Element;
    private layout: JSLayout;
    private constraints: string | { [ key: string ]: number | string };
    private components: JSComponent[];
    private parent: JSComponent;
    private border: JSBorder;
    private icon: JSIcon;
    private componentPopupMenu: JSPopupMenu;
    private selection: JSSelection;
    private actionListeners: JSActionListener[];
    private componentActionListeners: JSComponentActionListener[];
    private componentActionListenerHandler: JSComponentActionListenerHandler;
    private mouseDraggedListeners: JSMouseDraggedListener[];
    private componentMouseDraggedListeners: JSComponentMouseDraggedListener[];
    private componentMouseDraggedListenerHandler: JSComponentMouseDraggedListenerHandler;
    private dragEnabled: boolean;
    private dragging: boolean;
    private dragSourceListeners: JSDragSourceListener[];
    private componentDragSourceListeners: JSComponentDragSourceListener[];
    private dropTargetListeners: JSDropTargetListener[];
    private componentDropTargetListeners: JSComponentDropTargetListener[];
    private componentDropTargetListenerHandler: JSComponentDropTargetListenerHandler;
    private adjustmentListeners: JSAdjustmentListener[];
    private componentAdjustmentListeners: JSComponentAdjustmentListener[];
    private changeListeners: JSChangeListener[];
    private componentChangeListeners: JSComponentChangeListener[];
    
    constructor(element: Element) {
        this.element = element;
        if ((<any> this.element).data === undefined) {
            (<any> this.element).data = {};
        }
        this.setUI("JSComponent");
        this.init();
    }
    init(): void {
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
    withStyle(style:string, value: string): JSComponent {
        this.setStyle(style, value);
        return this;
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
    getChild(clazz: string): Element {
        var childNodes: NodeList = this.element.childNodes;
        for (var i: number = 0; i < childNodes.length; i++) {
            var childNode: Node = childNodes.item(i);
            if (childNode instanceof Element) {
                var child = <Element> childNode;
                var clazzes: string = " " + (child.getAttribute("class") || "") + " ";
                if (clazzes.indexOf(" " + clazz + " ") !== -1) {
                    return child;
                }
            }
        }
        return null;
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
        var clazzes: string = " " + (this.getAttribute("class") || "") + " ";
        return clazzes.indexOf(" " + clazz + " ") !== -1;
    }
    addClass(clazz: string): void {
        var clazzes: string = " " + (this.getAttribute("class") || "") + " ";
        if (clazzes.indexOf(" " + clazz + " ") !== -1) {
            return;
        }
        this.setClass((clazzes.trim() + " " + clazz).trim());
    }
    removeClass(clazz: string): void {
        var clazzes: string = " " + (this.getAttribute("class") || "") + " ";
        while (clazzes.indexOf(" " + clazz + " ") !== -1) {
            clazzes = clazzes.replace(" " + clazz + " ", " ");
        }
        this.setClass(clazzes.trim());
    }
    getUI(): string {
        return this.getClass();
    }
    setUI(ui: string | JSUI) {
        if (typeof ui === "string") {
            this.setClass(ui);
        } else if (ui) {
            ui.installUI(this);
        } else {
            this.removeAttribute("style");
        }
        this.addClass((<any> this.constructor).name);
    }
    x: number;
    getX(): number {
        return this.x;
    }
    y: number;
    getY(): number {
        return this.y;
    }
    setX(x: number): void {
        this.x = x;
    }
    setY(y: number): void {
        this.y = y;
    }
    width: number;
    getWidth(): number {
        return this.width;
    }
    setWidth(width: number): void {
        this.width = width;
        // this.setValidHorizontally(false);
        this.validateHorizontally();
    }
    height: number;
    getHeight(): number {
        return this.height;
    }
    setHeight(height: number): void {
        this.height = height;
        // this.setValidVertically(false);
        this.validateVertically();
    }
    
    getContentWidth(): number {
        return this.getWidth();
    }
    setContentWidth(contentWidth: number) {
        this.setWidth(contentWidth);
    }
    getContentHeight(): number {
        return this.getHeight();
    }
    setContentHeight(contentHeight: number) {
        this.setHeight(contentHeight);
    }
    
    getOuterWidth(): number {
        return this.getWidth();
    }
    setOuterWidth(outerWidth: number): void {
        this.setWidth(outerWidth);
    }
    getOuterHeight(): number {
        return this.getHeight();
    }
    setOuterHeight(outerHeight: number): void {
        this.setHeight(outerHeight);
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
        return this.layout;
    }
    setLayout(layout: JSLayout) {
        this.layout = layout;
        if (layout) {
            this.setAttribute("data-layout", (<any> layout.constructor).name);
        } else {
            this.removeAttribute("data-layout");
        }
    }
    getConstraints(): string | { [ key: string ]: number | string } {
        return this.constraints;
    }
    setConstraints(constraints: string | { [ key: string]: number | string }) {
        this.constraints = constraints;
        if (constraints) {
            this.setAttribute("data-constraints", typeof constraints === "string" ? constraints : JSON.stringify(constraints));
        } else {
            this.removeAttribute("data-constraints");
        }
    }
    getLayer(): number {
        var layer: number = +this.getStyle("z-index");
        if (isNaN(layer)) {
            return 0;
        }
        return layer;
    }
    setLayer(layer: number) {
        if (layer === null) {
            this.setStyle("z-index", "auto");
            return;
        }
        this.setStyle("z-index", "" + layer);
    }
    getComponents(): JSComponent[] {
        if (!this.components) {
            this.components = [];
        }
        return this.components;
    }
    getComponentCount(): number {
        return this.getComponents().length;    
    }
    getParent(): JSComponent {
        return this.parent;
    }
    setParent(parent: JSComponent) {
        this.parent = parent;
    }
    add(component: JSComponent): void;
    add(component: JSComponent, constraints: number | Number | string | { [ key: string ]: number | string }): void;
    add(component: JSComponent, constraints: number | Number | string | { [ key: string ]: number | string }, index: number): void;
    // overload
    add(component: JSComponent, constraints?: number | Number | string | { [ key: string ]: number | string }, index?: number): void {
        if (constraints !== undefined) {
            if (typeof constraints === "number") {
                throw "TYPE ERROR";
                // component.setLayer(constraints);
            } else if (constraints instanceof Number) {
                component.setLayer(+constraints);
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
        var components: JSComponent[] = this.getComponents().slice();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            this.remove(component);
        }
        /*
        var element: Element = this.element;
        var firstChild: Node;
        while (firstChild = element.firstChild) {
            element.removeChild(firstChild);
        }
        */
    }
    
    isValid(): boolean {
        return this.isValidHorizontally() && this.isValidVertically();
    }
    setValid(valid: boolean) {
        this.setValidHorizontally(valid);
        this.setValidVertically(valid);
    }
    validHorizontally: boolean = false;
    isValidHorizontally(): boolean {
        return this.validHorizontally;
    }
    setValidHorizontally(validHorizontally: boolean) {
        this.validHorizontally = validHorizontally;
    }
    validVertically: boolean = false;
    isValidVertically(): boolean {
        return this.validVertically;
    }
    setValidVertically(validVertically: boolean) {
        this.validVertically = validVertically;
    }
    invalidate(container?: JSComponent): void {
        this.setValid(false);
        if (this !== container) {
            this.invalidateParent.apply(this, arguments);
        }
    }
    invalidateHorizontally(container?: JSComponent): void {
        this.setValidHorizontally(false);
        if (this !== container) {
            this.invalidateParentHorizontally.apply(this, arguments);
        }
    }
    invalidateVertically(container?: JSComponent): void {
        this.setValidVertically(false);
        if (this !== container) {
            this.invalidateParentVertically.apply(this, arguments);
        }
    }
    isValidateRoot(): boolean {
        return false;
    }
    invalidateParent(container?: JSComponent): void {
        if (!this.isValidateRoot()) {
            var parent: JSComponent = this.getParent();
            if (parent) {
                parent.invalidate.apply(parent, arguments);
            }
        }
    }
    invalidateParentHorizontally(container?: JSComponent): void {
        if (!this.isValidateRoot()) {
            var parent: JSComponent = this.getParent();
            if (parent) {
                parent.invalidateHorizontally.apply(parent, arguments);
            }
        }
    }
    invalidateParentVertically(container?: JSComponent): void {
        if (!this.isValidateRoot()) {
            var parent: JSComponent = this.getParent();
            if (parent) {
                parent.invalidateVertically.apply(parent, arguments);
            }
        }
    }
    invalidateChildren(): void {
        var components: JSComponent[] = this.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            component.setValid(false);
            component.invalidateChildren();
        }
    }
    validate(): void {
        this.invalidateChildren();
        JSLayout.validateLater(this);
        JSLayout.validateContainers();
    }
    validateHorizontally(): void {
        this.setValidHorizontally(false);
        var layout: JSLayout = this.getLayout();
        if (layout) {
            layout.invalidateLayoutHorizontally(this);
            layout.layoutContainerHorizontally(this);
            if (!this.isValidHorizontally()) {
                JSLayout.validateLater(this);
                var container: JSComponent = JSLayout.getContainers()[0];
                JSLayout.validateLater(container);
            }
        } else {
            var components: JSComponent[] = this.getComponents();
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentLayout: JSLayout = component.getLayout();
                if (componentLayout) {
                    var preferredOuterWidth: number = component.getPreferredOuterWidth();
                    if (preferredOuterWidth !== null) {
                        var position: string = component.getStyle("position");
                        if (!position || (position !== "absolute" && position !== "fixed" && position !== "sticky" && position !== "relative")) {
                            component.setStyle("position", "relative");
                        } 
                        component.setOuterWidth(preferredOuterWidth);
                    } else {
                        JSLayout.validateLater(component);
                    }
                } else {
                    component.validateHorizontally();
                }
            }
            if (i === components.length) {
                this.setValidHorizontally(true);
            }
        }
    }
    validateVertically(): void {
        this.setValidVertically(false);
        var layout: JSLayout = this.getLayout();
        if (layout) {
            layout.invalidateLayoutVertically(this);
            layout.layoutContainerVertically(this);
            if (!this.isValidVertically()) {
                JSLayout.validateLater(this);
                var container: JSComponent = JSLayout.getContainers()[0];
                JSLayout.validateLater(container);
            }
        } else {
            var components: JSComponent[] = this.getComponents();
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentLayout: JSLayout = component.getLayout();
                if (componentLayout) {
                    var preferredOuterHeight: number = component.getPreferredOuterHeight();
                    if (preferredOuterHeight !== null) {
                        var position: string = component.getStyle("position");
                        if (!position || (position !== "absolute" && position !== "fixed" && position !== "sticky" && position !== "relative")) {
                            component.setStyle("position", "relative");
                        } 
                        component.setOuterHeight(preferredOuterHeight);
                    } else {
                        JSLayout.validateLater(component);
                    }
                } else {
                    component.validateVertically();
                }
            }
            if (i === components.length) {
                this.setValidVertically(true);
            }
        }
    }
    revalidate(container?: JSComponent): void {
        this.invalidate.apply(this, arguments);
        if (this === container) {
            this.validate();
        } else {
            var parent: JSComponent = this.getParent();
            if (!parent) {
                this.validate();
            } else {
                while (parent !== container && !parent.isValidateRoot()) {
                    if (!parent.getParent()) {
                        break;
                    }
                    parent = parent.getParent();
                }
                parent.validate();
            }
        }
    }
    /*
    revalidateHorizontally(container?: JSComponent): void {
        this.invalidateHorizontally.apply(this, arguments);
        if (this === container) {
            this.validateHorizontally();
        } else {
            var parent: JSComponent = this.getParent();
            if (!parent) {
                this.validateHorizontally();
            } else {
                while (parent !== container && !parent.isValidateRoot()) {
                    if (!parent.getParent()) {
                        break;
                    }
                    parent = parent.getParent();
                }
                parent.validateHorizontally();
            }
        }
    }
    revalidateVertically(container?: JSComponent): void {
        this.invalidateVertically.apply(this, arguments);
        if (this === container) {
            this.validateVertically();
        } else {
            var parent: JSComponent = this.getParent();
            if (!parent) {
                this.validateVertically();
            } else {
                while (parent !== container && !parent.isValidateRoot()) {
                    if (!parent.getParent()) {
                        break;
                    }
                    parent = parent.getParent();
                }
                parent.validateVertically();
            }
        }
    }
    */
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
        return +this.getAttribute("data-preferred-width");
    }
    setPreferredWidth(preferredWidth: number) {
        if (preferredWidth === null) {
            this.removeAttribute("data-preferred-width");
        } else {
            this.setAttribute("data-preferred-width", "" + preferredWidth);
        }
    }
    getPreferredHeight(): number {
        return +this.getAttribute("data-preferred-height");
    }
    setPreferredHeight(preferredHeight: number) {
        if (preferredHeight === null) {
            this.removeAttribute("data-preferred-height");
        } else {
            this.setAttribute("data-preferred-height", "" + preferredHeight);
        }
    }
    getPreferredOuterWidth(): number {
        return this.getPreferredWidth();
    }
    getPreferredOuterHeight(): number {
        return this.getPreferredHeight();
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
    setMargin(top: number, left: number, bottom: number, right: number): void {
    }
    setPadding(top: number, left: number, bottom: number, right: number): void {
    }
    
    align: string;
    
    getAlign(): string {
        return this.align;
    }
    setAlign(align: string) {
        this.align = align;
    }
    
    horizontalAlign: string;
    getHorizontalAlign(): string {
        if (this.horizontalAlign) {
            return this.horizontalAlign;
        }
        var align: string = this.getAlign();
        if (!align || align === JSLayout.LEFT || align === JSLayout.RIGHT || align === JSLayout.CENTER || align === JSLayout.LEFT_RIGHT || align === JSLayout.JUSTIFY) {
            return align;
        }
        if (align === JSLayout.TOP || align === JSLayout.BOTTOM || align === JSLayout.TOP_BOTTOM) {
            return JSLayout.CENTER;
        }
        return undefined;
    }
    setHorizontalAlign(horizontalAlign: string) {
        this.horizontalAlign = horizontalAlign;
    }
    
    verticalAlign: string;
    getVerticalAlign(): string {
        if (this.verticalAlign) {
            return this.verticalAlign;
        }
        var align: string = this.getAlign();
        if (!align || align === JSLayout.TOP || align === JSLayout.BOTTOM || align === JSLayout.CENTER || align === JSLayout.TOP_BOTTOM) {
            return align;
        }
        if (align === JSLayout.LEFT || align === JSLayout.RIGHT || align === JSLayout.LEFT_RIGHT) {
            return JSLayout.CENTER;
        }
        return undefined;
    }
    setVerticalAlignment(verticalAlign: string) {
        this.verticalAlign = verticalAlign;
    }
    
    /*
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
    */
    getText(): string {
        return "";
    }
    setText(text: string) {
    }
    getBorder(): JSBorder {
        return this.border;
    }
    setBorder(border: JSBorder) {
        this.border = border;
        if (border) {
            border.paintBorder(this);
        } else {
            this.setStyle("border", "none");
        }
    }
    getCursor(): string {
        return "";
    }
    setCursor(cursor: string) {
    }
    getGraphics(): JSComponent {
        return null;
    }
    getIcon(): JSIcon {
        return this.icon;
    }
    setIcon(icon: JSIcon) {
        this.icon = icon;
        var graphics: JSComponent = this.getGraphics();
        if (graphics) {
            if (icon) {
                icon.paintIcon(this, graphics);
            } else {
                graphics.removeAll();
            }
        }
    }
    
    action: JSAction;
    actionPropertyChangeListener: JSPropertyChangeListener;
    enabled: boolean;
    
    getAction(): JSAction {
        return this.action;
    }
    setAction(action: JSAction) {
        var oldAction: JSAction = this.getAction();
        if (oldAction) {
            this.removeActionListener(oldAction);
            var actionPropertyChangeListener = this.getActionPropertyChangeListener();
            oldAction.removePropertyChangeListener(actionPropertyChangeListener);
        }
        this.action = action;
        var name = action.getName();
        if (name) {
            this.setText(name);
        }
        var icon = action.getIcon();
        if (icon) {
            this.setIcon(icon);
        }
        this.setEnabled(action.isEnabled());
        this.addActionListener(action);
        var actionPropertyChangeListener: JSPropertyChangeListener = new JSComponentPropertyChangeListener(this);
        this.setActionPropertyChangeListener(actionPropertyChangeListener);
        action.addPropertyChangeListener(actionPropertyChangeListener);
    }
    getActionPropertyChangeListener(): JSPropertyChangeListener {
        return this.actionPropertyChangeListener;
    }
    setActionPropertyChangeListener(actionPropertyChangeListener: JSPropertyChangeListener) {
        this.actionPropertyChangeListener = actionPropertyChangeListener;
    }
    isEnabled(): boolean {
        return this.enabled;
    }
    setEnabled(enabled: boolean) {
        this.enabled = enabled;
    }
    
    getComponentPopupMenu(): JSPopupMenu {
        return this.componentPopupMenu; 
    }
    setComponentPopupMenu(componentPopupMenu: JSPopupMenu) {
        this.componentPopupMenu = componentPopupMenu;
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
        return this.selection; 
    }
    setSelection(selection: JSSelection) {
        this.selection = selection;
    }
    isEditable(): boolean {
        return this.getAttribute("contenteditable") === "true";
    }
    setEditable(contenteditable: boolean) {
        this.setAttribute("contenteditable", "" + contenteditable);
    }
    requestFocus(): void {
    }
    addEventListener(event: string, listener: (event: Event) => void, useCapture?: boolean): void {
        this.element.addEventListener(event, listener, !!useCapture);
    }
    removeEventListener(event: string, listener: (event: Event) => void, useCapture?: boolean): void {
        this.element.removeEventListener(event, listener, !!useCapture);
    }
    
    private keyListeners: JSKeyListener[];
    getKeyListeners(): JSKeyListener[] {
        if (!this.keyListeners) {
            this.keyListeners = [];
        }
        return this.keyListeners;
    }
    private componentKeyListeners: JSComponentKeyListener[];
    getComponentKeyListeners(): JSComponentKeyListener[] {
        if (!this.componentKeyListeners) {
            this.componentKeyListeners = [];
        }
        return this.componentKeyListeners;
    }
    addKeyListener(keyListener: JSKeyListener, useCapture?: boolean): JSComponentKeyListener {
        var keyListeners: JSKeyListener[] = this.getKeyListeners();
        var componentKeyListeners: JSComponentKeyListener[] = this.getComponentKeyListeners();
        var index: number = keyListeners.indexOf(keyListener);
        if (index !== -1) {
            return componentKeyListeners[index];
        }
        keyListeners.push(keyListener);
        var componentKeyListener: JSComponentKeyListener = new JSComponentKeyListener(keyListener);
        componentKeyListeners.push(componentKeyListener);
        if (componentKeyListener.keyTyped) {
            this.element.addEventListener("keypress", componentKeyListener.keyTyped, !!useCapture);
        }
        if (componentKeyListener.keyPressed) {
            this.element.addEventListener("keydown", componentKeyListener.keyPressed, !!useCapture);
        }
        if (componentKeyListener.keyReleased) {
            this.element.addEventListener("keyup", componentKeyListener.keyReleased, !!useCapture);
        }
        return componentKeyListener;
    }
    removeKeyListener(keyListener: JSKeyListener, useCapture?: boolean): void {
        var keyListeners: JSKeyListener[] = this.getKeyListeners();
        var index: number = keyListeners.indexOf(keyListener);
        if (index !== -1) {
            var componentKeyListeners: JSComponentKeyListener[] = this.getComponentKeyListeners();
            var componentKeyListener = componentKeyListeners[index];
            if (componentKeyListener.keyTyped) {
                this.element.removeEventListener("keypress", componentKeyListener.keyTyped, !!useCapture);
            }
            if (componentKeyListener.keyPressed) {
                this.element.removeEventListener("keydown", componentKeyListener.keyPressed, !!useCapture);
            }
            if (componentKeyListener.keyReleased) {
                this.element.removeEventListener("keyup", componentKeyListener.keyReleased, !!useCapture);
            }
            keyListeners.splice(index, 1);
            componentKeyListeners.splice(index, 1);
        }
    }
    
    private mouseListeners: JSMouseListener[];
    getMouseListeners(): JSMouseListener[] {
        if (!this.mouseListeners) {
            this.mouseListeners = [];
        }
        return this.mouseListeners;
    }
    private componentMouseListeners: JSComponentMouseListener[];
    getComponentMouseListeners(): JSComponentMouseListener[] {
        if (!this.componentMouseListeners) {
            this.componentMouseListeners = [];
        }
        return this.componentMouseListeners;
    }
    addMouseListener(mouseListener: JSMouseListener, useCapture?: boolean): JSComponentMouseListener {
        var mouseListeners: JSMouseListener[] = this.getMouseListeners();
        var componentMouseListeners: JSComponentMouseListener[] = this.getComponentMouseListeners();
        var index: number = mouseListeners.indexOf(mouseListener);
        if (index !== -1) {
            return componentMouseListeners[index];
        }
        mouseListeners.push(mouseListener);
        var componentMouseListener: JSComponentMouseListener = new JSComponentMouseListener(mouseListener);
        componentMouseListeners.push(componentMouseListener);
        if (componentMouseListener.mouseClicked) {
            this.element.addEventListener("click", componentMouseListener.mouseClicked, !!useCapture);
        }
        if (componentMouseListener.mousePressed) {
            this.element.addEventListener("mousedown", componentMouseListener.mousePressed, !!useCapture);
        }
        if (componentMouseListener.mouseReleased) {
            this.element.addEventListener("mouseup", componentMouseListener.mouseReleased, !!useCapture);
        }
        if (componentMouseListener.mouseEntered) {
            this.element.addEventListener("mouseenter", componentMouseListener.mouseEntered, !!useCapture);
        }
        if (componentMouseListener.mouseExited) {
            this.element.addEventListener("mouseleave", componentMouseListener.mouseExited, !!useCapture);
        }
        if (componentMouseListener.mouseMoved) {
            this.element.addEventListener("mousemove", componentMouseListener.mouseMoved, !!useCapture);
        }
        if (componentMouseListener.mouseDragged) {
            this.addMouseDraggedListener(<JSMouseDraggedListener> componentMouseListener);
        }
        return componentMouseListener.withParameters(this);
    }
    removeMouseListener(mouseListener: JSMouseListener, useCapture?: boolean): void {
        var mouseListeners: JSMouseListener[] = this.getMouseListeners();
        var index: number = mouseListeners.indexOf(mouseListener);
        if (index !== -1) {
            var componentMouseListeners: JSComponentMouseListener[] = this.getComponentMouseListeners();
            var componentMouseListener = componentMouseListeners[index];
            if (componentMouseListener.mouseClicked) {
                this.element.removeEventListener("click", componentMouseListener.mouseClicked, !!useCapture);
            }
            if (componentMouseListener.mousePressed) {
                this.element.removeEventListener("mousedown", componentMouseListener.mousePressed, !!useCapture);
            }
            if (componentMouseListener.mouseReleased) {
                this.element.removeEventListener("mouseup", componentMouseListener.mouseReleased, !!useCapture);
            }
            if (componentMouseListener.mouseEntered) {
                this.element.removeEventListener("mouseenter", componentMouseListener.mouseEntered, !!useCapture);
            }
            if (componentMouseListener.mouseExited) {
                this.element.removeEventListener("mouseleave", componentMouseListener.mouseExited, !!useCapture);
            }
            if (componentMouseListener.mouseMoved) {
                this.element.removeEventListener("mousemove", componentMouseListener.mouseMoved, !!useCapture);
            }
            if (componentMouseListener.mouseDragged) {
                this.removeMouseDraggedListener(<JSMouseDraggedListener> componentMouseListener);
            }
            mouseListeners.splice(index, 1);
            componentMouseListeners.splice(index, 1);
        }
    }
    getActionCommand(): string {
        return this.getAttribute("data-action-command");
    }
    setActionCommand(actionCommand: string) {
        this.setAttribute("data-action-command", actionCommand);
    }
    getActionListeners(): JSActionListener[] {
        if (!this.actionListeners) {
            this.actionListeners = [];
        }
        return this.actionListeners;
    }
    addActionListener(actionListener: JSActionListener): JSComponentActionListener {
        var actionListeners: JSActionListener[] = this.getActionListeners();
        var componentActionListeners: JSComponentActionListener[] = this.getComponentActionListeners();
        var index = actionListeners.indexOf(actionListener);
        if (index !== -1) {
            return componentActionListeners[index];;
        }
        actionListeners.push(actionListener);
        var componentActionListener: JSComponentActionListener = new JSComponentActionListener(actionListener);
        componentActionListeners.push(componentActionListener);
        var componentActionListenerHandler: JSComponentActionListenerHandler = this.getComponentActionListenerHandler();
        if (!componentActionListenerHandler) {
            componentActionListenerHandler = new JSComponentActionListenerHandler(this);
            this.addMouseListener(componentActionListenerHandler);
            this.setComponentActionListenerHandler(componentActionListenerHandler);
        }
        return componentActionListener.withParameters(this);
    }
    removeActionListener(actionListener: JSActionListener): void {
        var actionListeners: JSActionListener[] = this.getActionListeners();
        var index = actionListeners.indexOf(actionListener);
        if (index !== -1) {
            var componentActionListeners: JSComponentActionListener[] = this.getComponentActionListeners();
            actionListeners.splice(index, 1);
            componentActionListeners.splice(index, 1);
        }
    }
    fireActionPerformed(event: Event): void {
        var componentActionListeners: JSComponentActionListener[] = this.getComponentActionListeners();
        for (var i: number = 0; i < componentActionListeners.length; i++) {
            var componentActionListener: JSComponentActionListener = componentActionListeners[i];
            componentActionListener.actionPerformed(event);
        }
    }
    getComponentActionListeners(): JSComponentActionListener[] {
        if (!this.componentActionListeners) {
            this.componentActionListeners = [];
        }
        return this.componentActionListeners;
    }
    getComponentActionListenerHandler(): JSComponentActionListenerHandler {
        return this.componentActionListenerHandler;
    }
    setComponentActionListenerHandler(componentActionListenerHandler: JSComponentActionListenerHandler) {
        this.componentActionListenerHandler = componentActionListenerHandler;
    }
    getMouseDraggedListeners(): JSMouseDraggedListener[] {
        if (!this.mouseDraggedListeners) {
            this.mouseDraggedListeners = [];
        }
        return this.mouseDraggedListeners;
    }
    addMouseDraggedListener(mouseDraggedListener: JSMouseDraggedListener): JSComponentMouseDraggedListener {
        var mouseDraggedListeners: JSMouseDraggedListener[] = this.getMouseDraggedListeners();
        var componentMouseDraggedListeners: JSComponentMouseDraggedListener[] = this.getComponentMouseDraggedListeners();
        var index = mouseDraggedListeners.indexOf(mouseDraggedListener);
        if (index !== -1) {
            return componentMouseDraggedListeners[index];
        }
        mouseDraggedListeners.push(mouseDraggedListener);
        var componentMouseDraggedListener: JSComponentMouseDraggedListener = new JSComponentMouseDraggedListener(mouseDraggedListener);
        componentMouseDraggedListeners.push(componentMouseDraggedListener);
        var componentMouseDraggedListenerHandler: JSComponentMouseDraggedListenerHandler = this.getComponentMouseDraggedListenerHandler();
        if (!componentMouseDraggedListenerHandler) {
            componentMouseDraggedListenerHandler = new JSComponentMouseDraggedListenerHandler(this);
            this.addMouseListener(componentMouseDraggedListenerHandler);
            this.setComponentMouseDraggedListenerHandler(componentMouseDraggedListenerHandler);
        }
        return componentMouseDraggedListener.withParameters(this);
    }
    removeMouseDraggedListener(mouseDraggedListener: JSMouseDraggedListener): void {
        var mouseDraggedListeners: JSMouseDraggedListener[] = this.getMouseDraggedListeners();
        var index = mouseDraggedListeners.indexOf(mouseDraggedListener);
        if (index !== -1) {
            var componentMouseDraggedListeners: JSComponentMouseDraggedListener[] = this.getComponentMouseDraggedListeners();
            mouseDraggedListeners.splice(index, 1);
            componentMouseDraggedListeners.splice(index, 1);
        }
    }
    fireMouseDragged(mouseEvent: MouseEvent): void {
        var componentMouseDraggedListeners: JSComponentMouseDraggedListener[] = this.getComponentMouseDraggedListeners();
        for (var i: number = 0; i < componentMouseDraggedListeners.length; i++) {
            var componentMouseDraggedListener: JSComponentMouseDraggedListener = componentMouseDraggedListeners[i];
            componentMouseDraggedListener.mouseDragged(mouseEvent);
        }
    }
    getComponentMouseDraggedListeners(): JSComponentMouseDraggedListener[] {
        if (!this.componentMouseDraggedListeners) {
            this.componentMouseDraggedListeners = [];
        }
        return this.componentMouseDraggedListeners;
    }
    getComponentMouseDraggedListenerHandler(): JSComponentMouseDraggedListenerHandler {
        return this.componentMouseDraggedListenerHandler;
    }
    setComponentMouseDraggedListenerHandler(componentMouseDraggedListenerHandler: JSComponentMouseDraggedListenerHandler) {
        this.componentMouseDraggedListenerHandler = componentMouseDraggedListenerHandler;
    }
    isDragEnabled(): boolean {
        return this.dragEnabled;
    }
    setDragEnabled(dragEnable: boolean) {
        this.dragEnabled = dragEnable;
    }
    isDragging(): boolean {
        return this.dragging;
    }
    setDragging(dragging: boolean) {
        this.dragging = dragging;
    }
    getDragSourceListeners(): JSDragSourceListener[] {
        if (!this.dragSourceListeners) {
            this.dragSourceListeners = [];
        }
        return this.dragSourceListeners;
    }
    addDragSourceListener(dragSourceListener: JSDragSourceListener): JSComponentDragSourceListener {
        this.setDragEnabled(true);
        var dragSourceListeners: JSDragSourceListener[] = this.getDragSourceListeners();
        var componentDragSourceListeners: JSComponentDragSourceListener[] = this.getComponentDragSourceListeners();
        var index = dragSourceListeners.indexOf(dragSourceListener);
        if (index !== -1) {
            return componentDragSourceListeners[index];
        }
        dragSourceListeners.push(dragSourceListener);
        var componentDragSourceListener: JSComponentDragSourceListener = new JSComponentDragSourceListener(dragSourceListener);
        componentDragSourceListeners.push(componentDragSourceListener);
        var componentMouseDraggedListenerHandler: JSComponentMouseDraggedListenerHandler = this.getComponentMouseDraggedListenerHandler();
        if (!componentMouseDraggedListenerHandler) {
            componentMouseDraggedListenerHandler = new JSComponentMouseDraggedListenerHandler(this);
            this.addMouseListener(componentMouseDraggedListenerHandler);
            this.setComponentMouseDraggedListenerHandler(componentMouseDraggedListenerHandler);
        }
        return componentDragSourceListener.withParameters(this);
    }
    removeDragSourceListener(dragSourceListener: JSDragSourceListener): void {
        var dragSourceListeners: JSDragSourceListener[] = this.getDragSourceListeners();
        var index = dragSourceListeners.indexOf(dragSourceListener);
        if (index !== -1) {
            var componentDragSourceListeners: JSComponentDragSourceListener[] = this.getComponentDragSourceListeners();
            dragSourceListeners.splice(index, 1);
            componentDragSourceListeners.splice(index, 1);
        }
        if (!dragSourceListeners.length) {
            this.setDragEnabled(false);
        }
    }
    getComponentDragSourceListeners(): JSComponentDragSourceListener[] {
        if (!this.componentDragSourceListeners) {
            this.componentDragSourceListeners = [];
        }
        return this.componentDragSourceListeners;
    }
    fireDragStart(mouseEvent: MouseEvent): void {
        var componentDragSourceListeners: JSComponentDragSourceListener[] = this.getComponentDragSourceListeners();
        for (var i: number = 0; i < componentDragSourceListeners.length; i++) {
            var componentDragSourceListener: JSComponentDragSourceListener = componentDragSourceListeners[i];
            if (componentDragSourceListener.dragStart) {
                componentDragSourceListener.dragStart(mouseEvent);
            }
        }
    }
    fireDrag(mouseEvent: MouseEvent): void {
        var componentDragSourceListeners: JSComponentDragSourceListener[] = this.getComponentDragSourceListeners();
        for (var i: number = 0; i < componentDragSourceListeners.length; i++) {
            var componentDragSourceListener: JSComponentDragSourceListener = componentDragSourceListeners[i];
            if (componentDragSourceListener.drag) {
                componentDragSourceListener.drag(mouseEvent);
            }
        }
    }
    fireDragEnd(mouseEvent: MouseEvent): void {
        var componentDragSourceListeners: JSComponentDragSourceListener[] = this.getComponentDragSourceListeners();
        for (var i: number = 0; i < componentDragSourceListeners.length; i++) {
            var componentDragSourceListener: JSComponentDragSourceListener = componentDragSourceListeners[i];
            if (componentDragSourceListener.dragEnd) {
                componentDragSourceListener.dragEnd(mouseEvent);
            }
        }
    }
    fireMouseReleased(mouseEvent: MouseEvent): void {
        var componentMouseListeners: JSComponentMouseListener[] = this.getComponentMouseListeners();
        for (var i: number = 0; i < componentMouseListeners.length; i++) {
            var componentMouseListener: JSComponentMouseListener = componentMouseListeners[i];
            if (componentMouseListener.mouseReleased) {
                componentMouseListener.mouseReleased(mouseEvent);
            }
        }
    }
    getDropTargetListeners(): JSDropTargetListener[] {
        if (!this.dropTargetListeners) {
            this.dropTargetListeners = [];
        }
        return this.dropTargetListeners;
    }
    addDropTargetListener(dropTargetListener: JSDropTargetListener, useCapture?: boolean): JSComponentDropTargetListener {
        var dropTargetListeners: JSDropTargetListener[] = this.getDropTargetListeners();
        var componentDropTargetListeners: JSComponentDropTargetListener[] = this.getComponentDropTargetListeners();
        var index = dropTargetListeners.indexOf(dropTargetListener);
        if (index !== -1) {
            return componentDropTargetListeners[index];
        }
        dropTargetListeners.push(dropTargetListener);
        var componentDropTargetListener: JSComponentDropTargetListener = new JSComponentDropTargetListener(dropTargetListener);
        componentDropTargetListeners.push(componentDropTargetListener);
        var componentDropTargetListenerHandler: JSComponentDropTargetListenerHandler = this.getComponentDropTargetListenerHandler();
        if (!componentDropTargetListenerHandler) {
            componentDropTargetListenerHandler = new JSComponentDropTargetListenerHandler(this);
            this.addMouseListener(componentDropTargetListenerHandler);
            this.setComponentDropTargetListenerHandler(componentDropTargetListenerHandler);
        }
        return componentDropTargetListener.withParameters(this);
    }
    removeDropTargetListener(dropTargetListener: JSDropTargetListener): void {
        var dropTargetListeners: JSDropTargetListener[] = this.getDropTargetListeners();
        var index = dropTargetListeners.indexOf(dropTargetListener);
        if (index !== -1) {
            var componentDropTargetListeners: JSComponentDropTargetListener[] = this.getComponentDropTargetListeners();
            dropTargetListeners.splice(index, 1);
            componentDropTargetListeners.splice(index, 1);
        }
    }
    fireDragEnter(mouseEvent: MouseEvent): void {
        var componentDropTargetListeners: JSComponentDropTargetListener[] = this.getComponentDropTargetListeners();
        for (var i: number = 0; i < componentDropTargetListeners.length; i++) {
            var componentDropTargetListener = componentDropTargetListeners[i];
            if (componentDropTargetListener.dragEnter) {
                componentDropTargetListener.dragEnter(mouseEvent, this);
            }
        }
    }
    fireDragOver(mouseEvent: MouseEvent): void {
        var componentDropTargetListeners: JSComponentDropTargetListener[] = this.getComponentDropTargetListeners();
        for (var i: number = 0; i < componentDropTargetListeners.length; i++) {
            var componentDropTargetListener = componentDropTargetListeners[i];
            if (componentDropTargetListener.dragOver) {
                componentDropTargetListener.dragOver(mouseEvent, this);
            }
        }
    }
    fireDragLeave(mouseEvent: MouseEvent): void {
        var componentDropTargetListeners: JSComponentDropTargetListener[] = this.getComponentDropTargetListeners();
        for (var i: number = 0; i < componentDropTargetListeners.length; i++) {
            var componentDropTargetListener = componentDropTargetListeners[i];
            if (componentDropTargetListener.dragLeave) {
                componentDropTargetListener.dragLeave(mouseEvent, this);
            }
        }
    }
    fireDrop(mouseEvent: MouseEvent): void {
        var componentDropTargetListeners: JSComponentDropTargetListener[] = this.getComponentDropTargetListeners();
        for (var i: number = 0; i < componentDropTargetListeners.length; i++) {
            var componentDropTargetListener = componentDropTargetListeners[i];
            if (componentDropTargetListener.drop) {
                componentDropTargetListener.drop(mouseEvent, this);
            }
        }
    }
    getComponentDropTargetListeners(): JSComponentDropTargetListener[] {
        if (!this.componentDropTargetListeners) {
            this.componentDropTargetListeners = [];
        }
        return this.componentDropTargetListeners;
    }
    getComponentDropTargetListenerHandler(): JSComponentDropTargetListenerHandler {
        return this.componentDropTargetListenerHandler;
    }
    setComponentDropTargetListenerHandler(componentDropTargetListenerHandler: JSComponentDropTargetListenerHandler) {
        this.componentDropTargetListenerHandler = componentDropTargetListenerHandler;
    }
    getAdjustmentListeners(): JSAdjustmentListener[] {
        if (!this.adjustmentListeners) {
            this.adjustmentListeners = [];
        }
        return this.adjustmentListeners;
    }
    getComponentAdjustmentListeners(): JSComponentAdjustmentListener[] {
        if (!this.componentAdjustmentListeners) {
            this.componentAdjustmentListeners = [];
        }
        return this.componentAdjustmentListeners;
    }
    addAdjustmentListener(adjustmentListener: JSAdjustmentListener, useCapture?: boolean): JSComponentAdjustmentListener {
        var adjustmentListeners: JSAdjustmentListener[] = this.getAdjustmentListeners();
        var componentAdjustmentListeners: JSComponentAdjustmentListener[] = this.getComponentAdjustmentListeners();
        var index: number = adjustmentListeners.indexOf(adjustmentListener);
        if (index !== -1) {
            return componentAdjustmentListeners[index];
        }
        adjustmentListeners.push(adjustmentListener);
        var componentAdjustmentListener: JSComponentAdjustmentListener = new JSComponentAdjustmentListener(adjustmentListener);
        componentAdjustmentListeners.push(componentAdjustmentListener);
        this.element.addEventListener("scroll", componentAdjustmentListener.adjustmentValueChanged, !!useCapture);
        return componentAdjustmentListener.withParameters(this);
    }
    removeAdjustmentListener(adjustmentListener: JSAdjustmentListener, useCapture?: boolean): void {
        var adjustmentListeners: JSAdjustmentListener[] = this.getAdjustmentListeners();
        var index: number = adjustmentListeners.indexOf(adjustmentListener);
        if (index !== -1) {
            var componentAdjustmentListeners: JSComponentAdjustmentListener[] = this.getComponentAdjustmentListeners();
            var componentAdjustmentListener = componentAdjustmentListeners[index];
            this.element.removeEventListener("scroll", componentAdjustmentListener.adjustmentValueChanged, !!useCapture);
            adjustmentListeners.splice(index, 1);
            componentAdjustmentListeners.splice(index, 1);
        }
    }
    getChangeListeners(): JSChangeListener[] {
        if (!this.changeListeners) {
            this.changeListeners = [];
        }
        return this.changeListeners;
    }
    getComponentChangeListeners(): JSComponentChangeListener[] {
        if (!this.componentChangeListeners) {
            this.componentChangeListeners = [];
        }
        return this.componentChangeListeners;
    }
    addChangeListener(changeListener: JSChangeListener, useCapture?: boolean): JSComponentChangeListener {
        var changeListeners: JSChangeListener[] = this.getChangeListeners();
        var componentChangeListeners: JSComponentChangeListener[] = this.getComponentChangeListeners();
        var index: number = changeListeners.indexOf(changeListener);
        if (index !== -1) {
            return componentChangeListeners[index];
        }
        changeListeners.push(changeListener);
        var componentChangeListener: JSComponentChangeListener = new JSComponentChangeListener(changeListener);
        componentChangeListeners.push(componentChangeListener);
        this.element.addEventListener("change", componentChangeListener.stateChanged, !!useCapture);
        return componentChangeListener.withParameters(this);
    }
    removeChangeListener(changeListener: JSChangeListener, useCapture?: boolean): void {
        var changeListeners: JSChangeListener[] = this.getChangeListeners();
        var index: number = changeListeners.indexOf(changeListener);
        if (index !== -1) {
            var componentChangeListeners: JSComponentChangeListener[] = this.getComponentChangeListeners();
            var componentChangeListener = componentChangeListeners[index];
            this.element.removeEventListener("change", componentChangeListener.stateChanged, !!useCapture);
            changeListeners.splice(index, 1);
            componentChangeListeners.splice(index, 1);
        }
    }
}