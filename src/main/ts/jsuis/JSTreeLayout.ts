/// <reference path = "../jsuis.ts"/>
/**
 * JSTreeLayout
 * 
 * @author Yassuo Toda
 */
class JSTreeLayout extends JSLayout {
    
    preferredLayoutWidth(tree: JSTree): number {
        var preferredLayoutWidth: number = 0;
        var components: JSComponent[] = tree.getComponents();
        if (!components.length) {
            tree.load();
        }
        var treeCells: { [ key: string ]: JSTreeCell } = tree.getTreeCells();
        for (var treePath in treeCells) {
            var treeCell: JSTreeCell = treeCells[treePath];
            var treeCellPreferredWidth: number = treeCell.getPreferredOuterWidth();
            if (treeCellPreferredWidth === null) {
                return null;
            }
            preferredLayoutWidth = Math.max(preferredLayoutWidth, treeCellPreferredWidth);
        }
        return preferredLayoutWidth;
    }
    preferredLayoutHeight(tree: JSTree): number {
        var components: JSComponent[] = tree.getComponents();
        if (!components.length) {
            tree.load();
        }
        return super.preferredLayoutHeight(tree);
    }
}