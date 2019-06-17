/// <reference path = "../jsuis.ts"/>
/**
 * JSTree
 * 
 * @author Yassuo Toda
 */
class JSTree extends JSPanel {
    
    selectionTreeNode: JSTreeNode;
    
    constructor();
    constructor(element: HTMLElement);
    constructor(root: JSTreeNode);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setUI("JSTree");
        switch (args.length) {
        case 1:
            // constructor(root: JSTreeNode);
            if (args[0] instanceof JSTreeNode) {
                var root: JSTreeNode = args[0];
                this.setRoot(root);
            }
            break;
        default:
        }
        this.setLayout(new JSTreeLayout());
        this.setRootVisible(true);
    }
    getRoot(): JSTreeNode {
        var root: JSTreeNode = this.getData("root");
        if (!root) {
            root = new JSTreeNode();
            this.setRoot(root);
        }
        return root; 
    }
    setRoot(root: JSTreeNode) {
        this.setData("root", root);
    }
    isRootVisible(): boolean {
        return this.getAttribute("data-root-visible") === "true";
    }
    setRootVisible(rootVisible: boolean) {
        this.setAttribute("data-root-visible", "" + rootVisible);
    }
    getTreeCells(): { [ key: string ]: JSTreeCell } {
        var treeCells: { [ key: string ]: JSTreeCell } = this.getData("treeCells");
        if (!treeCells) {
            treeCells = {};
            this.setData("treeCells", treeCells);
        }
        return treeCells;
    }
    removeTreeCells() {
        this.setData("treeCells", {});
    }
    getTreeCell(treePath: string): JSTreeCell {
        var treeCells: { [ key: string ]: JSTreeCell } = this.getTreeCells();
        return treeCells[treePath];
    }
    setTreeCell(treePath: string, treeCell: JSTreeCell) {
        var treeCells: { [ key: string ]: JSTreeCell } = this.getTreeCells();
        treeCells[treePath] = treeCell;
    }
    getTreeCellRenderer(): JSTreeCellRenderer {
        var treeCellRenderer = this.getData("treeCellRenderer");
        if (!treeCellRenderer) {
            treeCellRenderer = new JSTreeCellRenderer();
            this.setTreeCellRenderer(treeCellRenderer);
        }
        return treeCellRenderer;
    }
    setTreeCellRenderer(treeCellRenderer: JSTreeCellRenderer): void {
        this.setData("treeCellRenderer", treeCellRenderer);
    }
    addTreeNode(treeNode: JSTreeNode): void {
        var container: JSComponent = this;
        var parentNode: JSTreeNode = treeNode.getParent();
        if (parentNode) {
            var parentTreeCell: JSTreeCell = this.getTreeCell(parentNode.getTreePath());
            container = parentTreeCell.getContainer();
            if (!container) {
                container = new JSDiv();
                container.setStyle("display", "none");
                var grandParentContainer: JSComponent = this; 
                var grandParentNode: JSTreeNode = parentNode.getParent();
                if (grandParentNode) {
                    var grandParentTreeCell: JSTreeCell = this.getTreeCell(grandParentNode.getTreePath());
                    grandParentContainer = grandParentTreeCell.getContainer();
                }
                grandParentContainer.add(container);
                parentTreeCell.setContainer(container);
            }
        }
        var treeCellRenderer = this.getTreeCellRenderer();
        var treeCell: JSTreeCell = <JSTreeCell> treeCellRenderer.getTreeCellRendererComponent(this, treeNode);
        container.add(treeCell);
        var treePath: string = treeNode.getTreePath();
        this.setTreeCell(treePath, treeCell);
        treeCell.addMouseListener({
            mousePressed(mouseEvent: MouseEvent, treeCell: JSTreeCell, tree: JSTree) {
                tree.setSelectionTreeNode(treeCell.getValue());
            }
        }).withParameters(treeCell, this);
    }
    getSelectionTreeNode(): JSTreeNode {
        return this.selectionTreeNode;
    }
    setSelectionTreeNode(selectionTreeNode: JSTreeNode) {
        var oldSelectionTreeNode = this.selectionTreeNode;
        this.selectionTreeNode = selectionTreeNode;
        if (selectionTreeNode !== oldSelectionTreeNode) {
            var treePath: string = selectionTreeNode.getTreePath();
            this.fireValueChanged(new JSTreeSelectionEvent(this, treePath, false));
        }
    }
    expand(treeNode: JSTreeNode) {
        treeNode.setExpanded(true);
        var treePath: string = treeNode.getTreePath();
        var treeCell: JSTreeCell = this.getTreeCell(treePath);
        if (!treeCell) {
            this.load();
        }
        treeCell = this.getTreeCell(treePath);
        var container: JSComponent = treeCell.getContainer();
        container.setStyle("display", "");
        var treeCell: JSTreeCell = this.getTreeCell(treePath);
        // treeCell.getButton().setIcon(JSTreeCell.EXPANDED_PATH_ICON);
        treeCell.setOpenIcon(JSTreeCell.EXPANDED_PATH_ICON);
    }
    collapse(treeNode: JSTreeNode) {
        treeNode.setExpanded(false);
        var treePath: string = treeNode.getTreePath();
        var treeCell: JSTreeCell = this.getTreeCell(treePath);
        if (!treeCell) {
            this.load();
        }
        treeCell = this.getTreeCell(treePath);
        var container: JSComponent = treeCell.getContainer();
        container.setStyle("display", "none");
        var treeCell: JSTreeCell = this.getTreeCell(treePath);
        // treeCell.getButton().setIcon(JSTreeCell.COLLAPSED_PATH_ICON);
        treeCell.setClosedIcon(JSTreeCell.COLLAPSED_PATH_ICON);
    }
    load(): void {
        this.removeAll();
        this.removeTreeCells();
        var rootVisible: boolean = this.isRootVisible();
        this.loadTreeNode(this.getRoot());
        var root: JSTreeNode = this.getRoot();
        var rootTreeCell: JSTreeCell = this.getTreeCell(root.getTreePath());
        // rootTreeCell.getButton().setIcon(JSTreeCell.EXPANDED_PATH_ICON);
        rootTreeCell.setStyle("display", rootVisible ? "" : "none");
        var rootContainer: JSComponent = rootTreeCell.getContainer();
        rootContainer.setStyle("display", "");
    }
    loadTreeNode(treeNode: JSTreeNode): void {
        this.addTreeNode(treeNode);
        var treeCell: JSTreeCell = this.getTreeCell(treeNode.getTreePath());
        var children: JSTreeNode[] = treeNode.children();
        for (var i: number = 0; i < children.length; i++) {
            var child = children[i];
            this.loadTreeNode(child);
        }
    }
    /*
    validate(): void {
        var components: JSComponent[] = this.getComponents();
        if (!components.length) {
            this.load();
        }
    }
    */
    
    treeSelectionListeners: TreeSelectionListener[];
    
    getTreeSelectionListeners(): TreeSelectionListener[] {
        var treeSelectionListeners: TreeSelectionListener[] = this.treeSelectionListeners;
        if (treeSelectionListeners === undefined) {
            treeSelectionListeners = [];
            this.treeSelectionListeners = treeSelectionListeners;
        }
        return treeSelectionListeners;
    }
    addTreeSelectionListener(treeSelectionListener: TreeSelectionListener) {
        var treeSelectionListeners: TreeSelectionListener[] = this.getTreeSelectionListeners();
        treeSelectionListeners.push(treeSelectionListener);
    }
    removeTreeSelectionListener(treeSelectionListener: TreeSelectionListener) {
        var treeSelectionListeners: TreeSelectionListener[] = this.getTreeSelectionListeners();
        var index = treeSelectionListeners.indexOf(treeSelectionListener);
        if (index !== -1) {
            treeSelectionListeners.splice(index, 1);
        }
    }
    fireValueChanged(treeSelectionEvent: JSTreeSelectionEvent): void {
        var treeSelectionListeners: TreeSelectionListener[] = this.getTreeSelectionListeners();
        for (var i: number = 0; i < treeSelectionListeners.length; i++) {
            var treeSelectionListener = treeSelectionListeners[i];
            treeSelectionListener.valueChanged(treeSelectionEvent);
        }
    }
}