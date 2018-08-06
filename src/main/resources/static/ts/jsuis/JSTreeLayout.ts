/// <reference path = "../jsuis.ts"/>
class JSTreeLayout extends JSLayout {
    
    layoutContainer(tree: JSTree): void {
        var components: JSComponent[] = tree.getComponents();
        if (!components.length) {
            tree.reload();
        }
    }
}