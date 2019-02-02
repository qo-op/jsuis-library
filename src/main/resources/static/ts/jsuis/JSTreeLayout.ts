/// <reference path = "../jsuis.ts"/>
class JSTreeLayout extends JSLayout {
    
    preferredLayoutWidth(tree: JSTree): number {
        var components: JSComponent[] = tree.getComponents();
        if (!components.length) {
            tree.reload();
        }
        return super.preferredLayoutWidth(tree);
    }
    preferredLayoutHeight(tree: JSTree): number {
        var components: JSComponent[] = tree.getComponents();
        if (!components.length) {
            tree.reload();
        }
        return super.preferredLayoutHeight(tree);
    }
    layoutContainer(tree: JSTree): void {
        var components: JSComponent[] = tree.getComponents();
        if (!components.length) {
            tree.reload();
        }
    }
}