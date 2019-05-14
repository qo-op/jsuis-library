/// <reference path = "../jstutorial.ts"/>
/**
 * JSMenu_Help
 */
namespace jstutorial {
    export class JSMenu_Help extends JSMenu {
        
        static instance: JSMenu_Help;
        static getInstance(): JSMenu_Help {
            if (JSMenu_Help.instance === undefined) {
                JSMenu_Help.instance = new JSMenu_Help();
            }
            return JSMenu_Help.instance;
        }
        constructor() {
            super("Help");
            this.addClass("JSMenu_Help");
        }
    }
}
