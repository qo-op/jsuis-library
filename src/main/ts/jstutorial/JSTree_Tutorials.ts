/// <reference path = "../jstutorial.ts"/>
/**
 * JSTree_Tutorials
 */
namespace jstutorial {
    export class JSTree_Tutorials extends JSTree {
        
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
            this.setStyle("margin", "4px 0");
            this.addClass("JSTree_Tutorials");
        }
    }
}
