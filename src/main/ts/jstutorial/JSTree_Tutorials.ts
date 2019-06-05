/// <reference path = "../jstutorial.ts"/>
/**
 * JSTree_Tutorials
 */
namespace jstutorial {
    export class JSTree_Tutorials extends JSTree implements MouseListener {
        
        static instance: JSTree_Tutorials;
        static getInstance(): JSTree_Tutorials {
            if (JSTree_Tutorials.instance === undefined) {
                JSTree_Tutorials.instance = new JSTree_Tutorials();
            }
            return JSTree_Tutorials.instance;
        }
        constructor() {
            super();
            this.setRootVisible(false);
            this.addClass("JSTree_Tutorials");
            this.addMouseListener(this);
        }
        mouseClicked(mouseEvent: MouseEvent): void {
            var treeNode: JSTreeNode = this.getSelectionTreeNode();
            var userObject: any = treeNode.getUserObject();
            if (userObject instanceof JSAction) {
                var action: JSAction = <JSAction> userObject;
                action.actionPerformed(null);
            }
        }
    }
}
