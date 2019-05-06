/// <reference path = "../jsuis.ts"/>
/**
 * JSTree
 * 
 * @author Yassuo Toda
 */
class JSTree extends JSHTMLComponent {
    
    selectionTreeNode: JSTreeNode;
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(root: JSTreeNode);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setStyle("white-space", "nowrap");
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLDivElement);
            // constructor(root: JSTreeNode);
            if (args[0] instanceof HTMLDivElement) {
            } else if (args[0] instanceof JSTreeNode) {
                var root: JSTreeNode = args[0];
                this.setRoot(root);
            }
            break;
        default:
        }
        this.setLayout(new JSTreeLayout());
        this.setRootVisible(true);
    }
    init(): void {
        this.addClass("JSTree");
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
        var container: JSHTMLComponent = this;
        var parentNode: JSTreeNode = treeNode.getParent();
        if (parentNode) {
            var parentTreeCell: JSTreeCell = this.getTreeCell(parentNode.getTreePath());
            container = parentTreeCell.getContainer();
            if (!container) {
                container = new JSDiv();
                container.setStyle("display", "none");
                var grandParentContainer: JSHTMLComponent = this; 
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
        }).withArgs(treeCell, this);
    }
    getSelectionTreeNode(): JSTreeNode {
        return this.selectionTreeNode;
    }
    setSelectionTreeNode(selectionTreeNode: JSTreeNode) {
        this.selectionTreeNode = selectionTreeNode;
    }
    expand(treeNode: JSTreeNode) {
        treeNode.setExpanded(true);
        var treePath: string = treeNode.getTreePath();
        var treeCell: JSTreeCell = this.getTreeCell(treePath);
        if (!treeCell) {
            this.validate();
        }
        treeCell = this.getTreeCell(treePath);
        var container = treeCell.getContainer();
        container.setStyle("display", "");
        var treeCell: JSTreeCell = this.getTreeCell(treePath);
        treeCell.getBranchButton().setIcon(JSTreeCell.EXPANDED_PATH_ICON);
    }
    collapse(treeNode: JSTreeNode) {
        treeNode.setExpanded(false);
        var treePath: string = treeNode.getTreePath();
        var treeCell: JSTreeCell = this.getTreeCell(treePath);
        if (!treeCell) {
            this.validate();
        }
        treeCell = this.getTreeCell(treePath);
        var container = treeCell.getContainer();
        container.setStyle("display", "none");
        var treeCell: JSTreeCell = this.getTreeCell(treePath);
        treeCell.getBranchButton().setIcon(JSTreeCell.COLLAPSED_PATH_ICON);
    }
    load(): void {
        this.removeAll();
        var rootVisible: boolean = this.isRootVisible();
        this.loadTreeNode(this.getRoot());
        var root: JSTreeNode = this.getRoot();
        var rootTreeCell: JSTreeCell = this.getTreeCell(root.getTreePath());
        rootTreeCell.getBranchButton().setIcon(JSTreeCell.EXPANDED_PATH_ICON);
        rootTreeCell.setStyle("display", rootVisible ? "" : "none");
        var rootContainer: JSDiv = rootTreeCell.getContainer();
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
}