/// <reference path = "../jstutorial.ts"/>
/**
 * JSTree_Examples
 */
namespace jstutorial {
    export class JSTree_Examples extends JSTree implements MouseListener {
        
        static instance: JSTree_Examples;
        static getInstance(): JSTree_Examples {
            if (JSTree_Examples.instance === undefined) {
                JSTree_Examples.instance = new JSTree_Examples();
            }
            return JSTree_Examples.instance;
        }
        constructor() {
            super();
            this.setRootVisible(false);
            this.addClass("JSTree_Examples");
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
