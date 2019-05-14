/// <reference path = "../jsuis.ts"/>
/**
 * JSTreeCellRenderer
 * 
 * @author Yassuo Toda
 */
class JSTreeCellRenderer {
    icons: { [ key: string ]: JSIcon } = {};
    leafIcon: JSIcon;
    openIcon: JSIcon;
    closedIcon: JSIcon;
    leafMargin: number = 32;
    openMargin: number = 0;
    closedMargin: number = 0;
    constructor() {
    }
    getTreeCellRendererComponent(tree: JSTree, value: any): JSComponent {
        var treeNode = <JSTreeNode> value;
        var treeCell: JSTreeCell = new JSTreeCell(value);
        var icon: JSIcon = this.getIcon(treeNode);
        if (icon) {
            treeCell.setIcon(icon);
        } else if (treeNode.isLeaf()) {
            var leafIcon = this.getLeafIcon();
            if (leafIcon) {
                treeCell.setIcon(leafIcon);
            }
        } else if (treeNode.isExpanded()) {
            var openIcon = this.getOpenIcon();
            if (openIcon) {
                treeCell.setIcon(openIcon);
            }
        } else {
            var closedIcon = this.getClosedIcon();
            if (closedIcon) {
                treeCell.setIcon(closedIcon);
            }
        }
        var margin: number = 0;
        var root: JSTreeNode = tree.getRoot();
        var rootVisible: boolean = tree.isRootVisible();
        var parentNode: JSTreeNode = treeNode.getParent();
        while (treeNode !== root && (rootVisible || parentNode !== root)) {
            margin += treeNode.isLeaf() ? this.getLeafMargin() : treeNode.isExpanded() ? this.getOpenMargin() : this.getClosedMargin();
            treeNode = parentNode;
            parentNode = treeNode.getParent();
        }
        treeCell.getLabel().setStyle("margin-left", margin + "px");
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
    getLeafIcon(): JSIcon {
        return this.leafIcon;
    }
    setLeafIcon(leafIcon: JSIcon) {
        this.leafIcon = leafIcon;
    }
    getOpenIcon(): JSIcon {
        return this.openIcon;
    }
    setOpenIcon(openIcon: JSIcon) {
        this.openIcon = openIcon;
    }
    getClosedIcon() {
        return this.closedIcon;
    }
    setClosedIcon(closedIcon: JSIcon) {
        this.closedIcon = closedIcon;
    }
    getLeafMargin(): number {
        return this.leafMargin;
    }
    setLeafMargin(leafMargin: number) {
        this.leafMargin = leafMargin;
    }
    getOpenMargin(): number {
        return this.openMargin;
    }
    setOpenMargin(openMargin: number) {
        this.openMargin = openMargin;
    }
    getClosedMargin(): number {
        return this.closedMargin;
    }
    setClosedMargin(closedMargin: number) {
        this.closedMargin = closedMargin;
    }
}
