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
    propertyChange(propertyChangeEvent: JSPropertyChangeEvent, ...parameters: any[]): void;
    getSource?(): JSComponent;
}
interface Runnable {
    run(...parameters: any[]): void;
}
interface TreeSelectionListener {
    valueChanged(treeSelectionEvent: JSTreeSelectionEvent, ...parameters: any[]): void;
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
    toString(): string;
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
declare class JSChangeListener implements ChangeListener {
    stateChanged: (event: Event, ...parameters: any[]) => void;
    parameters: any[];
    constructor(changeListener: ChangeListener);
    getParameters(): any[];
    setParameters(...parameters: any[]): void;
    withParameters(...parameters: any[]): this;
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
    withStyle(style: string, value: string): JSComponent;
    removeStyle(style: string): void;
    getData(key: string): any;
    setData(key: string, value: any): void;
    getClientProperty(key: string): any;
    putClientProperty(key: string, value: any): void;
    getChild(clazz: string): Element;
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
    getUI(): string;
    setUI(ui: string): void;
    x: number;
    getX(): number;
    y: number;
    getY(): number;
    setX(x: number): void;
    setY(y: number): void;
    width: number;
    getWidth(): number;
    setWidth(width: number): void;
    height: number;
    getHeight(): number;
    setHeight(height: number): void;
    getOuterWidth(): number;
    setOuterWidth(outerWidth: number): void;
    getOuterHeight(): number;
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
    getLayer(): number;
    setLayer(layer: number): void;
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
    isValid(): boolean;
    setValid(valid: boolean): void;
    validHorizontally: boolean;
    isValidHorizontally(): boolean;
    setValidHorizontally(validHorizontally: boolean): void;
    validVertically: boolean;
    isValidVertically(): boolean;
    setValidVertically(validVertically: boolean): void;
    invalidate(): void;
    invalidateHorizontally(): void;
    invalidateVertically(): void;
    invalidateChildren(): void;
    invalidateChildrenHorizontally(): void;
    invalidateChildrenVertically(): void;
    validate(): void;
    validateHorizontally(): void;
    validateVertically(): void;
    validateChildrenHorizontally(): void;
    validateChildrenVertically(): void;
    revalidate(): void;
    revalidateHorizontally(): void;
    revalidateVertically(): void;
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
declare class JSDataTransfer {
    static instance: JSDataTransfer;
    static getInstance(): JSDataTransfer;
    static getData(key: string): any;
    static setData(key: string, value: any): void;
    static getDragImage(): JSComponent;
    static setDragImage(dragImage: JSComponent): void;
    data: {
        [key: string]: any;
    };
    getData(key: string): any;
    setData(key: string, value: any): void;
    getDragImage(): JSComponent;
    setDragImage(dragImage: JSComponent): void;
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
declare class JSEmptyBorder implements Border {
    top: number;
    left: number;
    bottom: number;
    right: number;
    constructor(top: number, left: number, bottom: number, right: number);
    getTop(): number;
    setTop(top: number): void;
    getLeft(): number;
    setLeft(left: number): void;
    getBottom(): number;
    setBottom(bottom: number): void;
    getRight(): number;
    setRight(right: number): void;
    paintBorder(component: JSComponent): void;
}
declare class JSFileUtils {
    static writeStringToFile(filename: string, text: string): void;
}
declare class JSIcon {
    iconWidth: number;
    iconHeight: number;
    name: string;
    constructor();
    constructor(iconWidth: number, iconHeight: number);
    getIconWidth(): number;
    setIconWidth(iconWidth: number): void;
    getIconHeight(): number;
    setIconHeight(iconHeight: number): void;
    paintIcon(component: JSComponent, graphics: JSGraphics): void;
    getName(): string;
    setName(name: string): void;
    withName(name: string): this;
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
    static containers: JSComponent[];
    static getContainers(): JSComponent[];
    static validateLater(container: JSComponent): void;
    static validateContainers(): void;
    addLayoutComponent(component: JSComponent): void;
    removeLayoutComponent(component: JSComponent): void;
    preferredLayoutWidth(container: JSComponent): number;
    preferredLayoutHeight(container: JSComponent): number;
    layoutContainer(container: JSComponent): void;
    layoutContainerHorizontally(container: JSComponent): void;
    layoutContainerVertically(container: JSComponent): void;
}
declare class JSLineBorder implements Border {
    color: string;
    thickness: number;
    constructor(color: string);
    constructor(color: string, thickness: number);
    getColor(): string;
    setColor(color: string): void;
    getThickness(): number;
    setThickness(thickness: number): void;
    paintBorder(component: JSComponent): void;
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
    propertyChange: (propertyChangeEvent: JSPropertyChangeEvent, ...parameters: any[]) => void;
    parameters: any[];
    constructor(propertyChangeListener: PropertyChangeListener);
    getParameters(): any[];
    setParameters(...parameters: any[]): void;
    withParameters(...parameters: any[]): this;
}
declare class JSPropertyChangeSupport {
    propertyChangeListeners: PropertyChangeListener[];
    getPropertyChangeListeners(): PropertyChangeListener[];
    addPropertyChangeListener(propertyChangeListener: PropertyChangeListener): void;
    removePropertyChangeListener(propertyChangeListener: PropertyChangeListener): void;
    firePropertyChange(propertyChangeEvent: JSPropertyChangeEvent): void;
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
declare class JSTreeSelectionEvent {
    source: any;
    treePath: string;
    addedPath: boolean;
    constructor(source: any, treePath: string, addedPath: boolean);
    getSource(): any;
    setSource(source: any): void;
    getTreePath(): string;
    setTreePath(treePath: string): void;
    isAddedPath(): boolean;
    setAddedPath(addedPath: boolean): void;
}
declare class JSTreeSelectionListener implements TreeSelectionListener {
    valueChanged: (treeSelectionEvent: JSTreeSelectionEvent, ...parameters: any[]) => void;
    parameters: any[];
    constructor(treeSelectionListener: TreeSelectionListener);
    getParameters(): any[];
    setParameters(...parameters: any[]): void;
    withParameters(...parameters: any[]): this;
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
    layoutContainerHorizontally(container: JSComponent): void;
    layoutContainerVertically(container: JSComponent): void;
}
declare class JSCardLayout extends JSLayout {
    addLayoutComponent(component: JSComponent): void;
    preferredLayoutWidth(container: JSComponent): number;
    preferredLayoutHeight(container: JSComponent): number;
    layoutContainerHorizontally(container: JSComponent): void;
    layoutContainerVertically(container: JSComponent): void;
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
    layoutContainerHorizontally(container: JSComponent): void;
    layoutContainerVertically(container: JSComponent): void;
    layoutComponentsHorizontally(container: JSComponent, components: JSComponent[], x: number, rowWidth: number): void;
    layoutComponentsVertically(container: JSComponent, components: JSComponent[], y: number, rowHeight: number): void;
}
declare class JSHTMLComponent extends JSComponent {
    constructor(element: HTMLElement);
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
    getHTML(): string;
    setHTML(html: string): void;
    getCursor(): string;
    setCursor(cursor: string): void;
}
declare class JSSVGComponent extends JSComponent {
    constructor(element: SVGElement);
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
    getFill(): string;
    setFill(fill: string): void;
    getStroke(): string;
    setStroke(stroke: string): void;
    getOpacity(): number;
    setOpacity(opacity: number): void;
}
declare class JSSplitPaneLayout extends JSLayout {
    addLayoutComponent(component: JSComponent): void;
    preferredLayoutWidth(splitPane: JSSplitPane): number;
    preferredLayoutHeight(splitPane: JSSplitPane): number;
    layoutContainerHorizontally(splitPane: JSSplitPane): void;
    layoutContainerVertically(splitPane: JSSplitPane): void;
}
declare class JSTreeLayout extends JSLayout {
    preferredLayoutWidth(tree: JSTree): number;
    preferredLayoutHeight(tree: JSTree): number;
}
declare class JSBody extends JSHTMLComponent implements MouseListener {
    static instance: JSBody;
    static getInstance(): JSBody;
    popupMenu: JSComponent;
    dialog: JSDialog;
    dragImage: JSComponent;
    dragSource: JSComponent;
    fileChooser: JSFileChooser;
    constructor();
    getFrame(): JSFrame;
    setFrame(frame: JSFrame): void;
    getDefsContainer(): JSBodyDefsContainer;
    getDefs(): JSDefs;
    getPopupMenuContainer(): JSBodyPopupMenuContainer;
    getPopupMenu(): JSComponent;
    setPopupMenu(popupMenu: JSComponent): void;
    getDialogContainer(): JSBodyDialogContainer;
    getModal(): JSBodyModal;
    getDialog(): JSDialog;
    setDialog(dialog: JSDialog): void;
    getDragImageContainer(): JSBodyDragImageContainer;
    getDragImage(): JSComponent;
    setDragImage(dragImage: JSComponent): void;
    getDragSource(): JSComponent;
    setDragSource(dragSource: JSComponent): void;
    getFileChooser(): JSFileChooser;
    setFileChooser(fileChooser: JSFileChooser): void;
    getTimer(): JSTimer;
    mouseMoved(mouseEvent: MouseEvent): void;
    mouseReleased(mouseEvent: MouseEvent): void;
}
declare class JSButton extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
    constructor(action: JSAction);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(text: string, icon: JSIcon);
    getGraphics(): JSButtonGraphics;
    getSpan(): JSButtonSpan;
    setIcon(icon: JSIcon): void;
    getText(): string;
    setText(text: string): void;
    getIconTextGap(): number;
    setIconTextGap(iconTextGap: number): void;
    isUndecorated(): boolean;
    setUndecorated(undecorated: boolean): void;
    isEnabled(): boolean;
    setEnabled(enabled: boolean): void;
}
declare class JSCheckBox extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
    constructor(action: JSAction);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(icon: JSIcon, selected: boolean);
    constructor(text: string, selected: boolean);
    constructor(text: string, icon: JSIcon);
    constructor(text: string, icon: JSIcon, selected: boolean);
    getInput(): JSCheckBoxInput;
    getLabel(): JSCheckBoxLabel;
    getIcon(): JSIcon;
    setIcon(icon: JSIcon): void;
    getText(): string;
    setText(text: string): void;
    isSelected(): boolean;
    setSelected(selected: boolean): void;
}
declare class JSCheckBoxInput extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
    constructor(selected: boolean);
    setSelected(selected: boolean): void;
    isSelected(): boolean;
}
declare class JSComboBox extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
    constructor(items: Array<string>);
    getItems(): Array<any>;
    setItems(items: Array<any>): void;
    getSelectedIndex(): number;
    getSelectedItem(): any;
}
declare class JSDefs extends JSSVGComponent {
    constructor();
    constructor(element: SVGDefsElement);
}
declare class JSDiv extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSFileChooser extends JSHTMLComponent {
    selectedFiles: FileList;
    constructor();
    constructor(element: HTMLElement);
    getFileFilter(): string;
    setFileFilter(fileFilter: string): void;
    showOpenDialog(): void;
    getSelectedFiles(): FileList;
    setSelectedFiles(selectedFiles: FileList): void;
}
declare class JSForm extends JSHTMLComponent {
    static POST: string;
    static GET: string;
    static post(url: string, params?: {
        [key: string]: string;
    }): void;
    static get(url: string, params?: {
        [key: string]: string;
    }): void;
    constructor();
    constructor(element: HTMLElement);
    getMethod(): string;
    setMethod(method: string): void;
    getUrl(): string;
    setUrl(url: string): void;
    submit(): void;
    post(url: string, params?: {
        [key: string]: string;
    }): void;
    get(url: string, params?: {
        [key: string]: string;
    }): void;
}
declare class JSFrame extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
    getTitleLabel(): JSFrameTitleLabel;
    getMenuBarContainer(): JSFrameMenuBarContainer;
    getContentPane(): JSComponent;
    setContentPane(contentPane: JSComponent): void;
    getTitle(): string;
    setTitle(title: string): void;
    setMenuBar(menuBar: JSMenuBar): void;
    getLayout(): JSLayout;
    setLayout(layout: JSLayout): void;
    validateHorizontally(): void;
    validateVertically(): void;
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
    setVisible(visible: boolean): void;
}
declare class JSGridBagLayout extends JSLayout {
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
    layoutContainerHorizontally(container: JSComponent): void;
    layoutContainerVertically(container: JSComponent): void;
}
declare class JSHiddenInput extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
    constructor(name: string, value: string);
    getValue(): string;
    setValue(value: string): void;
    withValue(value: string): this;
}
declare class JSIFrame extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
    getSource(): string;
    setSource(source: string): void;
    open(): void;
    write(content: string): void;
    close(): void;
}
declare class JSImage extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
    constructor(source: string);
    constructor(source: string, width: number, height: number);
    getSource(): string;
    setSource(source: string): void;
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
declare class JSLabelSpan extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSLabel extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(icon: JSIcon, horizontalAlignment: string);
    constructor(text: string, horizontalAlignment: string);
    constructor(text: string, icon: JSIcon);
    constructor(text: string, icon: JSIcon, horizontalAlignment: string);
    getGraphics(): JSLabelGraphics;
    getSpan(): JSLabelSpan;
    setIcon(icon: JSIcon): void;
    getText(): string;
    setText(text: string): void;
    getIconTextGap(): number;
    setIconTextGap(iconTextGap: number): void;
}
declare class JSLI extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
    constructor(text: string);
}
declare class JSMarker extends JSSVGComponent {
    constructor();
    constructor(element: SVGMarkerElement);
}
declare class JSOList extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
    constructor(items: Array<string>);
    getItems(): Array<any>;
    setItems(items: Array<any>): void;
    getType(): string;
    setType(t: string): void;
    withType(t: string): this;
}
declare class JSOption extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
    constructor(text: string);
    getText(): string;
    setText(text: string): void;
    getValue(): string;
    setValue(value: string): void;
}
declare class JSParagraph extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
    constructor(text: string);
    constructor(text: string, horizontalAlignment: string);
}
declare class JSPanel extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
    constructor(layout: JSLayout);
}
declare class JSPath extends JSSVGComponent {
    constructor();
    constructor(element: SVGElement);
    constructor(definition: string);
    getDefinition(): string;
    setDefinition(definition: string): void;
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
declare class JSProgressBar extends JSHTMLComponent {
    value: number;
    constructor();
    constructor(element: HTMLElement);
    constructor(orientation: string);
    constructor(min: number, max: number);
    constructor(orientation: string, min: number, max: number);
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
declare class JSRadioButton extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
    constructor(selected: boolean);
}
declare class JSSpan extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSSVG extends JSSVGComponent {
    constructor();
    constructor(element: SVGElement);
    constructor(width: number, height: number);
    setX(x: number): void;
    setY(y: number): void;
    getViewBox(): string;
    setViewBox(viewBox: string): void;
}
declare class JSSVGImage extends JSSVGComponent {
    constructor();
    constructor(element: SVGImageElement);
    constructor(icon: JSIcon);
    constructor(source: string);
    constructor(source: string, width: number, height: number);
    getSource(): string;
    setSource(source: string): void;
}
declare class JSTabbedPane extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
    constructor(tabPlacement: string);
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
declare class JSTable extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
    constructor(rows: any[][], columns: string[]);
    getTableHeader(): JSTableHeader;
    getTableBody(): JSTableBody;
    getColumns(): string[];
    setColumns(columns: string[]): void;
    getRows(): any[][];
    setRows(rows: any[][]): void;
}
declare class JSTableBody extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
    getRows(): any[][];
    setRows(rows: any[][]): void;
}
declare class JSTableCell extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
    constructor(value: any);
    getValue(): any;
    setValue(value: any): void;
}
declare class JSTableHeader extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
    getTableHeaderRow(): JSTableRow;
    getColumns(): string[];
    setColumns(columns: string[]): void;
}
declare class JSTableHeaderCell extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
    constructor(text: string);
    getContainer(): JSPanel;
    getText(): string;
    setText(text: string): void;
}
declare class JSTableRow extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
    constructor(values: any[]);
    getValues(): any[];
    setValues(values: any[]): void;
}
declare class JSTextArea extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
    constructor(text: string);
    constructor(rows: number, columns: number);
    constructor(text: string, rows: number, columns: number);
    getRows(): number;
    setRows(rows: number): void;
    getColumns(): number;
    setColumns(columns: number): void;
    getText(): string;
    setText(text: string): void;
}
declare class JSTextField extends JSHTMLComponent {
    constructor();
    constructor(element: HTMLElement);
    constructor(columns: number);
    constructor(text: string);
    constructor(text: string, columns: number);
    getColumns(): number;
    setColumns(columns: number): void;
    getText(): string;
    setText(text: string): void;
}
declare class JSTreeCell extends JSHTMLComponent {
    static COLLAPSED_PATH_DEFINITION: string;
    static EXPANDED_PATH_DEFINITION: string;
    static COLLAPSED_PATH_ICON: JSPathIcon;
    static EXPANDED_PATH_ICON: JSPathIcon;
    constructor();
    constructor(element: HTMLElement);
    constructor(value: any);
    constructor(value: any, icon: JSIcon);
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
    getContainer(): JSComponent;
    setContainer(container: JSComponent): void;
}
declare class JSBodyDefsContainer extends JSSVG {
    constructor();
    constructor(element: SVGElement);
}
declare class JSBodyDialogContainer extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSBodyDragImageContainer extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSBodyModal extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSBodyPopupMenuContainer extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSButtonSpan extends JSSpan {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSCheckBoxLabel extends JSLabel {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSDialog extends JSPanel implements MouseListener, ActionListener {
    modal: boolean;
    title: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(modal: boolean);
    constructor(title: string);
    constructor(title: string, modal: boolean);
    getTitlePanel(): JSDialogTitlePanel;
    getTitleLabel(): JSDialogTitleLabel;
    getCloseButton(): JSDialogCloseButton;
    getContentPane(): JSDialogContentPane;
    isModal(): boolean;
    setModal(modal: boolean): void;
    getTitle(): string;
    setTitle(title: string): void;
    setLayout(layout: JSLayout): void;
    add(component: JSComponent): void;
    add(component: JSComponent, constraints: number | string | {
        [key: string]: number | string;
    }): void;
    add(component: JSComponent, constraints: number | string | {
        [key: string]: number | string;
    }, index: number): void;
    setVisible(visible: boolean): void;
    mousePressed(mouseEvent: MouseEvent): void;
    mouseDragged(mouseEvent: MouseEvent): void;
    actionPerformed(mouseEvent: MouseEvent): void;
}
declare class JSDialogContentPane extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSDialogCloseButton extends JSButton {
    static CLOSE_ICON: JSPathIcon;
    constructor();
    constructor(element: HTMLElement);
}
declare class JSDialogTitleLabel extends JSLabel {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSDialogTitlePanel extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSFrameContentPane extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSFrameMenuBarContainer extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSFrameTitleLabel extends JSLabel {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSGraphics extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSLayeredPane extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
    constructor(layout: JSLayout);
}
declare class JSMenuBar extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
    add(menu: JSMenu): void;
    getMenuContainer(): JSMenuContainer;
}
declare class JSMenuContainer extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
    add(menu: JSMenu): void;
    setSelected(selected: boolean): void;
    getTimer(): JSTimer;
}
declare class JSMenuItem extends JSPanel implements MouseListener {
    constructor();
    constructor(element: HTMLElement);
    constructor(action: JSAction);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(text: string, icon: JSIcon);
    getLabel(): JSMenuItemLabel;
    getIcon(): JSIcon;
    setIcon(icon: JSIcon): void;
    getText(): string;
    setText(text: string): void;
    mouseEntered(mouseEvent: MouseEvent): void;
    mouseClicked(mouseEvent: MouseEvent): void;
}
declare class JSMenuItemLabel extends JSLabel {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSPathImage extends JSSVG {
    constructor();
    constructor(element: SVGSVGElement);
    constructor(source: string);
    constructor(source: string, width: number, height: number);
    getPath(): JSPath;
    getSource(): string;
    setSource(source: string): void;
    getName(): string;
    setName(name: string): void;
    getFill(): string;
    setFill(fill: string): void;
    getStroke(): string;
    setStroke(stroke: string): void;
}
declare class JSPopupMenu extends JSPanel {
    invoker: JSComponent;
    constructor();
    constructor(element: HTMLElement);
    add(component: JSComponent): void;
    addSeparator(): void;
    getInvoker(): JSComponent;
    setInvoker(invoker: JSComponent): void;
    show(invoker: JSComponent, x: number, y: number): void;
    setSelected(selected: boolean): void;
    getTimer(): JSTimer;
}
declare class JSPopupMenuContainer extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSScrollPane extends JSPanel {
    static VERTICAL_SCROLLBAR_AS_NEEDED: string;
    static VERTICAL_SCROLLBAR_NEVER: string;
    static VERTICAL_SCROLLBAR_ALWAYS: string;
    static HORIZONTAL_SCROLLBAR_AS_NEEDED: string;
    static HORIZONTAL_SCROLLBAR_NEVER: string;
    static HORIZONTAL_SCROLLBAR_ALWAYS: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(view: JSComponent);
    constructor(vsbPolicy: string, hsbPolicy: string);
    constructor(view: JSComponent, vsbPolicy: string, hsbPolicy: string);
    getViewContainer(): JSScrollPaneViewContainer;
    getVsbPolicy(): string;
    setVsbPolicy(vsbPolicy: string): void;
    getHsbPolicy(): string;
    setHsbPolicy(hsbPolicy: string): void;
    getViewportView(): JSComponent;
    setViewportView(viewportView: JSComponent): void;
    getPreferredWidth(): number;
    getPreferredHeight(): number;
}
declare class JSScrollPaneViewContainer extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSSeparator extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
    constructor(orientation: string);
    getOrientation(): string;
    setOrientation(orientation: string): void;
    getHorizontalLine(): JSSeparatorHorizontalLine;
    getVerticalLine(): JSSeparatorVerticalLine;
}
declare class JSSeparatorHorizontalLine extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSSeparatorVerticalLine extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSSplitPane extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
    constructor(orientation: string);
    getOrientation(): string;
    setOrientation(orientation: string): void;
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
    constructor(element: HTMLElement);
}
declare class JSSplitPaneDividerPanel extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSSplitPaneLeftContainer extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSSplitPaneRightContainer extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSTab extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
    constructor(tabPlacement: string, closeable: boolean, text: string);
    constructor(tabPlacement: string, closeable: boolean, text: string, icon: JSIcon);
    getGraphics(): JSTabGraphics;
    getLabel(): JSTabLabel;
    getCloseButton(): JSTabCloseButton;
    getTabPlacement(): string;
    setTabPlacement(tabPlacement: string): void;
    isCloseable(): boolean;
    setCloseable(closeable: boolean): void;
    getText(): string;
    setText(text: string): void;
    setSelected(selected: boolean): void;
}
declare class JSTabCloseButton extends JSButton {
    static CLOSE_ICON: JSPathIcon;
    constructor();
    constructor(element: HTMLElement);
}
declare class JSTabLabel extends JSLabel {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSTabbedPaneButtonContainer extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
    constructor(tabPlacement: string);
    getTabPlacement(): string;
    setTabPlacement(tabPlacement: string): void;
}
declare class JSTabbedPaneCardContainer extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSTabbedPaneTabContainer extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
    constructor(tabPlacement: string);
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
declare class JSToolBar extends JSPanel {
    constructor();
    constructor(element: HTMLElement);
    addSeparator(): void;
}
declare class JSTree extends JSPanel {
    selectionTreeNode: JSTreeNode;
    constructor();
    constructor(element: HTMLElement);
    constructor(root: JSTreeNode);
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
    treeSelectionListeners: TreeSelectionListener[];
    getTreeSelectionListeners(): TreeSelectionListener[];
    addTreeSelectionListener(treeSelectionListener: TreeSelectionListener): void;
    removeTreeSelectionListener(treeSelectionListener: TreeSelectionListener): void;
    fireValueChanged(treeSelectionEvent: JSTreeSelectionEvent): void;
}
declare class JSTreeCellButton extends JSButton {
    constructor(icon: JSIcon);
}
declare class JSButtonGraphics extends JSGraphics {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSCheckBoxMenuItem extends JSMenuItem {
    constructor();
    constructor(element: HTMLElement);
    constructor(action: JSAction);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(icon: JSIcon, selected: boolean);
    constructor(text: string, selected: boolean);
    constructor(text: string, icon: JSIcon);
    constructor(text: string, icon: JSIcon, selected: boolean);
    getInput(): JSCheckBoxInput;
    isSelected(): boolean;
    setSelected(selected: boolean): void;
}
declare class JSLabelGraphics extends JSGraphics {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSMenu extends JSMenuItem implements MouseListener, Runnable {
    static DELAY: number;
    static SUBMENU_ICON: JSIcon;
    delay: number;
    constructor();
    constructor(element: HTMLElement);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(text: string, icon: JSIcon);
    getGraphics(): JSMenuGraphics;
    getPopupMenuContainer(): JSPopupMenuContainer;
    getPopupMenu(): JSPopupMenu;
    setPopupMenu(popupMenu: JSPopupMenu): void;
    getSubmenuIcon(): JSPathIcon;
    setSubmenuIcon(icon: JSIcon): void;
    getDelay(): number;
    setDelay(delay: number): void;
    getTimer(): JSTimer;
    add(component: JSComponent): void;
    addSeparator(): void;
    setSelected(selected: boolean): void;
    mousePressed(mouseEvent: MouseEvent): void;
    mouseReleased(mouseEvent: MouseEvent): void;
    mouseClicked(mouseEvent: MouseEvent): void;
    mouseEntered(mouseEvent: MouseEvent): void;
    mouseExited(mouseEvent: MouseEvent): void;
    run(): void;
}
declare class JSMenuGraphics extends JSGraphics {
    constructor();
    constructor(element: HTMLElement);
}
declare class JSTabGraphics extends JSGraphics {
    constructor();
    constructor(element: HTMLElement);
}
