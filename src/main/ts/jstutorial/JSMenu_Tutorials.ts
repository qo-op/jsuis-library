/// <reference path = "../jstutorial.ts"/>
/**
 * JSMenu_Tutorials
 */
namespace jstutorial {
    export class JSMenu_Tutorials extends JSMenu {
        
        static instance: JSMenu_Tutorials;
        static getInstance(): JSMenu_Tutorials {
            if (JSMenu_Tutorials.instance === undefined) {
                JSMenu_Tutorials.instance = new JSMenu_Tutorials();
            }
            return JSMenu_Tutorials.instance;
        }
        constructor() {
            super("Tutorials");
            this.addClass("JSMenu_Tutorials");
        }
    }
}
