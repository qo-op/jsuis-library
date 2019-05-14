/// <reference path = "../jstutorial.ts"/>
/**
 * JSIcon_Open
 */
namespace jstutorial {
    export class JSIcon_Open extends JSPathIcon {
        
        static instance: JSIcon_Open;
        static getInstance(): JSIcon_Open {
            if (JSIcon_Open.instance === undefined) {
                JSIcon_Open.instance = new JSIcon_Open();
            }
            return JSIcon_Open.instance;
        }
        constructor() {
            super("0 0 24 24", "M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z", 16, 16);
            this.setFill("Gold");
        }
    }
}
