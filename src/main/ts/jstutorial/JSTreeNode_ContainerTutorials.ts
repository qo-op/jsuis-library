/// <reference path = "../jstutorial.ts"/>
/**
 * JSTreeNode_ContainerTutorials
 */
namespace jstutorial {
    export class JSTreeNode_ContainerTutorials extends JSTreeNode {
        
        static instance: JSTreeNode_ContainerTutorials;
        static getInstance(): JSTreeNode_ContainerTutorials {
            if (JSTreeNode_ContainerTutorials.instance === undefined) {
                JSTreeNode_ContainerTutorials.instance = new JSTreeNode_ContainerTutorials();
            }
            return JSTreeNode_ContainerTutorials.instance;
        }
        constructor() {
            super("Container tutorials");
        }
    }
}
