/// <reference path = "../jstutorial.ts"/>
/**
 * JSMenu_Examples
 */
namespace jstutorial {
    export class JSMenu_Examples extends JSMenu {
        
        static instance: JSMenu_Examples;
        static getInstance(): JSMenu_Examples {
            if (JSMenu_Examples.instance === undefined) {
                JSMenu_Examples.instance = new JSMenu_Examples();
            }
            return JSMenu_Examples.instance;
        }
        constructor() {
            super("Examples");
            this.addClass("JSMenu_Examples");
        }
    }
}
