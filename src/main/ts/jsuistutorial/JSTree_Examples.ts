/// <reference path = "../jsuistutorial.ts"/>
/**
 * JSTree_Examples
 */
namespace jsuistutorial {
    export class JSTree_Examples extends JSTree implements JSMouseListener {
        
        constructor() {
            super();
            this.setRootVisible(false);
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
