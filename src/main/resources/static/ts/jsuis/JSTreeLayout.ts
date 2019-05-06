/// <reference path = "../jsuis.ts"/>
/**
 * JSTreeLayout
 * 
 * @author Yassuo Toda
 */
class JSTreeLayout extends JSLayout {
    
    preferredLayoutWidth(tree: JSTree): number {
        var components: JSComponent[] = tree.getComponents();
        if (!components.length) {
            tree.load();
        }
        return super.preferredLayoutWidth(tree);
    }
    preferredLayoutHeight(tree: JSTree): number {
        var components: JSComponent[] = tree.getComponents();
        if (!components.length) {
            tree.load();
        }
        return super.preferredLayoutHeight(tree);
    }
    layoutContainer(tree: JSTree): void {
        var components: JSComponent[] = tree.getComponents();
        if (!components.length) {
            tree.load();
        }
    }
}