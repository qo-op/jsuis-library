/// <reference path = "../jstutorial.ts"/>
/**
 * JSTree_Examples
 */
namespace jstutorial {
    export class JSTree_Examples extends JSTree {
        
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
            this.setStyle("margin", "4px 0");
            this.addClass("JSTree_Examples");
        }
    }
}
