interface ActionListener {
    actionPerformed(mouseEvent: MouseEvent, ...parameters: any[]): void;
}
interface AdjustmentListener {
    adjustmentValueChanged(event: Event, ...parameters: any[]): void;
}
interface Border {
    paintBorder(component: JSComponent): void;
}
interface ChangeListener {
    stateChanged(event: Event, ...parameters: any[]): void;
}
interface DragSourceListener {
    dragStart?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    drag?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    dragEnd?(mouseEvent: MouseEvent, ...parameters: any[]): void;
}
interface DropTargetListener {
    dragEnter?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    dragOver?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    dragLeave?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    drop?(mouseEvent: MouseEvent, ...parameters: any[]): void;
}
interface MouseDraggedListener {
    mouseDragged(mouseEvent: MouseEvent, ...parameters: any[]): void;
}
interface MouseListener {
    mouseClicked?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    mousePressed?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    mouseReleased?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    mouseEntered?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    mouseExited?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    mouseMoved?(mouseEvent: MouseEvent, ...parameters: any[]): void;
    mouseDragged?(mouseEvent: MouseEvent, ...parameters: any[]): void;
}
interface PropertyChangeListener {
    propertyChange(propertyChangeEvent: JSPropertyChangeEvent): void;
    getSource?(): JSComponent;
}
interface Runnable {
    run(...parameters: any[]): void;
}
declare class JSComponent {
    static LEFT: string;
    static RIGHT: string;
    static CENTER: string;
    static JUSTIFY: string;
    static DEFAULT_LAYER: number;
    static PALETTE_LAYER: number;
    static MODAL_LAYER: number;
    static POPUP_LAYER: number;
    static DRAG_LAYER: number;
    static TOP: string;
    static BOTTOM: string;
    static HORIZONTAL: string;
    static VERTICAL: string;
    static HORIZONTAL_SPLIT: string;
    static VERTICAL_SPLIT: string;
    element: Element;
    constructor(element: Element);
    init(): void;
    getAttribute(attribute: string): string;
    setAttribute(attribute: string, value: string): void;
    removeAttribute(attribute: string): void;
    getComputedStyle(style: string): string;
    getStyle(style: string): string;
    setStyle(style: string, value: string): void;
    removeStyle(style: string): void;
    getData(key: string): any;
    setData(key: string, value: any): void;
    getClientProperty(key: string): any;
    putClientProperty(key: string, value: any): void;
    getId(): string;
    setId(id: string): void;
    withId(id: string): this;
    getName(): string;
    setName(name: string): void;
    withName(name: string): this;
    getClass(): string;
    setClass(clazzes: string): void;
    hasClass(clazz: string): boolean;
    addClass(clazz: string): void;
    removeClass(clazz: string): void;
    x: number;
    getX(): number;
    y: number;
    getY(): number;
    setX(x: number): void;
    setY(y: number): void;
    width: number;
    getWidth(): number;
    getOuterWidth(): number;
    height: number;
    getHeight(): number;
    getOuterHeight(): number;
    setWidth(width: number): void;
    setOuterWidth(outerWidth: number): void;
    setHeight(height: number): void;
    setOuterHeight(outerHeight: number): void;
    getInsetTop(): number;
    getInsetLeft(): number;
    getInsetBottom(): number;
    getInsetRight(): number;
    isDisplayable(): boolean;
    getLayout(): JSLayout;
    setLayout(layout: JSLayout): void;
    getConstraints(): string | {
        [key: string]: string;
    };
    setConstraints(constraints: string | {
        [key: string]: number | string;
    }): void;
    getZIndex(): number;
    setZIndex(zIndex: number): void;
    getComponents(): JSComponent[];
    getComponentCount(): number;
    getParent(): JSComponent;
    setParent(parent: JSComponent): void;
    add(component: JSComponent): void;
    add(component: JSComponent, constraints: number | string | {
        [key: string]: number | string;
    }): void;
    add(component: JSComponent, constraints: number | string | {
        [key: string]: number | string;
    }, index: number): void;
    remove(index: number): void;
    remove(component: JSComponent): void;
    removeAll(): void;
    validate(): void;
    validateChildren(): void;
    isVisible(): boolean;
    setVisible(visible: boolean): void;
    clone(): JSComponent;
    getBoundingClientRect(): ClientRect;
    getPreferredWidth(): number;
    setPreferredWidth(preferredWidth: number): void;
    getPreferredHeight(): number;
    setPreferredHeight(preferredHeight: number): void;
    getPreferredOuterWidth(): number;
    getPreferredOuterHeight(): number;
    getMarginTop(): number;
    getMarginLeft(): number;
    getMarginBottom(): number;
    getMarginRight(): number;
    getBorderTopWidth(): number;
    getBorderLeftWidth(): number;
    getBorderBottomWidth(): number;
    getBorderRightWidth(): number;
    getPaddingTop(): number;
    getPaddingLeft(): number;
    getPaddingBottom(): number;
    getPaddingRight(): number;
    align: string;
    getAlign(): string;
    setAlign(align: string): void;
    getText(): string;
    setText(text: string): void;
    getBorder(): Border;
    setBorder(border: Border): void;
    getCursor(): string;
    setCursor(cursor: string): void;
    getGraphics(): JSGraphics;
    getIcon(): JSIcon;
    setIcon(icon: JSIcon): void;
    getAction(): JSAction;
    setAction(action: JSAction): void;
    getComponentPopupMenu(): JSPopupMenu;
    setComponentPopupMenu(componentPopupMenu: JSPopupMenu): void;
    isSelected(): boolean;
    setSelected(selected: boolean): void;
    getSelection(): JSSelection;
    setSelection(selection: JSSelection): void;
    isEditable(): boolean;
    setEditable(contenteditable: boolean): void;
    addEventListener(event: string, listener: (event: Event) => void, useCapture?: boolean): void;
    removeEventListener(event: string, listener: (event: Event) => void, useCapture?: boolean): void;
    getMouseListeners(): MouseListener[];
    getJSMouseListeners(): JSMouseListener[];
    addMouseListener(mouseListener: MouseListener, useCapture?: boolean): JSMouseListener;
    removeMouseListener(mouseListener: MouseListener, useCapture?: boolean): void;
    getActionCommand(): string;
    setActionCommand(actionCommand: string): void;
    getActionListeners(): ActionListener[];
    getJSActionListeners(): JSActionListener[];
    addActionListener(actionListener: ActionListener, useCapture?: boolean): JSActionListener;
    removeActionListener(actionListener: ActionListener): void;
    fireActionPerformed(mouseEvent: MouseEvent): void;
    getMouseDraggedListeners(): MouseDraggedListener[];
    getJSMouseDraggedListeners(): JSMouseDraggedListener[];
    addMouseDraggedListener(mouseDraggedListener: MouseDraggedListener, useCapture?: boolean): JSMouseDraggedListener;
    removeMouseDraggedListener(mouseDraggedListener: MouseDraggedListener): void;
    fireMouseDragged(mouseEvent: MouseEvent): void;
    isDragEnabled(): boolean;
    setDragEnabled(dragEnable: boolean): void;
    getDragSourceListeners(): DragSourceListener[];
    getJSDragSourceListeners(): JSDragSourceListener[];
    addDragSourceListener(dragSourceListener: DragSourceListener, useCapture?: boolean): JSDragSourceListener;
    removeDragSourceListener(dragSourceListener: DragSourceListener): void;
    fireDragStart(mouseEvent: MouseEvent): void;
    fireDrag(mouseEvent: MouseEvent): void;
    fireDragEnd(mouseEvent: MouseEvent): void;
    getDropTargetListeners(): DropTargetListener[];
    getJSDropTargetListeners(): JSDropTargetListener[];
    addDropTargetListener(dropTargetListener: DropTargetListener, useCapture?: boolean): JSDropTargetListener;
    removeDropTargetListener(dropTargetListener: DropTargetListener): void;
    fireDragEnter(mouseEvent: MouseEvent): void;
    fireDragOver(mouseEvent: MouseEvent): void;
    fireDragLeave(mouseEvent: MouseEvent): void;
    fireDrop(mouseEvent: MouseEvent): void;
    getAdjustmentListeners(): AdjustmentListener[];
    getJSAdjustmentListeners(): JSAdjustmentListener[];
    addAdjustmentListener(adjustmentListener: AdjustmentListener, useCapture?: boolean): JSAdjustmentListener;
    removeAdjustmentListener(adjustmentListener: AdjustmentListener, useCapture?: boolean): void;
    getChangeListeners(): ChangeListener[];
    getJSChangeListeners(): JSChangeListener[];
    addChangeListener(changeListener: ChangeListener, useCapture?: boolean): JSChangeListener;
    removeChangeListener(changeListener: ChangeListener, useCapture?: boolean): void;
}
declare class JSLayout {
    static NORTH: string;
    static SOUTH: string;
    static WEST: string;
    static EAST: string;
    static CENTER: string;
    static TOP: string;
    static LEFT: string;
    static BOTTOM: string;
    static RIGHT: string;
    static LEFT_RIGHT: string;
    static HORIZONTAL: string;
    static VERTICAL: string;
    static BOTH: string;
    static NONE: string;
    static NORTHWEST: string;
    static NORTHEAST: string;
    static SOUTHWEST: string;
    static SOUTHEAST: string;
    addLayoutComponent(component: JSComponent): void;
    removeLayoutComponent(component: JSComponent): void;
    preferredLayoutWidth(container: JSComponent): number;
    preferredLayoutHeight(container: JSComponent): number;
    layoutContainer(container: JSComponent): void;
}
declare class JSHTMLComponent extends JSComponent {
    constructor(element: HTMLElement);
    init(): void;
    getWidth(): number;
    getHeight(): number;
    getOuterWidth(): number;
    getOuterHeight(): number;
    setX(x: number): void;
    setY(y: number): void;
    setWidth(width: number): void;
    setOuterWidth(outerWidth: number): void;
    setHeight(height: number): void;
    setOuterHeight(outerHeight: number): void;
    getInsetTop(): number;
    getInsetLeft(): number;
    getInsetBottom(): number;
    getInsetRight(): number;
    isDisplayable(): boolean;
    setDisplayable(displayable: boolean): void;
    getPreferredWidth(): number;
    getPreferredHeight(): number;
    getPreferredOuterWidth(): number;
    getPreferredOuterHeight(): number;
    getMarginTop(): number;
    getMarginLeft(): number;
    getMarginBottom(): number;
    getMarginRight(): number;
    getBorderTopWidth(): number;
    getBorderLeftWidth(): number;
    getBorderBottomWidth(): number;
    getBorderRightWidth(): number;
    getPaddingTop(): number;
    getPaddingLeft(): number;
    getPaddingBottom(): number;
    getPaddingRight(): number;
    getBackground(): string;
    setBackground(background: string): void;
    getForeground(): string;
    setForeground(foreground: string): void;
    getText(): string;
    setText(text: string): void;
    getCursor(): string;
    setCursor(cursor: string): void;
}
declare class JSSVGComponent extends JSComponent {
    constructor(element: SVGElement);
    init(): void;
    getAttributeNS(attribute: string): string;
    setAttributeNS(attribute: string, value: string): void;
    removeAttributeNS(attribute: string): void;
    getWidth(): number;
    getHeight(): number;
    setX(x: number): void;
    setY(y: number): void;
    setWidth(width: number): void;
    setOuterWidth(outerWidth: number): void;
    setHeight(height: number): void;
    setOuterHeight(outerHeight: number): void;
    getPreferredWidth(): number;
    getPreferredHeight(): number;
    getPreferredOuterWidth(): number;
    getPreferredOuterHeight(): number;
    getFill(): string;
    setFill(fill: string): void;
    getStroke(): string;
    setStroke(stroke: string): void;
    getOpacity(): number;
    setOpacity(opacity: number): void;
}
declare class JSSVG extends JSSVGComponent {
    constructor();
    constructor(element: SVGSVGElement);
    constructor(width: number, height: number);
    init(): void;
    setX(x: number): void;
    setY(y: number): void;
    getViewBox(): string;
    setViewBox(viewBox: string): void;
}
declare class JSIcon {
    iconWidth: number;
    iconHeight: number;
    constructor();
    constructor(iconWidth: number, iconHeight: number);
    getIconWidth(): number;
    setIconWidth(iconWidth: number): void;
    getIconHeight(): number;
    setIconHeight(iconHeight: number): void;
    paintIcon(component: JSComponent, graphics: JSGraphics): void;
}
declare class JSImageIcon extends JSIcon {
    source: string;
    constructor();
    constructor(source: string);
    constructor(source: string, iconWidth: number, iconHeight: number);
    getSource(): string;
    setSource(source: string): void;
    paintIcon(component: JSComponent, graphics: JSComponent): void;
}
declare class JSPathIcon extends JSImageIcon {
    viewBox: string;
    fill: string;
    stroke: string;
    constructor();
    constructor(source: string);
    constructor(source: string, iconWidth: number, iconHeight: number);
    constructor(viewBox: string, source: string, iconWidth: number, iconHeight: number);
    getViewBox(): string;
    setViewBox(viewBox: string): void;
    withViewBox(viewBox: string): this;
    getFill(): string;
    setFill(fill: string): void;
    withFill(fill: string): this;
    getStroke(): string;
    setStroke(stroke: string): void;
    withStroke(stroke: string): this;
    paintIcon(component: JSComponent, graphics: JSComponent): void;
}
declare class JSPanel extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLDivElement);
    constructor(layout: JSLayout);
    init(): void;
}
declare class JSAction implements ActionListener {
    name: string;
    icon: JSIcon;
    enabled: boolean;
    propertyChangeSupport: JSPropertyChangeSupport;
    constructor();
    constructor(icon: JSIcon);
    constructor(name: string);
    constructor(name: string, icon: JSIcon);
    getName(): string;
    setName(name: string): void;
    getIcon(): JSIcon;
    setIcon(icon: JSIcon): void;
    isEnabled(): boolean;
    setEnabled(enabled: boolean): void;
    actionPerformed(mouseEvent: MouseEvent): void;
    getPropertyChangeSupport(): JSPropertyChangeSupport;
    setPropertyChangeSupport(propertyChangeSupport: JSPropertyChangeSupport): void;
    addPropertyChangeListener(propertyChangeListener: PropertyChangeListener): void;
    removePropertyChangeListener(propertyChangeListener: PropertyChangeListener): void;
    firePropertyChange(propertyChangeEvent: JSPropertyChangeEvent): void;
}
declare class JSActionListener implements ActionListener {
    actionPerformed: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    parameters: any[];
    constructor(actionListener: ActionListener);
    getParameters(): any[];
    setParameters(...parameters: any[]): void;
    withParameters(...parameters: any[]): this;
}
declare class JSAdjustmentListener implements AdjustmentListener {
    adjustmentValueChanged: (event: Event, ...parameters: any[]) => void;
    parameters: any[];
    constructor(adjustmentListener: AdjustmentListener);
    getParameters(): any[];
    setParameters(...parameters: any[]): void;
    withParameters(...parameters: any[]): this;
}
declare class JSBody extends JSHTMLComponent implements MouseListener {
    static instance: JSBody;
    static getInstance(): JSBody;
    popupMenu: JSComponent;
    dragImage: Element;
    dragSource: JSComponent;
    fileChooser: JSFileChooser;
    constructor();
    init(): void;
    setContentPane(contentPane: JSComponent): void;
    getSVG(): JSSVG;
    getDefs(): JSDefs;
    getPopupMenuContainer(): JSPanel;
    getPopupMenu(): JSComponent;
    setPopupMenu(popupMenu: JSComponent): void;
    getDragImageContainer(): JSPanel;
    getDragImage(): Element;
    setDragImage(dragImage: Element): void;
    getDragSource(): JSComponent;
    setDragSource(dragSource: JSComponent): void;
    getFileChooser(): JSFileChooser;
    setFileChooser(fileChooser: JSFileChooser): void;
    getTimer(): JSTimer;
    mouseMoved(mouseEvent: MouseEvent): void;
    mouseReleased(mouseEvent: MouseEvent): void;
}
declare class JSBorderLayout extends JSLayout {
    hgap: number;
    vgap: number;
    constructor();
    constructor(hgap: number, vgap: number);
    getHgap(): number;
    setHgap(hgap: number): void;
    getVgap(): number;
    setVgap(vgap: number): void;
    addLayoutComponent(component: JSComponent): void;
    preferredLayoutWidth(container: JSComponent): number;
    preferredLayoutHeight(container: JSComponent): number;
    layoutContainer(container: JSComponent): void;
}
declare class JSButton extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLButtonElement);
    constructor(action: JSAction);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(text: string, icon: JSIcon);
    init(): void;
    setIcon(icon: JSIcon): void;
    getGraphics(): JSGraphics;
    getText(): string;
    setText(text: string): void;
    getSpan(): JSSpan;
    isUndecorated(): boolean;
    setUndecorated(undecorated: boolean): void;
}
declare class JSCardLayout extends JSLayout {
    addLayoutComponent(component: JSComponent): void;
    preferredLayoutWidth(container: JSComponent): number;
    preferredLayoutHeight(container: JSComponent): number;
    layoutContainer(container: JSComponent): void;
    selected: JSComponent;
    getSelected(): JSComponent;
    setSelected(container: JSComponent, component: JSComponent): void;
    setSelectedIndex(container: JSComponent, selectedIndex: number): void;
    getSelectedIndex(container: JSComponent): number;
    first(container: JSComponent): void;
    next(container: JSComponent): void;
    previous(container: JSComponent): void;
    last(container: JSComponent): void;
    show(container: JSComponent, index: number): void;
    show(container: JSComponent, constraints: string): void;
}
declare class JSChangeListener implements ChangeListener {
    stateChanged: (event: Event, ...parameters: any[]) => void;
    parameters: any[];
    constructor(changeListener: ChangeListener);
    getParameters(): any[];
    setParameters(...parameters: any[]): void;
    withParameters(...parameters: any[]): this;
}
declare class JSCheckBox extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLDivElement);
    constructor(action: JSAction);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(icon: JSIcon, selected: boolean);
    constructor(text: string, selected: boolean);
    constructor(text: string, icon: JSIcon);
    constructor(text: string, icon: JSIcon, selected: boolean);
    init(): void;
    getCheckBoxInput(): JSCheckBoxInput;
    getLabel(): JSLabel;
    getIcon(): JSIcon;
    setIcon(icon: JSIcon): void;
    getText(): string;
    setText(text: string): void;
    isSelected(): boolean;
    setSelected(selected: boolean): void;
}
declare class JSCheckBoxInput extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLInputElement);
    constructor(selected: boolean);
    init(): void;
    setSelected(selected: boolean): void;
    isSelected(): boolean;
}
declare class JSComboBox extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLSelectElement);
    constructor(items: Array<string>);
    init(): void;
    getItems(): Array<any>;
    setItems(items: Array<any>): void;
    getSelectedIndex(): number;
    getSelectedItem(): any;
}
declare class JSDataTransfer {
    static instance: JSDataTransfer;
    static getInstance(): JSDataTransfer;
    static getData(key: string): any;
    static setData(key: string, value: any): void;
    static getDragImage(): Element;
    static setDragImage(dragImage: Element): void;
    data: {
        [key: string]: any;
    };
    getData(key: string): any;
    setData(key: string, value: any): void;
    getDragImage(): Element;
    setDragImage(dragImage: Element): void;
}
declare class JSDefs extends JSSVGComponent {
    constructor();
    constructor(element: SVGDefsElement);
    init(): void;
}
declare class JSDialog extends JSPanel {
    owner: JSComponent;
    modal: boolean;
    title: string;
    constructor();
    constructor(element: HTMLDivElement);
    constructor(owner: JSComponent);
    constructor(owner: JSComponent, modal: boolean);
    constructor(owner: JSComponent, title: string);
    constructor(owner: JSComponent, title: string, modal: boolean);
    init(): void;
    getOwner(): JSComponent;
    setOwner(owner: JSComponent): void;
    isModal(): boolean;
    setModal(modal: boolean): void;
    getTitle(): string;
    setTitle(title: string): void;
    setVisible(visible: boolean): void;
}
declare class JSDiv extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLDivElement);
    init(): void;
}
declare class JSDragSourceListener implements DragSourceListener {
    dragStart: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    drag: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    dragEnd: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    parameters: any[];
    constructor(dragSourceListener: DragSourceListener);
    getParameters(): any[];
    setParameters(...parameters: any[]): void;
    withParameters(...parameters: any[]): this;
}
declare class JSDropTargetListener implements DropTargetListener {
    dragEnter: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    dragOver: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    dragLeave: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    drop: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    parameters: any[];
    constructor(dropTargetListener: DropTargetListener);
    getParameters(): any[];
    setParameters(...parameters: any[]): void;
    withParameters(...parameters: any[]): this;
}
declare class JSFileChooser extends JSHTMLComponent {
    selectedFiles: FileList;
    constructor();
    constructor(element: HTMLInputElement);
    init(): void;
    getFileFilter(): string;
    setFileFilter(fileFilter: string): void;
    showOpenDialog(): void;
    getSelectedFiles(): FileList;
    setSelectedFiles(selectedFiles: FileList): void;
}
declare class JSFileUtils {
    static writeStringToFile(filename: string, text: string): void;
}
declare class JSFlowLayout extends JSLayout {
    border: string;
    align: string;
    hgap: number;
    vgap: number;
    constructor();
    constructor(border: string, align: string);
    constructor(border: string, align: string, hgap: number, vgap: number);
    getHgap(): number;
    setHgap(hgap: number): void;
    getVgap(): number;
    setVgap(vgap: number): void;
    getAlign(): string;
    setAlign(align: string): void;
    getBorder(): string;
    setBorder(region: string): void;
    addLayoutComponent(component: JSComponent): void;
    preferredLayoutWidth(container: JSComponent): number;
    preferredLayoutHeight(container: JSComponent): number;
    layoutContainer(container: JSComponent): void;
    layoutComponents(container: JSComponent, components: JSComponent[], x: number, y: number, rowWidth: number, rowHeight: number): void;
}
declare class JSForm extends JSHTMLComponent {
    static POST: string;
    static GET: string;
    static post(url: string, params?: {
        [key: string]: string;
    }): void;
    constructor();
    constructor(element: HTMLFormElement);
    init(): void;
    getMethod(): string;
    setMethod(method: string): void;
    getUrl(): string;
    setUrl(url: string): void;
    submit(): void;
    post(url: string, params?: {
        [key: string]: string;
    }): void;
}
declare class JSFrame extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLDivElement);
    init(): void;
    setVisible(visible: boolean): void;
    validate(): void;
}
declare class JSGraphics extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLDivElement);
    init(): void;
}
declare class JSGridBagLayout extends JSLayout {
    hgap: number;
    vgap: number;
    preferredWidthPixels: number[];
    preferredWidthPercent: number[];
    preferredHeightPixels: number[];
    preferredHeightPercent: number[];
    weightxs: number[];
    weightys: number[];
    constructor();
    constructor(hgap: number, vgap: number);
    getHgap(): number;
    setHgap(hgap: number): void;
    getVgap(): number;
    setVgap(vgap: number): void;
    addLayoutComponent(component: JSComponent): void;
    preferredLayoutWidth(container: JSComponent): number;
    preferredLayoutHeight(container: JSComponent): number;
    layoutContainer(container: JSComponent): void;
}
declare class JSHorizontalSeparator extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLDivElement);
    init(): void;
    getLine(): JSDiv;
}
declare class JSImage extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLImageElement);
    constructor(source: string);
    constructor(source: string, width: number, height: number);
    init(): void;
    getSource(): string;
    setSource(source: string): void;
}
declare class JSLabel extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLLabelElement);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(icon: JSIcon, horizontalAlignment: string);
    constructor(text: string, horizontalAlignment: string);
    constructor(text: string, icon: JSIcon);
    constructor(text: string, icon: JSIcon, horizontalAlignment: string);
    init(): void;
    setIcon(icon: JSIcon): void;
    getGraphics(): JSGraphics;
    getText(): string;
    setText(text: string): void;
    getSpan(): JSSpan;
    isUndecorated(): boolean;
    setUndecorated(undecorated: boolean): void;
    getFor(): string;
    setFor(id: string): void;
}
declare class JSLayeredPane extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLDivElement);
    constructor(layout: JSLayout);
    init(): void;
    setLayer(component: JSComponent, layer: number): void;
}
declare class JSLayeredPaneLayout extends JSLayout {
    addLayoutComponent(component: JSComponent): void;
}
declare class JSMarker extends JSSVGComponent {
    constructor();
    constructor(element: SVGMarkerElement);
    init(): void;
}
declare class JSMatteBorder implements Border {
    top: number;
    left: number;
    bottom: number;
    right: number;
    color: string;
    constructor(top: number, left: number, bottom: number, right: number, color: string);
    getTop(): number;
    setTop(top: number): void;
    getLeft(): number;
    setLeft(left: number): void;
    getBottom(): number;
    setBottom(bottom: number): void;
    getRight(): number;
    setRight(right: number): void;
    getColor(): string;
    setColor(color: string): void;
    paintBorder(component: JSComponent): void;
}
declare class JSMenu extends JSHTMLComponent {
    static DELAY: number;
    static SUBMENU_ICON: JSIcon;
    delay: number;
    constructor();
    constructor(element: HTMLDivElement);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(text: string, icon: JSIcon);
    init(): void;
    getLabel(): JSLabel;
    getIcon(): JSIcon;
    setIcon(icon: JSIcon): void;
    getText(): string;
    setText(text: string): void;
    getDelay(): number;
    setDelay(delay: number): void;
    getTimer(): JSTimer;
    getSubmenuIcon(): JSPathIcon;
    setSubmenuIcon(icon: JSIcon): void;
    getGraphics(): JSGraphics;
    getPopupMenuContainer(): JSDiv;
    getPopupMenu(): JSPopupMenu;
    setPopupMenu(popupMenu: JSPopupMenu): void;
    add(component: JSComponent): void;
    addSeparator(): void;
    setSelected(selected: boolean): void;
}
declare class JSMenuBar extends JSPanel {
    constructor();
    constructor(element: HTMLDivElement);
    init(): void;
    add(menu: JSMenu): void;
    getMenuContainer(): JSMenuContainer;
}
declare class JSMenuContainer extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLDivElement);
    init(): void;
    add(menu: JSMenu): void;
    setSelected(selected: boolean): void;
    getTimer(): JSTimer;
}
declare class JSMenuItem extends JSHTMLComponent implements MouseListener {
    constructor();
    constructor(element: HTMLDivElement);
    constructor(action: JSAction);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(text: string, icon: JSIcon);
    init(): void;
    getLabel(): JSLabel;
    getIcon(): JSIcon;
    setIcon(icon: JSIcon): void;
    getText(): string;
    setText(text: string): void;
    mouseEntered(mouseEvent: MouseEvent): void;
    mouseClicked(mouseEvent: MouseEvent): void;
}
declare class JSMouseDraggedListener implements MouseDraggedListener {
    mouseDragged: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    parameters: any[];
    constructor(mouseDraggedListener: MouseDraggedListener);
    getParameters(): any[];
    setParameters(...parameters: any[]): void;
    withParameters(...parameters: any[]): this;
}
declare class JSMouseListener implements MouseListener {
    mouseClicked: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    mousePressed: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    mouseReleased: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    mouseEntered: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    mouseExited: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    mouseMoved: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    mouseDragged: (mouseEvent: MouseEvent, ...parameters: any[]) => void;
    parameters: any[];
    constructor(mouseListener: MouseListener);
    getParameters(): any[];
    setParameters(...parameters: any[]): void;
    withParameters(...parameters: any[]): this;
}
declare class JSOption extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLOptionElement);
    constructor(text: string);
    init(): void;
    getText(): string;
    setText(text: string): void;
    getValue(): string;
    setValue(value: string): void;
}
declare class JSP extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLParagraphElement);
    constructor(text: string);
    constructor(text: string, horizontalAlignment: string);
    init(): void;
}
declare class JSPath extends JSSVGComponent {
    constructor();
    constructor(element: SVGPathElement);
    constructor(definition: string);
    init(): void;
    getDefinition(): string;
    setDefinition(definition: string): void;
}
declare class JSPathImage extends JSSVG {
    constructor();
    constructor(element: SVGSVGElement);
    constructor(source: string);
    constructor(source: string, width: number, height: number);
    init(): void;
    getPath(): JSPath;
    getSource(): string;
    setSource(source: string): void;
    getFill(): string;
    setFill(fill: string): void;
    getStroke(): string;
    setStroke(stroke: string): void;
}
declare class JSPopupMenu extends JSHTMLComponent {
    invoker: JSComponent;
    constructor();
    constructor(element: HTMLDivElement);
    init(): void;
    add(component: JSComponent): void;
    addSeparator(): void;
    getInvoker(): JSComponent;
    setInvoker(invoker: JSComponent): void;
    show(invoker: JSComponent, x: number, y: number): void;
    setSelected(selected: boolean): void;
    getTimer(): JSTimer;
}
declare class JSProgressBar extends JSHTMLComponent {
    value: number;
    constructor();
    constructor(element: HTMLDivElement);
    constructor(orientation: string);
    constructor(min: number, max: number);
    constructor(orientation: string, min: number, max: number);
    init(): void;
    getOrientation(): string;
    setOrientation(orientation: string): void;
    getMin(): number;
    setMin(min: number): void;
    getMax(): number;
    setMax(max: number): void;
    getBarContainer(): JSDiv;
    setBarContainer(barContainer: JSDiv): void;
    getBar(): JSPanel;
    getValue(): number;
    setValue(value: number): void;
}
declare class JSProperties {
    properties: {
        [key: string]: string;
    };
    constructor();
    getProperties(): {
        [key: string]: string;
    };
    setProperties(properties: {
        [key: string]: string;
    }): void;
    getProperty(key: string): string;
    getProperty(key: string, defaultValue: string): string;
    setProperty(key: string, value: string): void;
    load(): void;
}
declare class JSPropertyChangeEvent {
    source: any;
    propertyName: string;
    oldValue: any;
    newValue: any;
    constructor(source: any, propertyName: string, oldValue: any, newValue: any);
    getSource(): any;
    setSource(source: any): void;
    getPropertyName(): string;
    setPropertyName(propertyName: string): void;
    getOldValue(): any;
    setOldValue(oldValue: any): void;
    getNewValue(): any;
    setNewValue(newValue: any): void;
}
declare class JSPropertyChangeListener implements PropertyChangeListener {
    propertyChange: (propertyChangeEvent: JSPropertyChangeEvent) => void;
    constructor(propertyChangeListener: PropertyChangeListener);
}
declare class JSPropertyChangeSupport {
    propertyChangeListeners: PropertyChangeListener[];
    getPropertyChangeListeners(): PropertyChangeListener[];
    addPropertyChangeListener(propertyChangeListener: PropertyChangeListener): void;
    removePropertyChangeListener(propertyChangeListener: PropertyChangeListener): void;
    firePropertyChange(propertyChangeEvent: JSPropertyChangeEvent): void;
}
declare class JSRadioButton extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLInputElement);
    constructor(selected: boolean);
    init(): void;
}
declare class JSResourceBundle {
    contents: {
        [key: string]: string;
    };
    constructor();
    getContents(): {
        [key: string]: string;
    };
    setContents(contents: {
        [key: string]: string;
    }): void;
}
declare class JSRunnable implements Runnable {
    run: (...parameters: any[]) => void;
    pid: number;
    parameters: any[];
    constructor(runnable: Runnable);
    getPid(): number;
    setPid(pid: number): void;
    getParameters(): any[];
    setParameters(...parameters: any[]): void;
    withParameters(...parameters: any[]): this;
}
declare class JSScrollPane extends JSHTMLComponent {
    static VERTICAL_SCROLLBAR_AS_NEEDED: string;
    static VERTICAL_SCROLLBAR_NEVER: string;
    static VERTICAL_SCROLLBAR_ALWAYS: string;
    static HORIZONTAL_SCROLLBAR_AS_NEEDED: string;
    static HORIZONTAL_SCROLLBAR_NEVER: string;
    static HORIZONTAL_SCROLLBAR_ALWAYS: string;
    constructor();
    constructor(element: HTMLDivElement);
    constructor(view: JSComponent);
    constructor(vsbPolicy: string, hsbPolicy: string);
    constructor(view: JSComponent, vsbPolicy: string, hsbPolicy: string);
    init(): void;
    getVsbPolicy(): string;
    setVsbPolicy(vsbPolicy: string): void;
    getHsbPolicy(): string;
    setHsbPolicy(hsbPolicy: string): void;
    getViewContainer(): JSPanel;
    getViewportView(): JSComponent;
    setViewportView(viewportView: JSComponent): void;
    getPreferredWidth(): number;
    getPreferredHeight(): number;
}
declare class JSSelection {
    components: JSComponent[];
    selected: JSComponent;
    constructor();
    add(component: JSComponent): void;
    remove(component: JSComponent): void;
    getComponents(): JSComponent[];
    getSelected(): JSComponent;
    setSelected(component: JSComponent): void;
    setSelectedIndex(selectedIndex: number): void;
    getSelectedIndex(): number;
}
declare class JSSpan extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLSpanElement);
    init(): void;
}
declare class JSSplitPane extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLDivElement);
    constructor(orientation: string);
    init(): void;
    getOrientation(): string;
    private setOrientation;
    getLeftContainer(): JSSplitPaneLeftContainer;
    getRightContainer(): JSSplitPaneRightContainer;
    getLeftComponent(): JSComponent;
    setLeftComponent(leftComponent: JSComponent): void;
    getRightComponent(): JSComponent;
    setRightComponent(rightComponent: JSComponent): void;
    getTopComponent(): JSComponent;
    setTopComponent(component: JSComponent): void;
    getBottomComponent(): JSComponent;
    setBottomComponent(component: JSComponent): void;
    getDivider(): JSSplitPaneDivider;
    getDividerSize(): number;
    setDividerSize(dividerSize: number): void;
    dividerLocation: number;
    getDividerLocation(): number;
    setDividerLocation(dividerLocation: number, dividerProportionalLocation?: number): void;
    dividerProportionalLocation: number;
    getDividerProportionalLocation(): number;
    setDividerProportionalLocation(dividerProportionalLocation: number): void;
    getMinimumDividerLocation(): number;
    getMaximumDividerLocation(): number;
}
declare class JSSplitPaneDivider extends JSPanel {
    constructor();
    constructor(element: HTMLDivElement);
    init(): void;
}
declare class JSSplitPaneLayout extends JSLayout {
    addLayoutComponent(component: JSComponent): void;
    preferredLayoutWidth(splitPane: JSSplitPane): number;
    preferredLayoutHeight(splitPane: JSSplitPane): number;
    layoutContainer(splitPane: JSSplitPane): void;
}
declare class JSSplitPaneLeftContainer extends JSPanel {
    constructor();
    constructor(element: HTMLDivElement);
    init(): void;
}
declare class JSSplitPaneRightContainer extends JSPanel {
    constructor();
    constructor(element: HTMLDivElement);
    init(): void;
}
declare class JSSVGImage extends JSSVGComponent {
    constructor();
    constructor(element: SVGImageElement);
    constructor(icon: JSIcon);
    constructor(source: string);
    constructor(source: string, width: number, height: number);
    init(): void;
    getSource(): string;
    setSource(source: string): void;
}
declare class JSTab extends JSPanel {
    static CLOSE_ICON: JSPathIcon;
    constructor();
    constructor(element: HTMLDivElement);
    constructor(tabPlacement: string, closeable: boolean, text: string);
    constructor(tabPlacement: string, closeable: boolean, text: string, icon: JSIcon);
    init(): void;
    getTabPlacement(): string;
    setTabPlacement(tabPlacement: string): void;
    isCloseable(): boolean;
    setCloseable(closeable: boolean): void;
    getCloseButton(): JSButton;
    setCloseButton(closeButton: JSButton): void;
    getText(): string;
    setText(text: string): void;
    getLabel(): JSLabel;
    getGraphics(): JSGraphics;
    setSelected(selected: boolean): void;
}
declare class JSTabbedPane extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLDivElement);
    constructor(tabPlacement: string);
    init(): void;
    getTabPlacement(): string;
    setTabPlacement(tabPlacement: string): void;
    addTab(title: string, component: JSComponent): JSTab;
    addTab(title: string, icon: JSIcon, component: JSComponent): JSTab;
    addCloseableTab(title: string, component: JSComponent): JSTab;
    addCloseableTab(title: string, icon: JSIcon, component: JSComponent): JSTab;
    getTabContainer(): JSTabbedPaneTabContainer;
    getCardContainer(): JSTabbedPaneCardContainer;
    getButtonContainer(): JSTabbedPaneButtonContainer;
    removeTabAt(index: number): void;
    setTabComponentAt(index: number, tabComponent: JSComponent): void;
    indexOfComponent(component: JSComponent): number;
    getComponentAt(index: number): JSComponent;
    indexOfTab(tabComponent: JSComponent): number;
    getSelectedIndex(): number;
    setSelectedIndex(selectedIndex: number): void;
    getTabCount(): number;
    getTabComponentAt(index: number): JSComponent;
}
declare class JSTabbedPaneButtonContainer extends JSPanel {
    constructor();
    constructor(element: HTMLDivElement);
    constructor(tabPlacement: string);
    init(): void;
    getTabPlacement(): string;
    setTabPlacement(tabPlacement: string): void;
}
declare class JSTabbedPaneCardContainer extends JSPanel {
    constructor();
    constructor(element: HTMLDivElement);
    init(): void;
}
declare class JSTabbedPaneTabContainer extends JSPanel {
    constructor();
    constructor(element: HTMLDivElement);
    constructor(tabPlacement: string);
    init(): void;
    getTabPlacement(): string;
    setTabPlacement(tabPlacement: string): void;
    addTab(title: string): JSTab;
    addTab(title: string, icon: JSIcon): JSTab;
    addCloseabeTab(title: string): JSTab;
    addCloseabeTab(title: string, icon: JSIcon): JSTab;
    addButton(button: JSComponent): void;
    remove(component: JSComponent): void;
    remove(index: number): void;
    getTabSelection(): JSSelection;
    setTabSelection(tabSelection: JSSelection): void;
    getTabs(): JSComponent[];
    getTabCount(): number;
    getTabComponentAt(index: number): JSComponent;
    indexOfTab(tab: JSComponent): number;
    setTabComponentAt(index: number, tab: JSComponent): JSComponent;
    getSelectedIndex(): number;
    setSelectedIndex(selectedIndex: number): void;
}
declare class JSTable extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLTableElement);
    constructor(rows: any[][], columns: string[]);
    init(): void;
    getTableHeader(): JSTableHeader;
    getTableBody(): JSTableBody;
    getColumns(): string[];
    setColumns(columns: string[]): void;
    getRows(): any[][];
    setRows(rows: any[][]): void;
}
declare class JSTableBody extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLTableSectionElement);
    init(): void;
    getRows(): any[][];
    setRows(rows: any[][]): void;
}
declare class JSTableCell extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLTableCellElement);
    constructor(value: any);
    init(): void;
    getValue(): any;
    setValue(value: any): void;
}
declare class JSTableHeader extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLTableSectionElement);
    init(): void;
    getTableHeaderRow(): JSTableRow;
    getColumns(): string[];
    setColumns(columns: string[]): void;
}
declare class JSTableHeaderCell extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLTableCellElement);
    constructor(text: string);
    init(): void;
    getContainer(): JSDiv;
    getText(): string;
    setText(text: string): void;
}
declare class JSTableRow extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLTableRowElement);
    constructor(values: any[]);
    init(): void;
    getValues(): any[];
    setValues(values: any[]): void;
}
declare class JSTextArea extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLTextAreaElement);
    constructor(text: string);
    constructor(rows: number, columns: number);
    constructor(text: string, rows: number, columns: number);
    init(): void;
    getRows(): number;
    setRows(rows: number): void;
    getColumns(): number;
    setColumns(columns: number): void;
}
declare class JSTextField extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLInputElement);
    constructor(columns: number);
    constructor(text: string);
    constructor(text: string, columns: number);
    init(): void;
    getColumns(): number;
    setColumns(columns: number): void;
    getText(): string;
    setText(text: string): void;
}
declare class JSTimer {
    pids: {
        [key: string]: any;
    };
    getPids(): {
        [key: string]: any;
    };
    schedule(runnable: Runnable, delay: number): JSRunnable;
    cancel(): void;
}
declare class JSToolBar extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLDivElement);
    init(): void;
    addSeparator(): void;
}
declare class JSTree extends JSHTMLComponent {
    selectionTreeNode: JSTreeNode;
    constructor();
    constructor(element: HTMLDivElement);
    constructor(root: JSTreeNode);
    init(): void;
    getRoot(): JSTreeNode;
    setRoot(root: JSTreeNode): void;
    isRootVisible(): boolean;
    setRootVisible(rootVisible: boolean): void;
    getTreeCells(): {
        [key: string]: JSTreeCell;
    };
    removeTreeCells(): void;
    getTreeCell(treePath: string): JSTreeCell;
    setTreeCell(treePath: string, treeCell: JSTreeCell): void;
    getTreeCellRenderer(): JSTreeCellRenderer;
    setTreeCellRenderer(treeCellRenderer: JSTreeCellRenderer): void;
    addTreeNode(treeNode: JSTreeNode): void;
    getSelectionTreeNode(): JSTreeNode;
    setSelectionTreeNode(selectionTreeNode: JSTreeNode): void;
    expand(treeNode: JSTreeNode): void;
    collapse(treeNode: JSTreeNode): void;
    load(): void;
    loadTreeNode(treeNode: JSTreeNode): void;
}
declare class JSTreeLayout extends JSLayout {
    preferredLayoutWidth(tree: JSTree): number;
    preferredLayoutHeight(tree: JSTree): number;
    layoutContainer(tree: JSTree): void;
}
declare class JSTreeCell extends JSHTMLComponent {
    static COLLAPSED_PATH_DEFINITION: string;
    static EXPANDED_PATH_DEFINITION: string;
    static COLLAPSED_PATH_ICON: JSPathIcon;
    static EXPANDED_PATH_ICON: JSPathIcon;
    constructor();
    constructor(element: HTMLDivElement);
    constructor(value: any);
    constructor(value: any, icon: JSIcon);
    init(): void;
    getValue(): any;
    setValue(value: any): void;
    getClosedIcon(): JSIcon;
    setClosedIcon(icon: JSIcon): void;
    getOpenIcon(): JSIcon;
    setOpenIcon(icon: JSIcon): void;
    getGraphics(): JSGraphics;
    getPreferredWidth(): number;
    getButton(): JSButton;
    setButton(button: JSButton): void;
    getLabel(): JSLabel;
    getIcon(): JSIcon;
    setIcon(icon: JSIcon): void;
    getText(): string;
    setText(text: string): void;
    getContainer(): JSDiv;
    setContainer(container: JSDiv): void;
}
declare class JSTreeCellButton extends JSButton {
    constructor(icon: JSIcon);
}
declare class JSTreeCellRenderer {
    icons: {
        [key: string]: JSIcon;
    };
    leafIcon: JSIcon;
    openIcon: JSIcon;
    closedIcon: JSIcon;
    leafMargin: number;
    openMargin: number;
    closedMargin: number;
    constructor();
    getTreeCellRendererComponent(tree: JSTree, value: any): JSComponent;
    getIcon(treeNode: JSTreeNode): JSIcon;
    setIcon(treeNode: JSTreeNode, icon: JSIcon): void;
    getLeafIcon(): JSIcon;
    setLeafIcon(leafIcon: JSIcon): void;
    getOpenIcon(): JSIcon;
    setOpenIcon(openIcon: JSIcon): void;
    getClosedIcon(): JSIcon;
    setClosedIcon(closedIcon: JSIcon): void;
    getLeafMargin(): number;
    setLeafMargin(leafMargin: number): void;
    getOpenMargin(): number;
    setOpenMargin(openMargin: number): void;
    getClosedMargin(): number;
    setClosedMargin(closedMargin: number): void;
}
declare class JSTreeNode {
    userObject: any;
    nodes: JSTreeNode[];
    parent: JSTreeNode;
    expanded: boolean;
    constructor();
    constructor(userObject: any);
    add(node: JSTreeNode): void;
    remove(node: JSTreeNode): void;
    children(): JSTreeNode[];
    getParent(): JSTreeNode;
    getUserObject(): any;
    setUserObject(userObject: any): void;
    getTreePath(): string;
    isLeaf(): boolean;
    isExpanded(): boolean;
    setExpanded(expanded: boolean): void;
    toString(): string;
}
declare class JSCheckBoxMenuItem extends JSMenuItem {
    constructor();
    constructor(element: HTMLDivElement);
    constructor(action: JSAction);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(icon: JSIcon, selected: boolean);
    constructor(text: string, selected: boolean);
    constructor(text: string, icon: JSIcon);
    constructor(text: string, icon: JSIcon, selected: boolean);
    init(): void;
    getCheckBoxInput(): JSCheckBoxInput;
    isSelected(): boolean;
    setSelected(selected: boolean): void;
}
