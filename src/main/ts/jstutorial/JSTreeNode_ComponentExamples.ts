/// <reference path = "../jstutorial.ts"/>
/**
 * JSTreeNode_ComponentExamples
 */
namespace jstutorial {
    export class JSTreeNode_ComponentExamples extends JSTreeNode {
        
        static instance: JSTreeNode_ComponentExamples;
        static getInstance(): JSTreeNode_ComponentExamples {
            if (JSTreeNode_ComponentExamples.instance === undefined) {
                JSTreeNode_ComponentExamples.instance = new JSTreeNode_ComponentExamples();
            }
            return JSTreeNode_ComponentExamples.instance;
        }
        constructor() {
            super("Component examples");
        }
    }
}
