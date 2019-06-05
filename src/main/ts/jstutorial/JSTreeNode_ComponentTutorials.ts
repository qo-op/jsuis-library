/// <reference path = "../jstutorial.ts"/>
/**
 * JSTreeNode_ComponentTutorials
 */
namespace jstutorial {
    export class JSTreeNode_ComponentTutorials extends JSTreeNode {
        
        static instance: JSTreeNode_ComponentTutorials;
        static getInstance(): JSTreeNode_ComponentTutorials {
            if (JSTreeNode_ComponentTutorials.instance === undefined) {
                JSTreeNode_ComponentTutorials.instance = new JSTreeNode_ComponentTutorials();
            }
            return JSTreeNode_ComponentTutorials.instance;
        }
        constructor() {
            super("Component tutorials");
        }
    }
}
