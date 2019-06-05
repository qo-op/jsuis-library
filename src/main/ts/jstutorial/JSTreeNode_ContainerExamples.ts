/// <reference path = "../jstutorial.ts"/>
/**
 * JSTreeNode_ContainerExamples
 */
namespace jstutorial {
    export class JSTreeNode_ContainerExamples extends JSTreeNode {
        
        static instance: JSTreeNode_ContainerExamples;
        static getInstance(): JSTreeNode_ContainerExamples {
            if (JSTreeNode_ContainerExamples.instance === undefined) {
                JSTreeNode_ContainerExamples.instance = new JSTreeNode_ContainerExamples();
            }
            return JSTreeNode_ContainerExamples.instance;
        }
        constructor() {
            super("Container examples");
        }
    }
}
