/// <reference path = "../jstutorial.ts"/>
/**
 * JSIcon_Leaf
 */
namespace jstutorial {
    export class JSIcon_Leaf extends JSPathIcon {
        
        static instance: JSIcon_Leaf;
        static getInstance(): JSIcon_Leaf {
            if (JSIcon_Leaf.instance === undefined) {
                JSIcon_Leaf.instance = new JSIcon_Leaf();
            }
            return JSIcon_Leaf.instance;
        }
        constructor() {
            super("0 0 24 24", "M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z", 16, 16);
            this.setFill("Silver");
        }
    }
}
