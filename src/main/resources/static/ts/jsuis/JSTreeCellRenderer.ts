/// <reference path = "../jsuis.ts"/>
/**
 * JSTreeCellRenderer
 * 
 * @author Yassuo Toda
 */
class JSTreeCellRenderer {
    icons: { [ key: string ]: JSComponent };
    icones: { [ key: string ]: JSIcon };
    constructor() {
        this.icons = {};
        this.icones = {};
    }
    getTreeCellRendererComponent(tree: JSTree, value: any): JSComponent {
        var treeNode = <JSTreeNode> value;
        var icon: JSIcon = this.getIcon(treeNode.getTreePath());
        if (icon) {
            return new JSTreeCell(value, icon);
        } else {
            return new JSTreeCell(value);
        }
    }
    setIcon(treePath: string, icon: JSIcon) {
        this.icones[treePath] = icon;
    }
    getIcon(treePath: string): JSIcon {
        return this.icones[treePath];
    }
}
