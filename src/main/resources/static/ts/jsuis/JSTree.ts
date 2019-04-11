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
        var root = this.getRoot();
        if (!root) {
            root = new JSTreeNode();
            this.setRoot(root);
        }
        this.setLayout(new JSTreeLayout());
        this.setRootVisible(true);
        this.setStyle("white-space", "nowrap");
        this.setClass("JSTree");
    }
    getRoot(): JSTreeNode {
        return this.getData("root"); 
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
            this.setTreeCells(treeCells);
        }
        return treeCells;
    }
    setTreeCells(treeCells: { [ key: string ]: JSTreeCell }) {
        this.setData("treeCells", treeCells);
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
        var treeOrContainer: JSDiv | JSTree = this;
        var parent = treeNode.getParent();
        if (parent) {
            var parentTreeCell = this.getTreeCell(parent.getTreePath());
            if (parentTreeCell) {
                treeOrContainer = parentTreeCell.getContainer();;
            }
        }
        var treeCellRenderer = this.getTreeCellRenderer();
        var selectionTreeNode = this.getSelectionTreeNode();
        var treeCell: JSTreeCell = <JSTreeCell> treeCellRenderer.getTreeCellRendererComponent(this, treeNode);
        treeOrContainer.add(treeCell);
        var treePath: string = treeNode.getTreePath();
        this.setTreeCell(treePath, treeCell);
        if (treeNode.getAllowsChildren()) {
            var container = new JSDiv();
            container.setStyle("display", "none");
            treeOrContainer.add(container);
            treeCell.setContainer(container);
        }
        var tree: JSTree = this;
        treeCell.addMouseListener({
            mousePressed(mouseEvent: MouseEvent) {
                tree.setSelectionTreeNode(treeCell.getValue());
            }
        });
    }
    getSelectionTreeNode(): JSTreeNode {
        return this.selectionTreeNode;
    }
    setSelectionTreeNode(selectionTreeNode: JSTreeNode) {
        this.selectionTreeNode = selectionTreeNode;
    }
    expand(treePath: string) {
        var treeCell: JSTreeCell = this.getTreeCell(treePath);
        if (!treeCell) {
            this.validate();
        }
        treeCell = this.getTreeCell(treePath);
        var container = treeCell.getContainer();
        container.setStyle("display", "");
        var treeCell: JSTreeCell = this.getTreeCell(treePath);
        treeCell.getBranchButton().setIcon(new JSPathIcon(JSTreeCell.EXPANDED_PATH_DEFINITION, "gray", "none", 16, 16));
    }
    collapse(treePath: string) {
        var treeCell: JSTreeCell = this.getTreeCell(treePath);
        if (!treeCell) {
            this.validate();
        }
        treeCell = this.getTreeCell(treePath);
        var container = treeCell.getContainer();
        container.setStyle("display", "none");
        var treeCell: JSTreeCell = this.getTreeCell(treePath);
        treeCell.getBranchButton().setIcon(new JSPathIcon(JSTreeCell.COLLAPSED_PATH_DEFINITION, "gray", "none", 16, 16));
    }
    reload(): void {
        this.removeAll();
        this.load(this.getRoot());
        this.pad(this, this.isRootVisible() ? 4 : -8);
        var components: JSComponent[] = this.getComponents();
        var rootTreeCell: JSTreeCell = <JSTreeCell> components[0];
        var rootVisible: boolean = this.isRootVisible();
        rootTreeCell.getBranchButton().setIcon(new JSPathIcon(JSTreeCell.EXPANDED_PATH_DEFINITION, "gray", "none", 16, 16));
        rootTreeCell.setStyle("display", rootVisible ? "" : "none");
        var rootContainer: JSComponent = components[1];
        rootContainer.setStyle("display", "");
    }
    load(treeNode: JSTreeNode): void {
        this.addTreeNode(treeNode);
        var children: JSTreeNode[] = treeNode.children();
        for (var i: number = 0; i < children.length; i++) {
            var child = children[i];
            this.load(child);
        }
    }
    pad(container: JSComponent, padding: number): void {
        var components: JSComponent[] = container.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (component instanceof JSTreeCell) {
                var branchButton: JSButton = component.getBranchButton();
                if (branchButton) {
                    component.setStyle("padding-left", padding + "px");
                } else {
                    component.setStyle("padding-left", (padding + 16 + 4) + "px");
                }
            } else {
                this.pad(component, padding + 12);
            }
        }
    }
}