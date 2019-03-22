/// <reference path = "../jsuis.ts"/>
class JSTreeCellRenderer {
    icons: { [ key: string ]: JSComponent };
    constructor() {
        this.icons = {};
    }
    getTreeCellRendererComponent(tree: JSTree, value: any): JSComponent {
        var treeNode = <JSTreeNode> value;
        var icon: JSComponent = this.getIcon(treeNode.getTreePath());
        return new JSTreeCell(value, icon);
    }
    setIcon(treePath: string, icon: JSComponent) {
        this.icons[treePath] = icon;
    }
    getIcon(treePath: string): JSComponent {
        return this.icons[treePath];
    }
}