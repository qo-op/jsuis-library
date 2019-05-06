/// <reference path = "../jsuis.ts"/>
/**
 * JSTreeCellRenderer
 * 
 * @author Yassuo Toda
 */
class JSTreeCellRenderer {
    icons: { [ key: string ]: JSIcon } = {};
    pads: { [ key: string ]: number } = {};
    leafPadding: number = 32; // 16 + 16
    openPadding: number = 12; // 16 - 4
    closedPadding: number = 12; // 16 - 4
    constructor() {
    }
    getTreeCellRendererComponent(tree: JSTree, value: any): JSComponent {
        var treeNode = <JSTreeNode> value;
        var treeCell: JSTreeCell;
        var icon: JSIcon = this.getIcon(treeNode);
        if (icon) {
            treeCell = new JSTreeCell(value, icon);
        } else {
            treeCell = new JSTreeCell(value);
        }
        var padding: number = 4;
        var root: JSTreeNode = tree.getRoot();
        var rootVisible: boolean = tree.isRootVisible();
        var parentNode: JSTreeNode = treeNode.getParent();
        while (treeNode !== root && (rootVisible || parentNode !== root)) {
            var pad = this.getPadding(treeNode);
            if (pad === undefined) {
                pad = treeNode.isLeaf() ? this.getLeafPadding() : treeNode.isExpanded() ? this.getOpenPadding() : this.getClosedPadding();
            }
            padding += pad;
            treeNode = parentNode;
            parentNode = treeNode.getParent();
        }
        treeCell.setStyle("padding-left", padding + "px");
        return treeCell;
    }
    getIcon(treeNode: JSTreeNode): JSIcon {
        var treePath: string = treeNode.getTreePath();
        return this.icons[treePath];
    }
    setIcon(treeNode: JSTreeNode, icon: JSIcon) {
        var treePath: string = treeNode.getTreePath();
        this.icons[treePath] = icon;
    }
    getPadding(treeNode: JSTreeNode): number {
        var treePath: string = treeNode.getTreePath();
        return this.pads[treePath];
    }
    setPadding(treeNode: JSTreeNode, padding: number) {
        var treePath: string = treeNode.getTreePath();
        this.pads[treePath] = padding;
    }
    getLeafPadding(): number {
        return this.leafPadding;
    }
    setLeafPadding(leafPadding: number) {
        this.leafPadding = leafPadding;
    }
    getOpenPadding(): number {
        return this.openPadding;
    }
    setOpenPadding(openPadding: number) {
        this.openPadding = openPadding;
    }
    getClosedPadding(): number {
        return this.closedPadding;
    }
    setClosedPadding(closedPadding: number) {
        this.closedPadding = closedPadding;
    }
}
